// Klasa 8, „Przygotowanie do egzaminu”: wyrażenia algebraiczne — zadania z egzaminów ósmoklasisty i zadania „do egzaminu”
// ze strony https://matematykaszkolna.pl/strona/5545.html. Treść i odpowiedzi jak w oryginale. Zmiany wymuszone przez grę (4 odpowiedzi):
// zadania „Uzupełnij zdania” (A/B oraz C/D) mają 4 kombinacje, zadania P/F — 4 oceny, w zadaniach z odpowiedziami A–E pominięto
// błędną odpowiedź E. Trzy zadania otwarte („Uzasadnij…”) pominięto. Kolejność od łatwiejszych do trudniejszych (`ordered`).
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id, q:text, answers, correct, explain});
// Zapis matematyczny: litery kursywą, ^2 → indeks górny, - → minus.
const M = (s) => s.replace(/[a-zA-Z]/g, (c) => `<i>${c}</i>`).replace(/\^(\d)/g, '<sup>$1</sup>').replace(/ - /g, ' − ').replace(/(^|[(= ])-(?=[\d<])/g, '$1−');
const f = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const box = (a, b) => `<span style="display:inline-block;border:1.5px solid currentColor;padding:0 .35em;font-weight:bold">${a} | ${b}</span>`;
const opts = (...items) => `<div class="task-statements">${items.join('&emsp;&emsp;')}</div>`;
const CHOOSE = '<b>Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.</b><br>';
const FILL = (lead) => `<b>${lead} Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.</b><br>`;
const AC = ['A i C', 'A i D', 'B i C', 'B i D'];
const PF = ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'];
const tf = (a, b) => `<div class="task-statements">I. ${a}<br>II. ${b}</div>`;

export const algebraExamQuestions = [
 q('ae-5877',`Paweł zjada średnio ${M('a')} jabłek w czasie ${M('b')} dni.<br><b>Którym wyrażeniem opisano, ile średnio jabłek Paweł zjada w ciągu tygodnia? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  [f(M('7a'),M('b')),f(M('7b'),M('a')),f(M('ab'),7),f(7,M('ab'))],0,
  `Jednego dnia Paweł zjada średnio ${f(M('a'),M('b'))} jabłka. Tydzień ma 7 dni: 7 · ${f(M('a'),M('b'))} = <b>${f(M('7a'),M('b'))}</b>.`),
 q('ae-6991',`Liczbę ${M('x')} powiększono o 7, a następnie otrzymany wynik zwiększono 4-krotnie. Liczbę ${M('y')} zwiększono 5-krotnie, a otrzymany wynik powiększono o 3.<br><b>Która para wyrażeń algebraicznych poprawnie opisuje wykonane działania? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  [`${M('4(x + 7)')} oraz ${M('5y + 3')}`,`${M('4x + 7')} oraz ${M('5y + 3')}`,`${M('4(x + 7)')} oraz ${M('5(y + 3)')}`,`${M('4x + 7')} oraz ${M('5(y + 3)')}`],0,
  `Najpierw ${M('x + 7')}, a cały wynik razy 4 — potrzebny nawias: ${M('4(x + 7)')}. Przy ${M('y')} najpierw mnożenie, potem dodawanie: ${M('5y + 3')}. Odpowiedź: <b>${M('4(x + 7)')} oraz ${M('5y + 3')}</b>.`),
 q('ae-7919',`${FILL('Uzupełnij zdania.')}Równość ${M('3a - 4 = a + 2')} jest spełniona dla liczby ${M('a')} równej ${box('A','B')}.${opts('<b>A.</b> 3','<b>B.</b> 1')}Wyrażenie ${M('(3a - 4) - (a + 2)')} jest równe ${box('C','D')}.${opts(`<b>C.</b> ${M('2a - 2')}`,`<b>D.</b> ${M('2a - 6')}`)}`,
  AC,1,
  `${M('3a - 4 = a + 2')}, więc ${M('2a = 6')} i ${M('a')} = 3 — <b>A</b>. ${M('(3a - 4) - (a + 2) = 3a - 4 - a - 2 = 2a - 6')} — <b>D</b>. Minus przed nawiasem zmienia znak także przy 2.`),
 q('ae-3817',`Dane są liczby ${M('x')} i ${M('y')} spełniające warunki: ${M('x')} &lt; 0 i ${M('y')} &lt; ${M('x')}.<br>Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, lub F – jeśli jest fałszywe.${tf(`Liczba ${M('y')} jest ujemna.`,`Liczba ${M('x')} jest większa od liczby ${M('y')}.`)}`,
  PF,0,
  `${M('y')} jest mniejsza od ${M('x')}, a ${M('x')} jest ujemna, więc ${M('y')} też jest ujemna — <b>P</b>. ${M('y')} &lt; ${M('x')} to to samo co ${M('x')} &gt; ${M('y')} — <b>P</b>.`),
 q('ae-5876',`${CHOOSE}Dla ${M('x = 3')} i ${M('y = -2')} wartość 0 przyjmuje wyrażenie`,
  [M('3x + y^2'),M('3y - 2x'),M('(x - 7) · (2y - 1)'),M('(x + 3) · (y + 2)')],3,
  `${M('3x + y^2')} = 9 + 4 = 13, ${M('3y - 2x')} = −6 − 6 = −12, ${M('(x - 7) · (2y - 1)')} = (−4) · (−5) = 20, a <b>${M('(x + 3) · (y + 2)')}</b> = 6 · 0 = 0.`),
 q('ae-7347',`${FILL('Uzupełnij poniższe zdania.')}Wartość wyrażenia ${M('2 - 2a^2')} dla ${M('a = -3')} jest równa ${box('A','B')}.${opts('<b>A.</b> −16','<b>B.</b> 20')}Wyrażenie ${f(1,2)}${M('(2 - 2a^2)')} można przekształcić do postaci ${box('C','D')}.${opts(`<b>C.</b> ${M('1 - 2a^2')}`,`<b>D.</b> ${M('1 - a^2')}`)}`,
  AC,1,
  `(−3)<sup>2</sup> = 9, więc 2 − 2 · 9 = 2 − 18 = −16 — <b>A</b>. Połowę bierzemy z każdego składnika: ${f(1,2)} · 2 − ${f(1,2)} · ${M('2a^2 = 1 - a^2')} — <b>D</b>.`),
 q('ae-7764',`W pudełku znajdują się wyłącznie piłki białe, fioletowe i czarne. Piłek białych jest 4 razy więcej niż fioletowych i o 3 mniej niż czarnych. Liczbę piłek fioletowych oznaczymy przez ${M('x')}.<br>${CHOOSE}Łączną liczbę wszystkich piłek w pudełku opisuje wyrażenie`,
  [M('9x + 3'),M('9x - 3'),M('6x + 3'),M('6x - 3')],0,
  `Fioletowe: ${M('x')}, białe: ${M('4x')}, czarne: o 3 więcej niż białych, czyli ${M('4x + 3')}. Razem ${M('x + 4x + 4x + 3')} = <b>${M('9x + 3')}</b>.`),
 q('ae-7920',`Aleks kupił jeden komplet słuchawek bezprzewodowych, dwie jednakowe ładowarki i dwa jednakowe dyski USB. Jeden dysk USB był 2 razy tańszy od ładowarki, a komplet słuchawek bezprzewodowych był 4 razy droższy od jednej ładowarki.<br>${CHOOSE}Jeżeli przez ${M('x')} oznaczymy cenę jednej ładowarki, to wartość zakupów Aleksa opiszemy wyrażeniem`,
  [M('10,5x'),M('7x'),M('6,5x'),M('6x')],1,
  `Dwie ładowarki: ${M('2x')}. Dysk kosztuje ${M('0,5x')}, więc dwa dyski: ${M('x')}. Słuchawki: ${M('4x')}. Razem ${M('2x + x + 4x')} = <b>${M('7x')}</b>.`),
 q('ae-7358',`W naczyniu znajdowało się ${M('k')} litrów wody. Marcin odlał z tego naczynia ${f(1,3)} tej objętości wody, a następnie Magda odlała 3 litry wody.<br>${CHOOSE}Objętość wody wyrażoną w litrach, która pozostała w naczyniu, opisuje wyrażenie`,
  [`${M('k')} − (${f(1,3)} · ${M('k')} + 3)`,`${f(1,3)} · ${M('k')} − 3`,`${M('k')} − ${f(1,3)} − 3`,`${M('k')} − (${f(1,3)} · ${M('k')} − 3)`],0,
  `Odlano razem ${f(1,3)} · ${M('k')} + 3 litrów. Zostało <b>${M('k')} − (${f(1,3)} · ${M('k')} + 3)</b>. Odpowiedź C odejmuje ${f(1,3)} litra, a nie ${f(1,3)} objętości.`),
 q('ae-7434',`${CHOOSE}Wyrażenie ${M('x(x + 4) - 3(2x - 5)')} można przekształcić równoważnie do postaci`,
  [M('x^2 + 2x - 5'),M('x^2 - 2x + 5'),M('x^2 + 2x - 15'),M('x^2 - 2x + 15')],3,
  `${M('x(x + 4) = x^2 + 4x')} oraz ${M('-3(2x - 5) = -6x + 15')}. Razem <b>${M('x^2 - 2x + 15')}</b>. Minus razy minus daje +15.`),
 q('ae-4596',`W klasie IIIa liczba dziewcząt stanowi ${f(2,3)} liczby wszystkich uczniów tej klasy.<br>${CHOOSE}W klasie IIIa`,
  ['jest więcej chłopców niż dziewcząt.',`liczba dziewcząt stanowi ${f(2,3)} liczby chłopców.`,'jest dwa razy więcej dziewcząt niż chłopców.','stosunek liczby chłopców do liczby dziewcząt jest równy 1 : 3.'],2,
  `Dziewczęta to ${f(2,3)} klasy, chłopcy — ${f(1,3)}. ${f(2,3)} to dwa razy ${f(1,3)}, więc <b>jest dwa razy więcej dziewcząt niż chłopców</b>. Stosunek chłopców do dziewcząt to 1 : 2.`),
 q('ae-5873',`Pan Jan spłacił całą pożyczkę w ${M('x')} ratach. Każda z pierwszych czterech rat była równa ${M('a')} zł, a każda z pozostałych była o 100 zł większa od pierwszej raty.<br>${CHOOSE}Spłaconą kwotę pożyczki opisano wyrażeniem`,
  [M('4a + 100x'),M('4a + x(a + 100)'),M('4a + x(100a)'),M('4a + (x - 4) · (a + 100)')],3,
  `Cztery raty po ${M('a')} zł: ${M('4a')}. Pozostałych rat jest ${M('x - 4')}, każda po ${M('a + 100')} zł. Razem <b>${M('4a + (x - 4) · (a + 100)')}</b>.`),
 q('ae-7319',`Suma dwóch dodatnich liczb ${M('a')} i ${M('b')} jest równa 46.<br><b>Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.</b>${tf('Po zmniejszeniu każdej z tych liczb o 6 suma otrzymanych liczb będzie równa 34.','Po zwiększeniu każdej z tych liczb o połowę suma otrzymanych liczb będzie równa 69.')}`,
  PF,0,
  `I: ${M('(a - 6) + (b - 6) = a + b - 12')} = 46 − 12 = 34 — <b>P</b>. II: ${M('1,5a + 1,5b')} = 1,5 · 46 = 69 — <b>P</b>.`),
 q('ae-4387',`Liczba ${M('x')} jest dodatnia, a liczba ${M('y')} jest ujemna. Ile spośród liczb: ${M('x · y')}, ${M('x - y')}, ${f(M('x'),M('y'))}, ${M('(y - x)^2')} jest dodatnich?<br><b>Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['Jedna.','Dwie.','Trzy.','Cztery.'],1,
  `${M('x · y')} i ${f(M('x'),M('y'))} są ujemne (różne znaki). ${M('x - y')} jest dodatnie, bo odejmujemy liczbę ujemną. ${M('(y - x)^2')} jest dodatnie, bo ${M('y - x')} ≠ 0. Dodatnie są <b>dwie</b>.`),
 q('ae-6986',`Dane są cztery wyrażenia:${opts(M('G = 2x^2 + 2'),M('H = 2x^2 + 2x'),M('J = 2x^2 - 2'),M('K = 2x^2 - 2x'))}Jedno z tych wyrażeń przyjmuje wartość 0 dla ${M('x = 1')} oraz dla ${M('x = -1')}.<br><b>Które to wyrażenie? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  [M('G'),M('H'),M('J'),M('K')],2,
  `Dla ${M('x = 1')} i ${M('x = -1')} jest ${M('x^2')} = 1, więc ${M('2x^2')} = 2. Tylko w <b>${M('J')}</b>: 2 − 2 = 0 w obu przypadkach. ${M('K')} daje 0 tylko dla ${M('x = 1')} (dla −1: 2 + 2 = 4).`),
 q('ae-6491',`Dane jest wyrażenie ${f(M('n^4 - 3'),6)} oraz liczby: −3, −1, 0, 1, 3.<br><b>Dla której z danych liczb wartość podanego wyrażenia jest najmniejsza? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['−3','−1','0','1'],2,
  `Potęga czwarta nie jest ujemna, więc licznik jest najmniejszy, gdy ${M('n^4')} = 0: dla ${M('n = 0')} wartość to ${f('−3',6)} = −0,5. Dla ±1: ${f('−2',6)}, dla ±3: ${f(78,6)} = 13. Odpowiedź: <b>0</b>.`),
 q('ae-5263',`${CHOOSE}Wyrażenie: ${M('(2a + 3b)(3b - 2a)')} jest równe`,
  [M('4a^2 - 12ab + 9b^2'),M('9b^2 + 12ab + 4a^2'),M('9b^2 - 4a^2'),M('4a^2 - 9b^2')],2,
  `${M('(3b + 2a)(3b - 2a) = 9b^2 - 6ab + 6ab - 4a^2')} = <b>${M('9b^2 - 4a^2')}</b>. Wyrazy z ${M('ab')} się redukują.`),
 q('ae-7273',`${CHOOSE}Wyrażenie: ${M('(x - 2)(4x - 3) - x(1 - x)')} po uproszczeniu jest równe`,
  [M('5x^2 - x - 6'),M('5x^2 - 9x + 6'),M('5x^2 - 12x + 6'),M('3x^2 - x - 6')],2,
  `${M('(x - 2)(4x - 3) = 4x^2 - 3x - 8x + 6 = 4x^2 - 11x + 6')}, a ${M('-x(1 - x) = -x + x^2')}. Razem <b>${M('5x^2 - 12x + 6')}</b>.`),
 q('ae-4595',`Dane są liczby ${M('a')} i ${M('b')} takie, że 2 &lt; ${M('a')} &lt; 3 oraz −1 &lt; ${M('b')} &lt; 1.<br><b>Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli zdanie jest fałszywe.</b>${tf(`Iloraz ${f(M('b'),M('a'))} jest zawsze dodatni.`,`Różnica ${M('b - a')} jest zawsze dodatnia.`)}`,
  PF,3,
  `I: ${M('b')} może być ujemne, np. ${M('b')} = −0,5 i ${M('a')} = 2,5 dają ${f(M('b'),M('a'))} = −0,2 — <b>F</b>. II: ${M('b')} jest mniejsze od 1, a ${M('a')} większe od 2, więc ${M('b - a')} &lt; 1 − 2 = −1 — zawsze ujemna, <b>F</b>.`),
 q('ae-7321',`Dane są trzy liczby ${M('a')}, ${M('b')} i ${M('c')}.<br>${FILL('Uzupełnij zdania.')}Gdy ${M('a + b + c = -1')} oraz ${M('a')} jest liczbą mniejszą od (−1), to suma ${M('(b + c)')} jest ${box('A','B')}.${opts('<b>A.</b> dodatnia','<b>B.</b> ujemna')}Gdy ${M('a · b · c')} = 1 oraz ${M('a')} jest liczbą większą od zera, to iloczyn ${M('(b · c)')} jest ${box('C','D')}.${opts('<b>C.</b> dodatni','<b>D.</b> ujemny')}`,
  AC,0,
  `${M('b + c = -1 - a')}, a skoro ${M('a')} &lt; −1, to −${M('a')} &gt; 1 i ${M('b + c')} &gt; 0 — <b>A</b>. ${M('b · c')} = 1 : ${M('a')}, a ${M('a')} &gt; 0, więc iloczyn jest dodatni — <b>C</b>.`),
 q('ae-3727',`Dokończ zdanie, wybierając odpowiedź spośród podanych.<br>Równość ${f(3,5)} = ${f(1,M('x'))} + ${f(1,M('y'))} będzie prawdziwa, jeśli w miejscu ${M('x')} i ${M('y')} zostaną wpisane liczby`,
  ['5 i 2','6 i 4','10 i 2','10 i 6'],2,
  `${f(1,10)} + ${f(1,2)} = ${f(1,10)} + ${f(5,10)} = ${f(6,10)} = ${f(3,5)}. Odpowiedź: <b>10 i 2</b>. Pozostałe: ${f(7,10)}, ${f(5,12)} i ${f(4,15)}.`),
 q('ae-7600',`${CHOOSE}Wyrażenie ${M('2(a - 2b) - (a - b)(2 - b) + b^2')} można przekształcić równoważnie do postaci`,
  [M('ab'),M('ab - 2b'),M('b^2 - 2b - ab'),M('b^2 - 6b + a - 2')],1,
  `${M('2(a - 2b) = 2a - 4b')}, ${M('(a - b)(2 - b) = 2a - ab - 2b + b^2')}. Po odjęciu: ${M('2a - 4b - 2a + ab + 2b - b^2 + b^2')} = <b>${M('ab - 2b')}</b>.`),
];
