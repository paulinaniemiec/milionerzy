// Klasa 4: zegary, kalendarz, cyfry rzymskie (do XXXIX), jednostki długości — „wzdłuż i wszerz”.
import { line } from './axis-sets.js';
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

// Klasa 4: oś liczbowa — tylko liczby naturalne. Oś rysuje ta sama funkcja co w klasie 8 (kreski 0 … seg).
// Część osi ma podpisy w środku albo nie przy zerze: trzeba ustalić, o ile rosną liczby z kreski na kreskę.
const ax = (svg, caption = '') => `<figure class="exam-chart axis-chart">${caption ? `<figcaption>${caption}</figcaption>` : ''}${svg}</figure>`;
const which = (L) => `Jaką liczbę oznaczono na osi literą <i>${L}</i>?`;
const STEP = 'Najpierw ustal, o ile rosną liczby z kreski na kreskę.';
const n1 = ax(line(0, 10, 10, {labels: [0, 1], points: {A: 3, B: 6, C: 8}}));
const n2 = ax(line(0, 50, 10, {labels: [0, 1], points: {A: 2, B: 5, C: 9}}));
const n3 = ax(line(30, 60, 10, {labels: [0, 1], points: {A: 4, B: 7, C: 9}}));
const n4 = ax(line(100, 300, 10, {labels: [0, 1, 5], points: {A: 3, B: 8, C: 9}}));
const n5 = ax(line(50, 72, 11, {labels: [7, 8], points: {A: 2, B: 5, C: 10}}));
const n6 = ax(line(0, 500, 10, {labels: [6, 7], points: {A: 1, B: 4, C: 9}}));
const n7 = ax(line(0, 50, 10, {labels: [0, 3], points: {A: 2, B: 7, C: 10}}));
const n8 = ax(line(0, 2000, 10, {labels: [0, 2], points: {A: 1, B: 5, C: 8}}));
const n9 = ax(line(0, 2500, 10, {labels: [0, 4], points: {A: 2, B: 6, C: 9}}));
const n10 = ax(line(0, 20, 10, {labels: [0, 3], points: {A: 4, B: 5, C: 7}}));
const kg = ax(line(0, 40, 8, {labels: [0, 2, 4, 6, 8], points: {K: 1, P: 5, O: 8}}), 'Masy zwierząt w kilogramach: <i>K</i> — kot, <i>P</i> — pies, <i>O</i> — owca');

export const axisQuestions4 = [
 q('o4-1a',`${n1}${which('A')}`, ['3','4','6','30'],0,'Z kreski na kreskę liczby rosną o 1 (0, 1, 2, …). Punkt <i>A</i> leży 3 kreski za zerem: <b>3</b>.'),
 q('o4-1b',`${n1}${which('C')}`, ['7','8','9','10'],1,'Liczby rosną o 1. Odliczamy od zera 8 kresek: <b>8</b>.'),
 q('o4-2a',`${n2}${which('A')}`, ['2','10','15','20'],1,`${STEP} Od 0 do 5 jest jeden odcinek, więc liczby rosną o 5: 0, 5, <b>10</b>.`),
 q('o4-2b',`${n2}${which('B')}`, ['5','20','25','30'],2,'Liczby rosną o 5: 0, 5, 10, 15, 20, <b>25</b>.'),
 q('o4-2c',`${n2}${which('C')}`, ['9','40','45','50'],2,'Punkt <i>C</i> leży 9 kresek za zerem, a każda kreska to 5: 9 · 5 = <b>45</b>. Wynik 9 to sama liczba kresek.'),
 q('o4-3a',`${n3}${which('A')}`, ['34','40','42','43'],2,`${STEP} Od 30 do 33 liczby rosną o 3. Punkt <i>A</i> leży 4 kreski za 30: 30 + 4 · 3 = <b>42</b>.`),
 q('o4-3b',`${n3}${which('C')}`, ['39','54','57','60'],2,'Liczby rosną o 3: 30, 33, 36, 39, 42, 45, 48, 51, 54, <b>57</b>.'),
 q('o4-4a',`${n4}${which('A')}`, ['130','150','160','180'],2,`${STEP} Od 100 do 120 liczby rosną o 20. Punkt <i>A</i>: 100, 120, 140, <b>160</b>.`),
 q('o4-4b',`${n4}${which('B')}`, ['180','240','260','280'],2,'Od 200 liczymy dalej co 20: 220, 240, <b>260</b>.'),
 q('o4-5a',`${n5}${which('A')}`, ['54','56','59','62'],0,`${STEP} Od 64 do 66 liczby rosną o 2. Cofamy się od 64 co 2: 62, 60, 58, 56, <b>54</b>. Wynik 59 to cofanie się co 1.`),
 q('o4-5b',`${n5}${which('C')}`, ['67','68','70','72'],2,'Od 66 liczymy dalej co 2: 68, <b>70</b>.'),
 q('o4-6a',`${n6}${which('A')}`, ['5','50','100','250'],1,`${STEP} Od 300 do 350 liczby rosną o 50. Cofamy się od 300: 250, 200, 150, 100, <b>50</b>.`),
 q('o4-6b',`${n6}${which('C')}`, ['353','400','450','500'],2,'Od 350 liczymy dalej co 50: 400, <b>450</b>.'),
 q('o4-7a',`${n7}${which('A')}`, ['2','8','10','12'],2,`${STEP} Od 0 do 15 są 3 odcinki, więc każdy to 15 : 3 = 5. Punkt <i>A</i>: 0, 5, <b>10</b>.`),
 q('o4-7b',`${n7}${which('B')}`, ['21','30','35','45'],2,'Każdy odcinek to 5. Punkt <i>B</i> leży 7 kresek za zerem: 7 · 5 = <b>35</b>.'),
 q('o4-7c',`${n7}${which('C')}`, ['30','45','50','60'],2,'Każdy odcinek to 5, a punkt <i>C</i> leży 10 kresek za zerem: <b>50</b>.'),
 q('o4-8a',`${n8}${which('A')}`, ['100','200','300','400'],1,`${STEP} Od 0 do 400 są 2 odcinki, więc każdy to 200. Punkt <i>A</i> leży na pierwszej kresce: <b>200</b>.`),
 q('o4-8b',`${n8}${which('B')}`, ['500','800','1000','1200'],2,'Każdy odcinek to 200: 200, 400, 600, 800, <b>1000</b>.'),
 q('o4-8c',`${n8}${which('C')}`, ['800','1200','1600','2000'],2,'Punkt <i>C</i> leży 8 kresek za zerem: 8 · 200 = <b>1600</b>.'),
 q('o4-9a',`${n9}${which('A')}`, ['200','250','500','2000'],2,`${STEP} Od 0 do 1000 są 4 odcinki, więc każdy to 1000 : 4 = 250. Punkt <i>A</i>: 250, <b>500</b>.`),
 q('o4-9b',`${n9}${which('C')}`, ['900','2000','2250','2500'],2,'Każdy odcinek to 250. Od 1000 liczymy dalej: 1250, 1500, 1750, 2000, <b>2250</b>.'),
 q('o4-10a',`${n10}Który punkt oznacza liczbę <b>10</b>?`, ['A','B','C','Żaden z nich'],1,'Od 0 do 6 są 3 odcinki, więc liczby rosną o 2: A = 8, B = 10, C = 14. Liczbę 10 oznacza punkt <b><i>B</i></b>.'),
 q('o4-10b',`${n10}Który punkt oznacza liczbę <b>12</b>?`, ['A','B','C','Żaden z nich'],3,'Liczby rosną o 2: A = 8, B = 10, C = 14. Liczba 12 leży na kresce między <i>B</i> i <i>C</i>, ale tam nie ma punktu — <b>żaden z nich</b>.'),
 q('o4-11',`${ax(line(0, 6, 3, {labels: [0, 1, 2, 3]}))}Kacper mówi: „Na tej osi nie da się zaznaczyć liczby 3, bo są na niej tylko liczby parzyste”. Czy ma rację?`, ['Tak, bo 3 jest liczbą nieparzystą','Nie, 3 leży w połowie między 2 i 4','Nie, 3 leży na kresce z liczbą 4','Tak, bo przy 3 nie ma kreski'],1,'Na osi leżą wszystkie liczby, a nie tylko te podpisane. Liczba 3 jest dokładnie <b>w połowie między 2 i 4</b> — wystarczy postawić tam kropkę.'),
 q('o4-12',`${ax(line(0, 30, 10, {labels: [0, 1, 4]}))}Ile odcinków od zera leży na tej osi liczba <b>21</b>?`, ['3','7','18','21'],1,'Od 0 do 3 jest jeden odcinek, więc każdy to 3. 21 : 3 = <b>7 odcinków</b>.'),
 q('o4-13',`${ax(line(0, 16, 8, {labels: [0, 4]}))}O ile rosną liczby z kreski na kreskę na tej osi?`, ['o 1','o 2','o 4','o 8'],1,'Od 0 do 8 są 4 odcinki, więc każdy to 8 : 4 = <b>2</b>.'),
 q('o4-14a',`${kg}Ile waży pies?`, ['5 kg','20 kg','25 kg','30 kg'],2,'Podpisy rosną o 10 co dwie kreski, więc jedna kreska to 5 kg. Pies leży na kresce za 20: <b>25 kg</b>.'),
 q('o4-14b',`${kg}O ile kilogramów owca jest cięższa od kota?`, ['3 kg','30 kg','35 kg','45 kg'],2,'Kot waży 5 kg, owca 40 kg. 40 − 5 = <b>35 kg</b>.'),
 q('o4-15','Na osi liczbowej liczby rosną o 25 z kreski na kreskę. Przy pierwszej kresce jest 0. Jaka liczba leży 4 kreski na prawo od zera?', ['4','29','75','100'],3,'Liczymy co 25: 25, 50, 75, <b>100</b> (4 · 25).'),
 q('o4-16','Na osi liczbowej liczby rosną o 10 z kreski na kreskę. Ile odcinków dzieli liczby 30 i 90?', ['3','6','9','60'],1,'Od 30 do 90 jest 60, a każdy odcinek to 10: 60 : 10 = <b>6</b>.'),
 q('o4-17','Która z liczb leży na osi liczbowej <b>najbliżej</b> liczby 50?', ['44','46','53','57'],2,'Odległości od 50: 44 → 6, 46 → 4, 53 → 3, 57 → 7. Najbliżej jest <b>53</b>.'),
 q('o4-18','Która liczba leży na osi liczbowej dokładnie <b>w połowie</b> między 20 i 30?', ['22','25','26','50'],1,'Od 20 do 30 jest 10, połowa to 5. 20 + 5 = <b>25</b>.'),
 q('o4-19','Punkt <i>A</i> oznacza na osi liczbę 40. Punkt <i>B</i> leży 3 odcinki na prawo od <i>A</i>, a każdy odcinek to 5. Jaką liczbę oznacza <i>B</i>?', ['43','45','55','70'],2,'3 odcinki po 5 to 15. 40 + 15 = <b>55</b>. Wynik 43 to dodanie samej liczby odcinków.'),
];

// Klasa 4: dodawanie i odejmowanie w pamięci — przez próg dziesiątkowy, pełne setki i tysiące, okienka,
// nazwy liczb w działaniach i zadania tekstowe. Błędne odpowiedzi to typowe pomyłki (zgubione przeniesienie,
// odejmowanie mniejszej cyfry od większej, suma zamiast różnicy).
const calc = (id, expr, answers, correct, explain) => q(id, `Ile to <b>${expr}</b>?`, answers, correct, explain);
const BOX = '<span class="answer-box" role="img" aria-label="okienko"></span>';
// Kwadrat magiczny: puste pola i znak zapytania; data-cells pozwala testom sprawdzić klucz.
const MAGIC = [[5, '?', 9], ['', 8, ''], ['', '', 11]];
const magic = `<div class="task-table-wrap"><table class="task-table magic-square" data-cells="${MAGIC.flat().join(',')}"><caption>Kwadrat magiczny</caption><tbody>${MAGIC.map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const MAGIC_RULE = 'W tym kwadracie suma liczb w każdym wierszu, w każdej kolumnie i na każdej przekątnej jest taka sama.';

export const additionQuestions4 = [
 // Dwucyfrowe przez próg dziesiątkowy
 calc('d4-1a','47 + 8',['45','54','55','65'],2,'47 + 3 = 50, zostaje jeszcze 5: 50 + 5 = <b>55</b>.'),
 calc('d4-1b','9 + 66',['65','74','75','85'],2,'66 + 4 = 70, zostaje jeszcze 5: 70 + 5 = <b>75</b>. Kolejność składników nie zmienia sumy.'),
 calc('d4-1c','58 + 27',['75','81','85','95'],2,'58 + 20 = 78, a 78 + 7 = 85. Wynik <b>85</b>. Odpowiedź 75 to zgubiona dziesiątka z 8 + 7 = 15.'),
 calc('d4-2a','63 − 7',['54','56','64','66'],1,'63 − 3 = 60, trzeba odjąć jeszcze 4: 60 − 4 = <b>56</b>. Wynik 64 wychodzi, gdy od 7 odejmiemy 3 zamiast od 3 odjąć 7.'),
 calc('d4-2b','92 − 36',['46','56','64','66'],1,'92 − 30 = 62, a 62 − 6 = <b>56</b>. Sprawdzenie: 56 + 36 = 92.'),
 calc('d4-2c','81 − 45',['34','36','44','46'],1,'81 − 40 = 41, a 41 − 5 = <b>36</b>. Sprawdzenie: 36 + 45 = 81.'),
 // Pełne setki i tysiące
 calc('d4-3a','700 + 600',['130','1200','1300','13 000'],2,'7 setek + 6 setek = 13 setek, czyli <b>1300</b>.'),
 calc('d4-3b','2800 + 400',['2840','3100','3200','6800'],2,'2800 + 200 = 3000, zostaje jeszcze 200: <b>3200</b>.'),
 calc('d4-3c','4600 + 70',['4607','4670','4760','5300'],1,'Do 4600 dodajemy 7 dziesiątek: <b>4670</b>. Setki się nie zmieniają.'),
 calc('d4-3d','400 + 3800',['3840','4100','4200','7800'],2,'3800 + 200 = 4000, zostaje jeszcze 200: <b>4200</b>.'),
 calc('d4-4a','1200 − 500',['600','700','800','1700'],1,'12 setek − 5 setek = 7 setek, czyli <b>700</b>.'),
 calc('d4-4b','6000 − 400',['2000','5400','5600','6400'],2,'6000 − 1000 = 5000, a 1000 − 400 = 600. Razem <b>5600</b>. Wynik 2000 to odjęcie 4000 zamiast 400.'),
 calc('d4-4c','910 − 50',['410','860','870','960'],1,'910 − 10 = 900, trzeba odjąć jeszcze 40: 900 − 40 = <b>860</b>.'),
 // Okienka i liczby szukane
 q('d4-5a',`Jaką liczbę trzeba wpisać w okienko?<div class="task-statements">${BOX} − 15 = 28</div>`,['13','33','42','43'],3,'Szukamy odjemnej: dodajemy różnicę i odjemnik. 28 + 15 = <b>43</b>. Sprawdzenie: 43 − 15 = 28.'),
 q('d4-5b',`Jaką liczbę trzeba wpisać w okienko?<div class="task-statements">34 + ${BOX} = 61</div>`,['27','33','37','95'],0,'Szukamy składnika: od sumy odejmujemy drugi składnik. 61 − 34 = <b>27</b>. Sprawdzenie: 34 + 27 = 61.'),
 q('d4-5c',`Jaką liczbę trzeba wpisać w okienko?<div class="task-statements">72 − ${BOX} = 38</div>`,['34','44','46','110'],0,'Szukamy odjemnika: od odjemnej odejmujemy różnicę. 72 − 38 = <b>34</b>. Sprawdzenie: 72 − 34 = 38.'),
 q('d4-6','Od jakiej liczby trzeba odjąć 9, aby otrzymać 26?',['17','27','35','37'],2,'Dodajemy: 26 + 9 = <b>35</b>. Sprawdzenie: 35 − 9 = 26. Wynik 17 to odjęcie 9 od 26.'),
 q('d4-7','Jaką liczbę trzeba dodać do 48, aby otrzymać 75?',['23','27','33','123'],1,'Odejmujemy: 75 − 48 = <b>27</b>. Sprawdzenie: 48 + 27 = 75.'),
 // Sprawdzanie i nazwy
 q('d4-8','Którym działaniem sprawdzisz, czy odejmowanie <b>83 − 46 = 37</b> jest wykonane poprawnie?',['37 + 46','83 + 46','83 + 37','46 − 37'],0,'Różnica + odjemnik = odjemna. 37 + 46 = 83 — zgadza się, więc odejmowanie jest dobre. Odpowiedź: <b>37 + 46</b>.'),
 q('d4-9','Jarek obliczył cztery odejmowania. Które z nich jest <b>błędne</b>?',['74 − 28 = 46','91 − 57 = 34','65 − 39 = 34','80 − 43 = 37'],2,'Sprawdzamy dodawaniem: 46 + 28 = 74, 34 + 57 = 91, 37 + 43 = 80. Ale 34 + 39 = 73, a nie 65. Błędne jest <b>65 − 39 = 34</b> — poprawny wynik to 26.'),
 q('d4-10a','W działaniu <b>52 − 17 = 35</b> liczba 52 to:',['składnik','odjemna','odjemnik','różnica'],1,'Liczba, od której odejmujemy, to <b>odjemna</b>. 17 to odjemnik, a 35 — różnica.'),
 q('d4-10b','W działaniu <b>52 − 17 = 35</b> liczba 17 to:',['suma','odjemna','odjemnik','różnica'],2,'Liczba, którą odejmujemy, to <b>odjemnik</b>. 52 to odjemna, a 35 — różnica.'),
 q('d4-10c','Jak nazywają się liczby, które do siebie dodajemy?',['składniki','czynniki','odjemniki','różnice'],0,'Dodawane liczby to <b>składniki</b>, a wynik dodawania to suma. Czynniki występują w mnożeniu.'),
 q('d4-11a','Suma liczb 38 i 45 wynosi:',['7','73','83','93'],2,'Suma to wynik dodawania: 38 + 45 = <b>83</b>. Liczba 7 to ich różnica.'),
 q('d4-11b','Różnica liczb 90 i 34 wynosi:',['56','64','66','124'],0,'Różnica to wynik odejmowania: 90 − 34 = <b>56</b>. Liczba 124 to ich suma.'),
 q('d4-12','O ile liczba 85 jest większa od 49?',['36','44','46','134'],0,'„O ile większa” — odejmujemy: 85 − 49 = <b>36</b>. Sprawdzenie: 49 + 36 = 85.'),
 // Porównywanie wyników
 q('d4-13','Która suma jest <b>największa</b>?',['39 + 48','56 + 29','17 + 66','44 + 37'],0,'39 + 48 = 87, 56 + 29 = 85, 17 + 66 = 83, 44 + 37 = 81. Największa jest <b>39 + 48</b>.'),
 q('d4-14','Która różnica jest <b>najmniejsza</b>?',['70 − 46','83 − 57','61 − 39','95 − 68'],2,'70 − 46 = 24, 83 − 57 = 26, 61 − 39 = 22, 95 − 68 = 27. Najmniejsza jest <b>61 − 39</b>.'),
 // Zadania tekstowe
 q('d4-15a','Tomek ma 46 naklejek, a Zosia 19. Ile naklejek mają razem?',['27','55','65','75'],2,'Razem — dodajemy: 46 + 19 = <b>65</b>.'),
 q('d4-15b','Tomek ma 46 naklejek, a Zosia 19. O ile więcej naklejek ma Tomek niż Zosia?',['27','33','37','65'],0,'„O ile więcej” — odejmujemy: 46 − 19 = <b>27</b>. 65 to liczba naklejek razem.'),
 q('d4-16','Antek przebiegł 38 okrążeń, a Wojtek o 14 okrążeń więcej. Ile okrążeń przebiegli razem?',['52','66','90','100'],2,'Wojtek: 38 + 14 = 52. Razem: 38 + 52 = <b>90</b>. 52 to tylko okrążenia Wojtka.'),
 q('d4-17','Klasa 4a zebrała 54 kg kasztanów, a klasa 4b o 18 kg mniej. Ile kilogramów kasztanów zebrały obie klasy?',['36','72','90','126'],2,'Klasa 4b: 54 − 18 = 36 kg. Obie klasy: 54 + 36 = <b>90 kg</b>. 72 to dodanie 54 i 18.'),
 q('d4-18','W bibliotece jest 90 książek przygodowych: 37 o piratach, a reszta o kosmosie. O ile więcej jest książek o kosmosie niż o piratach?',['16','24','53','127'],0,'O kosmosie: 90 − 37 = 53. Różnica: 53 − 37 = <b>16</b>. 53 to liczba książek o kosmosie.'),
 q('d4-19','Ola miała 100 zł. Kupiła grę za 58 zł i kubek za 27 zł. Ile pieniędzy jej zostało?',['15','25','42','85'],0,'Wydała 58 + 27 = 85 zł. Zostało jej 100 − 85 = <b>15 zł</b>. 42 zł zostałoby po kupieniu samej gry.'),
 q('d4-20','Kasia miała 80 zł. Za książkę zapłaciła 36 zł, a za puzzle 29 zł. O ile więcej zapłaciła za książkę niż za puzzle?',['7','13','15','65'],0,'Porównujemy ceny: 36 − 29 = <b>7 zł</b>. Kwota 80 zł nie jest tu potrzebna — 15 zł to reszta, która jej została.'),
 q('d4-21','Sójka ukryła pod dębem 45 żołędzi i 16 orzechów laskowych, a pod bukiem 27 żołędzi i 8 orzechów laskowych. Ile wszystkich żołędzi i orzechów ukryła sójka?',['24','72','96','106'],2,'Żołędzie: 45 + 27 = 72. Orzechy: 16 + 8 = 24. Razem 72 + 24 = <b>96</b>.'),
 q('d4-22','Różnica dwóch liczb wynosi 11 i jest o 14 mniejsza od ich sumy. Jakie to liczby?',['18 i 7','15 i 4','20 i 9','25 i 14'],0,'Suma jest o 14 większa od różnicy: 11 + 14 = 25. Wszystkie pary mają różnicę 11, ale sumę 25 ma tylko <b>18 i 7</b> (18 + 7 = 25).'),
 // Kartoniki z cyframi od 1 do 9 (każda cyfra raz)
 q('d4-23a',`Ala ma kartoniki z cyframi od 1 do 9 — każdą cyfrę raz. Układa je w okienkach działania <b>1${BOX} − ${BOX}</b>. Jaki <b>największy</b> wynik może otrzymać?`,['8','17','18','19'],2,'Pierwsza liczba ma być jak największa: 19. Odejmujemy jak najmniej — zostaje kartonik 1: 19 − 1 = <b>18</b>.'),
 q('d4-23b',`Ala ma kartoniki z cyframi od 1 do 9 — każdą cyfrę raz. Układa je w okienkach działania <b>${BOX}00 − ${BOX}0</b>. Jaki <b>najmniejszy</b> wynik może otrzymać?`,['10','20','90','100'],0,'Pierwsza liczba ma być jak najmniejsza (100), a odejmujemy jak najwięcej (90): 100 − 90 = <b>10</b>.'),
 // Kwadrat magiczny
 q('d4-24a',`${magic}${MAGIC_RULE} Ile wynosi ta suma?`,['14','22','24','33'],2,'Na przekątnej znamy wszystkie liczby: 5 + 8 + 11 = <b>24</b>.'),
 q('d4-24b',`${magic}${MAGIC_RULE} Jaką liczbę trzeba wpisać w miejsce znaku zapytania?`,['4','10','12','14'],1,'Suma na przekątnej: 5 + 8 + 11 = 24. W górnym wierszu: 24 − 5 − 9 = <b>10</b>.'),
];

// Klasa 4: szacowanie — określenia „około”, „prawie”, „trochę ponad”, „niecałe”, wybór wyniku bez liczenia
// dokładnie, szacunki z ramki i zakupy (także z groszami). Bez formalnych reguł zaokrąglania.
const fits = (id, n, answers, correct, explain) => q(id, `Które określenie pasuje do liczby <b>${n}</b>?`, answers, correct, explain);
const phrase = (id, text, answers, correct, explain) => q(id, `Która liczba pasuje do określenia <b>${text}</b>?`, answers, correct, explain);
const fill = (id, text, answers, correct, explain) => q(id, `Uzupełnij zdanie.<div class="task-statements">${text} ___.</div>`, answers, correct, explain);
const result = (id, expr, answers, correct, explain) => q(id, `Jedna z liczb jest wynikiem działania <b>${expr}</b>. Oszacuj, która.`, answers, correct, explain);
const frame = (id, expr, answers, correct, explain) => q(id, `Które szacowanie pasuje do działania <b>${expr}</b>?`, answers, correct, explain);
const about = (id, expr, answers, correct, explain) => q(id, `Wynik działania <b>${expr}</b> to około:`, answers, correct, explain);
const enough = (id, text, who, correct, explain) => q(id, `${text} Czy wystarczy ${who} pieniędzy?`,
 [`Tak, i zostanie ${who} trochę pieniędzy`, 'Tak, ale wyda wszystko co do złotówki', `Nie, zabraknie ${who} kilku złotych`, `Nie, zabraknie ${who} ponad 10 zł`], correct, explain);
const pricesTable = (caption, items) => `<div class="task-table-wrap"><table class="task-table receipt"><caption>${caption}</caption><tbody>${items.map(([name, price]) => `<tr><th scope="row">${name}</th><td>${price} zł</td></tr>`).join('')}</tbody></table></div>`;
// Hasło z liter: działania w tabeli, litery pod spodem.
const SKLEP = [['E', '5012 − 2087'], ['S', '412 + 189'], ['P', '3870 + 4095'], ['K', '2103 − 1198'], ['L', '896 + 1004']];
const lettersTable = `<div class="task-table-wrap"><table class="task-table letters"><tbody><tr>${SKLEP.map(([, expr]) => `<td>${expr}</td>`).join('')}</tr><tr>${SKLEP.map(([letter]) => `<td><b>${letter}</b></td>`).join('')}</tr></tbody></table></div>`;
const POLA = [['sok', 11], ['ser', 19], ['chleb', 9], ['owoce', 22]];
const KASIA = [['piórnik', 28], ['książka', 26], ['farby', 19], ['gra', 34]];

export const estimationQuestions4 = [
 // Określenia przy liczbach
 fits('s4-1a',697,['ponad 700','około 600','prawie 700','trochę mniej niż 600'],2,'Do 700 brakuje tylko 3, więc 697 to <b>prawie 700</b>. Nie jest to „ponad 700”, bo 697 jest mniejsze od 700.'),
 fits('s4-1b',412,['prawie 400','trochę więcej niż 400','trochę mniej niż 400','około 500'],1,'412 to o 12 więcej niż 400 — <b>trochę więcej niż 400</b>. „Prawie 400” oznaczałoby liczbę trochę mniejszą od 400.'),
 fits('s4-1c',589,['trochę mniej niż 600','ponad 600','około 500','trochę więcej niż 600'],0,'Do 600 brakuje 11, więc 589 to <b>trochę mniej niż 600</b>.'),
 fits('s4-1d',1004,['trochę mniej niż 1000','około 1400','ponad 1100','około 1000'],3,'1004 to tylko o 4 więcej niż 1000 — <b>około 1000</b>. Nie jest to „trochę mniej niż 1000”, bo 1004 jest większe od 1000.'),
 phrase('s4-2a','trochę mniej niż 500',['487','512','389','550'],0,'Do 500 brakuje 13, więc <b>487</b> to trochę mniej niż 500. 512 i 550 są większe od 500, a 389 jest dużo mniejsze.'),
 phrase('s4-2b','około 300',['352','248','296','402'],2,'<b>296</b> różni się od 300 tylko o 4. Pozostałe liczby są dalej: 352 i 248 o ponad 50, a 402 aż o ponad 100.'),
 phrase('s4-2c','trochę ponad 800',['793','718','907','812'],3,'<b>812</b> to o 12 więcej niż 800. 793 i 718 są mniejsze od 800, a 907 to już ponad 900.'),
 fill('s4-3a','2893 to prawie',['2800','2880','2900','3900'],2,'Do 2900 brakuje tylko 7, więc 2893 to prawie <b>2900</b>. 2800 i 2880 są mniejsze od 2893, a „prawie” oznacza, że trochę brakuje.'),
 fill('s4-3b','678 to niecałe',['600','650','670','700'],3,'„Niecałe” oznacza, że trochę brakuje. Do 700 brakuje 22, więc 678 to niecałe <b>700</b>. Pozostałe liczby są mniejsze od 678.'),
 fill('s4-3c','4206 to trochę ponad',['4250','4200','4300','5000'],1,'4206 to o 6 więcej niż 4200 — trochę ponad <b>4200</b>. Pozostałe liczby są większe od 4206.'),
 fill('s4-3d','1030 to około',['1000','1100','1200','1300'],0,'1030 różni się od 1000 tylko o 30, a od 1100 aż o 70. 1030 to około <b>1000</b>.'),
 // Który wynik jest prawdziwy
 result('s4-4a','2214 + 3561',['577','5775','57 775','9775'],1,'2214 to około 2200, a 3561 to około 3600. 2200 + 3600 = 5800, więc wynik to <b>5775</b>. Pozostałe liczby są dużo mniejsze albo dużo większe.'),
 result('s4-4b','845 − 72',['73','917','773','7773'],2,'845 to około 850, a 72 to około 70. 850 − 70 = 780, więc wynik to <b>773</b>. 917 wychodzi, gdy dodamy zamiast odjąć.'),
 result('s4-4c','4127 + 693',['482','3434','48 200','4820'],3,'4127 to około 4100, a 693 to około 700. 4100 + 700 = 4800, więc wynik to <b>4820</b>. 3434 wychodzi przy odejmowaniu.'),
 q('s4-5',`Oszacuj wyniki działań i ułóż litery od najmniejszego wyniku do największego. Jakie słowo powstanie?${lettersTable}`,['PELKS','SKLEP','KSLEP','SKELP'],1,'S: około 400 + 200 = 600. K: około 2100 − 1200 = 900. L: około 900 + 1000 = 1900. E: około 5000 − 2100 = 2900. P: około 3900 + 4100 = 8000. Słowo: <b>SKLEP</b>. PELKS to kolejność od największego.'),
 // Szacunki z ramki i „około”
 frame('s4-6a','718 + 196',['800 + 100','700 + 200','700 + 100','800 + 200'],1,'718 to około 700, a 196 to prawie 200: <b>700 + 200</b>, czyli około 900. Szacunek 800 + 100 daje 900, ale 718 nie jest bliskie 800, a 196 — 100.'),
 frame('s4-6b','395 + 508',['300 + 500','400 + 600','300 + 600','400 + 500'],3,'395 to prawie 400, a 508 to trochę ponad 500: <b>400 + 500</b>, czyli około 900.'),
 frame('s4-6c','152 + 997',['150 + 1000','100 + 900','200 + 900','150 + 900'],0,'152 to około 150, a 997 to prawie 1000: <b>150 + 1000</b>, czyli około 1150.'),
 about('s4-7a','612 + 289',['800','900','1000','1100'],1,'612 to około 600, a 289 to około 300: 600 + 300 = <b>900</b>. Dokładnie: 901.'),
 about('s4-7b','2980 + 1030',['3000','40 000','5000','4000'],3,'2980 to prawie 3000, a 1030 to około 1000: 3000 + 1000 = <b>4000</b>. Dokładnie: 4010.'),
 about('s4-7c','481 + 312',['700','800','900','1000'],1,'481 to około 500, a 312 to około 300: 500 + 300 = <b>800</b>. Dokładnie: 793.'),
 about('s4-8a','812 − 397',['300','1200','400','500'],2,'812 to około 800, a 397 to prawie 400: 800 − 400 = <b>400</b>. Dokładnie: 415. 1200 to suma, a nie różnica.'),
 about('s4-8b','1000 − 489',['400','500','600','1500'],1,'489 to około 500: 1000 − 500 = <b>500</b>. Dokładnie: 511.'),
 q('s4-9a','Między którymi pełnymi setkami leży wynik działania <b>487 + 236</b>?',['między 500 a 600','między 600 a 700','między 800 a 900','między 700 a 800'],3,'487 to około 490, a 236 to około 240: 490 + 240 = 730. Dokładnie 723 — wynik leży <b>między 700 a 800</b>.'),
 q('s4-9b','Między którymi pełnymi setkami leży wynik działania <b>645 − 278</b>?',['między 200 a 300','między 300 a 400','między 400 a 500','między 900 a 1000'],1,'645 to około 650, a 278 to około 280: 650 − 280 = 370. Dokładnie 367 — wynik leży <b>między 300 a 400</b>. 900–1000 to suma tych liczb.'),
 // Sprawdzanie szacowaniem
 q('s4-10a','Oszacuj i wskaż działanie, w którym wynik jest <b>na pewno błędny</b>.',['389 + 412 = 801','596 + 207 = 803','298 + 499 = 697','704 + 195 = 899'],2,'298 to prawie 300, a 499 to prawie 500, więc wynik powinien być bliski 800, a nie 700. Błędne jest <b>298 + 499 = 697</b> (dobrze: 797).'),
 q('s4-10b','Oszacuj i wskaż działanie, w którym wynik jest <b>na pewno błędny</b>.',['620 − 315 = 205','903 − 498 = 405','751 − 249 = 502','1000 − 601 = 399'],0,'620 to około 600, a 315 to około 300, więc wynik powinien być bliski 300, a nie 200. Błędne jest <b>620 − 315 = 205</b> (dobrze: 305).'),
 q('s4-11a','Wynik którego działania jest <b>większy</b> od 1000?',['412 + 497','612 + 375','398 + 657','501 + 288'],2,'Szacujemy: 410 + 500 = 910, 610 + 380 = 990, 400 + 660 = 1060, 500 + 290 = 790. Ponad 1000 daje tylko <b>398 + 657</b> = 1055.'),
 q('s4-11b','Wynik którego działania jest <b>mniejszy</b> od 500?',['704 − 285','812 − 268','903 − 389','1000 − 437'],0,'Szacujemy: 700 − 300 = 400, 800 − 270 = 530, 900 − 390 = 510, 1000 − 440 = 560. Poniżej 500 jest tylko <b>704 − 285</b> = 419.'),
 q('s4-12a','Kuba oszacował sumę <b>48 + 33</b>, zamieniając obie liczby na <b>większe</b> pełne dziesiątki: 50 + 40 = 90. Co wiadomo o dokładnym wyniku?',['jest mniejszy od 90','jest równy 90','jest większy od 90','nic nie wiadomo'],0,'Obie liczby Kuba zastąpił większymi, więc szacunek jest za duży. Dokładny wynik <b>jest mniejszy od 90</b>: 48 + 33 = 81.'),
 q('s4-12b','Zosia oszacowała sumę <b>62 + 27</b>, zamieniając obie liczby na <b>mniejsze</b> pełne dziesiątki: 60 + 20 = 80. Co wiadomo o dokładnym wyniku?',['jest mniejszy od 80','jest równy 80','jest większy od 80','nic nie wiadomo'],2,'Obie liczby Zosia zastąpiła mniejszymi, więc szacunek jest za mały. Dokładny wynik <b>jest większy od 80</b>: 62 + 27 = 89.'),
 q('s4-13a','Antek obliczył, że <b>38 + 47 = 55</b>. Oszacuj wynik i oceń jego obliczenie.',['Błąd — wynik powinien być bliski 90','Dobrze — wynik powinien być bliski 50','Błąd — wynik powinien być bliski 900','Dobrze — wynik powinien być bliski 60'],0,'38 to około 40, a 47 to około 50: 40 + 50 = 90. Wynik 55 jest za mały — <b>błąd</b>. Dobrze: 85.'),
 q('s4-13b','Kasia obliczyła, że <b>512 + 389 = 801</b>. Oszacuj wynik i oceń jej obliczenie.',['Dobrze — wynik powinien być bliski 800','Błąd — wynik powinien być bliski 900','Błąd — wynik powinien być bliski 100','Dobrze — wynik powinien być bliski 9000'],1,'512 to około 500, a 389 to około 400: 500 + 400 = 900. Wynik 801 jest za mały — <b>błąd</b>. Dobrze: 901.'),
 q('s4-14a','Ola wykonała na kalkulatorze jedno z działań i pokazała wynik <b>7429</b>. Które działanie wykonała?',['924 − 457','6215 + 1214','8531 − 7406','358 + 4947'],1,'Szacujemy: 900 − 500 = 400, 6200 + 1200 = 7400, 8500 − 7400 = 1100, 400 + 5000 = 5400. Wynik 7429 pasuje do <b>6215 + 1214</b>.'),
 q('s4-14b','Ola wykonała na kalkulatorze jedno z działań i pokazała wynik <b>1125</b>. Które działanie wykonała?',['924 − 457','6215 + 1214','8531 − 7406','358 + 4947'],2,'Szacujemy: 900 − 500 = 400, 6200 + 1200 = 7400, 8500 − 7400 = 1100, 400 + 5000 = 5400. Wynik 1125 pasuje do <b>8531 − 7406</b>.'),
 // Zakupy
 enough('s4-15a','Mama ma 100 zł. Chce kupić buty za 59 zł i czapkę za 38 zł.','jej',0,'59 to prawie 60, a 38 to prawie 40: razem niecałe 100 zł. Dokładnie 97 zł, więc <b>wystarczy i zostaną jej 3 zł</b>.'),
 enough('s4-15b','Tata ma 200 zł. Chce kupić kurtkę za 128 zł i spodnie za 79 zł.','mu',2,'128 to około 130, a 79 to około 80: razem około 210 zł — więcej niż 200 zł. Dokładnie 207 zł, więc <b>zabraknie mu 7 zł</b>.'),
 enough('s4-15c','Ola ma 50 zł. Chce kupić książkę za 24 zł i grę za 26 zł.','jej',1,'24 to trochę mniej niż 25, a 26 to trochę więcej niż 25 — razem około 50 zł. Dokładnie 24 + 26 = 50 zł, więc <b>wyda wszystko co do złotówki</b>.'),
 q('s4-16a',`${pricesTable('Paragon Poli', POLA)}Ile mniej więcej zapłaciła Pola za zakupy?`,['około 40 zł','około 60 zł','około 80 zł','około 100 zł'],1,'Szacujemy: 10 + 20 + 10 + 20 = 60. Pola zapłaciła <b>około 60 zł</b> (dokładnie 61 zł).'),
 q('s4-16b',`${pricesTable('Paragon Poli', POLA)}Pola zapłaciła banknotem 100 zł. Ile mniej więcej reszty dostała?`,['około 20 zł','około 40 zł','około 60 zł','około 80 zł'],1,'Zakupy to około 10 + 20 + 10 + 20 = 60 zł. Reszta: 100 − 60 = <b>około 40 zł</b> (dokładnie 39 zł).'),
 q('s4-17',`${pricesTable('Ceny w sklepie', KASIA)}Kasia ma 50 zł. Które dwie rzeczy może kupić, żeby wystarczyło jej pieniędzy?`,['piórnik i książkę','książkę i grę','piórnik i farby','farby i grę'],2,'Piórnik to prawie 30 zł, a farby prawie 20 zł — razem mniej niż 50 zł (dokładnie 47 zł). Inne pary kosztują ponad 50 zł: 54 zł, 60 zł i 53 zł. Odpowiedź: <b>piórnik i farby</b>.'),
 q('s4-18','Julek ma 40 zł. Chce kupić 5 zeszytów po 3 zł 90 gr i 6 długopisów po 2 zł 10 gr. Oszacuj, czy wystarczy mu pieniędzy.',['Tak — wyda około 32 zł','Tak — wyda około 20 zł','Nie — potrzebuje około 45 zł','Nie — potrzebuje około 60 zł'],0,'Zeszyt to prawie 4 zł: 5 · 4 zł = 20 zł. Długopis to trochę ponad 2 zł: 6 · 2 zł = 12 zł. Razem około 32 zł — mniej niż 40 zł, więc <b>wystarczy</b>. Dokładnie: 32 zł 10 gr.'),
 q('s4-19','Pani Ola kupiła bukiet z 8 tulipanów po 2 zł 90 gr i 4 słoneczników po 5 zł 10 gr. Ozdobny papier kosztował 6 zł. Oszacuj, czy wystarczyło jej 70 zł.',['Nie — potrzebowała około 80 zł','Tak — wydała około 30 zł','Tak — wydała około 50 zł','Nie — potrzebowała około 100 zł'],2,'Tulipan to prawie 3 zł: 8 · 3 zł = 24 zł. Słonecznik to trochę ponad 5 zł: 4 · 5 zł = 20 zł. Z papierem: 24 + 20 + 6 = 50 zł — <b>wystarczyło</b>. Dokładnie: 49 zł 60 gr.'),
 q('s4-20','Bilet do kina kosztuje 19 zł. Ile mniej więcej zapłacą za bilety 4 osoby?',['około 40 zł','około 60 zł','około 80 zł','około 100 zł'],2,'19 zł to prawie 20 zł: 4 · 20 zł = <b>około 80 zł</b> (dokładnie 76 zł).'),
 // Zadania z życia
 q('s4-21','Na mecz przyszło 4870 kibiców. Gazeta napisała, że było ich około:',['4000','5000','6000','48 000'],1,'Do 5000 brakuje tylko 130, a od 4000 dzieli nas aż 870. Kibiców było <b>około 5000</b>.'),
 q('s4-22','Rodzina jechała na wakacje dwa dni. Pierwszego dnia przejechała 312 km, a drugiego 289 km. Około ile kilometrów przejechała?',['około 500 km','około 600 km','około 700 km','około 6000 km'],1,'312 to około 300, a 289 to około 300: 300 + 300 = <b>około 600 km</b> (dokładnie 601 km).'),
 q('s4-23','W sklepie było rano 503 jajka. Do wieczora sprzedano 198 jajek. Około ile jajek zostało?',['około 700','około 400','około 300','około 200'],2,'503 to około 500, a 198 to prawie 200: 500 − 200 = <b>około 300</b> (dokładnie 305). 700 to suma, a nie różnica.'),
 q('s4-24','Piekarnia sprzedała w poniedziałek 1960 bułek, a we wtorek 2030 bułek. Około ile bułek sprzedała w te dwa dni?',['około 3000','około 4000','około 5000','około 40 000'],1,'1960 to prawie 2000, a 2030 to około 2000: 2000 + 2000 = <b>około 4000</b> (dokładnie 3990).'),
 q('s4-25','Ola śpi każdej nocy prawie 9 godzin. Ile mniej więcej godzin przesypia w ciągu tygodnia?',['około 60 godzin — więcej niż dwie doby','około 60 godzin — mniej niż dwie doby','około 16 godzin — mniej niż doba','około 90 godzin — prawie cztery doby'],0,'7 · 9 = 63, a Ola śpi trochę mniej niż 9 godzin — <b>około 60 godzin</b>. Dwie doby to 2 · 24 = 48 godzin, więc to <b>więcej niż dwie doby</b>.'),
];

// Klasa 4: sprytne dodawanie — pary składników do pełnych dziesiątek i setek, przekładanie („29 + 68 = 30 + 67”),
// kolejne liczby, okienka, tabelka ○ + ■ i zadania tekstowe. Jesienne tło pasuje do hasła na koniec.
const smart = (id, expr, answers, correct, explain) => q(id, `Oblicz sprytnie: <b>${expr}</b>`, answers, correct, explain);
const first = (id, expr, answers, correct, explain) => q(id, `Które liczby warto dodać najpierw, żeby łatwo obliczyć <b>${expr}</b>?`, answers, correct, explain);
const same = (id, expr, answers, correct, explain) => q(id, `Które działanie ma taki sam wynik jak <b>${expr}</b>, ale łatwiej je policzyć?`, answers, correct, explain);
const box = (id, eq, answers, correct, explain) => q(id, `Jaką liczbę trzeba wpisać w okienko?<div class="task-statements">${eq.replace(/□/g, BOX)}</div>`, answers, correct, explain);
// Tabelka ○ + ■: znak zapytania stoi w pytanej kratce, pozostałe puste kratki są puste jak w zeszycie.
const SHAPES = [[76, 18, 94], [45, 47, 92], [58, 26, 84]];
const HIDDEN = [2, 1, 0];
const shapes = (row) => `<div class="task-table-wrap"><table class="task-table"><caption>Uzupełnij tabelę</caption><thead><tr><th scope="col">○</th><th scope="col">■</th><th scope="col">○ + ■</th></tr></thead><tbody>${SHAPES.map((r, i) => `<tr>${r.map((v, j) => `<td>${j !== HIDDEN[i] ? v : i === row ? '?' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const DYNIA = [['N', '26 + 14 + 24'], ['A', '53 + 27 + 8'], ['D', '17 + 25 + 3'], ['I', '44 + 16 + 11'], ['Y', '38 + 12 + 9']];
const dyniaTable = `<div class="task-table-wrap"><table class="task-table letters"><tbody><tr>${DYNIA.map(([, expr]) => `<td>${expr}</td>`).join('')}</tr><tr>${DYNIA.map(([letter]) => `<td><b>${letter}</b></td>`).join('')}</tr></tbody></table></div>`;

export const smartAdditionQuestions4 = [
 // Co dodać najpierw
 first('sd4-1a','16 + 27 + 4 + 13',['16 i 4, a potem 27 i 13','16 i 27, a potem 4 i 13','16 i 13, a potem 27 i 4','27 i 4, a potem 16 i 13'],0,'16 + 4 = 20 i 27 + 13 = 40 — same pełne dziesiątki. Razem 20 + 40 = <b>60</b>.'),
 first('sd4-1b','35 + 18 + 15 + 32',['35 i 18, a potem 15 i 32','35 i 32, a potem 18 i 15','35 i 15, a potem 18 i 32','18 i 15, a potem 35 i 32'],2,'35 + 15 = 50 i 18 + 32 = 50. Razem 50 + 50 = <b>100</b>.'),
 first('sd4-1c','41 + 26 + 19 + 34',['41 i 26, a potem 19 i 34','41 i 34, a potem 26 i 19','26 i 19, a potem 41 i 34','41 i 19, a potem 26 i 34'],3,'41 + 19 = 60 i 26 + 34 = 60. Razem 60 + 60 = <b>120</b>.'),
 // Trzy składniki
 smart('sd4-2a','13 + 9 + 7',['19','28','29','39'],2,'Najpierw 13 + 7 = 20, potem 20 + 9 = <b>29</b>.'),
 smart('sd4-2b','26 + 15 + 4',['45','35','44','55'],0,'Najpierw 26 + 4 = 30, potem 30 + 15 = <b>45</b>.'),
 smart('sd4-2c','8 + 37 + 12',['47','56','67','57'],3,'Najpierw 8 + 12 = 20, potem 20 + 37 = <b>57</b>.'),
 smart('sd4-2d','34 + 18 + 6',['48','58','52','68'],1,'Najpierw 34 + 6 = 40, potem 40 + 18 = <b>58</b>.'),
 // Cztery i pięć składników
 smart('sd4-3a','14 + 23 + 26 + 37',['90','99','100','110'],2,'14 + 26 = 40 i 23 + 37 = 60. Razem 40 + 60 = <b>100</b>.'),
 smart('sd4-3b','45 + 28 + 55 + 12',['130','140','150','240'],1,'45 + 55 = 100 i 28 + 12 = 40. Razem 100 + 40 = <b>140</b>.'),
 smart('sd4-4','163 + 31 + 48 + 37 + 52',['321','341','331','431'],2,'163 + 37 = 200 i 48 + 52 = 100. Zostaje 31: 200 + 100 + 31 = <b>331</b>.'),
 // Do pełnej dziesiątki lub setki
 smart('sd4-5a','69 + 47',['106','116','115','126'],1,'Przekładamy 1 z 47 do 69: 70 + 46 = <b>116</b>.'),
 smart('sd4-5b','138 + 58',['196','186','194','206'],0,'Przekładamy 2 z 58 do 138: 140 + 56 = <b>196</b>.'),
 smart('sd4-5c','29 + 245',['264','275','284','274'],3,'Przekładamy 1 z 245 do 29: 30 + 244 = <b>274</b>.'),
 smart('sd4-5d','97 + 86',['173','184','183','193'],2,'Przekładamy 3 z 86 do 97: 100 + 83 = <b>183</b>.'),
 // Przekładanie
 q('sd4-6a','Basia liczy <b>49 + 36</b>. Przekłada 1 z liczby 36 do liczby 49. Jakie działanie otrzyma?',['50 + 37','50 + 35','40 + 36','49 + 40'],1,'49 + 1 = 50, a 36 − 1 = 35. Basia liczy <b>50 + 35</b> = 85. Jedynkę trzeba zabrać z drugiej liczby, więc nie 50 + 37.'),
 same('sd4-6b','58 + 27',['60 + 25','60 + 29','50 + 37','58 + 30'],0,'Przekładamy 2 z 27 do 58: <b>60 + 25</b> = 85. Pozostałe działania dają 89, 87 i 88.'),
 same('sd4-6c','198 + 64',['200 + 66','190 + 64','200 + 62','200 + 64'],2,'Przekładamy 2 z 64 do 198: <b>200 + 62</b> = 262. W 200 + 66 dwójkę dodano, ale nie zabrano.'),
 q('sd4-7a','Marta ma w worku <b>39 kasztanów</b>, a w kieszeni <b>24</b>. Żeby łatwiej policzyć, przełożyła 1 kasztan z kieszeni do worka. Jakie działanie teraz liczy?',['40 + 25','38 + 25','39 + 25','40 + 23'],3,'W worku 39 + 1 = 40, w kieszeni 24 − 1 = 23. Marta liczy <b>40 + 23</b>.'),
 q('sd4-7b','Marta ma w worku <b>39 kasztanów</b>, a w kieszeni <b>24</b>. Przełożyła 1 kasztan z kieszeni do worka. Ile ma kasztanów razem?',['53','63','64','73'],1,'Przełożenie nie zmienia liczby kasztanów: 40 + 23 = <b>63</b>, tak samo jak 39 + 24.'),
 // Kolejne liczby
 q('sd4-8a','Oblicz sumę trzech kolejnych liczb naturalnych, z których najmniejsza to 15.',['45','46','48','51'],2,'Te liczby to 15, 16 i 17. 15 + 16 + 17 = <b>48</b>.'),
 q('sd4-8b','Suma trzech kolejnych liczb naturalnych wynosi 36. Jaka jest najmniejsza z nich?',['10','11','12','13'],1,'11 + 12 + 13 = 36, więc najmniejsza to <b>11</b>. 12 to liczba środkowa.'),
 q('sd4-8c','Oblicz sumę czterech kolejnych liczb naturalnych, z których największa to 20.',['68','74','78','80'],1,'Te liczby to 17, 18, 19 i 20. 17 + 20 = 37 i 18 + 19 = 37. Razem <b>74</b>.'),
 // Okienka
 box('sd4-9a','73 = 38 + □',['25','35','45','111'],1,'Szukamy składnika: 73 − 38 = <b>35</b>. Sprawdzenie: 38 + 35 = 73.'),
 box('sd4-9b','91 = □ + 27',['54','74','64','118'],2,'Szukamy składnika: 91 − 27 = <b>64</b>. Sprawdzenie: 64 + 27 = 91.'),
 q('sd4-9c',`Jakie liczby można wpisać w okienka?<div class="task-statements">60 = ${BOX} + ${BOX}</div>`,['37 i 33','37 i 23','28 i 22','45 i 25'],1,'37 + 23 = <b>60</b>. Pozostałe pary dają 70, 50 i 70.'),
 // Tabelka ○ + ■
 q('sd4-10a',`${shapes(0)}Jaką liczbę trzeba wpisać w miejsce znaku zapytania?`,['84','94','58','96'],1,'Dodajemy: 76 + 18 = 76 + 4 + 14 = <b>94</b>.'),
 q('sd4-10b',`${shapes(1)}Jaką liczbę trzeba wpisać w miejsce znaku zapytania?`,['57','137','47','53'],2,'Szukamy składnika: 92 − 45 = <b>47</b>. Sprawdzenie: 45 + 47 = 92.'),
 q('sd4-10c',`${shapes(2)}Jaką liczbę trzeba wpisać w miejsce znaku zapytania?`,['68','62','110','58'],3,'Szukamy składnika: 84 − 26 = <b>58</b>. Sprawdzenie: 58 + 26 = 84.'),
 // Zadania tekstowe
 q('sd4-11','Kuba zbiera naklejki. Ma 198 naklejek ze zwierzętami, 205 z piłkarzami i 197 z bajek. Ile ma wszystkich naklejek?',['590','600','610','500'],1,'Przekładamy z 205: 2 do 198 i 3 do 197. Wychodzi 200 + 200 + 200 = <b>600</b>.'),
 q('sd4-12','Na szkolny festyn kupiono balony za 37 zł, napoje za 85 zł i ciasteczka za 63 zł. Ile wydano?',['175 zł','195 zł','285 zł','185 zł'],3,'37 + 63 = 100, a 100 + 85 = <b>185 zł</b>.'),
 q('sd4-13','Na jesiennym kiermaszu uczniowie zebrali 126 zł za przetwory, 245 zł za ciasta i 74 zł za ludziki z kasztanów. Ile pieniędzy zebrali?',['435 zł','445 zł','455 zł','345 zł'],1,'126 + 74 = 200, a 200 + 245 = <b>445 zł</b>.'),
 q('sd4-14a','Ogrodnik posadził jesienią 68 cebulek tulipanów. Żonkili posadził o 17 więcej niż tulipanów, a krokusów o 25 więcej niż żonkili. Ile cebulek krokusów posadził?',['85','93','110','120'],2,'Żonkile: 68 + 17 = 85. Krokusy: 85 + 25 = <b>110</b>. 93 to 68 + 25 — krokusów jest o 25 więcej niż <i>żonkili</i>, nie tulipanów.'),
 q('sd4-14b','Ogrodnik posadził jesienią 68 cebulek tulipanów. Żonkili posadził o 17 więcej niż tulipanów, a krokusów o 25 więcej niż żonkili. Ile wszystkich cebulek posadził?',['253','263','273','178'],1,'Żonkile: 85, krokusy: 110. 68 + 85 + 110 = 153 + 110 = <b>263</b>.'),
 q('sd4-15','Ania zebrała w parku 36 liści klonu, 27 liści dębu i 14 liści kasztanowca. Ile liści zebrała?',['67','76','77','87'],2,'36 + 14 = 50, a 50 + 27 = <b>77</b>.'),
 q('sd4-16','Pan Michał zebrał dwie skrzynki śliwek. Pierwsza waży 17 kg, a druga 38 kg. Ile ważą razem?',['45 kg','55 kg','56 kg','65 kg'],1,'Przekładamy 2 kg z 17 do 38: 40 + 15 = <b>55 kg</b>.'),
 // Kolejność składników
 q('sd4-17a','Które działanie ma <b>inny</b> wynik niż <b>25 + 38 + 75</b>?',['75 + 38 + 25','100 + 38','63 + 75','60 + 75'],3,'25 + 38 + 75 = 25 + 75 + 38 = 100 + 38 = 138. Także 63 + 75 = 138, bo 25 + 38 = 63. Inny wynik ma <b>60 + 75</b> = 135.'),
 q('sd4-17b','Zosia mówi, że <b>18 + 45 + 2</b> można obliczyć jako 20 + 45. Czy ma rację?',['Nie, bo trzeba dodawać po kolei od lewej','Tak, bo kolejność składników nie zmienia sumy','Tak, ale wynik będzie inny','Nie, bo 18 + 2 = 22'],1,'Składniki wolno zamieniać miejscami: 18 + 2 = 20, a 20 + 45 = 65. <b>Zosia ma rację</b>, bo kolejność składników nie zmienia sumy.'),
 // Dziesiątki i jedności osobno
 q('sd4-18a','Michał liczy <b>46 + 38</b> tak: 40 + 30 = 70 i 6 + 8 = 14. Jaki wynik otrzyma?',['74','82','84','714'],2,'70 + 14 = <b>84</b>. 714 to dopisanie 14 za 70 zamiast dodania.'),
 q('sd4-18b','Ewa liczy <b>57 + 35</b>. Najpierw obliczyła 57 + 30 = 87. Ile musi jeszcze dodać do 87?',['3','5','30','35'],1,'Z liczby 35 dodała już 30, zostaje <b>5</b>: 87 + 5 = 92.'),
 // Pełne setki
 q('sd4-19a','Jaką liczbę trzeba dodać do 46, żeby otrzymać 100?',['44','64','54','146'],2,'46 + 4 = 50, a 50 + 50 = 100. Trzeba dodać 4 + 50 = <b>54</b>.'),
 q('sd4-19b','Która para liczb daje razem pełną setkę?',['63 i 47','58 i 42','71 i 39','84 i 26'],1,'58 + 42 = <b>100</b>. Pozostałe pary dają 110 — jedności dają 10, więc dziesiątek ma być razem 9, nie 10.'),
 // Hasło z liter
 q('sd4-20',`${dyniaTable}Oblicz sumy i ułóż litery od najmniejszej sumy do największej. Jakie słowo powstanie?`,['NADIY','AINYD','DYNIA','DYINA'],2,'D: 17 + 3 + 25 = 45, Y: 38 + 12 + 9 = 59, N: 26 + 14 + 24 = 64, I: 44 + 16 + 11 = 71, A: 53 + 27 + 8 = 88. Słowo to <b>DYNIA</b>.'),
 q('sd4-21','Która suma jest <b>największa</b>?',['29 + 47','38 + 39','19 + 56','46 + 28'],1,'30 + 46 = 76, 40 + 37 = 77, 20 + 55 = 75, 50 + 24 = 74. Największa jest <b>38 + 39</b>.'),
 smart('sd4-22a','250 + 170 + 750',['1070','1270','1117','1170'],3,'250 + 750 = 1000, a 1000 + 170 = <b>1170</b>.'),
 smart('sd4-22b','125 + 340 + 75',['440','530','540','640'],2,'125 + 75 = 200, a 200 + 340 = <b>540</b>.'),
 smart('sd4-23a','1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9',['40','45','50','55'],1,'Pary do dziesięciu: 1 + 9, 2 + 8, 3 + 7, 4 + 6. To 40 i zostaje 5: <b>45</b>.'),
 smart('sd4-23b','10 + 20 + 30 + 40 + 50 + 60 + 70 + 80 + 90',['450','400','500','4500'],0,'Pary do stu: 10 + 90, 20 + 80, 30 + 70, 40 + 60. To 400 i zostaje 50: <b>450</b>.'),
 q('sd4-24','W trzech koszach jest razem 100 jabłek. W pierwszym koszu jest 37 jabłek, a w drugim 28. Ile jabłek jest w trzecim koszu?',['25','35','45','65'],1,'W dwóch koszach: 37 + 28 = 65. W trzecim: 100 − 65 = <b>35</b>. 65 to jabłka z dwóch pierwszych koszy.'),
 q('sd4-25','Mama kupiła na targu dynię za 19 zł, jabłka za 8 zł i gruszki za 11 zł. Ile zapłaciła?',['28 zł','37 zł','38 zł','48 zł'],2,'19 + 11 = 30, a 30 + 8 = <b>38 zł</b>.'),
];

// Klasa 4: sprytne odejmowanie — zmiana odjemnej i odjemnika, „po kawałku”, powiększanie obu liczb,
// odejmowanie przez dodawanie (dopełnianie), okienka i zadania tekstowe. Zadania ułożone od najłatwiejszych
// do najtrudniejszych: scenariusz ma `ordered`, więc pytanie 1 pochodzi z początku listy, a 12 z końca.
const change = (id, text, answers, correct, explain) => q(id, `${text} Co dzieje się z różnicą?`, answers, correct, explain);
const easier = (id, expr, answers, correct, explain) => q(id, `Które działanie ma taki sam wynik jak <b>${expr}</b>, ale łatwiej je policzyć?`, answers, correct, explain);
const rest = (id, expr, answers, correct, explain) => q(id, `Ile reszty otrzyma klient, który płaci <b>${expr}</b>?`, answers, correct, explain);

export const smartSubtractionQuestions4 = [
 // Co zauważysz? Odjemna i odjemnik zmieniają się o 10 albo o tyle samo
 q('so4-1a','Wiesz, że <b>86 − 34 = 52</b>. Ile wynosi <b>86 − 44</b>?',['62','52','42','32'],2,'Odjemnik jest o 10 większy, więc różnica jest o 10 mniejsza: 52 − 10 = <b>42</b>.'),
 q('so4-1b','Wiesz, że <b>75 − 32 = 43</b>. Ile wynosi <b>65 − 32</b>?',['53','33','43','23'],1,'Odjemna jest o 10 mniejsza, więc różnica też jest o 10 mniejsza: 43 − 10 = <b>33</b>.'),
 q('so4-1c','Wiesz, że <b>94 − 51 = 43</b>. Ile wynosi <b>95 − 52</b>?',['44','45','42','43'],3,'Obie liczby są o 1 większe, więc różnica się nie zmienia: <b>43</b>.'),
 // Od pełnych dziesiątek i setek
 calc('so4-2a','90 − 36',['66','56','64','54'],3,'90 − 30 = 60, a 60 − 6 = <b>54</b>.'),
 calc('so4-2b','100 − 47',['63','53','57','43'],1,'100 − 40 = 60, a 60 − 7 = <b>53</b>. Sprawdzenie: 53 + 47 = 100.'),
 // Jedności od jedności, dziesiątki od dziesiątek
 q('so4-3a','Oblicz: jedności od jedności, dziesiątki od dziesiątek, setki od setek. <b>389 − 156</b>',['223','545','233','243'],2,'Jedności: 9 − 6 = 3, dziesiątki: 8 − 5 = 3, setki: 3 − 1 = 2. Wynik: <b>233</b>. 545 to suma, a nie różnica.'),
 calc('so4-3b','678 − 245',['433','423','923','443'],0,'Jedności: 8 − 5 = 3, dziesiątki: 7 − 4 = 3, setki: 6 − 2 = 4. Wynik: <b>433</b>.'),
 // Dwucyfrowe z przekroczeniem progu
 smart('so4-4a','84 − 19',['75','64','65','63'],2,'Odejmujemy 20 i dodajemy 1: 84 − 20 = 64, 64 + 1 = <b>65</b>. 75 wychodzi, gdy od 9 odejmie się 4 zamiast od 4 odjąć 9.'),
 smart('so4-4b','71 − 48',['37','21','33','23'],3,'Odejmujemy 50 i dodajemy 2: 71 − 50 = 21, 21 + 2 = <b>23</b>.'),
 smart('so4-4c','93 − 27',['76','66','74','56'],1,'93 − 20 = 73, a 73 − 7 = <b>66</b>. Sprawdzenie: 66 + 27 = 93.'),
 smart('so4-4d','62 − 35',['37','33','27','23'],2,'62 − 30 = 32, a 32 − 5 = <b>27</b>. Sprawdzenie: 27 + 35 = 62.'),
 // Liczby różniące się o …
 q('so4-5a','Która para liczb różni się o <b>17</b>?',['83 i 64','68 i 49','71 i 56','92 i 75'],3,'92 − 75 = <b>17</b>. Pozostałe różnice: 83 − 64 = 19, 71 − 56 = 15, 68 − 49 = 19.'),
 q('so4-5b','Która para liczb różni się o <b>26</b>?',['93 i 69','74 i 52','60 i 36','81 i 55'],3,'81 − 55 = <b>26</b>. Pozostałe różnice: 93 − 69 = 24, 74 − 52 = 22, 60 − 36 = 24.'),
 // Odejmowanie „po kawałku”
 q('so4-6a','Kasia liczy <b>74 − 38</b> „po kawałku”. Najpierw obliczyła 74 − 30 = 44. Co musi zrobić dalej?',['44 − 8 = 36','44 − 3 = 41','44 + 8 = 52','44 − 38 = 6'],0,'Z liczby 38 odjęła już 30, zostało jeszcze 8: <b>44 − 8 = 36</b>.'),
 box('so4-6b','65 − 27 = 65 − 20 − □',['2','7','20','27'],1,'27 to 20 i 7. Po odjęciu 20 trzeba jeszcze odjąć <b>7</b>: 45 − 7 = 38.'),
 q('so4-6c','Oblicz „po kawałku”: <b>362 − 47</b>',['325','305','322','315'],3,'362 − 40 = 322, a 322 − 7 = <b>315</b>.'),
 // Powiększanie obu liczb
 easier('so4-7a','143 − 68',['145 − 70','150 − 70','143 − 70','148 − 70'],0,'Do obu liczb dodajemy 2: <b>145 − 70</b> = 75. Gdy obie liczby rosną o tyle samo, różnica się nie zmienia.'),
 easier('so4-7b','251 − 97',['248 − 100','251 − 100','254 − 100','250 − 100'],2,'Do obu liczb dodajemy 3: <b>254 − 100</b> = 154. W 248 − 100 trójkę odjęto zamiast dodać.'),
 q('so4-7c','Bartek liczy <b>436 − 194</b>. Do obu liczb dodał 6. Jaki wynik otrzymał?',['248','236','242','252'],2,'436 + 6 = 442 i 194 + 6 = 200. 442 − 200 = <b>242</b>.'),
 // Odejmowanie przez dodawanie (dopełnianie)
 q('so4-8a','Ola liczy <b>122 − 63</b> przez dodawanie: 63 + 7 = 70, 70 + 30 = 100, 100 + 22 = 122. Ile wynosi 122 − 63?',['69','59','61','49'],1,'Ola doliczyła razem 7 + 30 + 22 = <b>59</b>.'),
 q('so4-8b','Tomek liczy <b>405 − 386</b> przez dodawanie: od 386 do 390, od 390 do 400 i od 400 do 405. Ile doliczył razem?',['29','119','21','19'],3,'4 + 10 + 5 = <b>19</b>. Sprawdzenie: 386 + 19 = 405.'),
 q('so4-8c','Ile trzeba dodać do <b>275</b>, żeby otrzymać <b>413</b>?',['148','138','238','128'],1,'275 + 5 = 280, 280 + 20 = 300, 300 + 113 = 413. Razem 5 + 20 + 113 = <b>138</b>.'),
 // Co dzieje się z różnicą?
 change('so4-9a','Odjemną zwiększamy o 5, a odjemnik zostaje taki sam.',['Zwiększa się o 5','Zmniejsza się o 5','Nie zmienia się','Zwiększa się o 10'],0,'Odejmujemy tyle samo od większej liczby, więc różnica <b>zwiększa się o 5</b>. Na przykład 20 − 8 = 12, a 25 − 8 = 17.'),
 change('so4-9b','Odjemnik zwiększamy o 10, a odjemna zostaje taka sama.',['Zwiększa się o 10','Zmniejsza się o 20','Nie zmienia się','Zmniejsza się o 10'],3,'Odejmujemy więcej, więc zostaje mniej: różnica <b>zmniejsza się o 10</b>. Na przykład 50 − 20 = 30, a 50 − 30 = 20.'),
 change('so4-9c','Odjemną i odjemnik zwiększamy o 7.',['Zwiększa się o 7','Zwiększa się o 14','Nie zmienia się','Zmniejsza się o 7'],2,'Obie liczby rosną o tyle samo, więc różnica <b>nie zmienia się</b>. Na tym polega odejmowanie przez powiększanie obu liczb.'),
 // Okienka
 box('so4-10a','□ − 47 = 156',['109','193','203','213'],2,'Szukamy odjemnej: 156 + 47 = <b>203</b>. Sprawdzenie: 203 − 47 = 156.'),
 box('so4-10b','184 − □ = 129',['65','55','313','45'],1,'Szukamy odjemnika: 184 − 129 = <b>55</b>. Sprawdzenie: 184 − 55 = 129.'),
 q('so4-10c',`Które działanie można wpisać w okienka?<div class="task-statements">${BOX} − ${BOX} = 25</div>`,['70 − 35','64 − 49','91 − 76','83 − 58'],3,'83 − 58 = <b>25</b>. Pozostałe różnice: 35, 15 i 15.'),
 // Trzycyfrowe: blisko pełnej setki
 smart('so4-11a','264 − 98',['162','166','164','176'],1,'Odejmujemy 100 i dodajemy 2: 264 − 100 = 164, 164 + 2 = <b>166</b>. 162 wychodzi, gdy dwójkę się odejmie zamiast dodać.'),
 smart('so4-11b','537 − 199',['336','438','337','338'],3,'Odejmujemy 200 i dodajemy 1: 537 − 200 = 337, 337 + 1 = <b>338</b>.'),
 smart('so4-11c','746 − 31',['725','436','705','715'],3,'746 − 30 = 716, a 716 − 1 = <b>715</b>.'),
 // Reszta z banknotu
 rest('so4-12a','38 zł banknotem 100 zł',['72 zł','62 zł','52 zł','138 zł'],1,'38 + 2 = 40, 40 + 60 = 100. Reszta: 2 + 60 = <b>62 zł</b>.'),
 rest('so4-12b','146 zł banknotem 200 zł',['54 zł','64 zł','46 zł','154 zł'],0,'146 + 4 = 150, 150 + 50 = 200. Reszta: 4 + 50 = <b>54 zł</b>.'),
 rest('so4-12c','287 zł banknotem 500 zł',['223 zł','313 zł','213 zł','787 zł'],2,'287 + 13 = 300, 300 + 200 = 500. Reszta: 13 + 200 = <b>213 zł</b>.'),
 // O ile więcej?
 q('so4-13a','W pierwszym tygodniu zbiórki makulatury zebrano 186 kg, a w drugim 252 kg. O ile więcej kilogramów zebrano w drugim tygodniu?',['76 kg','134 kg','66 kg','438 kg'],2,'252 − 186: od 186 do 200 jest 14, od 200 do 252 jest 52. Razem 14 + 52 = <b>66 kg</b>. 438 to suma, a nie różnica.'),
 q('so4-13b','W małej sali kina jest 168 miejsc, a w dużej 315. O ile więcej miejsc jest w dużej sali?',['157','483','253','147'],3,'315 − 168 = 317 − 170 = <b>147</b> (do obu liczb dodaliśmy 2).'),
 // Ile ubyło, ile zostało?
 q('so4-14a','Pewien niedźwiedź brunatny ważył jesienią 412 kg, a wiosną, po zimowym śnie, 338 kg. Ile kilogramów schudł przez zimę?',['74 kg','84 kg','126 kg','750 kg'],0,'Od 338 do 340 są 2, od 340 do 400 jest 60, od 400 do 412 jest 12. Razem 2 + 60 + 12 = <b>74 kg</b>.'),
 q('so4-14b','Na wycieczkę klasa zebrała 1250 zł. Wycieczka kosztowała 1186 zł. Ile złotych zostało?',['74 zł','64 zł','136 zł','164 zł'],1,'Od 1186 do 1200 jest 14, od 1200 do 1250 jest 50. Zostało 14 + 50 = <b>64 zł</b>.'),
 // Ile lat minęło?
 q('so4-15a','Bracia Wright pierwszy raz polecieli samolotem w 1903 roku. Ile lat minęło od tego lotu do 2026 roku?',['123','113','223','133'],0,'Od 1903 do 2003 minęło 100 lat, a od 2003 do 2026 jeszcze 23. Razem <b>123</b> lata.'),
 q('so4-15b','Człowiek pierwszy raz stanął na Księżycu w 1969 roku. Ile lat minęło od tego czasu do 2026 roku?',['67','47','43','57'],3,'Od 1969 do 1970 jest 1 rok, od 1970 do 2000 jest 30 lat, od 2000 do 2026 jest 26 lat. Razem 1 + 30 + 26 = <b>57</b> lat.'),
 // Lata życia
 q('so4-16a','Fryderyk Chopin urodził się w 1810 roku, a zmarł w 1849 roku. Ile lat żył?',['49','39','41','29'],1,'1849 − 1810 = <b>39</b>.'),
 q('so4-16b','Maria Skłodowska-Curie urodziła się w 1867 roku. Pierwszą Nagrodę Nobla otrzymała w 1903 roku. Ile miała wtedy lat?',['46','34','36','26'],2,'Od 1867 do 1870 są 3 lata, od 1870 do 1900 jest 30, od 1900 do 1903 są 3. Razem 3 + 30 + 3 = <b>36</b>.'),
 q('so4-16c','Mikołaj Kopernik zmarł w 1543 roku. Żył 70 lat. W którym roku się urodził?',['1463','1483','1613','1473'],3,'1543 − 70 = 1543 − 40 − 30 = 1503 − 30 = <b>1473</b>. 1613 to dodawanie zamiast odejmowania.'),
 // Gra w dwie rundy
 q('so4-17a','Ala i Bartek grali w grę z dwiema rundami. Ala zdobyła 57 i 68 punktów, a Bartek 73 i 49 punktów. Kto wygrał i o ile punktów?',['Ala o 3 punkty','Bartek o 3 punkty','Ala o 13 punktów','Bartek o 16 punktów'],0,'Ala: 57 + 68 = 125, Bartek: 73 + 49 = 122. Wygrała <b>Ala o 3 punkty</b> (125 − 122). Bartek prowadził tylko po pierwszej rundzie.'),
 q('so4-17b','Ala i Bartek grali w grę z dwiema rundami. W pierwszej rundzie Ala zdobyła 57 punktów, a Bartek 73. Jaka była różnica punktów po pierwszej rundzie?',['24','16','26','3'],1,'73 − 57 = 73 − 60 + 3 = 13 + 3 = <b>16</b>.'),
 // Która różnica jest największa / najmniejsza?
 q('so4-18a','Która różnica jest <b>największa</b>?',['83 − 47','91 − 58','76 − 39','65 − 27'],3,'83 − 47 = 36, 91 − 58 = 33, 76 − 39 = 37, 65 − 27 = 38. Największa jest <b>65 − 27</b>.'),
 q('so4-18b','Która różnica jest <b>najmniejsza</b>?',['240 − 189','152 − 98','203 − 147','181 − 129'],0,'240 − 189 = 51, 152 − 98 = 54, 203 − 147 = 56, 181 − 129 = 52. Najmniejsza jest <b>240 − 189</b>.'),
 // Dopełnienie
 q('so4-19a','Ile brakuje liczbie <b>627</b> do <b>1000</b>?',['473','383','373','427'],2,'627 + 3 = 630, 630 + 70 = 700, 700 + 300 = 1000. Brakuje 3 + 70 + 300 = <b>373</b>.'),
 q('so4-19b','Ile wynosi różnica największej liczby trzycyfrowej i liczby <b>458</b>?',['541','551','441','542'],0,'Największa liczba trzycyfrowa to 999. 999 − 458 = <b>541</b> — tu nie trzeba nic pożyczać.'),
 // Sprawdzanie wyniku
 q('so4-20','Paweł obliczył, że <b>403 − 167 = 246</b>. Czy ma rację?',['Tak','Nie, wynik to 236','Nie, wynik to 336','Nie, wynik to 264'],1,'Sprawdzamy dodawaniem: 246 + 167 = 413, a nie 403. Poprawnie: 403 − 167 = 406 − 170 = <b>236</b>.'),
 // Łańcuch działań
 q('so4-21a','Zacznij od <b>250</b>. Dodaj 99, odejmij 48, dodaj 101, odejmij 52. Jaki wynik otrzymasz?',['348','350','450','352'],1,'250 + 99 = 349, 349 − 48 = 301, 301 + 101 = 402, 402 − 52 = <b>350</b>.'),
 q('so4-21b','Zacznij od <b>500</b>. Odejmij 198, dodaj 45, odejmij 97. Jaki wynik otrzymasz?',['250','248','260','350'],0,'500 − 198 = 302, 302 + 45 = 347, 347 − 97 = <b>250</b>.'),
 // Zadania wieloetapowe
 q('so4-22a','W pociągu jechało 324 pasażerów. Na stacji wysiadło 98 osób, a wsiadło 45. Ilu pasażerów jest teraz w pociągu?',['226','181','271','281'],2,'324 − 98 = 324 − 100 + 2 = 226, a 226 + 45 = <b>271</b>. 181 wychodzi, gdy osoby, które wsiadły, też się odejmie.'),
 q('so4-22b','Sklep miał 500 zeszytów. W poniedziałek sprzedał 128 zeszytów, a we wtorek 172. Ile zeszytów zostało?',['200','300','228','372'],0,'Sprytnie: 128 + 172 = 300, a 500 − 300 = <b>200</b>. 300 to liczba sprzedanych zeszytów.'),
 // Liczby czterocyfrowe
 q('so4-23a','Ewa zdobyła w grze 1042 punkty, a Kuba 987. O ile więcej punktów ma Ewa?',['55','65','145','45'],0,'Od 987 do 1000 jest 13, od 1000 do 1042 jest 42. Razem 13 + 42 = <b>55</b>.'),
 q('so4-23b','Na koncercie było 1105 osób, a na spektaklu 968 osób. O ile więcej osób było na koncercie?',['147','263','137','237'],2,'Od 968 do 1000 są 32, od 1000 do 1105 jest 105. Razem 32 + 105 = <b>137</b>.'),
 // Odjemna, odjemnik, różnica
 q('so4-24a','Różnica dwóch liczb wynosi 154, a odjemna jest równa 320. Ile wynosi odjemnik?',['474','166','176','154'],1,'Odjemnik = odjemna − różnica: 320 − 154 = <b>166</b>. Sprawdzenie: 320 − 166 = 154. 474 to odjemna dodana do różnicy.'),
 q('so4-24b','Różnica dwóch liczb wynosi 85. Odjemną zwiększamy o 20, a odjemnik zmniejszamy o 15. Ile wynosi nowa różnica?',['120','90','105','50'],0,'Większa odjemna zwiększa różnicę o 20, mniejszy odjemnik zwiększa ją jeszcze o 15: 85 + 20 + 15 = <b>120</b>.'),
];
