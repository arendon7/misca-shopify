# Production Hardening V1

## Why this pass exists
The theme had become feature-complete enough that the main risk shifted from missing routes to accidental customer-facing construction states.

## Fixes
1. Static CSS is Liquid-free; dynamic theme colors remain in `theme.liquid`.
2. Hero and creator CTAs render only when both label and URL exist.
3. Featured Products hides itself in customer mode when no products are configured.
4. Theme-editor product placeholders are visible only in design mode.
5. Artist / Archive / Product fallbacks are customer-safe rather than merchant instructions.
6. Search results paginate.
7. Product and article pages emit Shopify-native `structured_data`.
8. Open Graph/Twitter metadata is centralized in `snippets/meta-tags.liquid`.
9. Search and 404 pages are noindex/follow.
10. Offline hardening audit checks JSON, section schemas, missing snippets/sections, Liquid inside static assets and construction phrases.

## Still not a replacement for Theme Check
`PRODUCTION_HARDENING_AUDIT.py` is a project-specific preflight. It does not claim equivalence to Shopify Theme Check.

## Remaining external blockers
- Shopify CLI Theme Check.
- Development-theme rendering with real Shopify resources.
- Lighthouse with real media.
- Full checkout/payment/shipping E2E.
