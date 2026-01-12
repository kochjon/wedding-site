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
  <h2 class="text-3xl mb-10 text-green-700 text-center" data-de="Unsere Geschichte" data-en="Our Story">
    Unsere Geschichte
  </h2>

  <!-- Timeline -->
  <div class="flex timeline-wrapper">

    <!-- Linke Spalte: Linie + Punkte -->
    <div class="relative w-12 flex-shrink-0">
      <div class="absolute w-[2px] bg-green-500 timeline-line"></div>

      <!-- Punkte (werden per JS positioniert) -->
      <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
      <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
	  <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
	  <div class="absolute w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow-md -translate-x-1/2 -translate-y-1/2 timeline-dot" style="left: 50%;"></div>
    </div>

    <!-- Rechte Spalte -->
    <div class="flex-1 space-y-16">

      <!-- 1 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Bumble_Match.jpg"
             alt="Bumble Match"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
            data-de="Juli 2022 · Bumble Match"
			data-en="July 2022 · Bumble Match">
			Juli 2022 · Bumble Match
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Wie viele paare heutzutage haben wir Dank einem Dating-App die Möglichkeit erhalten uns kennen zu lernen. Anders als bei vielen Matched es aber bei uns seit dem ersten Tag jedesmal auf s Neue 😉"
			data-en="Like many couples today, we had the opportunity to get to know each other thanks to a dating app. Unlike many matches, however, it has been new and exciting for us ever since 😉">
			Wie viele paare heutzutage haben wir Dank einem Dating-App die Möglichkeit erhalten uns kennen zu lernen. Anders als bei vielen Matched es aber bei uns seit dem ersten Tag jedesmal auf s Neue 😉
		  </p>
        </div>
      </div>
	  
	<!-- 2 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Official.jpg"
             alt="Es ist offiziell!"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
			data-de="September 2022 · Es ist offiziell!"
			data-en="September 2022 · It's official!">
            September 2022 · Es ist offiziell!
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Schnell wurde es offiziell wobei Joni sich als erstes vor Yeli's Familie vorstellen musste. Im Gegenzug durfte Yeli mit einer "kleinen" Gruppe von 30 Leuten am Oktoberfest in Stuttgart in den neuen Freundeskreis einfinden 🍺"
			data-en="It quickly became official, with Joni having to introduce himself to Yeli's family first. In return, Yeli was allowed to join her new circle of friends with a “small�?group of 30 people at the Oktoberfest in Stuttgart 🍺">
			Schnell wurde es offiziell wobei Joni sich als erstes vor Yeli's Familie vorstellen musste. Im Gegenzug durfte Yeli mit einer "kleinen" Gruppe von 30 Leuten am Oktoberfest in Stuttgart in den neuen Freundeskreis einfinden 🍺
		  </p>
        </div>
      </div>
	  
	<!-- 3 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Layover.jpg"
             alt="Erstes Layover"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
			data-de="Januar 2023 · Erstes Layover"
			data-en="January 2023 · First Layover">
            Januar 2023 · Erstes Layover
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Yeli ohne die Fliegerei kann man sich nicht vorstellen. Aus diesem Grund musste sie auch ihren neuen Partner auf Reisetauglichkeit prüfen und nahm ihn auf ein 4-Tages Layover nach Los Angeles mit. Heute kann sich Joni ein Leben ohne die gemeinsamen Ausflüge nicht mehr vorstellen ✈️"
			data-en="It's impossible to imagine Yeli without flying. That's why she had to test her new partner's suitability for travel and took him on a 4-day layover to Los Angeles. Today, Joni can no longer imagine life without their trips together ✈️">
			Yeli ohne die Fliegerei kann man sich nicht vorstellen. Aus diesem Grund musste sie auch ihren neuen Partner auf Reisetauglichkeit prüfen und nahm ihn auf ein 4-Tages Layover nach Los Angeles mit. Heute kann sich Joni ein Leben ohne die gemeinsamen Ausflüge nicht mehr vorstellen ✈️
          </p>
        </div>
      </div>

      <!-- 4 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Australia.jpg"
             alt="Erstes Abenteuer"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
			data-de="Januar 2024 · Erste Reise"
			data-en="January 2024 · First longer travel">
            Januar 2024 · Erste Reise
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Gestartet mit dem Besuch bei Yeli's Freundin Gaby in Adelaide, startete ein Camper Trip durch Süd/Ost Australien. Eine unvergessliche Zeit die hoffentlich bald nochmals aufleben darf 🌍"
			data-en="Starting with a visit to Yeli's friend Gaby in Adelaide, we embarked on a camper trip through southern/eastern Australia. It was an unforgettable time that we hope to relive soon 🌍">
			Gestartet mit dem Besuch bei Yeli's Freundin Gaby in Adelaide, startete ein Camper Trip durch Süd/Ost Australien. Eine unvergessliche Zeit die hoffentlich bald nochmals aufleben darf 🌍
          </p>
        </div>
      </div>

      <!-- 5 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Wohnung.jpg"
             alt="Zusammengezogen"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
			data-de="September 2024 · Zusammengezogen"
			data-en="September 2024 · Moved together">
            September 2024 · Zusammengezogen
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Mit dem Zusammenzug wurde die erste Hürde für eine gemeinsame Zukunft gemeistert. In Andelfingen haben wir den Kompromiss zwischen Traumwohnung, Arbeitsweg und Sozialem Umfeld gefunden 🏡"
			data-en="By moving in together, we overcame the first hurdle to a shared future. In Andelfingen, we found the perfect compromise between our dream apartment, commute, and social environment 🏡">
			Mit dem Zusammenzug wurde die erste Hürde für eine gemeinsame Zukunft gemeistert. In Andelfingen haben wir den Kompromiss zwischen Traumwohnung, Arbeitsweg und Sozialem Umfeld gefunden 🏡
          </p>
        </div>
      </div>

      <!-- 6 -->
      <div class="flex items-center gap-6 timeline-card flex-col-reverse md:flex-row md:text-left text-center">
        <img src="images/Verlobung.jpg"
             alt="Verlobung"
             class="timeline-img w-20 h-20 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-150 hover:shadow-lg hover:border-green-400 md:order-none order-2" />
        <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-green-100 p-6 max-w-[80%] transition duration-300 hover:shadow-md md:max-w-[80%] max-w-full">
          <p class="text-xs uppercase tracking-wide text-green-700 font-semibold mb-2"
			data-de="August 2025 · Verlobung"
			data-en="August 2025 · Engagement">
            August 2025 · Verlobung
          </p>
          <p class="text-gray-700 text-base leading-relaxed"
            data-de="Zurück in Los Angeles wurde nach einem geeigneten Ort für die Verlobung gesucht. Auf Santa Catalina, der Bison Insel, passte bei Sonnenuntergang die Stimmung! 🦬💍"
			data-en="Back in Los Angeles, they searched for a suitable location for the engagement. On Santa Catalina, the bison island, the atmosphere was just right at sunset! 🦬💍">
			Zurück in Los Angeles wurde nach einem geeigneten Ort für die Verlobung gesucht. Auf Santa Catalina, der Bison Insel, passte bei Sonnenuntergang die Stimmung! 🦬💍
          </p>
        </div>
      </div>

    </div>
  </div>
`;


// "Details"
const contentDetails = `
  <h2 class="text-3xl mb-4 text-green-700 text-center" data-de="Hochzeitsdetails" data-en="Wedding Details">Hochzeitsdetails</h2>

  <div class="flex flex-col md:flex-row justify-center gap-12 text-left">
    <div class="md:w-1/2 text-center md:text-left">
      <p class="font-semibold text-gray-700" data-de="Kirche" data-en="Church">Kirche</p>
      <p>Kirche Buchberg-Rüdlingen</p>
      <p>Dorfstrasse 2</p>
      <p>8455 Rüdlingen</p>
		<div class="flex justify-center mt-4 sm:justify-start">
		  <img src="images/kirche.jpeg" alt="Kirche" class="details-img">
		</div>
      <p class="mt-2" data-de="Besammlung 13:30, Start Trauung 14:00" data-en="Gathering at 1:30 p.m., wedding ceremony begins at 2:00 p.m.">Besammlung 13:30, Start Trauung 14:00</p>
    </div>

    <div class="md:w-1/2 text-center md:text-left">
      <p class="font-semibold text-gray-700" data-de="Empfang" data-en="Reception">Empfang</p>
      <p>Bergtrotte Osterfingen</p>
      <p>Trottenweg 38</p>
      <p>8218 Osterfingen</p>
		<div class="flex justify-center mt-4 sm:justify-start">
		  <img src="images/empfang.jpeg" alt="Empfang" class="details-img mt"/>
		</div>
      <p class="mt-2" data-de="Verschiebung nach Osterfingen ca. 17:00, Shuttels nach Schaffhausen Bahnhof ab 23:30" data-en="Transfer to Osterfingen at approximately 5 p.m., shuttles to Schaffhausen railway station from 11.30 p.m.">Verschiebung nach Osterfingen ca. 17:00, Shuttels nach Schaffhausen Bahnhof ab 23:30</p>
    </div>
  </div>
`;


// "Programm"
const contentProgramm = `
  <h2 class="text-3xl mb-6 text-green-700 text-center" data-de="Programm" data-en="Schedule">Programm</h2>
  <h2 class="text-2xl mb-6 text-green-700 text-center" data-de="Wird noch festgelegt" data-en="To be defined">Wird noch festgelegt</h2>

`;



// "Geschenke"
const contentGeschenke = `
  <h2 class="text-3xl mb-6 text-green-700 text-center" data-de="Geschenke" data-en="Gifts">Geschenke</h2>

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
                class="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-md shadow transition">
          📋
        </button>
      </div>
    </div>

    <div>
      <p class="text-gray-800 font-semibold mb-2" data-de="Adresse" data-en="Address">Adresse</p>
      <div class="flex justify-center items-center gap-2">
        <div id="addressText"
             class="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-800 select-all shadow-sm">
          Jonas Koch, Altweg 25, 8450 Andelfingen
        </div>
        <button onclick="copyText('addressText')"
                class="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-md shadow transition">
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
  "programm": contentProgramm,
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