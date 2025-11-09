#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';

const DEFAULT_CODES = [
  'T-678',
  'T-668',
  'SIE-295',
  'CO-280',
  'T-684',
  'T-747',
  'T-727',
  'T-688',
];

const API_BASE = process.env.API_BASE?.trim() || 'https://api.contifico.com/sistema/api/v1';
const API_KEY = process.env.API_KEY?.trim();

if (!API_KEY) {
  console.error('Error: falta definir la variable de entorno API_KEY.');
  process.exit(1);
}

const baseUrl = API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`;

function parseList(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const codes = parseList(process.env.CODES);
const codesToProcess = codes.length ? codes : DEFAULT_CODES;
const onlyBodegasList = parseList(process.env.ONLY_BODEGAS);
const onlyBodegasSet = onlyBodegasList.length ? new Set(onlyBodegasList) : null;

const baseHeaders = {
  Authorization: API_KEY,
  Accept: 'application/json',
};

function buildUrl(path, queryParams) {
  const url = new URL(path, baseUrl);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).length) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url;
}

async function requestJson(path, { query } = {}) {
  const url = buildUrl(path, query);
  try {
    const response = await fetch(url, {
      headers: baseHeaders,
    });

    const text = await response.text();
    if (!response.ok) {
      const snippet = text.slice(0, 200);
      throw new Error(`${response.status} ${response.statusText}${snippet ? ` - ${snippet}` : ''}`);
    }

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`No se pudo parsear JSON: ${parseError.message}`);
    }
  } catch (error) {
    throw new Error(`Solicitud a ${url.toString()} falló: ${error.message}`);
  }
}

async function safeRequestJson(path, options) {
  try {
    const data = await requestJson(path, options);
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
  return [];
}

async function loadCategories() {
  const { ok, data, error } = await safeRequestJson('categoria/');
  if (!ok) {
    console.error(`[WARN] No se pudieron cargar categorías: ${error.message}`);
    return new Map();
  }

  const categories = new Map();
  for (const category of asArray(data)) {
    if (!category) continue;
    const id = category.id ?? category.categoria_id ?? category.uid;
    const name = category.nombre ?? category.name ?? category.descripcion ?? null;
    if (id !== undefined && name) {
      categories.set(String(id), name);
    }
  }
  return categories;
}

async function findProductByCode(code) {
  const searchErrors = [];

  const byCode = await safeRequestJson('producto/', { query: { codigo: code } });
  if (!byCode.ok) {
    searchErrors.push(`Error en búsqueda por codigo: ${byCode.error.message}`);
  }
  let candidates = byCode.ok ? asArray(byCode.data) : [];

  if (!candidates.length) {
    const byFilter = await safeRequestJson('producto/', { query: { filtro: code } });
    if (!byFilter.ok) {
      searchErrors.push(`Error en búsqueda por filtro: ${byFilter.error.message}`);
    }
    if (byFilter.ok) {
      const items = asArray(byFilter.data);
      const exact = items.find((item) => String(item?.codigo ?? '').trim() === code);
      candidates = exact ? [exact] : items;
    }
  }

  const product = candidates.length ? candidates[0] : null;
  return { product, searchErrors };
}

function normaliseNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function mapBodegas(stockItems) {
  const bodegas = [];
  for (const item of stockItems) {
    if (!item) continue;
    const bodega = item.bodega ?? {};
    const id = item.bodega_id ?? bodega.id ?? item.id_bodega ?? null;
    const nombre = item.bodega_nombre ?? bodega.nombre ?? bodega.name ?? null;
    const cantidadRaw = item.cantidad ?? item.stock ?? item.existencia ?? null;
    let cantidad = normaliseNumber(cantidadRaw);
    if (cantidad === null) {
      const numeric = Number(cantidadRaw);
      cantidad = Number.isFinite(numeric) ? numeric : 0;
    }

    const entry = {
      bodega_id: id !== null ? String(id) : '',
      bodega_nombre: nombre ?? '',
      cantidad: typeof cantidad === 'number' ? cantidad : 0,
    };

    if (
      !onlyBodegasSet ||
      onlyBodegasSet.has(entry.bodega_id) ||
      onlyBodegasSet.has(entry.bodega_nombre)
    ) {
      bodegas.push(entry);
    }
  }
  return bodegas;
}

function computeDiagnosis(productInfo) {
  const issues = [];

  if (productInfo.tipo !== 'PRO') {
    issues.push(`tipo=${productInfo.tipo ?? 'N/D'}`);
  }
  if (productInfo.tipo_producto !== 'SIM') {
    issues.push(`tipo_producto=${productInfo.tipo_producto ?? 'N/D'}`);
  }
  if (productInfo.estado !== 'A') {
    issues.push(`estado=${productInfo.estado ?? 'N/D'}`);
  }

  if (!issues.length) {
    return { diagnosis: 'OK', diagnosis_reason: null };
  }

  return {
    diagnosis: 'NO_PRODUCTO_API',
    diagnosis_reason: `Producto encontrado pero no cumple criterios: ${issues.join(', ')}`,
  };
}

function bodegasToCsvCell(bodegas) {
  if (!bodegas.length) return '';
  const parts = bodegas.map((bodega) => {
    const amount = Number.isFinite(bodega.cantidad) ? bodega.cantidad : Number(bodega.cantidad) || 0;
    return `${bodega.bodega_nombre}:${bodega.bodega_id}=${amount}`;
  });
  return parts.join(';');
}

function escapeCsv(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes(';')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  console.log(`Procesando ${codesToProcess.length} códigos de producto...`);

  const categories = await loadCategories();

  const results = [];

  for (const code of codesToProcess) {
    console.log(`→ Código ${code}`);
    const baseInfo = {
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
      diagnosis: 'NO_VISIBLE_EN_RUC',
      diagnosis_reason: null,
    };

    const { product, searchErrors } = await findProductByCode(code);

    if (!product) {
      const reasonParts = ['Producto no encontrado en la API para este RUC.'];
      if (searchErrors.length) {
        reasonParts.push(searchErrors.join(' | '));
      }
      baseInfo.diagnosis_reason = reasonParts.join(' ');
      results.push(baseInfo);
      continue;
    }

    const productId = product.id ?? product.uid ?? product.producto_id ?? null;
    if (!productId) {
      baseInfo.diagnosis = 'NO_PRODUCTO_API';
      baseInfo.diagnosis_reason = 'Respuesta sin identificador de producto (id).';
      results.push(baseInfo);
      continue;
    }

    baseInfo.id_api = String(productId);
    baseInfo.nombre = product.nombre ?? product.name ?? null;
    const categoriaId = product.categoria_id ?? product.id_categoria ?? product.categoria ?? null;
    if (categoriaId !== null && categoriaId !== undefined) {
      baseInfo.categoria_id = String(categoriaId);
      baseInfo.categoria_nombre = categories.get(String(categoriaId)) ?? null;
    }
    baseInfo.porcentaje_iva = product.porcentaje_iva ?? product.iva ?? null;
    baseInfo.pvp1 = product.pvp1 ?? product.precio ?? product.precio1 ?? null;
    baseInfo.estado = product.estado ?? product.state ?? null;
    baseInfo.tipo = product.tipo ?? product.type ?? null;
    baseInfo.tipo_producto = product.tipo_producto ?? product.product_type ?? null;

    const stockResponse = await safeRequestJson(`producto/${productId}/stock/`);
    if (!stockResponse.ok) {
      console.error(`[WARN] No se pudo obtener stock para ${code} (ID ${productId}): ${stockResponse.error.message}`);
    }
    const stockItems = stockResponse.ok ? asArray(stockResponse.data) : [];
    baseInfo.bodegas = mapBodegas(stockItems);
    baseInfo.stock_total = baseInfo.bodegas.reduce((total, item) => total + (Number.isFinite(item.cantidad) ? item.cantidad : 0), 0);

    const diagnosis = computeDiagnosis(baseInfo);
    baseInfo.diagnosis = diagnosis.diagnosis;
    baseInfo.diagnosis_reason = diagnosis.diagnosis_reason;

    results.push(baseInfo);
  }

  await writeFile('salida.json', `${JSON.stringify(results, null, 2)}\n`, 'utf8');

  const csvHeaders = [
    'code',
    'id_api',
    'nombre',
    'categoria_id',
    'categoria_nombre',
    'porcentaje_iva',
    'pvp1',
    'estado',
    'tipo',
    'tipo_producto',
    'bodegas',
    'diagnosis',
    'diagnosis_reason',
  ];

  const csvLines = [csvHeaders.join(',')];

  for (const item of results) {
    const bodegasCell = bodegasToCsvCell(item.bodegas);
    const row = [
      item.code,
      item.id_api,
      item.nombre,
      item.categoria_id,
      item.categoria_nombre,
      item.porcentaje_iva,
      item.pvp1,
      item.estado,
      item.tipo,
      item.tipo_producto,
      bodegasCell,
      item.diagnosis,
      item.diagnosis_reason,
    ].map(escapeCsv);
    csvLines.push(row.join(','));
  }

  await writeFile('salida.csv', `${csvLines.join('\n')}\n`, 'utf8');

  console.log('Listo. Archivos generados: salida.json y salida.csv');
}

main().catch((error) => {
  console.error(`Error inesperado: ${error.message}`);
  process.exit(1);
});
