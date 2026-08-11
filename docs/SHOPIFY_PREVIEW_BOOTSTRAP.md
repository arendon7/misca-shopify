# Shopify preview bootstrap

## Purpose
Create the first persistent unpublished MISCA preview theme without requiring a pre-existing theme ID.

## Required GitHub secrets
- `SHOPIFY_FLAG_STORE` — the store `.myshopify.com` domain.
- `SHOPIFY_CLI_THEME_TOKEN` — Theme Access password or compatible Admin API token.

Theme Access is preferred for theme-only CI access.

## Workflow
Run **Bootstrap Shopify preview theme** manually.

The workflow:
1. validates store/token configuration;
2. refuses to create another theme if an unpublished theme matching `MISCA Preview` already exists;
3. runs `shopify theme push --unpublished --strict --json`;
4. verifies the returned role is `unpublished`;
5. renames the created theme to `MISCA Preview`;
6. verifies the resulting ID still exists with role `unpublished`;
7. records the theme ID, preview URL, editor URL and source commit in the Actions summary.

## After bootstrap
Copy the numeric theme ID from the Actions summary into the GitHub variable:

`SHOPIFY_PREVIEW_THEME_ID`

Then use **Deploy Shopify preview theme** for every subsequent preview update.

## Safety boundary
This workflow contains no `theme publish`, `--publish`, `--live`, or `--allow-live` path.

The normal deploy workflow separately proves the configured target is `unpublished` before and after each strict push.

## Do not rerun casually
Bootstrap is a one-time operation. If `MISCA Preview` already exists, the workflow intentionally fails and asks you to reuse the existing theme ID instead of creating theme-library clutter.
