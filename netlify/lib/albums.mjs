// netlify/lib/albums.mjs
// Gemeinsame Album-Liste für die Netlify Functions (Diashow + Albumcover).
// ⚙️ Bei Änderungen an GOOGLE_ALBUMS in js/galerie.js hier nachziehen (id muss übereinstimmen).
//    slideshow: true = Bilder dieses Albums erscheinen in der Header-Diashow.
export const ALBUMS = [
  { id: "gaeste",   url: "https://photos.app.goo.gl/vMischDK7voexfyL6", slideshow: true },
  { id: "fotograf", url: "https://photos.app.goo.gl/d7SEHkXyT48WBUou8", slideshow: true },
  { id: "drohne",   url: "https://photos.app.goo.gl/4cU6wZuh3BprJiQG8", slideshow: true },
  { id: "fotobox",  url: "https://photos.app.goo.gl/PTJ7SUTtAZQV3qD87", slideshow: true },
  { id: "video",    url: "https://photos.app.goo.gl/Qna6mnz38Vpdhdto7", slideshow: false },
];

// Öffentliche Freigabeseite eines Albums als HTML laden
export async function fetchAlbumPage(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
      "Accept-Language": "de-CH,de;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}
