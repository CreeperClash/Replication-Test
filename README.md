# Terrinika's Beauty Supply — demo replica

A static, framework-free replica of the storefront at
`terrinikasbeautysupplystore.shopsettings.com`, built as a clickable demo you
can wire up to real services.

## Run it

```bash
node server.js          # http://localhost:5173
node server.js --port 8080
```

No dependencies. Live reload is built in — edit anything under `public/` and the
open page refreshes.

## What's here

```
server.js                     zero-dep dev server (static + live reload)
public/
  index.html                  home: hero, catalog, about, footer
  product.html?id=…           product detail
  account.html                account + "Join us or sign in"
  cart.html                   shopping bag
  orders.html                 track orders
  search.html?q=…             search results
  assets/css/styles.css       all styling; design tokens at the top
  assets/js/data.js           store copy + product catalog  ← start here
  assets/js/layout.js         header / hero / about / footer / search
  assets/js/catalog.js        product tiles, sort, pagination
  assets/js/cart-store.js     localStorage bag
```

## Deliberate placeholders

| Thing | State | Where to change it |
|---|---|---|
| Hero background | Filler tile labelled "Hero image placeholder" | `layout.js` → `heroHtml()`, `.hero__bg` in CSS |
| Logo / brand icon | Filler circle labelled "Logo" | `layout.js` → `heroHtml()`, `.hero__logo` |
| Owner portrait | Filler circle labelled "Photo" | `layout.js` → `aboutHtml()` |
| Product images | Neutral tiles (source photos are third-party brand assets) | `data.js` → set `USE_REAL_IMAGES = true`, drop `<slug>.jpg` files into `public/assets/img/products/` |
| **All prices** | **Blank** — every price slot keeps its space in the layout | `data.js` → `price` field on each product |

Price slots are marked `data-price-slot` with a `data-product-id`, so you can
populate them from a live pricing source without touching the markup:

```js
document.querySelectorAll("[data-price-slot]").forEach(el => {
  el.textContent = prices[el.dataset.productId];
});
```

## Third-party dependent flows — usable, not functional

These are fully clickable and validate input, but deliberately perform no real
work. Each shows an inline note explaining what the live site does instead.

- **Sign in** (`account.html`) — validates the email, runs a stand-in bot check,
  then reports that no code was sent. Swap the submit handler for your auth
  provider.
- **Track orders** (`orders.html`) — validates the email, returns nothing.
- **Checkout** (`cart.html`) — the bag is real (localStorage), checkout is a stub.
- **Social share / Report abuse** — stubbed with a toast.

The bag, search, sorting and pagination *do* work client-side so the demo is
navigable.

## Catalog notes

- 60 products, matching page 1 of the source catalog (the live store lists 438).
  Names and stock/sold-out state are carried over; prices are not.
- `PAGE_SIZE` in `data.js` is **24** so pagination is visibly exercised. The
  source store paginates at 60 — change the constant to match if you prefer.
- Sorting by price is inert while prices are blank; it warns rather than
  silently doing nothing.

## Fidelity notes

- Fonts are the source site's: **Dancing Script** (hero wordmark) and **Cardo**
  (headings, product names, buttons), loaded from Google Fonts.
- Colours in `:root` are the storefront theme's own tokens (`#333` buttons,
  `#1a7ac4` links, `#fd7474` sold-out badge, `#f2f2f2` footer).
- The header's directions / hours / social links exist in the source markup but
  are only surfaced in its mobile drawer. Same here — they appear under 720px.
  The `#map` and `#storehours` anchors have no target on the live site either.
- The hero uses `background-attachment: fixed`, matching the source's parallax.
