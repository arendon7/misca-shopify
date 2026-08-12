# MISCA — Shopify Commerce Readiness V1

## Objetivo
Convertir el theme de desarrollo en una tienda que falle cerrada: un producto puede existir, tener contenido y ser navegable sin quedar comprable hasta que su evidencia física y su operación estén aprobadas.

## 1. Estado comercial obligatorio

Crear en Shopify Admin un metafield de producto:

- Namespace/key: `custom.commerce_status`
- Tipo recomendado: texto de una línea
- Valores permitidos por proceso MISCA: `draft`, `validation`, `ready`
- Default operativo: `draft`

Semántica:

- `draft`: concepto o producto incompleto. No compra.
- `validation`: muestra/proceso/operación en validación. No compra.
- `ready`: producto autorizado para venta pública, sujeto además a disponibilidad de la variante.

El theme trata cualquier valor ausente o desconocido como `draft`.

## 2. Regla de publicación

`ready` se asigna por producto, nunca por colección completa. Raíz y Ola deben poder aprobarse o bloquearse de manera independiente.

Un producto solo pasa a `ready` cuando existe evidencia archivada para todos los puntos siguientes:

1. Cotización/especificación vigente del proveedor.
2. Golden sample aprobado y retenido como referencia QC.
3. Tela/composición/peso documentados desde evidencia real.
4. Medidas finales por talla y criterio de fit aprobado.
5. Técnica de impresión/bordado aprobada para esa pieza.
6. Ubicación, escala y color de arte aprobados sobre muestra física.
7. Prueba de lavado/cuidado cerrada y copy de cuidados aprobado.
8. Precio de venta final autorizado con margen revisado.
9. Peso/datos logísticos suficientes para la configuración de envío.
10. Tiempo de preparación y cobertura de entrega definidos.
11. Política de cambios aplicable al producto publicada.
12. Inventario o regla de producción bajo pedido configurada.
13. Proveedor de pago habilitado y pedido de prueba completado en Shopify.
14. Configuración tributaria/fiscal revisada para la operación colombiana; no hardcodear tasas en theme.
15. Eventos de analítica de vista, selección de variante, add-to-cart y checkout verificados.

## 3. Contrato mínimo de producto

### Producto Shopify

Obligatorio antes de `ready`:

- `title`
- `handle`
- `vendor`
- descripción comercial final
- media final con alt text
- precio final
- estado de publicación correcto
- `custom.commerce_status = ready`
- `custom.artist`
- `custom.primary_collection`
- `custom.product_details`
- `custom.fit_notes`
- `custom.care`

Para Archivo Abierto, mantener además la relación de procedencia ya modelada en el proyecto.

### Variantes

Para el lanzamiento actual:

- opción: `Talla`
- valores previstos en el concepto: S, M, L, XL
- cada variante debe tener SKU único antes de venta
- precio heredado o explícito validado
- inventario/continuación de venta configurados deliberadamente
- peso y fulfillment consistentes con la operación real

No se deben inventar medidas, gramajes, pesos logísticos, técnicas ni tiempos de entrega para completar la ficha.

## 4. Precio y SEO antes de Product Ready

Con `enforce_commerce_readiness` activo:

- `draft` y `validation` no pueden agregarse a la bolsa desde el theme.
- el precio de preventa/prelanzamiento puede ocultarse con `show_prelaunch_price = false`.
- el JSON-LD de producto/offer solo se emite para productos `ready`.
- una variante disponible en Shopify no basta para habilitar compra si el producto no está `ready`.

Esta barrera del theme es una protección de UX y proceso, no sustituye la configuración de publicación, inventario, mercados ni checkout en Shopify Admin.

## 5. Colombia — checklist de lanzamiento

La configuración operativa debe cerrarse en Shopify Admin y con los responsables financieros/contables de MISCA:

- moneda comercial COP;
- mercado/zona de envío inicial Colombia;
- origen real de fulfillment en Medellín o la ubicación operativa definitiva;
- tarifas o reglas de envío validadas contra peso, destino y transportadora;
- proveedor(es) de pago habilitados en la tienda;
- tratamiento de impuestos, facturación y obligaciones legales validado externamente antes de vender;
- políticas de envío, cambios, privacidad y términos publicadas;
- pedido de prueba de punta a punta: producto → talla → bolsa → pago → orden → preparación → notificación.

No se fijan aquí tasas, comisiones ni promesas de entrega porque son datos operativos variables.

## 6. Estado inicial recomendado para MISCA

Hasta que la evidencia física completa esté confirmada en Shopify Admin:

- Raíz de concreto: `validation`
- Ola: `validation`

El repositorio no debe inferir que un proveedor o precio histórico equivale a autorización de compra actual.

## 7. Analítica mínima

Eventos MISCA esperados:

- `product_card_selected`
- `size_guide_opened`
- `size_selected`
- `size_required_prompted`
- `cart_drawer_opened`
- `add_to_cart`
- `commerce_blocked`

`commerce_blocked` permite medir intención de compra antes de Product Ready sin abrir checkout prematuramente.

## 8. Secuencia de activación

1. Completar evidencia Product Ready del producto.
2. Completar metafields y variantes.
3. Revisar margen final y operación.
4. Configurar publicación/inventario/mercado/pagos en Admin.
5. Cambiar `custom.commerce_status` a `ready`.
6. Ejecutar Theme Check y QA manual del PDP.
7. Ejecutar pedido de prueba.
8. Publicar la pieza.

Nunca cambiar a `ready` solo para probar el botón de compra; usar un producto/tema de desarrollo para pruebas técnicas.