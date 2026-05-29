# product-detail

Public APIs for the Blox Fruits PDP feature. Mock data mirrors the take-home brief JSON in `data/t-rex-product.ts`.

## Data

- `T_REX_PRODUCT` — brief fields: `slug`, `game`, `category`, `rarity`, `delivery`, `condition`, `tags`, `locales`, `stock`, `images`.

## Lib

| Export | Description |
|--------|-------------|
| `getProductBySlug(locale, game, slug)` | Resolves a product or `null`. |
| `getCatalogGames()` | Unique games from the mock catalog. |
| `getAllProductPaths()` | Locale/game/slug triples for sitemap and SSG. |
| `resolveAvailability(product)` | Brief `stock.available` + `SHOW_OOS`. |
| `resolveStockQuantity(product)` | Quantity shown on PDP (0 when OOS). |
| `productPath`, `productCanonicalUrl`, `productAlternateUrls` | SEO URL helpers. |
| `buildProductJsonLd(locale, product)` | schema.org Product with locale `priceAmount` / `priceCurrency`. |
| `formatProductPrice`, `scalePricesByQuantity` | Locale-aware line totals for quantity stepper. |

## Components

| Component | Role |
|-----------|------|
| `ProductDetailView` | Two-row layout; mobile title above gallery |
| `ProductGallery` | Server wrapper composing hero + client thumbs |
| `ProductGalleryHero` | SSR priority hero image (LCP) |
| `ProductGalleryClient` | Thumb selection and hero swap |
| `ProductPurchasePanel` | Game label, title (desktop), purchase block, trust cards |
| `ProductPurchaseControls` | Quantity stepper, scaled prices, CTA |
| `ProductPriceBlock` | Strikethrough, current price, savings pill |
| `ProductQuantityStepper` | Controlled qty UI |
| `ProductTrustCards` | Three trust badges |
| `ProductMetaTable` | Category, rarity, game, delivery, condition |
| `ProductAboutSection` | Description and tag pills |
| `ProductDetailSkeleton` | Route loading placeholder |
| `ProductJsonLd` | Structured data script |

JSDoc on public exports lives in source (`get-product.ts`, `ProductDetailView.tsx`).
