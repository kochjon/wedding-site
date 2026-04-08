// ⚙️ HIER eure Cloudinary-Daten eintragen (nach Registrierung)
const CLOUD_NAME = 'EUER_CLOUD_NAME';   // z.B. 'yeli-joni-wedding'
const UPLOAD_PRESET = 'wedding_upload'; // Name des Unsigned Presets

function initFotos() {
  const section = document.getElementById('fotos');
  section.innerHTML = `
    <h2 class="text-3xl mb-2 text-green-700" data-de="Unsere Fotos" data-en="Our Photos">Unsere Fotos</h2>
    <p class="text-gray-500 mb-6 text-sm" data-de="Ladet eure schönsten Momente hoch – sie erscheinen sofort in der Galerie!" data-en="Upload your favorite moments – they appear instantly in the gallery!">
      Ladet eure schönsten Momente hoch – sie erscheinen sofort in der Galerie!
    </p>

    <!-- Upload-Bereich -->
    <label for="photoUpload"
      class="cursor-pointer inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition mb-2">
      📷 <span data-de="Foto hochladen" data-en="Upload photo">Foto hochladen</span>
    </label>
    <input id="photoUpload" type="file" accept="image/*" multiple class="hidden" onchange="uploadPhotos(this.files)" />
    <p id="uploadStatus" class="text-sm text-gray-400 mb-8"></p>

    <!-- Galerie -->
    <div id="photoGallery" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4"></div>
  `;

  loadGallery();
  if (typeof switchLanguage === 'function') switchLanguage(window.currentLang || 'de');
}

async function uploadPhotos(files) {
  const status = document.getElementById('uploadStatus');
  status.textContent = `⏳ Wird hochgeladen...`;

  let uploaded = 0;
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'yeli-joni-wedding');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        addPhotoToGallery(data.secure_url, data.public_id);
        uploaded++;
      }
    } catch (err) {
      console.error('Upload-Fehler:', err);
    }
  }

  status.textContent = uploaded > 0
    ? `✅ ${uploaded} Foto${uploaded > 1 ? 's' : ''} hochgeladen!`
    : '❌ Upload fehlgeschlagen.';
  setTimeout(() => status.textContent = '', 4000);
}

function addPhotoToGallery(url, publicId) {
  const gallery = document.getElementById('photoGallery');
  const thumbUrl = url.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto/');
  const div = document.createElement('div');
  div.className = 'relative overflow-hidden rounded-lg shadow aspect-square';
  div.innerHTML = `
    <a href="${url}" target="_blank">
      <img src="${thumbUrl}" alt="Hochzeitsfoto"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
    </a>
  `;
  gallery.prepend(div);
}

async function loadGallery() {
  const gallery = document.getElementById('photoGallery');
  gallery.innerHTML = `<p class="col-span-full text-gray-400 text-sm">Galerie wird geladen...</p>`;

  try {
    const res = await fetch(
      `https://res.cloudinary.com/${wedding_upload}/image/list/yeli-joni-wedding.json`
    );
    const data = await res.json();
    gallery.innerHTML = '';

    if (!data.resources || data.resources.length === 0) {
      gallery.innerHTML = `<p class="col-span-full text-gray-400 text-sm">Noch keine Fotos – seid die Ersten! 📸</p>`;
      return;
    }

    data.resources
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .forEach(img => {
        const url = `https://res.cloudinary.com/${wedding_upload}/image/upload/${img.public_id}`;
        addPhotoToGallery(url, img.public_id);
      });
  } catch {
    gallery.innerHTML = `<p class="col-span-full text-gray-400 text-sm">Noch keine Fotos – seid die Ersten! 📸</p>`;
  }
}