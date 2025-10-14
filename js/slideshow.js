// js/slideshow.js
// Autoplay-Slideshow mit Fade-Übergang + manueller Steuerung (Pfeile).
// Initialisiert alle Container mit [data-slideshow].
//
// Konfiguration per data-Attributen am Container:
//  - data-index-json="images/slideshow/index.json"         (JSON-Array mit Dateinamen oder URLs)
//  - data-fallback="images/a.jpg,images/b.jpg,images/c.jpg" (CSV-Fallback, falls JSON fehlt)
//  - data-interval="4000"   (ms; Standard 4000)
//  - data-height="350"      (px; Höhe der Slides; Standard 350)
//  - data-radius="16"       (px; Border-Radius; Standard 16)
//  - data-fit="cover|contain" (object-fit; Standard cover)
//  - data-controls="true"   (Pfeile anzeigen; Standard off)
//  - data-indicators="true" (Dots anzeigen; Standard off)

(function () {
  "use strict";

  function parseCsvList(str) {
    return (str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  async function fetchJsonArray(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("JSON is not an array");
    return data;
  }

  function applyBaseStyles(container, { radius }) {
    // Grundlayout, falls kein Tailwind vorhanden ist
    container.style.position = container.style.position || "relative";
    container.style.width = container.style.width || "100%";
    container.style.overflow = container.style.overflow || "hidden";
    container.style.borderRadius = container.style.borderRadius || `${radius}px`;
    container.style.boxShadow = container.style.boxShadow || "0 4px 8px rgba(0,0,0,0.15)";
  }

  // Slide-Element mit Fade-Styles
  function createSlide(src, { height, radius, fit }) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.className = (img.className || "").concat(" slide").trim();
    Object.assign(img.style, {
      width: "100%",
      height: `${height}px`,
      objectFit: fit,
      position: "absolute",
      top: "0",
      left: "0",
      opacity: "0",
      transition: "opacity 600ms ease",
      borderRadius: `${radius}px`
    });
    return img;
  }

  async function buildSlides(container, opts) {
    const indexJson = container.getAttribute("data-index-json");
    const fallbackCsv = container.getAttribute("data-fallback");

    let images = [];
    if (indexJson) {
      try {
        const list = await fetchJsonArray(indexJson);
        images = list.map(name =>
          /^https?:\/\//.test(name)
            ? name
            : indexJson.replace(/\/[^/]*$/, `/${name}`) // gleiches Verzeichnis wie index.json
        );
      } catch (e) {
        console.warn(`[slideshow] Konnte ${indexJson} nicht laden – Fallback wird genutzt:`, e);
      }
    }
    if (!images.length && fallbackCsv) {
      images = parseCsvList(fallbackCsv);
    }
    if (!images.length) return;

    // Stacking-Ebene vorbereiten
    const stage = document.createElement("div");
    Object.assign(stage.style, {
      position: "relative",
      width: "100%",
      height: `${opts.height}px`
    });
    container.appendChild(stage);

    images.forEach((src, i) => {
      const slide = createSlide(src, opts);
      if (i === 0) slide.style.opacity = "1";
      stage.appendChild(slide);
    });
  }

  function addControls(container, api) {
    if (container.getAttribute("data-controls") !== "true") return;

    const wrap = document.createElement("div");
    Object.assign(wrap.style, {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pointerEvents: "none"
    });

    const mkBtn = (txt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = txt;
      Object.assign(b.style, {
        pointerEvents: "auto",
        background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "9999px",
        padding: "6px 10px",
        margin: "0 8px",
        cursor: "pointer",
        lineHeight: "1",
        fontSize: "18px",
        userSelect: "none"
      });
      return b;
    };

    const prev = mkBtn("‹");
    const next = mkBtn("›");

    prev.addEventListener("click", () => api.prev());
    next.addEventListener("click", () => api.next());

    wrap.appendChild(prev);
    wrap.appendChild(next);
    container.appendChild(wrap);
  }

  function addIndicators(container, api) {
    if (container.getAttribute("data-indicators") !== "true") return;
    const slides = container.querySelectorAll(".slide");
    if (!slides.length) return;

    const dots = document.createElement("div");
    Object.assign(dots.style, {
      position: "absolute",
      left: "50%",
      bottom: "8px",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "6px"
    });

    const btns = [];
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      Object.assign(d.style, {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.2)",
        background: i === 0 ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.95)",
        cursor: "pointer",
        padding: "0"
      });
      d.addEventListener("click", () => api.go(i, /*fromUser*/ true));
      dots.appendChild(d);
      btns.push(d);
    });

    // UI-Update wenn Slide wechselt
    api.onChange = (i) => {
      btns.forEach((b, idx) => {
        b.style.background = idx === i ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.95)";
      });
    };

    container.appendChild(dots);
  }

  function createApi(container, interval) {
    const slides = Array.from(container.querySelectorAll(".slide"));
    if (!slides.length) return null;

    let index = 0;
    let timerId = null;

    const show = (i) => {
      slides.forEach(s => (s.style.opacity = "0"));
      slides[i].style.opacity = "1";
      index = i;
      api.onChange?.(index);
    };

    const next = (fromUser = false) => {
      const i = (index + 1) % slides.length;
      show(i);
      if (fromUser) restart();
    };

    const prev = (fromUser = false) => {
      const i = (index - 1 + slides.length) % slides.length;
      show(i);
      if (fromUser) restart();
    };

    const go = (i, fromUser = false) => {
      if (i < 0 || i >= slides.length) return;
      show(i);
      if (fromUser) restart();
    };

    const start = () => {
      stop();
      timerId = setInterval(() => next(false), interval);
    };

    const stop = () => {
      if (timerId) clearInterval(timerId);
      timerId = null;
    };

    const restart = () => {
      start();
    };

    const api = {
      get index() { return index; },
      next: () => next(true),
      prev: () => prev(true),
      go,
      start,
      stop,
      restart,
      onChange: null
    };

    // Initial anzeigen + starten
    show(0);
    start();

    // Aufräumen, falls Container entfernt wird
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        stop();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Exponieren (falls du später darauf zugreifen willst)
    container.__slideshow = api;
    return api;
  }

  async function initContainer(container) {
    const interval = parseInt(container.getAttribute("data-interval") || "4000", 10);
    const height = parseInt(container.getAttribute("data-height") || "350", 10);
    const radius = parseInt(container.getAttribute("data-radius") || "16", 10);
    const fit = (container.getAttribute("data-fit") || "cover").toLowerCase();

    const opts = { interval, height, radius, fit };

    applyBaseStyles(container, opts);
    await buildSlides(container, opts);

    // Autoplay + Fade
    const api = createApi(container, interval);
    if (!api) return;

    // Manuelle Steuerung (Pfeile) und optional Dots
    addControls(container, api);
    addIndicators(container, api);
  }

  async function initAll() {
    const containers = document.querySelectorAll("[data-slideshow]");
    for (const c of containers) {
      try { await initContainer(c); }
      catch (e) { console.error("[slideshow] Fehler beim Initialisieren:", e); }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
