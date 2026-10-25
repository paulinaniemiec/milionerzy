// Klasa 8, dział II: wyrażenia algebraiczne — zapisywanie, jednomiany, wartość wyrażenia, redukcja wyrazów podobnych,
// opuszczanie nawiasów, mnożenie jednomianu przez sumę, obwody i pola figur, upraszczanie i obliczanie wartości.
// Zadania ułożone od najłatwiejszych do najtrudniejszych (scenariusz ma `ordered`).
// Podpunkty jednego zadania mają wspólną grupę: wa8-5a i wa8-5b to jedno zadanie.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
const f = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
// Zapis matematyczny: litery kursywą, ^2 jako potęga, - jako minus. Znaczniki HTML (np. ułamki) zostają bez zmian.
const E = (s) => s.replace(/<[^>]*>|[a-z]|\^\d+|-/g, (m) => m[0] === '<' ? m : m === '-' ? '−' : m[0] === '^' ? `<sup>${m.slice(1)}</sup>` : `<i>${m}</i>`);
const A = (...answers) => answers.map(E);
const simplify = (id, expr, answers, correct, explain) => q(id, `Zapisz w najprostszej postaci: <b>${E(expr)}</b>`, A(...answers), correct, explain);
const reduce = (id, expr, answers, correct, explain) => q(id, `Zredukuj wyrazy podobne: <b>${E(expr)}</b>`, A(...answers), correct, explain);
const value = (id, expr, vals, answers, correct, explain) => q(id, `Wartość wyrażenia <b>${E(expr)}</b> dla ${vals} jest równa:`, A(...answers), correct, explain);
const truth = (id, a, b, t, explain) => q(id, `Oceń prawdziwość zdań.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP', 'PF', 'FP', 'FF'].indexOf(t), explain);

// Rysunki figur: podpisy boków jak w zeszycie, zmienne kursywą.
const label = (x, y, s, anchor = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="#f6c85c" font-family="Arial, sans-serif" font-size="16">${s.replace(/[a-z]/g, (c) => `<tspan font-style="italic">${c}</tspan>`).replace(/-/g, '−')}</text>`;
const figure = (caption, body, desc) => `<figure class="exam-chart"><figcaption>${caption}</figcaption><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 235" role="img" aria-label="${desc}">${body}</svg></figure>`;
const shape = (points) => `<polygon points="${points}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>`;
const pentagon = figure('Wielokąt', shape('60,60 250,25 330,110 290,200 80,210') + label(150, 32, '2a + 3') + label(300, 60, '7', 'start') + label(318, 165, 'a + b - 2', 'start') + label(185, 228, '3b + 1') + label(62, 140, '2a + b', 'end'),
 'Pięciokąt o bokach: 2a + 3, 7, a + b − 2, 3b + 1, 2a + b');
const quad = figure('Czworokąt', shape('80,40 290,40 340,195 55,195') + label(185, 30, 'x + 2y') + label(322, 115, '3x - 1', 'start') + label(197, 220, '2y + 5') + label(62, 120, '4x', 'end'),
 'Czworokąt o bokach: x + 2y, 3x − 1, 2y + 5, 4x');
const rect = figure('Prostokąt', shape('110,40 300,40 300,180 110,180') + label(205, 205, '3x + 2') + label(100, 115, '4x', 'end'),
 'Prostokąt o bokach 3x + 2 i 4x');
const trap = figure('Trapez', shape('130,45 250,45 360,190 40,190') + '<path d="M190 45V190" stroke="#ff9d9d" stroke-width="2.5"/><path d="M190 178H202V190" fill="none" stroke="#ff9d9d" stroke-width="2"/>' + label(190, 35, '3x') + label(200, 125, 'y', 'start') + label(200, 214, '5x + 4'),
 'Trapez o podstawach 3x i 5x + 4 oraz wysokości y');
const ell = figure('Figura złożona z prostokątów', shape('60,30 170,30 170,110 340,110 340,190 60,190') + label(115, 22, '2x') + label(180, 75, 'y', 'start') + label(350, 155, '3', 'start') + label(200, 214, '4x + 2'),
 'Figura w kształcie litery L: górna część ma szerokość 2x i wysokość y, dolny pas ma szerokość 4x + 2 i wysokość 3');
const ABC = `Dane są wyrażenia: <b>A = ${E('4x - 3')}</b>, <b>B = ${E('2x + 5')}</b> oraz <b>C = ${E('-3x')}</b>.`;
const BIKE = `Rowerzysta jechał przez <i>t</i> godzin. Przez 40% tego czasu jechał z prędkością 20 km/h, przez 25% czasu — 16 km/h, a w pozostałym czasie — 12 km/h.`;

export const algebraQuestions8 = [
 // Zapisywanie wyrażeń
 q('wa8-1a','Kasia ma <i>x</i> zł, a Tomek o 15 zł więcej niż dwa razy tyle co Kasia. Które wyrażenie opisuje, ile złotych mają razem?',A('3x + 15','2x + 15','x + 15','3x + 30'),0,`Tomek ma ${E('2x + 15')}. Razem: ${E('x + 2x + 15')} = <b>${E('3x + 15')}</b>.`),
 q('wa8-1b','Które wyrażenie opisuje liczbę o 5 mniejszą od trzykrotności liczby <i>n</i>?',A('3(n - 5)','5 - 3n','3n - 5','n - 15'),2,`Trzykrotność to ${E('3n')}, a o 5 mniejsza: <b>${E('3n - 5')}</b>. ${E('3(n - 5)')} to trzykrotność liczby o 5 mniejszej.`),
 // Jednomiany
 q('wa8-2a',`Który jednomian jest podobny do <b>${E('3x^2y')}</b>?`,A('3xy^2','-5yx^2','3x^2','x^2y^2'),1,`Jednomiany podobne mają te same litery w tych samych potęgach. ${E('-5yx^2')} = ${E('-5x^2y')}, więc <b>${E('-5yx^2')}</b> jest podobny. Współczynnik i kolejność liter nie mają znaczenia.`),
 q('wa8-2b',`Współczynnik liczbowy jednomianu <b>−${f(2,3)}${E('a^2b')}</b> jest równy:`,[`−${f(2,3)}`,f(2,3),'−2','2'],0,`Współczynnik to liczba stojąca przed literami, razem ze znakiem: <b>−${f(2,3)}</b>. Wykładnik 2 nie jest współczynnikiem.`),
 // Wyrazy sumy algebraicznej
 q('wa8-3',`Ile wyrazów ma suma algebraiczna <b>${E('3x^2 - 2xy + 5 - y')}</b>?`,['4','3','5','2'],0,`Wyrazy to ${E('3x^2')}, ${E('-2xy')}, 5 i ${E('-y')} — razem <b>4</b>.`),
 // Wartość wyrażenia
 value('wa8-4a','a + b - ab + 5','<i>a</i> = 3 i <i>b</i> = −2',['12','0','16','-2'],0,'3 + (−2) − 3 · (−2) + 5 = 1 + 6 + 5 = <b>12</b>. Wynik 0 wychodzi, gdy −3 · (−2) policzy się jako −6.'),
 value('wa8-4b','x^2 - 3x + 1','<i>x</i> = −2',['3','11','-1','-9'],1,'(−2)² − 3 · (−2) + 1 = 4 + 6 + 1 = <b>11</b>. Pamiętaj: (−2)² = 4, a nie −4.'),
 value('wa8-4c','2xy^2 - y','<i>x</i> = −1 i <i>y</i> = 3',['-15','15','-21','-39'],2,'2 · (−1) · 3² − 3 = −18 − 3 = <b>−21</b>. Do kwadratu podnosimy tylko <i>y</i>.'),
 // Redukcja wyrazów podobnych
 reduce('wa8-5a','7a - 2b + 3b - 9a + c - 4c',['-2a + b - 3c','2a + b - 3c','-2a - b - 3c','-2a + b + 3c'],0,`${E('7a - 9a = -2a')}, ${E('-2b + 3b = b')}, ${E('c - 4c = -3c')}. Wynik: <b>${E('-2a + b - 3c')}</b>.`),
 reduce('wa8-5b','5xy + 3x - xy - 4y - 7x + 2y',['4xy + 4x - 2y','6xy - 4x - 2y','4xy - 4x + 2y','4xy - 4x - 2y'],3,`${E('5xy - xy = 4xy')}, ${E('3x - 7x = -4x')}, ${E('-4y + 2y = -2y')}. Wynik: <b>${E('4xy - 4x - 2y')}</b>.`),
 reduce('wa8-5c','6x^3 - 2x^2 + 5x - 9x^3 + 7x^2 - x',['3x^3 + 5x^2 + 4x','-3x^3 + 9x^2 + 4x','-3x^3 + 5x^2 + 4x','-3x^3 + 5x^2 + 6x'],2,`${E('6x^3 - 9x^3 = -3x^3')}, ${E('-2x^2 + 7x^2 = 5x^2')}, ${E('5x - x = 4x')}. Wynik: <b>${E('-3x^3 + 5x^2 + 4x')}</b>.`),
 reduce('wa8-5d','4a^2b - 3ab + 2ab^2 + 6ab - 5a^2b',['-a^2b + 3ab + 2ab^2','a^2b + 3ab + 2ab^2','-a^2b + 9ab + 2ab^2','ab^2 + 3ab'],0,`${E('4a^2b - 5a^2b = -a^2b')}, ${E('-3ab + 6ab = 3ab')}, a ${E('2ab^2')} nie ma pary — ${E('a^2b')} i ${E('ab^2')} to <i>nie</i> są wyrazy podobne. Wynik: <b>${E('-a^2b + 3ab + 2ab^2')}</b>.`),
 // Opuszczanie nawiasów
 q('wa8-6a',`Zapisz w postaci sumy: <b>${E('7m - (3k - 2n + 4)')}</b>`,A('7m - 3k - 2n + 4','7m - 3k + 2n - 4','7m - 3k - 2n - 4','7m + 3k - 2n + 4'),1,`Minus przed nawiasem zmienia znaki wszystkich wyrazów w nawiasie: <b>${E('7m - 3k + 2n - 4')}</b>.`),
 simplify('wa8-6b','5a + 3(b - 2c + a)',['8a + 3b - 2c','8a + b - 6c','6a + 3b - 6c','8a + 3b - 6c'],3,`${E('5a + 3b - 6c + 3a')} = <b>${E('8a + 3b - 6c')}</b>. Mnożymy przez 3 każdy wyraz w nawiasie.`),
 simplify('wa8-6c','4 - (2p - 5r) · 3',['4 - 6p + 15r','4 - 6p - 15r','12 - 6p + 15r','4 - 6p + 5r'],0,`${E('(2p - 5r) · 3 = 6p - 15r')}. Po odjęciu: ${E('4 - (6p - 15r)')} = <b>${E('4 - 6p + 15r')}</b>.`),
 simplify('wa8-6d','9y - (12a + 18b) : 6',['9y - 2a + 3b','9y - 12a - 3b','9y - 2a - 3b','9y - 2a - 18b'],2,`${E('(12a + 18b) : 6 = 2a + 3b')}. Po odjęciu: <b>${E('9y - 2a - 3b')}</b>.`),
 // Mnożenie jednomianu przez sumę
 simplify('wa8-7a','-3x(2x - 5)',['-6x^2 - 15x','-5x^2 + 15x','-6x^2 + 15x','-6x + 15'],2,`${E('-3x · 2x = -6x^2')} i ${E('-3x · (-5) = 15x')}. Wynik: <b>${E('-6x^2 + 15x')}</b>.`),
 simplify('wa8-7b','2ab(3a - b + 4)',['6a^2b - 2ab^2 + 8ab','6a^2b - 2ab^2 + 4','6a^2b + 2ab^2 + 8ab','12ab'],0,`Mnożymy każdy wyraz: ${E('6a^2b')}, ${E('-2ab^2')} i ${E('8ab')}. Wynik: <b>${E('6a^2b - 2ab^2 + 8ab')}</b>.`),
 // Działania na wyrażeniach A, B, C
 q('wa8-8a',`${ABC} Suma <b>A + B</b> w najprostszej postaci to:`,A('6x + 8','2x + 2','6x + 2','6x - 8'),2,`${E('4x - 3 + 2x + 5')} = <b>${E('6x + 2')}</b>.`),
 q('wa8-8b',`${ABC} Różnica <b>A − B</b> w najprostszej postaci to:`,A('2x + 2','2x - 8','2x - 2','6x - 8'),1,`${E('4x - 3 - (2x + 5) = 4x - 3 - 2x - 5')} = <b>${E('2x - 8')}</b>. Wynik ${E('2x + 2')} to zapomniany minus przed 5.`),
 q('wa8-8c',`${ABC} Iloczyn <b>B · C</b> w najprostszej postaci to:`,A('-6x^2 + 15x','-x + 5','-6x - 15x','-6x^2 - 15x'),3,`${E('(2x + 5) · (-3x) = -6x^2 - 15x')}. Wynik: <b>${E('-6x^2 - 15x')}</b>. ${E('-x + 5')} to suma B + C.`),
 // Które wyrażenie jest równe?
 q('wa8-9',`Które wyrażenie jest równe <b>${E('2(3a - b) - (a - 4b)')}</b>?`,A('5a - 6b','5a - 2b','7a + 2b','5a + 2b'),3,`${E('6a - 2b - a + 4b')} = <b>${E('5a + 2b')}</b>.`),
 // Obwód figury
 q('wa8-10a',`${pentagon}Które wyrażenie opisuje obwód tego wielokąta?`,A('5a + 5b + 9','5a + 4b + 9','5a + 5b + 7','4a + 5b + 9'),0,`Dodajemy wszystkie boki: ${E('2a + 3 + 7 + a + b - 2 + 3b + 1 + 2a + b')}. Litery <i>a</i>: 2 + 1 + 2 = 5, litery <i>b</i>: 1 + 3 + 1 = 5, liczby: 3 + 7 − 2 + 1 = 9. Obwód: <b>${E('5a + 5b + 9')}</b>.`),
 q('wa8-10b',`${quad}Które wyrażenie opisuje obwód tego czworokąta?`,A('8x + 4y + 6','7x + 4y + 4','8x + 2y + 4','8x + 4y + 4'),3,`${E('x + 2y + 3x - 1 + 2y + 5 + 4x')} = <b>${E('8x + 4y + 4')}</b>.`),
 // Pole figury
 q('wa8-11a',`${rect}Które wyrażenie opisuje pole tego prostokąta?`,A('7x + 2','12x^2 + 8x','12x^2 + 2','14x + 4'),1,`${E('4x · (3x + 2) = 12x^2 + 8x')}. Pole: <b>${E('12x^2 + 8x')}</b>. ${E('14x + 4')} to obwód.`),
 q('wa8-11b',`${trap}Które wyrażenie opisuje pole tego trapezu?`,A('4xy + 2y','8xy + 4y','4xy + 4y','4x + 2 + y'),0,`Pole trapezu: ${f(`(${E('3x + 5x + 4')}) · <i>y</i>`,'2')} = ${f(E('8xy + 4y'),'2')} = <b>${E('4xy + 2y')}</b>. ${E('8xy + 4y')} to zapomniane dzielenie przez 2.`),
 q('wa8-11c',`${ell}Które wyrażenie opisuje pole tej figury?`,A('2xy + 12x + 2','(4x + 2)(y + 3)','6xy + 12x + 6','2xy + 12x + 6'),3,`Górny prostokąt: ${E('2x · y = 2xy')}. Dolny pas: ${E('3(4x + 2) = 12x + 6')}. Razem: <b>${E('2xy + 12x + 6')}</b>. ${E('(4x + 2)(y + 3)')} to pole całego prostokąta, bez wycięcia.`),
 // Wartość wyrażenia z ułamkiem i iloczynem
 q('wa8-12a',`Oblicz wartość wyrażenia <b>(${f(1,2)}<i>x</i> − 1)(${f(1,3)}<i>x</i> − 2)</b> dla <i>x</i> = −6.`,['−16','−8','8','16'],3,`${f(1,2)} · (−6) − 1 = −4 i ${f(1,3)} · (−6) − 2 = −4. Iloczyn: (−4) · (−4) = <b>16</b>.`),
 q('wa8-12b',`Oblicz wartość wyrażenia <b>${f(E('x^2y + y'),E('2x'))}</b> dla <i>x</i> = −3 i <i>y</i> = 6.`,['10','8','−10','−12'],2,`Licznik: 9 · 6 + 6 = 60. Mianownik: 2 · (−3) = −6. Wartość: 60 : (−6) = <b>−10</b>. Wynik 8 wychodzi, gdy (−3)² policzy się jako −9.`),
 // Działania i redukcja
 simplify('wa8-13a','3(2xy - x) + 4x(y - 3x) + (12x^2 + 5x)',['10xy - 2x','10xy + 2x - 24x^2','6xy + 2x','10xy + 2x'],3,`${E('6xy - 3x + 4xy - 12x^2 + 12x^2 + 5x')} = <b>${E('10xy + 2x')}</b>. Wyrazy ${E('-12x^2')} i ${E('12x^2')} się redukują.`),
 simplify('wa8-13b','5ab(2a + b - 2) - 4a(b - 3) - 10a^2b',['5ab^2 - 14ab + 12a','5ab^2 - 6ab + 12a','5ab^2 - 14ab - 12a','20a^2b + 5ab^2 - 14ab + 12a'],0,`${E('10a^2b + 5ab^2 - 10ab - 4ab + 12a - 10a^2b')} = <b>${E('5ab^2 - 14ab + 12a')}</b>. Uwaga: ${E('-4a · (-3) = +12a')}.`),
 // Prawda czy fałsz
 truth('wa8-14a',`Wartość wyrażenia <b>${E('2x^2y - y^2')}</b> dla <i>x</i> = −3 i <i>y</i> = 2 jest równa <b>40</b>.`,`Dla <i>a</i> = 2 i <i>b</i> = −4 wartości wyrażeń <b>${f(E('a(6 + b)'),'2')}</b> oraz <b>${f(E('a^2 - b'),'4')}</b> są równe.`,'FP',`I: 2 · 9 · 2 − 4 = 36 − 4 = 32, a nie 40 — <b>fałsz</b>. II: ${f('2 · 2','2')} = 2 i ${f('4 + 4','4')} = 2 — <b>prawda</b>.`),
 truth('wa8-14b',`Wyrażenie <b>${E('3(x - 2) - (x - 6)')}</b> jest równe <b>${E('2x')}</b> dla każdej liczby <i>x</i>.`,`Wyrażenie <b>${E('2(x + 3) - 3(x - 1)')}</b> ma dla <i>x</i> = 5 wartość <b>−4</b>.`,'PF',`I: ${E('3x - 6 - x + 6 = 2x')} — <b>prawda</b>. II: ${E('2x + 6 - 3x + 3 = -x + 9')}, dla <i>x</i> = 5 to 4, a nie −4 — <b>fałsz</b>.`),
 // Procenty w wyrażeniach
 q('wa8-15','Kurtka kosztowała <i>x</i> zł. Jej cenę obniżono o 20%, a potem nową cenę jeszcze o 25%. Które wyrażenie opisuje cenę końcową?',A('0,6x','0,55x','0,45x','0,4x'),0,`Po pierwszej obniżce: ${E('0,8x')}. Po drugiej: ${E('0,75 · 0,8x')} = <b>${E('0,6x')}</b>. Cena spadła łącznie o 40%, a nie o 45%.`),
 // Uprość i oblicz
 q('wa8-16a',`Uprość wyrażenie <b>${E('2x(x - 3y) - x(2x - 5y)')}</b>, a następnie oblicz jego wartość dla <i>x</i> = 4 i <i>y</i> = −${f(1,2)}.`,['−2','−8','2','14'],2,`${E('2x^2 - 6xy - 2x^2 + 5xy = -xy')}. Dla <i>x</i> = 4 i <i>y</i> = −${f(1,2)}: −4 · (−${f(1,2)}) = <b>2</b>.`),
 q('wa8-16b',`Uprość wyrażenie <b>${E('0,4x(10x - 5y)')} + ${f(1,5)}${E('(-20x^2 + 15xy)')}</b>, a następnie oblicz jego wartość dla <i>x</i> = √2 i <i>y</i> = √8.`,['8','−4','2√2','4'],3,`${E('4x^2 - 2xy - 4x^2 + 3xy = xy')}. Dla <i>x</i> = √2 i <i>y</i> = √8: √2 · √8 = √16 = <b>4</b>.`),
 q('wa8-16c',`Uprość wyrażenie <b>${E('3x(x - 2y) - 2y(y - 3x)')}</b>, a następnie oblicz jego wartość dla <i>x</i> = 3 i <i>y</i> = −2.`,['91','19','35','−5'],1,`${E('3x^2 - 6xy - 2y^2 + 6xy = 3x^2 - 2y^2')}. Dla <i>x</i> = 3, <i>y</i> = −2: 27 − 8 = <b>19</b>. 91 wychodzi, gdy ${E('-2y · (-3x)')} policzy się jako ${E('-6xy')}.`),
 // Wartość niezależna od zmiennych
 q('wa8-17a',`Dla dowolnych <i>x</i> i <i>y</i> wartość wyrażenia <b>${E('4(x + y + 3) - 2y + 2(x - y) - 6x')}</b> jest równa:`,A('6x + 12','12','0','3'),1,`${E('4x + 4y + 12 - 2y + 2x - 2y - 6x')}: wyrazy z <i>x</i> i <i>y</i> się redukują, zostaje <b>12</b>.`),
 q('wa8-17b',`Dla dowolnych <i>x</i> i <i>y</i> wartość wyrażenia <b>${E('-2(6x^2y - 3xy^2 - 4) + 3xy(4x - 2y)')}</b> jest równa:`,A('-8','8','24x^2y + 8','4'),1,`${E('-12x^2y + 6xy^2 + 8 + 12x^2y - 6xy^2')} = <b>8</b>. Uwaga na znak: ${E('-2 · (-4) = +8')}.`),
 // Droga i średnia prędkość
 q('wa8-18a',`${BIKE} Które wyrażenie opisuje drogę, jaką przejechał (w km)?`,A('48t','16t','16,2t','15,4t'),2,`${E('0,4t · 20 + 0,25t · 16 + 0,35t · 12 = 8t + 4t + 4,2t')} = <b>${E('16,2t')}</b>. Pozostały czas to 100% − 40% − 25% = 35%.`),
 q('wa8-18b',`${BIKE} Jaka była jego średnia prędkość na całej trasie?`,['16 km/h','16,2 km/h','48 km/h','15,4 km/h'],1,`Droga to ${E('16,2t')} km, a czas <i>t</i> godzin. Średnia prędkość: ${E('16,2t : t')} = <b>16,2 km/h</b>. 16 km/h to średnia z trzech prędkości, która nie uwzględnia czasu jazdy.`),
];
