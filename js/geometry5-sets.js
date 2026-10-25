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
