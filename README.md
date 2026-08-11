# MISCA / STUDIO — Shopify storefront

Repository baseline for the artist-apparel ecommerce platform.

## Current release
`SHOPIFY-DEV-INTEGRATION-V4`

## Contents
- `theme/` — Shopify Theme 2.0 storefront
- `setup/` — Shopify Admin custom-data setup
- `analytics/` — event model + QA pixel template
- `qa/` — integration, CRO and production-hardening evidence
- `docs/` — runbooks and architecture
- `.github/workflows/` — Theme Check + unpublished preview deployment

## Status
**Not live.**

Remaining external gates:
1. Official Shopify Theme Check.
2. Unpublished/development-theme preview with real store data.
3. Product Ready for factual product claims/media.
4. E2E payment/shipping/refund.
5. Analytics QA.

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
