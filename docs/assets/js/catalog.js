/* ---------------------------------------------------------------------------
 * Catalog rendering: product tiles, grid, sorting, pagination.
 * Shared by the home page store block and the search results page.
 * ------------------------------------------------------------------------- */

import { PAGE_SIZE, PRODUCTS, PRODUCT_IMAGE_BASE, USE_REAL_IMAGES } from "./data.js";
import { icons } from "./layout.js";
import { addToCart } from "./cart-store.js";
import { notify } from "./layout.js";

export function mediaHtml(product) {
  if (USE_REAL_IMAGES) {
    return `<img src="${PRODUCT_IMAGE_BASE}${product.slug}.jpg" alt="${product.name}" loading="lazy">`;
  }
  return `<span class="ph" role="img" aria-label="Product image placeholder">
      <span class="ph__label">Image</span>
    </span>`;
}

export function cardHtml(product) {
  const href = `product.html?id=${product.id}`;
  return `
<article class="card">
  ${product.soldOut ? '<span class="card__badge">Sold out</span>' : ""}
  <a class="card__media" href="${href}" aria-label="${product.name}">${mediaHtml(product)}</a>
  <div class="card__body">
    <h3 class="card__title"><a href="${href}">${product.name}</a></h3>
    <!-- Price slot intentionally blank in this demo. -->
    <span class="price" data-price-slot data-product-id="${product.id}">${product.price}</span>
    <div class="card__foot">
      ${
        product.soldOut
          ? '<span class="stock-note">Out of stock</span>'
          : `<button type="button" class="btn btn--secondary" data-buy="${product.id}">Buy Now</button>`
      }
    </div>
  </div>
</article>`;
}

const SORTERS = {
  recommend: null,
  addedTimeDesc: (a, b) => b.addedAt - a.addedAt,
  priceAsc: null, // no prices in the demo — keeps source order
  priceDesc: null,
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),
};

/**
 * Mount a paginated, sortable catalog into `root`.
 * @param {HTMLElement} root
 * @param {{items?: object[], showToolbar?: boolean}} opts
 */
export function mountCatalog(root, opts = {}) {
  const source = opts.items || PRODUCTS;
  const showToolbar = opts.showToolbar !== false;

  const state = {
    page: Number(new URLSearchParams(location.search).get("page")) || 1,
    sort: "recommend",
  };

  root.innerHTML = `
    ${
      showToolbar
        ? `<div class="store__toolbar">
             <label class="sort">
               <span>Sort by</span>
               <span class="sort__caret" aria-hidden="true"></span>
               <select data-sort aria-label="Sort by">
                 <option value="recommend">We recommend</option>
                 <option value="addedTimeDesc">Newest arrivals</option>
                 <option value="priceAsc">Price: Low to High</option>
                 <option value="priceDesc">Price: High to Low</option>
                 <option value="nameAsc">Name: A to Z</option>
                 <option value="nameDesc">Name: Z to A</option>
               </select>
             </label>
           </div>`
        : ""
    }
    <div class="grid" data-grid></div>
    <div class="pager" data-pager></div>`;

  const grid = root.querySelector("[data-grid]");
  const pager = root.querySelector("[data-pager]");
  const sortEl = root.querySelector("[data-sort]");

  function visible() {
    const list = source.slice();
    const fn = SORTERS[state.sort];
    if (fn) list.sort(fn);
    return list;
  }

  function draw() {
    const list = visible();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    state.page = Math.min(Math.max(1, state.page), pages);

    const start = (state.page - 1) * PAGE_SIZE;
    const slice = list.slice(start, start + PAGE_SIZE);

    grid.innerHTML = slice.length
      ? slice.map(cardHtml).join("")
      : `<p class="empty-state">No products matched your search.</p>`;

    pager.innerHTML =
      list.length === 0
        ? ""
        : `
      <div class="pager__count">${start + 1} &ndash; ${start + slice.length} of ${list.length} items</div>
      <ul class="pager__list">
        ${Array.from({ length: pages }, (_, i) => i + 1)
          .map(
            (n) =>
              `<li><button type="button" data-page="${n}" aria-current="${n === state.page}">${n}</button></li>`
          )
          .join("")}
        <li><button type="button" class="pager__next" data-page="${state.page + 1}" ${
        state.page >= pages ? "disabled" : ""
      }>Next ${icons.arrowRight}</button></li>
      </ul>`;
  }

  root.addEventListener("click", (e) => {
    const pageBtn = e.target.closest("[data-page]");
    if (pageBtn && !pageBtn.disabled) {
      state.page = Number(pageBtn.dataset.page);
      draw();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const buyBtn = e.target.closest("[data-buy]");
    if (buyBtn) {
      const product = source.find((p) => p.id === buyBtn.dataset.buy);
      addToCart(product, 1);
      notify(`${product.name} added to your bag.`);
    }
  });

  if (sortEl) {
    sortEl.addEventListener("change", () => {
      state.sort = sortEl.value;
      state.page = 1;
      draw();
      if (state.sort === "priceAsc" || state.sort === "priceDesc") {
        notify("Price sorting needs prices — add them in assets/js/data.js.");
      }
    });
  }

  draw();
}
