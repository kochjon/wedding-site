// netlify/functions/covers.mjs
// Liefert die aktuellen Titelbilder (Albumcover) der Google-Fotos-Alben als JSON (/api/covers):
//   { "fotograf": "https://lh3.googleusercontent.com/pw/…=w900-h600-p-k", … }
// Quelle ist das og:image der öffentlichen Freigabeseite = das in Google Fotos gesetzte Cover.
// Wird das Cover in Google Fotos geändert, zeigt die Seite es nach spätestens ~5–10 Minuten.
import { ALBUMS, fetchAlbumPage } from "../lib/albums.mjs";

const SIZE = "=w900-h600-p-k";
const OG_RE = /<meta\s+property="og:image"\s+content="([^"]+)"/;

async function fetchCover(url) {
  const html = await fetchAlbumPage(url);
  const m = html.match(OG_RE);
  if (!m) throw new Error(`${url}: kein og:image gefunden`);
  const img = m[1].replace(/&amp;/g, "&");
  if (!/^https:\/\/lh3\.googleusercontent\.com\//.test(img)) throw new Error(`${url}: unerwartetes og:image`);
  // Grössenangabe (z.B. =w600-h315-p-k) durch die für die Karten passende ersetzen
  return img.replace(/=[^=/]*$/, "") + SIZE;
}

export default async () => {
  const results = await Promise.allSettled(ALBUMS.map(a => fetchCover(a.url)));
  const covers = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") covers[ALBUMS[i].id] = r.value;
    else console.warn("[covers] Album fehlgeschlagen:", ALBUMS[i].url, r.reason?.message);
  });
  const ok = Object.keys(covers).length > 0;

  return new Response(JSON.stringify(covers), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Browser 1 min, Netlify-CDN 5 min (danach im Hintergrund aktualisieren)
      "Cache-Control": "public, max-age=60",
      "Netlify-CDN-Cache-Control": ok
        ? "public, s-maxage=300, stale-while-revalidate=86400"
        : "no-store",
    },
  });
};

export const config = { path: "/api/covers" };
