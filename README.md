# MISCA / STUDIO — Shopify storefront

Repository baseline for the artist-apparel ecommerce platform.

## Visual storefront preview

**Live preview:** https://arendon7.github.io/misca-shopify/

GitHub Pages is the visual review surface for the storefront while the real Shopify unpublished theme is not yet connected. It includes a navigable Home, Prendas, product pages, artists, collections, Archivo Abierto, stories, Para Creadores and a functional preview cart.

**Project status dashboard:** https://arendon7.github.io/misca-shopify/status/

The `/status/` route remains the executive progress dashboard. The storefront preview and the status dashboard are intentionally separate.

## Current release
`SHOPIFY-DEV-INTEGRATION-V4`

## Contents
- `theme/` — Shopify Theme 2.0 storefront
- `preview/` — high-fidelity static storefront review surface for GitHub Pages
- `setup/` — Shopify Admin custom-data setup
- `analytics/` — event model + QA pixel template
- `qa/` — integration, CRO and production-hardening evidence
- `status/` — project-status data and secondary Pages dashboard
- `docs/` — runbooks and architecture
- `.github/workflows/` — Theme Check, Pages preview and unpublished Shopify preview workflows

## Important distinction
The GitHub Pages storefront is a **review preview**, not the production store and not a replacement for Shopify runtime QA.

It intentionally shows the current merchandising, narrative, product UX and interaction model while preserving Product Ready gates. Prices may be provisional; final material, GSM, fit, technique, care, inventory and shipping facts remain blocked until physical validation.

## Status
**Not live.**

Validated on GitHub:
- Dedicated repository is the canonical storefront source.
- Official Shopify Theme Check passes on PR and `main`.
- Safe unpublished-preview deployment pipeline is merged.
- One-time bootstrap can create `MISCA Preview` without a pre-existing theme ID.
- GitHub Pages automatically deploys the visual storefront preview from `main`.
- No automatic live-publish workflow exists.

Remaining external gates:
1. Configure `SHOPIFY_CLI_THEME_TOKEN` and `SHOPIFY_FLAG_STORE` in GitHub Actions.
2. Bootstrap the first persistent unpublished `MISCA Preview` theme.
3. Execute the 40-check storefront QA matrix with real Shopify resources.
4. Execute the 12-check analytics QA matrix.
5. Product Ready for factual product claims/media.
6. E2E payment/shipping/refund.

Operational tracking for the Shopify runtime gate lives in GitHub issue #2.

## Local Theme Check
```bash
npm install -g @shopify/cli
shopify theme check --path theme --fail-level error --no-color
```

## Development preview
```bash
shopify theme dev --path theme --store YOUR-STORE.myshopify.com
```

## Release policy
There is intentionally no automatic live deployment.

> Repository visibility is currently public. Private visibility is recommended while the storefront is under construction. Never put Shopify credentials, customer data or private financial data into the Pages preview.
