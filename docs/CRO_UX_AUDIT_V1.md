# CRO + UX + Mobile Audit V1

## Outcome
The integrated build is structurally complete, but real-store launch remains blocked. This audit fixes the highest-risk interaction issues before Shopify preview.

## P0 fixes applied
1. **Mobile navigation restored.**
   - Problem: desktop nav was hidden below 990px with no replacement.
   - Fix: native `<details>` mobile menu with all primary routes + Search.

2. **Explicit size selection required.**
   - Problem: `selected_or_first_available_variant` preselected the first size.
   - Business rule: no add-to-cart without deliberate size choice.
   - Fix: when there is no deep-linked variant, variant ID is blank and CTA says `Elegir talla`.

3. **Cart drawer CTA now reaches checkout.**
   - Problem: `Finalizar compra` linked to `/cart`.
   - Fix: native cart form with `name="checkout"`.
   - Secondary link is now `Ver bolsa completa`.

4. **Above-the-fold PDP image is no longer lazy-loaded.**
   - First product image uses eager loading + high fetch priority.
   - Subsequent PDP media remains lazy.

## P1 improvements applied
5. Mobile sticky buy bar:
   - before selection → `Elegir talla`;
   - after valid selection → `Agregar`;
   - sold-out → `Agotado`.

6. Size availability:
   - uses Shopify `product_option_value.available`;
   - unavailable values disabled and struck through.

7. Cart usability:
   - + / − quantity controls;
   - remove;
   - live status messages;
   - loading/error feedback.

8. Cart accessibility:
   - Escape closes;
   - focus returns to trigger;
   - focus is trapped while open;
   - body scroll locks.

9. Size guide:
   - dialog exists only when validated `fit_notes` content exists;
   - no dead CTA before Product Ready.

10. Product cards:
   - optional second product image on hover;
   - no extra JS.

11. Collection filtering:
   - native Shopify filters render only when configured in Admin/Search & Discovery;
   - no artificial filters hardcoded in the theme.

12. Keyboard focus:
   - visible `:focus-visible` treatment added to critical interactive elements.

## P2 / real-store tasks
- Run Shopify Theme Check.
- Run Lighthouse on Home / Product / Collection with real content.
- Consider moving section-specific CSS into `{% stylesheet %}` to benefit from Shopify stylesheet subsetting after Theme Check identifies meaningful wins.
- Add real analytics wiring for `select_size`, `add_to_cart`, `view_artist`, `view_source_artwork`.
- Validate money formatting against the store currency/market configuration before international expansion.
- Validate filters configured in Search & Discovery.
- Validate browser/device matrix.
- Test low-bandwidth mobile with real campaign photography.
- Test actual checkout, payment provider and shipping methods.

## Conversion principles preserved
- Home can be editorial; PDP/cart cannot hide the purchase.
- No fake urgency, fake stock or fake reviews.
- No size preselection.
- No checkout detour.
- No public physical facts before Product Ready.
- No forced cross-sell in launch cart.
