# GitHub repository status

Repository created:
`arendon7/misca-shopify`

Observed visibility on 2026-08-11: **public**.
Recommended visibility during build: **private**.

## Current sequence
1. Push the committed storefront baseline to `main`.
2. Confirm the Theme Check workflow runs.
3. Fix every error-level Theme Check finding.
4. Configure Shopify preview credentials only after the repository visibility is acceptable.
5. Push strictly to an existing unpublished theme.

## Required GitHub Actions configuration for preview
Secret:
- `SHOPIFY_CLI_THEME_TOKEN`

Store value:
- `SHOPIFY_FLAG_STORE`

Variable:
- `SHOPIFY_PREVIEW_THEME_ID`

Never commit these values to the repository.
