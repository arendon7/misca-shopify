# MISCA — Editorial System V22

Fecha: 2026-08-12
Estado: THEME_EDITORIAL_SYSTEM

## Objetivo

V22 lleva al theme Shopify la profundidad editorial que ya existía en la preview sin volver a mezclar desarrollo, inventario y contenido de marca.

La regla central es:

**producto activo primero → contexto editorial después → universos en estudio claramente separados.**

## Biblioteca visual

V22 no crea una biblioteca paralela. Reutiliza los 26 SVG persistidos e inventariados en `VISUAL_ASSET_INVENTORY_V2.md`.

Prioridad de evidencia:

1. media real cargada en Shopify;
2. asset conceptual V21/V22 mapeado al tema correcto;
3. placeholder cuando no existe mapping.

Los fallbacks permanecen etiquetados como estudios conceptuales. No prueban fit, gramaje, técnica, stock, tiempos de entrega ni durabilidad.

## Historias

- El primer artículo ocupa una posición editorial protagonista.
- Cada artículo usa su imagen Shopify cuando existe.
- Sin imagen, V22 determina un fallback por señales del handle/título: Raíz, Ola/Hokusai, calidad/producto, creadores/artistas, archivo/procedencia o composición general de Historias.
- El artículo individual mantiene la misma lógica para evitar una portada vacía.
- La ausencia de artículos no genera contenido ficticio.

## Para creadores

La ruta deja de explicar el proyecto como modelo interno y presenta una propuesta de servicio:

- Creador: obra, criterio visual, aprobación y comunidad.
- MISCA: desarrollo de producto, producción, Shopify, cobro, empaque, envío, soporte, reporte y liquidación.

Modelo inicial visible:

- 1 concepto central;
- 1–3 prendas;
- preventa / bajo pedido / lote corto;
- comisión, base liquidable y responsabilidades definidas antes del lanzamiento.

## Calidad y proceso

V22 añade `page.quality.json` + `main-quality.liquid`.

La página no afirma especificaciones aún no probadas. Expone seis gates de evidencia:

1. material;
2. fit;
3. técnica;
4. lavado;
5. entrega;
6. cambios.

También separa explícitamente lo que un estudio conceptual puede comunicar de lo que solo puede demostrar una muestra física.

## Artistas

El índice deja de tratar todos los metaobjects por igual.

- artistas con `primary_collection` → Colección activa;
- artistas sin `primary_collection` → Universo en estudio.

La ficha individual replica el estado. Un artista en estudio no recibe una falsa cuadrícula de productos ni fecha de lanzamiento inventada.

## Archivo Abierto

`main-artwork.liquid` separa dos superficies:

1. Obra fuente institucional.
2. Contexto/adaptación conceptual MISCA.

Si falta `source_image`, la página lo declara y no utiliza el master conceptual como sustituto de la obra.

## Colecciones

La lista prioriza:

1. `entre-grietas`;
2. `la-fuerza-del-agua`.

Cualquier otra colección publicada en Shopify aparece después. Los universos sin colección real permanecen fuera de esta ruta.

Las dos colecciones activas reciben contexto específico:

- Entre grietas → Alma Ríos / Artista de la Casa.
- La fuerza del agua → Archivo Abierto / Hokusai.

## Activación Shopify

La plantilla de Calidad queda disponible como `page.quality` para asignarla a la página correspondiente desde Shopify Admin.

El CTA de creadores en Home intenta resolver automáticamente una página con handle `creadores` o `para-creadores` cuando no se configura un enlace manual.

## Siguiente gate

`EDITORIAL_SYSTEM → THEME_CHECK → RESPONSIVE_VISUAL_QA → SHOPIFY_ADMIN_CONTENT_MAPPING → PHYSICAL_MEDIA_REPLACEMENT`
