// js/globals.js

function copyText(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => alert("Kopiert: " + text))
      .catch(() => alert("Fehler beim Kopieren"));
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Kopiert: " + text);
    } catch {
      alert("Fehler beim Kopieren");
    }
    document.body.removeChild(textarea);
  }
}

function initTimeline() {
  const cards = Array.from(document.querySelectorAll(".timeline-card"));
  const dots = Array.from(document.querySelectorAll(".timeline-dot"));
  const line = document.querySelector(".timeline-line");
  const wrapper = document.querySelector(".timeline-wrapper");

  if (!cards.length || !dots.length || !line || !wrapper) {
    return;
  }

  const VISUAL_OFFSET_PX = -6;

  function positionTimeline() {
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const isMobile = window.innerWidth < 768;
    const centers = [];

    cards.forEach((card, i) => {
      // auf Mobile nur die weiße Box messen, auf Desktop den ganzen Row-Block
      const target = isMobile ? card.querySelector("div.bg-white\\/70") : card;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const center =
        rect.top + window.scrollY - wrapperTop + rect.height / 2 + VISUAL_OFFSET_PX;

      centers.push(center);

      if (dots[i]) {
        dots[i].style.top = center + "px";
      }
    });

    if (centers.length >= 2) {
      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];

      line.style.left = "50%";
      line.style.transform = "translateX(-50%)";
      line.style.top = firstCenter + "px";
      line.style.height = (lastCenter - firstCenter) + "px";
    }
  }

  // initiale Positionierung (sofort nach Inject)
  positionTimeline();

  // nach onload leicht nachjustieren
  window.addEventListener("load", () => {
    setTimeout(positionTimeline, 1000);
  });

  // bei Resize neu rechnen (debounced)
  window.addEventListener("resize", () => {
    clearTimeout(window._timelineResizeTimer);
    window._timelineResizeTimer = setTimeout(positionTimeline, 300);
  });

  // Fade-in Observer neu setzen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

          // nach dem Einblenden nochmal Linie/Dots feinjustieren
          setTimeout(positionTimeline, 900);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => {
    // wichtig: beim Re-Init erst mal Rücksetzen,
    // sonst bleiben sie evtl. schon "visible"
    card.classList.remove("visible");
    observer.observe(card);
  });
}

// optional kannst du resetTimelineAnimation() jetzt einfach zu einem Alias machen
function resetTimelineAnimation() {
  initTimeline();
}