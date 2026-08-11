# MISCA / STUDIO — Shopify storefront

Repository baseline for the artist-apparel ecommerce platform.

## Project dashboard

**Live status:** https://arendon7.github.io/misca-shopify/

The GitHub Pages dashboard is deployed from `main` by GitHub Actions and shows the current implementation gates, Shopify preview blockers, QA state, Product Ready separation and recent milestones.

## Current release
`SHOPIFY-DEV-INTEGRATION-V4`

## Contents
- `theme/` — Shopify Theme 2.0 storefront
- `setup/` — Shopify Admin custom-data setup
- `analytics/` — event model + QA pixel template
- `qa/` — integration, CRO and production-hardening evidence
- `status/` — project-status data and Pages dashboard
- `docs/` — runbooks and architecture
- `.github/workflows/` — Theme Check, Pages dashboard and unpublished Shopify preview workflows

## Status
**Not live.**

Validated on GitHub:
- Dedicated repository is the canonical storefront source.
- Official Shopify Theme Check passes on PR and `main`.
- Safe unpublished-preview deployment pipeline is merged.
- One-time bootstrap can create `MISCA Preview` without a pre-existing theme ID.
- No automatic live-publish workflow exists.

Remaining external gates:
1. Configure `SHOPIFY_CLI_THEME_TOKEN` and `SHOPIFY_FLAG_STORE` in GitHub Actions.
2. Bootstrap the first persistent unpublished `MISCA Preview` theme.
3. Execute the 40-check storefront QA matrix with real Shopify resources.
4. Execute the 12-check analytics QA matrix.
5. Product Ready for factual product claims/media.
6. E2E payment/shipping/refund.

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

> Repository visibility is currently public. Private visibility is recommended while the storefront is under construction. The Pages dashboard contains project status only and no credentials.
