/* ---------------------------------------------------------------------------
 * Shared chrome: header, hero, search, about, footer.
 * Every page calls renderLayout() and then fills in <main data-page-body>.
 * Replace these template literals with your server-side partials when you
 * move off the static demo.
 * ------------------------------------------------------------------------- */

import { STORE } from "./data.js";

const icons = {
  chevronDown: `<svg width="34" height="20" viewBox="0 0 34 20" fill="none" aria-hidden="true"><path d="M2 2l15 15L32 2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M14.2 14.2L19.5 19.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  account: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.2"/><circle cx="10" cy="8" r="2.6" stroke="currentColor" stroke-width="1.2"/><path d="M5.2 16.4c.9-2.1 2.6-3.2 4.8-3.2s3.9 1.1 4.8 3.2" stroke="currentColor" stroke-width="1.2"/></svg>`,
  orders: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="2.5" width="14" height="15" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M6.8 10l2 2 4.4-4.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bag: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6h12l-.9 11.5H4.9L4 6z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M7.2 7.4V5.2a2.8 2.8 0 015.6 0v2.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  pin: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 16.5S15 11.2 15 7A6 6 0 003 7c0 4.2 6 9.5 6 9.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="7" r="2.1" stroke="currentColor" stroke-width="1.3"/></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7.2" stroke="currentColor" stroke-width="1.3"/><path d="M9 4.8V9l2.9 1.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  instagram: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1.8" y="1.8" width="14.4" height="14.4" rx="4.2" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="9" r="3.4" stroke="currentColor" stroke-width="1.3"/><circle cx="13.2" cy="4.8" r="1" fill="currentColor"/></svg>`,
  facebook: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M11.4 9.6h2.1l.4-2.7h-2.5V5.3c0-.8.3-1.3 1.4-1.3h1.2V1.5A17 17 0 0011.9 1.4c-2 0-3.4 1.2-3.4 3.5v2H6.1v2.7h2.4v6.9h2.9V9.6z" fill="currentColor"/></svg>`,
  arrowLeft: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M7.5 1.5L3 6l4.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowRight: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4.5 1.5L9 6l-4.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

export { icons };

function headerHtml(active) {
  const mark = (id) => (active === id ? ' aria-current="page"' : "");
  return `
<header class="site-header">
  <div class="site-header__inner">
    <nav class="site-nav" aria-label="Primary">
      <ul>
        <li><a href="index.html#store"${mark("store")}>Store</a></li>
        <li><a href="index.html#about"${mark("about")}>About</a></li>
      </ul>
    </nav>
    <div class="header-utils">
      <a href="#map" aria-label="Get directions" title="Get directions">${icons.pin}</a>
      <a href="#storehours" aria-label="Business hours" title="Business hours">${icons.clock}</a>
      <a href="${STORE.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${icons.instagram}</a>
      <a href="${STORE.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${icons.facebook}</a>
    </div>
  </div>
</header>`;
}

function heroHtml() {
  return `
<section class="hero" id="top">
  <!-- FILLER: brand hero photograph goes here (approx. 1920x1080, focal point centre). -->
  <div class="hero__bg ph ph--dark" role="img" aria-label="Hero image placeholder">
    <span class="ph__label">Hero image placeholder<br>1920 &times; 1080</span>
  </div>
  <div class="hero__scrim"></div>

  <div class="hero__inner">
    <!-- FILLER: circular brand logo / icon. -->
    <a class="hero__logo" href="index.html" aria-label="${STORE.name} home">
      <span class="ph" role="img" aria-label="Logo placeholder">
        <span class="ph__label">Logo</span>
      </span>
    </a>

    <p class="hero__tagline">${STORE.tagline}</p>
    <h1 class="hero__title">${STORE.heroTitle}</h1>
    <a class="hero__cta" href="index.html#store">Shop Now</a>
  </div>

  <a class="hero__chevron" href="index.html#store" aria-label="Scroll to store">${icons.chevronDown}</a>
</section>`;
}

function aboutHtml() {
  return `
<section class="about" id="about">
  <div class="about__inner">
    <p class="about__text">${STORE.about}</p>
    <div class="about__person">
      <!-- FILLER: owner portrait. -->
      <div class="about__avatar">
        <span class="ph" role="img" aria-label="Owner photo placeholder"><span class="ph__label">Photo</span></span>
      </div>
      <div class="about__name">${STORE.ownerName}</div>
      <div class="about__role">${STORE.ownerRole}</div>
    </div>
  </div>
</section>`;
}

function footerHtml() {
  return `
<footer class="site-footer">
  <div class="share">
    <button type="button" class="share--fb" data-share="facebook">f Share</button>
    <button type="button" class="share--x" data-share="x">&#120143; Share</button>
    <button type="button" class="share--pin" data-share="pinterest">Pin</button>
  </div>
  <div class="site-footer__legal">&copy; ${STORE.name} &nbsp;&middot;&nbsp; <a href="#" data-demo="report">Report abuse</a></div>
</footer>`;
}

export function accountStripHtml() {
  return `
<nav class="account-strip" aria-label="Account">
  <a href="account.html">${icons.account}<span>My Account</span></a>
  <a href="orders.html">${icons.orders}<span>Track Orders</span></a>
  <a href="cart.html">${icons.bag}<span>Shopping Bag</span></a>
</nav>`;
}

function searchHtml() {
  return `
<button class="search-fab" type="button" aria-label="Search products" aria-expanded="false">${icons.search}</button>
<div class="search-panel" role="search">
  <form action="search.html" method="get">
    <input type="search" name="q" placeholder="Search products" aria-label="Search products">
    <button class="btn btn--primary" type="submit">Search</button>
  </form>
</div>`;
}

/**
 * @param {{active?: string, hero?: boolean}} opts
 */
export function renderLayout(opts = {}) {
  const { active = "", hero = true } = opts;
  const body = document.querySelector("[data-page-body]");

  body.insertAdjacentHTML("beforebegin", headerHtml(active) + (hero ? heroHtml() : ""));
  body.insertAdjacentHTML("afterend", aboutHtml() + footerHtml() + searchHtml());

  wireSearch();
  wireDemoStubs();
}

function wireSearch() {
  const fab = document.querySelector(".search-fab");
  const panel = document.querySelector(".search-panel");
  const input = panel.querySelector("input");

  fab.addEventListener("click", () => {
    const open = panel.classList.toggle("is-open");
    fab.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    }
  });

  const toggleFab = () => {
    fab.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.55);
  };
  toggleFab();
  window.addEventListener("scroll", toggleFab, { passive: true });
}

/* Social share + "report abuse" are third-party integrations on the live site.
   Kept clickable here, but they only explain themselves. */
function wireDemoStubs() {
  document.querySelectorAll("[data-share], [data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const what = el.dataset.share
        ? `Sharing to ${el.dataset.share}`
        : "Abuse reporting";
      notify(`${what} is disabled in this demo replica.`);
    });
  });
}

/** Small non-blocking toast — never use alert(), it stalls the page. */
export function notify(message) {
  let el = document.getElementById("demo-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "demo-toast";
    el.setAttribute("role", "status");
    Object.assign(el.style, {
      position: "fixed",
      left: "50%",
      bottom: "26px",
      transform: "translateX(-50%)",
      zIndex: "80",
      maxWidth: "min(520px, 90vw)",
      background: "#292929",
      color: "#fff",
      padding: "12px 18px",
      borderRadius: "3px",
      fontSize: "14px",
      lineHeight: "1.5",
      boxShadow: "0 6px 20px rgba(0,0,0,.25)",
      opacity: "0",
      transition: "opacity .18s ease",
    });
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => (el.style.opacity = "1"));
  clearTimeout(el._t);
  el._t = setTimeout(() => (el.style.opacity = "0"), 3200);
}
