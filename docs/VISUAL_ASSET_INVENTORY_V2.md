# MISCA — Visual Asset Inventory V2

Fecha: 2026-08-12
Estado: V21 · PERSISTED_ASSETS_AUDITED

## 1. Resultado de la auditoría

El árbol actual del repositorio conserva 26 activos visuales SVG relevantes para la web:

- 7 piezas de Raíz de concreto;
- 7 piezas de Ola;
- 10 maestros de universo;
- 2 estudios históricos anteriores al sistema V13/V14.

No existe actualmente en el repositorio ningún PNG/JPG/WebP de los paquetes raster generados en conversaciones anteriores. El propio `VISUAL_ASSET_SYSTEM_V1.md` dejó esos archivos como `EXACT_CAMPAIGN_FILES_PENDING_IMPORT` y definió el patrón futuro `assets/campaign/<universo>/01-hero.webp ...`.

Por tanto, V21 distingue estrictamente entre:

1. **persistido/versionado**: recuperable y utilizable hoy;
2. **histórico de chat no versionado**: conceptualmente aprobado, pero sin binario accesible desde el repositorio;
3. **fotografía física futura**: reemplazará los fallbacks conceptuales después de Product Ready.

## 2. Productos activos

### Raíz de concreto — Alma Ríos / Entre grietas

| Asset | Rol V21 | Cliente | Nota |
|---|---|---:|---|
| `misca-raiz-cover.svg` | campaña / portada | Sí | Principal superficie editorial conceptual. |
| `misca-raiz-front.svg` | mockup de frente | Sí, secundario | Diagrama de Dirección A; no fotografía. |
| `misca-raiz-back.svg` | mockup de espalda | Sí, secundario | Diagrama de continuidad; no fotografía. |
| `misca-raiz-detail.svg` | arte / detalle | Sí | Útil como transición arte→producto; tacto real aún no probado. |
| `misca-raiz-context.svg` | campaña / contexto | Sí | Superficie editorial fuerte. |
| `misca-raiz-art-crop.svg` | lenguaje visual | Sí | Útil para historias y colección. |
| `misca-raiz-spec-card.svg` | ficha técnica | No | Solo desarrollo / QA. |

### Ola — Hokusai / La fuerza del agua

| Asset | Rol V21 | Cliente | Nota |
|---|---|---:|---|
| `misca-ola-cover.svg` | campaña / portada | Sí | Principal superficie editorial conceptual. |
| `misca-ola-front.svg` | mockup de frente | Sí, secundario | Fuji pequeño; no fotografía. |
| `misca-ola-back.svg` | mockup de espalda | Sí, secundario | Ola dominante; no fotografía. |
| `misca-ola-detail.svg` | arte / detalle | Sí | Reproducción conceptual, no prueba física. |
| `misca-ola-context.svg` | campaña / procedencia | Sí | Integra universo y referencia The Met. |
| `misca-ola-art-crop.svg` | lenguaje visual | Sí | Útil para historias / Archivo Abierto. |
| `misca-ola-spec-card.svg` | ficha técnica | No | Solo desarrollo / QA. |

### Jerarquía de uso producto

Mientras no exista fotografía física aprobada:

- Home/card: `cover` → `context` como alterna;
- PDP: `front` → `back` → `detail` → `context` → `art-crop`;
- Historias: `art-crop` / `context`;
- colección: `cover` o maestro de universo;
- desarrollo: `spec-card` y estudios A/B.

Después de Product Ready la jerarquía debe cambiar a:

**foto real de producto → detalle real → campaña/editorial → obra/fuente**, manteniendo estos SVG como material editorial secundario cuando aporten contexto.

## 3. Maestros de universo

### Artistas de la Casa

| Universo | Asset | Estado | Uso recomendado |
|---|---|---|---|
| Alma Ríos · Entre grietas | `misca-universe-alma-rios.svg` | lanzamiento | Home, Artistas, colección, fallback de hero. |
| Tomás Muro · Muros que hablan | `misca-universe-tomas-muro.svg` | en estudio | teaser editorial; no producto. |
| Nina Cobalto · Frecuencia | `misca-universe-nina-cobalto.svg` | en estudio | teaser editorial; no producto. |
| Simón Bestiario · Animales del ruido | `misca-universe-simon-bestiario.svg` | en estudio | teaser editorial; no producto. |
| Vera Montaña · Ciudad vertical | `misca-universe-vera-montana.svg` | en estudio | teaser editorial; no producto. |

### Archivo Abierto

| Universo | Asset | Estado | Uso recomendado |
|---|---|---|---|
| Hokusai · La fuerza del agua | `misca-universe-hokusai.svg` | lanzamiento | Home, Archivo, colección. Fuente real sigue separada. |
| William Morris · Naturaleza repetida | `misca-universe-william-morris.svg` | en estudio | teaser únicamente; el propio master indica fuente institucional por cerrar. |
| Alphonse Mucha · Las estaciones | `misca-universe-mucha.svg` | en estudio | teaser editorial; no sustituye fuente histórica. |
| Van Gogh · El paisaje se mueve | `misca-universe-van-gogh.svg` | en estudio | teaser editorial; no sustituye fuente histórica. |
| Monet · Jardines de luz | `misca-universe-monet.svg` | en estudio | teaser editorial; no sustituye fuente histórica. |

## 4. Estudios históricos

- `misca-study-raiz-campaign.svg`
- `misca-study-ola-garment.svg`

Se conservan por trazabilidad pero no deben ocupar superficies comerciales mientras existen los sistemas V13/V14 más completos.

## 5. Paquetes generados en chats anteriores

El proyecto definió conceptualmente paquetes visuales para los diez universos, con intención de múltiples imágenes por artista/archivo —no una sola imagen por paquete—. La convención prevista era:

`assets/campaign/<universo>/01-hero.webp` ... `10-*.webp`

Esos binarios exactos no están en Git y no aparecen en el árbol persistido actual. No deben inventarse nombres SHA, derechos ni equivalencias. Si los binarios vuelven a estar disponibles desde una conversación/archivo conectado, se importarán como una nueva fuente con su manifest y reemplazarán los SVG donde sean superiores.

## 6. Matriz ruta → medios

| Ruta/superficie | Prioridad actual | Fallback V21 | Futuro |
|---|---|---|---|
| Home hero | Raíz + Ola | covers de ambos productos | fotografía/campaña final aprobada |
| Home productos | media Shopify | cover + context por handle | foto real + segunda foto |
| PDP Raíz | `product.media` | 5 frames conceptuales | galería fotográfica física |
| PDP Ola | `product.media` | 5 frames conceptuales | galería fotográfica física + fuente separada |
| Artistas índice | `artist.hero_image` | maestro por handle | retrato/campaña final |
| Artista individual | `hero_image` | maestro por handle | retrato/obra/contexto final |
| Colecciones | media de producto/colección | maestros activos | campaña final de colección |
| Historias | imágenes de artículo | art-crop/context cuando proceda | editorial final |
| Archivo | `source_image` para procedencia | maestro conceptual solo como adaptación/contexto | fuente institucional + campaña final |
| Creadores | contenido de marca | universos como contexto, no como evidencia | fotografía de proceso real |
| Calidad | evidencia física | no usar mockups como prueba | taller, tejido, impresión, QC reales |

## 7. Regla de sustitución

Los fallbacks V21 son deliberadamente fail-soft y truthful:

- si existe media real de Shopify, se renderiza la media real;
- si no existe y el handle está mapeado, se usa el asset conceptual versionado;
- si no existe mapping, se conserva placeholder;
- `spec-card` nunca entra al recorrido de cliente;
- una obra fuente nunca debe ser reemplazada por un master conceptual de Archivo Abierto.

## 8. Siguiente gate visual

`PERSISTED_ASSETS_PORTED → THEME_FALLBACKS → RESPONSIVE_CROP_QA → EXACT_CHAT_ASSET_RECOVERY_IF_AVAILABLE → PHYSICAL_PHOTO_REPLACEMENT`
