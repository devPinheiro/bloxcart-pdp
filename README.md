# BloxCart PDP (take-home)

Next.js 16 App Router product detail page for **Permanent T-Rex Fruit**, with **en-US** and **es-ES** locales rendered on the server via [next-intl](https://next-intl.dev/). Layout and visuals follow Figma frame **Bloxcart store sample – Web** (`1651:952`); copy and pricing come from the brief mock in `features/product-detail/data/t-rex-product.ts`.

## Routes

| Locale | URL |
|--------|-----|
| en-US | `/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox` |
| es-ES | `/es-ES/games/blox-fruits/fruta-t-rex-permanente-roblox` |

Each locale is a separate URL with its own slug, metadata, and server-rendered HTML — not a client-side string toggle.

---

## Running locally

**Requirements:** Node.js **≥ 20.9** (Next.js 16), **pnpm** 10+

```bash
pnpm install
cp .env.example .env.local
pnpm dev

# Out-of-stock UI demo
SHOW_OOS=true pnpm dev
```

Open [http://localhost:3000/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox](http://localhost:3000/en-US/games/blox-fruits/permanent-t-rex-fruit-roblox).

### Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for canonical links, sitemap, and OG tags (default `http://localhost:3000`) |
| `SHOW_OOS=true` | Force out-of-stock UI for demo (`resolveAvailability` returns `OutOfStock`) |

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` | Production build + static generation |
| `pnpm start` | Serve production build |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:watch` | Unit tests in watch mode |
| `pnpm test:e2e` | End-to-end tests (Playwright + axe) |
| `pnpm test:e2e:oos` | Out-of-stock PDP checks (`SHOW_OOS=true`) |
| `pnpm lint` | ESLint |

E2E tests start a production server automatically (`playwright.config.ts`). Run a build first:

```bash
pnpm build && pnpm test:e2e
```

---

## Rendering: ISR and why

The PDP route exports `revalidate = 60` and uses `generateStaticParams()` to pre-render all known locale paths at build time.

| Strategy | Pros | Why not here |
|----------|------|--------------|
| **Fully static** (`revalidate: false`) | Fastest TTFB, cheapest CDN | Price and stock stay stale until redeploy |
| **SSR** (dynamic every request) | Always fresh | Higher origin load and slower TTFB on traffic spikes |
| **ISR** (chosen, 60s TTL) | Cached HTML at the edge; background refresh after TTL | Updates can lag up to one minute |

**Tradeoff:** 60 seconds of staleness is acceptable for a read-heavy catalog PDP. It is not acceptable for checkout or inventory locks — those would need real-time validation against a backend.

Rationale is documented inline in `app/[locale]/games/[game]/[slug]/page.tsx` and mirrored in `features/product-detail/lib/pdp-isr.ts` for tests.

---

## Design token extraction

Tokens were pulled from the Figma file and mapped manually into CSS — not hard-coded in components.

1. **Inspect Figma** — read fills, radii, and typography from the selected frames (nav `1651:954`, PDP `1651:952`, purchase panel `1651:2055`, meta card `1651:2107`).
2. **Define CSS variables** in `app/globals.css` under `:root` (e.g. `--accent: #c439f0`, `--surface-nav: #2a263d`, `--border: #332f48`).
3. **Expose to Tailwind 4** via `@theme inline` so utilities like `bg-surface`, `text-accent`, and `border-border` resolve to those variables.
4. **Fonts** — Manrope (display/H1) via `next/font/google`; Mail Sans Roman (body/UI) self-hosted from WOFF2 in `public/fonts/mail-sans-roman/`. Mail Sans requires a proper TypeType license for production.

Icons and raster assets were exported from Figma  into `shared/components/icons/` and `public/assets/` respectively, with paths typed in `shared/lib/assets.ts`.

---

## Component architecture

The codebase is split by **feature** (domain UI) and **shared** (reusable primitives). Route files in `app/` stay thin; business logic lives in `features/`.

```
app/
  [locale]/                    # next-intl locale segment
    layout.tsx                 # SiteHeader, SiteFooter, NextIntlClientProvider
    games/[game]/[slug]/       # PDP page — generateMetadata, ISR, delegates to feature
  sitemap.ts                   # Programmatic sitemap
  robots.ts                    # Points crawlers to sitemap

features/
  product-detail/              # PDP domain
    data/t-rex-product.ts      # Single-source mock catalog (brief JSON shape)
    lib/                       # Pure helpers: get-product, SEO, JSON-LD, pricing
    components/                # PDP UI composed from shared primitives

  site-shell/                  # Global chrome (header, footer)

shared/
  components/ui/               # Design-system primitives (Button, Badge, Dropdown, Avatar)
  components/                  # Cross-feature widgets (GameSelector, LocaleSwitcher, BackToShop)
  types/                       # ProductRecord, IconProps
  lib/                         # cn, fonts, assets, sitemap builder
```

### Server vs client

| Layer | Role |
|-------|------|
| **Server Components** | `ProductDetailView`, `ProductPurchasePanel`, `SiteHeader` — fetch copy via `getTranslations` and `product.locales[locale]` |
| **Client Components** | `ProductGalleryClient` (thumb selection), `ProductQuantityStepper`, `GameSelector`, `LocaleSwitcher` — interactivity only |
| **SSR LCP** | `ProductGalleryHero` renders the priority hero `next/image` in the initial HTML before client hydration |

### i18n split

- **UI chrome** (nav labels, meta table headers) → `messages/{locale}.json` via next-intl
- **Product content** (title, description, prices, CTA) → `product.locales[locale]` in mock data

### Key PDP components

| Component | Responsibility |
|-----------|----------------|
| `ProductDetailView` | Two-row layout: gallery + purchase panel, about + meta table |
| `ProductGallery` | Server wrapper; passes SSR hero into client thumb switcher |
| `ProductPurchasePanel` | Game label, title, price block, quantity + CTA, trust cards |
| `ProductMetaTable` | Figma-aligned spec card (category, rarity, game, delivery, condition) |
| `ProductJsonLd` | Injects schema.org `Product` script |

---

## SEO

Implemented in `features/product-detail/lib/` and wired from the PDP page:

- **`buildProductMetadata`** — title, description, canonical, reciprocal hreflang, Open Graph, Twitter cards
- **`buildProductJsonLd`** — Product + Offer (price, availability) + placeholder `aggregateRating`
- **`buildAppSitemap`** — locale home pages + all PDP paths (`app/sitemap.ts`)

---

## Image pipeline

Product images use `next/image` with explicit **width/height** on every `ProductImage` to reserve layout space (CLS).

| Image | Loading | Format |
|-------|---------|--------|
| Hero (LCP) | `priority` + `fetchPriority="high"` | AVIF/WebP via `/_next/image` optimizer |
| Thumbnails | `loading="lazy"` + `fetchPriority="low"` | Same optimizer |

`next.config.ts` sets `images.formats: ['image/avif', 'image/webp']`. Remote images (Cloudinary) are allowed via `remotePatterns`.

---

## Testing

### Unit tests (`pnpm test`)

Vitest + jsdom. Pure logic and metadata builders — no browser required.

| File | Covers |
|------|--------|
| `get-product.test.ts` | Locale-specific slug resolution, availability flags |
| `product-metadata.test.ts` | Canonical, hreflang reciprocals, OG/Twitter |
| `product-json-ld.test.ts` | Price, currency, availability, rating placeholder |
| `build-sitemap.test.ts` | Both PDP URLs in sitemap output |
| `pdp-isr.test.ts` | 60-second revalidation constant |
| `format-product-price.test.ts` | Locale price formatting |

### E2E tests (`pnpm test:e2e`)

Playwright against the production build. Requires Chrome.

| File | Covers |
|------|--------|
| `e2e/pdp.spec.ts` | Both locales, price/back link, hreflang URLs, JSON-LD, gallery interaction, **axe** a11y |
| `e2e/seo.spec.ts` | `<title>`, meta description, canonical, OG tags, sitemap.xml, robots.txt |
| `e2e/images.spec.ts` | Hero priority, thumb lazy-load, explicit dimensions, AVIF/WebP optimizer |
| `e2e/oos.spec.ts` | Disabled CTA, JSON-LD `OutOfStock` when `SHOW_OOS=true` |

---

## What I would do differently in production

With more time and a real backend:

1. **Catalog API + CMS** — replace `t-rex-product.ts` with fetched data; locale slugs and copy driven by CMS, not hard-coded records.
2. **On-demand revalidation** — webhook from PIM/inventory (`revalidateTag` / `revalidatePath`) instead of a fixed 60s window for price/stock changes.
3. **Real checkout flow** — cart persistence, payment, and server-side stock reservation at purchase time (ISR staleness is fine for browsing, not for buying).
4. **Automated design tokens** — Style Dictionary or Figma Tokens plugin syncing into `globals.css` on CI, rather than manual MCP extraction.
5. **Observability** — RUM for LCP/CLS/INP in production; alert on CWV regressions per locale.
6. **Expanded test matrix** — visual regression (Chromatic/Playwright screenshots), contract tests against catalog API, load tests on ISR cache hit rate.
7. **Real ratings** — replace JSON-LD placeholder with verified review data from a reviews service.
8. **Proper font licensing** — TypeType Mail Sans Roman license for production deployment.

---

## Known limitations (take-home scope)

- Single mock SKU in the catalog
- Placeholder aggregate rating in JSON-LD
- No cart backend or payment integration
- ES locale uses a distinct URL slug (routing requirement) while sharing one canonical product `slug` in data
