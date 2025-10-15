// js/slideshow.js
(function () {
  "use strict";

  const SLIDE_CLASS = "js-slideshow-slide";
  const VISIBLE_CLASS = "is-visible";
  const TIMER_SYMBOL = Symbol("slideshowTimer");

  function parseCsvList(str) {
    return (str || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function applyBaseStyles(container, { height, radius }) {
    const cs = container.style;
    if (!cs.position) cs.position = "relative";
    if (!cs.width) cs.width = "100%";
    if (!cs.overflow) cs.overflow = "hidden";
    if (!cs.borderRadius) cs.borderRadius = `${radius}px`;
    if (!cs.boxShadow) cs.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
    if (!cs.height) cs.height = `${height}px`;
  }

  function createSlide(src, { height, radius, fit }) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.classList.add(SLIDE_CLASS);
    const s = img.style;
    s.position = "absolute";
    s.inset = "0";
    s.width = "100%";
    s.height = "100%";
    s.objectFit = fit;
    s.borderRadius = `${radius}px`;
    s.opacity = "0";
    s.transition = "opacity 250ms ease";
    s.pointerEvents = "none";
    img.setAttribute("aria-hidden", "true");
    return img;
  }

  function setVisible(slides, newIndex) {
    slides.forEach((el, i) => {
      if (i === newIndex) {
        el.style.opacity = "1";
        el.removeAttribute("aria-hidden");
        el.classList.add(VISIBLE_CLASS);
        el.style.pointerEvents = "";
      } else {
        el.style.opacity = "0";
        el.setAttribute("aria-hidden", "true");
        el.classList.remove(VISIBLE_CLASS);
        el.style.pointerEvents = "none";
      }
    });
  }

  function startRotation(container, interval) {
    const slides = Array.from(container.querySelectorAll(`.${SLIDE_CLASS}`));
    if (!slides.length) return;

    if (container[TIMER_SYMBOL]) {
      clearInterval(container[TIMER_SYMBOL]);
      container[TIMER_SYMBOL] = null;
    }

    let index = 0;
    setVisible(slides, index);

    const timerId = setInterval(() => {
      index = (index + 1) % slides.length;
      setVisible(slides, index);
    }, interval);

    container[TIMER_SYMBOL] = timerId;

    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        if (container[TIMER_SYMBOL]) clearInterval(container[TIMER_SYMBOL]);
        container[TIMER_SYMBOL] = null;
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
          /^https?:\/\//.test(name)
            ? name
            : indexJson.replace(/\/[^/]*$/, `/${name}`)
        );
      } catch (e) {
        console.warn(`[slideshow] Fallback aktiv – konnte ${indexJson} nicht laden:`, e);
      }
    }

    if (!images.length && fallbackCsv) {
      images = parseCsvList(fallbackCsv);
    }

    if (!images.length) return;

    container.querySelectorAll(`.${SLIDE_CLASS}`).forEach(n => n.remove());

    images.forEach(src => {
      const slide = createSlide(src, opts);
      container.appendChild(slide);
    });
  }

  async function initContainer(container) {
    if (container.dataset.slideshowInitialized === "1") return;
    container.dataset.slideshowInitialized = "1";

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
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    initAll();
  }
})();
