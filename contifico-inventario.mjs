#!/usr/bin/env node
// contifico-inventario.mjs
// Requisitos: Node >= 18 (fetch nativo)
// Env: API_KEY (obligatorio), API_BASE (opcional), CODES (opcional), ONLY_BODEGAS (opcional)

import { writeFile } from "node:fs/promises";

// ---------- Config ----------
const DEFAULT_API_BASE = "https://api.contifico.com/sistema/api/v1";
const DEFAULT_CODES = [
  "T-678",
  "T-668",
  "SIE-295",
  "CO-280",
  "T-684",
  "T-747",
  "T-727",
  "T-688",
];

const API_BASE = (process.env.API_BASE?.trim() || DEFAULT_API_BASE).replace(
  /\/$/,
  ""
);
const API_KEY = process.env.API_KEY?.trim();
if (!API_KEY) {
  console.error("Error: falta definir la variable de entorno API_KEY.");
  process.exit(1);
}

function parseList(envVal) {
  return (envVal || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
const CODES = parseList(process.env.CODES);
const codesToProcess = CODES.length ? CODES : DEFAULT_CODES;
const onlyBodegasList = parseList(process.env.ONLY_BODEGAS);
const onlyBodegasSet = onlyBodegasList.length ? new Set(onlyBodegasList) : null;

const baseHeaders = { Authorization: API_KEY, Accept: "application/json" };

// ---------- Utils ----------
function buildUrl(path, query) {
  const url = new URL(path, `${API_BASE}/`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && String(v).length)
        url.searchParams.set(k, String(v));
    }
  }
  return url;
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

async function requestJson(path, { query } = {}) {
  const url = buildUrl(path, query);
  let res;
  try {
    res = await fetch(url, { headers: baseHeaders });
  } catch (e) {
    throw new Error(
      `Fetch falló: ${e instanceof Error ? e.message : String(e)}`
    );
  }

  const text = await res.text();
  if (!res.ok) {
    const snippet = text ? ` - ${text.slice(0, 200)}` : "";
    throw new Error(`${res.status} ${res.statusText}${snippet}`);
  }

  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (!ct.includes("application/json")) {
    throw new Error(`Content-Type inesperado: ${ct || "N/D"}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(
      `No se pudo parsear JSON: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

async function safeRequestJson(path, opts) {
  try {
    const data = await requestJson(path, opts);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error };
  }
}

function asArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.items)) return data.items;
  return [];
}

function escapeCsv(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (
    str.includes('"') ||
    str.includes(",") ||
    str.includes(";") ||
    str.includes("\n") ||
    str.includes("\r")
  ) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function bodegasToCsvCell(bodegas) {
  if (!Array.isArray(bodegas) || bodegas.length === 0) return "";
  return bodegas
    .map((b) => {
      const amount = Number.isFinite(b.cantidad)
        ? b.cantidad
        : Number(b.cantidad) || 0;
      return `${b.bodega_nombre}:${b.bodega_id}=${amount}`;
    })
    .join(";");
}

// ---------- Domain mappers ----------
async function loadCategories() {
  const { ok, data, error } = await safeRequestJson("categoria/");
  if (!ok) {
    console.error(`[WARN] No se pudieron cargar categorías: ${error.message}`);
    return new Map();
  }
  const map = new Map();
  for (const cat of asArray(data)) {
    if (!cat) continue;
    const id = cat.id ?? cat.categoria_id ?? cat.uid ?? cat.codigo ?? null;
    const name = cat.nombre ?? cat.name ?? cat.descripcion ?? null;
    if (id !== null && name) map.set(String(id), String(name));
  }
  return map;
}

function exactMatchCaseInsensitive(items, code) {
  const target = code.toLowerCase();
  return (
    items.find(
      (p) =>
        String(p?.codigo ?? "")
          .trim()
          .toLowerCase() === target
    ) || null
  );
}

async function findProductByCode(code) {
  const errors = [];

  const byCode = await safeRequestJson("producto/", {
    query: { codigo: code },
  });
  let list = byCode.ok ? asArray(byCode.data) : [];
  if (!byCode.ok) errors.push(`búsqueda codigo: ${byCode.error.message}`);

  let product = exactMatchCaseInsensitive(list, code) || list[0];
  if (product) return { product, source: "codigo", errors };

  const byFilter = await safeRequestJson("producto/", {
    query: { filtro: code },
  });
  if (!byFilter.ok) errors.push(`búsqueda filtro: ${byFilter.error.message}`);
  list = byFilter.ok ? asArray(byFilter.data) : [];
  product = exactMatchCaseInsensitive(list, code) || list[0];

  return {
    product: product || null,
    source: product ? "filtro" : null,
    errors,
  };
}

function mapBodegaEntry(entry) {
  const bodegaObj = entry?.bodega || {};
  const bodega_id =
    entry?.bodega_id ??
    bodegaObj.id ??
    entry?.id_bodega ??
    entry?.codigo ??
    null;
  const bodega_nombre =
    entry?.bodega_nombre ??
    bodegaObj.nombre ??
    bodegaObj.name ??
    entry?.nombre ??
    entry?.name ??
    (bodega_id ? `Bodega ${bodega_id}` : "Bodega");

  const cantidad =
    toNumber(entry?.cantidad) ??
    toNumber(entry?.stock) ??
    toNumber(entry?.existencia) ??
    toNumber(entry?.disponible) ??
    toNumber(entry?.cantidad_total) ??
    0;

  const out = {
    bodega_id: bodega_id !== null ? String(bodega_id) : "",
    bodega_nombre: String(bodega_nombre),
    cantidad,
  };

  if (!onlyBodegasSet) return out;
  if (
    onlyBodegasSet.has(out.bodega_id) ||
    onlyBodegasSet.has(out.bodega_nombre)
  )
    return out;
  return null;
}

async function fetchStock(productId) {
  if (!productId) return [];
  const path = `producto/${encodeURIComponent(productId)}/stock/`;
  const { ok, data, error } = await safeRequestJson(path);
  if (!ok) throw new Error(error.message);
  const list = asArray(data);
  const mapped = list.map(mapBodegaEntry).filter(Boolean);
  return mapped;
}

function computeDiagnosis(p) {
  const issues = [];
  if (p.tipo !== "PRO") issues.push(`tipo=${p.tipo ?? "N/D"}`);
  if (p.tipo_producto !== "SIM")
    issues.push(`tipo_producto=${p.tipo_producto ?? "N/D"}`);
  if (p.estado !== "A") issues.push(`estado=${p.estado ?? "N/D"}`);

  if (!issues.length) return { diagnosis: "OK", diagnosis_reason: null };
  return {
    diagnosis: "NO_PRODUCTO_API",
    diagnosis_reason: `Producto no cumple criterios: ${issues.join(", ")}`,
  };
}

// ---------- Main ----------
async function main() {
  console.log(`Procesando ${codesToProcess.length} códigos...`);
  const categories = await loadCategories();

  const results = [];

  for (const code of codesToProcess) {
    console.log(`→ ${code}`);
    const rec = {
      code,
      id_api: null,
      nombre: null,
      categoria_id: null,
      categoria_nombre: null,
      porcentaje_iva: null,
      pvp1: null,
      estado: null,
      tipo: null,
      tipo_producto: null,
      bodegas: [],
      stock_total: 0,
      diagnosis: "NO_VISIBLE_EN_RUC",
      diagnosis_reason:
        "Producto no encontrado por codigo ni filtro en este RUC.",
    };

    const { product, errors } = await findProductByCode(code);
    if (!product) {
      if (errors.length) rec.diagnosis_reason += ` (${errors.join(" | ")})`;
      results.push(rec);
      continue;
    }

    const idApi = product.id ?? product.uid ?? product.producto_id ?? null;
    if (!idApi) {
      rec.diagnosis = "NO_PRODUCTO_API";
      rec.diagnosis_reason = "Respuesta sin identificador de producto (id).";
      results.push(rec);
      continue;
    }

    // Campos principales
    rec.id_api = String(idApi);
    rec.nombre = product.nombre ?? product.name ?? product.descripcion ?? null;
    const catId =
      product.categoria_id ??
      product.id_categoria ??
      product.categoria?.id ??
      null;
    rec.categoria_id =
      catId !== null && catId !== undefined ? String(catId) : null;
    rec.categoria_nombre =
      (rec.categoria_id && categories.get(rec.categoria_id)) ??
      product.categoria?.nombre ??
      product.categoria?.name ??
      null;

    rec.porcentaje_iva = product.porcentaje_iva ?? product.iva ?? null;
    rec.pvp1 = product.pvp1 ?? product.precio ?? product.precio1 ?? null;
    rec.estado = product.estado ?? product.state ?? null;
    rec.tipo = product.tipo ?? product.type ?? null;
    rec.tipo_producto = product.tipo_producto ?? product.product_type ?? null;

    // Diagnóstico
    const diag = computeDiagnosis(rec);
    rec.diagnosis = diag.diagnosis;
    rec.diagnosis_reason = diag.diagnosis_reason;

    // Stock por bodega
    try {
      rec.bodegas = await fetchStock(idApi);
      rec.stock_total = rec.bodegas.reduce(
        (acc, b) => acc + (Number.isFinite(b.cantidad) ? b.cantidad : 0),
        0
      );
      if (rec.diagnosis === "OK" && rec.bodegas.length === 0) {
        rec.diagnosis_reason =
          "OK sin stock visible en las bodegas seleccionadas.";
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Si era OK pero falló stock, marcamos causa operativa
      rec.diagnosis =
        rec.diagnosis === "OK" ? "NO_PRODUCTO_API" : rec.diagnosis;
      rec.diagnosis_reason = `Error obteniendo stock: ${msg}`;
      rec.bodegas = [];
    }

    results.push(rec);
  }

  // Persistencia
  await writeFile(
    "salida.json",
    JSON.stringify(results, null, 2) + "\n",
    "utf8"
  );

  const headers = [
    "code",
    "id_api",
    "nombre",
    "categoria_id",
    "categoria_nombre",
    "porcentaje_iva",
    "pvp1",
    "estado",
    "tipo",
    "tipo_producto",
    "bodegas",
    "stock_total",
    "diagnosis",
    "diagnosis_reason",
  ];
  const csvLines = [headers.join(",")];
  for (const r of results) {
    const row = [
      r.code,
      r.id_api,
      r.nombre,
      r.categoria_id,
      r.categoria_nombre,
      r.porcentaje_iva,
      r.pvp1,
      r.estado,
      r.tipo,
      r.tipo_producto,
      bodegasToCsvCell(r.bodegas),
      r.stock_total,
      r.diagnosis,
      r.diagnosis_reason,
    ].map(escapeCsv);
    csvLines.push(row.join(","));
  }
  await writeFile("salida.csv", csvLines.join("\n") + "\n", "utf8");

  console.log("Listo. Archivos generados: salida.json y salida.csv");
}

main().catch((err) => {
  console.error(
    `Error inesperado: ${err instanceof Error ? err.message : String(err)}`
  );
  process.exit(1);
});
