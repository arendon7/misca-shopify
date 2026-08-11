
# Development deployment runbook

## Preferred workflow
1. Authenticate Shopify CLI to the store.
2. Run `shopify theme check` in the theme-only directory.
3. Run `shopify theme dev --store STORE` for a temporary hidden development theme.
4. Run Admin Model V1 in DRY_RUN mode or create definitions manually.
5. Create draft products/collections/navigation/pages/blog.
6. QA against real store data.
7. Push an unpublished persistent preview theme when collaboration/review needs a stable preview URL.
8. Never publish to live until the launch gate passes.

## Required content resources
- Page `artistas` assigned template `page.artists`.
- Page `creadores` assigned template `page.creators`.
- Blog `historias` if main navigation points to `/blogs/historias`.
- Collections: prendas, nuevo, entre-grietas, la-fuerza-del-agua.
- Products: raiz-de-concreto, ola-hokusai.

## Publication
Product/collection creation is not equivalent to customer availability. Launch process must explicitly publish resources to the Online Store publication after product status/readiness gates pass.
