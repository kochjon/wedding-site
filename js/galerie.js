// js/galerie.js
// Online-Galerie (Cloudinary) für den "Galerie"-Tab auf index.html.
// Zeigt nur die Ansicht der bereits hochgeladenen Fotos & Videos.
// Das Hochladen selbst passiert ausschliesslich auf der Subpage fotos.html –
// beide Seiten teilen sich dieselbe Cloudinary-Quelle (gleicher Tag).

// ══════════════════════════════════════════════
// ⚙️  CLOUDINARY KONFIGURATION – hier anpassen
// ══════════════════════════════════════════════
const GALLERY_CLOUD_NAME = 'dr9neirts';  // Zu finden auf Cloudinary / Home
const GALLERY_TAG        = 'yeli-joni';  // Tag für die Galerie-Abfrage
// ══════════════════════════════════════════════

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

    if (all.length === 0) {
      status.textContent = 'Noch keine Fotos – seid die Ersten! 📸';
      return;
    }

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

    status.textContent = `${all.length} Datei${all.length !== 1 ? 'en' : ''} bisher`;
  } catch (e) {
    grid.innerHTML = '';
    status.textContent = 'Noch keine Fotos – seid die Ersten! 📸';
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
