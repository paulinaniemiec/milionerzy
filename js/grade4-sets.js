// Klasa 4: zegary, kalendarz, cyfry rzymskie (do XXXIX), jednostki długości — „wzdłuż i wszerz”.
// Podpunkty jednego zadania mają wspólną grupę: k4-1a i k4-1b to jedno zadanie.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
const UNITS = ['mm', 'cm', 'm', 'km'];
const unit = (id, text, correct, explain) => q(id, `Uzupełnij zdanie odpowiednią jednostką.<div class="task-statements">${text} ___.</div>`, UNITS, UNITS.indexOf(correct), explain);
const century = (id, year, answers, correct, explain) => q(id, `W którym wieku był rok <b>${year}</b>?`, answers, correct, explain);
const R = (s) => `<span class="roman">${s}</span>`;

// Tarcza zegara: wskazówki liczone z godziny i minut. data-time pozwala testom sprawdzić klucz.
const ROMAN12 = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
function clock(h, m, roman = false) {
 const end = (deg, len) => { const r = (deg - 90) * Math.PI / 180; return `${(100 + len * Math.cos(r)).toFixed(1)} ${(100 + len * Math.sin(r)).toFixed(1)}`; };
 let body = '<circle cx="100" cy="100" r="90" fill="#101b3b" stroke="#f3f5ff" stroke-width="3"/>';
 for (let i = 0; i < 60; i++) body += `<path d="M${end(i * 6, i % 5 ? 84 : 78)}L${end(i * 6, 88)}" stroke="#f3f5ff" stroke-width="${i % 5 ? 1 : 3}"/>`;
 body += `<path d="M100 100L${end((h % 12 + m / 60) * 30, 46)}" stroke="#f6c85c" stroke-width="7" stroke-linecap="round"/>`;
 body += `<path d="M100 100L${end(m * 6, 74)}" stroke="#63d6e8" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#f3f5ff"/>`;
 // Cyfry na wierzchu, z ciemnym obrysem — wskazówka ich nie zasłania.
 for (let i = 0; i < 12; i++) { const [x, y] = end(i * 30, 64).split(' '); body += `<text x="${x}" y="${+y + 6}" text-anchor="middle" fill="#f3f5ff" stroke="#101b3b" stroke-width="4" paint-order="stroke" font-family="Arial, sans-serif" font-size="${roman ? 15 : 18}" font-weight="700">${roman ? ROMAN12[i] : i || 12}</text>`; }
 return `<figure class="exam-chart clock-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Zegar ze wskazówkami: krótka (żółta) godzinowa i długa (niebieska) minutowa" data-time="${h}:${String(m).padStart(2, '0')}">${body}</svg></figure>`;
}
const HANDS = 'Długa wskazówka pokazuje minuty, a krótka — godziny.';

export const grade4Questions = [
 // Zegary i jednostki czasu
 q('k4-1a','Ile minut ma <b>pół godziny</b>?', ['15','30','50','60'],1,'Godzina ma 60 minut, a połowa z 60 to <b>30</b>.'),
 q('k4-1b','Ile minut to <b>3 kwadranse</b>?', ['30','35','45','75'],2,'Kwadrans to 15 minut, więc 3 kwadranse to 3 · 15 = <b>45 minut</b>.'),
 q('k4-1c','Ile sekund mają <b>2 minuty</b>?', ['60','100','120','200'],2,'Minuta ma 60 sekund, więc 2 minuty to 2 · 60 = <b>120 sekund</b>.'),
 q('k4-1d','Ile godzin mają <b>2 doby</b>?', ['24','36','48','50'],2,'Doba ma 24 godziny, więc 2 doby to 2 · 24 = <b>48 godzin</b>.'),
 q('k4-2','Ile kwadransów mają <b>2 godziny</b>?', ['4','6','8','30'],2,'Godzina to 4 kwadranse (4 · 15 min = 60 min), więc 2 godziny to <b>8 kwadransów</b>.'),
 q('k4-3a','Jest godzina <b>9:50</b>. Która godzina będzie za 25 minut?', ['9:75','10:15','10:25','9:25'],1,'Do 10:00 brakuje 10 minut. Zostaje 25 − 10 = 15 minut, więc będzie <b>10:15</b>. Nie ma godziny 9:75 — godzina ma tylko 60 minut.'),
 q('k4-3b','Jest godzina <b>14:10</b>. Która godzina była 35 minut wcześniej?', ['13:35','13:45','14:45','13:25'],0,'10 minut wcześniej była 14:00. Trzeba cofnąć się jeszcze o 25 minut: <b>13:35</b>.'),
 q('k4-4','Lekcja zaczyna się o <b>8:55</b> i trwa 45 minut. O której się kończy?', ['9:30','9:40','9:45','10:40'],1,'Od 8:55 do 9:00 mija 5 minut. Zostaje 40 minut, więc lekcja kończy się o <b>9:40</b>.'),
 q('k4-5','Film zaczął się o <b>17:40</b> i trwał 1 godzinę 35 minut. O której się skończył?', ['18:15','19:05','19:15','19:25'],2,'17:40 + 1 h = 18:40. Do 19:00 brakuje 20 minut, zostaje jeszcze 15 minut: <b>19:15</b>.'),
 q('k4-6','Autobus wyjechał o <b>7:45</b>, a dojechał na miejsce o <b>9:10</b>. Ile trwała podróż?', ['1 h 15 min','1 h 25 min','1 h 35 min','2 h 25 min'],1,'Od 7:45 do 8:45 mija 1 godzina, a od 8:45 do 9:10 — 25 minut. Razem <b>1 h 25 min</b>.'),
 q('k4-7','Wejście na szczyt zajęło Kubie 50 minut. Wyruszył ze schroniska o <b>10:25</b>. O której był na szczycie?', ['10:75','11:05','11:15','11:25'],2,'Od 10:25 do 11:00 mija 35 minut. Zostaje 50 − 35 = 15 minut: <b>11:15</b>.'),
 q('k4-8',`${clock(4,45)}Którą godzinę pokazuje zegar?`, ['3:45','4:45','5:45','9:20'],1,`${HANDS} Minutowa wskazuje 9, czyli 45 minut. Godzinowa jest między 4 a 5 — bliżej 5, ale jeszcze jej nie minęła. To <b>4:45</b> (za kwadrans piąta).`),
 q('k4-9',`${clock(10,15)}Którą godzinę pokazuje zegar?`, ['3:50','10:03','10:15','11:15'],2,`${HANDS} Minutowa wskazuje 3, czyli 15 minut. Godzinowa minęła właśnie 10. To <b>10:15</b> (kwadrans po dziesiątej).`),
 q('k4-10',`${clock(7,30,true)}Którą godzinę pokazuje zegar z cyframi rzymskimi?`, ['6:30','7:06','7:30','8:30'],2,`${HANDS} Minutowa wskazuje VI, czyli 30 minut. Godzinowa jest w połowie między VII a VIII. To <b>7:30</b> (wpół do ósmej).`),
 q('k4-11a','Jak zapisać godzinę <b>siódmą wieczorem</b>?', ['7:00','17:00','19:00','21:00'],2,'Po południu do godziny dodajemy 12: 7 + 12 = <b>19:00</b>.'),
 q('k4-11b','Godzina <b>22:30</b> to inaczej:', ['wpół do dziesiątej wieczorem','wpół do jedenastej wieczorem','dziesiąta trzydzieści rano','wpół do dwunastej w nocy'],1,'22:30 to 10:30 wieczorem. „Wpół do jedenastej” oznacza pół godziny przed jedenastą, czyli <b>wpół do jedenastej wieczorem</b>.'),
 // Kalendarz
 q('k4-12a','Ile dni ma <b>maj</b>?', ['28','29','30','31'],3,'Maj ma <b>31 dni</b>. Po 30 dni mają kwiecień, czerwiec, wrzesień i listopad.'),
 q('k4-12b','Ile dni ma <b>wrzesień</b>?', ['28','29','30','31'],2,'Wrzesień ma <b>30 dni</b> — tak jak kwiecień, czerwiec i listopad.'),
 q('k4-12c','Ile dni ma <b>luty 2026 roku</b>?', ['28','29','30','31'],0,'Rok 2026 nie jest przestępny, więc luty ma <b>28 dni</b>. 29 dni ma tylko w latach przestępnych (np. 2028).'),
 q('k4-13','Który miesiąc ma <b>30 dni</b>?', ['styczeń','czerwiec','sierpień','grudzień'],1,'30 dni mają kwiecień, czerwiec, wrzesień i listopad. Z podanych to <b>czerwiec</b>. Styczeń, sierpień i grudzień mają po 31 dni.'),
 q('k4-14a','Ile dni to <b>5 tygodni</b>?', ['25','30','35','50'],2,'Tydzień ma 7 dni, więc 5 tygodni to 5 · 7 = <b>35 dni</b>.'),
 q('k4-14b','Ile miesięcy to <b>2 lata</b>?', ['12','20','24','365'],2,'Rok ma 12 miesięcy, więc 2 lata to 2 · 12 = <b>24 miesiące</b>.'),
 q('k4-14c','Ile lat to <b>3 wieki</b>?', ['30','100','300','3000'],2,'Wiek to 100 lat, więc 3 wieki to <b>300 lat</b>.'),
 q('k4-15','Obóz harcerski trwał od <b>14 lipca</b> rano do <b>20 lipca</b> po południu. Ile dni trwał i ile było noclegów?', ['6 dni i 6 noclegów','7 dni i 6 noclegów','7 dni i 7 noclegów','6 dni i 7 noclegów'],1,'Dni: 14, 15, 16, 17, 18, 19, 20 — to <b>7 dni</b>. Noclegi są między kolejnymi dniami: o jeden mniej, czyli <b>6</b>.'),
 q('k4-16','Ile dni minie od <b>25 października</b> do <b>3 listopada</b>?', ['8','9','10','11'],1,'Październik ma 31 dni. Do 31 października minie 6 dni, a potem jeszcze 3 dni listopada: 6 + 3 = <b>9</b>.'),
 q('k4-17','Dziś jest <b>28 lutego 2026 r.</b> Jaka data będzie jutro?', ['29 lutego 2026 r.','30 lutego 2026 r.','1 marca 2026 r.','2 marca 2026 r.'],2,'W 2026 roku luty ma 28 dni, więc po 28 lutego jest od razu <b>1 marca</b>.'),
 q('k4-18','W 2026 roku 1 września wypada we <b>wtorek</b>. Jakim dniem tygodnia będzie 20 września?', ['wtorek','piątek','sobota','niedziela'],3,'Co 7 dni wraca wtorek: 8, 15 i 22 września też są wtorkami. 20 września jest 2 dni przed 22, czyli w <b>niedzielę</b>.'),
 q('k4-19','W 2026 roku wakacje zaczęły się w sobotę <b>27 czerwca</b>. Ola spędziła w domu 12 dni, a potem wyjechała w góry. Kiedy wyjechała?', ['8 lipca, środa','9 lipca, środa','9 lipca, czwartek','10 lipca, piątek'],2,'Ola była w domu od 27 czerwca do 8 lipca (czerwiec ma 30 dni: 4 dni w czerwcu + 8 w lipcu = 12). Wyjechała <b>9 lipca</b>. 27 czerwca to sobota, a 9 lipca jest 12 dni później: 7 dni to znów sobota, 5 dni dalej — <b>czwartek</b>.'),
 // Wieki
 century('k4-20a',48,Array.from(['I','II','IV','V'],R),0,`Lata od 1 do 100 to ${R('I')} wiek, więc rok 48 to <b>${R('I')} wiek</b>.`),
 century('k4-20b',815,Array.from(['VIII','IX','X','XV'],R),1,`Lata 801–900 to <b>${R('IX')} wiek</b>. Numer wieku jest o 1 większy niż liczba setek (8 setek → ${R('IX')}).`),
 century('k4-20c',1569,Array.from(['XIV','XV','XVI','XVII'],R),2,`Lata 1501–1600 to <b>${R('XVI')} wiek</b>: 15 pełnych setek, więc wiek o jeden dalej.`),
 century('k4-20d',1800,Array.from(['XVII','XVIII','XIX','XX'],R),1,`Rok 1800 to ostatni rok <b>${R('XVIII')} wieku</b> (lata 1701–1800). ${R('XIX')} wiek zaczął się w 1801 roku.`),
 century('k4-20e',2026,Array.from(['XX','XXI','XXII','XXVI'],R),1,`Lata 2001–2100 to <b>${R('XXI')} wiek</b> — w nim żyjemy.`),
 q('k4-21',`Który rok należy do ${R('XX')} wieku?`, ['1899','1900','2000','2001'],2,`${R('XX')} wiek to lata 1901–2000. Rok 1900 kończy ${R('XIX')} wiek, a 2001 zaczyna ${R('XXI')}. Odpowiedź: <b>2000</b>.`),
 // Cyfry rzymskie (I, V, X)
 q('k4-22a',`Jaką liczbę oznacza zapis ${R('<b>XXVI</b>')}?`, ['16','24','26','36'],2,'XX = 20, VI = 6, razem <b>26</b>.'),
 q('k4-22b',`Jaką liczbę oznacza zapis ${R('<b>XIV</b>')}?`, ['6','14','15','16'],1,'X = 10, IV = 4 (I przed V odejmujemy). Razem <b>14</b>.'),
 q('k4-22c',`Jaką liczbę oznacza zapis ${R('<b>XXXIX</b>')}?`, ['29','31','39','41'],2,'XXX = 30, IX = 9 (I przed X odejmujemy). Razem <b>39</b>.'),
 q('k4-22d',`Jaką liczbę oznacza zapis ${R('<b>IX</b>')}?`, ['4','6','9','11'],2,'I stoi przed X, więc odejmujemy: 10 − 1 = <b>9</b>. Zapis XI to 11.'),
 q('k4-23a','Jak zapisać liczbę <b>18</b> cyframi rzymskimi?', Array.from(['XIIX','XVII','XVIII','VIIIX'],R),2,`18 = 10 + 5 + 3: <b>${R('XVIII')}</b>.`),
 q('k4-23b','Jak zapisać liczbę <b>29</b> cyframi rzymskimi?', Array.from(['XXVIIII','XXIX','IXXX','XXXI'],R),1,`29 = 20 + 9: XX i IX, czyli <b>${R('XXIX')}</b>. Ten sam znak można postawić obok siebie najwyżej 3 razy, dlatego XXVIIII jest błędne.`),
 q('k4-23c','Jak zapisać liczbę <b>34</b> cyframi rzymskimi?', Array.from(['XXXIIII','XXXIV','XXXVI','XXIVX'],R),1,`34 = 30 + 4: XXX i IV, czyli <b>${R('XXXIV')}</b>.`),
 q('k4-24','Która liczba jest <b>największa</b>?', Array.from(['XXIV','XIX','XXVI','XXI'],R),2,`XXIV = 24, XIX = 19, XXVI = 26, XXI = 21. Największa jest <b>${R('XXVI')}</b>.`),
 // Jednostki długości
 q('k4-25','Zuzia zapisała, że jej łóżko ma długość 200, ale zapomniała o jednostce. Jaka to jednostka?', ['milimetry','centymetry','metry','kilometry'],1,'Łóżko musi pomieścić dorosłego — ma 2 metry długości, czyli <b>200 centymetrów</b>. 200 m to długość dwóch boisk, a 200 mm to długość ołówka.'),
 unit('k4-26a','Długość mrówki wynosi około 5','mm','Mrówka jest bardzo mała — ma około <b>5 mm</b>, czyli pół centymetra.'),
 unit('k4-26b','Wysokość pokoju wynosi około 3','m','Pokój jest wyższy od dorosłego człowieka: około <b>3 m</b>.'),
 unit('k4-26c','Długość trasy pociągu z Krakowa do Gdańska wynosi około 600','km','Duże odległości między miastami mierzymy w kilometrach: około <b>600 km</b>.'),
 unit('k4-26d','Długość łyżeczki do herbaty wynosi około 12','cm','Łyżeczka mieści się w dłoni — ma około <b>12 cm</b>.'),
 unit('k4-26e','Grubość książki wynosi około 25','mm','25 mm to 2 cm 5 mm — tyle mniej więcej ma gruba książka. 25 cm byłoby grubością wysokiego stosu książek.'),
 q('k4-27a','<b>1 m</b> to ile centymetrów?', ['10 cm','60 cm','100 cm','1000 cm'],2,'1 m = <b>100 cm</b>. 1000 to liczba metrów w kilometrze.'),
 q('k4-27b','<b>3 cm</b> to ile milimetrów?', ['3 mm','13 mm','30 mm','300 mm'],2,'1 cm = 10 mm, więc 3 cm = <b>30 mm</b>.'),
 q('k4-27c','<b>2 km</b> to ile metrów?', ['20 m','200 m','2000 m','20 000 m'],2,'1 km = 1000 m, więc 2 km = <b>2000 m</b>.'),
 q('k4-27d','<b>Pół kilometra</b> to ile metrów?', ['50 m','100 m','500 m','5000 m'],2,'1 km = 1000 m, a połowa z 1000 to <b>500 m</b>.'),
 q('k4-28a','<b>4 m 5 cm</b> to ile centymetrów?', ['45 cm','405 cm','450 cm','4005 cm'],1,'4 m = 400 cm, a 400 + 5 = <b>405 cm</b>. 450 cm to 4 m 50 cm.'),
 q('k4-28b','<b>250 cm</b> to:', ['2 m 5 cm','2 m 50 cm','25 m','25 m 0 cm'],1,'250 cm = 200 cm + 50 cm = <b>2 m 50 cm</b>.'),
 q('k4-29','Ola ma <b>1 m 32 cm</b> wzrostu, a jej brat <b>1 m 47 cm</b>. O ile brat jest wyższy?', ['15 cm','25 cm','115 cm','1 m 15 cm'],0,'Metry są takie same, porównujemy centymetry: 47 − 32 = <b>15 cm</b>.'),
 q('k4-30','Który pasek jest <b>najdłuższy</b>?', ['1 m','95 cm','1200 mm','1 m 15 cm'],2,'Zamieniamy na centymetry: 100 cm, 95 cm, 1200 mm = 120 cm, 115 cm. Najdłuższy jest pasek <b>1200 mm</b>.'),
];
