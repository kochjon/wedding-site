// js/tabs-content.js

//Comments
/*  
  <p class="text-gray-600 mb-10 text-center"
     data-de="Hier beginnt unsere Liebesgeschichte..."
     data-en="Here begins our love story...">
    Hier beginnt unsere Liebesgeschichte...
  </p>
*/

// "Unsere Geschichte"
const contentGeschichte = `
  <h2 class="text-3xl mb-10 text-red-700 text-center" data-de="Unsere Geschichte" data-en="Our Story">
    Unsere Geschichte
  </h2>

  <!-- Timeline -->
  <div class="flex timeline-wrapper">

    <!-- Linke Spalte: Linie + Punkte -->
    <div class="relative w-12 flex-shrink-0">
      <div class="absolute w-[2px] bg-red-500 timeline-line"></div>

      <!-- Punkte (werden per JS positioniert) -->
      <div class="absolute w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
    </div>

    <!-- Rechte Spalte -->
    <div class="flex-1 space-y-16">

      <!-- 1 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/story-2019.jpg"
             alt="Erstes Treffen"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-red-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-red-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-red-700 font-semibold mb-2">
            2019 · Erstes Treffen
          </p>
          <p class="text-gray-700 text-base leading-relaxed">
            Hier kannst du eure erste Begegnung beschreiben.
          </p>
        </div>
      </div>

      <!-- 2 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/story-2020.jpg"
             alt="Erstes Abenteuer"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-red-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-red-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-red-700 font-semibold mb-2">
            2020 · Erstes Abenteuer
          </p>
          <p class="text-gray-700 text-base leading-relaxed">
            Beschreibe euer erstes gemeinsames Abenteuer oder einen besonderen Moment.
          </p>
        </div>
      </div>

      <!-- 3 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/story-2022.jpg"
             alt="Zusammengezogen"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-red-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-red-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-red-700 font-semibold mb-2">
            2022 · Zusammengezogen
          </p>
          <p class="text-gray-700 text-base leading-relaxed">
            Ein kleiner Text über euer gemeinsames Zuhause oder wichtige Schritte.
          </p>
        </div>
      </div>

      <!-- 4 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/story-2025.jpg"
             alt="Verlobung"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-red-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-red-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-red-700 font-semibold mb-2">
            2025 · Verlobung 💍
          </p>
          <p class="text-gray-700 text-base leading-relaxed">
            Hier kannst du den Antrag, den Ort und die Emotionen beschreiben.
          </p>
        </div>
      </div>

    </div>
  </div>
`;



// "Details"
const contentDetails = `
  <h2 class="text-3xl mb-4 text-red-700 text-center" data-de="Hochzeitsdetails" data-en="Wedding Details">Hochzeitsdetails</h2>

  <div class="flex flex-col md:flex-row justify-center gap-12 text-left">
    <div class="md:w-1/2 text-center md:text-left">
      <p class="font-semibold text-gray-700" data-de="Kirche" data-en="Church">Kirche</p>
      <p>Kirche Buchberg-Rüdlingen</p>
      <p>Dorfstrasse 2</p>
      <p>8455 Rüdlingen</p>
      <img src="images/kirche.jpeg" alt="Kirche" class="details-img mt-4" />
      <p class="mt-2" data-de="Besammlung 13:30, Start Trauung 14:00" data-en="Gathering at 1:30 p.m., wedding ceremony begins at 2:00 p.m.">Besammlung 13:30, Start Trauung 14:00</p>
    </div>

    <div class="md:w-1/2 text-center md:text-left">
      <p class="font-semibold text-gray-700" data-de="Empfang" data-en="Reception">Empfang</p>
      <p>Bergtrotte Osterfingen</p>
      <p>Trottenweg 38</p>
      <p>8218 Osterfingen</p>
      <img src="images/empfang.jpeg" alt="Empfang" class="details-img mt-4" />
      <p class="mt-2" data-de="Verschiebung nach Osterfingen ca. 17:00, Shuttels nach Schaffhausen Bahnhof ab 23:30" data-en="Transfer to Osterfingen at approximately 5 p.m., shuttles to Schaffhausen railway station from 11.30 p.m.">Verschiebung nach Osterfingen ca. 17:00, Shuttels nach Schaffhausen Bahnhof ab 23:30</p>
    </div>
  </div>
`;



// "Geschenke"
const contentGeschenke = `
  <h2 class="text-3xl mb-6 text-red-700 text-center" data-de="Geschenke" data-en="Gifts">Geschenke</h2>

  <div class="relative w-full md:w-3/4 mx-auto rounded-lg overflow-hidden shadow-lg">
    <img
      src="images/Geschenke.png"
      alt="Geschenke"
      class="w-full object-cover"
    />
    <div class="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm px-6 py-4">
      <p class="text-gray-800 text-base md:text-lg leading-relaxed"
         data-de='Da wir bereits wunschlos glücklich sind, haben wir keinerlei Geschenkewünsche. Wer dennoch etwas geben möchte, darf uns einen Beitrag an unsere "kleine" Weltreise spenden oder etwas an die Hochzeit mitbringen.'
         data-en='As we are already completely happy, we have no wishes for gifts. However, if you would still like to give something, you are welcome to contribute to our "little" world trip or bring something small to the wedding.'>
        Da wir bereits wunschlos glücklich sind, haben wir keinerlei Geschenkewünsche. Wer dennoch etwas geben möchte, darf uns einen Beitrag an unsere "kleine" Weltreise spenden oder etwas an die Hochzeit mitbringen.
      </p>
    </div>
  </div>

  <div class="space-y-6 mt-10">
    <div>
      <p class="text-gray-800 font-semibold mb-2" data-de="IBAN" data-en="IBAN">IBAN</p>
      <div class="flex justify-center items-center gap-2">
        <div id="ibanText"
             class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-800 select-all shadow-sm">
          CH3408440259315192001
        </div>
        <button onclick="copyText('ibanText')"
                class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-md shadow transition">
          📋
        </button>
      </div>
    </div>

    <div>
      <p class="text-gray-800 font-semibold mb-2" data-de="Adresse" data-en="Address">Adresse</p>
      <div class="flex justify-center items-center gap-2">
        <div id="addressText"
             class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-800 select-all shadow-sm">
          Jonas Koch, Altweg 25, 8450 Rüdlingen
        </div>
        <button onclick="copyText('addressText')"
                class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-md shadow transition">
          📋
        </button>
      </div>
    </div>
  </div>
`;


// kleines Mapping damit du per ID laden kannst
const TAB_CONTENT_MAP = {
  "geschichte": contentGeschichte,
  "details": contentDetails,
  "geschenke": contentGeschenke,
};

// Diese Funktion kannst du aufrufen, um Content in ein Ziel-Element einzusetzen
function injectTabContent(targetId, tabName) {
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  if (TAB_CONTENT_MAP[tabName]) {
    targetEl.innerHTML = TAB_CONTENT_MAP[tabName];
  } else {
    targetEl.innerHTML = `<p>Inhalt nicht gefunden.</p>`;
  }

  // ganz wichtig: jetzt, wo der HTML drin ist, Timeline initialisieren
  if (tabName === "geschichte" && typeof initTimeline === "function") {
    initTimeline();
  }
}