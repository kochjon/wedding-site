// js/slideshow.js
(function () {
  "use strict";

  const SLIDE_CLASS = "js-slideshow-slide";
  const VISIBLE_CLASS = "is-visible";
  const TIMER_SYMBOL = Symbol("slideshowTimer");
  const STATE_SYMBOL = Symbol("slideshowState");

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
    if (!cs.borderRadius) cs.borderRadius = radius + "px";
    if (!cs.boxShadow) cs.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
    // Höhe nur setzen, wenn explizit angegeben – sonst regelt das CSS (aspect-ratio)
    if (!cs.height && height) cs.height = height + "px";
  }

  // Eine Folie = Wrapper mit unscharfem Hintergrund (füllt die Fläche) und dem
  // vollständig sichtbaren Bild im Vordergrund (object-fit: contain) – so werden
  // Hochformat-Bilder nicht mehr oben/unten abgeschnitten (Köpfe!).
  function createSlide(src, { radius, fit }) {
    const wrap = document.createElement("div");
    wrap.dataset.src = src; // erst laden, wenn das Bild (fast) an der Reihe ist
    wrap.classList.add(SLIDE_CLASS);

    const w = wrap.style;
    w.position = "absolute";
    w.inset = "0";
    w.overflow = "hidden";
    w.borderRadius = radius + "px";
    w.opacity = "0";
    w.transition = "opacity 400ms ease";
    w.pointerEvents = "none";
    w.zIndex = "1";
    w.background = "#f3f1ee";

    const img = document.createElement("img");
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.decoding = "async";
    const s = img.style;
    s.position = "absolute";
    s.inset = "0";
    s.width = "100%";
    s.height = "100%";
    s.objectFit = fit;
    s.objectPosition = "center 30%"; // falls "cover": eher oben anschneiden als Köpfe

    if (fit === "contain") {
      const bg = document.createElement("img");
      bg.alt = "";
      bg.referrerPolicy = "no-referrer";
      bg.decoding = "async";
      bg.setAttribute("aria-hidden", "true");
      bg.dataset.role = "bg";
      const b = bg.style;
      b.position = "absolute";
      b.inset = "0";
      b.width = "100%";
      b.height = "100%";
      b.objectFit = "cover";
      b.filter = "blur(24px) brightness(0.85)";
      b.transform = "scale(1.15)";
      wrap.appendChild(bg);
    }
    img.dataset.role = "main";
    wrap.appendChild(img);

    wrap.setAttribute("aria-hidden", "true");
    return wrap;
  }

  function loadSlide(slides, i) {
    const el = slides[(i + slides.length) % slides.length];
    if (!el || el.dataset.loaded === "1" || !el.dataset.src) return;
    el.dataset.loaded = "1";
    el.querySelectorAll("img").forEach(img => { img.src = el.dataset.src; });
  }

  function setVisible(slides, newIndex) {
    loadSlide(slides, newIndex);
    loadSlide(slides, newIndex + 1); // nächstes Bild vorladen
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

  function showSlide(container, index) {
    const state = container[STATE_SYMBOL];
    const slides = state.slides;
    if (!slides.length) return;
    state.index = (index + slides.length) % slides.length;
    setVisible(slides, state.index);
  }

  function nextSlide(container) {
    const state = container[STATE_SYMBOL];
    showSlide(container, state.index + 1);
  }

  function prevSlide(container) {
    const state = container[STATE_SYMBOL];
    showSlide(container, state.index - 1);
  }

  function startRotation(container, interval) {
    const state = container[STATE_SYMBOL];
    const slides = state.slides;
    if (!slides.length) return;

    if (container[TIMER_SYMBOL]) {
      clearInterval(container[TIMER_SYMBOL]);
      container[TIMER_SYMBOL] = null;
    }

    setVisible(slides, state.index);

    const timerId = setInterval(() => nextSlide(container), interval);
    container[TIMER_SYMBOL] = timerId;

    // Beobachten, ob Container entfernt wird
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
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("JSON is not an array");
    return data;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  async function buildSlides(container, opts) {
    const sourceUrl = container.getAttribute("data-source-url");
    const indexJson = container.getAttribute("data-index-json");
    const fallbackCsv = container.getAttribute("data-fallback");

    let images = [];

    // 1) Bilder aus den Google-Fotos-Alben (Netlify Function /api/slideshow)
    if (sourceUrl) {
      try {
        images = (await fetchJsonArray(sourceUrl)).filter(u => typeof u === "string" && u);
      } catch (e) {
        console.warn("[slideshow] Google-Fotos-Quelle nicht verfügbar (" + sourceUrl + "):", e);
      }
    }

    // 2) Lokaler Ordner als Rückfall
    if (!images.length && indexJson) {
      try {
        const list = await fetchJsonArray(indexJson);
        images = list.map(name =>
          /^https?:\/\//.test(name)
            ? name
            : indexJson.replace(/\/[^/]*$/, "/" + name)
        );
      } catch (e) {
        console.warn("[slideshow] Fallback aktiv – konnte " + indexJson + " nicht laden:", e);
      }
    }

    if (!images.length && fallbackCsv) {
      images = parseCsvList(fallbackCsv);
    }

    if (!images.length) return [];

    if (container.getAttribute("data-shuffle") === "true") shuffle(images);

    container.querySelectorAll("." + SLIDE_CLASS).forEach(n => n.remove());
    const slides = images.map(src => {
      const slide = createSlide(src, opts);
      // Defekte Bilder (z.B. abgelaufene Google-Links) aus der Diashow entfernen
      slide.querySelector('img[data-role="main"]').addEventListener("error", () => {
        const state = container[STATE_SYMBOL];
        const list = state ? state.slides : slides;
        const i = list.indexOf(slide);
        if (i === -1 || list.length <= 1) return;
        const wasVisible = state && i === state.index;
        list.splice(i, 1);
        slide.remove();
        if (state) {
          if (i < state.index) state.index--;
          if (state.index >= list.length) state.index = 0;
          if (wasVisible) setVisible(list, state.index);
        }
      });
      container.appendChild(slide);
      return slide;
    });
    return slides;
  }

  function setupButtons(container) {
	  // Container muss Bezugspunkt sein
	  if (getComputedStyle(container).position === "static") {
		container.style.position = "relative";
	  }

	  let prevBtn = container.querySelector(".slideshow-prev");
	  let nextBtn = container.querySelector(".slideshow-next");

	  // Falls keine Buttons vorhanden sind: automatisch erzeugen
	  if (!prevBtn) {
		prevBtn = document.createElement("button");
		prevBtn.className = "slideshow-prev";
		prevBtn.setAttribute("aria-label", "Vorheriges Bild");
		prevBtn.textContent = "‹";
		container.appendChild(prevBtn);
	  }
	  if (!nextBtn) {
		nextBtn = document.createElement("button");
		nextBtn.className = "slideshow-next";
		nextBtn.setAttribute("aria-label", "Nächstes Bild");
		nextBtn.textContent = "›";
		container.appendChild(nextBtn);
	  }

	  // WICHTIG: Kein Submit-Button!
	  prevBtn.type = "button";
	  nextBtn.type = "button";

	  // Basisstyles direkt am Element (robust gegen fehlendes CSS)
	  [prevBtn, nextBtn].forEach((btn) => {
		const s = btn.style;
		s.position = "absolute";
		s.top = "50%";
		s.transform = "translateY(-50%)";
		s.background = "rgba(0,0,0,0.4)";
		s.color = "#fff";
		s.border = "none";
		s.fontSize = "24px";
		s.width = "40px";
		s.height = "40px";
		s.borderRadius = "50%";
		s.cursor = "pointer";
		s.zIndex = "2";
		s.display = "inline-flex";
		s.alignItems = "center";
		s.justifyContent = "center";
		s.userSelect = "none";
	  });
	  // Links/rechts innen am Rand
	  prevBtn.style.left = "10px";
	  nextBtn.style.right = "10px";

	  // Klick-Handler (Default unterdrücken + Wechsel + Timer-Reset)
	  prevBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		prevSlide(container);
		restartTimer(container);
	  });
	  nextBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		nextSlide(container);
		restartTimer(container);
	  });
	}

  function restartTimer(container) {
    const state = container[STATE_SYMBOL];
    if (container[TIMER_SYMBOL]) {
      clearInterval(container[TIMER_SYMBOL]);
      container[TIMER_SYMBOL] = setInterval(() => nextSlide(container), state.interval);
    }
  }

  async function initContainer(container) {
    if (container.dataset.slideshowInitialized === "1") return;
    container.dataset.slideshowInitialized = "1";

    const interval = parseInt(container.getAttribute("data-interval") || "4000", 10);
    const height = parseInt(container.getAttribute("data-height") || "0", 10);
    const radius = parseInt(container.getAttribute("data-radius") || "16", 10);
    const fit = (container.getAttribute("data-fit") || "cover").toLowerCase();

    const opts = { interval, height, radius, fit };
    applyBaseStyles(container, opts);

    const slides = await buildSlides(container, opts);
    container[STATE_SYMBOL] = { index: 0, slides, interval };

    setupButtons(container);
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
