// Klasa 8: liczby na osi liczbowej — odczytywanie współrzędnych, zbiory liczb spełniających warunek, zapisywanie warunku.
// Oś opisuje się indeksami kresek (0 … seg), a nie wartościami: rysunek i test liczą współrzędne z tych samych danych.
// Podpunkty z tym samym rysunkiem mają wspólną grupę: os-1a i os-1b to jedno zadanie.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
const pair = (id, context, a, b, truth, explain) => q(id, `${context}<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
export const fmt = (v) => String(Math.round(v * 1e4) / 1e4).replace('.', ',').replace('-', '−');
const f = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const t = (x, y, value, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" fill="#f3f5ff" font-family="Arial, sans-serif" font-size="17" ${extra}>${value}</text>`;

// a, b — liczby pod kreską 0 i kreską seg; labels — indeksy podpisanych kresek; points — {A: indeks}; ray — [indeks, 'left'|'right', zamalowane kółko].
function line(a, b, seg, {labels = [0, seg], points = {}, ray = null, label = (k) => fmt(a + k * (b - a) / seg)} = {}) {
 const x = (k) => 30 + k * 330 / seg, y = 36;
 let body = '';
 if (ray) {
  const [k, dir, closed] = ray, from = dir === 'right' ? x(k) : 8, to = dir === 'right' ? 384 : x(k);
  body += `<rect x="${from}" y="8" width="${to - from}" height="${y - 8}" fill="#63d6e8" fill-opacity=".3"/><path d="M${x(k)} 8V${y}" stroke="#63d6e8" stroke-width="2.5"/><path d="M${from} 8H${to}" stroke="#63d6e8" stroke-width="2.5"/>`;
 }
 body += `<path d="M8 ${y}H386" stroke="#f3f5ff" stroke-width="2"/><path d="M384 ${y - 6}L396 ${y}L384 ${y + 6}Z" fill="#f3f5ff"/>`;
 for (let k = 0; k <= seg; k++) body += `<path d="M${x(k)} ${y - 6}V${y + 6}" stroke="#f3f5ff" stroke-width="2"/>`;
 labels.forEach((k) => body += t(x(k), 62, label(k)));
 Object.entries(points).forEach(([name, k]) => body += `<circle cx="${x(k)}" cy="${y}" r="5.5" fill="#f6c85c"/>` + t(x(k), 22, name, 'font-weight="700" font-style="italic" fill="#f6c85c"'));
 if (ray) body += `<circle cx="${x(ray[0])}" cy="${y}" r="5.5" fill="${ray[2] ? '#63d6e8' : '#101b3b'}" stroke="#63d6e8" stroke-width="2.5"/>`;
 const data = `data-axis="${a},${b},${seg}" data-points="${Object.entries(points).map(([n, k]) => `${n}:${k}`).join(';')}" data-ray="${ray ? ray.join(',') : ''}"`;
 const desc = `Oś liczbowa od ${fmt(a)} do ${fmt(b)}, ${seg} równych odcinków` + Object.entries(points).map(([n, k]) => `, punkt ${n} na kresce ${k}`).join('') + (ray ? `, zaznaczona półprosta ${ray[1] === 'right' ? 'w prawo' : 'w lewo'} od kreski ${ray[0]}, kółko ${ray[2] ? 'zamalowane' : 'puste'}` : '');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 70" role="img" aria-label="${desc}" ${data}>${body}</svg>`;
}
const fig = (svg) => `<figure class="exam-chart axis-chart">${svg}</figure>`;
const four = (svgs) => `<figure class="exam-chart axis-chart">${svgs.map((s, i) => `<div class="axis-row"><b>${'ABCD'[i]}.</b>${s}</div>`).join('')}</figure>`;
const AXES = ['Oś A', 'Oś B', 'Oś C', 'Oś D'];
const RAY = 'Zamalowane kółko oznacza, że liczba należy do zbioru (≤ lub ≥), a puste — że nie należy (< lub >).';
const conds = (v) => ['&gt;', '≥', '&lt;', '≤'].map((s) => `<i>x</i> ${s} ${v}`);

// Rysunki używane w kilku podpunktach.
const ax1 = fig(line(20, 30, 5, {points: {A: 2, B: 4}}));
const ax2 = fig(line(100, 200, 4, {points: {A: 1, B: 3}}));
const ax3 = fig(line(3, 4, 5, {points: {A: 2, B: 4}}));
const ax4 = fig(line(1000, 1300, 6, {points: {A: 3, B: 5}}));
const ax5 = fig(line(-10, 0, 4, {points: {A: 1, B: 3}}));
const ax6 = fig(line(0, 1, 3, {points: {A: 2}, label: (k) => [0, '', '', 1][k]}));
const set4 = fig(line(-1, 6, 7, {labels: [1, 5], ray: [5, 'right', true]}));
const setM1 = fig(line(-4, 3, 7, {labels: [3, 4], ray: [3, 'left', false]}));

export const axisQuestions = [
 q('os-1a',`${ax1}Jaka jest współrzędna punktu <i>A</i>?`, ['22','24','25','26'],1,'Od 20 do 30 jest 5 równych odcinków, więc jeden ma długość 10 : 5 = 2. Punkt <i>A</i> leży 2 odcinki od 20: <b>24</b>. Wynik 22 to liczenie każdej kreski jako 1.'),
 q('os-1b',`${ax1}Jaka jest współrzędna punktu <i>B</i>?`, ['24','26','28','29'],2,'Jeden odcinek to 10 : 5 = 2. Punkt <i>B</i> leży 4 odcinki od 20: 20 + 4 · 2 = <b>28</b>.'),
 q('os-2a',`${ax2}Jaka jest współrzędna punktu <i>A</i>?`, ['110','120','125','150'],2,'Od 100 do 200 są 4 odcinki, każdy ma długość 100 : 4 = 25. <i>A</i> = 100 + 25 = <b>125</b>.'),
 q('os-2b',`${ax2}Jaka jest współrzędna punktu <i>B</i>?`, ['130','175','180','160'],1,'Jeden odcinek to 25. <i>B</i> = 100 + 3 · 25 = <b>175</b>.'),
 q('os-3a',`${ax3}Jaka jest współrzędna punktu <i>A</i>?`, ['3,2','3,4','3,5','3,6'],1,'Od 3 do 4 jest 5 odcinków, każdy ma długość 1 : 5 = 0,2. <i>A</i> = 3 + 2 · 0,2 = <b>3,4</b>. Wynik 3,2 to błąd: odcinek nie ma długości 0,1.'),
 q('os-3b',`${ax3}Jaka jest współrzędna punktu <i>B</i>?`, ['3,4','3,8','3,9','4,2'],1,'Jeden odcinek to 0,2. <i>B</i> = 3 + 4 · 0,2 = <b>3,8</b>.'),
 q('os-4a',`${ax4}Jaka jest współrzędna punktu <i>A</i>?`, ['1003','1030','1150','1180'],2,'Od 1000 do 1300 jest 6 odcinków po 300 : 6 = 50. <i>A</i> = 1000 + 3 · 50 = <b>1150</b> — dokładnie w połowie.'),
 q('os-4b',`${ax4}Jaka jest współrzędna punktu <i>B</i>?`, ['1050','1200','1250','1500'],2,'Jeden odcinek to 50. <i>B</i> = 1000 + 5 · 50 = <b>1250</b>.'),
 q('os-5a',`${ax5}Jaka jest współrzędna punktu <i>A</i>?`, ['−9','−8','−7,5','−2,5'],2,'Od −10 do 0 są 4 odcinki po 10 : 4 = 2,5. <i>A</i> = −10 + 2,5 = <b>−7,5</b>. Wynik −2,5 to długość odcinka liczona od zera.'),
 q('os-5b',`${ax5}Jaka jest współrzędna punktu <i>B</i>?`, ['−7,5','−3','−2,5','2,5'],2,'Jeden odcinek to 2,5. <i>B</i> = −10 + 3 · 2,5 = <b>−2,5</b>. Liczby na lewo od zera są ujemne.'),
 q('os-6',`${ax6}Jaka jest współrzędna punktu <i>A</i>?`, [f(1,3),f(2,3),'0,2',f(2,5)],1,`Odcinek od 0 do 1 podzielono na 3 równe części — każda to ${f(1,3)}. <i>A</i> leży na drugiej kresce: <b>${f(2,3)}</b>. 0,2 to błąd: części nie są dziesiątymi.`),
 q('os-7',`${four([
  line(100, 200, 5, {points: {X: 4}}),
  line(100, 300, 8, {points: {X: 3}}),
  line(150, 200, 5, {points: {X: 3}}),
  line(0, 300, 5, {points: {X: 3}}),
 ])}Na której osi współrzędna punktu <i>X</i> <b>nie</b> jest równa 180?`, AXES,1,'Najpierw liczymy długość jednego odcinka. A: 100 : 5 = 20, <i>X</i> = 100 + 4 · 20 = 180. B: 200 : 8 = 25, <i>X</i> = 100 + 3 · 25 = <b>175</b>. C: 50 : 5 = 10, <i>X</i> = 180. D: 300 : 5 = 60, <i>X</i> = 180. Wyjątkiem jest <b>oś B</b>.'),
 q('os-8',`${four([
  line(-6, 6, 12, {labels: [6, 11], ray: [11, 'right', true]}),
  line(-6, 6, 12, {labels: [6, 11], ray: [11, 'left', false]}),
  line(-6, 6, 12, {labels: [1, 6], ray: [1, 'left', true]}),
  line(-6, 6, 12, {labels: [6, 11], ray: [11, 'left', true]}),
 ])}Na której osi zaznaczono zbiór liczb spełniających warunek <b><i>x</i> ≤ 5</b>?`, AXES,3,`Liczby mniejsze lub równe 5 leżą na lewo od 5, a samo 5 też należy do zbioru — kółko musi być zamalowane. To <b>oś D</b>. Oś B pokazuje <i>x</i> &lt; 5. ${RAY}`),
 q('os-9',`${four([
  line(-6, 6, 12, {labels: [4, 6], ray: [4, 'right', true]}),
  line(-6, 6, 12, {labels: [4, 6], ray: [4, 'left', false]}),
  line(-6, 6, 12, {labels: [4, 6], ray: [4, 'right', false]}),
  line(-6, 6, 12, {labels: [6, 8], ray: [8, 'right', false]}),
 ])}Na której osi zaznaczono zbiór liczb spełniających warunek <b><i>x</i> &gt; −2</b>?`, AXES,2,`Liczby większe od −2 leżą na prawo od −2, a −2 do zbioru nie należy — kółko puste. To <b>oś C</b>. Oś D zaczyna się od 2, a nie od −2. ${RAY}`),
 q('os-10',`${fig(line(-8, 0, 8, {labels: [2, 8], ray: [2, 'right', true]}))}Jaki warunek spełniają liczby zaznaczone na osi?`, conds('−6'),1,`Zbiór zaczyna się w −6 i biegnie w prawo, a kółko jest zamalowane: <b><i>x</i> ≥ −6</b>. ${RAY}`),
 q('os-11',`${fig(line(-2, 6, 8, {labels: [2, 5], ray: [5, 'left', false]}))}Jaki warunek spełniają liczby zaznaczone na osi?`, conds(3),2,`Zbiór biegnie w lewo od 3, a kółko jest puste, więc 3 do niego nie należy: <b><i>x</i> &lt; 3</b>.`),
 q('os-12',`${fig(line(-1, 3, 8, {labels: [2, 4, 5], ray: [5, 'left', true]}))}Jaki warunek spełniają liczby zaznaczone na osi?`, conds('1,5'),3,`Półprosta w lewo od 1,5 z zamalowanym kółkiem: <b><i>x</i> ≤ 1,5</b>.`),
 q('os-13',`${fig(line(200, 300, 4, {labels: [0, 4], ray: [2, 'right', false]}))}Jaki warunek spełniają liczby zaznaczone na osi?`, ['<i>x</i> &gt; 225','<i>x</i> &gt; 250','<i>x</i> ≥ 250','<i>x</i> &lt; 250'],1,'Od 200 do 300 są 4 odcinki po 25, więc zbiór zaczyna się w 200 + 2 · 25 = 250. Kółko jest puste, a zbiór biegnie w prawo: <b><i>x</i> &gt; 250</b>.'),
 q('os-14',`${fig(line(-2, 0, 4, {labels: [0, 4], ray: [3, 'left', false]}))}Jaki warunek spełniają liczby zaznaczone na osi?`, ['<i>x</i> &lt; −0,5','<i>x</i> ≤ −0,5','<i>x</i> &gt; −0,5','<i>x</i> &lt; −1,5'],0,'Od −2 do 0 są 4 odcinki po 0,5. Kółko leży 3 odcinki od −2: −2 + 1,5 = −0,5. Jest puste, a zbiór biegnie w lewo: <b><i>x</i> &lt; −0,5</b>.'),
 q('os-15','Jaka jest <b>najmniejsza liczba naturalna</b> spełniająca warunek <i>x</i> &gt; 4?', ['0','4','5','6'],2,'Liczba 4 nie spełnia warunku (4 nie jest większe od 4). Najmniejsza liczba naturalna większa od 4 to <b>5</b>.'),
 q('os-16','Jaka jest <b>najmniejsza liczba naturalna</b> spełniająca warunek <i>x</i> ≥ −7?', ['−7','−6','0','1'],2,'Liczby naturalne to 0, 1, 2, 3, … Wszystkie są większe od −7, więc najmniejsza z nich to <b>0</b>. −7 nie jest liczbą naturalną.'),
 q('os-17','Jaka jest <b>największa liczba całkowita</b> spełniająca warunek <i>x</i> &lt; −3?', ['−4','−3','−2','3'],0,'Liczby mniejsze od −3 leżą na osi na lewo od −3: −4, −5, −6, … Największa z nich to <b>−4</b>.'),
 q('os-18','Ile liczb całkowitych spełnia jednocześnie warunki <i>x</i> &gt; −3 i <i>x</i> ≤ 2?', ['4','5','6','3'],1,'To liczby −2, −1, 0, 1, 2 — razem <b>5</b>. −3 odpada (warunek ostry), a 2 należy do zbioru.'),
 q('os-19a',`${setM1}Która liczba należy do zbioru zaznaczonego na osi?`, ['−1','−0,9','−1,1','0'],2,'Zaznaczono liczby mniejsze od −1 (kółko puste). Z podanych tylko <b>−1,1</b> &lt; −1. Liczba −0,9 jest większa od −1.'),
 pair('os-19b',setM1,'Wszystkie liczby ujemne należą do zaznaczonego zbioru.','Liczba −1 nie należy do zaznaczonego zbioru.','FP','Zbiór to <i>x</i> &lt; −1. I: np. −0,5 jest ujemna, ale nie jest mniejsza od −1 — <b>fałsz</b>. II: kółko jest puste, więc −1 nie należy — <b>prawda</b>.'),
 q('os-20','Która liczba <b>nie</b> spełnia warunku <i>x</i> ≥ −1,5?', ['−1,5','0','−1','−2'],3,'Warunek spełniają −1,5 i liczby od niej większe. −2 leży na osi na lewo od −1,5, więc <b>−2</b> nie spełnia warunku.'),
 pair('os-21',set4,'Liczba 4 należy do zaznaczonego zbioru.','Najmniejszą liczbą naturalną w tym zbiorze jest 5.','PF','Zbiór to <i>x</i> ≥ 4. I: kółko jest zamalowane — <b>prawda</b>. II: 4 jest liczbą naturalną i należy do zbioru, więc to ona jest najmniejsza — <b>fałsz</b>.'),
 q('os-22','Na osi liczbowej zaznaczono punkty <i>A</i> = −3,5 i <i>B</i> = 2. Jaka jest odległość między nimi?', ['1,5','5','5,5','−1,5'],2,'Odległość to różnica większej i mniejszej współrzędnej: 2 − (−3,5) = <b>5,5</b>. Odległość nigdy nie jest ujemna.'),
 q('os-23','Punkt <i>S</i> leży na osi w połowie odległości między punktami o współrzędnych −4 i 10. Jaka jest współrzędna punktu <i>S</i>?', ['3','6','7','−3'],0,'Odległość między punktami: 10 − (−4) = 14. Połowa to 7, więc <i>S</i> = −4 + 7 = <b>3</b>. Wynik 7 to połowa odległości, a nie współrzędna.'),
 q('os-24','Punkt <i>A</i> ma współrzędną −7. Punkt <i>B</i> leży na osi 5 jednostek na prawo od <i>A</i>. Jaka jest współrzędna punktu <i>B</i>?', ['−12','−2','2','12'],1,'Na prawo liczby rosną: −7 + 5 = <b>−2</b>. Wynik −12 to przesunięcie w lewo.'),
 q('os-25','Ile liczb całkowitych leży na osi liczbowej między liczbami −2,5 i 1?', ['2','3','4','5'],1,'Między −2,5 a 1 leżą liczby całkowite −2, −1 i 0 — razem <b>3</b>. Liczba 1 to koniec przedziału, a nie liczba „między”.'),
];
