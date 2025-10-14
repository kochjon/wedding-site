// js/slideshow.js
// Lightweight Slideshow – vanilla JS, no dependencies.
// Initialisiert alle Container mit [data-slideshow].
// Konfigurierbar per data-Attributen:
//  - data-index-json="images/slideshow/index.json"  (Liste der Bilder als JSON Array)
//  - data-fallback="images/a.jpg,images/b.jpg,images/c.jpg"  (CSV-Liste, falls JSON fehlt)
//  - data-interval="4000"   (ms; Standard 4000)
//  - data-height="350"      (px; CSS-Höhe der Slides)
//  - data-radius="16"       (px; Border-Radius)
//  - data-fit="cover|contain" (object-fit; Standard cover)

(function () {
  "use strict";

  function parseCsvList(str) {
    return (str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function applyBaseStyles(container, { height, radius }) {
    // Sanfte Defaults, falls Tailwind-Klassen fehlen
    container.style.position = container.style.position || "relative";
    container.style.width = container.style.width || "100%";
    container.style.overflow = container.style.overflow || "hidden";
    container.style.borderRadius = container.style.borderRadius || `${radius}px`;
    container.style.boxShadow = container.style.boxShadow || "0 4px 8px rgba(0,0,0,0.15)";
  }

  function createSlide(src, { height, radius, fit }) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.className = (img.className || "").concat(" slide").trim();
    img.style.width = "100%";
    img.style.height = `${height}px`;
    img.style.objectFit = fit;
    img.style.display = "none";
    img.style.borderRadius = `${radius}px`;
    return img;
  }

  function startRotation(container, interval) {
    const slides = Array.from(container.querySelectorAll(".slide"));
    if (!slides.length) return;

    // Zeige zunächst die erste Folie
    let index = 0;
    slides.forEach(s => (s.style.display = "none"));
    slides[0].style.display = "block";

    // Rotation
    const timerId = setInterval(() => {
      slides[index].style.display = "none";
      index = (index + 1) % slides.length;
      slides[index].style.display = "block";
    }, interval);

    // Sauber aufräumen, falls Container entfernt wird
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        clearInterval(timerId);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function fetchJsonArray(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("JSON is not an array");
    return data;
  }

  async function buildSlides(container, opts) {
    const indexJson = container.getAttribute("data-index-json");
    const fallbackCsv = container.getAttribute("data-fallback");

    let images = [];
    if (indexJson) {
      try {
        const list = await fetchJsonArray(indexJson);
        images = list.map(name =>
          name.match(/^https?:\/\//)
            ? name
            : indexJson.replace(/\/[^/]*$/, `/${name}`) // same folder as index.json
        );
      } catch (e) {
        console.warn(`[slideshow] Fallback aktiv – konnte ${indexJson} nicht laden:`, e);
      }
    }

    if (!images.length && fallbackCsv) {
      images = parseCsvList(fallbackCsv);
    }

    // Wenn immer noch leer, abbrechen (nichts zu zeigen)
    if (!images.length) return;

    images.forEach((src, i) => {
      const slide = createSlide(src, opts);
      if (i === 0) slide.style.display = "block";
      container.appendChild(slide);
    });
  }

  async function initContainer(container) {
    const interval = parseInt(container.getAttribute("data-interval") || "4000", 10);
    const height = parseInt(container.getAttribute("data-height") || "350", 10);
    const radius = parseInt(container.getAttribute("data-radius") || "16", 10);
    const fit = (container.getAttribute("data-fit") || "cover").toLowerCase();

    const opts = { interval, height, radius, fit };

    applyBaseStyles(container, opts);
    await buildSlides(container, opts);
    startRotation(container, interval);
  }

  async function initAll() {
    const containers = document.querySelectorAll("[data-slideshow]");
    for (const c of containers) {
      try {
        await initContainer(c);
      } catch (e) {
        console.error("[slideshow] Fehler beim Initialisieren:", e);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
