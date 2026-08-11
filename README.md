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

Validated on GitHub:
- PR #1 merged to `main`.
- Official Shopify Theme Check passed on the PR.
- Official Shopify Theme Check passed again on `main` after merge.
- No automatic live-publish workflow exists.

Remaining external gates:
1. Configure unpublished/development-theme preview access to the real Shopify store.
2. Execute the 40-check storefront QA matrix with real Shopify resources.
3. Execute the 12-check analytics QA matrix.
4. Product Ready for factual product claims/media.
5. E2E payment/shipping/refund.

Operational tracking for the preview gate lives in GitHub issue #2.

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

> Repository visibility is currently public. Private visibility is recommended while the storefront is under construction.
