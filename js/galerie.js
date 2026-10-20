// js/galerie.js
// Galerie-Tab auf index.html: Albumkarten mit Links zu den Google-Fotos-Alben (GOOGLE_ALBUMS)

// ══════════════════════════════════════════════
// ⚙️  GOOGLE FOTOS ALBEN – hier anpassen
// ══════════════════════════════════════════════
// cover:    Titelbild des Albums (Google-URL, Grösse über =w…-h… steuerbar)
// fallback: lokales Ersatzbild, falls das Google-Bild nicht lädt
// upload:   true = Gäste können in dieses Album eigene Fotos hinzufügen
// url: null = Link fehlt noch → Karte zeigt "Folgt bald"
const GOOGLE_ALBUMS = [
  {
    id: 'gaeste',
    de: 'Gäste', en: 'Guests',
    descDe: 'Eure Schnappschüsse – ladet hier eure eigenen Fotos & Videos hoch.',
    descEn: 'Your snapshots – add your own photos & videos here.',
    url: 'https://photos.app.goo.gl/vMischDK7voexfyL6',
    cover: 'https://lh3.googleusercontent.com/pw/AP1GczPUuyNUe8u7luoRQylAi9-aC3XSR2TsD6GhjuC_XdImEZ3QWbuxWm-tsoiDxshW8t0BmSCU2o4DgBWBrmScWhYMRqbEj6Qw0MoE1yYqyDuC270aaug=w900-h600-p-k',
    fallback: 'images/kirche.jpeg',
    upload: true
  },
  {
    id: 'fotograf',
    de: 'Fotograf', en: 'Photographer',
    descDe: 'Die offiziellen Bilder unseres Fotografen.',
    descEn: 'The official pictures from our photographer.',
    url: 'https://photos.app.goo.gl/d7SEHkXyT48WBUou8',
    cover: 'https://lh3.googleusercontent.com/pw/AP1GczN_3FvvMJhOk6suoKShywBYkahVHpd8rTtJxRcyno3NXTzqf9uObAspjAhq-vllynb-ZzevEuCmxoiF_JmGt6P0ACtsix7Brxa5Ve8cnVCI6H071Q=w900-h600-p-k',
    fallback: 'images/Official.jpg'
  },
  {
    id: 'drohne',
    de: 'Drohnenaufnahmen', en: 'Drone Footage',
    descDe: 'Unser Tag von oben.',
    descEn: 'Our day from above.',
    url: 'https://photos.app.goo.gl/4cU6wZuh3BprJiQG8',
    cover: 'https://lh3.googleusercontent.com/pw/AP1GczNantZ55qdIjpsgHynDAnr6uPeSJ_jKxjMKpOYvQxqin0OwxbFnDE3IPRFkBrWruFWo6U6GswXvwjh-8dKHeZOyOeFOyAuOSUvdnjnuudyEX4R25No=w900-h600-p-k',
    fallback: 'images/empfang.jpeg'
  },
  {
    id: 'fotobox',
    de: 'Fotobox', en: 'Photo Booth',
    descDe: 'Die schönsten (und lustigsten) Bilder aus der Fotobox.',
    descEn: 'The best (and funniest) shots from the photo booth.',
    url: 'https://photos.app.goo.gl/PTJ7SUTtAZQV3qD87',
    cover: 'https://lh3.googleusercontent.com/pw/AP1GczOX92RWJ2_HtFy6zJw8kpSTzcVxbwTZSnRwVFpIVuxtAbjGO-xmR77YUXH8-eaNpuaUjF37Y79PKYW8B6XJ1cXkPJAtYyIgPYlDBend6vHbgKxfzF4=w900-h600-p-k',
    fallback: 'images/Programm_Abend.jpg'
  }
];

function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

// ── Albumkarten rendern ──
function renderAlbums() {
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'de';
  const t = (de, en) => (lang === 'de' ? de : en);

  // Upload-Hinweis (Gäste-Album)
  const uploadBox = document.getElementById('guestUpload');
  const guest = GOOGLE_ALBUMS.find(a => a.upload);
  if (uploadBox && guest) {
    uploadBox.innerHTML = guest.url
      ? `<a href="${escAttr(guest.url)}" target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition"
            data-de="📷 Eigene Fotos & Videos hinzufügen" data-en="📷 Add your own photos & videos">${t('📷 Eigene Fotos & Videos hinzufügen', '📷 Add your own photos & videos')}</a>
         <p class="text-xs text-gray-400 mt-3" data-de="Öffnet das Gäste-Album in Google Fotos – dort auf „Fotos hinzufügen“ tippen (Google-Konto nötig)." data-en="Opens the guest album in Google Photos – tap “Add photos” there (Google account required).">${t('Öffnet das Gäste-Album in Google Fotos – dort auf „Fotos hinzufügen“ tippen (Google-Konto nötig).', 'Opens the guest album in Google Photos – tap “Add photos” there (Google account required).')}</p>`
      : '';
  }

  const grid = document.getElementById('albumGrid');
  if (!grid) return;
  grid.innerHTML = GOOGLE_ALBUMS.map(a => {
    const img = a.cover || a.fallback;
    const inner = `
      <div class="album-cover">
        <img src="${escAttr(img)}" alt="${escAttr(t(a.de, a.en))}" loading="lazy" referrerpolicy="no-referrer"
             onerror="if(this.dataset.fb!=='1'){this.dataset.fb='1';this.src='${escAttr(a.fallback)}';}" />
        ${a.upload ? `<span class="album-badge" data-de="Mitmachen" data-en="Contribute">${t('Mitmachen', 'Contribute')}</span>` : ''}
      </div>
      <div class="p-4 text-left">
        <h3 class="album-title text-2xl text-green-700" data-de="${escAttr(a.de)}" data-en="${escAttr(a.en)}">${t(a.de, a.en)}</h3>
        <p class="text-sm text-gray-500 mt-1" data-de="${escAttr(a.descDe)}" data-en="${escAttr(a.descEn)}">${t(a.descDe, a.descEn)}</p>
        <p class="text-sm mt-3 ${a.url ? 'text-green-600' : 'text-gray-400'}"
           data-de="${a.url ? 'Album öffnen →' : 'Folgt bald'}" data-en="${a.url ? 'Open album →' : 'Coming soon'}">${a.url ? t('Album öffnen →', 'Open album →') : t('Folgt bald', 'Coming soon')}</p>
      </div>`;
    return a.url
      ? `<a href="${escAttr(a.url)}" target="_blank" rel="noopener" class="album-card">${inner}</a>`
      : `<div class="album-card opacity-70 cursor-default">${inner}</div>`;
  }).join('');
}
