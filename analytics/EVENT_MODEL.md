# Analytics Event Model V1

## Principle
Do not recreate Shopify ecommerce events when Shopify Customer Events already emits them.

### Shopify standard Customer Events
Use these as the canonical commerce layer:
- `page_viewed`
- `collection_viewed`
- `product_viewed`
- `product_added_to_cart`
- `product_removed_from_cart`
- `cart_viewed`
- `search_submitted`
- `checkout_started`
- `checkout_contact_info_submitted`
- `checkout_address_info_submitted`
- `checkout_shipping_info_submitted`
- `payment_info_submitted`
- `checkout_completed`

## Miscas custom Customer Events
Published with `Shopify.analytics.publish()` and prefixed `misca:`.

| Event | Why it exists | Key fields |
|---|---|---|
| `misca:product_card_selected` | Shopify has no standard PLP-card click event | productHandle, productTitle, artistHandle, collectionHandle, surface |
| `misca:size_selected` | deliberate variant/size intent | productHandle, variantId, variantTitle, selectedOptions, available |
| `misca:size_guide_opened` | fit-information demand | productHandle |
| `misca:size_required_prompted` | buyer tried sticky CTA before choosing size | productHandle, surface |
| `misca:cart_drawer_opened` | distinguish drawer exposure from cart-page view | none |
| `misca:artist_viewed` | measure creator discovery | handle, title |
| `misca:source_artwork_viewed` | measure provenance engagement | handle/artworkHandle, title, productHandle |
| `misca:impact_viewed` | measure impact-program engagement | handle, title, productHandle |

## Funnel mapping
Legacy measurement language → Shopify/Miscas event:

- `view_item_list` → `collection_viewed`
- `select_item` → `misca:product_card_selected`
- `view_item` → `product_viewed`
- `open_size_guide` → `misca:size_guide_opened`
- `select_size` → `misca:size_selected`
- `add_to_cart` → `product_added_to_cart`
- `view_cart` → `cart_viewed` + `misca:cart_drawer_opened` for drawer context
- `begin_checkout` → `checkout_started`
- `add_shipping_info` → `checkout_shipping_info_submitted`
- `add_payment_info` → `payment_info_submitted`
- `purchase` → `checkout_completed`

## Core ratios
- PDP → Add to Cart = `product_added_to_cart / product_viewed`
- Add to Cart → Checkout = `checkout_started / product_added_to_cart`
- Checkout → Purchase = `checkout_completed / checkout_started`
- PDP → Purchase = `checkout_completed / product_viewed`
- Size-guide usage = `misca:size_guide_opened / product_viewed`
- Size-selection intent = `misca:size_selected / product_viewed`
- Product-card CTR = `misca:product_card_selected / collection_viewed` (directional; denominator is collection views, not card impressions)

## Privacy
Never send:
- email
- phone
- address
- payment details
- free-form support text
- customer name
- order notes

Custom event payloads are behavioral/product metadata only.
