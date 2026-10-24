// netlify/functions/slideshow.mjs
// Liefert die Bild-URLs der geteilten Google-Fotos-Alben als JSON für die Diashow (/api/slideshow).
//
// Hintergrund: Die Google Photos Library API erlaubt seit 1.4.2025 keinen Zugriff mehr auf
// geteilte Alben. Darum liest diese Function die öffentliche Freigabeseite jedes Albums und
// zieht die Bild-URLs aus den eingebetteten Daten. Das ist inoffiziell – ändert Google das
// Seitenformat, liefert die Function eine leere Liste und die Diashow fällt automatisch auf
// images/slideshow/index.json zurück.
//
// ⚙️ Alben für die Diashow – bei Bedarf an js/galerie.js (GOOGLE_ALBUMS) angleichen.
//    Das Hochzeitsvideo-Album ist bewusst nicht dabei; Videos in den übrigen Alben werden ausgefiltert.
const ALBUMS = [
  "https://photos.app.goo.gl/d7SEHkXyT48WBUou8", // Fotograf
  "https://photos.app.goo.gl/vMischDK7voexfyL6", // Gäste
  "https://photos.app.goo.gl/4cU6wZuh3BprJiQG8", // Drohnenaufnahmen
  "https://photos.app.goo.gl/PTJ7SUTtAZQV3qD87", // Fotobox
];

// Grösse der ausgelieferten Bilder (Google skaliert serverseitig)
const SIZE = "=w1600-h1200";

// Einträge haben in den Seitendaten die Form ["https://lh3.googleusercontent.com/pw/…",breite,höhe,…]
const ITEM_RE = /\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[A-Za-z0-9_-]+)",(\d+),(\d+)/g;

// Videos tragen in ihren Metadaten den Schlüssel "76647426" (Dauer, Auflösung, Stream-URL).
const VIDEO_MARKER = '"76647426":';

async function fetchAlbum(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
      "Accept-Language": "de-CH,de;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const html = await res.text();
  const matches = [...html.matchAll(ITEM_RE)];
  const urls = [];
  const videos = new Set();
  matches.forEach((m, i) => {
    // Abschnitt dieses Eintrags bis zum Ende seines Metadaten-Objekts ("}]")
    const end = i + 1 < matches.length ? matches[i + 1].index : m.index + 8000;
    let seg = html.slice(m.index, end);
    const close = seg.indexOf("}]");
    if (close > 0) seg = seg.slice(0, close);
    if (seg.includes(VIDEO_MARKER)) videos.add(m[1]);
    urls.push(m[1]);
  });
  // Videos überall ausfiltern (auch falls das Titelbild ein Video ist)
  return urls.filter(u => !videos.has(u));
}

export default async () => {
  const results = await Promise.allSettled(ALBUMS.map(fetchAlbum));
  const seen = new Set();
  const images = [];
  results.forEach((r, i) => {
    if (r.status !== "fulfilled") {
      console.warn("[slideshow] Album fehlgeschlagen:", ALBUMS[i], r.reason?.message);
      return;
    }
    for (const u of r.value) {
      if (seen.has(u)) continue; // Titelbild steht doppelt in den Daten
      seen.add(u);
      images.push(u + SIZE);
    }
  });

  return new Response(JSON.stringify(images), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Browser 5 min, Netlify-CDN 1 h (danach im Hintergrund aktualisieren)
      "Cache-Control": "public, max-age=300",
      "Netlify-CDN-Cache-Control": images.length
        ? "public, s-maxage=3600, stale-while-revalidate=86400"
        : "no-store",
    },
  });
};

export const config = { path: "/api/slideshow" };
