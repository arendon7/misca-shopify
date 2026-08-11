# Preview Deploy Safety V1

## Purpose
Prevent CI from modifying the live Shopify theme while still allowing a repeatable persistent preview from `main`.

## Controls
1. Preview deployment is manual (`workflow_dispatch`).
2. GitHub job has read-only repository permissions.
3. Required Shopify values are validated before any remote write.
4. Preview theme ID must be numeric.
5. `shopify theme list --id ... --role unpublished --json` must confirm that the configured target is unpublished before push.
6. `theme push` uses `--strict` and does not use `--publish`, `--live`, or `--allow-live`.
7. Shopify's JSON response is checked again after push: theme ID must match and role must remain `unpublished`.
8. Preview/editor URLs and deployed commit SHA are written to the GitHub Actions step summary.
9. Deployments are serialized with the `shopify-preview` concurrency group.

## External configuration still required
- `SHOPIFY_CLI_THEME_TOKEN` — GitHub Actions secret.
- `SHOPIFY_FLAG_STORE` — GitHub Actions secret.
- `SHOPIFY_PREVIEW_THEME_ID` — GitHub Actions variable.
- Existing Shopify theme whose role is `unpublished`.

## Release boundary
This workflow is not a production release mechanism. Live publishing stays outside CI until the business deliberately establishes a separate release policy after Product Ready, storefront QA, analytics QA and E2E commerce validation.
