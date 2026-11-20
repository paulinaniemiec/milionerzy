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

// Klasa 5, dział „Figury geometryczne”: trójkąty — nazwy i rodzaje, suma kątów, warunek trójkąta (także w różnych
// jednostkach), kąty z rysunku, kąt przyległy i wierzchołkowy, trójkąty równoramienne, obwody i zadania tekstowe.
// Od łatwych do trudnych (`ordered`). Wierzchołki i podpisy boków mają współrzędne w data-*, test mierzy na nich boki i kąty.
const TRK = ['ostrokątny', 'prostokątny', 'rozwartokątny', 'taki trójkąt nie istnieje'];
const dirOf = (v, p) => Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180 / Math.PI;
// Trójkąt ABC o kątach A i B przy boku AB, obrócony o `rot` stopni i dopasowany do rysunku. `ext`: przedłużenia boków,
// np. {E: ['B', 'A']} — półprosta z B w kierunku od A. `arcs`: [wierzchołek, punkt, punkt, nazwa, podpis] — mniejszy kąt.
// `sides`: [punkt, punkt, podpis]. `solid`: przedłużenia rysowane linią ciągłą (proste przecinające się w wierzchołku).
function triangle({A, B, rot = 0, ext = {}, arcs = [], sides = [], solid = false, desc}) {
 const c = Math.sin(rad(B)) / Math.sin(rad(A + B)), m = {A: [0, 0], B: [1, 0], C: [c * Math.cos(rad(A)), c * Math.sin(rad(A))]};
 for (const [k, [from, away]] of Object.entries(ext)) { const [p, a] = [m[from], m[away]], d = Math.hypot(p[0] - a[0], p[1] - a[1]); const e = solid ? 0.36 : 0.42; m[k] = [p[0] + (p[0] - a[0]) / d * e, p[1] + (p[1] - a[1]) / d * e]; }
 const turn = ([x, y]) => [x * Math.cos(rad(rot)) - y * Math.sin(rad(rot)), x * Math.sin(rad(rot)) + y * Math.cos(rad(rot))];
 const all = Object.fromEntries(Object.entries(m).map(([k, p]) => [k, turn(p)])), xs = Object.values(all).map((p) => p[0]), ys = Object.values(all).map((p) => p[1]);
 const pad = 36, s = Math.min((W - 2 * pad) / (Math.max(...xs) - Math.min(...xs)), (H - 2 * pad) / (Math.max(...ys) - Math.min(...ys)));
 const ox = (W - s * (Math.max(...xs) + Math.min(...xs))) / 2, oy = (H + s * (Math.max(...ys) + Math.min(...ys))) / 2;
 const P = Object.fromEntries(Object.entries(all).map(([k, [x, y]]) => [k, [r1(ox + s * x), r1(oy - s * y)]]));
 const g = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
 let svg = Object.entries(ext).map(([k, [from]]) => `<path d="M${P[from][0]} ${P[from][1]}L${P[k][0]} ${P[k][1]}" stroke="#f3f5ff" stroke-width="2"${solid ? '' : ' stroke-dasharray="7 6"'}/>`).join('');
 svg += `<polygon data-tri="ABC" points="${[P.A, P.B, P.C].map((p) => p.join(',')).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>`;
 for (const [v, a, b, name, label] of arcs) {
  let from = dirOf(P[v], P[a]), span = ((dirOf(P[v], P[b]) - from) % 360 + 360) % 360;
  if (span > 180) { from = dirOf(P[v], P[b]); span = 360 - span; }
  span = Math.abs(span - 90) < 0.3 ? 90 : r1(span);
  svg += arc(name, P[v], r1(from), span, label, span < 45 ? 40 : 28);
 }
 for (const [a, b, label] of sides) {
  // Podpis na zewnątrz boku, prostopadle do niego; odsunięty o pół szerokości napisu, żeby nie nachodził na linię.
  const mid = [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2], L = Math.hypot(P[b][0] - P[a][0], P[b][1] - P[a][1]);
  let n = [-(P[b][1] - P[a][1]) / L, (P[b][0] - P[a][0]) / L];
  if (n[0] * (mid[0] - g[0]) + n[1] * (mid[1] - g[1]) < 0) n = [-n[0], -n[1]];
  const off = 8 + Math.abs(n[0]) * label.length * 4.4 + Math.abs(n[1]) * 9, l = [mid[0] + n[0] * off, mid[1] + n[1] * off];
  svg += `<text data-side="${P[a]};${P[b]}" data-len="${label}" x="${r1(l[0])}" y="${r1(l[1] + 5)}" text-anchor="middle" fill="#f3f5ff" font-family="Arial, sans-serif" font-size="15">${label}</text>`;
 }
 return fig(svg, desc);
}
const deg3 = (a, b, c) => [a, b, 180 - a - b];
const angleOf = (opp, s1, s2) => Math.acos((s1 * s1 + s2 * s2 - opp * opp) / (2 * s1 * s2)) * 180 / Math.PI;
// Trójkąt o bokach AB = c, BC = a, AC = b.
const bySides = (a, b, c) => ({A: angleOf(a, b, c), B: angleOf(b, a, c)});
const kindQ = (id, svg, answers, correct, explain) => q(id, `${svg}Jaki to trójkąt? Wybierz dwa określenia.`, answers, correct, explain);
const triQ = (id, svg, ask, answers, correct, explain) => q(id, `${svg}${ask}`, answers, correct, explain);
const SAME = 'Kąty oznaczone tą samą literą są równe.';
const truthT = (id, ctx, a, b, t, explain) => q(id, `${ctx} Oceń prawdziwość zdań.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP', 'PF', 'FP', 'FF'].indexOf(t), explain);

export const triangleQuestions5 = [
 // Nazwy i rodzaje trójkątów
 q('tr5-1a','Ile wynosi suma miar kątów <b>każdego</b> trójkąta?',['180°','90°','360°','zależy od trójkąta'],0,'Kąty każdego trójkąta mają razem <b>180°</b> — tyle, co kąt półpełny. 360° to suma kątów czworokąta.'),
 q('tr5-1b','Trójkąt, który ma <b>dwa boki równej długości</b>, to trójkąt:',['różnoboczny','równoramienny','prostokątny','rozwartokątny'],1,'Dwa równe boki to <b>ramiona</b>, a taki trójkąt to trójkąt <b>równoramienny</b>. Trzeci bok nazywamy podstawą.'),
 q('tr5-1c','Trójkąt, który ma <b>jeden kąt prosty</b>, to trójkąt:',['ostrokątny','rozwartokątny','prostokątny','równoboczny'],2,'Kąt prosty ma 90°. Trójkąt z kątem prostym to trójkąt <b>prostokątny</b>.'),
 q('tr5-1d','Jak nazywamy bok trójkąta prostokątnego, który leży <b>naprzeciwko kąta prostego</b>?',['ramię','podstawa','przyprostokątna','przeciwprostokątna'],3,'Boki tworzące kąt prosty to przyprostokątne, a bok naprzeciwko kąta prostego to <b>przeciwprostokątna</b> — najdłuższy bok tego trójkąta.'),
 // Rodzaj trójkąta po kątach
 q('tr5-2a','Kąty trójkąta mają <b>35°, 65° i 80°</b>. Jaki to trójkąt?',TRK,0,'35° + 65° + 80° = 180°, więc taki trójkąt istnieje. Wszystkie kąty są mniejsze od 90°, więc trójkąt jest <b>ostrokątny</b>.'),
 q('tr5-2b','Kąty trójkąta mają <b>27°, 63° i 90°</b>. Jaki to trójkąt?',TRK,1,'27° + 63° + 90° = 180°, więc taki trójkąt istnieje. Ma kąt prosty, więc jest <b>prostokątny</b>.'),
 q('tr5-2c','Kąty trójkąta mają <b>20°, 45° i 115°</b>. Jaki to trójkąt?',TRK,2,'20° + 45° + 115° = 180°, więc taki trójkąt istnieje. Kąt 115° jest rozwarty, więc trójkąt jest <b>rozwartokątny</b>.'),
 q('tr5-2d','Kąty trójkąta mają <b>60°, 70° i 90°</b>. Jaki to trójkąt?',TRK,3,'60° + 70° + 90° = 220°, a kąty trójkąta muszą mieć razem 180°. <b>Taki trójkąt nie istnieje.</b>'),
 // Jaki to trójkąt? Dwa określenia
 kindQ('tr5-3a',triangle({A: 90, B: 45, rot: 0, arcs: [['A', 'B', 'C', 'prosty']], sides: [['A', 'B', '4 cm'], ['A', 'C', '4 cm']], desc: 'Trójkąt z kątem prostym, boki przy kącie prostym mają po 4 cm'}),
  ['równoramienny i prostokątny','równoboczny i ostrokątny','różnoboczny i prostokątny','równoramienny i ostrokątny'],0,'Dwa boki mają po 4 cm — trójkąt jest <b>równoramienny</b>. Kwadracik oznacza kąt prosty — trójkąt jest <b>prostokątny</b>.'),
 kindQ('tr5-3b',triangle({A: 30, B: 30, arcs: [['C', 'A', 'B', '120°', '120°']], sides: [['A', 'C', '5 cm'], ['B', 'C', '5 cm']], desc: 'Trójkąt o dwóch bokach po 5 cm i kącie 120° między nimi'}),
  ['równoramienny i ostrokątny','równoramienny i rozwartokątny','różnoboczny i rozwartokątny','równoboczny i rozwartokątny'],1,'Dwa boki mają po 5 cm — trójkąt jest <b>równoramienny</b>. Kąt 120° jest rozwarty — trójkąt jest <b>rozwartokątny</b>.'),
 kindQ('tr5-3c',triangle({...bySides(3, 4, 5), rot: 0, arcs: [['C', 'A', 'B', 'prosty']], sides: [['B', 'C', '3 cm'], ['A', 'C', '4 cm'], ['A', 'B', '5 cm']], desc: 'Trójkąt z kątem prostym o bokach 3 cm, 4 cm i 5 cm'}),
  ['równoramienny i prostokątny','różnoboczny i ostrokątny','różnoboczny i prostokątny','różnoboczny i rozwartokątny'],2,'Każdy bok ma inną długość (3 cm, 4 cm, 5 cm) — trójkąt jest <b>różnoboczny</b>. Ma kąt prosty — jest <b>prostokątny</b>.'),
 kindQ('tr5-3d',triangle({A: 60, B: 60, rot: 8, sides: [['A', 'B', '6 cm'], ['B', 'C', '6 cm'], ['A', 'C', '6 cm']], desc: 'Trójkąt o trzech bokach po 6 cm'}),
  ['równoramienny i prostokątny','różnoboczny i ostrokątny','równoramienny i rozwartokątny','równoboczny i ostrokątny'],3,'Wszystkie boki mają po 6 cm — trójkąt jest <b>równoboczny</b>. Każdy jego kąt ma 180° : 3 = 60°, więc jest <b>ostrokątny</b>.'),
 // Warunek trójkąta
 q('tr5-4a','Z których odcinków <b>można</b> zbudować trójkąt?',['5 cm, 7 cm, 10 cm','3 cm, 4 cm, 8 cm','2 cm, 6 cm, 9 cm','4 cm, 5 cm, 9 cm'],0,'Dwa krótsze odcinki muszą razem być <b>dłuższe</b> od najdłuższego. 5 + 7 = 12 > 10 — <b>można</b>. W pozostałych: 3 + 4 = 7 < 8, 2 + 6 = 8 < 9, a 4 + 5 = 9 — tyle samo, co trzeci odcinek, więc odcinki położą się na jednej prostej.'),
 q('tr5-4b','Z których odcinków <b>można</b> zbudować trójkąt?',['6 m, 6 m, 13 m','8 cm, 9 cm, 16 cm','1 dm, 2 dm, 4 dm','10 km, 3 km, 6 km'],1,'Sprawdzamy, czy dwa krótsze odcinki są razem dłuższe od najdłuższego: 8 + 9 = 17 > 16 — <b>można</b>. Pozostałe: 6 + 6 = 12 < 13, 1 + 2 = 3 < 4, 3 + 6 = 9 < 10.'),
 q('tr5-4c','Z których odcinków <b>można</b> zbudować trójkąt?',['2,5 cm, 3,5 cm, 6 cm','1,2 m, 1,8 m, 3,1 m','4,5 km, 2,5 km, 3 km','0,5 dm, 1 dm, 2 dm'],2,'2,5 + 3 = 5,5 > 4,5 — <b>można</b>. Pozostałe: 2,5 + 3,5 = 6 (tyle, co trzeci bok), 1,2 + 1,8 = 3 < 3,1, 0,5 + 1 = 1,5 < 2.'),
 q('tr5-4d','Z których odcinków <b>nie można</b> zbudować trójkąta?',['7 cm, 7 cm, 7 cm','3 m, 4 m, 5 m','6 dm, 10 dm, 5 dm','12 cm, 5 cm, 6 cm'],3,'5 + 6 = 11, a to mniej niż 12 — krótsze odcinki „nie sięgną” do siebie, więc trójkąta <b>nie da się</b> zbudować. W pozostałych: 7 + 7 > 7, 3 + 4 > 5, 5 + 6 > 10.'),
 // Trzeci kąt — z treści
 q('tr5-5a','Dwa kąty trójkąta mają <b>47° i 68°</b>. Ile stopni ma trzeci kąt?',['65°','75°','115°','245°'],0,'Kąty trójkąta mają razem 180°. 47° + 68° = 115°, więc trzeci kąt ma 180° − 115° = <b>65°</b>.'),
 q('tr5-5b','Dwa kąty trójkąta mają <b>90° i 34°</b>. Ile stopni ma trzeci kąt?',['46°','56°','66°','146°'],1,'90° + 34° = 124°. Trzeci kąt: 180° − 124° = <b>56°</b>.'),
 q('tr5-5c','Dwa kąty trójkąta mają <b>25° i 38°</b>. Ile stopni ma trzeci kąt?',['63°','127°','117°','107°'],2,'25° + 38° = 63°. Trzeci kąt: 180° − 63° = <b>117°</b>. 63° to suma dwóch danych kątów, a nie trzeci kąt.'),
 q('tr5-5d','Dwa kąty trójkąta mają <b>112° i 29°</b>. Ile stopni ma trzeci kąt?',['49°','141°','29°','39°'],3,'112° + 29° = 141°. Trzeci kąt: 180° − 141° = <b>39°</b>.'),
 // Trzeci kąt — z rysunku
 triQ('tr5-6a',triangle({A: 58, B: 47, rot: 6, arcs: [['A', 'B', 'C', '58°', '58°'], ['B', 'A', 'C', '47°', '47°'], ['C', 'A', 'B', 'α', 'α']], desc: 'Trójkąt z kątami 58°, 47° i α'}),'Ile stopni ma kąt α?',['75°','85°','105°','65°'],0,'α = 180° − 58° − 47° = <b>75°</b>.'),
 triQ('tr5-6b',triangle({A: 32, B: 90, rot: -4, arcs: [['A', 'B', 'C', '32°', '32°'], ['B', 'A', 'C', 'prosty'], ['C', 'A', 'B', 'γ', 'γ']], desc: 'Trójkąt prostokątny z kątem 32° i kątem γ'}),'Ile stopni ma kąt γ?',['32°','58°','68°','148°'],1,'Kwadracik oznacza kąt prosty — 90°. γ = 180° − 90° − 32° = <b>58°</b>.'),
 triQ('tr5-6c',triangle({A: 28, B: 39, rot: 10, arcs: [['A', 'B', 'C', '28°', '28°'], ['B', 'A', 'C', '39°', '39°'], ['C', 'A', 'B', 'β', 'β']], desc: 'Trójkąt z kątami 28°, 39° i rozwartym kątem β'}),'Ile stopni ma kąt β?',['67°','103°','113°','123°'],2,'β = 180° − 28° − 39° = <b>113°</b>. Kąt jest rozwarty, więc musi mieć więcej niż 90°.'),
 triQ('tr5-6d',triangle({A: 64, B: 64, rot: -8, arcs: [['A', 'B', 'C', '64°', '64°'], ['B', 'A', 'C', '64°', '64°'], ['C', 'A', 'B', 'δ', 'δ']], desc: 'Trójkąt z dwoma kątami po 64° i kątem δ'}),'Ile stopni ma kąt δ?',['64°','116°','62°','52°'],3,'δ = 180° − 64° − 64° = <b>52°</b>.'),
 // Obwody
 q('tr5-7a','Oblicz obwód trójkąta równobocznego o boku <b>7 cm</b>.',['21 cm','14 cm','49 cm','28 cm'],0,'Trójkąt równoboczny ma trzy równe boki: 3 · 7 cm = <b>21 cm</b>.'),
 q('tr5-7b','Obwód trójkąta równobocznego wynosi <b>36 cm</b>. Ile ma jego bok?',['18 cm','12 cm','9 cm','108 cm'],1,'Obwód to trzy równe boki, więc bok = 36 cm : 3 = <b>12 cm</b>.'),
 q('tr5-7c','Ramię trójkąta równoramiennego ma <b>9 cm</b>, a podstawa <b>5 cm</b>. Oblicz obwód.',['14 cm','19 cm','23 cm','27 cm'],2,'Trójkąt ma dwa ramiona i podstawę: 9 cm + 9 cm + 5 cm = <b>23 cm</b>.'),
 q('tr5-7d','Podstawa trójkąta równoramiennego ma <b>8 cm</b>, a jego obwód wynosi <b>22 cm</b>. Ile ma ramię?',['14 cm','8 cm','11 cm','7 cm'],3,'Na dwa ramiona zostaje 22 cm − 8 cm = 14 cm. Jedno ramię: 14 cm : 2 = <b>7 cm</b>.'),
 // Czy taki trójkąt istnieje?
 q('tr5-8a','Który trójkąt <b>nie istnieje</b>?',['prostokątny i równoboczny','prostokątny i równoramienny','rozwartokątny i równoramienny','ostrokątny i różnoboczny'],0,'Trójkąt równoboczny ma wszystkie kąty po 60°, więc nie może mieć kąta prostego. Trójkąt <b>prostokątny i równoboczny</b> nie istnieje.'),
 q('tr5-8b','Który trójkąt <b>istnieje</b>?',['rozwartokątny i prostokątny','równoramienny i rozwartokątny','rozwartokątny i równoboczny','o dwóch kątach prostych'],1,'Np. trójkąt o kątach 30°, 30° i 120° jest <b>równoramienny i rozwartokątny</b>. Kąt rozwarty i kąt prosty (albo dwa kąty proste) dałyby razem 180° lub więcej, a równoboczny ma kąty po 60°.'),
 q('tr5-8c','Który trójkąt <b>nie istnieje</b>?',['ostrokątny i równoramienny','prostokątny i różnoboczny','o dwóch kątach rozwartych','równoboczny i ostrokątny'],2,'Dwa kąty rozwarte mają razem więcej niż 180°, a wszystkie trzy kąty trójkąta mają razem dokładnie 180°. Trójkąt <b>o dwóch kątach rozwartych</b> nie istnieje.'),
 q('tr5-8d','Które zdanie jest <b>prawdziwe</b>?',['Każdy trójkąt równoramienny jest równoboczny.','Trójkąt prostokątny może mieć kąt rozwarty.','Trójkąt może mieć dwa kąty proste.','Każdy trójkąt równoboczny jest równoramienny.'],3,'Trójkąt równoboczny ma trzy równe boki, więc ma też dwa równe boki — <b>każdy trójkąt równoboczny jest równoramienny</b>. Odwrotnie nie: trójkąt 5 cm, 5 cm, 3 cm jest równoramienny, ale nie równoboczny.'),
 // Prawda czy fałsz
 truthT('tr5-9a','Jeden z kątów trójkąta ma 45°, a drugi 70°.','Ten trójkąt jest ostrokątny.','Ten trójkąt jest równoramienny.','PF','Trzeci kąt: 180° − 45° − 70° = 65°. I: kąty 45°, 70°, 65° są ostre — <b>prawda</b>. II: żadne dwa kąty nie są równe, więc trójkąt nie jest równoramienny — <b>fałsz</b>.'),
 truthT('tr5-9b','Jeden z kątów trójkąta ma 40°, a drugi jest o 30° większy.','Ten trójkąt jest ostrokątny.','Ten trójkąt jest równoramienny.','PP','Drugi kąt: 40° + 30° = 70°, trzeci: 180° − 40° − 70° = 70°. I: wszystkie kąty ostre — <b>prawda</b>. II: dwa kąty po 70° — trójkąt jest równoramienny — <b>prawda</b>.'),
 truthT('tr5-9c','Jeden z kątów trójkąta ma 25°, a drugi 65°.','Ten trójkąt jest rozwartokątny.','Ten trójkąt jest prostokątny.','FP','Trzeci kąt: 180° − 25° − 65° = 90°. I: nie ma kąta rozwartego — <b>fałsz</b>. II: ma kąt prosty — <b>prawda</b>.'),
 truthT('tr5-9d','Jeden z kątów trójkąta ma 30°, a drugi też 30°.','Ten trójkąt jest ostrokątny.','Ten trójkąt jest równoboczny.','FF','Trzeci kąt: 180° − 30° − 30° = 120° — rozwarty. I: <b>fałsz</b>. II: trójkąt równoboczny ma kąty po 60° — <b>fałsz</b> (ten jest równoramienny).'),
 // Trójkąt równoramienny z rysunku
 triQ('tr5-10a',triangle({A: 63, B: 63, rot: 18, arcs: [['C', 'A', 'B', '54°', '54°'], ['A', 'B', 'C', 'α', 'α']], sides: [['A', 'C', '4'], ['B', 'C', '4']], desc: 'Trójkąt o dwóch bokach długości 4, kąt między nimi 54°, kąt α przy trzecim boku'}),'Ile stopni ma kąt α?',['63°','54°','126°','72°'],0,'Dwa boki mają długość 4, więc trójkąt jest równoramienny, a kąty przy podstawie są równe. Na nie zostaje 180° − 54° = 126°, czyli α = 126° : 2 = <b>63°</b>.'),
 triQ('tr5-10b',triangle({A: 45, B: 45, rot: -12, arcs: [['C', 'A', 'B', 'prosty'], ['B', 'A', 'C', 'α', 'α']], sides: [['A', 'C', '5'], ['B', 'C', '5']], desc: 'Trójkąt prostokątny o bokach przy kącie prostym długości 5 i 5; kąt α'}),'Ile stopni ma kąt α?',['90°','45°','60°','30°'],1,'Trójkąt jest prostokątny i równoramienny, więc dwa pozostałe kąty są równe: (180° − 90°) : 2 = <b>45°</b>.'),
 triQ('tr5-10c',triangle({A: 70, B: 70, rot: -15, arcs: [['A', 'B', 'C', '70°', '70°'], ['C', 'A', 'B', 'α', 'α']], sides: [['A', 'C', '6'], ['B', 'C', '6']], desc: 'Trójkąt o dwóch bokach długości 6; kąt 70° przy trzecim boku; kąt α między bokami długości 6'}),'Ile stopni ma kąt α?',['70°','110°','40°','55°'],2,'Trójkąt jest równoramienny, więc oba kąty przy podstawie mają 70°. α = 180° − 70° − 70° = <b>40°</b>.'),
 triQ('tr5-10d',triangle({A: 40, B: 40, rot: 10, arcs: [['C', 'A', 'B', '100°', '100°'], ['A', 'B', 'C', 'α', 'α']], sides: [['A', 'C', '3'], ['B', 'C', '3']], desc: 'Trójkąt o dwóch bokach długości 3, kąt między nimi 100°, kąt α przy trzecim boku'}),'Ile stopni ma kąt α?',['80°','100°','50°','40°'],3,'Kąty przy podstawie trójkąta równoramiennego są równe: (180° − 100°) : 2 = 80° : 2 = <b>40°</b>.'),
 // Kąt przyległy przy przedłużonym boku
 triQ('tr5-11a',triangle({A: 70, B: 50, ext: {E: ['B', 'A']}, arcs: [['B', 'E', 'C', '130°', '130°'], ['B', 'A', 'C', 'β', 'β']], desc: 'Trójkąt z przedłużonym bokiem; kąt zewnętrzny 130° i kąt β wewnątrz trójkąta przy tym samym wierzchołku'}),'Ile stopni ma kąt β?',['50°','130°','40°','60°'],0,'Kąt β i kąt 130° są przyległe — razem mają 180°. β = 180° − 130° = <b>50°</b>.'),
 triQ('tr5-11b',triangle({A: 48, B: 65, ext: {E: ['B', 'A']}, arcs: [['A', 'B', 'C', '48°', '48°'], ['B', 'E', 'C', '115°', '115°'], ['C', 'A', 'B', 'γ', 'γ']], desc: 'Trójkąt z przedłużonym bokiem; kąt 48°, kąt zewnętrzny 115° i kąt γ'}),'Ile stopni ma kąt γ?',['65°','67°','57°','77°'],1,'Kąt przyległy do kąta 115° ma 180° − 115° = 65°. Wtedy γ = 180° − 48° − 65° = <b>67°</b>.'),
 triQ('tr5-11c',triangle({A: 35, B: 55, ext: {E: ['B', 'A']}, arcs: [['C', 'A', 'B', 'prosty'], ['B', 'E', 'C', '125°', '125°'], ['A', 'B', 'C', 'α', 'α']], desc: 'Trójkąt prostokątny z przedłużonym bokiem; kąt zewnętrzny 125° i kąt α'}),'Ile stopni ma kąt α?',['55°','125°','35°','45°'],2,'Kąt przyległy do kąta 125° ma 180° − 125° = 55°. Trzeci kąt jest prosty, więc α = 180° − 90° − 55° = <b>35°</b>.'),
 triQ('tr5-11d',triangle({A: 50, B: 80, rot: 5, ext: {E: ['B', 'A']}, arcs: [['A', 'B', 'C', 'α', 'α'], ['C', 'A', 'B', 'α', 'α'], ['B', 'E', 'C', '100°', '100°']], desc: 'Trójkąt z przedłużonym bokiem; kąt zewnętrzny 100° i dwa równe kąty α'}),`${SAME} Ile stopni ma kąt α?`,['40°','80°','100°','50°'],3,'Kąt przyległy do kąta 100° ma 80°. Na dwa kąty α zostaje 180° − 80° = 100°, więc α = 100° : 2 = <b>50°</b>.'),
 // Trzeci bok, różne jednostki
 q('tr5-12a','Dwa boki trójkąta mają <b>7 cm i 12 cm</b>. Jaką długość może mieć trzeci bok?',['15 cm','5 cm','19 cm','4 cm'],0,'Trzeci bok musi być dłuższy od różnicy (12 − 7 = 5 cm) i krótszy od sumy (12 + 7 = 19 cm) dwóch pozostałych. Pasuje tylko <b>15 cm</b>.'),
 q('tr5-12b','Dwa boki trójkąta mają <b>20 cm i 8 cm</b>. Jaką długość może mieć trzeci bok?',['12 cm','25 cm','28 cm','30 cm'],1,'Trzeci bok musi być dłuższy niż 20 − 8 = 12 cm i krótszy niż 20 + 8 = 28 cm. Pasuje tylko <b>25 cm</b>; przy 12 cm i 28 cm odcinki położyłyby się na jednej prostej.'),
 q('tr5-12c','Z których odcinków <b>można</b> zbudować trójkąt?',['1 m, 40 cm, 5 dm','2 m, 90 cm, 11 dm','3 m, 150 cm, 20 dm','1 km, 300 m, 600 m'],2,'Najpierw zamieniamy na te same jednostki. 3 m = 300 cm, 20 dm = 200 cm, a 150 + 200 = 350 > 300 — <b>można</b>. Pozostałe: 40 + 50 = 90 < 100 cm, 90 + 110 = 200 cm = 2 m, 300 + 600 = 900 < 1000 m.'),
 q('tr5-12d','Podstawa trójkąta równoramiennego ma <b>12 cm</b>. Jaką długość może mieć jego ramię?',['3 cm','5 cm','6 cm','7 cm'],3,'Dwa ramiona muszą być razem dłuższe od podstawy: 2 · ramię > 12 cm, czyli ramię > 6 cm. Pasuje tylko <b>7 cm</b> (7 + 7 = 14 > 12).'),
 // Obwody — zadania tekstowe
 q('tr5-13a','Ramię trójkąta równoramiennego ma <b>9 cm</b> i jest o <b>3 cm dłuższe</b> od podstawy. Oblicz obwód.',['24 cm','21 cm','30 cm','27 cm'],0,'Podstawa jest krótsza od ramienia o 3 cm: 9 − 3 = 6 cm. Obwód: 9 + 9 + 6 = <b>24 cm</b>.'),
 q('tr5-13b','Podstawa trójkąta równoramiennego ma <b>10 cm</b> i jest o <b>4 cm dłuższa</b> od każdego z ramion. Oblicz obwód.',['38 cm','22 cm','30 cm','16 cm'],1,'Ramię jest krótsze od podstawy o 4 cm: 10 − 4 = 6 cm. Obwód: 10 + 6 + 6 = <b>22 cm</b>.'),
 q('tr5-13c','Obwód trójkąta równoramiennego wynosi <b>30 cm</b>, a ramię ma <b>11 cm</b>. Ile ma podstawa?',['19 cm','9,5 cm','8 cm','10 cm'],2,'Dwa ramiona mają razem 2 · 11 = 22 cm. Podstawa: 30 − 22 = <b>8 cm</b>.'),
 q('tr5-13d','Trójkąt równoboczny o boku <b>8 cm</b> ma taki sam obwód jak trójkąt równoramienny o podstawie <b>6 cm</b>. Ile ma ramię trójkąta równoramiennego?',['8 cm','6 cm','18 cm','9 cm'],3,'Obwód trójkąta równobocznego: 3 · 8 = 24 cm. Na dwa ramiona zostaje 24 − 6 = 18 cm, więc ramię ma 18 : 2 = <b>9 cm</b>.'),
 // Kąt wierzchołkowy przy wierzchołku trójkąta
 triQ('tr5-14a',triangle({A: 62, B: 70, rot: -80, ext: {E: ['C', 'A'], F: ['C', 'B']}, solid: true, arcs: [['A', 'B', 'C', '62°', '62°'], ['C', 'E', 'F', '48°', '48°'], ['B', 'A', 'C', 'β', 'β']], desc: 'Dwie proste przecinają się w wierzchołku trójkąta; kąt 48° po drugiej stronie wierzchołka, kąt 62° i kąt β'}),'Ile stopni ma kąt β?',['70°','80°','60°','132°'],0,'Kąt 48° i kąt trójkąta przy górnym wierzchołku są <b>wierzchołkowe</b>, więc równe. β = 180° − 62° − 48° = <b>70°</b>.'),
 triQ('tr5-14b',triangle({A: 70, B: 70, rot: 95, ext: {E: ['C', 'A'], F: ['C', 'B']}, solid: true, arcs: [['A', 'B', 'C', 'α', 'α'], ['B', 'A', 'C', 'α', 'α'], ['C', 'E', 'F', '40°', '40°']], desc: 'Dwie proste przecinają się w wierzchołku trójkąta; kąt 40° po drugiej stronie wierzchołka i dwa równe kąty α'}),`${SAME} Ile stopni ma kąt α?`,['40°','70°','140°','35°'],1,'Kąt trójkąta przy górnym wierzchołku jest wierzchołkowy do kąta 40°, więc też ma 40°. Na dwa kąty α zostaje 180° − 40° = 140°, czyli α = <b>70°</b>.'),
 triQ('tr5-14c',triangle({A: 90, B: 55, rot: -100, ext: {E: ['C', 'A'], F: ['C', 'B']}, solid: true, arcs: [['A', 'B', 'C', 'prosty'], ['C', 'E', 'F', '35°', '35°'], ['B', 'A', 'C', 'δ', 'δ']], desc: 'Dwie proste przecinają się w wierzchołku trójkąta prostokątnego; kąt 35° po drugiej stronie wierzchołka i kąt δ'}),'Ile stopni ma kąt δ?',['35°','145°','55°','45°'],2,'Kąt trójkąta przy wierzchołku, w którym przecinają się proste, jest wierzchołkowy do kąta 35°. δ = 180° − 90° − 35° = <b>55°</b>.'),
 triQ('tr5-14d',triangle({A: 58, B: 48, rot: 75, ext: {E: ['C', 'A'], F: ['C', 'B']}, solid: true, arcs: [['A', 'B', 'C', '58°', '58°'], ['C', 'E', 'F', '74°', '74°'], ['B', 'A', 'C', 'γ', 'γ']], desc: 'Dwie proste przecinają się w wierzchołku trójkąta; kąt 74° po drugiej stronie wierzchołka, kąt 58° i kąt γ'}),'Ile stopni ma kąt γ?',['58°','74°','122°','48°'],3,'Kąt trójkąta przy górnym wierzchołku jest wierzchołkowy do kąta 74°, więc ma 74°. γ = 180° − 58° − 74° = <b>48°</b>.'),
 // Zadania z kilkoma krokami
 q('tr5-15a','Jeden z kątów trójkąta ma <b>35°</b>, a drugi jest <b>dwa razy większy</b>. Ile stopni ma trzeci kąt?',['75°','70°','110°','105°'],0,'Drugi kąt: 2 · 35° = 70°. Trzeci: 180° − 35° − 70° = <b>75°</b>.'),
 q('tr5-15b','W trójkącie prostokątnym jeden kąt ostry jest <b>dwa razy większy</b> od drugiego. Ile stopni ma <b>mniejszy</b> z nich?',['45°','30°','60°','90°'],1,'Kąty ostre mają razem 180° − 90° = 90°. To 3 równe części (mniejszy kąt — jedna, większy — dwie): 90° : 3 = <b>30°</b>. Większy ma 60°.'),
 q('tr5-15c','W trójkącie równoramiennym kąt między ramionami jest <b>3 razy większy</b> od każdego z kątów przy podstawie. Ile stopni ma kąt między ramionami?',['36°','72°','108°','135°'],2,'Kąty przy podstawie to po jednej części, kąt między ramionami — 3 części. Razem 5 równych części: 180° : 5 = 36°. Kąt między ramionami: 3 · 36° = <b>108°</b>.'),
 q('tr5-15d','Jeden bok trójkąta jest o <b>3 cm krótszy</b> od drugiego i o <b>4 cm krótszy</b> od trzeciego. Obwód wynosi <b>22 cm</b>. Ile ma <b>najdłuższy</b> bok?',['5 cm','8 cm','7 cm','9 cm'],3,'Gdyby dwa dłuższe boki skrócić o 3 cm i 4 cm, zostałyby trzy boki równe najkrótszemu: 22 − 3 − 4 = 15 cm, 15 : 3 = 5 cm. Boki: 5, 8 i 9 cm. Najdłuższy ma <b>9 cm</b>.'),
];

// Klasa 5, dział „Figury geometryczne”: trapezy oraz równoległoboki i romby (z wysokością). Od łatwych do trudnych (`ordered`).
// Czworokąt podajemy w układzie z osią y w górę (pierwsze cztery punkty to wierzchołki po kolei); `quad` obraca go o `rot`
// i dopasowuje do rysunku. Wierzchołki, łuki, podpisy, wysokości i odcinki mają współrzędne w data-*, test mierzy na nich kąty i długości.
// `ext`: {E: [z, od, długość]} — przedłużenie boku linią przerywaną z punktu `z` w kierunku od punktu `od`.
// `arcs`: [wierzchołek, punkt, punkt, nazwa, podpis]; `sides`: [punkt, punkt, podpis]; `heights`: [wierzchołek, punkt, punkt, podpis, nazwa spodka]
// — wysokość na prostą przez dwa punkty; `segs`: [punkt, punkt, nazwa] — odcinki podpisane literą; `cuts`: [punkt, punkt, rodzaj] — linie podziału.
function quad({P, rot = 0, ext = {}, arcs = [], sides = [], heights = [], segs = [], cuts = [], names = true, desc}) {
 const V = Object.keys(P).slice(0, 4), m = Object.fromEntries(Object.entries(P).map(([k, p]) => [k, [...p]]));
 for (const [k, [from, away, e]] of Object.entries(ext)) { const [p, a] = [m[from], m[away]], d = Math.hypot(p[0] - a[0], p[1] - a[1]); m[k] = [p[0] + (p[0] - a[0]) / d * e, p[1] + (p[1] - a[1]) / d * e]; }
 const feet = heights.map(([v, a, b, , name], i) => {
  const [ax, ay] = m[a], dx = m[b][0] - ax, dy = m[b][1] - ay, t = ((m[v][0] - ax) * dx + (m[v][1] - ay) * dy) / (dx * dx + dy * dy);
  const k = name ?? `h${i}`; m[k] = [ax + t * dx, ay + t * dy]; return [k, t];
 });
 const turn = ([x, y]) => [x * Math.cos(rad(rot)) - y * Math.sin(rad(rot)), x * Math.sin(rad(rot)) + y * Math.cos(rad(rot))];
 const all = Object.fromEntries(Object.entries(m).map(([k, p]) => [k, turn(p)])), xs = Object.values(all).map((p) => p[0]), ys = Object.values(all).map((p) => p[1]);
 const pad = 36, s = Math.min((W - 2 * pad) / (Math.max(...xs) - Math.min(...xs)), (H - 2 * pad) / (Math.max(...ys) - Math.min(...ys)));
 const ox = (W - s * (Math.max(...xs) + Math.min(...xs))) / 2, oy = (H + s * (Math.max(...ys) + Math.min(...ys))) / 2;
 const S = Object.fromEntries(Object.entries(all).map(([k, [x, y]]) => [k, [r1(ox + s * x), r1(oy - s * y)]]));
 const g = [0, 1].map((i) => V.reduce((sum, k) => sum + S[k][i], 0) / 4);
 const dash = (a, b, extra = '') => `<path${extra} d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="#f3f5ff" stroke-width="2" stroke-dasharray="7 6"/>`;
 let svg = Object.entries(ext).map(([k, [from]]) => dash(S[from], S[k])).join('');
 // Spodek wysokości poza bokiem: dorysowujemy przedłużenie boku.
 heights.forEach(([, a, b], i) => { const [k, t] = feet[i]; if (t < -1e-9) svg += dash(S[a], S[k]); if (t > 1 + 1e-9) svg += dash(S[b], S[k]); });
 svg += `<polygon data-quad="${V.join('')}" points="${V.map((k) => S[k].join(',')).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>`;
 svg += cuts.map(([a, b, kind]) => `<line data-cut="${kind}" x1="${S[a][0]}" y1="${S[a][1]}" x2="${S[b][0]}" y2="${S[b][1]}" stroke="#f3f5ff" stroke-width="2.5"/>`).join('');
 const label = (a, b, text, attr = '') => {
  // Podpis prostopadle do odcinka, po stronie dalszej od środka czworokąta, odsunięty o pół szerokości napisu.
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  let n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
  if (n[0] * (mid[0] - g[0]) + n[1] * (mid[1] - g[1]) < 0 || (Math.abs(n[0] * (mid[0] - g[0]) + n[1] * (mid[1] - g[1])) < 3 && n[0] < 0)) n = [-n[0], -n[1]];
  const off = 8 + Math.abs(n[0]) * text.length * 4.4 + Math.abs(n[1]) * 9, l = [mid[0] + n[0] * off, mid[1] + n[1] * off];
  return `<text${attr} data-side="${a};${b}" data-len="${text}" x="${r1(l[0])}" y="${r1(l[1] + 5)}" text-anchor="middle" fill="#f3f5ff" font-family="Arial, sans-serif" font-size="15">${text}</text>`;
 };
 // Odcinek podpisany literą w punkcie `t` odcinka, z boku linii (strona `side`: 1 albo −1).
 svg += segs.map(([a, b, name, t = 0.5, side = 1]) => {
  const p = [S[a][0] + (S[b][0] - S[a][0]) * t, S[a][1] + (S[b][1] - S[a][1]) * t], L = Math.hypot(S[b][0] - S[a][0], S[b][1] - S[a][1]), n = [-(S[b][1] - S[a][1]) / L * side, (S[b][0] - S[a][0]) / L * side];
  return `<line data-seg="${name}" x1="${S[a][0]}" y1="${S[a][1]}" x2="${S[b][0]}" y2="${S[b][1]}" stroke="#f6c85c" stroke-width="2.5"/>` + txt(p[0] + n[0] * 13, p[1] + n[1] * 13 + 6, name);
 }).join('');
 heights.forEach(([v, a, b, text], i) => {
  const F = S[feet[i][0]], base = Math.hypot(S[a][0] - F[0], S[a][1] - F[1]) > Math.hypot(S[b][0] - F[0], S[b][1] - F[1]) ? S[a] : S[b];
  const from = dirOf(F, base), span = ((dirOf(F, S[v]) - from) % 360 + 360) % 360;
  svg += dash(S[v], F, ` data-h="${S[v]};${F}"`) + arc('prosty', F, r1(span < 180 ? from : dirOf(F, S[v])), 90);
  if (text) svg += label(S[v], F, text, ' data-height="1"');
 });
 for (const [v, a, b, name, text] of arcs) {
  let from = dirOf(S[v], S[a]), span = ((dirOf(S[v], S[b]) - from) % 360 + 360) % 360;
  if (span > 180) { from = dirOf(S[v], S[b]); span = 360 - span; }
  span = Math.abs(span - 90) < 0.3 ? 90 : r1(span);
  svg += arc(name, S[v], r1(from), span, text ?? (name === 'prosty' ? '' : name), span < 45 ? 40 : 28);
 }
 svg += sides.map(([a, b, text]) => label(S[a], S[b], text)).join('');
 // Podpis wierzchołka na zewnątrz czworokąta; gdy z wierzchołka wychodzi przedłużenie boku — prostopadle do niego, żeby nie leżał na linii.
 if (names) svg += V.map((k) => {
  let u = [S[k][0] - g[0], S[k][1] - g[1]];
  const e = Object.entries(ext).find(([, [from]]) => from === k);
  if (e) { const d = [S[e[0]][0] - S[k][0], S[e[0]][1] - S[k][1]], n = [-d[1], d[0]]; u = n[0] * u[0] + n[1] * u[1] < 0 ? [-n[0], -n[1]] : n; }
  const d = Math.hypot(...u); return txt(S[k][0] + u[0] / d * 17, S[k][1] + u[1] / d * 17 + 6, k);
 }).join('');
 return fig(svg, desc);
}
// Trapez ABCD: podstawa AB długości L, kąty A i B przy niej, wysokość h (CD ∥ AB). Równoległobok ABCD: bok AB = L, AD = s, kąt A.
const trap = (L, A, B, h) => ({A: [0, 0], B: [L, 0], C: [L - h / Math.tan(rad(B)), h], D: [h / Math.tan(rad(A)), h]});
const para = (L, A, s) => ({A: [0, 0], B: [L, 0], C: [L + s * Math.cos(rad(A)), s * Math.sin(rad(A))], D: [s * Math.cos(rad(A)), s * Math.sin(rad(A))]});
const rename = (P, s) => Object.fromEntries(Object.values(P).map((p, i) => [s[i], p]));
const at4 = (P, a, b, t) => [P[a][0] + (P[b][0] - P[a][0]) * t, P[a][1] + (P[b][1] - P[a][1]) * t];
// Cztery czworokąty obok siebie, podpisane I–IV (współrzędne ekranowe w kolumnie szerokości 100).
const ROM = ['I', 'II', 'III', 'IV'];
const SHAPES = {T1: [[12, 190], [88, 190], [68, 70], [30, 70]], T2: [[12, 175], [88, 140], [70, 60], [32, 77.5]], T3: [[20, 190], [20, 40], [80, 80], [80, 160]], T4: [[15, 190], [85, 190], [85, 60], [15, 110]],
 N1: [[15, 185], [85, 165], [75, 50], [35, 95]], N2: [[20, 195], [85, 110], [60, 35], [15, 60]], N3: [[10, 160], [90, 195], [80, 45], [35, 80]]};
const fourShapes = (keys) => fig(keys.map((k, i) => `<polygon data-shape="${ROM[i]}" points="${SHAPES[k].map(([x, y]) => `${x + i * 100},${y - 8}`).join(' ')}" fill="#263051" stroke="#f3f5ff" stroke-width="2.5"/>` + txt(50 + i * 100, 222, ROM[i])).join(''), 'Cztery czworokąty oznaczone I, II, III i IV');
// Kratka: punkty podajemy jako [kolumna, wiersz] liczone od lewego dolnego rogu.
const CELL = 26, GC = 13, GR = 7, GX = (W - GC * CELL) / 2, GY = (H - GR * CELL) / 2;
const gp = ([c, r]) => [GX + c * CELL, GY + (GR - r) * CELL];
const kratka = Array.from({length: GC + 1}, (_, c) => `<path d="M${GX + c * CELL} ${GY}V${GY + GR * CELL}" stroke="#2c3a66"/>`).join('') + Array.from({length: GR + 1}, (_, r) => `<path d="M${GX} ${GY + r * CELL}H${GX + GC * CELL}" stroke="#2c3a66"/>`).join('');
function gridPara(pts, desc) {
 const names = Object.keys(pts), S = names.map((k) => gp(pts[k])), g = [0, 1].map((i) => S.reduce((sum, p) => sum + p[i], 0) / 4);
 return fig(kratka + `<polygon data-gquad="${names.join('')}" data-g="${names.map((k) => pts[k].join(',')).join(' ')}" points="${S.map((p) => p.join(',')).join(' ')}" fill="#263051" fill-opacity="0.7" stroke="#f3f5ff" stroke-width="2.5"/>`
  + names.map((k, i) => { const d = Math.hypot(S[i][0] - g[0], S[i][1] - g[1]); return txt(S[i][0] + (S[i][0] - g[0]) / d * 15, S[i][1] + (S[i][1] - g[1]) / d * 15 + 6, k); }).join(''), desc);
}
// Trzy wierzchołki równoległoboku (boki AB i BC) i cztery punkty do wyboru, gdzie może leżeć D.
function gridFourth({A, B, C}, cands) {
 const dot = (n, p, color, attr) => { const [x, y] = gp(p); return `<circle ${attr}="${n}" data-g="${p}" cx="${x}" cy="${y}" r="4.5" fill="${color}"/>`; };
 const [a, b, c] = [A, B, C].map(gp);
 return fig(kratka + `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${c[0]} ${c[1]}" fill="none" stroke="#f3f5ff" stroke-width="2.5"/>` + Object.entries({A, B, C}).map(([n, p]) => dot(n, p, '#f6c85c', 'data-gp') + txt(gp(p)[0] - 12, gp(p)[1] - 8, n)).join('')
  + cands.map((p, i) => dot(i + 1, p, '#63d6e8', 'data-cand') + txt(gp(p)[0], gp(p)[1] - 9, String(i + 1), '#63d6e8')).join(''), 'Kratka z punktami A, B, C połączonymi odcinkami AB i BC oraz punktami 1, 2, 3, 4');
}
const quadQ = (id, svg, ask, answers, correct, explain) => q(id, `${svg}${ask}`, answers, correct, explain);
const KIND4 = ['trapez równoramienny', 'trapez prostokątny', 'trapez, ale ani równoramienny, ani prostokątny', 'to nie jest trapez'];
const LEG = 'Kąty przy tym samym ramieniu trapezu mają razem <b>180°</b>';
const PAR = 'W równoległoboku kąty przeciwległe są równe, a kąty przy tym samym boku mają razem <b>180°</b>';
const ISO = (base) => `Trapez ABCD jest równoramienny (podstawy ${base}).`;

// Trapez z kątami 68° i 74°; trapezy równoramienne; przedłużona górna podstawa; trapez z liniami podziału.
const t5a = trap(9, 68, 74, 4), t5c = trap(9, 55, 80, 4), t5d = trap(8, 72, 48, 3.5);
const t11a = trap(12, 34, 38, 2.5), t11c = trap(11, 50, 65, 3.5);
const T14 = {A: [0, 0], B: [10, 0], C: [7.5, 4], D: [2, 4]};
const hcut = (n) => Object.fromEntries(Array.from({length: n}, (_, i) => { const t = (i + 1) / (n + 1); return [[`L${i}`, at4(T14, 'A', 'D', t)], [`R${i}`, at4(T14, 'B', 'C', t)]]; }).flat());

export const trapezoidQuestions5 = [
 // Pojęcia
 q('tz5-1a','Trapez to czworokąt, który ma:',['co najmniej jedną parę boków równoległych','wszystkie boki równej długości','cztery kąty proste','dokładnie dwa kąty proste'],0,'<b>Trapez</b> to czworokąt, który ma <b>co najmniej jedną parę boków równoległych</b>. Boki równoległe to podstawy trapezu, a dwa pozostałe — ramiona.'),
 q('tz5-1b','Jak nazywamy <b>boki równoległe</b> trapezu?',['ramiona','podstawy','przekątne','wysokości'],1,'Boki równoległe trapezu to jego <b>podstawy</b> (dłuższa i krótsza). Pozostałe dwa boki to <b>ramiona</b>.'),
 q('tz5-1c','<b>Wysokość</b> trapezu to odcinek, który:',['łączy przeciwległe wierzchołki','jest dłuższą podstawą','jest prostopadły do podstaw i łączy proste, na których one leżą','łączy środki ramion'],2,'Wysokość trapezu jest <b>prostopadła do podstaw</b> — to odległość między prostymi, na których leżą podstawy. Odcinek łączący przeciwległe wierzchołki to przekątna.'),
 q('tz5-1d','Trapez, w którym jedno ramię jest <b>prostopadłe do podstaw</b>, to trapez:',['równoramienny','równoboczny','rozwartokątny','prostokątny'],3,'Gdy ramię jest prostopadłe do podstaw, przy tym ramieniu są dwa kąty proste. To <b>trapez prostokątny</b>.'),
 // Który czworokąt jest trapezem?
 q('tz5-2a',`${fourShapes(['T1', 'N1', 'N2', 'N3'])}Który czworokąt <b>jest trapezem</b>?`,ROM,0,'Tylko czworokąt <b>I</b> ma parę boków równoległych — górny i dolny bok są poziome. W pozostałych żadne dwa boki nie są równoległe.'),
 q('tz5-2b',`${fourShapes(['N3', 'T2', 'N1', 'N2'])}Który czworokąt <b>jest trapezem</b>?`,ROM,1,'Czworokąt <b>II</b> ma dwa boki równoległe (dolny i górny biegną ukośnie, ale w tym samym kierunku). Trapez nie musi „stać” na podstawie.'),
 q('tz5-2c',`${fourShapes(['N2', 'N1', 'T3', 'N3'])}Który czworokąt <b>jest trapezem</b>?`,ROM,2,'W czworokącie <b>III</b> lewy i prawy bok są pionowe, więc są równoległe — to podstawy tego trapezu.'),
 q('tz5-2d',`${fourShapes(['T4', 'T2', 'T1', 'N1'])}Który czworokąt <b>nie jest</b> trapezem?`,ROM,3,'Czworokąty I, II i III mają po parze boków równoległych. Czworokąt <b>IV</b> nie ma żadnej pary boków równoległych, więc nie jest trapezem.'),
 // Jaki to czworokąt?
 quadQ('tz5-3a',quad({P: trap(9, 60, 60, 4 * Math.sin(rad(60))), arcs: [['A', 'B', 'D', '60°', '60°'], ['B', 'A', 'C', '60°', '60°']], sides: [['A', 'D', '4 cm'], ['B', 'C', '4 cm'], ['A', 'B', '9 cm'], ['D', 'C', '5 cm']], desc: 'Trapez o podstawach 9 cm i 5 cm, ramiona po 4 cm, kąty przy dłuższej podstawie po 60°'}),'Jaki to czworokąt?',KIND4,0,'Podstawy AB i CD są równoległe, a ramiona mają po <b>4 cm</b> — to <b>trapez równoramienny</b>. Kąty przy dłuższej podstawie też są równe (po 60°).'),
 quadQ('tz5-3b',quad({P: trap(7, 90, 55, 4), arcs: [['A', 'B', 'D', 'prosty'], ['D', 'A', 'C', 'prosty']], desc: 'Trapez z dwoma kątami prostymi przy lewym ramieniu'}),'Jaki to czworokąt?',KIND4,1,'Lewe ramię tworzy z podstawami <b>kąty proste</b> — to <b>trapez prostokątny</b>.'),
 quadQ('tz5-3c',quad({P: trap(9, 50, 75, 4), arcs: [['A', 'B', 'D', '50°', '50°'], ['B', 'A', 'C', '75°', '75°']], desc: 'Trapez o kątach 50° i 75° przy dłuższej podstawie'}),'Jaki to czworokąt?',KIND4,2,'Boki AB i CD są równoległe, więc to trapez. Kąty przy podstawie są różne (50° i 75°), więc nie jest równoramienny, i nie ma kąta prostego, więc nie jest prostokątny.'),
 quadQ('tz5-3d',quad({P: {A: [0, 0], B: [9, 0], C: [7, 5], D: [1, 2.5]}, desc: 'Czworokąt, w którym żadne dwa boki nie są równoległe'}),'Jaki to czworokąt?',KIND4,3,'Górny bok DC biegnie ukośnie w górę, a dolny AB poziomo — nie są równoległe. Ramiona AD i BC też nie są równoległe. Brak pary boków równoległych, więc <b>to nie jest trapez</b>.'),
 // Kąty przy ramieniu
 q('tz5-4a','Ile stopni mają <b>razem</b> dwa kąty trapezu leżące przy <b>tym samym ramieniu</b>?',['180°','90°','360°','zależy od trapezu'],0,`${LEG} — tak jest w każdym trapezie, bo podstawy są równoległe.`),
 q('tz5-4b','W trapezie ABCD podstawy to AB i CD. Kąt przy wierzchołku A ma <b>70°</b>. Ile stopni ma kąt przy wierzchołku <b>D</b>?',['70°','110°','20°','290°'],1,`Kąty A i D leżą przy ramieniu AD. ${LEG}: 180° − 70° = <b>110°</b>.`),
 q('tz5-4c','W trapezie ABCD podstawy to AB i CD. Kąt przy wierzchołku B ma <b>125°</b>. Ile stopni ma kąt przy wierzchołku <b>C</b>?',['125°','65°','55°','235°'],2,`Kąty B i C leżą przy ramieniu BC. ${LEG}: 180° − 125° = <b>55°</b>.`),
 q('tz5-4d','Ile stopni mają <b>razem wszystkie</b> kąty trapezu?',['180°','270°','720°','360°'],3,`Przy każdym z dwóch ramion kąty mają razem 180°, więc wszystkie cztery kąty: 180° + 180° = <b>360°</b> — jak w każdym czworokącie.`),
 // Trapez prostokątny — jeden kąt
 q('tz5-5a','Jeden z kątów trapezu prostokątnego ma <b>58°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['90°, 90° i 122°','58°, 122° i 122°','90°, 90° i 58°','32°, 90° i 90°'],0,'Trapez prostokątny ma dwa kąty proste przy jednym ramieniu. Przy drugim ramieniu: 58° i 180° − 58° = 122°. Pozostałe kąty: <b>90°, 90° i 122°</b>.'),
 q('tz5-5b','Jeden z kątów trapezu prostokątnego ma <b>128°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['90°, 90° i 128°','90°, 90° i 52°','52°, 52° i 128°','90°, 52° i 38°'],1,'Dwa kąty są proste. Przy drugim ramieniu: 128° i 180° − 128° = 52°. Pozostałe kąty: <b>90°, 90° i 52°</b>.'),
 q('tz5-5c','Jeden z kątów trapezu prostokątnego ma <b>73°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['90°, 90° i 73°','17°, 90° i 90°','90°, 90° i 107°','73°, 107° i 107°'],2,'Dwa kąty są proste, a kąt przy tym samym ramieniu co 73° ma 180° − 73° = 107°. Pozostałe: <b>90°, 90° i 107°</b>.'),
 q('tz5-5d','Jeden z kątów trapezu prostokątnego ma <b>104°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['76°, 104° i 104°','90°, 90° i 104°','14°, 90° i 90°','90°, 90° i 76°'],3,'Dwa kąty są proste, a kąt przy tym samym ramieniu co 104° ma 180° − 104° = 76°. Pozostałe: <b>90°, 90° i 76°</b>.'),
 // Kąty trapezu z rysunku
 quadQ('tz5-6a',quad({P: t5a, arcs: [['A', 'B', 'D', '68°', '68°'], ['C', 'B', 'D', '106°', '106°'], ['D', 'A', 'C', 'α']], desc: 'Trapez ABCD, kąt A ma 68°, kąt C ma 106°, kąt D oznaczony α'}),'Czworokąt ABCD jest trapezem (AB ∥ CD). Ile stopni ma kąt α?',['112°','68°','22°','122°'],0,`Kąt α leży przy ramieniu AD razem z kątem 68°. ${LEG}: α = 180° − 68° = <b>112°</b>.`),
 quadQ('tz5-6b',quad({P: t5a, arcs: [['A', 'B', 'D', '68°', '68°'], ['C', 'B', 'D', '106°', '106°'], ['B', 'A', 'C', 'β']], desc: 'Trapez ABCD, kąt A ma 68°, kąt C ma 106°, kąt B oznaczony β'}),'Czworokąt ABCD jest trapezem (AB ∥ CD). Ile stopni ma kąt β?',['106°','74°','16°','68°'],1,`Kąt β leży przy ramieniu BC razem z kątem 106°. ${LEG}: β = 180° − 106° = <b>74°</b>.`),
 quadQ('tz5-6c',quad({P: t5c, arcs: [['D', 'A', 'C', '125°', '125°'], ['B', 'A', 'C', '80°', '80°'], ['A', 'B', 'D', 'α']], desc: 'Trapez ABCD, kąt D ma 125°, kąt B ma 80°, kąt A oznaczony α'}),'Czworokąt ABCD jest trapezem (AB ∥ CD). Ile stopni ma kąt α?',['125°','35°','55°','100°'],2,`Kąt α leży przy ramieniu AD razem z kątem 125°. ${LEG}: α = 180° − 125° = <b>55°</b>.`),
 quadQ('tz5-6d',quad({P: t5d, arcs: [['A', 'B', 'D', '72°', '72°'], ['B', 'A', 'C', '48°', '48°'], ['C', 'B', 'D', 'γ']], desc: 'Trapez ABCD, kąt A ma 72°, kąt B ma 48°, kąt C oznaczony γ'}),'Czworokąt ABCD jest trapezem (AB ∥ CD). Ile stopni ma kąt γ?',['48°','108°','42°','132°'],3,`Kąt γ leży przy ramieniu BC razem z kątem 48°. ${LEG}: γ = 180° − 48° = <b>132°</b>. Kąt 72° leży przy drugim ramieniu.`),
 // Trapez równoramienny — jeden kąt
 q('tz5-7a','Jeden z kątów trapezu równoramiennego ma <b>47°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['47°, 133° i 133°','133°, 133° i 133°','47°, 47° i 133°','43°, 43° i 47°'],0,'W trapezie równoramiennym kąty przy tej samej podstawie są równe. Drugi kąt przy tej podstawie ma 47°, a kąty przy drugiej podstawie: 180° − 47° = 133°. Pozostałe: <b>47°, 133° i 133°</b>.'),
 q('tz5-7b','Jeden z kątów trapezu równoramiennego ma <b>115°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['115°, 115° i 65°','65°, 65° i 115°','25°, 25° i 115°','65°, 65° i 65°'],1,'Drugi kąt przy tej samej podstawie też ma 115°, a przy drugiej podstawie są kąty po 180° − 115° = 65°. Pozostałe: <b>65°, 65° i 115°</b>.'),
 q('tz5-7c','Jeden z kątów trapezu równoramiennego ma <b>72°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['72°, 72° i 108°','18°, 72° i 72°','72°, 108° i 108°','108°, 108° i 108°'],2,'Drugi kąt przy tej samej podstawie ma 72°, a kąty przy drugiej podstawie po 180° − 72° = 108°. Pozostałe: <b>72°, 108° i 108°</b>.'),
 q('tz5-7d','Jeden z kątów trapezu równoramiennego ma <b>125°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['55°, 125° i 125°','35°, 35° i 125°','125°, 125° i 125°','55°, 55° i 125°'],3,'Drugi kąt przy tej samej podstawie ma 125°, a przy drugiej podstawie po 180° − 125° = 55°. Pozostałe: <b>55°, 55° i 125°</b>.'),
 // Trapez równoramienny z rysunku
 quadQ('tz5-8a',quad({P: trap(10, 38, 38, 2.5), arcs: [['A', 'B', 'D', '38°', '38°'], ['C', 'B', 'D', 'γ']], desc: 'Trapez równoramienny ABCD, kąt A ma 38°, kąt C oznaczony γ'}),`${ISO('AB i CD')} Ile stopni ma kąt γ?`,['142°','38°','52°','128°'],0,`Kąt przy B jest równy kątowi przy A (38°), bo trapez jest równoramienny. ${LEG}: γ = 180° − 38° = <b>142°</b>.`),
 quadQ('tz5-8b',quad({P: trap(6, 75, 75, 4.5), rot: 90, arcs: [['C', 'B', 'D', '105°', '105°'], ['A', 'B', 'D', 'α']], desc: 'Trapez równoramienny ABCD obrócony tak, że podstawy są pionowe; kąt C ma 105°, kąt A oznaczony α'}),`${ISO('AB i CD')} Ile stopni ma kąt α?`,['105°','75°','15°','85°'],1,`Kąty C i D przy krótszej podstawie są równe (po 105°). Kąt α leży przy ramieniu AD razem z kątem D: α = 180° − 105° = <b>75°</b>.`),
 quadQ('tz5-8c',quad({P: trap(9, 50, 50, 3), arcs: [['A', 'B', 'D', '50°', '50°'], ['D', 'A', 'C', 'δ']], desc: 'Trapez równoramienny ABCD, kąt A ma 50°, kąt D oznaczony δ'}),`${ISO('AB i CD')} Ile stopni ma kąt δ?`,['50°','40°','130°','310°'],2,`Kąt δ leży przy ramieniu AD razem z kątem 50°. ${LEG}: δ = 180° − 50° = <b>130°</b>.`),
 quadQ('tz5-8d',quad({P: trap(10, 65, 65, 3.5), rot: 180, arcs: [['A', 'B', 'D', '65°', '65°'], ['B', 'A', 'C', 'β']], desc: 'Trapez równoramienny ABCD odwrócony dłuższą podstawą do góry; kąt A ma 65°, kąt B oznaczony β'}),`${ISO('AB i CD')} Ile stopni ma kąt β?`,['115°','25°','35°','65°'],3,'Kąty A i B leżą przy tej samej podstawie AB, a w trapezie równoramiennym takie kąty są równe: β = <b>65°</b>. Trapez jest tylko odwrócony do góry nogami.'),
 // Długości odcinków
 quadQ('tz5-9a',quad({P: {A: [0, 0], B: [10, 0], C: [8, 3], D: [2, 3]}, heights: [['D', 'A', 'B', '', 'E'], ['C', 'A', 'B', '', 'F']], sides: [['D', 'C', '6 cm'], ['A', 'E', 'b'], ['F', 'B', 'b']], desc: 'Trapez równoramienny z dwiema wysokościami opuszczonymi z wierzchołków D i C'}),'Trapez ABCD jest równoramienny, a jego dłuższa podstawa AB ma <b>10 cm</b>. Ile ma odcinek <i>b</i>?',['2 cm','4 cm','3 cm','8 cm'],0,'Wysokości odcinają z podstawy AB prostokąt — środkowy odcinek ma tyle, co CD, czyli 6 cm. Na dwa jednakowe odcinki <i>b</i> zostaje 10 − 6 = 4 cm, więc <i>b</i> = 4 : 2 = <b>2 cm</b>.'),
 quadQ('tz5-9b',quad({P: {A: [0, 0], B: [12, 0], C: [9, 3.6], D: [3, 3.6]}, heights: [['D', 'A', 'B', '', 'E'], ['C', 'A', 'B', '', 'F']], sides: [['D', 'C', 'a'], ['A', 'E', '3 cm'], ['F', 'B', '3 cm']], desc: 'Trapez równoramienny z dwiema wysokościami; skrajne odcinki dolnej podstawy po 3 cm'}),'Trapez ABCD jest równoramienny, a jego dłuższa podstawa AB ma <b>12 cm</b>. Ile ma krótsza podstawa <i>a</i>?',['9 cm','6 cm','3 cm','15 cm'],1,'Odcinek między spodkami wysokości ma tyle, co krótsza podstawa. Z 12 cm odejmujemy dwa skrajne odcinki: 12 − 3 − 3 = <b>6 cm</b>.'),
 quadQ('tz5-9c',quad({P: {A: [0, 0], B: [9, 0], C: [6, 4], D: [0, 4]}, heights: [['C', 'A', 'B', '4 cm', 'E']], arcs: [['A', 'B', 'D', 'prosty'], ['D', 'A', 'C', 'prosty']], sides: [['D', 'C', '6 cm'], ['C', 'B', '5 cm'], ['E', 'B', '3 cm'], ['A', 'E', 'd']], desc: 'Trapez prostokątny z wysokością z wierzchołka C'}),'Czworokąt ABCD jest trapezem prostokątnym. Ile ma odcinek <i>d</i>?',['3 cm','9 cm','6 cm','4 cm'],2,'Wysokość CE odcina prostokąt AECD. W prostokącie przeciwległe boki są równe, więc <i>d</i> = DC = <b>6 cm</b>. Cała podstawa AB ma 6 + 3 = 9 cm.'),
 quadQ('tz5-9d',quad({P: {A: [0, 0], B: [10, 0], C: [6, 3], D: [0, 3]}, heights: [['C', 'A', 'B', '3 cm', 'E']], arcs: [['A', 'B', 'D', 'prosty'], ['D', 'A', 'C', 'prosty']], sides: [['A', 'B', '10 cm'], ['C', 'B', '5 cm'], ['A', 'D', 'c']], desc: 'Trapez prostokątny z wysokością z wierzchołka C'}),'Czworokąt ABCD jest trapezem prostokątnym. Ile ma ramię <i>c</i>?',['5 cm','4 cm','10 cm','3 cm'],3,'Ramię AD jest prostopadłe do podstaw, więc też jest wysokością trapezu. Obie wysokości mają tę samą długość: <i>c</i> = <b>3 cm</b>.'),
 // Prawda czy fałsz
 truth('tz5-10a','Suma kątów przy jednym ramieniu trapezu wynosi 180°.','W trapezie równoramiennym kąty przy tej samej podstawie są równe.','PP','I. <b>Prawda</b> — tak jest w każdym trapezie. II. <b>Prawda</b> — trapez równoramienny ma oś symetrii, która „przenosi” jeden kąt przy podstawie na drugi.'),
 truth('tz5-10b','Trapez może mieć trzy boki równe, a czwarty dłuższy.','Trapez może mieć dokładnie jeden kąt prosty.','PF','I. <b>Prawda</b> — np. ramiona i krótsza podstawa po 3 cm, a dłuższa podstawa 6 cm. II. <b>Fałsz</b> — kąt przy tym samym ramieniu co kąt prosty ma 180° − 90° = 90°, więc kąty proste są zawsze dwa (albo cztery).'),
 truth('tz5-10c','Trapez może mieć cztery kąty ostre.','Trapez może mieć dokładnie jeden kąt rozwarty.','FP','I. <b>Fałsz</b> — dwa kąty przy ramieniu mają razem 180°, więc nie mogą być oba ostre. II. <b>Prawda</b> — np. trapez prostokątny o kątach 90°, 90°, 60° i 120°.'),
 truth('tz5-10d','Przy dłuższej podstawie trapezu mogą leżeć dwa kąty rozwarte.','Ramiona każdego trapezu mają równe długości.','FF','I. <b>Fałsz</b> — gdyby oba kąty przy dłuższej podstawie były rozwarte, ramiona rozchodziłyby się ku górze i górna podstawa byłaby dłuższa. II. <b>Fałsz</b> — równe ramiona ma tylko trapez równoramienny.'),
 // Kąt między przedłużeniem podstawy a ramieniem
 quadQ('tz5-11a',quad({P: t11a, ext: {E: ['D', 'C', 2.6], F: ['C', 'D', 2.6]}, arcs: [['A', 'B', 'D', '34°', '34°'], ['D', 'E', 'A', 'α']], desc: 'Trapez ABCD z przedłużoną górną podstawą; kąt A ma 34°, kąt między przedłużeniem a ramieniem AD oznaczony α'}),'Czworokąt ABCD jest trapezem, a górna podstawa jest przedłużona linią przerywaną. Ile stopni ma kąt α?',['34°','146°','56°','124°'],0,`Kąt D trapezu: 180° − 34° = 146°. Kąt α jest do niego przyległy: α = 180° − 146° = <b>34°</b> — tyle samo co kąt A.`),
 quadQ('tz5-11b',quad({P: t11a, ext: {E: ['D', 'C', 2.6], F: ['C', 'D', 2.6]}, arcs: [['C', 'B', 'D', '142°', '142°'], ['C', 'F', 'B', 'β']], desc: 'Trapez ABCD z przedłużoną górną podstawą; kąt C ma 142°, kąt między przedłużeniem a ramieniem BC oznaczony β'}),'Czworokąt ABCD jest trapezem, a górna podstawa jest przedłużona linią przerywaną. Ile stopni ma kąt β?',['142°','38°','52°','48°'],1,'Kąt β i kąt C (142°) są przyległe — razem mają 180°. β = 180° − 142° = <b>38°</b>.'),
 quadQ('tz5-11c',quad({P: t11c, ext: {E: ['D', 'C', 2.4], F: ['C', 'D', 2.4]}, arcs: [['D', 'A', 'C', '130°', '130°'], ['D', 'E', 'A', 'α']], desc: 'Trapez ABCD z przedłużoną górną podstawą; kąt D ma 130°, kąt między przedłużeniem a ramieniem AD oznaczony α'}),'Czworokąt ABCD jest trapezem, a górna podstawa jest przedłużona linią przerywaną. Ile stopni ma kąt α?',['130°','40°','50°','230°'],2,'Kąt α i kąt D (130°) są przyległe: α = 180° − 130° = <b>50°</b>.'),
 quadQ('tz5-11d',quad({P: t11c, ext: {E: ['D', 'C', 2.4], F: ['C', 'D', 2.4]}, arcs: [['B', 'A', 'C', '65°', '65°'], ['C', 'F', 'B', 'β']], desc: 'Trapez ABCD z przedłużoną górną podstawą; kąt B ma 65°, kąt między przedłużeniem a ramieniem BC oznaczony β'}),'Czworokąt ABCD jest trapezem, a górna podstawa jest przedłużona linią przerywaną. Ile stopni ma kąt β?',['115°','25°','35°','65°'],3,`Kąt C trapezu: 180° − 65° = 115° (kąty B i C leżą przy ramieniu BC). Kąt β jest przyległy do kąta C: β = 180° − 115° = <b>65°</b>.`),
 // Ile trapezów na rysunku?
 quadQ('tz5-12a',quad({P: {...T14, ...hcut(1)}, cuts: [['L0', 'R0', 'h']], names: false, desc: 'Trapez przecięty jedną linią równoległą do podstaw'}),'Ile <b>trapezów</b> jest na tym rysunku?',['3','2','4','5'],0,'Linia równoległa do podstaw dzieli trapez na 2 mniejsze trapezy. Do tego cały duży trapez: 2 + 1 = <b>3</b>.'),
 quadQ('tz5-12b',quad({P: {...T14, S0: [4, 4], S1: [3.5, 0], S2: [6, 4], S3: [7, 0]}, cuts: [['S0', 'S1', 's'], ['S2', 'S3', 's']], names: false, desc: 'Trapez podzielony dwoma odcinkami łączącymi podstawy na trzy części'}),'Ile <b>trapezów</b> jest na tym rysunku?',['3','6','5','4'],1,'Każda część ma kawałek górnej i dolnej podstawy, więc jest trapezem. Trzy pojedyncze części, dwie pary sąsiednich i cały trapez: 3 + 2 + 1 = <b>6</b>.'),
 quadQ('tz5-12c',quad({P: {...T14, ...hcut(3)}, cuts: [0, 1, 2].map((i) => [`L${i}`, `R${i}`, 'h']), names: false, desc: 'Trapez przecięty trzema liniami równoległymi do podstaw'}),'Ile <b>trapezów</b> jest na tym rysunku?',['4','6','10','8'],2,'Trzy linie dzielą trapez na 4 paski. Trapezy z 1 paska: 4, z 2 sąsiednich: 3, z 3: 2, z 4 (cały): 1. Razem 4 + 3 + 2 + 1 = <b>10</b>.'),
 quadQ('tz5-12d',quad({P: {...T14, ...hcut(1), S0: [4.5, 4], S1: [5.5, 0]}, cuts: [['L0', 'R0', 'h'], ['S0', 'S1', 's']], names: false, desc: 'Trapez przecięty linią równoległą do podstaw i odcinkiem łączącym podstawy'}),'Ile <b>trapezów</b> jest na tym rysunku?',['4','5','6','9'],3,'W poziomie wybieramy górny pasek, dolny albo oba (3 sposoby), a w pionie lewą część, prawą albo obie (3 sposoby). Każdy wybór daje trapez: 3 · 3 = <b>9</b>.'),
 // Trapezy z trójkątów równobocznych
 q('tz5-13a','W trójkącie równobocznym połączono środki boków i odcięto <b>jeden</b> z czterech małych trójkątów. Pozostałe trzy tworzą trapez. Jakie kąty ma ten trapez?',['60°, 60°, 120° i 120°','60°, 60°, 60° i 180°','90°, 90°, 60° i 120°','45°, 45°, 135° i 135°'],0,'Małe trójkąty też są równoboczne (kąty po 60°). Przy dłuższej podstawie zostają kąty dużego trójkąta: 60° i 60°. Przy krótszej leżą po dwa kąty małych trójkątów: 60° + 60° = 120°. Kąty: <b>60°, 60°, 120° i 120°</b>.'),
 q('tz5-13b','Przekątna dzieli trapez prostokątny na dwa trójkąty, z których jeden jest <b>równoboczny</b>. Jakie kąty ma ten trapez?',['90°, 90°, 45° i 135°','90°, 90°, 60° i 120°','60°, 60°, 120° i 120°','90°, 90°, 30° i 150°'],1,'Trapez prostokątny ma dwa kąty proste, a kąty przy drugim ramieniu mają razem 180°. Ramię to bok trójkąta równobocznego, więc kąt ostry trapezu ma <b>60°</b>, a rozwarty 180° − 60° = 120°. Kąty: <b>90°, 90°, 60° i 120°</b>.'),
 q('tz5-13c','Trapez równoramienny złożono z <b>trzech</b> jednakowych trójkątów równobocznych o boku <b>4 cm</b>. Jaki obwód ma ten trapez?',['12 cm','36 cm','20 cm','16 cm'],2,'Dłuższa podstawa składa się z dwóch boków trójkątów: 8 cm. Krótsza podstawa i ramiona mają po 4 cm. Obwód: 8 + 4 + 4 + 4 = <b>20 cm</b>.'),
 q('tz5-13d','Z trójkąta równobocznego o boku <b>6 cm</b> odcięto mały trójkąt, łącząc środki dwóch boków. Został trapez. Jaki ma obwód?',['18 cm','12 cm','21 cm','15 cm'],3,'Odcięty mały trójkąt też jest równoboczny, a jego boki mają po połowie z 6 cm, czyli po 3 cm. Trapez ma boki: 6 cm (dłuższa podstawa), 3 cm (krótsza) i dwa ramiona po 3 cm. Obwód: 6 + 3 + 3 + 3 = <b>15 cm</b>.'),
 // Kąt 45° i wysokość
 q('tz5-14a','Kąt rozwarty trapezu prostokątnego ma <b>135°</b>, a podstawy mają <b>3 cm i 8 cm</b>. Ile ma wysokość tego trapezu?',['5 cm','11 cm','3 cm','8 cm'],0,'Kąt ostry ma 180° − 135° = 45°. Wysokość odcina trójkąt prostokątny o kątach 45° i 45°, czyli równoramienny: wysokość = 8 − 3 = <b>5 cm</b>.'),
 q('tz5-14b','Kąt ostry trapezu prostokątnego ma <b>45°</b>, a podstawy mają <b>4 cm i 7 cm</b>. Ile ma wysokość tego trapezu?',['4 cm','3 cm','7 cm','11 cm'],1,'Wysokość odcina trójkąt prostokątny z kątem 45° — trzeci kąt też ma 45°, więc przyprostokątne są równe. Wysokość = 7 − 4 = <b>3 cm</b>.'),
 q('tz5-14c','Kąty przy dłuższej podstawie trapezu równoramiennego mają po <b>45°</b>. Podstawy mają <b>10 cm i 4 cm</b>. Ile ma wysokość?',['6 cm','4 cm','3 cm','5 cm'],2,'Dwie wysokości odcinają po obu stronach jednakowe trójkąty o kątach 45°, 45° i 90°. Każdy ma przy podstawie (10 − 4) : 2 = 3 cm, a wysokość jest tak samo długa: <b>3 cm</b>.'),
 q('tz5-14d','Kąt ostry trapezu prostokątnego ma <b>45°</b>, wysokość ma <b>4 cm</b>, a krótsza podstawa <b>3 cm</b>. Ile ma dłuższa podstawa?',['4 cm','1 cm','8 cm','7 cm'],3,'Wysokość odcina trójkąt o kątach 45°, 45° i 90°, więc jego bok na podstawie ma tyle co wysokość: 4 cm. Dłuższa podstawa: 3 + 4 = <b>7 cm</b>.'),
 // Zadania dla mistrzów
 q('tz5-15a','Obwód trapezu równoramiennego wynosi <b>30 cm</b>, a podstawy mają <b>12 cm i 8 cm</b>. Ile ma każde ramię?',['5 cm','10 cm','4 cm','6 cm'],0,'Na ramiona zostaje 30 − 12 − 8 = 10 cm. Ramiona są równe: 10 : 2 = <b>5 cm</b>.'),
 q('tz5-15b','W trapezie równoramiennym ramię ma <b>7 cm</b>, krótsza podstawa jest <b>o 2 cm dłuższa</b> od ramienia, a dłuższa podstawa jest <b>2 razy dłuższa</b> od krótszej. Jaki jest obwód?',['32 cm','41 cm','34 cm','39 cm'],1,'Krótsza podstawa: 7 + 2 = 9 cm, dłuższa: 2 · 9 = 18 cm. Obwód: 7 + 7 + 9 + 18 = <b>41 cm</b>.'),
 q('tz5-15c','Kąt przy krótszej podstawie trapezu równoramiennego jest <b>4 razy większy</b> od kąta przy dłuższej podstawie. Ile stopni ma kąt <b>ostry</b> tego trapezu?',['45°','30°','36°','144°'],2,'Kąt ostry i rozwarty leżą przy jednym ramieniu, więc mają razem 180°. To 1 + 4 = 5 równych części: 180° : 5 = <b>36°</b> (rozwarty ma 144°).'),
 q('tz5-15d','W trapezie prostokątnym kąt rozwarty jest <b>o 40° większy</b> od kąta ostrego. Ile stopni ma kąt <b>rozwarty</b>?',['130°','140°','70°','110°'],3,'Kąt ostry i rozwarty leżą przy jednym ramieniu: razem 180°. Bez nadwyżki 40° zostaje 140°, więc kąt ostry ma 70°, a rozwarty 70° + 40° = <b>110°</b>.'),
];

// Równoległoboki do pytań „który odcinek jest wysokością”: wysokość, przekątna AC, ukośny odcinek między bokami AB i CD oraz bok AD.
function heightPick(L, A, s, xh, slant, letters) {
 const P = para(L, A, s), top = P.D[1];
 const pts = {...P, H1: [xh, top], H2: [xh, 0], S1: [slant[0], top], S2: [slant[1], 0]};
 const [h, d, sl, side] = letters;
 return quad({P: pts, segs: [['A', 'C', d, 0.8, 1], ['H1', 'H2', h, 0.25, 1], ['S1', 'S2', sl, 0.75, -1], ['A', 'D', side, 0.5, -1]], desc: 'Równoległobok ABCD i cztery odcinki oznaczone literami a, b, c, d'});
}
const HQ = 'Który odcinek jest <b>wysokością</b> równoległoboku ABCD?', HA = ['odcinek a', 'odcinek b', 'odcinek c', 'odcinek d'];
const HEX = (h, d, sl, side) => `Wysokość jest <b>prostopadła</b> do boków AB i CD i łączy je — to odcinek <b>${h}</b>. Odcinek ${d} to przekątna AC, odcinek ${sl} łączy te boki ukośnie (nie tworzy z nimi kąta prostego), a ${side} to bok AD.`;
const GQ = (cell) => `Bok kratki ma <b>${cell}</b>. Ile ma wysokość tego równoległoboku poprowadzona do boku AB?`;
const DQ = 'Punkty A, B i C to trzy wierzchołki równoległoboku ABCD. W którym punkcie leży wierzchołek <b>D</b>?', DA = ['w punkcie 1', 'w punkcie 2', 'w punkcie 3', 'w punkcie 4'];
const DEX = (sh) => `W równoległoboku bok AD jest równoległy i równy bokowi BC, więc z punktu A idziemy tak samo jak z B do C: ${sh}. Trafiamy w punkt D.`;
const SHAPE4 = ['równoległobok, który nie jest ani rombem, ani prostokątem', 'romb, który nie jest kwadratem', 'prostokąt, który nie jest kwadratem', 'kwadrat'];
const DIAG = (s) => `Przekątne czworokąta przecinają się w połowie każdej z nich${s}. Jaki to czworokąt?`;

export const parallelogramQuestions5 = [
 // Pojęcia
 q('rw5-1a','Równoległobok to czworokąt, który ma:',['dwie pary boków równoległych','tylko jedną parę boków równoległych','cztery kąty proste','wszystkie boki równej długości'],0,'<b>Równoległobok</b> ma <b>dwie pary boków równoległych</b>. Jego przeciwległe boki są też równej długości.'),
 q('rw5-1b','Romb to równoległobok, który ma:',['cztery kąty proste','wszystkie boki równej długości','przekątne równej długości','dokładnie jeden kąt ostry'],1,'<b>Romb</b> to równoległobok o <b>wszystkich bokach równej długości</b>. Gdy ma jeszcze kąty proste, jest kwadratem.'),
 q('rw5-1c','Co wiemy o przekątnych <b>każdego</b> równoległoboku?',['są równej długości','są prostopadłe','dzielą się nawzajem na połowy','nie przecinają się'],2,'Przekątne równoległoboku przecinają się w punkcie, który <b>dzieli każdą z nich na połowy</b>. Równe są tylko w prostokącie, a prostopadłe tylko w rombie.'),
 q('rw5-1d','Pod jakim kątem przecinają się przekątne <b>rombu</b>?',['45°','60°','180°','prostym'],3,'Przekątne rombu są <b>prostopadłe</b> — przecinają się pod kątem prostym (90°) i dzielą się na połowy.'),
 // Nazwy boków, przekątnych i kątów
 quadQ('rw5-2a',quad({P: rename(para(9, 55, 5), 'EFGH'), desc: 'Równoległobok EFGH'}),'Które boki równoległoboku EFGH są <b>równoległe</b>?',['EF ∥ GH i FG ∥ EH','EF ∥ FG i GH ∥ EH','EG ∥ FH i EF ∥ GH','EH ∥ FG i EG ∥ FH'],0,'Równoległe są boki <b>przeciwległe</b>: EF ∥ GH oraz FG ∥ EH. EG i FH to przekątne, a EF i FG mają wspólny wierzchołek.'),
 quadQ('rw5-2b',quad({P: rename(para(8, 62, 5), 'KLMN'), rot: 12, desc: 'Równoległobok KLMN'}),'Które odcinki są <b>przekątnymi</b> równoległoboku KLMN?',['KL i MN','KM i LN','KN i LM','KL i LM'],1,'Przekątna łączy wierzchołki, które <b>nie są sąsiednie</b>: K z M oraz L z N. Odcinki KL, LM, MN i NK to boki.'),
 quadQ('rw5-2c',quad({P: rename(para(9, 48, 5), 'PRST'), rot: -8, desc: 'Równoległobok PRST'}),'Który odcinek ma <b>taką samą długość</b> jak bok PR?',['RS','PT','ST','PS'],2,'W równoległoboku <b>przeciwległe boki są równe</b>. Naprzeciwko PR leży bok <b>ST</b>. PS to przekątna.'),
 quadQ('rw5-2d',quad({P: rename(para(9, 66, 4.5), 'WXYZ'), rot: 180, desc: 'Równoległobok WXYZ'}),'Który kąt ma <b>taką samą miarę</b> jak kąt przy wierzchołku W?',['przy wierzchołku X','przy wierzchołku Z','żaden inny kąt','przy wierzchołku Y'],3,'W równoległoboku <b>kąty przeciwległe są równe</b>. Naprzeciwko W leży wierzchołek <b>Y</b>.'),
 // Obwody
 q('rw5-3a','Oblicz obwód <b>rombu</b> o boku <b>7 cm</b>.',['28 cm','14 cm','49 cm','21 cm'],0,'Romb ma 4 równe boki: 4 · 7 = <b>28 cm</b>.'),
 q('rw5-3b','Oblicz obwód równoległoboku o bokach <b>2,5 cm</b> i <b>4 cm</b>.',['6,5 cm','13 cm','10 cm','16 cm'],1,'Przeciwległe boki są równe, więc obwód to 2,5 + 4 + 2,5 + 4 = 2 · 6,5 = <b>13 cm</b>.'),
 q('rw5-3c','Oblicz obwód równoległoboku o bokach <b>12 cm</b> i <b>8 cm</b>.',['20 cm','96 cm','40 cm','48 cm'],2,'Dwa boki po 12 cm i dwa po 8 cm: 2 · 12 + 2 · 8 = 24 + 16 = <b>40 cm</b>.'),
 q('rw5-3d','Oblicz obwód <b>rombu</b> o boku <b>15 cm</b>.',['30 cm','45 cm','225 cm','60 cm'],3,'Wszystkie boki rombu są równe: 4 · 15 = <b>60 cm</b>.'),
 // Jeden kąt — pozostałe
 q('rw5-4a','Jeden z kątów równoległoboku ma <b>136°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['44°, 44° i 136°','136°, 136° i 44°','54°, 54° i 136°','44°, 136° i 224°'],0,`${PAR}. Kąt przeciwległy ma 136°, a dwa pozostałe po 180° − 136° = 44°. Pozostałe kąty: <b>44°, 44° i 136°</b>.`),
 q('rw5-4b','Jeden z kątów równoległoboku ma <b>65°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['65°, 65° i 115°','65°, 115° i 115°','25°, 25° i 65°','115°, 115° i 115°'],1,`${PAR}. Kąt przeciwległy ma 65°, a dwa pozostałe po 180° − 65° = 115°. Pozostałe: <b>65°, 115° i 115°</b>.`),
 q('rw5-4c','Jeden z kątów <b>rombu</b> ma <b>118°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['118°, 118° i 62°','28°, 28° i 118°','62°, 62° i 118°','62°, 62° i 62°'],2,`Romb jest równoległobokiem. Kąt przeciwległy ma 118°, a dwa pozostałe po 180° − 118° = 62°. Pozostałe: <b>62°, 62° i 118°</b>.`),
 q('rw5-4d','Jeden z kątów równoległoboku ma <b>81°</b>. Jakie miary mają <b>pozostałe</b> kąty?',['81°, 81° i 99°','9°, 9° i 81°','99°, 99° i 99°','81°, 99° i 99°'],3,`${PAR}. Kąt przeciwległy ma 81°, a dwa pozostałe po 180° − 81° = 99°. Pozostałe: <b>81°, 99° i 99°</b>.`),
 // Bok z obwodu
 q('rw5-5a','Obwód <b>rombu</b> wynosi <b>64 cm</b>. Ile ma jego bok?',['16 cm','32 cm','60 cm','8 cm'],0,'Romb ma 4 równe boki: 64 : 4 = <b>16 cm</b>.'),
 q('rw5-5b','Obwód równoległoboku wynosi <b>54 cm</b>, a jeden z jego boków ma <b>10 cm</b>. Ile ma bok sąsiedni?',['44 cm','17 cm','34 cm','7 cm'],1,'Dwa boki po 10 cm to 20 cm. Na dwa pozostałe boki zostaje 54 − 20 = 34 cm, czyli po 34 : 2 = <b>17 cm</b>.'),
 q('rw5-5c','Obwód równoległoboku wynosi <b>34 cm</b>, a jego dłuższy bok ma <b>12 cm</b>. Ile ma krótszy bok?',['22 cm','10 cm','5 cm','11 cm'],2,'Połowa obwodu to suma dwóch sąsiednich boków: 34 : 2 = 17 cm. Krótszy bok: 17 − 12 = <b>5 cm</b>.'),
 q('rw5-5d','Obwód równoległoboku wynosi <b>70 cm</b>, a jeden z jego boków ma <b>21 cm</b>. Ile ma bok sąsiedni?',['49 cm','28 cm','21 cm','14 cm'],3,'Połowa obwodu: 70 : 2 = 35 cm — tyle mają razem dwa sąsiednie boki. Drugi bok: 35 − 21 = <b>14 cm</b>.'),
 // Kąty z rysunku
 quadQ('rw5-6a',quad({P: para(9, 57, 5), arcs: [['B', 'A', 'C', '123°', '123°'], ['A', 'B', 'D', 'α']], desc: 'Równoległobok ABCD, kąt B ma 123°, kąt A oznaczony α'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt α?',['57°','123°','33°','67°'],0,'Kąty A i B leżą przy tym samym boku AB, więc mają razem 180°: α = 180° − 123° = <b>57°</b>.'),
 quadQ('rw5-6b',quad({P: para(9, 70, 5), arcs: [['D', 'A', 'C', '110°', '110°'], ['B', 'A', 'C', 'β']], desc: 'Równoległobok ABCD, kąt D ma 110°, kąt B oznaczony β'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt β?',['70°','110°','20°','250°'],1,'Kąty B i D są <b>przeciwległe</b>, więc są równe: β = <b>110°</b>.'),
 quadQ('rw5-6c',quad({P: para(8, 41, 5), arcs: [['A', 'B', 'D', '41°', '41°'], ['D', 'A', 'C', 'δ']], desc: 'Równoległobok ABCD, kąt A ma 41°, kąt D oznaczony δ'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt δ?',['41°','49°','139°','129°'],2,'Kąty A i D leżą przy tym samym boku AD: δ = 180° − 41° = <b>139°</b>.'),
 quadQ('rw5-6d',quad({P: para(8, 64, 5.5), rot: -12, arcs: [['C', 'B', 'D', '64°', '64°'], ['B', 'A', 'C', 'β']], desc: 'Równoległobok ABCD lekko obrócony; kąt C ma 64°, kąt B oznaczony β'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt β?',['64°','26°','126°','116°'],3,'Kąty B i C leżą przy tym samym boku BC, więc mają razem 180°: β = 180° − 64° = <b>116°</b>.'),
 // Osie symetrii
 q('rw5-7a','Ile osi symetrii ma <b>romb</b>, który nie jest kwadratem?',['2','0','1','4'],0,'Osiami symetrii rombu są jego <b>dwie przekątne</b> — po złożeniu wzdłuż każdej z nich połówki się pokrywają.'),
 q('rw5-7b','Ile osi symetrii ma równoległobok, który <b>nie jest</b> ani rombem, ani prostokątem?',['1','0','2','4'],1,'Taki równoległobok <b>nie ma żadnej osi symetrii</b> — złożony wzdłuż przekątnej lub przez środki boków nigdy się nie pokrywa. Ma za to środek symetrii.'),
 q('rw5-7c','Ile osi symetrii ma <b>kwadrat</b>?',['1','2','4','0'],2,'Kwadrat ma <b>4 osie symetrii</b>: dwie przekątne i dwie proste przez środki przeciwległych boków.'),
 q('rw5-7d','Ile osi symetrii ma <b>prostokąt</b>, który nie jest kwadratem?',['0','1','4','2'],3,'Prostokąt ma <b>2 osie symetrii</b> — proste przez środki przeciwległych boków. Przekątne nie są jego osiami.'),
 // Wysokość równoległoboku — pojęcia
 q('rw5-8a','<b>Wysokość</b> równoległoboku to odcinek, który:',['jest prostopadły do dwóch równoległych boków i łączy proste, na których one leżą','łączy przeciwległe wierzchołki','łączy środki dwóch przeciwległych boków','jest dłuższym bokiem'],0,'Wysokość jest <b>prostopadła</b> do pary boków równoległych — to odległość między nimi. Odcinek łączący przeciwległe wierzchołki to przekątna.'),
 q('rw5-8b','Ile wysokości o <b>różnych długościach</b> może mieć równoległobok, który nie jest rombem?',['1','2','4','żadnej'],1,'Równoległobok ma dwie pary boków równoległych, więc ma <b>2</b> rodzaje wysokości: jedną do pary dłuższych boków, drugą do pary krótszych.'),
 q('rw5-8c','Bok rombu ma <b>5 cm</b>, a wysokość poprowadzona do jednego boku ma <b>4 cm</b>. Ile ma wysokość poprowadzona do <b>sąsiedniego</b> boku?',['5 cm','3 cm','4 cm','nie da się obliczyć'],2,'Romb wygląda tak samo „z każdej strony” — jego boki są równe, więc obie wysokości też są równe: <b>4 cm</b>.'),
 q('rw5-8d','Jakie wysokości ma prostokąt o bokach <b>6 cm</b> i <b>4 cm</b>?',['6 cm i 6 cm','4 cm i 4 cm','10 cm i 10 cm','4 cm i 6 cm'],3,'W prostokącie sąsiednie boki są prostopadłe, więc boki są jednocześnie wysokościami: <b>4 cm i 6 cm</b>.'),
 // Który odcinek jest wysokością?
 quadQ('rw5-9a',heightPick(9, 60, 5, 4, [6.5, 8.5], ['a', 'b', 'c', 'd']),HQ,HA,0,HEX('a', 'b', 'c', 'd')),
 quadQ('rw5-9b',heightPick(8, 50, 5, 7.5, [3.8, 5.5], ['b', 'd', 'a', 'c']),HQ,HA,1,HEX('b', 'd', 'a', 'c')),
 quadQ('rw5-9c',heightPick(9, 65, 4.5, 3, [6, 8], ['c', 'a', 'd', 'b']),HQ,HA,2,HEX('c', 'a', 'd', 'b')),
 quadQ('rw5-9d',heightPick(10, 55, 4, 8, [3, 5], ['d', 'c', 'b', 'a']),HQ,HA,3,HEX('d', 'c', 'b', 'a')),
 // Wysokość w kratce
 quadQ('rw5-10a',gridPara({A: [1, 1], B: [6, 1], C: [8, 4], D: [3, 4]}, 'Równoległobok ABCD w kratce, bok AB poziomy'),GQ('1 cm'),['3 cm','5 cm','4 cm','2 cm'],0,'Wysokość do boku AB jest pionowa — od AB do CD są <b>3 kratki</b>, czyli <b>3 cm</b>. Ukośnego boku AD nie liczymy.'),
 quadQ('rw5-10b',gridPara({A: [1, 1], B: [5, 1], C: [9, 5], D: [5, 5]}, 'Równoległobok ABCD w kratce, bok AB poziomy'),GQ('1 cm'),['5 cm','4 cm','6 cm','3 cm'],1,'Liczymy kratki w pionie od prostej AB do prostej CD: <b>4 kratki</b>, czyli <b>4 cm</b>.'),
 quadQ('rw5-10c',gridPara({A: [2, 1], B: [2, 4], C: [7, 6], D: [7, 3]}, 'Równoległobok ABCD w kratce, bok AB pionowy'),GQ('1 cm'),['3 cm','4 cm','5 cm','6 cm'],2,'Bok AB jest pionowy, więc wysokość do niego jest <b>pozioma</b>: od AB do CD jest <b>5 kratek</b>, czyli <b>5 cm</b>.'),
 quadQ('rw5-10d',gridPara({A: [1, 1], B: [7, 1], C: [10, 5], D: [4, 5]}, 'Równoległobok ABCD w kratce, bok AB poziomy'),GQ('5 mm'),['4 cm','8 cm','3 cm','2 cm'],3,'Od AB do CD są <b>4 kratki</b> po 5 mm: 4 · 5 mm = 20 mm = <b>2 cm</b>.'),
 // Przekątne
 q('rw5-11a','Co można powiedzieć o <b>wszystkich bokach</b> rombu?',['równej długości','prostopadłe do siebie','różnej długości','dłuższe od przekątnych'],0,'Wszystkie boki rombu są <b>równej długości</b> — to właśnie odróżnia romb od innych równoległoboków.'),
 q('rw5-11b','Przekątne rombu mają <b>6 cm</b> i <b>10 cm</b>. Jak daleko od punktu ich przecięcia leży koniec <b>dłuższej</b> przekątnej?',['10 cm','5 cm','3 cm','8 cm'],1,'Przekątne dzielą się na połowy, więc od punktu przecięcia do końca dłuższej przekątnej jest 10 : 2 = <b>5 cm</b>.'),
 q('rw5-11c','Przekątne równoległoboku mają <b>8 cm</b> i <b>14 cm</b>. Na jakie odcinki punkt przecięcia dzieli <b>dłuższą</b> przekątną?',['8 cm i 6 cm','4 cm i 10 cm','7 cm i 7 cm','4 cm i 4 cm'],2,'Przekątne równoległoboku dzielą się nawzajem <b>na połowy</b>: 14 : 2 = 7, więc na odcinki <b>7 cm i 7 cm</b>.'),
 q('rw5-11d','Jak nazywa się romb, którego przekątne mają <b>równe długości</b>?',['prostokąt','trapez','romb nie może mieć równych przekątnych','kwadrat'],3,'Romb o równych przekątnych ma kąty proste, więc jest <b>kwadratem</b>.'),
 // Czwarty wierzchołek w kratce
 quadQ('rw5-12a',gridFourth({A: [1, 1], B: [6, 1], C: [8, 4]}, [[3, 4], [1, 4], [5, 4], [3, 6]]),DQ,DA,0,DEX('2 kratki w prawo i 3 w górę')),
 quadQ('rw5-12b',gridFourth({A: [3, 1], B: [8, 2], C: [7, 5]}, [[4, 6], [2, 4], [0, 5], [2, 6]]),DQ,DA,1,DEX('1 kratka w lewo i 3 w górę')),
 quadQ('rw5-12c',gridFourth({A: [1, 4], B: [4, 1], C: [8, 2]}, [[3, 5], [5, 7], [5, 5], [7, 6]]),DQ,DA,2,DEX('4 kratki w prawo i 1 w górę')),
 quadQ('rw5-12d',gridFourth({A: [5, 1], B: [8, 3], C: [5, 5]}, [[4, 3], [2, 5], [0, 1], [2, 3]]),DQ,DA,3,DEX('3 kratki w lewo i 2 w górę') + ' Ten równoległobok ma wszystkie boki równe — to romb.'),
 // Kąt przy przedłużonym boku
 quadQ('rw5-13a',quad({P: para(9, 50, 5), ext: {E: ['A', 'B', 2.5]}, arcs: [['A', 'E', 'D', '130°', '130°'], ['C', 'B', 'D', 'α']], desc: 'Równoległobok ABCD z bokiem AB przedłużonym za punkt A; kąt między przedłużeniem a bokiem AD ma 130°, kąt C oznaczony α'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt α?',['50°','130°','40°','230°'],0,'Kąt A równoległoboku jest przyległy do kąta 130°: 180° − 130° = 50°. Kąt C jest przeciwległy do A, więc α = <b>50°</b>.'),
 quadQ('rw5-13b',quad({P: para(8, 105, 5), ext: {F: ['A', 'D', 2.5]}, arcs: [['A', 'F', 'B', '75°', '75°'], ['B', 'A', 'C', 'β']], desc: 'Równoległobok ABCD z bokiem DA przedłużonym za punkt A; kąt między przedłużeniem a bokiem AB ma 75°, kąt B oznaczony β'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt β?',['105°','75°','15°','85°'],1,'Kąt A równoległoboku: 180° − 75° = 105°. Kąty A i B leżą przy boku AB: β = 180° − 105° = <b>75°</b>.'),
 quadQ('rw5-13c',quad({P: para(9, 62, 5), ext: {G: ['B', 'A', 2.5]}, arcs: [['B', 'G', 'C', '62°', '62°'], ['C', 'B', 'D', 'γ']], desc: 'Równoległobok ABCD z bokiem AB przedłużonym za punkt B; kąt między przedłużeniem a bokiem BC ma 62°, kąt C oznaczony γ'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt γ?',['118°','28°','62°','152°'],2,'Kąt B równoległoboku: 180° − 62° = 118°. Kąty B i C leżą przy boku BC: γ = 180° − 118° = <b>62°</b>.'),
 quadQ('rw5-13d',quad({P: para(9, 48, 5), ext: {H: ['C', 'D', 2.5]}, arcs: [['C', 'H', 'B', '132°', '132°'], ['D', 'A', 'C', 'δ']], desc: 'Równoległobok ABCD z bokiem DC przedłużonym za punkt C; kąt między przedłużeniem a bokiem CB ma 132°, kąt D oznaczony δ'}),'Czworokąt ABCD jest równoległobokiem. Ile stopni ma kąt δ?',['48°','42°','138°','132°'],3,'Kąt C równoległoboku: 180° − 132° = 48°. Kąty C i D leżą przy boku CD: δ = 180° − 48° = <b>132°</b>.'),
 // Jaki to czworokąt — po przekątnych
 q('rw5-14a',DIAG(', ale nie mają równych długości i nie są prostopadłe'),SHAPE4,0,'Przekątne dzielące się na połowy ma każdy równoległobok. Nie są równe — to nie prostokąt; nie są prostopadłe — to nie romb.'),
 q('rw5-14b',DIAG(' i są prostopadłe, ale mają różne długości'),SHAPE4,1,'Prostopadłe przekątne, które dzielą się na połowy, ma <b>romb</b>. Różne długości przekątnych oznaczają, że to nie kwadrat.'),
 q('rw5-14c',DIAG(' i mają równe długości, ale nie są prostopadłe'),SHAPE4,2,'Równe przekątne, które dzielą się na połowy, ma <b>prostokąt</b>. Nie są prostopadłe, więc to nie kwadrat.'),
 q('rw5-14d',DIAG(', mają równe długości i są prostopadłe'),SHAPE4,3,'Równe przekątne to cecha prostokąta, prostopadłe — rombu. Czworokąt, który jest i prostokątem, i rombem, to <b>kwadrat</b>.'),
 // Obwody — kilka kroków
 q('rw5-15a','Romb ma taki sam obwód jak prostokąt o bokach <b>7 cm</b> i <b>5 cm</b>. Ile ma bok rombu?',['6 cm','12 cm','24 cm','35 cm'],0,'Obwód prostokąta: 2 · 7 + 2 · 5 = 24 cm. Bok rombu: 24 : 4 = <b>6 cm</b>.'),
 q('rw5-15b','Dłuższy bok równoległoboku jest <b>3 razy dłuższy</b> od krótszego, a obwód wynosi <b>48 cm</b>. Jakie są boki?',['12 cm i 36 cm','6 cm i 18 cm','8 cm i 24 cm','4 cm i 12 cm'],1,'Dwa sąsiednie boki mają razem 48 : 2 = 24 cm. To 1 + 3 = 4 równe części po 6 cm. Boki: <b>6 cm i 18 cm</b>.'),
 q('rw5-15c','Jeden bok równoległoboku jest <b>o 5 cm dłuższy</b> od drugiego, a obwód wynosi <b>34 cm</b>. Jakie są boki?',['14,5 cm i 19,5 cm','12 cm i 17 cm','6 cm i 11 cm','5 cm i 10 cm'],2,'Dwa sąsiednie boki: 34 : 2 = 17 cm. Bez nadwyżki 5 cm zostaje 12 cm, czyli krótszy bok ma 6 cm, a dłuższy 11 cm. Boki: <b>6 cm i 11 cm</b>.'),
 q('rw5-15d','Z drutu o długości <b>1 m</b> wygięto romb i zostało <b>12 cm</b> drutu. Ile ma bok rombu?',['25 cm','28 cm','3 cm','22 cm'],3,'1 m = 100 cm. Na romb zużyto 100 − 12 = 88 cm, więc bok ma 88 : 4 = <b>22 cm</b>.'),
 // Kąty — zadania dla mistrzów
 q('rw5-16a','Jeden kąt równoległoboku jest <b>o 30° większy</b> od drugiego. Jakie miary mają kąt ostry i kąt rozwarty tego równoległoboku?',['75° i 105°','30° i 150°','60° i 90°','85° i 95°'],0,'Kąty przy jednym boku mają razem 180°. Bez nadwyżki 30° zostaje 150°, więc kąt ostry ma 150° : 2 = 75°, a rozwarty 75° + 30° = 105°: <b>75° i 105°</b>.'),
 q('rw5-16b','Kąt rozwarty rombu jest <b>2 razy większy</b> od kąta ostrego. Jakie miary mają te kąty?',['45° i 90°','60° i 120°','30° i 60°','90° i 180°'],1,'Kąt ostry i rozwarty mają razem 180°. To 1 + 2 = 3 równe części: 180° : 3 = 60°. Kąty: <b>60° i 120°</b>.'),
 q('rw5-16c','Przekątna rombu tworzy z jego bokiem kąt <b>35°</b>. Jakie miary mają kąty tego rombu?',['35° i 145°','35° i 55°','70° i 110°','55° i 125°'],2,'Przekątna rombu jest jego osią symetrii, więc dzieli kąt na dwie równe części. Kąt rombu: 2 · 35° = 70°, a drugi 180° − 70° = 110°: <b>70° i 110°</b>.'),
 q('rw5-16d','Dwa kąty równoległoboku mają razem <b>100°</b>. Jakie miary mają kąty tego równoległoboku?',['100° i 80°','40° i 140°','20° i 160°','50° i 130°'],3,'Kąty przy jednym boku mają razem 180°, więc te dwa kąty muszą być <b>przeciwległe</b>, czyli równe: 100° : 2 = 50°. Pozostałe: 180° − 50° = 130°. Kąty: <b>50° i 130°</b>.'),
];
