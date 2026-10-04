// Klasa 5: cechy podzielności przez 2, 3, 4, 5, 9, 10 i wielokrotności liczb. Każde pytanie to osobne zadanie.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id, q:text, answers, correct, explain});
const pair = (id, a, b, truth, explain) => q(id, `Oceń dwa zdania.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);

export const divisibilityQuestions = [
 q('dz-1','Która z liczb jest podzielna przez 2?', ['357','1249','4518','2003'],2,'Liczba jest podzielna przez 2, gdy jej ostatnia cyfra to 0, 2, 4, 6 lub 8. Tylko <b>4518</b> kończy się cyfrą parzystą.'),
 q('dz-2','Która z liczb jest podzielna przez 5?', ['1234','5552','3705','4051'],2,'Liczba jest podzielna przez 5, gdy kończy się cyfrą 0 lub 5. Tylko <b>3705</b> kończy się piątką. Pierwsza cyfra nie ma znaczenia.'),
 q('dz-3','Która z liczb jest podzielna przez 10?', ['2501','1055','1001','3150'],3,'Liczba jest podzielna przez 10, gdy kończy się zerem. To <b>3150</b>.'),
 q('dz-4','Czy liczba 2718 jest podzielna przez 3?', ['Tak, bo suma jej cyfr to 18','Nie, bo ostatnia cyfra 8 nie dzieli się przez 3','Tak, bo jest parzysta','Nie, bo suma jej cyfr to 17'],0,'Liczba jest podzielna przez 3, gdy suma jej cyfr dzieli się przez 3. 2 + 7 + 1 + 8 = 18, a 18 dzieli się przez 3. <b>Tak</b> (2718 : 3 = 906).'),
 q('dz-5','Która z liczb jest podzielna przez 3?', ['1234','5002','2341','4311'],3,'Sumy cyfr: 10, 7, 10 i 9. Tylko 9 dzieli się przez 3, więc odpowiedź to <b>4311</b> (4311 : 3 = 1437).'),
 q('dz-6','Która z liczb jest podzielna przez 9?', ['1236','2349','5403','4802'],1,'Liczba jest podzielna przez 9, gdy suma jej cyfr dzieli się przez 9. Sumy: 12, 18, 12, 14. Tylko <b>2349</b> (suma 18).'),
 q('dz-7','Czy liczba 5367 jest podzielna przez 9?', ['Tak, bo suma jej cyfr dzieli się przez 3','Nie, bo suma jej cyfr, 21, nie dzieli się przez 9','Tak, bo kończy się cyfrą 7','Nie, bo jest nieparzysta'],1,'5 + 3 + 6 + 7 = 21. Liczba 21 dzieli się przez 3, ale nie przez 9. <b>Nie</b> — 5367 jest podzielna przez 3, ale nie przez 9. Liczby nieparzyste też mogą dzielić się przez 9, np. 27.'),
 q('dz-8','Która z liczb jest podzielna przez 4?', ['3418','2526','5132','7342'],2,'Liczba jest podzielna przez 4, gdy liczba utworzona z dwóch ostatnich cyfr dzieli się przez 4. Sprawdzamy: 18, 26, 32, 42. Tylko 32 = 4 · 8, więc <b>5132</b>.'),
 q('dz-9','Czy liczba 1714 jest podzielna przez 4?', ['Tak, bo jest parzysta','Tak, bo kończy się cyfrą 4','Nie, bo 14 nie dzieli się przez 4','Nie, bo suma jej cyfr nie dzieli się przez 4'],2,'Patrzymy na dwie ostatnie cyfry: 14. 14 : 4 = 3 reszty 2, więc <b>nie</b>. Parzystość nie wystarcza: przez 4 dzieli się tylko co druga liczba parzysta.'),
 q('dz-10','Wielokrotnością liczby 6 jest liczba:', ['32','38','42','46'],2,'Wielokrotności 6: 6, 12, 18, 24, 30, 36, <b>42</b>, 48… Liczba 42 = 6 · 7.'),
 q('dz-11','Która z liczb <b>nie</b> jest wielokrotnością liczby 7?', ['21','35','54','63'],2,'21 = 7 · 3, 35 = 7 · 5, 63 = 7 · 9. Liczba <b>54</b> nie jest w tabliczce siódemki: 7 · 7 = 49, 7 · 8 = 56.'),
 q('dz-12','Ile wielokrotności liczby 8 jest większych od 0 i mniejszych od 50?', ['5','6','7','8'],1,'8, 16, 24, 32, 40, 48 — to <b>6</b> liczb. Następna, 56, jest już większa od 50.'),
 q('dz-13','Najmniejsza liczba dwucyfrowa podzielna przez 9 to:', ['10','18','19','99'],1,'Wielokrotności 9: 9, 18, 27… Liczba 9 jest jednocyfrowa, więc najmniejsza dwucyfrowa to <b>18</b>.'),
 q('dz-14','Największa liczba trzycyfrowa podzielna przez 5 to:', ['999','990','995','1000'],2,'Szukamy największej trzycyfrowej liczby zakończonej cyfrą 0 lub 5. To <b>995</b>. Liczba 1000 jest czterocyfrowa.'),
 q('dz-15','Jaką cyfrę trzeba wpisać w miejsce □, aby liczba 4□2 była podzielna przez 3?', ['1','2','3','4'],2,'Suma cyfr to 4 + □ + 2 = 6 + □. Z podanych cyfr tylko dla 3 suma (9) dzieli się przez 3: <b>432</b> = 3 · 144.'),
 q('dz-16','Jaką cyfrę trzeba wpisać w miejsce □, aby liczba 7□5 była podzielna przez 9?', ['6','3','9','4'],0,'Suma cyfr to 7 + □ + 5 = 12 + □. Dla □ = 6 suma wynosi 18, a 18 dzieli się przez 9: <b>765</b> = 9 · 85.'),
 q('dz-17','Która liczba jest podzielna jednocześnie przez 2 i przez 5?', ['255','520','525','552'],1,'Liczba podzielna przez 2 i przez 5 musi kończyć się zerem (czyli dzieli się też przez 10). To <b>520</b>.'),
 q('dz-18','Która liczba jest podzielna jednocześnie przez 2 i przez 3?', ['123','322','234','405'],2,'Musi być parzysta i mieć sumę cyfr podzielną przez 3. 123 i 405 są nieparzyste, 322 ma sumę cyfr 7. <b>234</b>: parzysta, suma cyfr 9.'),
 q('dz-19','Która liczba jest podzielna przez 3, ale <b>nie</b> przez 9?', ['81','72','57','99'],2,'Sumy cyfr: 9, 9, 12, 18. Tylko suma 12 dzieli się przez 3, ale nie przez 9. To <b>57</b> = 3 · 19.'),
 q('dz-20','Przez którą z liczb jest podzielna liczba 1305?', ['przez 2','przez 4','przez 9','przez 10'],2,'1305 jest nieparzysta, więc nie dzieli się przez 2, 4 ani 10. Suma cyfr: 1 + 3 + 0 + 5 = 9, więc dzieli się <b>przez 9</b> (1305 : 9 = 145).'),
 pair('dz-21','Każda liczba podzielna przez 9 jest podzielna przez 3.','Każda liczba podzielna przez 3 jest podzielna przez 9.','PF','I: 9 = 3 · 3, więc jeśli liczba dzieli się przez 9, to dzieli się też przez 3 — <b>prawda</b>. II: np. 12 dzieli się przez 3, ale nie przez 9 — <b>fałsz</b>.'),
 pair('dz-22','Liczba 3030 jest podzielna przez 3 i przez 10.','Liczba 2025 jest podzielna przez 9.','PP','3030: suma cyfr 6 i zero na końcu — <b>prawda</b>. 2025: suma cyfr 2 + 0 + 2 + 5 = 9 — <b>prawda</b> (2025 : 9 = 225).'),
 pair('dz-23','Liczba 7770 jest podzielna przez 4.','Liczba 7770 jest podzielna przez 3.','FP','I: dwie ostatnie cyfry to 70, a 70 nie dzieli się przez 4 — <b>fałsz</b>. II: suma cyfr 7 + 7 + 7 + 0 = 21 dzieli się przez 3 — <b>prawda</b>.'),
 pair('dz-24','Liczba 6006 jest podzielna przez 9.','Liczba 6006 jest podzielna przez 4.','FF','I: suma cyfr to 12, a 12 nie dzieli się przez 9 — <b>fałsz</b>. II: dwie ostatnie cyfry to 06, a 6 nie dzieli się przez 4 — <b>fałsz</b>.'),
 q('dz-25','Uczniowie ustawili się w rzędach po 4 osoby i nikt nie został sam. Ilu uczniów mogło być w klasie?', ['26','30','28','22'],2,'Liczba uczniów musi być wielokrotnością 4. Spośród podanych tylko <b>28</b> = 4 · 7.'),
 q('dz-26','Jajka pakuje się po 6 sztuk w opakowaniu. Którą liczbę jajek da się zapakować tak, żeby żadne nie zostało?', ['84','64','76','94'],0,'Szukamy wielokrotności 6: musi być parzysta i mieć sumę cyfr podzielną przez 3. <b>84</b>: suma cyfr 12, a 84 = 6 · 14.'),
 q('dz-27','Ile spośród liczb 12, 15, 20, 30, 45, 60 jest podzielnych jednocześnie przez 3 i przez 5?', ['2','3','4','5'],2,'Przez 5 dzielą się: 15, 20, 30, 45, 60. Z nich przez 3 dzielą się 15, 30, 45 i 60 (20 ma sumę cyfr 2). Razem <b>4</b> liczby.'),
 q('dz-28','Która liczba jest wspólną wielokrotnością liczb 4 i 6?', ['18','24','30','16'],1,'18 i 30 nie dzielą się przez 4, a 16 nie dzieli się przez 6. <b>24</b> = 4 · 6 i dzieli się przez obie liczby.'),
 q('dz-29','Autobus linii A odjeżdża z przystanku co 4 minuty, a linii B co 6 minut. O 8:00 odjechały razem. O której najwcześniej znów odjadą razem?', ['8:10','8:12','8:24','8:02'],1,'Szukamy najmniejszej wspólnej wielokrotności 4 i 6. A: 4, 8, 12…; B: 6, 12… Wspólna jest 12, więc o <b>8:12</b>. O 8:24 też odjadą razem, ale później.'),
 q('dz-30','Ile jest liczb dwucyfrowych podzielnych przez 10?', ['9','10','11','90'],0,'To 10, 20, 30, 40, 50, 60, 70, 80, 90 — razem <b>9</b> liczb. Liczba 100 jest już trzycyfrowa.'),
];

// Klasa 5: potęgowanie — iloczyn ↔ potęga, obliczanie, odczytywanie, kolejność działań.
const p = (base, exp) => `${base}<sup>${exp}</sup>`;
const read = (text) => `Jak czytamy zapis <b>${text}</b>?`;

export const powerQuestions = [
 q('pt-1','Zapisz iloczyn <b>24 · 24 · 24 · 24 · 24</b> w postaci potęgi.', [p(24,5),p(5,24),'24 · 5','120'],0,`Czynnik 24 powtarza się 5 razy, więc to <b>${p(24,5)}</b>. Podstawa to liczba, którą mnożymy, a wykładnik mówi, ile razy.`),
 q('pt-2','Zapisz iloczyn <b>7 · 7 · 7 · 7 · 7 · 7 · 7</b> w postaci potęgi.', [p(7,6),p(7,7),p(7,8),'49'],1,`Policz siódemki: jest ich 7. Zatem <b>${p(7,7)}</b>.`),
 q('pt-3','Zapisz iloczyn <b>3 · 3 · 3 · 3 · 3 · 3 · 3 · 3 · 3 · 3</b> w postaci potęgi.', [p(3,10),p(10,3),p(3,9),'30'],0,`Trójka występuje 10 razy, więc <b>${p(3,10)}</b>. Zapis ${p(10,3)} oznaczałby 10 · 10 · 10.`),
 q('pt-4','Zapisz iloczyn <b>44 · 44</b> w postaci potęgi.', [p(4,4),p(44,2),p(2,44),'88'],1,`Mnożymy 44 przez siebie 2 razy: <b>${p(44,2)}</b>. 88 to suma 44 + 44, a nie iloczyn.`),
 q('pt-5','Którą potęgą można zapisać liczbę <b>13</b>?', [p(1,13),p(13,1),p(13,2),p(13,13)],1,`Potęga o wykładniku 1 jest równa swojej podstawie: <b>${p(13,1)} = 13</b>. ${p(1,13)} = 1, a ${p(13,2)} = 13 · 13 = 169.`),
 q('pt-6',`Zapisz potęgę <b>${p(4,4)}</b> w postaci iloczynu jednakowych czynników.`, ['4 · 4','4 · 4 · 4 · 4','4 + 4 + 4 + 4','4 · 4 · 4'],1,'Wykładnik 4 mówi, że czwórkę mnożymy przez siebie 4 razy: <b>4 · 4 · 4 · 4</b>. Dodawanie to zupełnie inne działanie.'),
 q('pt-7',`Zapisz potęgę <b>${p(13,2)}</b> w postaci iloczynu jednakowych czynników.`, ['13 · 2','13 + 13','13 · 13','1 · 3 · 1 · 3'],2,`${p(13,2)} to <b>13 · 13</b> (= 169). Częsty błąd: mnożenie podstawy przez wykładnik (13 · 2).`),
 q('pt-8',`Oblicz <b>${p(2,7)}</b>.`, ['14','64','128','256'],2,'2 · 2 · 2 · 2 · 2 · 2 · 2: 2, 4, 8, 16, 32, 64, <b>128</b>.'),
 q('pt-9',`Oblicz <b>${p(3,5)}</b>.`, ['15','243','81','125'],1,'3 · 3 · 3 · 3 · 3: 3, 9, 27, 81, <b>243</b>.'),
 q('pt-10',`Oblicz <b>${p(0,12)}</b>.`, ['0','1','12','120'],0,'Zero pomnożone przez zero dowolną liczbę razy daje <b>0</b>.'),
 q('pt-11',`Oblicz <b>${p(1,10)}</b>.`, ['10','0','11','1'],3,'1 · 1 · … · 1 (10 razy) to zawsze <b>1</b>. Jedynka podniesiona do dowolnej potęgi daje 1.'),
 q('pt-12',`Oblicz <b>${p(5,3)}</b>.`, ['15','125','25','53'],1,'5 · 5 · 5 = 25 · 5 = <b>125</b>.'),
 q('pt-13',`Oblicz <b>${p(6,2)}</b>.`, ['12','36','26','62'],1,'6 · 6 = <b>36</b>. Wynik 12 to 6 · 2 — mnożenie przez wykładnik to błąd.'),
 q('pt-14',`Oblicz <b>${p(7,3)}</b>.`, ['21','49','343','373'],2,'7 · 7 · 7 = 49 · 7 = <b>343</b>.'),
 q('pt-15',`Oblicz <b>${p(8,3)}</b>.`, ['24','64','256','512'],3,'8 · 8 · 8 = 64 · 8 = <b>512</b>. 64 to dopiero 8 do kwadratu.'),
 q('pt-17',`Oblicz <b>${p(4,4)}</b>.`, ['16','64','256','44'],2,'4 · 4 · 4 · 4: 4, 16, 64, <b>256</b>.'),
 q('pt-18',`Oblicz <b>${p(2,6)}</b>.`, ['12','32','64','36'],2,'2, 4, 8, 16, 32, <b>64</b>.'),
 q('pt-19',read(p(2,2)), ['dwa do kwadratu','dwa do sześcianu','dwadzieścia dwa','dwa plus dwa'],0,`Potęgę o wykładniku 2 nazywamy kwadratem. ${p(2,2)} czytamy: <b>„dwa do kwadratu”</b> (= 4).`),
 q('pt-20',read(p(3,3)), ['trzy do kwadratu','trzy do sześcianu','trzy razy trzy','trzydzieści trzy'],1,`Potęgę o wykładniku 3 nazywamy sześcianem. ${p(3,3)} czytamy: <b>„trzy do sześcianu”</b> (= 27).`),
 q('pt-21',read(p(5,4)), ['pięć do potęgi czwartej','cztery do potęgi piątej','pięć razy cztery','pięć do sześcianu'],0,`Najpierw podstawa (5), potem wykładnik (4): <b>„pięć do potęgi czwartej”</b>.`),
 q('pt-22','Który zapis czytamy: <b>„dziesięć do sześcianu”</b>?', [p(10,2),p(3,10),p(10,3),'10 · 3'],2,`„Do sześcianu” oznacza wykładnik 3: <b>${p(10,3)}</b> = 1000.`),
 q('pt-23','Który zapis czytamy: <b>„siedem do kwadratu”</b>?', [p(2,7),p(7,2),'7 · 2',p(7,3)],1,`„Do kwadratu” oznacza wykładnik 2, a podstawą jest 7: <b>${p(7,2)}</b> = 49.`),
 q('pt-24',`Czym jest liczba 5 w potędze <b>${p(9,5)}</b>?`, ['podstawą potęgi','wykładnikiem potęgi','wynikiem potęgi','sumą potęgi'],1,`W ${p(9,5)} liczba 9 to podstawa, a mała liczba 5 u góry to <b>wykładnik</b>: mówi, ile razy mnożymy 9.`),
 q('pt-25','Ile wynosi <b>kwadrat liczby 9</b>?', ['18','81','729','99'],1,`Kwadrat liczby 9 to ${p(9,2)} = 9 · 9 = <b>81</b>. 729 to sześcian liczby 9.`),
 q('pt-26','Ile wynosi <b>sześcian liczby 2</b>?', ['6','4','8','9'],2,`Sześcian liczby 2 to ${p(2,3)} = 2 · 2 · 2 = <b>8</b>.`),
 q('pt-27',`Porównaj liczby <b>${p(2,3)}</b> i <b>${p(3,2)}</b>.`, [`${p(2,3)} > ${p(3,2)}`,`${p(2,3)} < ${p(3,2)}`,`${p(2,3)} = ${p(3,2)}`,'Nie da się ich porównać'],1,`${p(2,3)} = 8, a ${p(3,2)} = 9. Zatem <b>${p(2,3)} < ${p(3,2)}</b>. Zamiana podstawy z wykładnikiem zmienia wynik.`),
 q('pt-28','Która liczba jest <b>największa</b>?', [p(2,5),p(5,2),p(3,3),p(4,2)],0,`${p(2,5)} = 32, ${p(5,2)} = 25, ${p(3,3)} = 27, ${p(4,2)} = 16. Największa jest <b>${p(2,5)}</b>.`),
 q('pt-29',`Oblicz <b>${p(10,4)}</b>.`, ['40','1000','10 000','100 000'],2,`Wykładnik mówi, ile zer stoi po jedynce: ${p(10,4)} = <b>10 000</b>.`),
 q('pt-30',`Oblicz <b>2 · ${p(3,2)}</b>.`, ['36','18','12','11'],1,`Potęgowanie wykonujemy przed mnożeniem: 2 · 9 = <b>18</b>. Wynik 36 to (2 · 3)².`),
 q('pt-31',`Oblicz <b>(2 + 3)<sup>2</sup></b>.`, ['13','25','10','11'],1,`Najpierw nawias: 2 + 3 = 5, potem ${p(5,2)} = <b>25</b>. Wynik 13 to ${p(2,2)} + ${p(3,2)} — to inne działanie.`),
 q('pt-32','Bok kwadratu ma 6 cm. Ile wynosi jego pole?', ['24 cm<sup>2</sup>','36 cm<sup>2</sup>','12 cm<sup>2</sup>','216 cm<sup>2</sup>'],1,`Pole kwadratu to bok do kwadratu: ${p(6,2)} = <b>36 cm<sup>2</sup></b>. 24 cm to obwód.`),
 q('pt-33','Z małych sześciennych kostek zbudowano duży sześcian. Wzdłuż każdej krawędzi leżą 4 kostki. Ile kostek użyto?', ['12','16','48','64'],3,`Jedna warstwa to 4 · 4 = 16 kostek, a warstw są 4: 4 · 4 · 4 = ${p(4,3)} = <b>64</b>.`),
 pair('pt-34',`${p(5,2)} = 10`,`${p(1,5)} = 1`,'FP',`${p(5,2)} = 5 · 5 = 25, więc I jest fałszywe. ${p(1,5)} = 1 · 1 · 1 · 1 · 1 = 1, więc II jest prawdziwe. <b>F, P</b>.`),
 q('pt-35','Którą z liczb można zapisać jako <b>kwadrat liczby naturalnej</b>?', ['24','48','49','50'],2,`<b>49</b> = 7 · 7 = ${p(7,2)}. Pozostałe leżą między kwadratami: 16, 25, 36, 49, 64.`),
];

// Klasa 5: system rzymski — odczytywanie, zapisywanie, daty z obrazów i budowli, działania, zamazane liczby.
// Podpunkty tego samego zadania (ten sam obraz) mają wspólną grupę: rz-20a i rz-20b to jedno zadanie.
const qv = (id, ...rest) => ({...q(id, ...rest), sourceGroup: id.replace(/[a-z]$/, '')});
const R = (s) => `<span class="roman">${s}</span>`;
const Rs = (list) => list.map(R);
const photo = (file, title, credit) => `<figure class="task-photo"><img src="images/roman/${file}" alt="${title}" loading="lazy"><figcaption>${title}${credit ? ` · ${credit}` : ''}</figcaption></figure>`;
const matejko = (file, title) => photo(file, `Jan Matejko, „${title}”`);
const blot = '<span class="blot" role="img" aria-label="zamazana cyfra"></span>';
const value = (s) => `Jaką liczbę oznacza zapis ${R(`<b>${s}</b>`)}?`;
const write = (n) => `Jak zapisać liczbę <b>${n}</b> cyframi rzymskimi?`;
const RULES = 'Znak mniejszy przed większym odejmujemy (IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).';

export const romanQuestions = [
 q('rz-1',value('VIII'), ['3','7','8','12'],2,`V = 5, a trzy jedynki dodajemy: 5 + 3 = <b>8</b>.`),
 q('rz-2',value('IX'), ['11','9','4','10'],1,`I stoi przed większym X, więc odejmujemy: 10 − 1 = <b>9</b>. XI to 11.`),
 q('rz-3',value('XIV'), ['16','14','15','4'],1,`X = 10, IV = 4. Razem <b>14</b>.`),
 q('rz-4',value('XXXIX'), ['41','39','31','49'],1,`XXX = 30, IX = 9. Razem <b>39</b>.`),
 q('rz-5',value('XLII'), ['62','42','58','38'],1,`XL = 50 − 10 = 40, II = 2. Razem <b>42</b>. LXII to 62.`),
 q('rz-6',value('XCVII'), ['117','97','107','93'],1,`XC = 90, VII = 7. Razem <b>97</b>.`),
 q('rz-7',value('LXXXV'), ['85','65','135','95'],0,`L = 50, XXX = 30, V = 5. Razem <b>85</b>.`),
 q('rz-8',value('MCM'), ['2100','1100','1900','1800'],2,`M = 1000, CM = 1000 − 100 = 900. Razem <b>1900</b>.`),
 q('rz-9',value('MMCD'), ['2600','2400','2100','3400'],1,`MM = 2000, CD = 500 − 100 = 400. Razem <b>2400</b>. MMDC to 2600.`),
 q('rz-10',value('MCMLXI'), ['1961','2161','1941','1916'],0,`M = 1000, CM = 900, L = 50, X = 10, I = 1. Razem <b>1961</b>.`),
 q('rz-11',value('MMCDXIX'), ['2619','2419','2421','2409'],1,`MM = 2000, CD = 400, X = 10, IX = 9. Razem <b>2419</b>.`),
 q('rz-12',write(4), Rs(['IIII','VI','IV','IIV']),2,`Tego samego znaku nie piszemy więcej niż 3 razy obok siebie. 4 = 5 − 1, czyli <b>${R('IV')}</b>. VI to 6.`),
 q('rz-13',write(19), Rs(['XVIIII','IXX','XXI','XIX']),3,`19 = 10 + 9 = X + IX = <b>${R('XIX')}</b>.`),
 q('rz-14',write(49), Rs(['IL','XLIX','XXXXIX','LIX']),1,`49 = 40 + 9 = XL + IX = <b>${R('XLIX')}</b>. Zapis IL jest niepoprawny: I można odjąć tylko od V i X.`),
 q('rz-15',write(99), Rs(['IC','XCIX','LXLIX','CIX']),1,`99 = 90 + 9 = XC + IX = <b>${R('XCIX')}</b>. CIX to 109.`),
 q('rz-16',write(400), Rs(['CCCC','DC','CD','XD']),2,`400 = 500 − 100, czyli <b>${R('CD')}</b>. DC to 600.`),
 q('rz-17',write(1972), Rs(['MCMLXXII','MDCCCCLXXII','MCMXXII','MCMLXII']),0,`1000 + 900 + 50 + 20 + 2 = M + CM + L + XX + II = <b>${R('MCMLXXII')}</b>.`),
 q('rz-18',write(2999), Rs(['MMIM','MMCMXCIX','MMCMIC','MMDCDXCIX']),1,`2000 + 900 + 90 + 9 = MM + CM + XC + IX = <b>${R('MMCMXCIX')}</b>. Nie wolno skracać do IM ani IC.`),
 qv('rz-19a',`${matejko('hold-pruski.jpg','Hołd pruski')}Hołd pruski złożono w Krakowie w roku ${R('<b>MDXXV</b>')}. Który to rok?`, ['1525','1575','1515','1625'],0,`M = 1000, D = 500, XX = 20, V = 5. Razem <b>1525</b>.`),
 qv('rz-19b',`${matejko('hold-pruski.jpg','Hołd pruski')}Hołd pruski złożono w roku ${R('MDXXV')}. W którym wieku?`, Rs(['XV','XVI','XVII','XIV']),1,`${R('MDXXV')} = 1525. Wiek XVI to lata 1501–1600, więc <b>${R('XVI')} wiek</b>.`),
 qv('rz-20a',`${matejko('sobieski.jpg','Sobieski pod Wiedniem')}Król Jan III Sobieski pokonał Turków pod Wiedniem w roku ${R('<b>MDCLXXXIII</b>')}. Który to rok?`, ['1683','1633','1688','1483'],0,`M = 1000, D = 500, C = 100, LXXX = 80, III = 3. Razem <b>1683</b>.`),
 qv('rz-20b',`${matejko('sobieski.jpg','Sobieski pod Wiedniem')}Bitwa pod Wiedniem odbyła się w roku ${R('MDCLXXXIII')}. W którym wieku?`, Rs(['XVI','XVII','XVIII','VII']),1,`${R('MDCLXXXIII')} = 1683. Wiek XVII to lata 1601–1700, więc <b>${R('XVII')} wiek</b>.`),
 qv('rz-21a',`${photo('kolumna.jpg','Kolumna Zygmunta w Warszawie','Fot. Adrian Grycuk, CC BY-SA 3.0 PL')}Kolumnę Zygmunta w Warszawie postawiono w roku ${R('<b>MDCXLIV</b>')}. Który to rok?`, ['1644','1664','1646','1444'],0,`M = 1000, D = 500, C = 100, XL = 40, IV = 4. Razem <b>1644</b>.`),
 qv('rz-21b',`${photo('kolumna.jpg','Kolumna Zygmunta w Warszawie','Fot. Adrian Grycuk, CC BY-SA 3.0 PL')}Kolumnę Zygmunta postawiono w roku ${R('MDCXLIV')}. W którym wieku?`, Rs(['XVI','XVII','XVIII','XIV']),1,`${R('MDCXLIV')} = 1644. Wiek XVII to lata 1601–1700, więc <b>${R('XVII')} wiek</b>.`),
 qv('rz-22a',`${matejko('grunwald.jpg','Bitwa pod Grunwaldem')}Bitwa pod Grunwaldem odbyła się w roku ${R('<b>MCDX</b>')}. Który to rok?`, ['1610','1410','1390','1460'],1,`M = 1000, CD = 400, X = 10. Razem <b>1410</b>.`),
 qv('rz-22b',`${matejko('grunwald.jpg','Bitwa pod Grunwaldem')}Jan Matejko ukończył ten obraz w roku ${R('<b>MDCCCLXXVIII</b>')}. Który to rok?`, ['1878','1828','1873','1898'],0,`M = 1000, D = 500, CCC = 300, L = 50, XX = 20, V = 5, III = 3. Razem <b>1878</b>.`),
 q('rz-23',`${photo('pkin.jpg','Pałac Kultury i Nauki w Warszawie','Fot. Kallerna, CC BY-SA 4.0')}Pałac Kultury i Nauki w Warszawie oddano do użytku w roku ${R('<b>MCMLV</b>')}. Który to rok?`, ['1955','1945','1965','1555'],0,`M = 1000, CM = 900, L = 50, V = 5. Razem <b>1955</b>.`),
 q('rz-24',`Mikołaj Kopernik urodził się w roku ${R('<b>MCDLXXIII</b>')}. Który to rok?`, ['1473','1673','1523','1453'],0,`M = 1000, CD = 400, L = 50, XX = 20, III = 3. Razem <b>1473</b>.`),
 q('rz-25',`Igrzyska w Paryżu w 2024 roku to Igrzyska ${R('<b>XXXIII</b>')} Olimpiady. Które to igrzyska?`, ['23.','33.','38.','31.'],1,`XXX = 30, III = 3. To <b>33.</b> igrzyska.`),
 q('rz-26',`Na tarczy zegara z cyframi rzymskimi wskazówka godzinowa pokazuje ${R('X')}, a minutowa ${R('XII')}. Która jest godzina?`, ['12:10','10:00','10:12','2:00'],1,`Minutowa na XII oznacza pełną godzinę, a godzinowa na X — dziesiątą. Jest <b>10:00</b>.`),
 q('rz-27',`Oblicz: ${R('<b>XI + LXXIV</b>')}`, Rs(['LXXV','LXXXV','XCV','LXXXIV']),1,`XI = 11, LXXIV = 74. 11 + 74 = 85 = <b>${R('LXXXV')}</b>.`),
 q('rz-28',`Oblicz: ${R('<b>C − XL</b>')}`, Rs(['LX','XC','CXL','LXX']),0,`C = 100, XL = 40. 100 − 40 = 60 = <b>${R('LX')}</b>.`),
 q('rz-29',`Oblicz: ${R('<b>XII · V</b>')}`, Rs(['XVII','LX','LV','XL']),1,`12 · 5 = 60 = <b>${R('LX')}</b>. XVII to 12 + 5.`),
 q('rz-30',`Oblicz: ${R('<b>M − CD</b>')}`, Rs(['DC','CM','MCD','D']),0,`M = 1000, CD = 400. 1000 − 400 = 600 = <b>${R('DC')}</b>.`),
 q('rz-31',`Oblicz: ${R('<b>XLV + LV</b>')}`, Rs(['XC','C','CX','LC']),1,`45 + 55 = 100 = <b>${R('C')}</b>.`),
 q('rz-32',`Jedna cyfra liczby została zamazana, ale da się ją odczytać!<span class="roman roman-big">XV${blot}II</span>Jaka to liczba?`, ['17','18','19','16'],1,`Po V mogą stać tylko jedynki (najwyżej trzy). Pod plamą jest I: ${R('XVIII')} = <b>18</b>.`),
 q('rz-33',`Jedna cyfra liczby została zamazana, ale da się ją odczytać!<span class="roman roman-big">LX${blot}VIII</span>Jaka to liczba?`, ['68','78','88','74'],1,`Pod plamą może być tylko X (LXIVIII czy LXVVIII są niepoprawne). ${R('LXXVIII')} = 50 + 20 + 8 = <b>78</b>.`),
 q('rz-34','Który zapis rzymski jest <b>niepoprawny</b>?', Rs(['XL','XC','IC','CM']),2,`${RULES} I można odjąć tylko od V i X, więc <b>${R('IC')}</b> jest błędne (99 = XCIX).`),
 q('rz-35','Która liczba jest <b>największa</b>?', Rs(['XC','LXXX','CX','XCIX']),2,`XC = 90, LXXX = 80, CX = 110, XCIX = 99. Największa jest <b>${R('CX')}</b>.`),
 q('rz-36','Z ilu znaków składa się zapis rzymski liczby 38?', ['5','6','7','8'],2,`38 = XXXVIII: X, X, X, V, I, I, I — razem <b>7</b> znaków.`),
];

// Klasa 5: liczby pierwsze i złożone, dzielniki, rozkład na czynniki pierwsze.
const cloud = (nums) => `<div class="number-cloud">${nums.map(n => `<span>${n}</span>`).join('')}</div>`;
const grouped = (group, item) => ({...item, sourceGroup: group});

export const primeQuestions = [
 q('lp-1','Które liczby to <b>wszystkie dzielniki</b> liczby 18?', ['1, 2, 3, 6, 9, 18','2, 3, 6, 9','1, 2, 3, 9, 18','1, 3, 6, 18'],0,'Szukamy par, które dają 18: 1 · 18, 2 · 9, 3 · 6. Dzielniki: <b>1, 2, 3, 6, 9, 18</b>. Nie zapominamy o 1 i o samej liczbie.'),
 q('lp-2','Ile dzielników ma liczba 24?', ['6','7','8','9'],2,'Pary: 1 · 24, 2 · 12, 3 · 8, 4 · 6. Dzielniki: 1, 2, 3, 4, 6, 8, 12, 24 — razem <b>8</b>.'),
 q('lp-3','Która z liczb jest <b>liczbą pierwszą</b>?', ['21','27','29','33'],2,'21 = 3 · 7, 27 = 3 · 9, 33 = 3 · 11. Liczba <b>29</b> ma tylko dwa dzielniki: 1 i 29.'),
 q('lp-4','Która z liczb jest <b>liczbą złożoną</b>?', ['13','17','19','57'],3,'Suma cyfr liczby 57 to 12, a 12 dzieli się przez 3, więc <b>57</b> też dzieli się przez 3 (57 = 3 · 19). 13, 17 i 19 to liczby pierwsze.'),
 q('lp-5','Liczba 1 jest:', ['liczbą pierwszą','liczbą złożoną','ani pierwszą, ani złożoną','jednocześnie pierwszą i złożoną'],2,'Liczba pierwsza ma dokładnie dwa dzielniki, a złożona — więcej niż dwa. Jedynka ma tylko jeden dzielnik, więc jest <b>ani pierwsza, ani złożona</b>.'),
 q('lp-6','Ile jest liczb pierwszych mniejszych od 20?', ['7','8','9','10'],1,'2, 3, 5, 7, 11, 13, 17, 19 — razem <b>8</b>.'),
 q('lp-7','Jedyna <b>parzysta</b> liczba pierwsza to:', ['0','2','4','1'],1,'Każda inna liczba parzysta dzieli się przez 2, więc ma co najmniej trzy dzielniki. Jedyna parzysta liczba pierwsza to <b>2</b>.'),
 q('lp-8',`${cloud([504,4525,6454,1581,1750,2383,7537])}Wśród liczb w chmurce są dwie liczby pierwsze. Które?`, ['1581 i 2383','2383 i 7537','4525 i 7537','1581 i 7537'],1,'504, 6454 i 1750 są parzyste. 4525 kończy się cyfrą 5. 1581 ma sumę cyfr 15, więc dzieli się przez 3. Zostają <b>2383 i 7537</b>.'),
 q('lp-9','Jak wygląda rozkład liczby 110 na czynniki pierwsze?', ['2 · 55','2 · 5 · 11','10 · 11','2 · 5 · 5 · 11'],1,'110 = 2 · 55 = 2 · 5 · 11, a wszystkie trzy czynniki są pierwsze: <b>2 · 5 · 11</b>. Liczby 55 i 10 nie są pierwsze.'),
 q('lp-10','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 3 · 3 · 5 · 7</b>. Co to za liczba?', ['210','630','315','1260'],1,'Najprościej połączyć 2 · 5 = 10 oraz 3 · 3 · 7 = 63. Wtedy 10 · 63 = <b>630</b>.'),
 qv('lp-11a','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 3 · 5 · 11</b>. Co to za liczba?', ['330','300','231','660'],0,'2 · 5 = 10, 3 · 11 = 33, a 10 · 33 = <b>330</b>.'),
 qv('lp-11b','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 3 · 5 · 11</b>. Przez którą z liczb ta liczba <b>nie</b> jest podzielna?', ['10','6','4','15'],2,'10 = 2 · 5, 6 = 2 · 3, 15 = 3 · 5 — te czynniki są w rozkładzie. Do <b>4</b> = 2 · 2 potrzeba dwóch dwójek, a jest tylko jedna.'),
 qv('lp-11c','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 3 · 5 · 11</b>. Przez którą z liczb ta liczba jest podzielna?', ['4','7','22','9'],2,'<b>22</b> = 2 · 11, a oba czynniki są w rozkładzie. 7 w rozkładzie nie ma, a 4 i 9 wymagałyby dwóch dwójek lub dwóch trójek.'),
 qv('lp-12a','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 2 · 3 · 7 · 7 · 11</b>. Nie obliczając tej liczby, wskaż, przez którą <b>nie</b> jest podzielna.', ['2','3','5','7'],2,'W rozkładzie są dwójki, trójka i siódemki, ale nie ma piątki. Liczba <b>nie dzieli się przez 5</b>.'),
 qv('lp-12b','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 2 · 3 · 7 · 7 · 11</b>. Nie obliczając tej liczby, wskaż, przez którą jest podzielna.', ['9','12','8','5'],1,'<b>12</b> = 2 · 2 · 3 — wszystkie te czynniki są w rozkładzie. 9 wymaga dwóch trójek, a 8 — trzech dwójek.'),
 grouped('lp-12', pair('lp-12c','Liczba o rozkładzie 2 · 2 · 3 · 7 · 7 · 11 dzieli się przez 49.','Liczba o rozkładzie 2 · 2 · 3 · 7 · 7 · 11 dzieli się przez 9.','PF','49 = 7 · 7, a w rozkładzie są dwie siódemki — I jest prawdziwe. 9 = 3 · 3, a trójka jest tylko jedna — II jest fałszywe. <b>P, F</b>.')),
 qv('lp-13a','Z 24 kostek można ułożyć prostopadłościan 2 × 3 × 4. Z której liczby kostek da się ułożyć prostopadłościan, którego <b>każda krawędź</b> jest dłuższa niż krawędź jednej kostki?', ['17','14','12','13'],2,'Potrzebne są trzy wymiary, każdy co najmniej 2, czyli co najmniej trzy czynniki pierwsze. <b>12</b> = 2 · 2 · 3, więc prostopadłościan 2 × 2 × 3. 17 i 13 są pierwsze, a 14 = 2 · 7 ma tylko dwa czynniki.'),
 qv('lp-13b','Z 24 kostek można ułożyć prostopadłościan 2 × 3 × 4. Z której liczby kostek <b>nie</b> da się ułożyć prostopadłościanu, którego każda krawędź jest dłuższa niż krawędź jednej kostki?', ['12','500','14','8'],2,'<b>14</b> = 2 · 7 ma tylko dwa czynniki pierwsze, więc trzeci wymiar musiałby wynosić 1. Pozostałe: 12 = 2 × 2 × 3, 500 = 5 × 10 × 10, 8 = 2 × 2 × 2.'),
 q('lp-14','Jak wygląda rozkład liczby 84 na czynniki pierwsze?', ['2 · 42','2 · 2 · 3 · 7','4 · 3 · 7','2 · 3 · 7'],1,'84 = 2 · 42 = 2 · 2 · 21 = <b>2 · 2 · 3 · 7</b>. 4 nie jest liczbą pierwszą, a 2 · 3 · 7 to tylko 42.'),
 q('lp-15','Jak wygląda rozkład liczby 360 na czynniki pierwsze?', ['2 · 2 · 2 · 3 · 3 · 5','2 · 2 · 3 · 3 · 5','2 · 2 · 2 · 3 · 5','2 · 3 · 3 · 4 · 5'],0,'360 = 36 · 10 = (2 · 2 · 3 · 3) · (2 · 5) = <b>2 · 2 · 2 · 3 · 3 · 5</b>.'),
 q('lp-16','Który zapis jest <b>rozkładem liczby 72 na czynniki pierwsze</b>?', ['72 = 8 · 9','72 = 2 · 2 · 2 · 9','72 = 2 · 2 · 2 · 3 · 3','72 = 2 · 36'],2,'W rozkładzie na czynniki pierwsze wszystkie czynniki muszą być liczbami pierwszymi. 8, 9 i 36 nimi nie są. Poprawnie: <b>2 · 2 · 2 · 3 · 3</b>.'),
 q('lp-17','Jaka jest najmniejsza <b>dwucyfrowa</b> liczba pierwsza?', ['10','11','13','12'],1,'10 = 2 · 5, a <b>11</b> dzieli się tylko przez 1 i 11.'),
 q('lp-18','Jaka jest największa liczba pierwsza mniejsza od 100?', ['99','97','95','98'],1,'98 jest parzysta, 95 kończy się cyfrą 5, a 99 ma sumę cyfr 18, więc dzieli się przez 3 i przez 9. Zostaje <b>97</b> — liczba pierwsza.'),
 q('lp-19','Która z liczb ma <b>dokładnie dwa</b> dzielniki?', ['1','9','23','25'],2,'Dokładnie dwa dzielniki ma liczba pierwsza. <b>23</b>: dzielniki 1 i 23. 9 ma trzy dzielniki (1, 3, 9), 25 też (1, 5, 25), a 1 tylko jeden.'),
 q('lp-20','Która z liczb jest <b>liczbą pierwszą</b>?', ['51','57','87','89'],3,'Sprawdź sumy cyfr: 51 (6), 57 (12), 87 (15) — wszystkie dzielą się przez 3. <b>89</b> jest pierwsza.'),
 q('lp-21','Liczba 111 jest:', ['liczbą pierwszą','złożoną, bo dzieli się przez 3','złożoną, bo jest nieparzysta','pierwszą, bo nie dzieli się przez 2 ani przez 5'],1,'Suma cyfr: 1 + 1 + 1 = 3, a 3 dzieli się przez 3. Zatem 111 dzieli się przez 3 (111 = 3 · 37) i jest <b>złożona</b>. Nieparzystość niczego nie przesądza.'),
 q('lp-22','Suma dwóch liczb pierwszych wynosi 20, a ich iloczyn 91. Co to za liczby?', ['3 i 17','7 i 13','9 i 11','1 i 19'],1,'7 + 13 = 20 i 7 · 13 = 91: <b>7 i 13</b>. 3 + 17 = 20, ale 3 · 17 = 51; 9 i 1 nie są liczbami pierwszymi.'),
 q('lp-23','Jak wygląda rozkład liczby 150 na czynniki pierwsze?', ['2 · 3 · 5 · 5','2 · 3 · 25','2 · 5 · 15','3 · 5 · 10'],0,'150 = 2 · 75 = 2 · 3 · 25 = <b>2 · 3 · 5 · 5</b>. 25, 15 i 10 nie są liczbami pierwszymi.'),
 q('lp-24','Z ilu czynników pierwszych (licząc powtórzenia) składa się rozkład liczby 96?', ['4','5','6','7'],2,'96 = 2 · 48 = 2 · 2 · 24 = … = 2 · 2 · 2 · 2 · 2 · 3. Razem <b>6</b> czynników.'),
 pair('lp-25','Każda liczba nieparzysta jest liczbą pierwszą.','Każda liczba pierwsza większa od 2 jest nieparzysta.','FP','I jest fałszywe: np. 9 = 3 · 3 jest nieparzysta i złożona. II jest prawdziwe: liczba parzysta większa od 2 dzieli się przez 2. <b>F, P</b>.'),
 q('lp-26','Rozkład pewnej liczby na czynniki pierwsze to <b>2 · 2 · 5 · 5</b>. Co to za liczba?', ['20','50','100','200'],2,'2 · 5 = 10, więc (2 · 5) · (2 · 5) = 10 · 10 = <b>100</b>.'),
 q('lp-27','W rozkładzie której liczby na czynniki pierwsze występuje <b>7</b>?', ['90','98','75','64'],1,'<b>98</b> = 2 · 7 · 7. Pozostałe: 90 = 2 · 3 · 3 · 5, 75 = 3 · 5 · 5, 64 = 2 · 2 · 2 · 2 · 2 · 2.'),
 q('lp-28','Ile jest liczb pierwszych między 20 a 30?', ['1','2','3','4'],1,'21 = 3 · 7, 22, 24, 26, 28 są parzyste, 25 = 5 · 5, 27 = 3 · 9. Pierwsze są tylko 23 i 29 — razem <b>2</b>.'),
 q('lp-29','Które liczby to <b>wszystkie dzielniki</b> liczby 30?', ['1, 2, 3, 5, 6, 10, 15, 30','2, 3, 5','1, 2, 3, 5, 10, 15, 30','1, 3, 5, 6, 10, 30'],0,'Pary: 1 · 30, 2 · 15, 3 · 10, 5 · 6. Dzielniki: <b>1, 2, 3, 5, 6, 10, 15, 30</b>. 2, 3, 5 to tylko dzielniki pierwsze.'),
];

// Klasa 5: kolejność wykonywania działań — co najpierw, wynik, porównywanie, zadania tekstowe.
// Wariant „a” pyta o pierwsze działanie, „b” o wynik tego samego wyrażenia (jedna grupa).
const first = (e) => `Które działanie wykonamy <b>jako pierwsze</b> w wyrażeniu <b>${e}</b>?`;
const result = (e) => `Oblicz: <b>${e}</b>`;
const compare = (a, b) => `Które wyrażenie ma większą wartość?<div class="task-statements">A = ${a}<br>B = ${b}</div>`;
const AB = ['A','B','Mają równe wartości','Nie da się porównać'];
const prices = 'Cennik: <b>zeszyt — 3 zł</b>, <b>ołówek — 2 zł</b>.<br>';
const shop = 'Ola kupiła 3 batoniki po 4 zł i 2 soki po 5 zł. Zapłaciła banknotem 50 zł.';

export const orderQuestions = [
 qv('kd-1a',first('4 + 6 · 3'), ['4 + 6','6 · 3','4 + 3','Kolejność nie ma znaczenia'],1,'Mnożenie i dzielenie wykonujemy <b>przed</b> dodawaniem i odejmowaniem. Najpierw <b>6 · 3</b>.'),
 qv('kd-1b',result('4 + 6 · 3'), ['30','22','13','24'],1,'Najpierw mnożenie: 6 · 3 = 18, potem 4 + 18 = <b>22</b>. Wynik 30 to (4 + 6) · 3.'),
 qv('kd-2a',first('(9 − 4) · 2'), ['9 − 4','4 · 2','9 · 2','9 − 2'],0,'Działania w nawiasie wykonujemy najpierw: <b>9 − 4</b>.'),
 qv('kd-2b',result('(9 − 4) · 2'), ['10','1','14','18'],0,'Nawias: 9 − 4 = 5, potem 5 · 2 = <b>10</b>. Wynik 1 to 9 − 4 · 2, czyli bez nawiasu.'),
 qv('kd-3a',first('20 − 12 : 4 + 1'), ['20 − 12','12 : 4','4 + 1','20 + 1'],1,'Dzielenie ma pierwszeństwo przed odejmowaniem i dodawaniem: najpierw <b>12 : 4</b>.'),
 qv('kd-3b',result('20 − 12 : 4 + 1'), ['3','18','16','9'],1,'12 : 4 = 3. Potem od lewej: 20 − 3 = 17, 17 + 1 = <b>18</b>.'),
 qv('kd-4a',first('18 : 3 · 2'), ['18 : 3','3 · 2','18 · 2','Kolejność nie ma znaczenia'],0,'Mnożenie i dzielenie są „równoważne” — wykonujemy je <b>od lewej do prawej</b>. Najpierw <b>18 : 3</b>.'),
 qv('kd-4b',result('18 : 3 · 2'), ['3','12','9','36'],1,'Od lewej: 18 : 3 = 6, potem 6 · 2 = <b>12</b>. Wynik 3 powstaje, gdy błędnie zaczniemy od 3 · 2.'),
 qv('kd-5a',first('30 − 8 + 5'), ['30 − 8','8 + 5','30 + 5','8 − 5'],0,'Dodawanie i odejmowanie wykonujemy <b>od lewej do prawej</b>. Najpierw <b>30 − 8</b>.'),
 qv('kd-5b',result('30 − 8 + 5'), ['17','27','43','25'],1,'Od lewej: 30 − 8 = 22, 22 + 5 = <b>27</b>. Wynik 17 to 30 − (8 + 5).'),
 qv('kd-6a',first(`5 + 2 · ${p(3,2)}`), ['5 + 2','2 · 3',p(3,2),'5 + 3'],2,`Potęgowanie wykonujemy przed mnożeniem i dodawaniem. Najpierw <b>${p(3,2)}</b>.`),
 qv('kd-6b',result(`5 + 2 · ${p(3,2)}`), ['41','23','63','49'],1,`${p(3,2)} = 9, potem 2 · 9 = 18, na końcu 5 + 18 = <b>23</b>.`),
 qv('kd-7a',first('40 : [2 · (7 − 3)]'), ['40 : 2','2 · 7','7 − 3','2 · 3'],2,'Najpierw nawias okrągły, który jest najgłębiej: <b>7 − 3</b>. Potem nawias kwadratowy.'),
 qv('kd-7b',result('40 : [2 · (7 − 3)]'), ['5','80','16','10'],0,'7 − 3 = 4, 2 · 4 = 8, 40 : 8 = <b>5</b>. Wynik 80 to 40 : 2 · 4, czyli bez nawiasu kwadratowego.'),
 q('kd-8',result('(4 + 6) · 3'), ['22','30','13','18'],1,'Nawias: 4 + 6 = 10, potem 10 · 3 = <b>30</b>.'),
 q('kd-9',result('24 − 3 · (10 − 6)'), ['84','12','18','60'],1,'Nawias: 10 − 6 = 4. Mnożenie: 3 · 4 = 12. Odejmowanie: 24 − 12 = <b>12</b>.'),
 q('kd-10',result('6 · 5 − 4 · 3'), ['78','18','54','42'],1,'Oba mnożenia najpierw: 30 i 12. Potem 30 − 12 = <b>18</b>.'),
 q('kd-11',result('[(8 + 4) : 3 − 1] · 5'), ['15','55','10','3'],0,'8 + 4 = 12, 12 : 3 = 4, 4 − 1 = 3, a 3 · 5 = <b>15</b>.'),
 q('kd-12',result(`${p(2,3)} + 4 · 5`), ['60','28','50','26'],1,`${p(2,3)} = 8, 4 · 5 = 20, 8 + 20 = <b>28</b>.`),
 q('kd-13',result(`${p(10,2)} − ${p(6,2)}`), ['16','64','4','136'],1,`${p(10,2)} = 100, ${p(6,2)} = 36, 100 − 36 = <b>64</b>. Wynik 16 to (10 − 6)<sup>2</sup>.`),
 q('kd-14',result('36 : (2 + 7) · 2'), ['2','8','18','20'],1,'Nawias: 2 + 7 = 9. Potem od lewej: 36 : 9 = 4, 4 · 2 = <b>8</b>.'),
 q('kd-15',result('7 · 0 + 7 : 1'), ['0','7','14','1'],1,'7 · 0 = 0, 7 : 1 = 7, 0 + 7 = <b>7</b>.'),
 q('kd-16',compare('3 + 4 · 5','(3 + 4) · 5'), AB,1,'A = 3 + 20 = 23, B = 7 · 5 = 35. Większe jest <b>B</b>.'),
 q('kd-17',compare('48 : 4 · 2','48 : (4 · 2)'), AB,0,'A = 12 · 2 = 24, B = 48 : 8 = 6. Większe jest <b>A</b>.'),
 q('kd-18',compare('50 − 20 − 10','50 − (20 − 10)'), AB,1,'A = 30 − 10 = 20, B = 50 − 10 = 40. Większe jest <b>B</b>.'),
 q('kd-19',compare(`2 · ${p(3,2)}`,'(2 · 3)<sup>2</sup>'), AB,1,`A = 2 · 9 = 18, B = ${p(6,2)} = 36. Większe jest <b>B</b>.`),
 q('kd-20',compare('12 + 8 : 4','12 : 4 + 8'), AB,0,'A = 12 + 2 = 14, B = 3 + 8 = 11. Większe jest <b>A</b>.'),
 q('kd-21',compare('6 · 4 : 2','6 · (4 : 2)'), AB,2,'A = 24 : 2 = 12, B = 6 · 2 = 12. Wartości są <b>równe</b>.'),
 q('kd-22','Które wyrażenie ma <b>największą</b> wartość?', ['2 + 3 · 4','(2 + 3) · 4','2 · 3 + 4','2 · (3 + 4)'],1,'2 + 12 = 14; 5 · 4 = <b>20</b>; 6 + 4 = 10; 2 · 7 = 14. Największe jest <b>(2 + 3) · 4</b>.'),
 q('kd-23',`${prices}Kasia kupiła 4 zeszyty i 1 ołówek. Którym wyrażeniem obliczysz, ile zapłaciła?`, ['4 · 3 + 2','(4 + 1) · 3','4 · (3 + 2)','4 + 3 + 2'],0,'4 zeszyty po 3 zł to 4 · 3, do tego ołówek 2 zł: <b>4 · 3 + 2</b> = 14 zł.'),
 q('kd-24',`${prices}Tomek kupił 2 zeszyty i 2 ołówki. Którym wyrażeniem obliczysz, ile zapłacił?`, ['2 · 3 + 2','2 · (3 + 2)','2 + 3 · 2','(2 + 2) · 3'],1,'Tomek kupił 2 komplety „zeszyt + ołówek”: <b>2 · (3 + 2)</b> = 10 zł. Bez nawiasu wyszłoby za mało.'),
 q('kd-25','Na parkingu stoją 4 samochody i 3 rowery. Samochód ma 4 koła, a rower 2. Którym wyrażeniem obliczysz liczbę wszystkich kół?', ['(4 + 3) · 4','4 · 4 + 3 · 2','4 · 4 + 3 + 2','4 + 4 · 3 + 2'],1,'Koła samochodów: 4 · 4 = 16, koła rowerów: 3 · 2 = 6. Razem <b>4 · 4 + 3 · 2</b> = 22.'),
 q('kd-26','Przed przedszkolem stoi 5 rowerków trójkołowych i 2 hulajnogi (każda ma 2 kółka). Ile kółek mają razem?', ['19','21','14','35'],0,'5 · 3 + 2 · 2 = 15 + 4 = <b>19</b>. Wynik 21 to (5 + 2) · 3.'),
 qv('kd-27a',`${shop} Którym wyrażeniem obliczysz, ile reszty dostała?`, ['50 − 3 · 4 + 2 · 5','50 − (3 · 4 + 2 · 5)','50 − 3 − 4 − 2 − 5','(50 − 3) · 4 − 2 · 5'],1,'Zakupy kosztowały 3 · 4 + 2 · 5 i całą tę kwotę odejmujemy od 50: <b>50 − (3 · 4 + 2 · 5)</b>. Bez nawiasu soki zostałyby dodane zamiast odjęte.'),
 qv('kd-27b',`${shop} Ile reszty dostała?`, ['28 zł','48 zł','36 zł','22 zł'],0,'Batoniki: 3 · 4 = 12 zł, soki: 2 · 5 = 10 zł. Razem 22 zł, a reszta 50 − 22 = <b>28 zł</b>.'),
 qv('kd-27c',`${shop} Które wyrażenie <b>również</b> pozwala obliczyć resztę?`, ['50 − 3 · 4 − 2 · 5','50 − 3 · 4 + 2 · 5','50 − (3 + 4 + 2 + 5)','50 − 3 · (4 + 2) · 5'],0,'Można odejmować po kolei: najpierw koszt batoników, potem soków: <b>50 − 3 · 4 − 2 · 5</b> = 50 − 12 − 10 = 28.'),
 q('kd-28','Bilet do kina kosztuje 18 zł, a duży popcorn 12 zł. Rodzina kupiła 3 bilety i jeden popcorn. Ile zapłaciła?', ['90 zł','66 zł','54 zł','33 zł'],1,'3 · 18 + 12 = 54 + 12 = <b>66 zł</b>. Wynik 90 zł to 3 · (18 + 12), czyli trzy popcorny.'),
 q('kd-29','Pani podzieliła 60 cukierków po równo między 5 dzieci, a każde dziecko zjadło od razu 4 cukierki. Ile cukierków zostało każdemu dziecku?', ['8','60','12','56'],0,'Każde dziecko dostało 60 : 5 = 12 cukierków, a po zjedzeniu 4 zostało 12 − 4 = <b>8</b>. Wyrażenie: 60 : 5 − 4.'),
 q('kd-30','Gdzie wstawić nawias w wyrażeniu <b>3 + 5 · 2</b>, aby jego wartość wynosiła 16?', ['(3 + 5) · 2','3 + (5 · 2)','3 + 5 · (2)','Nie da się'],0,'(3 + 5) · 2 = 8 · 2 = <b>16</b>. Bez nawiasu, a także z nawiasem 3 + (5 · 2), wynik to 13.'),
 pair('kd-31','20 − 5 · 2 = 30','20 : 5 · 2 = 8','FP','I: najpierw mnożenie, 20 − 10 = 10, a nie 30 — fałsz. II: od lewej, 20 : 5 = 4, 4 · 2 = 8 — prawda. <b>F, P</b>.'),
];
