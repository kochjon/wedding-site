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
			data-en="It quickly became official, with Joni having to introduce himself to Yeli's family first. In return, Yeli was allowed to join her new circle of friends with a “small” group of 30 people at the Oktoberfest in Stuttgart 🍺">
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


// kleines Mapping damit du per ID laden kannst
const TAB_CONTENT_MAP = {
  "geschichte": contentGeschichte,
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