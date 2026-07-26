/* ---------------------------------------------------------------------------
 * Zero-dependency static dev server with live reload.
 *   node server.js            -> http://localhost:5173
 *   node server.js --port 8080
 * ------------------------------------------------------------------------- */

import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "public");

const argPort = process.argv.indexOf("--port");
const PORT = Number(
  argPort > -1 ? process.argv[argPort + 1] : process.env.PORT || 5173
);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

/* ---------------------------------------------------------- live reload ---- */

const clients = new Set();

function broadcastReload() {
  for (const res of clients) res.write("data: reload\n\n");
}

let reloadTimer;
fs.watch(ROOT, { recursive: true }, () => {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(broadcastReload, 120);
});

const LIVE_RELOAD_SNIPPET = `
<script>
(() => {
  const s = new EventSource("/__reload");
  s.onmessage = () => location.reload();
  s.onerror = () => setTimeout(() => location.reload(), 1500);
})();
</script>
`;

/* ---------------------------------------------------------------- server --- */

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.normalize(path.join(root, decoded));
  return target.startsWith(root) ? target : null;
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/__reload")) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1000\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  let filePath = safeJoin(ROOT, req.url === "/" ? "/index.html" : req.url);
  if (!filePath) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  try {
    let stat = await fsp.stat(filePath).catch(() => null);

    // /foo -> /foo.html, /dir -> /dir/index.html
    if (!stat && !path.extname(filePath)) {
      const asHtml = `${filePath}.html`;
      if (await fsp.stat(asHtml).then(() => true, () => false)) {
        filePath = asHtml;
        stat = await fsp.stat(filePath);
      }
    }
    if (stat?.isDirectory()) {
      filePath = path.join(filePath, "index.html");
      stat = await fsp.stat(filePath).catch(() => null);
    }

    if (!stat) {
      res.writeHead(404, { "Content-Type": MIME[".html"] });
      res.end(
        `<h1>404 — Not found</h1><p><a href="/">Back to Terrinika's Beauty Supply</a></p>${LIVE_RELOAD_SNIPPET}`
      );
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    };

    if (ext === ".html") {
      const html = await fsp.readFile(filePath, "utf8");
      const withReload = html.replace("</body>", `${LIVE_RELOAD_SNIPPET}</body>`);
      res.writeHead(200, headers).end(withReload);
      return;
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" }).end(String(err));
  }
});

server.listen(PORT, () => {
  console.log(`\n  Terrinika's Beauty Supply — demo replica`);
  console.log(`  ➜  http://localhost:${PORT}\n`);
  console.log(`  Serving ${ROOT}`);
  console.log(`  Live reload is on — edit files in public/ and the page refreshes.\n`);
});
