// js/slideshow.js
// Autoplay-Slideshow mit Fade + manueller Steuerung (Pfeile) – robust gegen "leere" Frames.
// Initialisiert alle Container mit [data-slideshow].
//
// Daten-Attribute am Container:
//  - data-index-json="images/slideshow/index.json"          (JSON-Array mit Dateinamen/URLs)
//  - data-fallback="images/a.jpg,images/b.jpg,images/c.jpg" (CSV-Fallback, falls JSON fehlt)
//  - data-interval="4000"   (ms; Standard 4000)
//  - data-height="350"      (px; Standard 350)
//  - data-radius="16"       (px; Standard 16)
//  - data-fit="cover|contain" (Standard cover)
//  - data-controls="true"   (Pfeile anzeigen)
//  - data-indicators="true" (Dots anzeigen)

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
    img.decoding = "async"; // schnelleres Rendering
    // img.loading = "eager"; // falls gewünscht, sonst Browser-Default
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
            : indexJson.replace(/\/[^/]*$/, `/${name}`)
        );
      } catch (e) {
        console.warn(`[slideshow] Konnte ${indexJson} nicht laden – Fallback wird genutzt:`, e);
      }
    }
    if (!images.length && fallbackCsv) {
      images = parseCsvList(fallbackCsv);
    }
    if (!images.length) return;

    // Bühne (Stack) für absolute Slides
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

    prev.addEventListener("click", () => api.prev(true));
    next.addEventListener("click", () => api.next(true));

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
      d.addEventListener("click", () => api.go(i, true));
      dots.appendChild(d);
      btns.push(d);
    });

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
    let isTransitioning = false;

    // Transition: halte alte Folie sichtbar, bis neue geladen ist
    const crossfadeTo = (targetIndex) => {
      if (isTransitioning || targetIndex === index) return;
      const prev = slides[index];
      const next = slides[targetIndex];
      if (!next) return;

      isTransitioning = true;

      const doFade = () => {
        // Z-Order: neue drüber, alte drunter
        prev && (prev.style.zIndex = "1");
        next.style.zIndex = "2";

        // Neue einblenden, alte erst danach ausblenden
        next.style.opacity = "1";
        // eine Frame später altes rausfaden (verhindert "leere" Frames)
        requestAnimationFrame(() => {
          prev && (prev.style.opacity = "0");
        });

        index = targetIndex;
        isTransitioning = false;
        api.onChange?.(index);
      };

      // Wenn das Bild schon bereit ist, sofort überblenden
      if (next.complete) {
        doFade();
      } else {
        // warten bis geladen, dann überblenden – alte Folie bleibt solange sichtbar
        const onReady = () => {
          next.removeEventListener("load", onReady);
          next.removeEventListener("error", onReady); // selbst bei Fehler weiter
          doFade();
        };
        next.addEventListener("load", onReady);
        next.addEventListener("error", onReady);
      }
    };

    const next = (fromUser = false) => {
      const i = (index + 1) % slides.length;
      crossfadeTo(i);
      if (fromUser) restart();
    };

    const prev = (fromUser = false) => {
      const i = (index - 1 + slides.length) % slides.length;
      crossfadeTo(i);
      if (fromUser) restart();
    };

    const go = (i, fromUser = false) => {
      if (i < 0 || i >= slides.length) return;
      crossfadeTo(i);
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
      next, prev, go, start, stop, restart,
      onChange: null
    };

    // Initial sichtbar machen
    slides.forEach(s => (s.style.opacity = "0"));
    slides[0].style.opacity = "1";
    slides[0].style.zIndex = "2";
    start();

    // Aufräumen, falls Container entfernt wird
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        stop();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

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

    const api = createApi(container, interval);
    if (!api) return;

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
