# V30 — Public runtime consolidation

## Objective
Reduce the GitHub Pages storefront from a historical stack of visual/development layers to the smallest public runtime that still supports the current customer experience.

## Public runtime retained

CSS loaded by `preview/site/index.html`:
- `styles.css` — base storefront shell
- `v6.css` — commerce primitives, size guide, cart and mobile buybar
- `v7.css` — CRO/accessibility refinements used by the retained runtime
- `v15.css` — customer-facing gallery/commerce coherence
- `v16.css` — overlay/accessibility classes still used by V17
- `v17.css` — stabilization plus V28/V29/V30 global refinements
- `v18.css` — brand/customer layer
- `v19.css` — funnel refinements
- `v23.css` — current editorial route system
- `v25.css` — current photographic/PDP visual system
- `v27.css` — loaded dynamically by `v19.js` for PDP commerce finish

JavaScript loaded by `preview/site/index.html`:
- `app.js` — base router, product data and cart logic
- `v6.js` — commerce primitives
- `v7.js` — assortment/PDP/cart accessibility behavior
- `v15.js` — five-frame PDP gallery and customer layer
- `v17.js` — route guards, search/cart stabilization and overlay state
- `v18.js` — brand/customer coherence
- `v19.js` — conversion refinements and V27 stylesheet loader
- `v23.js` — current controlled-route rendering
- `v25.js` — current photographic visual integration
- `fixes.js` — final public overrides for V28/V29/V30; intentionally loaded last

## Archived from the public runtime
The following files remain versioned for project history and development reference but are not loaded by the customer storefront:
- V5
- V8
- V9
- V10
- V11
- V12
- V13
- V14

These layers mostly created conceptual garment mockups, A/B design directions, workshop/specification modules, asset-slot planning, universe studies, static masters and campaign-development modules. V15+V23+V25 now provide the customer-facing equivalents using the persisted asset library.

## Safety rule
V16 JavaScript remains deliberately unloaded because of historical observer instability. `v16.css` remains loaded because V17 still uses V16-prefixed accessibility/overlay classes.

## V30 responsive QA
V30 adds global guards for:
- horizontal overflow;
- full-height mobile menu/search/cart overlays using `100svh`;
- safe-area padding;
- contained overscroll in overlays;
- touch target sizing;
- mobile launch/shop navigation containment.

## Validation
Pages CI must assert both sides of the runtime contract:
1. retained public files are loaded;
2. archived V5/V8–V14 files are **not** referenced by `index.html`.

The archived files continue to be syntax/existence checked so they remain recoverable project history without participating in production rendering.
