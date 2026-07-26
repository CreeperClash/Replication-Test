/* ---------------------------------------------------------------------------
 * Store data for the demo replica.
 *
 * Prices are intentionally BLANK (empty string) — every card/detail view keeps
 * the price slot in the layout so a real value can be dropped in later.
 * Wire this file to a real API by replacing `PRODUCTS` with a fetch() result
 * that returns the same shape.
 * ------------------------------------------------------------------------- */

export const STORE = {
  name: "Terrinika's Beauty Supply",
  tagline:
    "Terrinika's Beauty Supply is a Black owned beauty supply store specializing in hair extensions, hair care products and beauty products.",
  heroTitle: "Terrinika's Beauty Supply",
  about:
    "Hi! Welcome to our website. Here are a few things about me. I am a 28 year old wife and mother to three wonderful children! I have been doing hair since I was 12 years old and hair has always been a great passion of mine. I decided to open a Beauty Supply store because I enjoy making people feel beautiful and engaging with others. Our goal at Terrinika's Beauty Supply is to be the \"Chick-Fil-A\" of Beauty Supplies by giving exceptional customer service and creating a healthy atmosphere inside and outside of our store.",
  ownerName: "Terrinika Anderson",
  ownerRole: "Owner",
  instagram: "https://instagram.com/terrinikas_beautysupply",
  facebook: "https://facebook.com/TerrinikasBeautySupply",
};

/* Number of products per catalog page. The source store paginates at 60. */
export const PAGE_SIZE = 24;

/*
 * Product images: the source catalog uses third-party brand photography, so the
 * replica ships neutral placeholder tiles. Point this at a folder of real
 * images named `<slug>.jpg` and flip USE_REAL_IMAGES to true to swap them in.
 */
export const USE_REAL_IMAGES = false;
export const PRODUCT_IMAGE_BASE = "assets/img/products/";

const raw = [
  ["DE B&S HCO LEAVE IN CONDITIONER", true],
  ["DE AL & AV DAILY MOIST LOT", true],
  ["SIB EDGE CONTROL", false, ["3.5OZ"]],
  ["SF EDGEBOOSTER 3.38OZ", false],
  ["ARDELL LASH REMOVER", false],
  ["BE LASHES", false],
  ["SNJ XTRA GEL", false],
  ["DG GROWTH OIL", false],
  ["LM SPRITZ", false],
  ["SM COCO & HIBISCUS CURL & SHINE CONDITION", false],
  ["LB FOAMING MOUSSE", false],
  ["AP DEEP CONDITIONING NOLYE RELAXER", false],
  ["ORS OLIVE OIL RELAXER", false],
  ["AB DUAL CONDITION NOLYE RELAXER", false],
  ["G2BG SPIKING GLUE", false],
  ["G2BG SPIKING WAX", false],
  ["G2BG FREEZE SPRAY", true],
  ["SM COCO & HIBISCUS HOLD & SHINE MIST", true],
  ["SM COCO & HIBISCUS SHAMPOO", false],
  ["AMPRO GEL", false],
  ["DAX POMADE", false],
  ["MURRAYS EDGEWAX", false],
  ["DG HAIR VITALIZER", false],
  ["DG HAIR LOTION", false],
  ["RC HAIR DRESSING", false],
  ["MG PUNK HAIR GEL", false],
  ["BM BERGAMOT CONDITIONER", false],
  ["BM CONDITIONER HAIR DRESS", false],
  ["BM PRESSING OIL", false],
  ["BM CASTOR OIL", false],
  ["BM COCNUT OIL HAIR CONDITIONER", false],
  ["JFM NOLYE CONDITION RELAX KIT", false],
  ["JFM LEAVE IN DETANGLER", false],
  ["JFM SOOTHING SCALP BALM", false],
  ["DRM GRO OIL", true],
  ["CT TEXTURIZER KIT", false],
  ["JFM CURL SMOOTHER", false],
  ["JFM OIL MOISTURIZING LOTION", false],
  ["JFM NHM LEAVE IN CONDITIONER", true],
  ["JFM SULFATE FREE SHAMPOO", false],
  ["JFM SMOOTH EDGES CREME", true],
  ["CT SOFTENER", true],
  ["CT WAVE KEEPER", false],
  ["LP HAIR LOTION", false],
  ["PK CURLING CREME", true],
  ["CURLS BB & COCO HAIR MILK", true],
  ["LJ SHINE GEL", true],
  ["VIGOROL MOUSSE", false],
  ["LB SETTING LOTION", false],
  ["CON ULTRA MOIST SHAMPOO", false],
  ["CON PERFECT EDGE", true],
  ["CON ARGAN OIL MOIST HAIR LOTION", true],
  ["CON ARGAN OIL SULF FREE SHMPO", false],
  ["CON ARGAN INTENSE COND TREAT", false],
  ["BIGEN P&R COND", false],
  ["BIGEN SHEEN SPRAY", false],
  ["CON DTNGL COND", false],
  ["JAM BLK CASTOR OIL 4OZ", false],
  ["CLAIROL BEAUTIFUL COLL HAIR COLOR", false],
  ["BIO SILK THERAPY", false],
];

export function slugify(name) {
  return name
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();
}

export const PRODUCTS = raw.map(([name, soldOut, options], i) => ({
  id: String(100001 + i),
  name,
  slug: slugify(name),
  /* Blank on purpose — fill from your pricing source. */
  price: "",
  soldOut: Boolean(soldOut),
  options: options || null,
  stock: soldOut ? 0 : 3,
  addedAt: i,
  description: "",
}));

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}
