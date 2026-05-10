## Plan: Documento DOCX explicativo del proyecto Tokeniza con índice y capturas

### Objetivo
Generar un documento Word (`.docx`) editable, profundidad **mixta** (visión general + detalles técnicos), con **índice (TOC) navegable** al inicio y **capturas reales** del frontend incrustadas en cada sección.

### Estructura del documento

1. **Portada** — Título "Tokeniza · Estructura del proyecto", fecha, versión
2. **Índice (Table of Contents)** — Generado automáticamente con `TableOfContents` de docx-js, hipervínculos a H1/H2/H3, niveles 1-3
3. **Resumen ejecutivo** — Qué es la plataforma y a quién sirve
4. **Stack tecnológico** — React 18, Vite, TS, Tailwind, shadcn/ui, framer-motion, react-query, Lovable Cloud (Supabase)
5. **Arquitectura general** — Diagrama de capas Pages → Components → Hooks → Supabase, AuthProvider, ProtectedRoute
6. **Estructura de carpetas `src/`** — pages, components (landing/dashboard/issuer/marketplace/ui), hooks, lib, data, integrations
7. **Mapa de rutas** — Tabla pública / inversor / emisor / academia
8. **Recorrido visual del frontend** (con capturas reales)
   - 8.1 Landing pública (`/`)
   - 8.2 Autenticación y KYC (`/login`, `/register`, `/kyc`)
   - 8.3 Páginas informativas (`/calculadora`, `/empresas`, `/blog`)
   - 8.4 Dashboard del inversor (`/dashboard`, marketplace, portfolio, wallet, transacciones, academia, settings)
   - 8.5 Dashboard del emisor (`/emisor`, wizard 7 pasos, assets, investors, reports, compliance, settings)
9. **Modelo de datos (Supabase)** — Tablas (`profiles`, `wallets`, `transactions`, `portfolios`, `marketplace_assets`, `issuer_tokens`, `token_investments`, `token_distributions`) y resumen RLS
10. **Flujos funcionales clave** — Registro+KYC, creación de token, compra y distribución de rendimientos
11. **Sistema de diseño** — Tokens HSL, fuentes Inter + Space Grotesk, paleta cyan/gold/deep-blue, shadcn variants
12. **Configuración y despliegue** — Lovable Cloud, secretos, dominios (`tokeniza.lovable.app`)
13. **Glosario y próximos pasos**

### Estrategia de capturas
Usar `browser--navigate_to_sandbox` (1366×768) + `browser--screenshot` por cada ruta listada en la sección 8. Guardar PNGs en `/tmp/shots/`. Las rutas protegidas que requieran login mostrarán la pantalla de acceso con una nota explicativa.

### Detalle técnico de generación
- Generación con `docx-js` siguiendo el skill DOCX:
  - Página US Letter (12240×15840 DXA), márgenes 1"
  - Fuente Arial; estilos `Heading1/2/3` con `outlineLevel` 0/1/2 (requerido para TOC)
  - **TOC**: `new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-3" })` justo después de la portada
  - Listas con `LevelFormat.BULLET` (nunca caracteres unicode)
  - Tablas con `WidthType.DXA` + `columnWidths` que sumen al ancho de tabla
  - Imágenes con `ImageRun({ type: "png", ... altText })` redimensionadas a ~6" de ancho
  - Nota: el TOC se rellena al abrir el archivo en Word (clic derecho → Actualizar campos), comportamiento estándar
- Validar y empaquetar el .docx
- QA: convertir a PDF con LibreOffice, `pdftoppm -jpeg -r 150` y revisar cada página visualmente; iterar hasta limpio
- Salida final: `/mnt/documents/Tokeniza_Estructura_Proyecto.docx`
- Entrega con `<lov-artifact path="Tokeniza_Estructura_Proyecto.docx" mime_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"></lov-artifact>`

### Notas
- No se modificará ningún archivo del proyecto; solo se generará el artefacto en `/mnt/documents/`.
