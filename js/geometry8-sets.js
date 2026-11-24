// Klasa 8, dział „Figury na płaszczyźnie”: własności kątów, zadania z kątami, nierówność trójkąta.
// Zadania od najłatwiejszych do najtrudniejszych (`ordered`). Rysunki są w skali: łuki kątów mają współrzędne w data-*,
// więc test mierzy każdy kąt na rysunku i sprawdza, że podpis i poprawna odpowiedź zgadzają się z rysunkiem.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
// Poprawna odpowiedź `value` wstawiona na pozycję `i` między `others`.
const pick = (id, text, value, others, i, explain, fmt = (v) => `${v}°`) => { const a = others.map(fmt); a.splice(i, 0, fmt(value)); return q(id, text, a, i, explain); };
const truth = (id, ctx, a, b, t, explain) => q(id, `${ctx}Oceń prawdziwość zdań.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP', 'PF', 'FP', 'FF'].indexOf(t), explain);
const num = (v) => String(v).replace('.', ',');

const W = 400, H = 235, r1 = (v) => Math.round(v * 10) / 10;
const fig = (body, desc) => `<figure class="exam-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${desc}">${body}</svg></figure>`;
const txt = (x, y, s, color = '#f6c85c', size = 17) => `<text x="${r1(x)}" y="${r1(y)}" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="${size}" font-style="italic">${s}</text>`;
const rad = (d) => d * Math.PI / 180;
// Kierunki w stopniach jak w matematyce: 0° w prawo, 90° w górę (na ekranie y rośnie w dół).
const at = ([x, y], deg, len) => [r1(x + len * Math.cos(rad(deg))), r1(y - len * Math.sin(rad(deg)))];
const dirOf = (v, p) => Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180 / Math.PI;
const ccw = (v, a, b) => ((dirOf(v, b) - dirOf(v, a)) % 360 + 360) % 360;
const X = (p1, p2, p3, p4) => { const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]); const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d; return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])]; };
const STROKE = 'stroke="#f3f5ff" stroke-width="2.5"';
const pt = (name, p, dx = 0, dy = -12) => `<circle data-pt="${name}" cx="${r1(p[0])}" cy="${r1(p[1])}" r="4" fill="#f6c85c"/>` + txt(p[0] + dx, p[1] + dy + 5, name);
// Podpisy punktów odsunięte od środka figury `c`.
const pts = (P, names, c, off = 17) => names.map((n) => { const p = P[n], d = Math.hypot(p[0] - c[0], p[1] - c[1]) || 1; return pt(n, p, (p[0] - c[0]) / d * off, (p[1] - c[1]) / d * off); }).join('');
const seg = (a, b, color = '#f3f5ff') => `<path d="M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}" stroke="${color}" stroke-width="2.5"/>`;
const poly = (list) => `<polygon points="${list.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>`;
// Prosta przez punkty p i r, przycięta do rysunku; `par` — prosta z pary równoległych (test sprawdza równoległość).
function full(name, p, r, {label = '', par = false} = {}) {
 const d = [r[0] - p[0], r[1] - p[1]]; let lo = -1e9, hi = 1e9;
 for (const k of [0, 1]) if (Math.abs(d[k]) > 1e-9) { const max = k ? H : W, a = (6 - p[k]) / d[k], b = (max - 6 - p[k]) / d[k]; lo = Math.max(lo, Math.min(a, b)); hi = Math.min(hi, Math.max(a, b)); }
 const a = [p[0] + lo * d[0], p[1] + lo * d[1]], b = [p[0] + hi * d[0], p[1] + hi * d[1]], L = Math.hypot(...d);
 return `<path data-line="${name}"${par ? ' data-par="1"' : ''} d="M${r1(a[0])} ${r1(a[1])}L${r1(b[0])} ${r1(b[1])}" ${STROKE}/>` + (label ? txt(b[0] - d[0] / L * 16, b[1] - d[1] / L * 16 - 9, label) : '');
}
// Łuk kąta o wierzchołku v między półprostymi do a i b (mniejszy kąt albo — z `big` — wklęsły). Kąt prosty: kwadracik.
function mark(name, v, a, b, label = name, {r = 0, big = false, square = true, lat = 0.5} = {}) {
 let from = dirOf(v, a), span = ccw(v, a, b);
 if ((span > 180) !== big) { from = dirOf(v, b); span = 360 - span; }
 if (!r) r = span < 25 ? 52 : span < 45 ? 40 : span < 75 ? 30 : 24;
 const data = `data-arc="${name}" data-v="${r1(v[0])},${r1(v[1])}" data-a="${at(v, from, 60)}" data-b="${at(v, from + span, 60)}"`;
 if (square && Math.abs(span - 90) < 0.3) return `<path ${data} d="M${at(v, from, 14)}L${at(at(v, from, 14), from + 90, 14)}L${at(v, from + 90, 14)}" fill="none" stroke="#63d6e8" stroke-width="2"/>`;
 const p = at(v, from, r), e = at(v, from + span, r), l = at(v, from + span * lat, r + 9 + label.length * 3.5);
 return `<path ${data} d="M${p[0]} ${p[1]}A${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${e[0]} ${e[1]}" fill="none" stroke="#63d6e8" stroke-width="2"/>` + (label ? txt(l[0], l[1] + 6, label, '#63d6e8', 15) : '');
}
// Punkty w układzie matematycznym (y w górę) dopasowane do rysunku.
function fit(m, pad = 34) {
 const v = Object.values(m), xs = v.map((p) => p[0]), ys = v.map((p) => p[1]);
 const s = Math.min((W - 2 * pad) / (Math.max(...xs) - Math.min(...xs)), (H - 2 * pad) / (Math.max(...ys) - Math.min(...ys)));
 const ox = (W - s * (Math.max(...xs) + Math.min(...xs))) / 2, oy = (H + s * (Math.max(...ys) + Math.min(...ys))) / 2;
 return Object.fromEntries(Object.entries(m).map(([k, [x, y]]) => [k, [r1(ox + s * x), r1(oy - s * y)]]));
}
const mid = (...p) => [p.reduce((s, a) => s + a[0], 0) / p.length, p.reduce((s, a) => s + a[1], 0) / p.length];
const ray = (deg) => [Math.cos(rad(deg)), Math.sin(rad(deg))];
// Przecięcie półprostych w układzie matematycznym: z punktu p pod kątem a i z punktu r pod kątem b.
const meet = (p, a, r, b) => { const [u, w] = [ray(a), ray(b)], d = u[0] * w[1] - u[1] * w[0], t = ((r[0] - p[0]) * w[1] - (r[1] - p[1]) * w[0]) / d; return [p[0] + t * u[0], p[1] + t * u[1]]; };

// ——— Własności kątów ———
// Dwie proste przecinające się; dany kąt θ, szukany α — wierzchołkowy ('v') albo przyległy ('p').
function crossing(theta, mode, d0) {
 const O = [200, 118], P = (d) => at(O, d, 100);
 const ask = mode === 'v' ? mark('ask', O, P(d0 + 180), P(d0 + theta + 180), 'α') : mark('ask', O, P(d0 + theta), P(d0 + 180), 'α');
 return fig(full('m', O, P(d0)) + full('n', O, P(d0 + theta)) + mark(`${theta}°`, O, P(d0), P(d0 + theta)) + ask + pt('', O), 'Dwie proste przecinające się w jednym punkcie');
}
const CROSS = `Dwie proste przecinają się w jednym punkcie. Ile stopni ma kąt <i>α</i>?`;
// Półproste o podanych kierunkach wychodzące z O; `marks`: [od, do, podpis].
function rays(O, dirs, marks, line, len = 120, lab = [-2, 22]) {
 const P = (d) => at(O, d, len);
 return fig((line ? full('a', O, P(0)) : '') + dirs.map((d) => seg(O, P(d))).join('') + marks.map(([a, b, l, o]) => mark(l === 'δ' ? 'ask' : l || 'prosty', O, P(a), P(b), l, o)).join('') + pt('O', O, ...lab), 'Półproste wychodzące z punktu O');
}
// Proste równoległe k i l (poziome) i sieczna nachylona pod kątem t. Kąty: [punkt 1|2, od, do, nazwa, podpis].
function transversal(t, marks) {
 const y1 = 75, y2 = 165, x1 = 200 + 45 / Math.tan(rad(t)), T = {1: [x1, y1], 2: [x1 - 90 / Math.tan(rad(t)), y2]};
 return fig(full('k', [0, y1], [W, y1], {label: 'k', par: true}) + full('l', [0, y2], [W, y2], {label: 'l', par: true}) + full('s', T[2], T[1]) + marks.map(([k, a, b, n, l]) => mark(n, T[k], at(T[k], a, 40), at(T[k], b, 40), l)).join(''), 'Dwie proste równoległe k i l przecięte trzecią prostą');
}
const PAIRS = ['odpowiadające', 'naprzemianległe', 'wierzchołkowe', 'przyległe'];
const NAMEQ = 'Proste <i>k</i> i <i>l</i> są równoległe. Jak nazywamy kąty <i>α</i> i <i>β</i>?';
const PARQ = 'Proste <i>k</i> i <i>l</i> są równoległe. Ile stopni ma kąt <i>α</i>?';
// Dwusieczne: wierzchołek B, BA w prawo, BC pod kątem th, BD — dwusieczna. `extra`: E (180°) i F — dwusieczna kąta CBE.
function bisector(th, marks, extra = false) {
 const B = extra ? [200, 190] : [80, 190], P = {A: at(B, 0, extra ? 170 : 290), C: at(B, th, 165), D: at(B, th / 2, 165)};
 if (extra) P.E = at(B, 180, 170);
 if (extra === 'EF') P.F = at(B, (th + 180) / 2, 165);
 return fig((extra ? full('AE', P.E, P.A) : seg(B, P.A)) + seg(B, P.C) + seg(B, P.D) + (P.F ? seg(B, P.F) : '') + marks.map(([a, b, n, l, o]) => mark(n, B, P[a], P[b], l, o)).join('') + pt('B', B, 0, 24) + Object.keys(P).map((k) => pt(k, at(B, dirOf(B, P[k]), 150), 0, -10)).join(''), 'Kąt ABC i jego dwusieczna BD');
}
// Proste równoległe a i b przecięte dwiema prostymi, które przecinają się w punkcie T nad prostą a.
function apex(p, qq) {
 const T = [200, 26], A1 = [200 - 74 / Math.tan(rad(p)), 100], B1 = [200 - 159 / Math.tan(rad(p)), 185], A2 = [200 + 74 / Math.tan(rad(qq)), 100];
 return fig(full('a', [0, 100], [W, 100], {label: 'a', par: true}) + full('b', [0, 185], [W, 185], {label: 'b', par: true}) + full('m', T, B1) + full('n', T, A2)
  + mark(`${180 - p}°`, B1, [B1[0] - 50, 185], T) + mark(`${180 - qq}°`, A2, [A2[0] + 50, 100], T) + mark('ask', T, A1, A2, 'α', {r: 24}), 'Dwie proste równoległe a i b przecięte dwiema prostymi, które przecinają się nad prostą a');
}
// „Zygzak” między prostymi równoległymi k i l: kąt przy P to suma kątów a1 i a2.
function zigzag(a1, a2) {
 const K = [110, 55], P = [110 + 65 / Math.tan(rad(a1)), 120], L = [110 + 65 / Math.tan(rad(a1)) - 65 / Math.tan(rad(a2)), 185];
 return fig(full('k', [0, 55], [W, 55], {label: 'k', par: true}) + full('l', [0, 185], [W, 185], {label: 'l', par: true}) + seg(K, P) + seg(P, L)
  + mark(`${a1}°`, K, [K[0] + 60, 55], P) + mark(`${a2}°`, L, [L[0] + 60, 185], P) + mark('ask', P, K, L, 'α') + pt('P', P, 14, 4), 'Dwie proste równoległe k i l i łamana KPL między nimi');
}
// Trójkąt KOT, KA — dwusieczna kąta K, A na boku TO. `ask`: 'O', 'KAT' albo 'KAO'.
function kot(t, h, ask) {
 const o = 180 - t - 2 * h, K = [0, 0], O = [1, 0], T = meet(K, 2 * h, O, 180 - o), A = X(K, [Math.cos(rad(h)), Math.sin(rad(h))], T, O);
 const P = fit({K, O, T, A}), c = mid(P.K, P.O, P.T);
 const am = ask === 'O' ? mark('ask', P.O, P.K, P.T, '?') : ask === 'KAT' ? mark('ask', P.A, P.K, P.T, '?') : mark('ask', P.A, P.K, P.O, '?');
 return fig(poly([P.K, P.O, P.T]) + seg(P.K, P.A) + mark(`${t}°`, P.T, P.K, P.O) + mark(`${h}°`, P.K, P.A, P.O, `${h}°`, {r: 58}) + am + pts(P, ['K', 'O', 'T', 'A'], c), 'Trójkąt KOT i odcinek KA na dwusiecznej kąta OKT');
}
// Trójkąt równoramienny ABC (CA = CB), D na AB, AD = AC.
function isoD(A) {
 const P = fit({A: [0, 0], B: [2 * Math.cos(rad(A)), 0], C: [Math.cos(rad(A)), Math.sin(rad(A))], D: [1, 0]}), c = mid(P.A, P.B, P.C);
 return fig(poly([P.A, P.B, P.C]) + seg(P.C, P.D) + mark(`${A}°`, P.A, P.B, P.C) + mark('ask', P.C, P.D, P.B, 'α', {r: 70}) + pts(P, ['A', 'B', 'C'], c) + pt('D', P.D, 0, 22), 'Trójkąt równoramienny ABC i odcinek CD');
}
// Prostokąt ABDE i trójkąt ABC; AC przecina ED w G, BC w F.
function rectTri(e, cfd) {
 const b = 180 - cfd, A = [0, 0], B = [1, 0], C = meet(A, 90 - e, B, 180 - b), h = 0.58 * C[1];
 const G = meet(A, 90 - e, [0, h], 0), F = meet(B, 180 - b, [0, h], 0);
 const P = fit({A, B, C, D: [1, h], E: [0, h], G, F}, 30), c = mid(P.A, P.B, P.D, P.E);
 return fig(poly([P.A, P.B, P.D, P.E]) + seg(P.A, P.C) + seg(P.B, P.C) + mark(`${e}°`, P.A, P.E, P.G, `${e}°`, {r: 62}) + mark(`${cfd}°`, P.F, P.C, P.D) + mark('ask', P.C, P.A, P.B, '?')
  + pts(P, ['A', 'B', 'D', 'E'], c) + pt('C', P.C, 0, -10) + pt('G', P.G, -12, -8) + pt('F', P.F, -14, -8), 'Prostokąt ABDE i trójkąt ABC');
}

export const angleQuestions8 = [
 // Kąty wierzchołkowe i przyległe
 pick('wk8-1a',`${crossing(58,'v',15)}${CROSS}`,58,[122,32,29],1,'Kąt <i>α</i> leży naprzeciw kąta 58° — to kąty <b>wierzchołkowe</b>, a kąty wierzchołkowe są równe: <i>α</i> = <b>58°</b>.'),
 pick('wk8-1b',`${crossing(71,'p',-10)}${CROSS}`,109,[71,19,119],3,'Kąty <i>α</i> i 71° mają wspólne ramię, a pozostałe ramiona tworzą prostą — to kąty <b>przyległe</b>, razem 180°. <i>α</i> = 180° − 71° = <b>109°</b>.'),
 pick('wk8-1c',`${crossing(127,'v',20)}${CROSS}`,127,[53,63,37],0,'Kąty wierzchołkowe są równe: <i>α</i> = <b>127°</b>. 53° to kąt przyległy do niego.'),
 pick('wk8-1d',`${crossing(143,'p',0)}${CROSS}`,37,[143,53,47],2,'Kąty przyległe mają razem 180°: <i>α</i> = 180° − 143° = <b>37°</b>.'),
 // Kąty przy prostej i wokół punktu
 pick('wk8-2a',`${rays([200,170],[38,103],[[0,38,'38°'],[38,103,'δ'],[103,180,'77°']],true)}Punkt <i>O</i> leży na prostej <i>a</i>. Ile stopni ma kąt <i>δ</i>?`,65,[115,77,55],2,'Trzy kąty przy prostej tworzą kąt półpełny: 38° + <i>δ</i> + 77° = 180°, więc <i>δ</i> = 180° − 115° = <b>65°</b>.'),
 pick('wk8-2b',`${rays([200,170],[90,128],[[0,90,''],[90,128,'δ'],[128,180,'52°']],true)}Punkt <i>O</i> leży na prostej <i>a</i>. Ile stopni ma kąt <i>δ</i>?`,38,[52,128,48],0,'Kwadracik oznacza kąt prosty: 90° + <i>δ</i> + 52° = 180°, więc <i>δ</i> = <b>38°</b>.'),
 pick('wk8-2c',`${rays([200,118],[0,145,265],[[0,145,'145°',{r:36}],[145,265,'120°',{r:36}],[265,360,'δ',{r:36}]],false,100,[10,-10])}Z punktu <i>O</i> wychodzą trzy półproste. Ile stopni ma kąt <i>δ</i>?`,95,[85,105,265],3,'Kąty wokół punktu tworzą kąt pełny: 145° + 120° + <i>δ</i> = 360°, więc <i>δ</i> = <b>95°</b>.'),
 pick('wk8-2d',`${rays([200,118],[20,90],[[90,20,'290°',{big:true,r:22}],[20,90,'δ',{r:44}]],false,100,[-30,-22])}Ile stopni ma kąt <i>δ</i>?`,70,[110,60,80],1,'Kąt wklęsły i kąt wypukły o tych samych ramionach tworzą razem kąt pełny: <i>δ</i> = 360° − 290° = <b>70°</b>.'),
 // Nazwy par kątów
 q('wk8-3a',`${transversal(62,[[1,0,62,'α','α'],[2,0,62,'β','β']])}${NAMEQ}`,PAIRS,0,'Kąty leżą w tym samym położeniu przy obu prostych (nad prostą i na prawo od siecznej) — to kąty <b>odpowiadające</b>. Przy prostych równoległych są równe.'),
 q('wk8-3b',`${transversal(118,[[1,298,360,'α','α'],[2,118,180,'β','β']])}${NAMEQ}`,PAIRS,1,'Oba kąty leżą między prostymi, po przeciwnych stronach siecznej — to kąty <b>naprzemianległe</b>. Przy prostych równoległych są równe.'),
 q('wk8-3c',`${transversal(55,[[1,0,55,'α','α'],[1,180,235,'β','β']])}${NAMEQ}`,PAIRS,2,'Kąty mają wspólny wierzchołek, a ich ramiona są przedłużeniami ramion drugiego kąta — to kąty <b>wierzchołkowe</b>.'),
 q('wk8-3d',`${transversal(70,[[2,0,70,'α','α'],[2,70,180,'β','β']])}${NAMEQ}`,PAIRS,3,'Kąty mają wspólne ramię, a dwa pozostałe ramiona tworzą prostą — to kąty <b>przyległe</b>. Razem mają 180°.'),
 // Proste równoległe przecięte trzecią prostą
 pick('wk8-4a',`${transversal(68,[[1,0,68,'68°','68°'],[2,0,68,'ask','α']])}${PARQ}`,68,[112,22,58],3,'Kąty <i>α</i> i 68° są <b>odpowiadające</b>, a przy prostych równoległych kąty odpowiadające są równe: <i>α</i> = <b>68°</b>.'),
 pick('wk8-4b',`${transversal(57,[[1,180,237,'57°','57°'],[2,0,57,'ask','α']])}${PARQ}`,57,[123,33,67],1,'Kąty <i>α</i> i 57° są <b>naprzemianległe</b> (między prostymi, po dwóch stronach siecznej), więc są równe: <i>α</i> = <b>57°</b>.'),
 pick('wk8-4c',`${transversal(63,[[1,180,243,'63°','63°'],[2,63,180,'ask','α']])}${PARQ}`,117,[63,27,127],0,'Kąt naprzemianległy do 63° leży przy prostej <i>l</i> obok kąta <i>α</i> — to kąty przyległe. <i>α</i> = 180° − 63° = <b>117°</b>.'),
 pick('wk8-4d',`${transversal(132,[[1,132,180,'48°','48°'],[2,0,132,'ask','α']])}${PARQ}`,132,[48,42,138],2,'Kąt odpowiadający do 48° leży przy prostej <i>l</i> obok kąta <i>α</i>. Kąty przyległe: <i>α</i> = 180° − 48° = <b>132°</b>.'),
 // Dwusieczna kąta
 pick('wk8-5a',`${bisector(68,[['A','D','34°','34°',{r:95}],['A','C','ask','α',{r:40,lat:0.78}]])}Półprosta <i>BD</i> jest dwusieczną kąta <i>ABC</i>. Ile stopni ma kąt <i>α</i>?`,68,[34,17,146],0,'Dwusieczna dzieli kąt na dwa równe kąty, więc cały kąt <i>ABC</i> ma 2 · 34° = <b>68°</b>.'),
 pick('wk8-5b',`${bisector(118,[['A','C','118°','118°',{r:28,lat:0.25}],['D','C','ask','α',{r:78}]])}Półprosta <i>BD</i> jest dwusieczną kąta <i>ABC</i>. Ile stopni ma kąt <i>α</i>?`,59,[118,62,61],2,'Dwusieczna dzieli kąt na połowy: <i>α</i> = 118° : 2 = <b>59°</b>.'),
 pick('wk8-5c',`${bisector(64,[['A','C','64°','64°',{r:26,lat:0.2}],['D','F','ask','α',{r:84,square:false}]],'EF')}Punkty <i>A</i>, <i>B</i>, <i>E</i> leżą na jednej prostej. <i>BD</i> i <i>BF</i> są dwusiecznymi kątów <i>ABC</i> i <i>CBE</i>. Ile stopni ma kąt <i>α</i>?`,90,[32,116,58],1,'Kąt <i>CBE</i> = 180° − 64° = 116°. <i>α</i> = 64° : 2 + 116° : 2 = 32° + 58° = <b>90°</b>. Dwusieczne kątów przyległych są zawsze prostopadłe, bo (180° : 2) = 90°.'),
 pick('wk8-5d',`${bisector(82,[['D','C','41°','41°',{r:62}],['C','E','ask','α',{r:30}]],'E')}Punkty <i>A</i>, <i>B</i>, <i>E</i> leżą na jednej prostej, a <i>BD</i> jest dwusieczną kąta <i>ABC</i>. Ile stopni ma kąt <i>α</i>?`,98,[41,82,139],3,'Kąt <i>ABC</i> = 2 · 41° = 82°. Kąt <i>α</i> jest do niego przyległy: 180° − 82° = <b>98°</b>.'),
 // Suma kątów trójkąta
 pick('wk8-6a','Dwa kąty trójkąta mają <b>48°</b> i <b>67°</b>. Ile stopni ma trzeci kąt?',65,[55,75,115],3,'Suma kątów trójkąta to 180°: 180° − 48° − 67° = <b>65°</b>.'),
 pick('wk8-6b','Kąt zewnętrzny trójkąta <i>ABC</i> przy wierzchołku <i>C</i> ma <b>128°</b>, a kąt <i>A</i> ma <b>53°</b>. Ile stopni ma kąt <i>B</i>?',75,[52,99,105],0,'Kąt wewnętrzny przy <i>C</i> to 180° − 128° = 52°, więc <i>B</i> = 180° − 52° − 53° = <b>75°</b>. Krócej: kąt zewnętrzny jest równy sumie dwóch kątów wewnętrznych do niego nieprzyległych, czyli 128° − 53° = 75°.'),
 pick('wk8-6c','W trójkącie równoramiennym kąt przy podstawie ma <b>38°</b>. Ile stopni ma kąt między ramionami?',104,[71,142,76],2,'Kąty przy podstawie są równe: 180° − 2 · 38° = <b>104°</b>.'),
 pick('wk8-6d','W trójkącie równoramiennym kąt między ramionami ma <b>46°</b>. Ile stopni ma kąt przy podstawie?',67,[134,46,23],1,'(180° − 46°) : 2 = 134° : 2 = <b>67°</b>.'),
 // Dwie proste przecinające proste równoległe
 pick('wk8-7a',`${apex(58,66)}Proste <i>a</i> i <i>b</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,56,[124,66,58],2,'Kąt przyległy do 122° ma 58°, a kąt odpowiadający przy prostej <i>a</i> też 58°. Kąt przyległy do 114° ma 66°. W trójkącie nad prostą <i>a</i>: <i>α</i> = 180° − 58° − 66° = <b>56°</b>.'),
 pick('wk8-7b',`${apex(71,49)}Proste <i>a</i> i <i>b</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,60,[120,71,49],3,'180° − 109° = 71° (kąt odpowiadający przy <i>a</i>), 180° − 131° = 49°. <i>α</i> = 180° − 71° − 49° = <b>60°</b>.'),
 pick('wk8-7c',`${apex(64,72)}Proste <i>a</i> i <i>b</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,44,[136,64,72],1,'180° − 116° = 64°, 180° − 108° = 72°. <i>α</i> = 180° − 64° − 72° = <b>44°</b>.'),
 pick('wk8-7d',`${apex(52,61)}Proste <i>a</i> i <i>b</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,67,[113,61,52],0,'180° − 128° = 52°, 180° − 119° = 61°. <i>α</i> = 180° − 52° − 61° = <b>67°</b>.'),
 // Łamana między prostymi równoległymi
 pick('wk8-8a',`${zigzag(28,47)}Proste <i>k</i> i <i>l</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,75,[19,105,133],1,'Przez <i>P</i> prowadzimy prostą równoległą do <i>k</i> i <i>l</i>. Dzieli ona kąt <i>α</i> na dwa kąty naprzemianległe do 28° i 47°: <i>α</i> = 28° + 47° = <b>75°</b>.'),
 pick('wk8-8b',`${zigzag(33,52)}Proste <i>k</i> i <i>l</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,85,[19,95,42],0,'Prosta przez <i>P</i> równoległa do <i>k</i> dzieli <i>α</i> na kąty naprzemianległe: <i>α</i> = 33° + 52° = <b>85°</b>.'),
 pick('wk8-8c',`${zigzag(41,64)}Proste <i>k</i> i <i>l</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,105,[23,75,115],3,'<i>α</i> = 41° + 64° = <b>105°</b> (dwa kąty naprzemianległe przy prostej przez <i>P</i> równoległej do <i>k</i>).'),
 pick('wk8-8d',`${zigzag(24,58)}Proste <i>k</i> i <i>l</i> są równoległe. Ile stopni ma kąt <i>α</i>?`,82,[34,98,66],2,'<i>α</i> = 24° + 58° = <b>82°</b>.'),
 // Dwusieczna w trójkącie
 pick('wk8-9a',`${kot(68,29,'O')}Odcinek <i>KA</i> zawiera się w dwusiecznej kąta <i>OKT</i>. Ile stopni ma kąt <i>KOT</i>?`,54,[58,83,43],0,'Kąt <i>K</i> = 2 · 29° = 58°. Kąt <i>O</i> = 180° − 68° − 58° = <b>54°</b>. 83° to wynik bez podwojenia 29°.'),
 pick('wk8-9b',`${kot(80,22,'O')}Odcinek <i>KA</i> zawiera się w dwusiecznej kąta <i>OKT</i>. Ile stopni ma kąt <i>KOT</i>?`,56,[44,78,34],3,'Kąt <i>K</i> = 2 · 22° = 44°, więc kąt <i>O</i> = 180° − 80° − 44° = <b>56°</b>.'),
 pick('wk8-9c',`${kot(70,25,'KAT')}Odcinek <i>KA</i> zawiera się w dwusiecznej kąta <i>OKT</i>. Ile stopni ma kąt <i>KAT</i>?`,85,[95,60,110],2,'Kąt <i>AKT</i> też ma 25° (dwusieczna). W trójkącie <i>KAT</i>: 180° − 70° − 25° = <b>85°</b>.'),
 pick('wk8-9d',`${kot(62,31,'KAO')}Odcinek <i>KA</i> zawiera się w dwusiecznej kąta <i>OKT</i>. Ile stopni ma kąt <i>KAO</i>?`,93,[87,56,118],1,'W trójkącie <i>KAT</i>: kąt <i>KAT</i> = 180° − 62° − 31° = 87°. Kąt <i>KAO</i> jest do niego przyległy: 180° − 87° = <b>93°</b>.'),
 // Dwa trójkąty równoramienne
 pick('wk8-10a',`${isoD(44)}W trójkącie równoramiennym <i>ABC</i> (<i>CA</i> = <i>CB</i>) poprowadzono odcinek <i>CD</i> tak, że <i>CA</i> = <i>DA</i>. Ile stopni ma kąt <i>α</i>?`,24,[68,92,46],3,'Kąt <i>ACB</i> = 180° − 2 · 44° = 92°. Trójkąt <i>ADC</i> jest równoramienny, więc kąt <i>ACD</i> = (180° − 44°) : 2 = 68°. <i>α</i> = 92° − 68° = <b>24°</b>.'),
 pick('wk8-10b',`${isoD(52)}W trójkącie równoramiennym <i>ABC</i> (<i>CA</i> = <i>CB</i>) poprowadzono odcinek <i>CD</i> tak, że <i>CA</i> = <i>DA</i>. Ile stopni ma kąt <i>α</i>?`,12,[64,76,26],2,'Kąt <i>ACB</i> = 180° − 104° = 76°, kąt <i>ACD</i> = (180° − 52°) : 2 = 64°. <i>α</i> = 76° − 64° = <b>12°</b>.'),
 pick('wk8-10c',`${isoD(40)}W trójkącie równoramiennym <i>ABC</i> (<i>CA</i> = <i>CB</i>) poprowadzono odcinek <i>CD</i> tak, że <i>CA</i> = <i>DA</i>. Ile stopni ma kąt <i>α</i>?`,30,[70,100,40],0,'Kąt <i>ACB</i> = 180° − 80° = 100°, kąt <i>ACD</i> = (180° − 40°) : 2 = 70°. <i>α</i> = 100° − 70° = <b>30°</b>.'),
 pick('wk8-10d',`${isoD(50)}W trójkącie równoramiennym <i>ABC</i> (<i>CA</i> = <i>CB</i>) poprowadzono odcinek <i>CD</i> tak, że <i>CA</i> = <i>DA</i>. Ile stopni ma kąt <i>α</i>?`,15,[65,80,25],1,'Kąt <i>ACB</i> = 180° − 100° = 80°, kąt <i>ACD</i> = (180° − 50°) : 2 = 65°. <i>α</i> = 80° − 65° = <b>15°</b>.'),
 // Prostokąt i trójkąt
 pick('wk8-11a',`${rectTri(24,122)}Czworokąt <i>ABDE</i> jest prostokątem. Ile stopni ma kąt <i>ACB</i>?`,56,[66,58,64],1,'Kąt <i>GAB</i> = 90° − 24° = 66°. Kąt <i>GFC</i> = 180° − 122° = 58°, a kąt <i>ABC</i> jest do niego odpowiadający (<i>AB</i> ∥ <i>ED</i>), więc też 58°. Kąt <i>ACB</i> = 180° − 66° − 58° = <b>56°</b>.'),
 pick('wk8-11b',`${rectTri(35,115)}Czworokąt <i>ABDE</i> jest prostokątem. Ile stopni ma kąt <i>ACB</i>?`,60,[55,65,50],2,'Kąt <i>GAB</i> = 90° − 35° = 55°, kąt <i>ABC</i> = 180° − 115° = 65° (odpowiadający do <i>GFC</i>). Kąt <i>ACB</i> = 180° − 55° − 65° = <b>60°</b>.'),
 pick('wk8-11c',`${rectTri(28,128)}Czworokąt <i>ABDE</i> jest prostokątem. Ile stopni ma kąt <i>ACB</i>?`,66,[62,52,76],3,'Kąt <i>GAB</i> = 62°, kąt <i>ABC</i> = 180° − 128° = 52°. Kąt <i>ACB</i> = 180° − 62° − 52° = <b>66°</b>.'),
 pick('wk8-11d',`${rectTri(40,110)}Czworokąt <i>ABDE</i> jest prostokątem. Ile stopni ma kąt <i>ACB</i>?`,60,[50,70,40],0,'Kąt <i>GAB</i> = 50°, kąt <i>ABC</i> = 180° − 110° = 70°. Kąt <i>ACB</i> = 180° − 50° − 70° = <b>60°</b>.'),
 // Przekątne prostokąta
 pick('wk8-12a','Przekątne prostokąta <i>ABCD</i> przecinają się w punkcie <i>P</i>. Kąt <i>APB</i> ma <b>126°</b>. Ile stopni ma kąt <i>APD</i>?',54,[126,27,63],2,'Kąty <i>APB</i> i <i>APD</i> są przyległe: 180° − 126° = <b>54°</b>.'),
 pick('wk8-12b','Przekątne prostokąta <i>ABCD</i> przecinają się w punkcie <i>P</i>. Kąt <i>APB</i> ma <b>118°</b>. Ile stopni ma kąt <i>PAB</i>?',31,[62,59,118],1,'Przekątne prostokąta są równe i dzielą się na połowy, więc <i>PA</i> = <i>PB</i> i trójkąt <i>APB</i> jest równoramienny. Kąt <i>PAB</i> = (180° − 118°) : 2 = <b>31°</b>.'),
 pick('wk8-12c','Przekątna <i>AC</i> prostokąta <i>ABCD</i> tworzy z bokiem <i>AB</i> kąt <b>34°</b>. Przekątne przecinają się w punkcie <i>P</i>. Ile stopni ma kąt <i>APB</i>?',112,[68,146,56],0,'Trójkąt <i>APB</i> jest równoramienny (<i>PA</i> = <i>PB</i>), więc kąt <i>PBA</i> też ma 34°. Kąt <i>APB</i> = 180° − 2 · 34° = <b>112°</b>.'),
 pick('wk8-12d','Przekątna <i>AC</i> prostokąta <i>ABCD</i> tworzy z bokiem <i>AB</i> kąt <b>27°</b>. Przekątne przecinają się w punkcie <i>P</i>. Ile stopni ma kąt <i>APD</i>?',54,[126,63,27],3,'Kąt <i>APB</i> = 180° − 2 · 27° = 126°, a kąt <i>APD</i> jest do niego przyległy: 180° − 126° = <b>54°</b>.'),
 // Trójkąt równoboczny rozcięty na dwa trójkąty
 pick('wk8-13a','Trójkąt równoboczny rozcięto odcinkiem poprowadzonym z wierzchołka do przeciwległego boku. Najmniejszy kąt jednego z powstałych trójkątów ma <b>14°</b>. Jakie kąty ma drugi trójkąt?','46°, 60°, 74°',['14°, 60°, 106°','46°, 67°, 67°','30°, 60°, 90°'],0,'Pierwszy trójkąt: 14°, 60° (kąt trójkąta równobocznego) i 180° − 74° = 106°. Drugi: 60° − 14° = 46° przy rozciętym wierzchołku, 60° i 180° − 106° = 74° (kąt przyległy). Odpowiedź: <b>46°, 60°, 74°</b>.',(v)=>v),
 pick('wk8-13b','Trójkąt równoboczny rozcięto odcinkiem poprowadzonym z wierzchołka do przeciwległego boku. Najmniejszy kąt jednego z powstałych trójkątów ma <b>22°</b>. Jakie kąty ma drugi trójkąt?','38°, 60°, 82°',['22°, 60°, 98°','38°, 71°, 71°','22°, 38°, 120°'],1,'Pierwszy trójkąt: 22°, 60°, 98°. Drugi: 60° − 22° = 38°, 60° i 180° − 98° = 82°. Odpowiedź: <b>38°, 60°, 82°</b>.',(v)=>v),
 pick('wk8-13c','Trójkąt równoboczny rozcięto odcinkiem poprowadzonym z wierzchołka do przeciwległego boku. Najmniejszy kąt jednego z powstałych trójkątów ma <b>8°</b>. Jakie kąty ma drugi trójkąt?','52°, 60°, 68°',['8°, 60°, 112°','52°, 64°, 64°','30°, 60°, 90°'],3,'Pierwszy trójkąt: 8°, 60°, 112°. Drugi: 52°, 60° i 180° − 112° = 68°. Odpowiedź: <b>52°, 60°, 68°</b>.',(v)=>v),
 pick('wk8-13d','Trójkąt równoboczny rozcięto odcinkiem poprowadzonym z wierzchołka do przeciwległego boku. Najmniejszy kąt jednego z powstałych trójkątów ma <b>18°</b>. Jakie kąty ma drugi trójkąt?','42°, 60°, 78°',['18°, 60°, 102°','42°, 69°, 69°','36°, 60°, 84°'],2,'Pierwszy trójkąt: 18°, 60°, 102°. Drugi: 42°, 60° i 78°. Odpowiedź: <b>42°, 60°, 78°</b>.',(v)=>v),
 // Prawda czy fałsz
 truth('wk8-14a','','Kąty wierzchołkowe są zawsze równe.','Dwa kąty ostre mogą być kątami przyległymi.','PF','I — <b>prawda</b>. II — <b>fałsz</b>: kąty przyległe mają razem 180°, a dwa kąty ostre mają razem mniej niż 180°.'),
 truth('wk8-14b','Dwie proste równoległe przecięto trzecią prostą. ','Wśród powstałych kątów mogą być kąty 72° i 118°.','Wśród powstałych kątów mogą być kąty 72° i 108°.','FP','Powstają tylko dwa rodzaje kątów: <i>x</i> i 180° − <i>x</i>. 72° + 108° = 180° — <b>prawda</b> (II). 72° + 118° = 190° — <b>fałsz</b> (I).'),
 truth('wk8-14c','','Dwusieczne dwóch kątów przyległych są prostopadłe.','Kąt przy podstawie trójkąta równoramiennego jest zawsze ostry.','PP','I: połówki kątów przyległych dają 180° : 2 = 90° — <b>prawda</b>. II: dwa równe kąty przy podstawie mają razem mniej niż 180°, więc każdy mniej niż 90° — <b>prawda</b>.'),
 truth('wk8-14d','','Kąt przy podstawie trójkąta równoramiennego może mieć 95°.','Dwa kąty rozwarte mogą być kątami przyległymi.','FF','I: dwa kąty po 95° to już 190° &gt; 180° — <b>fałsz</b>. II: dwa kąty rozwarte mają razem więcej niż 180° — <b>fałsz</b>.'),
];

// ——— Kąty — zadania ———
// Półproste wychodzące z punktu O na prostej; kąty kolejno od prawej: k1·α, k2·α, …; A i B na wybranych półprostych.
function multiples(ks, ia, ib) {
 const al = 180 / ks.reduce((s, k) => s + k, 0), O = [200, 175], dirs = ks.reduce((d, k) => [...d, d[d.length - 1] + k * al], [0]);
 const P = (d) => at(O, d, 125), lab = (k) => (k === 1 ? 'α' : `${k}α`);
 return fig(full('a', O, P(0)) + dirs.slice(1, -1).map((d) => seg(O, P(d))).join('') + ks.map((k, i) => mark(`k${i}`, O, P(dirs[i]), P(dirs[i + 1]), lab(k), {r: 30 + (i % 2) * 22})).join('')
  + pt('O', O, 0, 24) + pt('A', at(O, dirs[ia], 110), 0, dirs[ia] === 180 ? 22 : -10) + pt('B', at(O, dirs[ib], 110), 0, dirs[ib] === 0 ? 22 : -10), 'Półproste wychodzące z punktu O leżącego na prostej');
}
// Trójkąt równoramienny ABC (AC = BC) i dwusieczne kątów przy podstawie przecinające się w D.
function isoBis(apexA) {
 const b = (180 - apexA) / 2, A = [0, 0], B = [2, 0], C = [1, Math.tan(rad(b))], D = [1, Math.tan(rad(b / 2))];
 const A2 = meet(A, b / 2, B, 180 - b), B2 = meet(B, 180 - b / 2, A, b), P = fit({A, B, C, D, A2, B2}, 30), c = mid(P.A, P.B, P.C);
 return fig(poly([P.A, P.B, P.C]) + seg(P.A, P.A2, '#ff8a8a') + seg(P.B, P.B2, '#ff8a8a') + mark(`${apexA}°`, P.C, P.A, P.B) + mark('ask', P.D, P.A, P.B, 'γ', {r: 20}) + pts(P, ['A', 'B', 'C'], c) + pt('D', P.D, 0, -12), 'Trójkąt równoramienny ABC i dwusieczne kątów przy podstawie');
}
// Trójkąt równoramienny ABC (AC = BC) i trójkąt prostokątny ABD (kąt prosty przy A).
function isoRight(dac, cbd) {
 const base = 90 - dac, A = [0, 0], B = [1, 0], C = [0.5, 0.5 * Math.tan(rad(base))], D = [0, Math.tan(rad(base - cbd))];
 const P = fit({A, B, C, D}, 30), c = mid(P.A, P.B, P.D);
 return fig(poly([P.A, P.B, P.D]) + seg(P.A, P.C) + seg(P.B, P.C) + mark('prosty', P.A, P.B, P.D, '') + mark(`${dac}°`, P.A, P.D, P.C, `${dac}°`, {r: 48}) + mark(`${cbd}°`, P.B, P.C, P.D, `${cbd}°`, {r: 70}) + mark('ask', P.D, P.A, P.B, 'x', {r: 34})
  + pts(P, ['A', 'B', 'D'], c) + pt('C', P.C, 6, -10), 'Trójkąt równoramienny ABC i trójkąt prostokątny ABD o wspólnym boku AB');
}
// Trapez równoramienny ABCD z przekątną AC; dane kąty DAC = p i CAB = qq; pytanie o kąt przy D ('D') albo przy B ('B').
function trapDiag(p, qq, ask) {
 const a = p + qq, A = [0, 0], D = [Math.cos(rad(a)), Math.sin(rad(a))], b = Math.cos(rad(a)) + Math.sin(rad(a)) / Math.tan(rad(qq));
 const P = fit({A, B: [b, 0], C: [b - Math.cos(rad(a)), Math.sin(rad(a))], D}), c = mid(P.A, P.B, P.C, P.D);
 return fig(poly([P.A, P.B, P.C, P.D]) + seg(P.A, P.C, '#ff8a8a') + mark(`${p}°`, P.A, P.C, P.D, `${p}°`, {r: 62}) + mark(`${qq}°`, P.A, P.B, P.C, `${qq}°`, {r: 40})
  + (ask === 'D' ? mark('ask', P.D, P.A, P.C, 'α') : mark('ask', P.B, P.C, P.A, 'β')) + pts(P, ['A', 'B', 'C', 'D'], c), 'Trapez równoramienny ABCD z przekątną AC');
}
// Trapez ABCD, w którym przekątna AC dzieli kąt A na połowy α, a kąt B ma 2α; dany kąt DCA = m.
function trapBis(m) {
 const P = fit({A: [0, 0], B: [1 + 2 * Math.cos(rad(2 * m)), 0], C: [1 + Math.cos(rad(2 * m)), Math.sin(rad(2 * m))], D: [Math.cos(rad(2 * m)), Math.sin(rad(2 * m))]}), c = mid(P.A, P.B, P.C, P.D);
 return fig(poly([P.A, P.B, P.C, P.D]) + seg(P.A, P.C, '#ff8a8a') + mark(`${m}°`, P.C, P.D, P.A, `${m}°`, {r: 46}) + mark('α1', P.A, P.C, P.D, 'α', {r: 34}) + mark('α2', P.A, P.B, P.C, 'α', {r: 54}) + mark('2α', P.B, P.C, P.A, '2α') + mark('ask', P.D, P.A, P.C, 'β')
  + pts(P, ['A', 'B', 'C', 'D'], c), 'Trapez ABCD z przekątną AC');
}
// Trójkąt równoboczny ABC i punkt D na boku AB, kąt CDB = al.
function equiD(al) {
 const C = [0.5, Math.sqrt(3) / 2], P = fit({A: [0, 0], B: [1, 0], C, D: [0.5 - C[1] / Math.tan(rad(al)), 0]}), c = mid(P.A, P.B, P.C);
 return fig(poly([P.A, P.B, P.C]) + seg(P.C, P.D) + mark(`${al}°`, P.D, P.B, P.C, `${al}°`, {lat: 0.3}) + mark('ask', P.C, P.D, P.A, 'x', {r: 52}) + pts(P, ['A', 'B', 'C'], c) + pt('D', P.D, 0, 22), 'Trójkąt równoboczny ABC i odcinek CD');
}
const AB = (a, b) => `A = ${a}°, B = ${b}°`;
const TWO = (a, b) => `${a}° i ${b}°`;

export const angleTaskQuestions8 = [
 // Kąty trójkąta — jeden kąt kilka razy większy od drugiego
 pick('kz8-1a','W trójkącie <i>ABC</i> kąt <i>B</i> jest <b>3 razy</b> większy od kąta <i>A</i>, a kąt <i>C</i> ma <b>40°</b>. Jakie miary mają kąty <i>A</i> i <i>B</i>?',AB(35,105),[AB(45,135),AB(35,70),AB(40,100)],2,'<i>α</i> + 3<i>α</i> + 40° = 180°, więc 4<i>α</i> = 140° i <i>α</i> = 35°. Kąt <i>B</i> = 3 · 35° = 105°. Odpowiedź: <b>A = 35°, B = 105°</b>.',(v)=>v),
 pick('kz8-1b','W trójkącie <i>ABC</i> kąt <i>B</i> jest <b>4 razy</b> większy od kąta <i>A</i>, a kąt <i>C</i> ma <b>55°</b>. Jakie miary mają kąty <i>A</i> i <i>B</i>?',AB(25,100),[AB(36,144),AB(25,75),AB(31,94)],0,'5<i>α</i> + 55° = 180°, więc 5<i>α</i> = 125° i <i>α</i> = 25°. Kąt <i>B</i> = 4 · 25° = 100°.',(v)=>v),
 pick('kz8-1c','W trójkącie <i>ABC</i> kąt <i>B</i> jest <b>2 razy</b> większy od kąta <i>A</i>, a kąt <i>C</i> ma <b>72°</b>. Jakie miary mają kąty <i>A</i> i <i>B</i>?',AB(36,72),[AB(60,120),AB(54,54),AB(36,108)],3,'3<i>α</i> + 72° = 180°, więc 3<i>α</i> = 108° i <i>α</i> = 36°. Kąt <i>B</i> = 72°. Trójkąt ma kąty 36°, 72°, 72°.',(v)=>v),
 pick('kz8-1d','W trójkącie <i>ABC</i> kąt <i>B</i> jest <b>5 razy</b> większy od kąta <i>A</i>, a kąt <i>C</i> ma <b>36°</b>. Jakie miary mają kąty <i>A</i> i <i>B</i>?',AB(24,120),[AB(30,150),AB(28,116),AB(24,96)],1,'6<i>α</i> + 36° = 180°, więc 6<i>α</i> = 144° i <i>α</i> = 24°. Kąt <i>B</i> = 5 · 24° = 120°.',(v)=>v),
 // Kąty równoległoboku
 pick('kz8-2a','Jeden z kątów równoległoboku jest o <b>70°</b> większy od drugiego. Jakie miary mają kąty tego równoległoboku?',TWO(55,125),[TWO(70,110),TWO(35,105),TWO(145,35)],1,'Kąty przy jednym boku równoległoboku mają razem 180°: <i>α</i> + <i>α</i> + 70° = 180°, więc <i>α</i> = 55°, a drugi kąt 125°.',(v)=>v),
 pick('kz8-2b','Jeden z kątów równoległoboku jest o <b>20°</b> większy od drugiego. Jakie miary mają kąty tego równoległoboku?',TWO(80,100),[TWO(70,90),TWO(90,110),TWO(20,160)],3,'2<i>α</i> + 20° = 180°, więc <i>α</i> = 80°, a drugi kąt 100°.',(v)=>v),
 pick('kz8-2c','Jeden z kątów równoległoboku jest o <b>36°</b> większy od drugiego. Jakie miary mają kąty tego równoległoboku?',TWO(72,108),[TWO(36,144),TWO(54,90),TWO(62,98)],0,'2<i>α</i> + 36° = 180°, więc <i>α</i> = 72°, a drugi kąt 108°.',(v)=>v),
 pick('kz8-2d','Jeden z kątów równoległoboku jest o <b>54°</b> większy od drugiego. Jakie miary mają kąty tego równoległoboku?',TWO(63,117),[TWO(54,126),TWO(72,126),TWO(27,153)],2,'2<i>α</i> + 54° = 180°, więc 2<i>α</i> = 126° i <i>α</i> = 63°, a drugi kąt 117°.',(v)=>v),
 // Najmniejszy kąt α
 pick('kz8-3a','Najmniejszy kąt <i>α</i> trójkąta jest <b>4 razy</b> mniejszy od drugiego kąta oraz o <b>30°</b> mniejszy od trzeciego. Ile stopni ma kąt <i>α</i>?',25,[30,36,20],3,'Kąty to <i>α</i>, 4<i>α</i> i <i>α</i> + 30°. 6<i>α</i> + 30° = 180°, więc 6<i>α</i> = 150° i <i>α</i> = <b>25°</b> (kąty 25°, 100°, 55°).'),
 pick('kz8-3b','Najmniejszy kąt <i>α</i> trójkąta jest <b>3 razy</b> mniejszy od drugiego kąta oraz o <b>40°</b> mniejszy od trzeciego. Ile stopni ma kąt <i>α</i>?',28,[35,32,24],1,'<i>α</i> + 3<i>α</i> + <i>α</i> + 40° = 180°, więc 5<i>α</i> = 140° i <i>α</i> = <b>28°</b> (kąty 28°, 84°, 68°).'),
 pick('kz8-3c','Najmniejszy kąt <i>α</i> trójkąta jest <b>5 razy</b> mniejszy od drugiego kąta oraz o <b>26°</b> mniejszy od trzeciego. Ile stopni ma kąt <i>α</i>?',22,[26,30,18],2,'7<i>α</i> + 26° = 180°, więc 7<i>α</i> = 154° i <i>α</i> = <b>22°</b> (kąty 22°, 110°, 48°).'),
 pick('kz8-3d','Najmniejszy kąt <i>α</i> trójkąta jest <b>2 razy</b> mniejszy od drugiego kąta oraz o <b>48°</b> mniejszy od trzeciego. Ile stopni ma kąt <i>α</i>?',33,[45,36,30],0,'4<i>α</i> + 48° = 180°, więc 4<i>α</i> = 132° i <i>α</i> = <b>33°</b> (kąty 33°, 66°, 81°).'),
 // Największy kąt β
 pick('kz8-4a','Największy kąt <i>β</i> trójkąta jest <b>2 razy</b> większy od drugiego kąta, a trzeci kąt ma <b>60°</b>. Ile stopni ma kąt <i>β</i>?',80,[60,40,120],0,'Drugi kąt to <i>β</i>/2. <i>β</i> + <i>β</i>/2 + 60° = 180°, więc <sup>3</sup>/<sub>2</sub><i>β</i> = 120° i <i>β</i> = <b>80°</b>.'),
 pick('kz8-4b','Największy kąt <i>β</i> trójkąta jest <b>2 razy</b> większy od drugiego kąta, a trzeci kąt ma <b>45°</b>. Ile stopni ma kąt <i>β</i>?',90,[45,135,60],2,'<sup>3</sup>/<sub>2</sub><i>β</i> = 180° − 45° = 135°, więc <i>β</i> = 135° · <sup>2</sup>/<sub>3</sub> = <b>90°</b>.'),
 pick('kz8-4c','Największy kąt <i>β</i> trójkąta jest <b>2 razy</b> większy od drugiego kąta, a trzeci kąt ma <b>33°</b>. Ile stopni ma kąt <i>β</i>?',98,[49,147,66],1,'<sup>3</sup>/<sub>2</sub><i>β</i> = 147°, więc <i>β</i> = <b>98°</b> (kąty 98°, 49°, 33°).'),
 pick('kz8-4d','Największy kąt <i>β</i> trójkąta jest <b>2 razy</b> większy od drugiego kąta, a trzeci kąt ma <b>54°</b>. Ile stopni ma kąt <i>β</i>?',84,[42,126,63],3,'<sup>3</sup>/<sub>2</sub><i>β</i> = 126°, więc <i>β</i> = <b>84°</b> (kąty 84°, 42°, 54°).'),
 // Trójkąt równoramienny
 pick('kz8-5a','W trójkącie równoramiennym kąt między ramionami jest o <b>12°</b> mniejszy od kąta przy podstawie. Ile stopni ma kąt między ramionami?',52,[64,56,76],2,'Kąty: <i>γ</i>, <i>γ</i> i <i>γ</i> − 12°. 3<i>γ</i> − 12° = 180°, więc <i>γ</i> = 64°, a kąt między ramionami 64° − 12° = <b>52°</b>.'),
 pick('kz8-5b','W trójkącie równoramiennym kąt między ramionami jest o <b>30°</b> większy od kąta przy podstawie. Ile stopni ma kąt między ramionami?',80,[50,70,100],3,'3<i>γ</i> + 30° = 180°, więc <i>γ</i> = 50°, a kąt między ramionami 50° + 30° = <b>80°</b>.'),
 pick('kz8-5c','W trójkącie równoramiennym kąt między ramionami jest o <b>21°</b> mniejszy od kąta przy podstawie. Ile stopni ma kąt między ramionami?',46,[67,88,53],0,'3<i>γ</i> − 21° = 180°, więc <i>γ</i> = 67°, a kąt między ramionami <b>46°</b>.'),
 pick('kz8-5d','W trójkącie równoramiennym kąt między ramionami jest o <b>6°</b> większy od kąta przy podstawie. Ile stopni ma kąt między ramionami?',64,[58,52,62],1,'3<i>γ</i> + 6° = 180°, więc <i>γ</i> = 58°, a kąt między ramionami <b>64°</b>.'),
 // Kąty w stosunku
 pick('kz8-6a','Miary kątów trójkąta są w stosunku <b>2 : 3 : 4</b>. Ile stopni ma <b>największy</b> kąt?',80,[60,90,40],1,'2<i>x</i> + 3<i>x</i> + 4<i>x</i> = 180°, więc <i>x</i> = 20°. Największy kąt: 4 · 20° = <b>80°</b>.'),
 pick('kz8-6b','Miary kątów trójkąta są w stosunku <b>1 : 2 : 3</b>. Ile stopni ma <b>największy</b> kąt?',90,[60,30,120],0,'6<i>x</i> = 180°, więc <i>x</i> = 30°. Największy kąt: 3 · 30° = <b>90°</b> — to trójkąt prostokątny.'),
 pick('kz8-6c','Miary kątów trójkąta są w stosunku <b>3 : 4 : 5</b>. Ile stopni ma <b>najmniejszy</b> kąt?',45,[60,75,36],3,'12<i>x</i> = 180°, więc <i>x</i> = 15°. Najmniejszy kąt: 3 · 15° = <b>45°</b>.'),
 pick('kz8-6d','Miary kątów trójkąta są w stosunku <b>2 : 5 : 8</b>. Ile stopni ma <b>środkowy</b> (drugi co do wielkości) kąt?',60,[96,36,75],2,'15<i>x</i> = 180°, więc <i>x</i> = 12°. Środkowy kąt: 5 · 12° = <b>60°</b> (kąty 24°, 60°, 96°).'),
 // Kąty przy prostej wyrażone przez α
 pick('kz8-7a',`${multiples([1,4,3,2],3,0)}Punkt <i>O</i> leży na prostej. Ile stopni ma kąt <i>AOB</i>?`,144,[36,126,108],3,'Kąty przy prostej: <i>α</i> + 4<i>α</i> + 3<i>α</i> + 2<i>α</i> = 180°, więc 10<i>α</i> = 180° i <i>α</i> = 18°. Kąt <i>AOB</i> = <i>α</i> + 4<i>α</i> + 3<i>α</i> = 8<i>α</i> = <b>144°</b>.'),
 pick('kz8-7b',`${multiples([2,3,1,3],3,1)}Punkt <i>O</i> leży na prostej. Ile stopni ma kąt <i>AOB</i>?`,80,[100,60,20],2,'2<i>α</i> + 3<i>α</i> + <i>α</i> + 3<i>α</i> = 9<i>α</i> = 180°, więc <i>α</i> = 20°. Kąt <i>AOB</i> = 3<i>α</i> + <i>α</i> = 4<i>α</i> = <b>80°</b>.'),
 pick('kz8-7c',`${multiples([3,1,4,2],2,0)}Punkt <i>O</i> leży na prostej. Ile stopni ma kąt <i>AOB</i>?`,72,[54,108,36],0,'10<i>α</i> = 180°, więc <i>α</i> = 18°. Kąt <i>AOB</i> = 3<i>α</i> + <i>α</i> = 4<i>α</i> = <b>72°</b>.'),
 pick('kz8-7d',`${multiples([5,2,1,4],4,1)}Punkt <i>O</i> leży na prostej. Ile stopni ma kąt <i>AOB</i>?`,105,[75,135,120],1,'12<i>α</i> = 180°, więc <i>α</i> = 15°. Kąt <i>AOB</i> = 2<i>α</i> + <i>α</i> + 4<i>α</i> = 7<i>α</i> = <b>105°</b>.'),
 // Dwusieczne kątów przy podstawie
 pick('kz8-8a',`${isoBis(64)}Trójkąt <i>ABC</i> jest równoramienny (<i>AC</i> = <i>BC</i>), a odcinki z <i>A</i> i <i>B</i> leżą na dwusiecznych kątów przy podstawie. Ile stopni ma kąt <i>γ</i>?`,122,[58,116,61],1,'Kąt przy podstawie: (180° − 64°) : 2 = 58°, jego połowa 29°. W trójkącie <i>ABD</i>: <i>γ</i> = 180° − 2 · 29° = <b>122°</b>.'),
 pick('kz8-8b',`${isoBis(40)}Trójkąt <i>ABC</i> jest równoramienny (<i>AC</i> = <i>BC</i>), a odcinki z <i>A</i> i <i>B</i> leżą na dwusiecznych kątów przy podstawie. Ile stopni ma kąt <i>γ</i>?`,110,[70,140,100],3,'Kąt przy podstawie: (180° − 40°) : 2 = 70°, połowa 35°. <i>γ</i> = 180° − 70° = <b>110°</b>. Ogólnie <i>γ</i> = 90° + połowa kąta między ramionami.'),
 pick('kz8-8c',`${isoBis(96)}Trójkąt <i>ABC</i> jest równoramienny (<i>AC</i> = <i>BC</i>), a odcinki z <i>A</i> i <i>B</i> leżą na dwusiecznych kątów przy podstawie. Ile stopni ma kąt <i>γ</i>?`,138,[42,84,96],2,'Kąt przy podstawie: (180° − 96°) : 2 = 42°, połowa 21°. <i>γ</i> = 180° − 42° = <b>138°</b>.'),
 pick('kz8-8d',`${isoBis(76)}Trójkąt <i>ABC</i> jest równoramienny (<i>AC</i> = <i>BC</i>), a odcinki z <i>A</i> i <i>B</i> leżą na dwusiecznych kątów przy podstawie. Ile stopni ma kąt <i>γ</i>?`,128,[52,104,142],0,'Kąt przy podstawie: (180° − 76°) : 2 = 52°, połowa 26°. <i>γ</i> = 180° − 52° = <b>128°</b>.'),
 // Trójkąt równoramienny i trójkąt prostokątny
 pick('kz8-9a',`${isoRight(28,12)}Trójkąt równoramienny <i>ABC</i> (<i>AC</i> = <i>BC</i>) ma wspólną podstawę <i>AB</i> z trójkątem prostokątnym <i>ABD</i>. Ile stopni ma kąt <i>x</i>?`,40,[50,62,28],2,'Kąt <i>CAB</i> = 90° − 28° = 62° i tyle samo ma kąt <i>ABC</i>. Kąt <i>ABD</i> = 62° − 12° = 50°. W trójkącie <i>ABD</i>: <i>x</i> = 180° − 90° − 50° = <b>40°</b>.'),
 pick('kz8-9b',`${isoRight(24,20)}Trójkąt równoramienny <i>ABC</i> (<i>AC</i> = <i>BC</i>) ma wspólną podstawę <i>AB</i> z trójkątem prostokątnym <i>ABD</i>. Ile stopni ma kąt <i>x</i>?`,44,[46,66,24],0,'Kąt <i>CAB</i> = 90° − 24° = 66° = kąt <i>ABC</i>. Kąt <i>ABD</i> = 66° − 20° = 46°. <i>x</i> = 90° − 46° = <b>44°</b>.'),
 pick('kz8-9c',`${isoRight(38,10)}Trójkąt równoramienny <i>ABC</i> (<i>AC</i> = <i>BC</i>) ma wspólną podstawę <i>AB</i> z trójkątem prostokątnym <i>ABD</i>. Ile stopni ma kąt <i>x</i>?`,48,[42,52,38],1,'Kąt <i>CAB</i> = 52° = kąt <i>ABC</i>. Kąt <i>ABD</i> = 52° − 10° = 42°. <i>x</i> = 90° − 42° = <b>48°</b>.'),
 pick('kz8-9d',`${isoRight(30,16)}Trójkąt równoramienny <i>ABC</i> (<i>AC</i> = <i>BC</i>) ma wspólną podstawę <i>AB</i> z trójkątem prostokątnym <i>ABD</i>. Ile stopni ma kąt <i>x</i>?`,46,[44,60,30],3,'Kąt <i>CAB</i> = 60° = kąt <i>ABC</i>. Kąt <i>ABD</i> = 60° − 16° = 44°. <i>x</i> = 90° − 44° = <b>46°</b>.'),
 // Trapez równoramienny z przekątną
 pick('kz8-10a',`${trapDiag(28,37,'D')}<i>ABCD</i> jest trapezem równoramiennym (<i>AB</i> ∥ <i>CD</i>). Ile stopni ma kąt <i>α</i>?`,115,[65,143,125],3,'Kąt <i>A</i> = 28° + 37° = 65°. Kąty przy ramieniu <i>AD</i> mają razem 180°: <i>α</i> = 180° − 65° = <b>115°</b>.'),
 pick('kz8-10b',`${trapDiag(22,41,'B')}<i>ABCD</i> jest trapezem równoramiennym (<i>AB</i> ∥ <i>CD</i>). Ile stopni ma kąt <i>β</i>?`,63,[117,41,22],0,'Kąt <i>A</i> = 22° + 41° = 63°. W trapezie równoramiennym kąty przy dłuższej podstawie są równe: <i>β</i> = <b>63°</b>.'),
 pick('kz8-10c',`${trapDiag(31,26,'D')}<i>ABCD</i> jest trapezem równoramiennym (<i>AB</i> ∥ <i>CD</i>). Ile stopni ma kąt <i>α</i>?`,123,[57,149,26],2,'Kąt <i>A</i> = 31° + 26° = 57°, więc <i>α</i> = 180° − 57° = <b>123°</b>.'),
 pick('kz8-10d',`${trapDiag(35,40,'B')}<i>ABCD</i> jest trapezem równoramiennym (<i>AB</i> ∥ <i>CD</i>). Ile stopni ma kąt <i>β</i>?`,75,[105,40,35],1,'Kąt <i>A</i> = 35° + 40° = 75°, a <i>β</i> jest mu równy: <b>75°</b>.'),
 // Trapez, w którym przekątna jest dwusieczną
 pick('kz8-11a',`${trapBis(34)}W trapezie <i>ABCD</i> (<i>AB</i> ∥ <i>CD</i>) przekątna <i>AC</i> dzieli kąt <i>A</i> na połowy. Ile stopni ma kąt <i>β</i>?`,112,[68,146,124],1,'Kąty <i>DCA</i> i <i>CAB</i> są naprzemianległe, więc <i>α</i> = 34°. Kąt <i>A</i> = 2<i>α</i> = 68°, a <i>β</i> = 180° − 68° = <b>112°</b>.'),
 pick('kz8-11b',`${trapBis(28)}W trapezie <i>ABCD</i> (<i>AB</i> ∥ <i>CD</i>) przekątna <i>AC</i> dzieli kąt <i>A</i> na połowy. Ile stopni ma kąt <i>β</i>?`,124,[56,152,112],2,'Naprzemianległe: <i>α</i> = 28°, kąt <i>A</i> = 56°, <i>β</i> = 180° − 56° = <b>124°</b>.'),
 pick('kz8-11c',`${trapBis(37)}W trapezie <i>ABCD</i> (<i>AB</i> ∥ <i>CD</i>) przekątna <i>AC</i> dzieli kąt <i>A</i> na połowy. Ile stopni ma kąt <i>β</i>?`,106,[74,143,116],3,'<i>α</i> = 37°, kąt <i>A</i> = 74°, <i>β</i> = 180° − 74° = <b>106°</b>.'),
 pick('kz8-11d',`${trapBis(41)}W trapezie <i>ABCD</i> (<i>AB</i> ∥ <i>CD</i>) przekątna <i>AC</i> dzieli kąt <i>A</i> na połowy. Ile stopni ma kąt <i>β</i>?`,98,[82,139,108],0,'<i>α</i> = 41°, kąt <i>A</i> = 82°, <i>β</i> = 180° − 82° = <b>98°</b>.'),
 // Kąt ostry i rozwarty trapezu
 pick('kz8-12a','Kąt ostry trapezu równoramiennego ma <b>30°</b>. O ile stopni więcej ma jego kąt rozwarty?',120,[60,90,150],0,'Kąt rozwarty: 180° − 30° = 150°. Różnica: 150° − 30° = <b>120°</b>. 150° to sam kąt rozwarty, a nie różnica.'),
 pick('kz8-12b','Kąt ostry trapezu równoramiennego ma <b>70°</b>. O ile stopni więcej ma jego kąt rozwarty?',40,[110,20,70],3,'Kąt rozwarty: 180° − 70° = 110°. Różnica: 110° − 70° = <b>40°</b>.'),
 pick('kz8-12c','Kąt ostry trapezu równoramiennego ma <b>52°</b>. O ile stopni więcej ma jego kąt rozwarty?',76,[128,38,104],1,'Kąt rozwarty: 128°. Różnica: 128° − 52° = <b>76°</b>. Ogólnie: 180° − 2<i>α</i>.'),
 pick('kz8-12d','Kąt ostry trapezu równoramiennego ma <b>64°</b>. O ile stopni więcej ma jego kąt rozwarty?',52,[116,26,64],2,'180° − 2 · 64° = <b>52°</b>.'),
 // Trójkąt równoboczny i punkt na boku
 pick('kz8-13a',`${equiD(97)}Trójkąt <i>ABC</i> jest równoboczny, a punkt <i>D</i> leży na boku <i>AB</i>. Ile stopni ma kąt <i>x</i>?`,37,[23,83,53],2,'Kąt <i>CDB</i> = 97° jest kątem zewnętrznym trójkąta <i>ADC</i>, więc jest równy sumie kątów <i>A</i> i <i>x</i>: <i>x</i> = 97° − 60° = <b>37°</b>.'),
 pick('kz8-13b',`${equiD(104)}Trójkąt <i>ABC</i> jest równoboczny, a punkt <i>D</i> leży na boku <i>AB</i>. Ile stopni ma kąt <i>x</i>?`,44,[16,76,30],1,'Kąt zewnętrzny trójkąta <i>ADC</i>: 104° = 60° + <i>x</i>, więc <i>x</i> = <b>44°</b>.'),
 pick('kz8-13c',`${equiD(75)}Trójkąt <i>ABC</i> jest równoboczny, a punkt <i>D</i> leży na boku <i>AB</i>. Ile stopni ma kąt <i>x</i>?`,15,[45,105,30],3,'75° = 60° + <i>x</i>, więc <i>x</i> = <b>15°</b>.'),
 pick('kz8-13d',`${equiD(86)}Trójkąt <i>ABC</i> jest równoboczny, a punkt <i>D</i> leży na boku <i>AB</i>. Ile stopni ma kąt <i>x</i>?`,26,[34,94,56],0,'86° = 60° + <i>x</i>, więc <i>x</i> = <b>26°</b>.'),
];

// ——— Nierówność trójkąta ———
const CAN = 'Z których odcinków <b>można</b> zbudować trójkąt?';
const CANT = 'Z których odcinków <b>nie można</b> zbudować trójkąta?';
const third = (a, b) => `Dwa boki trójkąta mają <b>${num(a)} cm</b> i <b>${num(b)} cm</b>. Jaką długość może mieć trzeci bok?`;
const range = (lo, hi, u = 'cm') => `większą niż ${num(lo)} ${u} i mniejszą niż ${num(hi)} ${u}`;
const which = (a, b) => `Dwa boki trójkąta mają <b>${num(a)} cm</b> i <b>${num(b)} cm</b>. Która z podanych liczb może być długością trzeciego boku?`;
const isoTwo = (a, b) => `O trójkącie równoramiennym wiadomo, że dwa jego boki mają <b>${a} cm</b> i <b>${b} cm</b>. Ile wynosi jego obwód?`;
const isoP = (p, s) => `Obwód trójkąta równoramiennego jest równy <b>${p} cm</b>, a jeden z jego boków ma <b>${s} cm</b>. Jakie długości mogą mieć podstawa i ramiona?`;
const pr = (b, r) => `podstawa ${num(b)} cm, ramiona ${num(r)} cm`;
const line3 = (ab, bc) => `Punkty <i>A</i>, <i>B</i>, <i>C</i> leżą na jednej prostej, <i>AB</i> = <b>${ab} cm</b>, <i>BC</i> = <b>${bc} cm</b>. Jaką długość może mieć odcinek <i>AC</i>?`;
const four = (s) => `Z trzech spośród czterech odcinków o długościach <b>${s.join(' cm, ')} cm</b> budujemy trójkąt. Na ile sposobów można wybrać te trzy odcinki?`;
const INEQ = 'Trójkąt istnieje, gdy najdłuższy bok jest krótszy od sumy dwóch pozostałych.';
const s = (v) => v;

export const triangleInequalityQuestions8 = [
 // Można zbudować trójkąt
 q('nt8-1a',CAN,['2 cm, 3 cm, 6 cm','4 cm, 5 cm, 7 cm','1 cm, 4 cm, 5 cm','3 cm, 3 cm, 7 cm'],1,`4 + 5 = 9 &gt; 7 — <b>4 cm, 5 cm, 7 cm</b>. Pozostałe: 2 + 3 &lt; 6, 1 + 4 = 5 (równość też wyklucza trójkąt), 3 + 3 &lt; 7. ${INEQ}`),
 q('nt8-1b',CAN,['5 cm, 6 cm, 12 cm','2 cm, 2 cm, 4 cm','6 cm, 7 cm, 9 cm','3 cm, 8 cm, 4 cm'],2,'6 + 7 = 13 &gt; 9 — <b>6 cm, 7 cm, 9 cm</b>. 5 + 6 &lt; 12, 2 + 2 = 4, 3 + 4 &lt; 8.'),
 q('nt8-1c',CAN,['1,5 cm, 2,5 cm, 3 cm','1 cm, 2 cm, 3,5 cm','2,5 cm, 1,2 cm, 1,3 cm','4 cm, 1 cm, 2,5 cm'],0,'1,5 + 2,5 = 4 &gt; 3 — <b>1,5 cm, 2,5 cm, 3 cm</b>. 1 + 2 &lt; 3,5, 1,2 + 1,3 = 2,5, 1 + 2,5 &lt; 4.'),
 q('nt8-1d',CAN,['10 cm, 4 cm, 5 cm','7 cm, 7 cm, 15 cm','8 cm, 3 cm, 5 cm','9 cm, 6 cm, 4 cm'],3,'6 + 4 = 10 &gt; 9 — <b>9 cm, 6 cm, 4 cm</b>. 4 + 5 &lt; 10, 7 + 7 &lt; 15, 3 + 5 = 8.'),
 // Nie można zbudować trójkąta
 q('nt8-2a',CANT,['3 cm, 4 cm, 5 cm','2 cm, 5 cm, 6 cm','4 cm, 4 cm, 7 cm','2 cm, 3 cm, 5 cm'],3,'2 + 3 = 5 — suma dwóch krótszych boków jest równa trzeciemu, więc odcinki ułożą się w jedną linię. <b>2 cm, 3 cm, 5 cm</b> nie tworzą trójkąta.'),
 q('nt8-2b',CANT,['6 cm, 10 cm, 3 cm','5 cm, 5 cm, 9 cm','7 cm, 8 cm, 2 cm','4 cm, 6 cm, 9 cm'],0,'Najdłuższy jest 10 cm, a 6 + 3 = 9 &lt; 10 — <b>6 cm, 10 cm, 3 cm</b>. Pozostałe: 5 + 5 &gt; 9, 7 + 2 &gt; 8, 4 + 6 &gt; 9.'),
 q('nt8-2c',CANT,['1 m, 1 m, 1 m','1 km, 1 m, 1 m','2 m, 3 m, 4 m','1 m, 1 km, 1 km'],1,'1 m + 1 m = 2 m, a to dużo mniej niż 1 km — <b>1 km, 1 m, 1 m</b>. Trójkąt o bokach 1 m, 1 km, 1 km istnieje: 1 km + 1 m &gt; 1 km.'),
 q('nt8-2d',CANT,['8 dm, 15 dm, 17 dm','9 dm, 9 dm, 1 dm','12 dm, 5 dm, 6 dm','7 dm, 10 dm, 4 dm'],2,'5 + 6 = 11 &lt; 12 — <b>12 dm, 5 dm, 6 dm</b>. Pozostałe: 8 + 15 &gt; 17, 9 + 1 &gt; 9, 7 + 4 &gt; 10.'),
 // Przedział dla trzeciego boku
 pick('nt8-3a',third(7,11),range(4,18),[range(7,11),range(4,11),range(0,18)],2,'Trzeci bok musi być krótszy od sumy: 7 + 11 = 18 cm i dłuższy od różnicy: 11 − 7 = 4 cm. Odpowiedź: <b>większą niż 4 cm i mniejszą niż 18 cm</b>.',s),
 pick('nt8-3b',third(25,47),range(22,72),[range(25,47),range(22,47),range(23,71)],1,'47 − 25 = 22 cm i 47 + 25 = 72 cm. Trzeci bok jest <b>większy niż 22 cm i mniejszy niż 72 cm</b>. Krańce nie należą: przy 22 cm lub 72 cm odcinki leżą na jednej prostej.',s),
 pick('nt8-3c',third(34,19),range(15,53),[range(19,34),range(15,34),range(0,53)],0,'34 − 19 = 15 cm i 34 + 19 = 53 cm, więc trzeci bok jest <b>większy niż 15 cm i mniejszy niż 53 cm</b>.',s),
 pick('nt8-3d',third(9,9),range(0,18),[range(9,18),range(0,9),range(1,17)],3,'9 − 9 = 0 i 9 + 9 = 18, więc trzeci bok może mieć dowolną długość <b>większą niż 0 cm i mniejszą niż 18 cm</b>.',s),
 // Która liczba może być długością trzeciego boku?
 q('nt8-4a',which(5,12),['6 cm','12 cm','7 cm','17 cm'],1,'Trzeci bok musi być między 12 − 5 = 7 cm a 12 + 5 = 17 cm (bez krańców). Pasuje tylko <b>12 cm</b>.'),
 q('nt8-4b',which(8,3),['5 cm','11 cm','10 cm','4 cm'],2,'Między 8 − 3 = 5 cm a 8 + 3 = 11 cm. Pasuje tylko <b>10 cm</b>.'),
 q('nt8-4c',which(2.5,6),['3,5 cm','8,5 cm','9 cm','4 cm'],3,'Między 6 − 2,5 = 3,5 cm a 6 + 2,5 = 8,5 cm. Pasuje tylko <b>4 cm</b>.'),
 q('nt8-4d',which(15,15),['29 cm','30 cm','31 cm','45 cm'],0,'Między 0 a 15 + 15 = 30 cm (bez krańców). Pasuje tylko <b>29 cm</b>.'),
 // Trójkąt równoramienny — który bok jest podstawą?
 q('nt8-5a',isoTwo(48,22),['92 cm','118 cm','70 cm','144 cm'],1,'Gdyby ramiona miały 22 cm, to 22 + 22 = 44 &lt; 48 — taki trójkąt nie istnieje. Ramiona mają więc 48 cm, podstawa 22 cm: 48 + 48 + 22 = <b>118 cm</b>.'),
 q('nt8-5b',isoTwo(30,13),['56 cm','43 cm','73 cm','86 cm'],2,'Ramiona 13 cm odpadają: 13 + 13 = 26 &lt; 30. Ramiona 30 cm, podstawa 13 cm: 30 + 30 + 13 = <b>73 cm</b>.'),
 q('nt8-5c',isoTwo(9,25),['43 cm','34 cm','75 cm','59 cm'],3,'Ramiona 9 cm odpadają: 9 + 9 = 18 &lt; 25. Ramiona 25 cm, podstawa 9 cm: 25 + 25 + 9 = <b>59 cm</b>.'),
 q('nt8-5d',isoTwo(40,18),['98 cm','76 cm','58 cm','120 cm'],0,'Ramiona 18 cm odpadają: 18 + 18 = 36 &lt; 40. Ramiona 40 cm, podstawa 18 cm: 40 + 40 + 18 = <b>98 cm</b>.'),
 // Obwód i jeden bok trójkąta równoramiennego
 q('nt8-6a',isoP(25,5),[pr(15,5),pr(5,10),pr(5,20),pr(10,7.5)],1,'Jeśli ramiona mają 5 cm, to podstawa 25 − 10 = 15 cm, ale 5 + 5 &lt; 15 — nie ma takiego trójkąta. Zatem podstawa ma 5 cm, a ramiona (25 − 5) : 2 = 10 cm: <b>podstawa 5 cm, ramiona 10 cm</b>.'),
 q('nt8-6b',isoP(34,6),[pr(22,6),pr(14,10),pr(6,14),pr(6,28)],2,'Ramiona 6 cm dają podstawę 22 cm, a 6 + 6 &lt; 22 — odpada. Podstawa 6 cm, ramiona (34 − 6) : 2 = 14 cm: <b>podstawa 6 cm, ramiona 14 cm</b>.'),
 q('nt8-6c',isoP(40,18),[pr(18,11),pr(4,18),'taki trójkąt nie istnieje',`${pr(4,18)} albo ${pr(18,11)}`],3,'Ramiona 18 cm: podstawa 40 − 36 = 4 cm, a 18 + 4 &gt; 18 — istnieje. Podstawa 18 cm: ramiona 11 cm, a 11 + 11 = 22 &gt; 18 — też istnieje. Są <b>dwie możliwości</b>.'),
 q('nt8-6d',isoP(26,4),[pr(4,11),pr(18,4),pr(11,7.5),pr(4,22)],0,'Ramiona 4 cm dają podstawę 18 cm, ale 4 + 4 &lt; 18 — odpada. Podstawa 4 cm, ramiona (26 − 4) : 2 = 11 cm: <b>podstawa 4 cm, ramiona 11 cm</b>.'),
 // Ramię dane — jaka podstawa?
 q('nt8-7a','W trójkącie równoramiennym ramię ma <b>17 cm</b>. Jaką długość może mieć podstawa?',['dowolną mniejszą niż 34 cm','dowolną większą niż 17 cm','dowolną mniejszą niż 17 cm','dowolną większą niż 8,5 cm'],0,'Podstawa musi być krótsza od sumy ramion: 17 + 17 = 34 cm. Może więc mieć <b>dowolną długość mniejszą niż 34 cm</b> — także większą niż ramię.'),
 q('nt8-7b','W trójkącie równoramiennym ramię ma <b>9,5 cm</b>. Jaką długość może mieć podstawa?',['dowolną większą niż 9,5 cm','dowolną mniejszą niż 9,5 cm','dowolną większą niż 4,75 cm','dowolną mniejszą niż 19 cm'],3,'9,5 + 9,5 = 19 cm, więc podstawa może mieć <b>dowolną długość mniejszą niż 19 cm</b>.'),
 q('nt8-7c','W trójkącie równoramiennym ramię ma <b>26 cm</b>. Jaką długość może mieć podstawa?',['dowolną większą niż 26 cm','dowolną mniejszą niż 52 cm','dowolną mniejszą niż 26 cm','dowolną większą niż 13 cm'],1,'26 + 26 = 52 cm, więc podstawa: <b>dowolna długość mniejsza niż 52 cm</b>.'),
 q('nt8-7d','W trójkącie równoramiennym ramię ma <b>13 cm</b>. Jaką długość może mieć podstawa?',['dowolną mniejszą niż 13 cm','dowolną większą niż 6,5 cm','dowolną mniejszą niż 26 cm','dowolną większą niż 13 cm'],2,'13 + 13 = 26 cm, więc podstawa: <b>dowolna długość mniejsza niż 26 cm</b>.'),
 // Podstawa dana — jakie ramię?
 q('nt8-8a','W trójkącie równoramiennym podstawa ma <b>23 cm</b>. Jaką długość może mieć ramię?',['dowolną mniejszą niż 23 cm','dowolną większą niż 23 cm','dowolną większą niż 11,5 cm','dowolną mniejszą niż 46 cm'],2,'Dwa ramiona razem muszą być dłuższe od podstawy: 2<i>r</i> &gt; 23 cm, więc ramię jest <b>dłuższe niż 11,5 cm</b>. Górnego ograniczenia nie ma.'),
 q('nt8-8b','W trójkącie równoramiennym podstawa ma <b>30 cm</b>. Jaką długość może mieć ramię?',['dowolną większą niż 15 cm','dowolną mniejszą niż 30 cm','dowolną większą niż 30 cm','dowolną mniejszą niż 60 cm'],0,'2<i>r</i> &gt; 30 cm, więc ramię: <b>dowolna długość większa niż 15 cm</b>.'),
 q('nt8-8c','W trójkącie równoramiennym podstawa ma <b>17 cm</b>. Jaką długość może mieć ramię?',['dowolną mniejszą niż 34 cm','dowolną większą niż 17 cm','dowolną mniejszą niż 17 cm','dowolną większą niż 8,5 cm'],3,'2<i>r</i> &gt; 17 cm, więc ramię: <b>dowolna długość większa niż 8,5 cm</b>.'),
 q('nt8-8d','W trójkącie równoramiennym podstawa ma <b>42 cm</b>. Jaką długość może mieć ramię?',['dowolną mniejszą niż 42 cm','dowolną większą niż 21 cm','dowolną większą niż 42 cm','dowolną mniejszą niż 84 cm'],1,'2<i>r</i> &gt; 42 cm, więc ramię: <b>dowolna długość większa niż 21 cm</b>.'),
 // Trzy punkty na prostej
 q('nt8-9a',line3(18,5),['tylko 13 cm','tylko 23 cm','13 cm lub 23 cm','dowolną od 13 cm do 23 cm'],2,'Punkt <i>C</i> leży po tej samej stronie <i>B</i> co <i>A</i> (<i>AC</i> = 18 − 5 = 13 cm) albo po przeciwnej (<i>AC</i> = 18 + 5 = 23 cm). Odpowiedź: <b>13 cm lub 23 cm</b>.'),
 q('nt8-9b',line3(12,20),['8 cm lub 32 cm','tylko 32 cm','tylko 8 cm','dowolną od 8 cm do 32 cm'],0,'20 − 12 = 8 cm albo 20 + 12 = 32 cm: <b>8 cm lub 32 cm</b>. Punkty leżą na prostej, więc nie ma wartości pośrednich.'),
 q('nt8-9c',line3(15,4),['tylko 11 cm','dowolną od 11 cm do 19 cm','tylko 19 cm','11 cm lub 19 cm'],3,'15 − 4 = 11 cm albo 15 + 4 = 19 cm: <b>11 cm lub 19 cm</b>.'),
 q('nt8-9d',line3(7,16),['tylko 9 cm','9 cm lub 23 cm','tylko 23 cm','dowolną od 9 cm do 23 cm'],1,'16 − 7 = 9 cm albo 16 + 7 = 23 cm: <b>9 cm lub 23 cm</b>.'),
 // Odcinki skracane i wydłużane
 truth('nt8-10a','Dane są odcinki o długościach 5 cm, 8 cm i 12 cm. ','Z tych odcinków można zbudować trójkąt.','Gdy każdy odcinek skrócimy o 2 cm, też można zbudować z nich trójkąt.','PF','I: 5 + 8 = 13 &gt; 12 — <b>prawda</b>. II: 3 + 6 = 9 &lt; 10 — <b>fałsz</b>.'),
 truth('nt8-10b','Dane są odcinki o długościach 7 cm, 9 cm i 15 cm. ','Gdy każdy odcinek skrócimy o 2 cm, można zbudować z nich trójkąt.','Gdy każdy odcinek wydłużymy o 2 cm, można zbudować z nich trójkąt.','FP','I: 5, 7, 13 — 5 + 7 = 12 &lt; 13 — <b>fałsz</b>. II: 9, 11, 17 — 9 + 11 = 20 &gt; 17 — <b>prawda</b>.'),
 truth('nt8-10c','Dane są odcinki o długościach 4 cm, 7 cm i 10 cm. ','Z tych odcinków można zbudować trójkąt.','Gdy każdy odcinek wydłużymy o 3 cm, też można zbudować z nich trójkąt.','PP','I: 4 + 7 = 11 &gt; 10 — <b>prawda</b>. II: 7, 10, 13 — 7 + 10 = 17 &gt; 13 — <b>prawda</b>.'),
 truth('nt8-10d','Dane są odcinki o długościach 3 cm, 6 cm i 10 cm. ','Z tych odcinków można zbudować trójkąt.','Gdy każdy odcinek skrócimy o 1 cm, można zbudować z nich trójkąt.','FF','I: 3 + 6 = 9 &lt; 10 — <b>fałsz</b>. II: 2, 5, 9 — 2 + 5 = 7 &lt; 9 — <b>fałsz</b>.'),
 // Trzy odcinki z czterech
 q('nt8-11a',four([9,6,4,3]),['0','1','2','3'],2,'Trójki: 9, 6, 4 (10 &gt; 9 — tak), 9, 6, 3 (9 = 9 — nie), 9, 4, 3 (nie), 6, 4, 3 (7 &gt; 6 — tak). Razem <b>2</b> sposoby.'),
 q('nt8-11b',four([10,7,4,2]),['0','1','2','3'],1,'10, 7, 4 (11 &gt; 10 — tak), 10, 7, 2 (nie), 10, 4, 2 (nie), 7, 4, 2 (6 &lt; 7 — nie). Tylko <b>1</b> sposób.'),
 q('nt8-11c',four([6,5,4,3]),['1','2','3','4'],3,'6, 5, 4 — tak; 6, 5, 3 — tak (8 &gt; 6); 6, 4, 3 — tak (7 &gt; 6); 5, 4, 3 — tak. Wszystkie <b>4</b> wybory są dobre.'),
 q('nt8-11d',four([11,3,2,1]),['0','1','2','3'],0,'Z odcinkiem 11 cm nic nie wyjdzie: 3 + 2 &lt; 11. Zostaje 3, 2, 1, ale 2 + 1 = 3 — też nie. <b>0</b> sposobów.'),
 // Prawda czy fałsz — trójkąty równoramienne
 truth('nt8-12a','','Istnieje trójkąt równoramienny, którego dwa boki mają 15 cm i 15 cm.','Istnieje trójkąt równoramienny o ramieniu 15 cm i podstawie 31 cm.','PF','I: np. trójkąt 15 cm, 15 cm, 10 cm — <b>prawda</b>. II: 15 + 15 = 30 &lt; 31 — <b>fałsz</b>.'),
 truth('nt8-12b','','Istnieje trójkąt równoramienny o ramieniu 6 cm i podstawie 12 cm.','Istnieje trójkąt równoramienny o ramieniu 12 cm i podstawie 6 cm.','FP','I: 6 + 6 = 12 — nie większe od podstawy — <b>fałsz</b>. II: 12 + 12 &gt; 6 — <b>prawda</b>.'),
 truth('nt8-12c','','Istnieje trójkąt równoramienny o ramieniu 20 cm i podstawie 39 cm.','Istnieje trójkąt o bokach 7 cm, 8 cm i 14 cm.','PP','I: 20 + 20 = 40 &gt; 39 — <b>prawda</b>. II: 7 + 8 = 15 &gt; 14 — <b>prawda</b>.'),
 truth('nt8-12d','','Istnieje trójkąt równoramienny o ramieniu 4,5 cm i podstawie 9 cm.','Istnieje trójkąt o bokach 1 cm, 2 cm i 3 cm.','FF','I: 4,5 + 4,5 = 9 — <b>fałsz</b>. II: 1 + 2 = 3 — <b>fałsz</b>.'),
 // Obwód trójkąta równoramiennego
 q('nt8-13a','Obwód trójkąta równoramiennego jest równy <b>24 cm</b>. Jaką długość może mieć <b>ramię</b>?',[range(6,12),'mniejszą niż 12 cm',range(8,12),range(6,24)],0,'Ramię <i>r</i>, podstawa 24 − 2<i>r</i> &gt; 0, więc <i>r</i> &lt; 12. Nierówność trójkąta: 2<i>r</i> &gt; 24 − 2<i>r</i>, więc <i>r</i> &gt; 6. Ramię: <b>większe niż 6 cm i mniejsze niż 12 cm</b>.'),
 q('nt8-13b','Obwód trójkąta równoramiennego jest równy <b>24 cm</b>. Jaką długość może mieć <b>podstawa</b>?',[range(6,12),'mniejszą niż 8 cm','mniejszą niż 12 cm','większą niż 12 cm'],2,'Ramiona razem to 24 − <i>p</i> i muszą być dłuższe od podstawy: 24 − <i>p</i> &gt; <i>p</i>, więc <i>p</i> &lt; 12. Podstawa: <b>mniejsza niż 12 cm</b>.'),
 q('nt8-13c','Obwód trójkąta równoramiennego jest równy <b>30 cm</b>. Jaką długość może mieć <b>ramię</b>?',['mniejszą niż 15 cm',range(10,15),range(5,15),range(7.5,15)],3,'Podstawa 30 − 2<i>r</i> &gt; 0, więc <i>r</i> &lt; 15, oraz 2<i>r</i> &gt; 30 − 2<i>r</i>, więc <i>r</i> &gt; 7,5. Ramię: <b>większe niż 7,5 cm i mniejsze niż 15 cm</b>.'),
 q('nt8-13d','Obwód trójkąta równoramiennego jest równy <b>18 cm</b>. Jaką długość może mieć <b>podstawa</b>?',['mniejszą niż 6 cm','mniejszą niż 9 cm',range(4.5,9),'mniejszą niż 18 cm'],1,'18 − <i>p</i> &gt; <i>p</i>, więc <i>p</i> &lt; 9. Podstawa: <b>mniejsza niż 9 cm</b>.'),
 // Różne jednostki
 pick('nt8-14a','Dwa boki trójkąta mają <b>2 km</b> i <b>3 m</b>. Jaką długość może mieć trzeci bok?',range(1997,2003,'m'),[range(3,2000,'m'),'dokładnie 2 km',range(1,5,'km')],1,'2 km = 2000 m. Trzeci bok jest między 2000 − 3 = 1997 m a 2000 + 3 = 2003 m: <b>większy niż 1997 m i mniejszy niż 2003 m</b>.',s),
 pick('nt8-14b','Dwa boki trójkąta mają <b>1 km</b> i <b>40 m</b>. Jaką długość może mieć trzeci bok?',range(960,1040,'m'),[range(40,1000,'m'),range(1,41,'m'),'dokładnie 1 km'],3,'1 km = 1000 m: 1000 − 40 = 960 m i 1000 + 40 = 1040 m. Trzeci bok jest <b>większy niż 960 m i mniejszy niż 1040 m</b>.',s),
 pick('nt8-14c','Dwa boki trójkąta mają <b>5 m</b> i <b>20 cm</b>. Jaką długość może mieć trzeci bok?',range(4.8,5.2,'m'),[range(0.2,5,'m'),range(4.98,5.02,'m'),range(15,25,'cm')],2,'20 cm = 0,2 m: 5 − 0,2 = 4,8 m i 5 + 0,2 = 5,2 m. Trzeci bok jest <b>większy niż 4,8 m i mniejszy niż 5,2 m</b>. 15–25 cm to błąd: 5 m to nie 5 cm.',s),
 pick('nt8-14d','Dwa boki trójkąta mają <b>1 m</b> i <b>1 cm</b>. Jaką długość może mieć trzeci bok?',range(99,101,'cm'),[range(0,2,'cm'),range(1,100,'cm'),'dokładnie 1 m'],0,'1 m = 100 cm: 100 − 1 = 99 cm i 100 + 1 = 101 cm. Trzeci bok jest <b>większy niż 99 cm i mniejszy niż 101 cm</b> — a jeśli ma całkowitą liczbę centymetrów, to dokładnie 100 cm.',s),
 // Ile całkowitych długości?
 q('nt8-15a','Dwa boki trójkąta mają <b>4 cm</b> i <b>9 cm</b>, a trzeci bok ma długość wyrażoną całkowitą liczbą centymetrów. Ile jest możliwości?',['5','7','9','11'],1,'Trzeci bok jest większy niż 5 cm i mniejszy niż 13 cm: 6, 7, 8, 9, 10, 11, 12 — to <b>7</b> możliwości.'),
 q('nt8-15b','Dwa boki trójkąta mają <b>5 cm</b> i <b>8 cm</b>, a trzeci bok ma długość wyrażoną całkowitą liczbą centymetrów. Ile jest możliwości?',['5','7','9','11'],2,'Większy niż 3 cm i mniejszy niż 13 cm: od 4 do 12 — to <b>9</b> możliwości.'),
 q('nt8-15c','Dwa boki trójkąta mają <b>6 cm</b> i <b>6 cm</b>, a trzeci bok ma długość wyrażoną całkowitą liczbą centymetrów. Ile jest możliwości?',['5','7','9','11'],3,'Większy niż 0 cm i mniejszy niż 12 cm: od 1 do 11 — to <b>11</b> możliwości.'),
 q('nt8-15d','Dwa boki trójkąta mają <b>10 cm</b> i <b>3 cm</b>, a trzeci bok ma długość wyrażoną całkowitą liczbą centymetrów. Ile jest możliwości?',['5','7','9','11'],0,'Większy niż 7 cm i mniejszy niż 13 cm: 8, 9, 10, 11, 12 — to <b>5</b> możliwości.'),
 // Największy i najmniejszy obwód
 q('nt8-16a','Dwa boki trójkąta mają <b>7 cm</b> i <b>11 cm</b>, a trzeci bok ma całkowitą liczbę centymetrów. Jaki <b>największy</b> obwód może mieć ten trójkąt?',['36 cm','35 cm','29 cm','22 cm'],1,'Trzeci bok jest mniejszy niż 18 cm, więc najwyżej 17 cm. Obwód: 7 + 11 + 17 = <b>35 cm</b>. 36 cm wymagałoby boku 18 cm, a wtedy trójkąta nie ma.'),
 q('nt8-16b','Dwa boki trójkąta mają <b>5 cm</b> i <b>9 cm</b>, a trzeci bok ma całkowitą liczbę centymetrów. Jaki <b>największy</b> obwód może mieć ten trójkąt?',['28 cm','18 cm','27 cm','23 cm'],2,'Trzeci bok jest mniejszy niż 14 cm, więc najwyżej 13 cm. Obwód: 5 + 9 + 13 = <b>27 cm</b>.'),
 q('nt8-16c','Dwa boki trójkąta mają <b>8 cm</b> i <b>8 cm</b>, a trzeci bok ma całkowitą liczbę centymetrów. Jaki <b>największy</b> obwód może mieć ten trójkąt?',['32 cm','16 cm','24 cm','31 cm'],3,'Trzeci bok jest mniejszy niż 16 cm, więc najwyżej 15 cm. Obwód: 8 + 8 + 15 = <b>31 cm</b>.'),
 q('nt8-16d','Dwa boki trójkąta mają <b>12 cm</b> i <b>4 cm</b>, a trzeci bok ma całkowitą liczbę centymetrów. Jaki <b>najmniejszy</b> obwód może mieć ten trójkąt?',['25 cm','24 cm','17 cm','32 cm'],0,'Trzeci bok jest większy niż 12 − 4 = 8 cm, więc co najmniej 9 cm. Obwód: 12 + 4 + 9 = <b>25 cm</b>. 24 cm wymagałoby boku 8 cm, a wtedy 4 + 8 = 12.'),
];
