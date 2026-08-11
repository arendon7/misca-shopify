# GitHub Pages storefront preview

## Purpose
GitHub Pages is the visual review environment for MISCA before the real Shopify unpublished theme is connected.

Primary URL:
`https://arendon7.github.io/misca-shopify/`

Project-status dashboard:
`https://arendon7.github.io/misca-shopify/status/`

## What the root preview includes
- Home
- Nuevo
- Prendas / PLP
- Collections
- Entre grietas
- La fuerza del agua
- Raíz de concreto PDP
- Ola PDP
- explicit size selection
- preview cart with quantity controls
- Artistas index
- individual artist pages
- Archivo Abierto index
- provenance/source pages
- Stories
- Para Creadores
- Quality/process
- Search
- responsive mobile navigation

## Routing
The static preview uses hash-based routes so the entire storefront works reliably under the GitHub Pages project path without requiring server rewrites.

Examples:
- `#/prendas`
- `#/producto/raiz-de-concreto`
- `#/producto/ola-hokusai`
- `#/artistas`
- `#/artista/alma-rios`
- `#/archivo`
- `#/creadores`

## Product-truth boundary
This preview is not allowed to create fake physical certainty.

It may show current commercial hypotheses, narrative and UX, but final facts remain gated until Product Ready:
- composition
- GSM
- measured fit
- final size guide
- print technique
- care instructions
- inventory
- shipping SLA
- final real photography

## Relationship to Shopify theme
`theme/` remains the canonical Shopify implementation.

`preview/site/` is a static visual review layer. It should follow the same hierarchy, content decisions and interaction rules but must not become a second independent product specification.

When a real Shopify unpublished preview exists, runtime QA moves there. GitHub Pages remains useful for fast visual iteration and stakeholder review.

## Pages deployment
`.github/workflows/pages-dashboard.yml` now deploys:
- `preview/site/` → Pages root
- `status/site/` → `/status/`

The workflow runs `node --check preview/site/app.js` before deployment.
