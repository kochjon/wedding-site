// js/galerie.js
// Galerie-Tab auf index.html:
//  1) Albumkarten mit Links zu den Google-Fotos-Alben (GOOGLE_ALBUMS)
//  2) Fotos & Videos, die Gäste früher über die Seite zu Cloudinary hochgeladen haben

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
    url: null, // TODO: Link zum Gäste-Album eintragen
    cover: null,
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
    de: 'Drohne', en: 'Drone',
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

// ══════════════════════════════════════════════
// ⚙️  CLOUDINARY (frühere Gäste-Uploads, nur Anzeige)
// ══════════════════════════════════════════════
const GALLERY_CLOUD_NAME = 'dr9neirts';
const GALLERY_TAG        = 'yeli-joni';
// ══════════════════════════════════════════════

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

// ── Galerie laden ──
async function loadGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  const status = document.getElementById('galleryStatus');
  if (!grid || !status) return;

  grid.innerHTML = Array(6).fill('<div class="skeleton"></div>').join('');
  status.textContent = '';

  try {
    // Beide Endpunkte parallel abfragen
    const [imgRes, vidRes] = await Promise.all([
      fetch(`https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/image/list/${GALLERY_TAG}.json`).then(r => r.json()).catch(() => ({ resources: [] })),
      fetch(`https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/video/list/${GALLERY_TAG}.json`).then(r => r.json()).catch(() => ({ resources: [] }))
    ]);

    const images = (imgRes.resources || []).map(r => ({ ...r, resource_type: 'image' }));
    const videos = (vidRes.resources || []).map(r => ({ ...r, resource_type: 'video' }));
    const all = [...images, ...videos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    grid.innerHTML = '';

    const section = document.getElementById('cloudinarySection');
    if (all.length === 0) {
      if (section) section.classList.add('hidden');
      return;
    }
    if (section) section.classList.remove('hidden');

    all.forEach(item => {
      const isVideo = item.resource_type === 'video';
      const pubId = item.public_id;
      const thumb = isVideo
        ? `https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/video/upload/w_400,h_400,c_fill,f_jpg,q_auto/${pubId}.jpg`
        : `https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/image/upload/w_400,h_400,c_fill,q_auto/${pubId}`;
      const full = isVideo
        ? `https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/video/upload/q_auto/${pubId}.mp4`
        : `https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/image/upload/q_auto/${pubId}`;
      const guestName = item.context?.custom?.guest_name || '';

      const wrap = document.createElement('div');
      wrap.className = 'gallery-img-wrap';

      const thumbImg = document.createElement('img');
      thumbImg.alt = isVideo ? 'Video' : 'Hochzeitsfoto';
      thumbImg.loading = 'lazy';
      thumbImg.src = thumb;
      // Fallback: graues Placeholder-Bild wenn Thumbnail nicht lädt
      thumbImg.onerror = () => {
        thumbImg.onerror = null;
        thumbImg.src = `https://res.cloudinary.com/${GALLERY_CLOUD_NAME}/video/upload/w_400,h_400,c_fill,f_jpg,q_auto,so_0/${pubId}.jpg`;
      };

      wrap.appendChild(thumbImg);

      if (isVideo) {
        const playIcon = document.createElement('div');
        playIcon.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none';
        playIcon.innerHTML = '<span style="font-size:2.5rem;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.6))">▶️</span>';
        wrap.appendChild(playIcon);
      }

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = guestName ? `<span>📷 ${guestName}</span>` : '';
      wrap.appendChild(overlay);

      wrap.addEventListener('click', () => openGalleryLightbox(full, guestName, isVideo));
      grid.appendChild(wrap);
    });

    status.textContent = '';
  } catch (e) {
    grid.innerHTML = '';
    const section = document.getElementById('cloudinarySection');
    if (section) section.classList.add('hidden');
  }
}

// ── Lightbox ──
function openGalleryLightbox(src, caption, isVideo = false) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  let vid = document.getElementById('lightboxVideo');

  if (isVideo) {
    img.style.display = 'none';
    if (!vid) {
      vid = document.createElement('video');
      vid.id = 'lightboxVideo';
      vid.controls = true;
      vid.autoplay = true;
      vid.style.cssText = 'max-width:90vw;max-height:80vh;border-radius:0.5rem;';
      lb.insertBefore(vid, img.nextSibling);
    }
    vid.src = src;
    vid.style.display = 'block';
  } else {
    if (vid) { vid.style.display = 'none'; vid.src = ''; }
    img.style.display = 'block';
    img.src = src;
  }

  document.getElementById('lightboxCaption').textContent = caption ? `📷 ${caption}` : '';
  lb.classList.add('open');
}

function closeGalleryLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightboxImg').src = '';
  const vid = document.getElementById('lightboxVideo');
  if (vid) { vid.pause(); vid.src = ''; }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGalleryLightbox(); });
