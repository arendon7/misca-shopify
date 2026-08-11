# Analytics + CI V1

## Analytics architecture
### Layer A — Shopify Customer Events
Use Shopify's standard customer events for commerce and checkout measurement.

### Layer B — Miscas custom events
Theme publishes only non-standard interactions through `Shopify.analytics.publish()` with `misca:` prefixes.

### Layer C — Standard storefront events
The theme loads Shopify's standard-events library and emits:
- `shopify:page:view`
- `shopify:product:view`
- `shopify:collection:view`

These events are an interoperability layer for apps/agents; do not confuse them with Customer Events/Web Pixels.

## Why both systems exist
- **Customer Events/Web Pixels** = analytics/marketing event pipeline.
- **Standard storefront events/actions** = communication contract between theme, apps and agents.

## CI
### Pull request / main
`.github/workflows/theme-check.yml`
- install Shopify CLI
- run official Theme Check
- fail on error severity

### Preview deployment
`.github/workflows/deploy-preview.yml`
- manual only;
- environment `shopify-preview`;
- requires Theme Access password in secrets;
- requires an **existing unpublished preview theme ID** in repository/environment variable;
- uses `--strict`, so Theme Check errors block upload;
- no `--publish`, no `--allow-live`.

## Required GitHub configuration
Secrets:
- `SHOPIFY_FLAG_STORE`
- `SHOPIFY_CLI_THEME_TOKEN`

Variable:
- `SHOPIFY_PREVIEW_THEME_ID`

## Production publishing
Not automated in V1.
Publishing live remains a human release gate after:
- Product Ready
- E2E
- Analytics QA
- Mobile QA
- official Theme Check
- approved preview

This is intentional.
