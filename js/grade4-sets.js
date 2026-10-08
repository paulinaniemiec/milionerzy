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
