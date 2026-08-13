# MISCA V31 — Launch audit

## Scope

V31 treats the GitHub Pages storefront as a launch-candidate review surface, not as the final Shopify storefront. The audit covers Home, Prendas/Nuevo, PDP, cart, search, navigation, Artistas, Colecciones, Historias, Archivo Abierto and Creadores.

## Route audit

| Surface | Status | Launch note |
| --- | --- | --- |
| Home | Ready for validation | Product entry is visible in the first viewport; conceptual imagery remains labelled. |
| Prendas / Nuevo | Ready for validation | Two-product assortment, no fake filters, size choice happens on PDP. |
| Raíz PDP | Web-ready / product not ready | Purchase flow is coherent, but physical product evidence is still pending. |
| Ola PDP | Web-ready / product not ready | Purchase flow is coherent; source/provenance boundary remains visible. |
| Cart | Ready for preview | Quantity/subtotal work locally; GitHub Pages does not process payment. |
| Search | Ready after V31 a11y pass | Discovery is useful; V31 adds dialog/focus/live-region semantics. |
| Mobile menu | Ready after V31 a11y pass | Product-first discovery; V31 adds dialog/focus/expanded state. |
| Artistas | Ready for validation | Active vs. study hierarchy is explicit. |
| Colecciones | Ready for validation | Only the two launch universes are treated as active. |
| Historias | Ready for validation | Supports product meaning without blocking commerce. |
| Archivo Abierto | Ready for validation | Hokusai source and MISCA adaptation remain separate. |
| Creadores | Ready for validation | Service proposition is understandable without implying custom software. |

## V31 web blockers fixed

1. GitHub Pages is explicitly `noindex,nofollow` so the development preview cannot compete with the eventual Shopify storefront in search engines.
2. Cart, search and mobile menu receive dialog semantics, `aria-expanded` state, focus entry/return, Escape normalization and keyboard focus trapping.
3. Main navigation receives `aria-current` based on the active hash route.
4. Search results become an announced live region.
5. The Raíz campaign hero image is preloaded; hidden menu/search campaign images are lazy-decoded so they do not compete with the first viewport.
6. Route title/description/social metadata are synchronized for human-readable browser/share context while the preview remains noindex.

## Product / operations blockers that remain before public sales

These are not web-design defects and must not be hidden by a polished storefront.

### P0 — required before taking real orders

- Product Ready evidence for Raíz and Ola independently: approved blank, fit/measurements, print method, wash-test outcome and retained golden sample.
- Current supplier/taller quote and landed unit economics including garment, print, packing, payment fees, shipping subsidy, return allowance, taxes and acquisition cost assumptions.
- Real product photography replacing conceptual campaign images where fit, color, texture or print quality could otherwise be inferred.
- Final size chart based on the approved physical garment.
- Operational shipping promise and returns/exchanges policy based on the chosen carrier and fulfillment process.
- Shopify Admin product/variant/metafield setup aligned with `custom.commerce_status`, with purchase enabled only for Product Ready items.
- Payment, domain, legal/privacy/customer-service configuration for the real Shopify storefront.

### P1 — can follow the first controlled launch

- Additional artist universes or historical archive products.
- Advanced filtering/search facets; two launch products do not justify them yet.
- Loyalty, wishlist, personalization or marketplace software.
- Custom creator dashboards or bespoke software.
- Expanded content calendar and SEO landing-page program.

## SEO boundary

GitHub Pages is a development preview and is intentionally noindex. Shopify remains the production SEO surface. `theme/layout/theme.liquid` already uses Shopify `canonical_url`, `page_title`, `page_description` and the theme `meta-tags` snippet; search and 404 are the only theme routes explicitly marked noindex.

## Release rule

A green V31 web build means the interface is technically launch-candidate quality. It does **not** override Product Ready or operational gates. Public sales remain fail-closed until the physical and commercial evidence exists.
