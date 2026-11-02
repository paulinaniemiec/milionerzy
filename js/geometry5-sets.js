// Klasa 5, dział „Figury geometryczne”: płaszczyzna, proste, półproste, odcinki — pojęcia, zapis ⊥ i ∥, punkty na prostej,
// proste równoległe i prostopadłe (także w kratce), liczenie odcinków, półprostych i prostych. Od łatwych do trudnych (`ordered`).
// Rysunki mają współrzędne w atrybutach data-*, dzięki czemu test sprawdza równoległość i prostopadłość na samym rysunku.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
const I = (s) => s.replace(/\b([A-Z]{1,2}|[a-z])\b/g, '<i>$1</i>');
const truth = (id, a, b, t, explain) => q(id, `Oceń prawdziwość zdań.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP', 'PF', 'FP', 'FF'].indexOf(t), explain);

const W = 400, H = 235, r1 = (v) => Math.round(v * 10) / 10;
const fig = (body, desc) => `<figure class="exam-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${desc}">${body}</svg></figure>`;
const txt = (x, y, s, color = '#f6c85c') => `<text x="${r1(x)}" y="${r1(y)}" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="17" font-style="italic">${s}</text>`;
const pt = (name, x, y, dx = 0, dy = -12) => `<circle data-pt="${name}" cx="${x}" cy="${y}" r="4.5" fill="#f6c85c"/>` + txt(x + dx, y + dy, name);
// Zakres parametru t, dla którego punkt (x + t·dx, y + t·dy) mieści się w rysunku.
function span(x, y, dx, dy) {
 let lo = -1e9, hi = 1e9;
 for (const [p, d, max] of [[x, dx, W], [y, dy, H]]) if (d) { const a = (8 - p) / d, b = (max - 8 - p) / d; lo = Math.max(lo, Math.min(a, b)); hi = Math.min(hi, Math.max(a, b)); }
 return [lo, hi];
}
const path = (kind, name, x1, y1, x2, y2) => `<line data-kind="${kind}" data-name="${name}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="#f3f5ff" stroke-width="2.5"/>`;
// Prosta przez (x, y) w kierunku (dx, dy), z podpisem przy końcu; półprosta od (x, y) w kierunku (dx, dy).
function line(name, x, y, dx, dy, label = name, at = 0.92) {
 const [lo, hi] = span(x, y, dx, dy), t = lo + (hi - lo) * at;
 return path('line', name, x + lo * dx, y + lo * dy, x + hi * dx, y + hi * dy) + (label ? txt(x + t * dx + 12, y + t * dy - 8, label) : '');
}
const ray = (name, x, y, dx, dy) => { const [, hi] = span(x, y, dx, dy); return path('ray', name, x, y, x + hi * dx, y + hi * dy); };
const seg = (name, x1, y1, x2, y2) => path('seg', name, x1, y1, x2, y2);

// Rysunek 1: prosta KM, półprosta LN, odcinek MP.
const d1 = fig(line('KM', 60, 150, 1, 0, '') + ray('LN', 170, 150, 60, -90) + seg('MP', 290, 150, 345, 210) + pt('K', 60, 150, 0, 24) + pt('L', 170, 150, -4, 24) + pt('M', 290, 150, -8, 24) + pt('N', 230, 60, 14, 0) + pt('P', 345, 210, 14, 0),
 'Prosta przechodząca przez punkty K, L i M; półprosta o początku L przechodząca przez N; odcinek MP');
// Rysunek 2: prosta p z punktami R, S, T, U, W w tej kolejności; X i Y poza prostą.
const P2 = {R: [50, 190], S: [130, 158], T: [190, 134], U: [250, 110], W: [330, 78]};
const d2 = fig(line('p', 50, 190, 5, -2, 'p', 0.96) + Object.entries(P2).map(([n, [x, y]]) => pt(n, x, y, -4, 24)).join('') + pt('X', 120, 100) + pt('Y', 300, 175, 0, 24),
 'Prosta p, na niej kolejno punkty R, S, T, U, W; punkty X i Y nie leżą na prostej');
// Rysunek 3: prosta przez A, B, C i półprosta o początku B przez D.
const d3 = fig(line('AC', 60, 170, 1, 0, '') + ray('BD', 190, 170, 60, -110) + pt('A', 60, 170, 0, 26) + pt('B', 190, 170, 0, 26) + pt('C', 320, 170, 0, 26) + pt('D', 250, 60, 16, 0),
 'Prosta przechodząca przez punkty A, B i C oraz półprosta o początku B przechodząca przez punkt D');
// Rysunek 4: k ∥ l, n ⊥ k i l, m i o nie są ani równoległe, ani prostopadłe do k.
const d4 = fig(line('k', 20, 100, 5, -1) + line('l', 20, 150, 5, -1) + line('m', 20, 210, 1, 0, 'm', 0.95) + line('n', 260, 15, 1, 5, 'n', 0.05) + line('o', 40, 10, 1, 1, 'o', 0.06),
 'Pięć prostych: k, l, m, n, o');
// Rysunek 5: b ∥ d, a ⊥ c.
const d5 = fig(line('a', 60, 20, 1, 1, 'a', 0.05) + line('b', 20, 60, 3, 1, 'b', 0.95) + line('c', 330, 20, -1, 1, 'c', 0.05) + line('d', 20, 140, 3, 1, 'd', 0.1) + line('e', 20, 205, 1, 0, 'e', 0.97),
 'Pięć prostych: a, b, c, d, e');
// Rysunek 6: wielokąt ABCDEFGH — boki poziome i pionowe, jeden ukośny (GH).
const POLY = {A: [40, 200], B: [320, 200], C: [320, 130], D: [250, 130], E: [250, 40], F: [130, 40], G: [130, 110], H: [40, 150]};
const POLY_LABEL = {A: [-12, 14], B: [12, 14], C: [14, 0], D: [-14, 14], E: [12, -4], F: [-12, -4], G: [14, 16], H: [-14, -4]};
const d6 = fig(`<polygon data-poly="ABCDEFGH" points="${Object.values(POLY).map((p) => p.join(',')).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>` + Object.entries(POLY).map(([n, [x, y]]) => txt(x + POLY_LABEL[n][0], y + POLY_LABEL[n][1] + 5, n)).join(''),
 'Wielokąt ABCDEFGH: boki AB, CD i EF są poziome, BC, DE, FG i HA pionowe, a GH ukośny');
// Rysunek 7: czworokąt KLMN z przekątnymi KM i LN przecinającymi się w punkcie S.
const Q4 = {K: [70, 190], L: [330, 200], M: [300, 40], N: [100, 50]};
const cross = ([ax, ay], [bx, by], [cx, cy], [dx, dy]) => { const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / ((bx - ax) * (dy - cy) - (by - ay) * (dx - cx)); return [r1(ax + t * (bx - ax)), r1(ay + t * (by - ay))]; };
const S7 = cross(Q4.K, Q4.M, Q4.L, Q4.N);
const d7 = fig(['KL', 'LM', 'MN', 'NK', 'KM', 'LN'].map((s) => seg(s, ...Q4[s[0]], ...Q4[s[1]])).join('') + pt('K', ...Q4.K, -12, 20) + pt('L', ...Q4.L, 12, 20) + pt('M', ...Q4.M, 12, -8) + pt('N', ...Q4.N, -12, -8) + pt('S', ...S7, 0, 26),
 'Czworokąt KLMN z przekątnymi KM i LN, które przecinają się w punkcie S');
// Rysunek 8: odcinki w kratce (kratka 25 px).
const G = (c, r) => [25 + c * 25, 20 + r * 25];
const GRID = {AB: [[1, 6], [5, 4]], KL: [[7, 7], [9, 6]], MN: [[2, 1], [3, 3]], PR: [[10, 2], [12, 3]], ST: [[11, 5], [13, 7]]};
const gridLines = Array.from({length: 15}, (_, c) => `<path d="M${25 + c * 25} 20V${20 + 8 * 25}" stroke="#2c3a66"/>`).join('') + Array.from({length: 9}, (_, r) => `<path d="M25 ${20 + r * 25}H${25 + 14 * 25}" stroke="#2c3a66"/>`).join('');
const d8 = fig(gridLines + Object.entries(GRID).map(([n, [a, b]]) => `<line data-grid="${n}" x1="${G(...a)[0]}" y1="${G(...a)[1]}" x2="${G(...b)[0]}" y2="${G(...b)[1]}" stroke="#f3f5ff" stroke-width="3"/>` + pt(n[0], ...G(...a), -10, -6) + pt(n[1], ...G(...b), 10, -6)).join(''),
 'Odcinki narysowane w kratce: AB, KL, MN, PR i ST');

export const geometryQuestions5 = [
 // Pojęcia
 q('pg5-1a','Ile końców ma <b>półprosta</b>?',['dwa','jeden','zero','nieskończenie wiele'],1,'Półprosta ma <b>jeden</b> koniec — swój początek. W drugą stronę biegnie bez końca.'),
 q('pg5-1b','Ile prostych można poprowadzić przez <b>dwa różne punkty</b>?',['dwie','żadnej','dokładnie jedną','nieskończenie wiele'],2,'Przez dwa różne punkty przechodzi <b>dokładnie jedna</b> prosta.'),
 q('pg5-1c','Ile prostych można poprowadzić przez <b>jeden punkt</b>?',['nieskończenie wiele','jedną','dwie','żadnej'],0,'Przez jeden punkt można poprowadzić <b>nieskończenie wiele</b> prostych — w każdym kierunku inną.'),
 // Zapis ⊥ i ∥
 q('pg5-2a',`Jak zapisać, że prosta ${I('k')} jest <b>prostopadła</b> do prostej ${I('l')}?`,[I('k ∥ l'),I('k = l'),I('k ⊥ l'),I('k ∠ l')],2,`Prostopadłość oznaczamy znakiem ⊥: <b>${I('k ⊥ l')}</b>. Znak ∥ oznacza równoległość.`),
 q('pg5-2b',`Co oznacza zapis <b>${I('a ∥ b')}</b>?`,[`prosta ${I('a')} jest prostopadła do prostej ${I('b')}`,`prosta ${I('a')} przecina prostą ${I('b')}`,`prosta ${I('a')} jest dłuższa od prostej ${I('b')}`,`prosta ${I('a')} jest równoległa do prostej ${I('b')}`],3,`Znak ∥ oznacza, że proste są <b>równoległe</b>. Proste nie mają długości, więc żadna nie jest dłuższa.`),
 // Punkty wspólne
 q('pg5-3a','Ile punktów wspólnych mają dwie proste <b>prostopadłe</b>?',['jeden','dwa','żadnego','nieskończenie wiele'],0,'Proste prostopadłe przecinają się pod kątem prostym w <b>jednym</b> punkcie.'),
 q('pg5-3b','Ile punktów wspólnych mogą mieć dwie <b>różne</b> proste?',['zawsze dwa','tylko jeden','zero albo jeden','zawsze zero'],2,'Dwie różne proste albo się przecinają (<b>jeden</b> punkt wspólny), albo są równoległe (<b>zero</b> punktów wspólnych).'),
 // Prosta, półprosta, odcinek
 q('pg5-4a',`${d1}Która z narysowanych figur jest <b>prostą</b>?`,[I('LN'),I('KM'),I('MP'),I('KN')],1,`Prosta biegnie bez końca w obie strony: to prosta <b>${I('KM')}</b> (przechodzi też przez ${I('L')}). ${I('LN')} ma początek w ${I('L')}, więc jest półprostą.`),
 q('pg5-4b',`${d1}Która z narysowanych figur jest <b>półprostą</b>?`,[I('NL'),I('KM'),I('MP'),I('LN')],3,`Półprosta ma początek i biegnie bez końca w jedną stronę. Na rysunku to <b>${I('LN')}</b> — jej początkiem jest ${I('L')}. ${I('NL')} oznaczałaby półprostą o początku w ${I('N')}.`),
 q('pg5-4c',`${d1}Która z narysowanych figur jest <b>odcinkiem</b>?`,[I('MP'),I('KM'),I('LN'),I('KN')],0,`Odcinek ma dwa końce: <b>${I('MP')}</b> kończy się w punktach ${I('M')} i ${I('P')}. Odcinka ${I('KN')} na rysunku nie ma.`),
 // Długości odcinków
 q('pg5-5a',`Punkt ${I('B')} leży na odcinku ${I('AC')}. Odcinek ${I('AB')} ma 3 cm, a odcinek ${I('BC')} — 5 cm. Jaką długość ma odcinek ${I('AC')}?`,['2 cm','15 cm','8 cm','5 cm'],2,`${I('B')} leży między ${I('A')} i ${I('C')}, więc ${I('AC')} = 3 cm + 5 cm = <b>8 cm</b>.`),
 q('pg5-5b',`Punkt ${I('B')} leży na odcinku ${I('AC')}. Odcinek ${I('AC')} ma 12 cm, a odcinek ${I('AB')} — 7 cm. Jaką długość ma odcinek ${I('BC')}?`,['19 cm','5 cm','7 cm','6 cm'],1,`${I('BC')} = ${I('AC')} − ${I('AB')} = 12 cm − 7 cm = <b>5 cm</b>.`),
 // Punkty na prostej
 q('pg5-6a',`${d2}Który punkt leży na odcinku ${I('SU')}?`,[I('R'),I('W'),I('X'),I('T')],3,`Na prostej ${I('p')} punkty leżą w kolejności ${I('R, S, T, U, W')}. Między ${I('S')} i ${I('U')} jest tylko <b>${I('T')}</b>.`),
 q('pg5-6b',`${d2}Które punkty <b>nie leżą</b> na prostej ${I('p')}?`,[`${I('X')} i ${I('Y')}`,`${I('R')} i ${I('W')}`,`${I('S')} i ${I('X')}`,`${I('T')} i ${I('Y')}`],0,`Punkty <b>${I('X')} i ${I('Y')}</b> leżą poza prostą. Pozostałe są na niej.`),
 q('pg5-6c',`${d2}Który punkt leży na półprostej ${I('TU')}, ale <b>nie leży</b> na półprostej ${I('UT')}?`,[I('R'),I('W'),I('S'),I('T')],1,`Półprosta ${I('TU')} zaczyna się w ${I('T')} i biegnie przez ${I('U')} dalej, do ${I('W')}. Półprosta ${I('UT')} biegnie od ${I('U')} w drugą stronę: przez ${I('T')}, ${I('S')} i ${I('R')}. Tylko na pierwszej leży <b>${I('W')}</b>.`),
 q('pg5-6d',`${d2}Ile zaznaczonych punktów leży na półprostej ${I('SR')}?`,['1','3','5','2'],3,`Półprosta ${I('SR')} zaczyna się w ${I('S')} i biegnie w stronę ${I('R')}. Leżą na niej <b>2</b> punkty: ${I('S')} i ${I('R')}.`),
 // Proste równoległe i prostopadłe
 q('pg5-7a',`${d4}Która prosta jest <b>równoległa</b> do prostej ${I('k')}?`,[I('m'),I('l'),I('n'),I('o')],1,`Proste ${I('k')} i <b>${I('l')}</b> biegną w tym samym kierunku i nigdy się nie przetną.`),
 q('pg5-7b',`${d4}Która prosta jest <b>prostopadła</b> do prostej ${I('l')}?`,[I('k'),I('m'),I('o'),I('n')],3,`Prosta <b>${I('n')}</b> przecina ${I('l')} pod kątem prostym. Jest też prostopadła do ${I('k')}, bo ${I('k ∥ l')}.`),
 q('pg5-7c',`${d4}Ile prostych na rysunku <b>nie jest</b> ani równoległych, ani prostopadłych do prostej ${I('k')}?`,['1','3','2','0'],2,`${I('l')} jest równoległa, ${I('n')} prostopadła. Ani jednym, ani drugim nie są ${I('m')} i ${I('o')} — razem <b>2</b>.`),
 // W kratce
 q('pg5-8a',`${d8}Który odcinek jest <b>równoległy</b> do odcinka ${I('AB')}?`,[I('KL'),I('MN'),I('PR'),I('ST')],0,`${I('AB')}: 4 kratki w prawo i 2 w górę. <b>${I('KL')}</b>: 2 w prawo i 1 w górę — to ten sam kierunek, tylko krótszy odcinek.`),
 q('pg5-8b',`${d8}Który odcinek jest <b>prostopadły</b> do odcinka ${I('AB')}?`,[I('KL'),I('PR'),I('MN'),I('ST')],2,`${I('AB')} idzie 2 kratki w prawo na 1 w górę. Prostopadle idzie się 1 w prawo na 2 w dół — tak biegnie <b>${I('MN')}</b>.`),
 // Która para jest równoległa
 q('pg5-9a',`${d5}Dwie spośród narysowanych prostych są równoległe. Które to proste?`,[`${I('a')} i ${I('c')}`,`${I('b')} i ${I('d')}`,`${I('a')} i ${I('b')}`,`${I('c')} i ${I('e')}`],1,`Proste <b>${I('b')} i ${I('d')}</b> biegną w tym samym kierunku. Pozostałe pary się przecinają.`),
 q('pg5-9b',`${d5}Która prosta jest <b>prostopadła</b> do prostej ${I('a')}?`,[I('b'),I('d'),I('e'),I('c')],3,`Prosta <b>${I('c')}</b> przecina ${I('a')} pod kątem prostym.`),
 // Ile odcinków, półprostych, prostych
 q('pg5-10a',`${d3}Ile różnych odcinków o końcach w zaznaczonych punktach można wskazać na rysunku?`,['3','5','6','4'],3,`Na prostej: ${I('AB')}, ${I('BC')} i ${I('AC')}. Na półprostej: ${I('BD')}. Razem <b>4</b>. Odcinka ${I('AD')} ani ${I('CD')} nie narysowano.`),
 q('pg5-10b',`${d3}Ile półprostych o początku w punkcie ${I('B')} można wskazać na rysunku?`,['1','2','3','4'],2,`Na prostej z punktu ${I('B')} wychodzą dwie półproste: ${I('BA')} i ${I('BC')}. Do tego narysowana półprosta ${I('BD')}. Razem <b>3</b>.`),
 q('pg5-10c',`${d3}Ile <b>prostych</b> jest na rysunku?`,['2','1','3','0'],1,`Jest tylko <b>1</b> prosta — ta przez ${I('A')}, ${I('B')} i ${I('C')}. ${I('BD')} ma początek, więc jest półprostą.`),
 // Wielokąt
 q('pg5-11a',`${d6}Ile boków wielokąta jest <b>równoległych</b> do boku ${I('AB')}?`,['3','2','4','1'],1,`Poziome są ${I('CD')} i ${I('EF')} — razem <b>2</b> (samego ${I('AB')} nie liczymy).`),
 q('pg5-11b',`${d6}Ile boków wielokąta jest <b>prostopadłych</b> do boku ${I('AB')}?`,['3','5','2','4'],3,`Pionowe są ${I('BC')}, ${I('DE')}, ${I('FG')} i ${I('HA')} — razem <b>4</b>.`),
 q('pg5-11c',`${d6}Który bok wielokąta <b>nie jest</b> ani równoległy, ani prostopadły do boku ${I('AB')}?`,[I('FG'),I('HA'),I('CD'),I('GH')],3,`Bok <b>${I('GH')}</b> jest ukośny. Pozostałe boki są poziome albo pionowe.`),
 // Ile prostych wyznaczają punkty
 q('pg5-12a',`Punkty ${I('A')}, ${I('B')} i ${I('C')} <b>nie leżą</b> na jednej prostej. Ile różnych prostych przechodzi przez dwa z tych punktów?`,['2','3','6','1'],1,`Proste ${I('AB')}, ${I('BC')} i ${I('AC')} — razem <b>3</b>. To boki trójkąta przedłużone w obie strony.`),
 q('pg5-12b','Zaznaczono 4 punkty, z których żadne trzy nie leżą na jednej prostej. Ile różnych odcinków o końcach w tych punktach można narysować?',['4','8','12','6'],3,`Każdy punkt łączymy z 3 pozostałymi: 4 · 3 = 12, ale każdy odcinek policzyliśmy dwa razy. 12 : 2 = <b>6</b>.`),
 q('pg5-12c',`Punkty ${I('A')}, ${I('B')} i ${I('C')} leżą na jednej prostej. Ile różnych prostych przechodzi przez dwa z tych punktów?`,['1','3','2','0'],0,`Wszystkie trzy punkty leżą na tej samej prostej, więc jest tylko <b>1</b> prosta.`),
 // Przekątne czworokąta
 q('pg5-13a',`${d7}Które z zaznaczonych punktów należą do odcinka ${I('LN')}?`,[`${I('L')} i ${I('N')}`,`${I('K')}, ${I('S')} i ${I('M')}`,`${I('L')}, ${I('S')} i ${I('N')}`,`tylko ${I('S')}`],2,`Do odcinka należą jego końce ${I('L')} i ${I('N')} oraz punkt <b>${I('S')}</b>, w którym przecina go ${I('KM')}. Odpowiedź: <b>${I('L')}, ${I('S')} i ${I('N')}</b>.`),
 q('pg5-13b',`${d7}Ile różnych odcinków o końcach w zaznaczonych punktach można wskazać na rysunku?`,['6','8','10','12'],2,`Boki: ${I('KL')}, ${I('LM')}, ${I('MN')}, ${I('NK')} (4). Na przekątnej ${I('KM')}: ${I('KS')}, ${I('SM')}, ${I('KM')} (3). Na ${I('LN')}: ${I('LS')}, ${I('SN')}, ${I('LN')} (3). Razem <b>10</b>.`),
 // Prawda czy fałsz
 truth('pg5-14a','Odcinek ma dwa końce.','Półprosta ma dwa początki.','PF','I: odcinek ma dwa końce — <b>prawda</b>. II: półprosta ma jeden początek — <b>fałsz</b>.'),
 truth('pg5-14b',`Dwie proste prostopadłe do tej samej prostej są do siebie równoległe.`,'Dwie różne proste równoległe nie mają punktów wspólnych.','PP','I: obie biegną pod kątem prostym do tej samej prostej, więc mają ten sam kierunek — <b>prawda</b>. II: proste równoległe się nie przecinają — <b>prawda</b>.'),
];

// Klasa 5, dział „Figury geometryczne”: kąty — rodzaje kątów, nazwy, porównywanie, zegar, kąty przyległe i wierzchołkowe,
// kąty wielokąta, kąty między drogami. Od łatwych do trudnych (`ordered`). Kierunki w stopniach jak w matematyce:
// 0° w prawo, 90° w górę. Ramiona, łuki i wskazówki mają współrzędne w atrybutach data-*, test mierzy na nich kąty.
const rad = (d) => d * Math.PI / 180;
const at = ([x, y], deg, len) => [r1(x + len * Math.cos(rad(deg))), r1(y - len * Math.sin(rad(deg)))];
const arm = (v, deg, len) => { const e = at(v, deg, len); return `<path d="M${v[0]} ${v[1]}L${e[0]} ${e[1]}" stroke="#f3f5ff" stroke-width="2.5"/>`; };
// Łuk kąta od ramienia `from` przeciwnie do ruchu wskazówek zegara o `span` stopni; przy 90° kwadracik.
function arc(name, v, from, span, label = '', r = 26) {
 const a = at(v, from, r), b = at(v, from + span, r), data = `data-arc="${name}" data-v="${v}" data-a="${at(v, from, 50)}" data-b="${at(v, from + span, 50)}"`;
 const mark = span === 90
  ? `<path ${data} d="M${at(v, from, 15)}L${at(at(v, from, 15), from + 90, 15)}L${at(v, from + 90, 15)}" fill="none" stroke="#63d6e8" stroke-width="2"/>`
  : `<path ${data} d="M${a[0]} ${a[1]}A${r} ${r} 0 ${span > 180 ? 1 : 0} 0 ${b[0]} ${b[1]}" fill="none" stroke="#63d6e8" stroke-width="2"/>`;
 const l = at(v, from + span / 2, r + (span > 180 ? 16 : 15));
 return mark + (label ? txt(l[0], l[1] + 6, label, '#63d6e8') : '');
}
const angle = (name, v, from, span, label = name, len = 110) => arm(v, from, len) + arm(v, from + span, len) + arc(name, v, from, span, label);
const TYPES = ['ostry', 'prosty', 'rozwarty', 'półpełny'];
// Zegar: wskazówki z data-hand, mniejszy kąt między nimi liczy test.
function clock(h, m, cx = 200, cy = 118) {
 const v = [cx, cy], hand = (name, deg, len, w) => { const e = at(v, 90 - deg, len); return `<line data-hand="${name}" x1="${cx}" y1="${cy}" x2="${e[0]}" y2="${e[1]}" stroke="#f6c85c" stroke-width="${w}" stroke-linecap="round"/>`; };
 const ticks = Array.from({length: 12}, (_, k) => { const a = at(v, 90 - k * 30, 92), b = at(v, 90 - k * 30, 102); return `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="#f3f5ff" stroke-width="3"/>`; }).join('');
 const nums = Array.from({length: 12}, (_, k) => { const p = at(v, 90 - (k + 1) * 30, 78); return `<text x="${p[0]}" y="${p[1] + 6}" text-anchor="middle" fill="#f3f5ff" font-family="Arial, sans-serif" font-size="16">${k + 1}</text>`; }).join('');
 return fig(`<circle cx="${cx}" cy="${cy}" r="106" fill="#101b3b" stroke="#f3f5ff" stroke-width="3"/>` + ticks + nums + hand('h', (h % 12) * 30 + m / 2, 52, 6) + hand('m', m * 6, 82, 4) + `<circle cx="${cx}" cy="${cy}" r="5" fill="#f6c85c"/>`,
  `Zegar wskazuje godzinę ${h}:${String(m).padStart(2, '0')}`);
}
const typeQ = (id, svg, correct, explain) => q(id, `${svg}Jakiego rodzaju jest zaznaczony kąt?`, ['ostry', 'prosty', 'rozwarty', 'wklęsły'], correct, explain);
const clockQ = (id, h, m, explain) => q(id, `${clock(h, m)}Jaki kąt tworzą wskazówki tego zegara (mniejszy z dwóch kątów)?`, TYPES, TYPES.indexOf(explain.type), explain.text);
const four = fig(angle('α', [40, 100], 0, 90, 'α', 70) + angle('β', [230, 95], 10, 25, 'β', 140) + angle('γ', [40, 220], 5, 70, 'γ', 80) + angle('δ', [260, 215], 15, 130, 'δ', 80), 'Cztery kąty: α, β, γ i δ');
const named1 = fig(arm([150, 170], 0, 170) + arm([150, 170], 120, 150) + arc('EFG', [150, 170], 0, 120, '', 30) + pt('F', 150, 170, 0, 26) + pt('G', ...at([150, 170], 0, 120), 0, 26) + pt('E', ...at([150, 170], 120, 100), -14, 0), 'Kąt o wierzchołku F, ramiona przechodzą przez punkty E i G');
const named2 = fig(arm([120, 150], 30, 200) + arm([120, 150], 160, 100) + arc('LKM', [120, 150], 30, 130, '', 30) + pt('K', 120, 150, 0, 28) + pt('M', ...at([120, 150], 30, 160), 0, -12) + pt('L', ...at([120, 150], 160, 80), 0, -12), 'Kąt o wierzchołku K, ramiona przechodzą przez punkty L i M');
// Dwie proste przecinające się w punkcie O: ∢AOB = 50°.
const O = [200, 118], X = {A: 160, B: 110, C: 340, D: 290};
const crossing = fig(Object.values(X).map((d) => arm(O, d, 120)).join('') + arc('AOB', O, 110, 50, '50°', 30) + pt('O', ...O, 18, 4) + Object.entries(X).map(([n, d]) => pt(n, ...at(O, d, 95), 14, -6)).join(''),
 'Proste AC i BD przecinają się w punkcie O; kąt AOB ma 50°');
// Trzy proste przez jeden punkt: kąty 40°, α, 65°, β (β wierzchołkowy do kąta 40°).
const V3 = [200, 118];
const three = fig([0, 40, 115].map((d) => arm(V3, d, 125) + arm(V3, d + 180, 125)).join('') + arc('40', V3, 0, 40, '40°', 40) + arc('α', V3, 40, 75, 'α', 30) + arc('65', V3, 115, 65, '65°', 40) + arc('β', V3, 180, 40, 'β', 30),
 'Trzy proste przecinające się w jednym punkcie; zaznaczone kąty 40°, α, 65° i β');
// Drogi z rozwidlenia w lesie.
const ROADS = {'do wsi': 90, 'do polany': 0, 'do rzeki': -30, 'do szosy': 270, 'do cegielni': 115};
const RV = [200, 114];
const roads = fig(Object.entries(ROADS).map(([n, d]) => { const e = at(RV, d, 82), l = at(RV, d, 98); return `<line data-road="${n}" x1="${RV[0]}" y1="${RV[1]}" x2="${e[0]}" y2="${e[1]}" stroke="#f3f5ff" stroke-width="2.5"/>` + `<text x="${l[0]}" y="${l[1] + 5}" text-anchor="${Math.abs(d % 180) === 90 ? 'middle' : Math.cos(rad(d)) > 0 ? 'start' : 'end'}" fill="#f6c85c" font-family="Arial, sans-serif" font-size="15">${n}</text>`; }).join(''),
 'Drogi rozchodzące się z jednego punktu: do wsi (w górę), do polany (w prawo), do rzeki (w prawo w dół), do szosy (w dół), do cegielni (w górę w lewo)');
const polyFig = (points, desc) => fig(`<polygon data-poly="kąty" points="${points.map((p) => p.join(',')).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>`, desc);
const house = polyFig([[80, 205], [320, 205], [320, 115], [200, 30], [80, 115]], 'Pięciokąt w kształcie domku');
const trapez = polyFig([[60, 195], [340, 195], [260, 55], [140, 55]], 'Czworokąt z dwoma bokami poziomymi; dolny bok dłuższy od górnego');
const ROADQ = (a, b) => `${roads}Jaki kąt (wypukły) tworzą drogi „${a}” i „${b}”?`;

export const angleQuestions5 = [
 // Rodzaje kątów według miary
 q('kt5-1a','Kąt o mierze <b>35°</b> to kąt:',TYPES,0,'Kąt mniejszy od 90° to kąt <b>ostry</b>.'),
 q('kt5-1b','Kąt o mierze <b>120°</b> to kąt:',TYPES,2,'Kąt większy od 90°, a mniejszy od 180° to kąt <b>rozwarty</b>.'),
 q('kt5-1c','Ile stopni ma kąt <b>półpełny</b>?',['90°','100°','360°','180°'],3,'Kąt półpełny ma <b>180°</b> — jego ramiona tworzą prostą.'),
 q('kt5-1d','Ile stopni ma kąt <b>pełny</b>?',['180°','360°','100°','90°'],1,'Kąt pełny to pełny obrót: <b>360°</b>.'),
 // Rodzaj narysowanego kąta
 typeQ('kt5-2a',fig(angle('a', [130, 190], 20, 55, '', 190), 'Kąt'),0,'Ramiona są blisko siebie, kąt jest mniejszy od prostego — <b>ostry</b>.'),
 typeQ('kt5-2b',fig(angle('a', [200, 175], 15, 140, '', 160), 'Kąt'),2,'Kąt jest większy od prostego, ale ramiona nie tworzą prostej — <b>rozwarty</b>.'),
 typeQ('kt5-2c',fig(angle('a', [150, 190], 30, 90, '', 150), 'Kąt'),1,'Kwadracik oznacza kąt <b>prosty</b> — 90°.'),
 typeQ('kt5-2d',fig(angle('a', [210, 118], 60, 240, '', 110), 'Kąt'),3,'Zaznaczony kąt jest większy od półpełnego (180°) — to kąt <b>wklęsły</b>.'),
 // Nazwy kątów
 q('kt5-3a',`${named1}Jak nazwać zaznaczony kąt?`,['∢EFG','∢FEG','∢EGF','∢FGE'].map(I),0,`Wierzchołek zapisujemy w środku: <b>${I('∢EFG')}</b> (albo ${I('∢GFE')}). Wierzchołkiem jest ${I('F')}.`),
 q('kt5-3b',`${named2}Jak nazwać zaznaczony kąt?`,['∢KML','∢MLK','∢KLM','∢LKM'].map(I),3,`Wierzchołkiem jest ${I('K')}, więc stoi w środku nazwy: <b>${I('∢LKM')}</b> (albo ${I('∢MKL')}).`),
 // Porównywanie kątów
 q('kt5-4a',`${four}Który kąt jest <b>największy</b>?`,['α','β','γ','δ'],3,'α jest prosty, β i γ są ostre, a <b>δ</b> jest rozwarty — największy.'),
 q('kt5-4b',`${four}Który kąt jest <b>najmniejszy</b>?`,['α','β','γ','δ'],1,'Ramiona kąta <b>β</b> są najbliżej siebie. γ też jest ostry, ale szerszy.'),
 // Wskazówki w ruchu
 q('kt5-5a','Jaki kąt zakreśli wskazówka <b>minutowa</b> w ciągu 15 minut?',TYPES,1,'Cała tarcza to 60 minut i 360°. 15 minut to ćwierć obrotu: 90° — kąt <b>prosty</b>.'),
 q('kt5-5b','Jaki kąt zakreśli wskazówka <b>minutowa</b> w ciągu 30 minut?',TYPES,3,'30 minut to pół obrotu: 180° — kąt <b>półpełny</b>.'),
 q('kt5-5c','Jaki kąt zakreśli wskazówka <b>godzinowa</b> w ciągu 4 godzin?',TYPES,2,'Wskazówka godzinowa przesuwa się o 30° na godzinę: 4 · 30° = 120° — kąt <b>rozwarty</b>.'),
 q('kt5-5d','Jaki kąt zakreśli wskazówka <b>minutowa</b> w ciągu 10 minut?',TYPES,0,'Minuta to 6°, więc 10 minut to 60° — kąt <b>ostry</b>.'),
 // Zegar na rysunku
 clockQ('kt5-6a',3,0,{type:'prosty',text:'Wskazówka minutowa na 12, godzinowa na 3 — ćwierć tarczy, 90°. Kąt <b>prosty</b>.'}),
 clockQ('kt5-6b',5,0,{type:'rozwarty',text:'Od 12 do 5 jest 5 · 30° = 150°. Kąt <b>rozwarty</b>.'}),
 clockQ('kt5-6c',1,0,{type:'ostry',text:'Od 12 do 1 jest 30°. Kąt <b>ostry</b>.'}),
 clockQ('kt5-6d',6,0,{type:'półpełny',text:'Wskazówki są skierowane w przeciwne strony — 180°. Kąt <b>półpełny</b>.'}),
 // Zegar bez rysunku
 q('kt5-7a','Jaki kąt tworzą wskazówki zegara o godzinie <b>9.00</b>?',TYPES,1,'Od 9 do 12 są trzy godziny: 3 · 30° = 90°. Kąt <b>prosty</b>.'),
 q('kt5-7b','Jaki kąt (mniejszy z dwóch) tworzą wskazówki zegara o godzinie <b>10.30</b>?',TYPES,2,'Wskazówka minutowa jest na 6, a godzinowa w połowie między 10 a 11. To 4 i pół godziny na tarczy: 4,5 · 30° = 135°. Kąt <b>rozwarty</b>.'),
 q('kt5-7c','Jaki kąt tworzą wskazówki zegara o godzinie <b>2.15</b>?',TYPES,0,'Wskazówka minutowa jest na 3, a godzinowa trochę za 2 — tylko kawałek przed 3. Kąt jest mały: <b>ostry</b>.'),
 // Kąty przyległe i wierzchołkowe — miary
 q('kt5-8a','Kąt przyległy do kąta o mierze <b>35°</b> ma miarę:',['35°','55°','145°','325°'],2,'Kąty przyległe razem mają 180°: 180° − 35° = <b>145°</b>. 55° to dopełnienie do 90°.'),
 q('kt5-8b','Kąt wierzchołkowy do kąta o mierze <b>35°</b> ma miarę:',['35°','55°','145°','325°'],0,'Kąty wierzchołkowe są równe: <b>35°</b>.'),
 q('kt5-8c','Dwa kąty są przyległe. Jeden z nich jest o 40° większy od drugiego. Ile stopni ma <b>mniejszy</b> z nich?',['70°','40°','110°','140°'],0,'Razem mają 180°. Bez różnicy: 180° − 40° = 140°, połowa to <b>70°</b>. Większy ma 110°.'),
 // Dwie proste przecinające się
 q('kt5-9a',`${crossing}Który kąt jest <b>wierzchołkowy</b> z kątem ${I('AOB')}?`,['∢BOC','∢AOC','∢COD','∢AOD'].map(I),2,`Kąt wierzchołkowy leży naprzeciwko: ramiona ${I('OC')} i ${I('OD')} przedłużają ramiona ${I('OA')} i ${I('OB')}. To <b>${I('∢COD')}</b>.`),
 q('kt5-9b',`${crossing}Który kąt jest <b>przyległy</b> do kąta ${I('AOB')}?`,['∢COD','∢BOC','∢AOC','∢BOD'].map(I),1,`Kąt przyległy ma wspólne ramię ${I('OB')}, a drugie ramiona tworzą prostą (${I('OA')} i ${I('OC')}). To <b>${I('∢BOC')}</b>. ${I('∢AOC')} i ${I('∢BOD')} są półpełne.`),
 q('kt5-9c',`${crossing}Ile stopni ma kąt ${I('BOC')}?`,['50°','40°','140°','130°'],3,`${I('∢BOC')} jest przyległy do ${I('∢AOB')}: 180° − 50° = <b>130°</b>.`),
 q('kt5-9d',`${crossing}Ile stopni ma kąt ${I('COD')}?`,['130°','50°','40°','310°'],1,`${I('∢COD')} jest wierzchołkowy do ${I('∢AOB')}, więc ma tyle samo: <b>50°</b>.`),
 // Drogi w lesie
 q('kt5-10a',ROADQ('do wsi','do polany'),TYPES,1,'Droga do wsi biegnie w górę, a do polany — w prawo. Kąt <b>prosty</b>.'),
 q('kt5-10b',ROADQ('do rzeki','do cegielni'),TYPES,2,'Kąt między tymi drogami jest większy od prostego, ale nie tworzą one prostej — <b>rozwarty</b>.'),
 q('kt5-10c',ROADQ('do wsi','do cegielni'),TYPES,0,'Drogi są blisko siebie — kąt <b>ostry</b>.'),
 q('kt5-10d',ROADQ('do szosy','do wsi'),TYPES,3,'Drogi biegną w przeciwne strony i tworzą prostą — kąt <b>półpełny</b>.'),
 // Kąty wielokąta
 q('kt5-11a',`${house}Ile kątów <b>rozwartych</b> ma ten pięciokąt?`,['1','2','5','3'],3,'Na dole są dwa kąty proste, a trzy górne kąty (przy dachu i ścianach) są rozwarte — razem <b>3</b>.'),
 q('kt5-11b',`${house}Ile kątów <b>prostych</b> ma ten pięciokąt?`,['0','1','2','3'],2,'Kąty proste są przy dolnych wierzchołkach — <b>2</b>.'),
 q('kt5-11c',`${trapez}Ile kątów <b>ostrych</b> ma ten czworokąt?`,['0','1','2','4'],2,'Kąty przy dłuższym, dolnym boku są ostre, a przy górnym — rozwarte. Ostre są <b>2</b>.'),
 // Prawda czy fałsz
 truth('kt5-12a','Kąty wierzchołkowe mają równe miary.','Suma miar dwóch kątów przyległych wynosi 90°.','PF','I: kąty wierzchołkowe są równe — <b>prawda</b>. II: kąty przyległe mają razem 180°, a nie 90° — <b>fałsz</b>.'),
 truth('kt5-12b','Każdy kąt rozwarty jest większy od kąta prostego.','Kąt półpełny jest dwa razy większy od kąta prostego.','PP','I: kąt rozwarty ma więcej niż 90° — <b>prawda</b>. II: 180° = 2 · 90° — <b>prawda</b>.'),
 // Trzy proste
 q('kt5-13a',`${three}Trzy proste przecinają się w jednym punkcie. Ile stopni ma kąt α?`,['75°','65°','40°','115°'],0,'Kąty 40°, α i 65° tworzą razem kąt półpełny: α = 180° − 40° − 65° = <b>75°</b>.'),
 q('kt5-13b',`${three}Trzy proste przecinają się w jednym punkcie. Ile wynosi suma α + β?`,['180°','105°','140°','115°'],3,'α = 180° − 40° − 65° = 75°. β jest wierzchołkowy do kąta 40°, więc β = 40°. α + β = <b>115°</b>.'),
];

// Klasa 5, dział „Figury geometryczne”: mierzenie kątów — rodzaj kąta po mierze, wybór miary dla rysunku, kątomierz
// z dwiema skalami, obrót wskazówek zegara w stopniach, kąty zaznaczone łukami (przyległe, wierzchołkowe, wklęsłe, z kątem
// prostym), trzy proste, podział kąta na części. Od łatwych do trudnych (`ordered`). Łuki mają współrzędne w data-*.
const dg = (n) => `${n}°`;
const MK = ['ostry', 'prosty', 'rozwarty', 'wklęsły'];
const ptext = ([x, y], s, color, size = 11) => `<text x="${x}" y="${r1(y + size / 3)}" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="${size}">${s}</text>`;
// Kątomierz: zewnętrzna biała skala ma 0 po lewej, wewnętrzna żółta — 0 po prawej. Kąt ma wierzchołek w środku kątomierza.
function protractor(from, span) {
 const v = [200, 200], R = 165;
 let s = `<path d="M${200 - R} 200A${R} ${R} 0 0 1 ${200 + R} 200Z" fill="#1d3a6b" fill-opacity="0.6" stroke="#9fd3ff" stroke-width="1.5"/><rect x="20" y="200" width="360" height="22" fill="#1d3a6b" fill-opacity="0.6" stroke="#9fd3ff" stroke-width="1.5"/>`;
 for (let d = 0; d <= 180; d += 5) { const a = at(v, d, R), b = at(v, d, R - (d % 10 ? 6 : 12)); s += `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="#9fd3ff" stroke-width="1"/>`; }
 // 0 i 180 lekko nad podstawą, żeby ramię kąta ich nie zasłaniało.
 for (let d = 0; d <= 180; d += 10) { const up = d % 180 ? 0 : 9, o = at(v, d, R - 23), i = at(v, d, R - 42); s += ptext([o[0], o[1] - up], 180 - d, '#f3f5ff') + ptext([i[0], i[1] - up], d, '#f6c85c'); }
 return fig(s + arm(v, from, 190) + arm(v, from + span, 190) + arc('x', v, from, span, '', 28) + `<circle cx="200" cy="200" r="4" fill="#f6c85c"/>`,
  'Kąt przyłożony do kątomierza: wierzchołek w środku kątomierza, jedno ramię wzdłuż jego podstawy');
}
const measureQ = (id, svg, answers, correct, explain) => q(id, `${svg}Ile stopni ma zaznaczony kąt?`, answers, correct, explain);
// Prosta i półprosta: kąt podany po jednej stronie półprostej, „?” po drugiej.
function onLine(ray, givenRight) {
 const v = [200, 170], [g0, gs, q0, qs] = givenRight ? [0, ray, ray, 180 - ray] : [ray, 180 - ray, 0, ray];
 return fig(arm(v, 0, 180) + arm(v, 180, 180) + arm(v, ray, 150) + arc(dg(gs), v, g0, gs, dg(gs), 30) + arc('?', v, q0, qs, '?', 46), 'Prosta i półprosta wychodząca z punktu na prostej; zaznaczone dwa kąty');
}
// Kąt wypukły z podaną miarą i łuk „?” dookoła — kąt wklęsły.
function reflexFig(x) {
 const v = [200, 140], f = 90 - x / 2;
 return fig(arm(v, f, 100) + arm(v, f + x, 100) + arc(dg(x), v, f, x, dg(x), 26) + arc('?', v, f + x, 360 - x, '?', 34), 'Dwa ramiona kąta; zaznaczony kąt wypukły i kąt wklęsły');
}
// Dwie proste przecinające się: kąt x° między kierunkami 15° i 15° + x, łuk „?” od `qFrom` o `qSpan`.
const crossFig = (x, qFrom, qSpan) => { const v = [200, 118]; return fig([15, 15 + x, 195, 195 + x].map((d) => arm(v, d, 108)).join('') + arc(dg(x), v, 15, x, dg(x), 26) + arc('?', v, qFrom, qSpan, '?', 44), 'Dwie proste przecinające się w jednym punkcie'); };
// Trzy proste przez jeden punkt: 50°, α, β, γ, δ.
const TV = [200, 118];
const threeEq = fig([0, 50, 115].map((d) => arm(TV, d, 110) + arm(TV, d + 180, 110)).join('') + arc('50°', TV, 0, 50, '50°', 34) + arc('α', TV, 50, 65, 'α', 28) + arc('β', TV, 115, 65, 'β', 28) + arc('γ', TV, 180, 50, 'γ', 28) + arc('δ', TV, 230, 65, 'δ', 28),
 'Trzy proste przecinające się w jednym punkcie; zaznaczone kąty 50°, α, β, γ i δ');
const THREE = `${threeEq}Trzy proste przecinają się w jednym punkcie. Kąty α i β są równe.`;
const turnQ = (id, hand, time, answers, correct, explain) => q(id, `O ile stopni obróci się wskazówka <b>${hand}</b> w ciągu <b>${time}</b>?`, answers, correct, explain);
const MIN6 = 'Wskazówka minutowa robi pełny obrót (360°) w 60 minut, więc w minutę obraca się o 360° : 60 = 6°';
const HOUR30 = 'Wskazówka godzinowa robi pełny obrót (360°) w 12 godzin, więc w godzinę obraca się o 360° : 12 = 30°';
const clockDegQ = (id, h, m, answers, correct, explain) => q(id, `${clock(h, m)}Ile stopni ma <b>mniejszy</b> kąt między wskazówkami tego zegara?`, answers, correct, explain);

export const measureQuestions5 = [
 // Rodzaj kąta po mierze
 ...[[62, 0, 'Kąt mniejszy od 90° to kąt <b>ostry</b>.'], [90, 1, 'Kąt o mierze 90° to kąt <b>prosty</b>.'], [168, 2, 'Kąt większy od 90°, a mniejszy od 180° to kąt <b>rozwarty</b>.'], [301, 3, 'Kąt większy od 180°, a mniejszy od 360° to kąt <b>wklęsły</b>.']]
  .map(([n, c, e], i) => q(`mk5-1${'abcd'[i]}`, `Jakiego rodzaju jest kąt o mierze <b>${dg(n)}</b>?`, MK, c, e)),
 // Pojemniki: kąty ostre i rozwarte
 q('mk5-2a','Kąty ostre wrzucamy do jednego pojemnika, a rozwarte — do drugiego. Który kąt <b>nie pasuje</b> do żadnego z nich?',['17°','134°','91°','180°'],3,'17° to kąt ostry, 134° i 91° — rozwarte. <b>180°</b> to kąt półpełny: nie jest ani ostry, ani rozwarty.'),
 q('mk5-2b','Kąty ostre wrzucamy do jednego pojemnika, a rozwarte — do drugiego. Który kąt <b>nie pasuje</b> do żadnego z nich?',['90°','89°','46°','179°'],0,'89° i 46° to kąty ostre, 179° — rozwarty. <b>90°</b> to kąt prosty: nie jest ani ostry, ani rozwarty.'),
 q('mk5-2c','Który z kątów jest <b>ostry</b>?',['95°','90°','89°','100°'],2,'Kąt ostry ma mniej niż 90°. Tylko <b>89°</b> spełnia ten warunek — 90° to już kąt prosty.'),
 q('mk5-2d','Ile spośród kątów 14°, 90°, 102°, 179°, 47°, 88°, 180°, 135° to kąty <b>ostre</b>?',['2','3','4','5'],1,'Ostre są kąty mniejsze od 90°: 14°, 47° i 88° — razem <b>3</b>. 90° to kąt prosty, a nie ostry.'),
 // Która miara pasuje do rysunku?
 q('mk5-3a',`${fig(angle('x', [110, 190], 10, 50, '', 200), 'Kąt ostry')}Która miara pasuje do zaznaczonego kąta?`,['50°','130°','230°','310°'],0,'Kąt jest węższy od prostego, czyli ostry. Ma mniej niż 90°, więc pasuje tylko <b>50°</b>.'),
 q('mk5-3b',`${fig(angle('x', [200, 185], 15, 150, '', 150), 'Kąt rozwarty')}Która miara pasuje do zaznaczonego kąta?`,['30°','150°','210°','330°'],1,'Kąt jest szerszy od prostego, ale ramiona nie tworzą prostej — to kąt rozwarty, od 90° do 180°. Pasuje <b>150°</b>.'),
 q('mk5-3c',`${fig(angle('x', [200, 205], 40, 100, '', 160), 'Kąt rozwarty')}Która miara pasuje do zaznaczonego kąta?`,['80°','260°','100°','280°'],2,'Kąt jest trochę szerszy od prostego, więc jest rozwarty. Pasuje <b>100°</b>; 80° to kąt ostry.'),
 q('mk5-3d',`${fig(arm([170, 125], 0, 120) + arm([170, 125], 90, 105) + arc('x', [170, 125], 90, 270, '', 26), 'Dwa prostopadłe ramiona; zaznaczony kąt wklęsły')}Która miara pasuje do zaznaczonego kąta?`,['90°','180°','45°','270°'],3,'Łuk obejmuje kąt wklęsły — większy od półpełnego. Ramiona są prostopadłe, więc do pełnego kąta brakuje 90°: 360° − 90° = <b>270°</b>.'),
 // Kątomierz
 measureQ('mk5-4a',protractor(0, 40),['40°','140°','50°','130°'],0,'Jedno ramię biegnie w prawo, do zera <b>żółtej</b> skali. Na tej samej skali drugie ramię wskazuje <b>40°</b>. Kąt jest ostry, więc 140° (biała skala) nie pasuje.'),
 measureQ('mk5-4b',protractor(120, 60),['120°','60°','70°','110°'],1,'Jedno ramię biegnie w lewo, do zera <b>białej</b> skali. Na tej samej skali drugie ramię wskazuje <b>60°</b>. Kąt jest ostry, więc 120° (żółta skala) nie pasuje.'),
 measureQ('mk5-4c',protractor(0, 110),['70°','100°','110°','80°'],2,'Jedno ramię biegnie w prawo, do zera <b>żółtej</b> skali. Na niej drugie ramię wskazuje <b>110°</b>. Kąt jest rozwarty, więc 70° nie pasuje.'),
 measureQ('mk5-4d',protractor(25, 155),['25°','145°','35°','155°'],3,'Jedno ramię biegnie w lewo, do zera <b>białej</b> skali. Na niej drugie ramię wskazuje <b>155°</b> — w połowie między 150 a 160. Kąt jest rozwarty, więc 25° nie pasuje.'),
 // Wskazówka minutowa
 turnQ('mk5-5a','minutowa','25 minut',['25°','125°','150°','250°'],2,`${MIN6}. 25 · 6° = <b>150°</b>.`),
 turnQ('mk5-5b','minutowa','45 minut',['270°','45°','180°','135°'],0,`${MIN6}. 45 · 6° = <b>270°</b> — trzy czwarte pełnego obrotu.`),
 turnQ('mk5-5c','minutowa','35 minut',['35°','180°','185°','210°'],3,`${MIN6}. 35 · 6° = <b>210°</b>.`),
 turnQ('mk5-5d','minutowa','kwadransa',['15°','90°','45°','150°'],1,`Kwadrans to 15 minut, czyli ćwierć obrotu. ${MIN6}: 15 · 6° = <b>90°</b>.`),
 // Wskazówka godzinowa
 turnQ('mk5-6a','godzinowa','3 godzin',['3°','30°','90°','180°'],2,`${HOUR30}. 3 · 30° = <b>90°</b>.`),
 turnQ('mk5-6b','godzinowa','7 godzin',['210°','70°','150°','240°'],0,`${HOUR30}. 7 · 30° = <b>210°</b>.`),
 turnQ('mk5-6c','godzinowa','pół godziny',['30°','15°','180°','3°'],1,`${HOUR30}, a w pół godziny — o połowę tego: <b>15°</b>. 180° to obrót wskazówki minutowej.`),
 turnQ('mk5-6d','godzinowa','2 godzin i 20 minut',['60°','80°','140°','70°'],3,`${HOUR30}. 2 godziny to 60°, a 20 minut to trzecia część godziny: 30° : 3 = 10°. Razem <b>70°</b>.`),
 // Prosta i półprosta
 measureQ('mk5-7a',onLine(65, true),['25°','115°','65°','125°'],1,'Oba kąty leżą przy prostej, razem tworzą kąt półpełny — 180°. ? = 180° − 65° = <b>115°</b>.'),
 measureQ('mk5-7b',onLine(128, true),['52°','128°','62°','38°'],0,'Razem tworzą kąt półpełny — 180°. ? = 180° − 128° = <b>52°</b>.'),
 measureQ('mk5-7c',onLine(143, false),['53°','37°','143°','133°'],2,'Razem tworzą kąt półpełny — 180°. ? = 180° − 37° = <b>143°</b>.'),
 measureQ('mk5-7d',onLine(28, false),['152°','38°','62°','28°'],3,'Razem tworzą kąt półpełny — 180°. ? = 180° − 152° = <b>28°</b>.'),
 // Kąt wklęsły
 measureQ('mk5-8a',reflexFig(115),['245°','65°','255°','235°'],0,'Oba kąty razem tworzą kąt pełny — 360°. ? = 360° − 115° = <b>245°</b>.'),
 measureQ('mk5-8b',reflexFig(104),['76°','266°','256°','104°'],2,'Oba kąty razem tworzą kąt pełny — 360°. ? = 360° − 104° = <b>256°</b>. 76° to dopełnienie do 180°, a nie do 360°.'),
 measureQ('mk5-8c',reflexFig(40),['140°','320°','40°','300°'],1,'Oba kąty razem tworzą kąt pełny — 360°. ? = 360° − 40° = <b>320°</b>.'),
 measureQ('mk5-8d',reflexFig(150),['30°','150°','310°','210°'],3,'Oba kąty razem tworzą kąt pełny — 360°. ? = 360° − 150° = <b>210°</b>.'),
 // Z kątem prostym
 measureQ('mk5-9a',fig(arm([110, 205], 0, 230) + arm([110, 205], 90, 190) + arm([110, 205], 35, 200) + arc('prosty', [110, 205], 0, 90) + arc('35°', [110, 205], 0, 35, '35°', 60) + arc('?', [110, 205], 35, 55, '?', 60), 'Kąt prosty podzielony półprostą na dwa kąty'),['55°','45°','65°','35°'],0,'Kwadracik oznacza kąt prosty — 90°. ? = 90° − 35° = <b>55°</b>.'),
 measureQ('mk5-9b',fig(arm([200, 195], 0, 180) + arm([200, 195], 180, 180) + arm([200, 195], 90, 170) + arm([200, 195], 130, 170) + arc('prosty', [200, 195], 0, 90) + arc('40°', [200, 195], 90, 40, '40°', 50) + arc('?', [200, 195], 130, 50, '?', 50), 'Prosta, półprosta prostopadła do niej i jeszcze jedna półprosta'),['40°','50°','90°','140°'],1,'Kąt półpełny ma 180°, a kąt prosty 90°. ? = 180° − 90° − 40° = <b>50°</b>.'),
 measureQ('mk5-9c',fig(arm([200, 125], 30, 105) + arm([200, 125], 120, 105) + arc('prosty', [200, 125], 30, 90) + arc('?', [200, 125], 120, 270, '?', 30), 'Dwa prostopadłe ramiona; zaznaczony kąt wklęsły'),['90°','180°','270°','300°'],2,'Ramiona tworzą kąt prosty — 90°. Łuk obejmuje resztę kąta pełnego: 360° − 90° = <b>270°</b>.'),
 measureQ('mk5-9d',fig([0, 90, 220].map((d) => arm([200, 120], d, 110)).join('') + arc('prosty', [200, 120], 0, 90) + arc('130°', [200, 120], 90, 130, '130°', 30) + arc('?', [200, 120], 220, 140, '?', 30), 'Trzy półproste wychodzące z jednego punktu'),['130°','90°','150°','140°'],3,'Kąty dookoła punktu tworzą razem kąt pełny — 360°. ? = 360° − 90° − 130° = <b>140°</b>.'),
 // Dwie proste przecinające się
 measureQ('mk5-10a',crossFig(38, 53, 142),['38°','52°','142°','152°'],2,'Kąt ? jest przyległy do kąta 38° — razem tworzą 180°. ? = 180° − 38° = <b>142°</b>.'),
 measureQ('mk5-10b',crossFig(38, 53, 322),['322°','142°','218°','342°'],0,'Łuk obejmuje cały kąt pełny poza kątem 38°: ? = 360° − 38° = <b>322°</b>.'),
 measureQ('mk5-10c',crossFig(125, 195, 125),['55°','125°','235°','65°'],1,'Kąt ? leży naprzeciwko kąta 125° — to kąty wierzchołkowe, więc są równe: <b>125°</b>.'),
 measureQ('mk5-10d',crossFig(72, 87, 180),['108°','252°','144°','180°'],3,'Łuk obejmuje kąt przyległy (180° − 72° = 108°) i kąt wierzchołkowy (72°): 108° + 72° = <b>180°</b>. Jego ramiona tworzą prostą.'),
 // Prawda czy fałsz
 truth('mk5-11a','Wskazówka minutowa w ciągu kwadransa obraca się o 90°.','Kąt o mierze 180° to kąt rozwarty.','PF','I: 15 · 6° = 90° — <b>prawda</b>. II: 180° to kąt półpełny, a kąt rozwarty ma mniej niż 180° — <b>fałsz</b>.'),
 truth('mk5-11b','Kąt o mierze 200° jest kątem wklęsłym.','Kąt przyległy do kąta ostrego jest rozwarty.','PP','I: 200° to więcej niż 180° — <b>prawda</b>. II: np. 180° − 60° = 120°; od 180° odejmujemy mniej niż 90°, więc zostaje więcej niż 90° — <b>prawda</b>.'),
 truth('mk5-11c','Wskazówka godzinowa w ciągu godziny obraca się o 60°.','Kąty wierzchołkowe mają równe miary.','FP','I: w godzinę wskazówka godzinowa obraca się o 360° : 12 = 30° — <b>fałsz</b>. II: kąty wierzchołkowe są równe — <b>prawda</b>.'),
 truth('mk5-11d','Dwa kąty ostre mogą być kątami przyległymi.','Kąt pełny ma 180°.','FF','I: kąty przyległe mają razem 180°, a dwa kąty ostre — mniej niż 90° + 90° = 180° — <b>fałsz</b>. II: kąt pełny ma 360° — <b>fałsz</b>.'),
 // Kąt między wskazówkami w stopniach
 clockDegQ('mk5-12a',2,0,['30°','60°','90°','120°'],1,'Między sąsiednimi liczbami na tarczy jest 360° : 12 = 30°. Od 12 do 2 są dwa takie odstępy: 2 · 30° = <b>60°</b>.'),
 clockDegQ('mk5-12b',4,0,['120°','100°','150°','140°'],0,'Od 12 do 4 są cztery odstępy po 30°: 4 · 30° = <b>120°</b>.'),
 clockDegQ('mk5-12c',3,30,['90°','105°','75°','60°'],2,'Wskazówka minutowa jest na 6, a godzinowa w połowie między 3 a 4. Od tego miejsca do 6 są dwa i pół odstępu: 2,5 · 30° = <b>75°</b>.'),
 clockDegQ('mk5-12d',9,30,['90°','75°','120°','105°'],3,'Wskazówka minutowa jest na 6, a godzinowa w połowie między 9 a 10. Od 6 do tego miejsca są trzy i pół odstępu: 3,5 · 30° = <b>105°</b>.'),
 // Trzy proste
 q('mk5-13a',`${THREE} Ile stopni ma kąt α?`,['50°','65°','130°','75°'],1,'Kąty 50°, α i β tworzą kąt półpełny, więc α + β = 180° − 50° = 130°. Są równe, więc α = 130° : 2 = <b>65°</b>.'),
 q('mk5-13b',`${THREE} Ile stopni ma kąt γ?`,['130°','65°','50°','40°'],2,'γ leży naprzeciwko kąta 50° — to kąty wierzchołkowe, więc γ = <b>50°</b>.'),
 q('mk5-13c',`${THREE} Ile wynosi suma α + δ?`,['115°','100°','180°','130°'],3,'α = (180° − 50°) : 2 = 65°. δ jest wierzchołkowy do α, więc też ma 65°. α + δ = <b>130°</b>.'),
 q('mk5-13d',`${THREE} Ile wynosi suma β + γ + δ?`,['180°','130°','115°','245°'],0,'β, γ i δ leżą obok siebie i tworzą kąt półpełny: <b>180°</b>. Rachunek: 65° + 50° + 65° = 180°.'),
 // Podział kąta na części
 q('mk5-14a','Kąty α i β są przyległe, a kąt α jest <b>dwa razy większy</b> od kąta β. Ile stopni ma kąt α?',['60°','90°','120°','135°'],2,'Razem mają 180°. β to jedna część, α — dwie takie części, razem 3 równe części: 180° : 3 = 60°. β = 60°, a α = 2 · 60° = <b>120°</b>.'),
 q('mk5-14b','Kąty α i β są przyległe, a kąt α jest <b>trzy razy większy</b> od kąta β. Ile stopni ma kąt β?',['45°','60°','135°','90°'],0,'Razem mają 180°. β to jedna część, α — trzy, razem 4 równe części: 180° : 4 = <b>45°</b>. α ma 135°.'),
 q('mk5-14c','Kąt prosty podzielono na dwa kąty. Jeden z nich jest <b>dwa razy większy</b> od drugiego. Ile stopni ma większy z nich?',['30°','60°','45°','70°'],1,'90° dzielimy na 3 równe części: 90° : 3 = 30°. Mniejszy kąt ma 30°, a większy 2 · 30° = <b>60°</b>.'),
 q('mk5-14d','Kąt pełny podzielono na trzy kąty: α, β i γ. Kąty α i β są równe, a γ = 100°. Ile stopni ma kąt α?',['100°','80°','260°','130°'],3,'Razem mają 360°. α + β = 360° − 100° = 260°, a skoro są równe, to α = 260° : 2 = <b>130°</b>.'),
];
