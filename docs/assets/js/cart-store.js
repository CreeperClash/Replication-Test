/* ---------------------------------------------------------------------------
 * Client-side bag. Demo-only: state lives in localStorage, nothing is sent
 * anywhere and no totals are computed (prices are blank by design).
 * Swap these four functions for your commerce API calls.
 * ------------------------------------------------------------------------- */

const KEY = "tbs-demo-cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function save(lines) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  document.dispatchEvent(new CustomEvent("cart:change", { detail: lines }));
}

export function addToCart(product, qty = 1) {
  const lines = getCart();
  const existing = lines.find((l) => l.id === product.id);
  if (existing) existing.qty += qty;
  else lines.push({ id: product.id, name: product.name, slug: product.slug, qty });
  save(lines);
  return lines;
}

export function removeFromCart(id) {
  save(getCart().filter((l) => l.id !== id));
}

export function clearCart() {
  save([]);
}

export function cartCount() {
  return getCart().reduce((n, l) => n + l.qty, 0);
}
