# GitHub repository status

Repository:
`arendon7/misca-shopify`

Observed visibility on 2026-08-11: **public**.
Recommended visibility during build: **private**.

## Completed
1. Baseline imported through PR #1.
2. Official Shopify Theme Check executed on the PR.
3. Two schema errors in `settings_schema.json` were fixed.
4. Theme Check passed on the updated PR.
5. PR #1 merged to `main`.
6. Theme Check passed again on the merge commit.

## Current sequence
1. Change repository visibility to private if desired for the build phase.
2. Create or confirm an existing unpublished Shopify preview theme.
3. Configure Shopify preview credentials/variables in GitHub Actions.
4. Run the manual `Deploy Shopify preview theme` workflow.
5. Execute storefront + analytics QA on the real preview.

## Required GitHub Actions configuration for preview
Secret:
- `SHOPIFY_CLI_THEME_TOKEN`

Store value:
- `SHOPIFY_FLAG_STORE`

Variable:
- `SHOPIFY_PREVIEW_THEME_ID`

Never commit these values to the repository.

Operational checklist: GitHub issue #2.
