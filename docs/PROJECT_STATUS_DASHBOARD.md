# MISCA project status dashboard

## URL
https://arendon7.github.io/misca-shopify/

## Purpose
The Pages site is an executive progress view, not the Shopify storefront.

It shows:
- digital implementation gates;
- official Theme Check state;
- Shopify preview/bootstrap state;
- storefront and analytics QA counters;
- Product Ready as a separate physical-product gate;
- next actions;
- recent implementation milestones;
- the exact commit and Actions run that built the dashboard.

## Source of truth
Tracked status data lives in:

`status/project-status.json`

The visual shell lives in:

`status/site/index.html`

## Deployment
Workflow:

`.github/workflows/pages-dashboard.yml`

Every push to `main` rebuilds and redeploys the dashboard. It can also be run manually.

The workflow generates `runtime.json` during the build so the site can display the exact source commit, run number and build time without committing generated runtime data.

## GitHub Pages configuration
The repository Pages source is configured as **GitHub Actions** (`build_type=workflow`).

The deployment workflow uses the official Pages artifact pipeline:
- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

## Status semantics
- `PASS` — verified evidence exists.
- `PASS_CODE` — implementation is present and statically/platform validated where possible; runtime execution is still pending.
- `BLOCKED_EXTERNAL` — requires an external credential/configuration or physical dependency.
- `BLOCKED_DEPENDENCY` — cannot start until an upstream gate closes.
- `BLOCKED_PHYSICAL` — requires physical Product Ready evidence.
- `NOT_READY` — aggregate launch state is intentionally not authorized.

## Governance
Do not turn the dashboard into a source of commercial facts. Product specifications, readiness and launch approval remain governed by Product Ready and the operating system.

The dashboard must never contain secrets, tokens, customer information, unpublished financial details that should remain private, or Shopify credentials.
