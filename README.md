# 🏭 Industrial Machinery Store
**Tienda Online de Maquindust**

Una aplicación web completa para la venta de maquinaria industrial nueva y usada, desarrollada con tecnologías modernas.

## 🌟 Características Principales

### 🎯 Funcionalidades Implementadas
- ✅ **Navbar Completo** - Logo, navegación y menús desplegables
- ✅ **Sistema de Catálogo** - Pestañas para maquinaria nueva y usada
- ✅ **Filtrado Avanzado** - Por categoría, marca y condición
- ✅ **Página de Ofertas** - Escaparate de productos en promoción
- ✅ **Formulario de Venta** - Para que clientes vendan su maquinaria
- ✅ **Página Corporativa** - Información de la empresa y socios
- ✅ **WhatsApp Integration** - Botón flotante para contacto directo
- ✅ **Responsive Design** - Adaptado para móviles y escritorio

### 🎨 Características de Diseño
- Slider dinámico en la página principal
- Efectos visuales y animaciones suaves
- Paleta de colores profesional (celeste corporativo)
- Cards de productos con hover effects
- Sistema de filtros interactivos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool y servidor de desarrollo
- **React Router** - Navegación SPA
- **CSS3** - Estilos personalizados y animaciones
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para base de datos
- **CORS** - Middleware para cross-origin requests

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Seeders** - Datos de prueba incluidos

## 🚀 Instalación y Configuración

### Pre-requisitos
- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/GAOM18/Industrial-Machinery-Store.git
cd industrial-machinery-store
```

### 2. Configurar Base de Datos
```sql
-- Crear base de datos en PostgreSQL
CREATE DATABASE industrial_machinery_store;
```

### 3. Configurar Variables de Entorno
Crear archivo `.env` en la carpeta `server/`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=industrial_machinery_store
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_clave_secreta
PORT=5000
```

### 4. Instalar Dependencias del Backend
```bash
cd server
npm install
```

### 5. Ejecutar Seeders (Datos de Prueba)
```bash
npm run seed
```

### 6. Iniciar el Servidor Backend
```bash
npm start
# Servidor corriendo en http://localhost:5000
```

### 7. Instalar Dependencias del Frontend
```bash
cd ../client
npm install
```

### 8. Iniciar el Cliente Frontend
```bash
npm run dev
# Aplicación corriendo en http://localhost:5173
```

## 📱 Funcionalidades por Página

### 🏠 Página Principal (Home)
- Slider dinámico con 2 slides promocionales
- Sección de servicios (Técnico, Asesoría, Seguridad)
- Ofertas destacadas (3 productos)
- Información de ubicación con mapa integrado
- Botón flotante de WhatsApp

### 🏭 Catálogo de Maquinaria
- **Maquinaria Nueva** - Productos sin uso
- **Maquinaria Usada** - Productos de segunda mano
- Filtros por:
  - Categoría (Metalmecánica, Construcción, Industrial, etc.)
  - Marca (Heller, Follow Machines, Helfer Industrial, etc.)
  - Búsqueda por texto

### 🔥 Ofertas Especiales
- Grid de productos en promoción
- Filtros específicos para ofertas
- Indicadores visuales de descuentos

### 💼 Vende tu Maquinaria
- Formulario completo de contacto
- Campos para información de la máquina
- Validación de datos

### ℹ️ Quiénes Somos
- Historia de la empresa
- Misión y visión
- Estadísticas corporativas
- Información de socios estratégicos

## 🎯 Estructura del Proyecto

```
industrial-machinery-store/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # API calls
│   │   ├── assets/         # Imágenes y recursos
│   │   └── App.jsx         # Componente principal
│   └── package.json
├── server/                 # Backend Node.js
│   ├── controllers/        # Lógica de negocio
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de API
│   ├── config/             # Configuración de DB
│   ├── seeders/            # Datos de prueba
│   └── app.js              # Servidor principal
├── database/               # Scripts de BD
└── README.md
```

## 📊 Estado Actual del Desarrollo

### ✅ Completado
- [x] Estructura completa del proyecto
- [x] Base de datos con seeders
- [x] API REST funcional
- [x] Todas las páginas implementadas
- [x] Sistema de filtros
- [x] Diseño responsive
- [x] Integración WhatsApp

### 🔄 En Progreso
- [ ] Testing unitario
- [ ] Optimización de imágenes
- [ ] SEO básico

### 📋 Próximos Pasos
- [ ] Sistema de autenticación admin
- [ ] Panel de administración
- [ ] Carrito de compras
- [ ] Integración de pagos

## 🎨 Capturas de Pantalla

[Aquí puedes agregar screenshots de las principales páginas]

## 🤝 Equipo de Desarrollo

- **Desarrollador Full Stack**: [Gabriel Onofre]
- **Tecnologías**: React, Node.js, PostgreSQL
- **Tiempo de Desarrollo**: [1 semana]

## 📞 Contacto y Soporte

Para consultas sobre el proyecto:
- 📧 Email: [gabo.onofre18@gmail.com]
- 💬 WhatsApp: +593 96 335 3291

---

**Nota**: Esta app está en desarrollo activo y se actualiza regularmente con nuevas funcionalidades.# Industrial-Machinery-Store
