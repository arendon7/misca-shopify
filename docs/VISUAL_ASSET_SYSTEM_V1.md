# MISCA — Visual Asset System V1

Fecha: 2026-08-12
Estado: ACTIVE_DIRECTION · EXACT_CAMPAIGN_FILES_PENDING_IMPORT

## Principio

La web no trata las imágenes como decoración. Cada universo visual debe funcionar como sistema reusable entre Home, artista, colección, PDP, historias y campañas.

## Fuente de verdad creativa

El proyecto ya definió y aprobó conceptualmente paquetes visuales para:

### Artistas de la Casa
1. Alma Ríos — Entre grietas — botánica / raíces / concreto / espacio negativo.
2. Tomás Muro — Muros que hablan — capas urbanas / números / fachadas / memoria gráfica.
3. Nina Cobalto — Frecuencia — abstracción geométrica / ritmo / pausa / cobalto.
4. Simón Bestiario — Animales del ruido — personajes narrativos / criaturas / humor incómodo.
5. Vera Montaña — Ciudad vertical — fotografía intervenida / ladera / niebla / concreto.

### Archivo Abierto
6. Hokusai — La fuerza del agua — ola / Fuji / navy / adaptación documentada.
7. William Morris — Naturaleza repetida — patrón botánico / repetición / verde botella.
8. Alphonse Mucha — Las estaciones — figura / estación / composición ornamental histórica.
9. Van Gogh — El paisaje se mueve — ciprés / paisaje / movimiento de pincel.
10. Monet — Jardines de luz — agua / reflejo / puente / luz.

## Estado de archivos

Los archivos exactos de los paquetes generados/aprobados en conversaciones anteriores todavía no están versionados en `preview/site/assets`.

El repo contiene hoy únicamente:
- `assets/raiz-campaign-study.svg`
- `assets/ola-garment-study.svg`

V11 introduce un `visual registry` y `data-asset-slot` para que las composiciones provisionales puedan ser reemplazadas por los archivos exactos sin modificar la arquitectura de páginas.

## Regla de evidencia

- Artistas de la Casa: imágenes generadas/editoriales pueden usarse como campaña conceptual siempre que no inventen trayectoria personal real.
- Archivo Abierto: la imagen generada nunca sustituye la obra fuente para producción ni procedencia.
- Producto: mockups/concept art nunca sustituyen fotografía física para Product Ready.
- En cuanto exista muestra física aprobada, la jerarquía visual pasa a: foto real de producto → detalle real → campaña/editorial → obra/fuente cuando aplique.

## Arquitectura V11

### Home
- lanzamiento comercial Raíz/Ola;
- mosaico de universos visuales;
- artistas como sistema de descubrimiento;
- Archivo Abierto diferenciado visualmente.

### Artista
- hero textual;
- tira editorial de 3 imágenes;
- colección/producto;
- narrativa.

### Colección
- una superficie visual dominante por colección;
- producto visible separado de conceptos en desarrollo.

### PDP
- galería comercial primero;
- campaña/contexto después;
- dirección A/B y ficha de taller continúan como herramientas de desarrollo.

### Archivo Abierto
- obra/fuente/adaptación;
- identidad visual distinta de Artistas de la Casa.

## Import manifest recomendado

Cuando los archivos exactos estén disponibles, usar nombres estables:

- `assets/campaign/alma-rios/01-hero.webp` ... `10-*.webp`
- `assets/campaign/tomas-muro/01-hero.webp` ...
- `assets/campaign/nina-cobalto/01-hero.webp` ...
- `assets/campaign/simon-bestiario/01-hero.webp` ...
- `assets/campaign/vera-montana/01-hero.webp` ...
- `assets/campaign/hokusai/...`
- `assets/campaign/william-morris/...`
- `assets/campaign/mucha/...`
- `assets/campaign/van-gogh/...`
- `assets/campaign/monet/...`

Cada archivo debe registrar:
- universo;
- uso autorizado: campaign/editorial/product/source;
- origen;
- derechos;
- si es generado, institucional o fotografía física;
- fecha/import SHA.

## Próximo gate visual

EXACT_ASSET_IMPORT → ROUTE_MAPPING → RESPONSIVE_CROP_QA → IMAGE_WEIGHT_QA → CAMPAIGN_READY.
