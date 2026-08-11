# Real-store integration runbook V2

## 0. Preconditions
- Do not use the live theme as the first target.
- Have Shopify CLI installed and authenticated.
- Keep Admin API tokens outside the repository.
- Products/metaobjects can remain DRAFT while theme work proceeds.

## 1. Local static checks
From the theme directory:

```bash
shopify theme check --init
shopify theme check --fail-level error
```

The package already includes `.theme-check.yml` extending `theme-check:recommended`.

## 2. Confirm store
```bash
shopify theme info
```

## 3. Development theme
```bash
shopify theme dev --store YOUR-STORE.myshopify.com
```

Use the development-theme preview with real store data.

## 4. Execute Shopify Admin Model dry run
In the Admin Model package:

```bash
export DRY_RUN=true
node setup_shopify_custom_data.mjs
```

Inspect collisions/missing products before any write.

## 5. Apply custom data only after review
```bash
export DRY_RUN=false
node setup_shopify_custom_data.mjs
```

Impact remains DRAFT and unlinked.

## 6. Merchandising
- Raíz/Ola remain DRAFT.
- Create four manual collections.
- Configure navigation.
- Apply prepared SEO.
- Configure Search & Discovery filters if we want Artist / Availability / Fit filters.

## 7. Preview QA
Run the QA matrix on:
- desktop;
- mobile;
- product deep links;
- sold-out size;
- cart quantities;
- checkout handoff;
- artist/archive routes;
- search;
- collections.

## 8. Persistent review theme
When a shareable preview must survive logout/development-theme cleanup, push/share as an unpublished theme rather than publishing live.

## 9. Product Ready gate
Only after physical validation:
- real media;
- fit;
- composition;
- GSM;
- print method;
- care;
- final price;
- inventory;
- shipping promise.

## 10. Pre-live
- Theme Check PASS.
- P1 QA PASS.
- E2E payment/shipping/refund PASS.
- Analytics PASS.
- Mobile QA PASS.
- Product status ACTIVE.
- Publication to Online Store executed separately.

## 11. Live
Publish only the reviewed unpublished theme.
