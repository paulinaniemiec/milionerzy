// Klasy 7 i 8: potęgi — zadania z egzaminów ósmoklasisty i gimnazjalnych oraz materiałów CKE
// ze strony https://matematykaszkolna.pl/strona/5543.html. Treść i odpowiedzi jak w oryginale. Zmiany wymuszone przez grę (4 odpowiedzi):
// zadania „Uzupełnij zdania” (A/B oraz C/D) mają 4 kombinacje, zadania P/F — 4 oceny, w zadaniach z odpowiedziami A–E pominięto
// jedną błędną odpowiedź, dwa zadania otwarte zamieniono na wybór A–D. Pominięto 2 zadania z potęgami o wykładniku ujemnym
// (listopad 2012, grudzień 2011) — w klasach 7–8 ujemny wykładnik występuje tylko przy liczbie 10. Kolejność od łatwiejszych do trudniejszych (`ordered`).
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id, q:text, answers, correct, explain});
const p = (base, exp) => `${base}<sup>${exp}</sup>`;
const f = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const box = (a, b) => `<span style="display:inline-block;border:1.5px solid currentColor;padding:0 .35em;font-weight:bold">${a} | ${b}</span>`;
const opts = (...items) => `<div class="task-statements">${items.join('&emsp;&emsp;')}</div>`;
const CHOOSE = '<b>Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.</b><br>';
const FILL = (lead) => `<b>${lead} Wybierz odpowiedź spośród oznaczonych literami A i B oraz odpowiedź spośród oznaczonych literami C i D.</b><br>`;
const PFQ = '<b>Oceń prawdziwość podanych zdań. Wybierz P, jeśli zdanie jest prawdziwe, albo F – jeśli jest fałszywe.</b>';
const AC = ['A i C', 'A i D', 'B i C', 'B i D'];
const PF = ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'];
const tf = (a, b) => `<div class="task-statements">I. ${a}<br>II. ${b}</div>`;
const rows = (list) => `<div class="task-table-wrap"><table class="task-table"><tbody>${list.map(([n, v]) => `<tr><th scope="row">${n}</th><td>${v}</td></tr>`).join('')}</tbody></table></div>`;
const square = `<div class="task-table-wrap"><table class="task-table" style="width:auto;margin:0 auto"><tbody>${[[p(5,6),'5',p(5,8)],[p(5,7),p(5,5),''],[p(5,2),'<span aria-label="pole zacienione">▒</span>','']].map(r => `<tr>${r.map(c => `<td style="min-width:2.6em;text-align:center${c.includes('▒') ? ';background:#bbb;color:#bbb' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const m2 = (s) => `(${s})`;

export const powerExamQuestions = [
 // kwiecień 2013
 q('pw-3816',`Dane są liczby: <i>a</i> = ${p('(−2)',12)}, <i>b</i> = ${p('(−2)',11)}, <i>c</i> = ${p(2,10)}.<br><b>Dokończ zdanie tak, aby otrzymać zdanie prawdziwe.</b><br>Liczby te uporządkowane od najmniejszej do największej to:`,
  ['<i>c</i>, <i>b</i>, <i>a</i>','<i>a</i>, <i>b</i>, <i>c</i>','<i>c</i>, <i>a</i>, <i>b</i>','<i>b</i>, <i>c</i>, <i>a</i>'],3,
  `${p('(−2)',11)} ma nieparzysty wykładnik, więc jest ujemna: <i>b</i> = −2048. Pozostałe są dodatnie: <i>c</i> = ${p(2,10)} = 1024 i <i>a</i> = ${p(2,12)} = 4096. Kolejność: <b><i>b</i>, <i>c</i>, <i>a</i></b>.`),
 // marzec 2020
 q('pw-5286',`Marta przygotowała dwa żetony takie, że suma liczb zapisanych na obu stronach każdego żetonu jest równa zero. Widok jednej ze stron tych żetonów: <b>żeton 1: −${p(5,2)}</b>, <b>żeton 2: ${p('(−2)',3)}</b>.<br><b>Jakie liczby znajdują się na niewidocznych stronach tych żetonów? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['−25 i −8','−25 i 8','25 i −8','25 i 8'],3,
  `−${p(5,2)} = −25 (do potęgi podnosimy tylko 5), więc na drugiej stronie jest 25. ${p('(−2)',3)} = −8, więc na drugiej stronie jest 8. Odpowiedź: <b>25 i 8</b>.`),
 // kwiecień 2014
 q('pw-4022',`Dane są liczby: 3, ${p(3,4)}, ${p(3,12)}.<br><b>Dokończ zdanie tak, aby otrzymać zdanie prawdziwe.</b><br>Iloczyn tych liczb jest równy`,
  [p(3,16),p(3,17),p(3,48),p(3,49)],1,
  `3 = ${p(3,1)}. Przy mnożeniu potęg o tej samej podstawie dodajemy wykładniki: 1 + 4 + 12 = 17, więc iloczyn to <b>${p(3,17)}</b>.`),
 // maj 2026
 q('pw-8049',`${CHOOSE}Wartość wyrażenia ${p(2,5)} · 3 · ${p(3,4)} · ${p(2,3)} jest równa wartości wyrażenia`,
  [`${p(2,8)} · ${p(3,5)}`,`${p(4,8)} · ${p(9,5)}`,`${p(2,15)} · ${p(3,4)}`,`${p(4,15)} · ${p(9,4)}`],0,
  `Grupujemy potęgi o tej samej podstawie: ${p(2,5)} · ${p(2,3)} = ${p(2,8)} oraz 3 · ${p(3,4)} = ${p(3,5)}. Wynik: <b>${p(2,8)} · ${p(3,5)}</b>.`),
 // maj 2024
 q('pw-7432',`${PFQ}${tf(`Iloczyn 3 · ${p(9,5)} jest równy wartości wyrażenia ${p(3,11)}.`,`Wyrażenie ${f(`${p(2,8)} · ${p(2,7)}`,p(2,10))} można zapisać w postaci ${p(2,5)}.`)}`,
  PF,0,
  `I: ${p(9,5)} = ${p(3,10)}, więc 3 · ${p(3,10)} = ${p(3,11)} — <b>P</b>. II: ${p(2,8)} · ${p(2,7)} = ${p(2,15)}, a ${p(2,15)} : ${p(2,10)} = ${p(2,5)} — <b>P</b>.`),
 // czerwiec 2025
 q('pw-7841',`${PFQ}${tf(`Iloraz ${p(9,4)} : ${p(3,2)} jest równy ${p(3,2)}.`,`Liczba ${p(3,8)} jest trzy razy większa od iloczynu ${p(3,5)} · ${p(3,2)}.`)}`,
  PF,2,
  `I: ${p(9,4)} = ${p(3,8)}, a ${p(3,8)} : ${p(3,2)} = ${p(3,6)}, nie ${p(3,2)} — <b>F</b>. II: ${p(3,5)} · ${p(3,2)} = ${p(3,7)}, a ${p(3,8)} = 3 · ${p(3,7)} — <b>P</b>.`),
 // maj 2025
 q('pw-7766',`${CHOOSE}Wartość wyrażenia ${p(8,6)} : ${p(4,3)} zapisana w postaci potęgi liczby 2 jest równa`,
  [p(2,2),p(2,3),p(2,4),p(2,12)],3,
  `8 = ${p(2,3)} i 4 = ${p(2,2)}, więc ${p(8,6)} = ${p(2,18)} i ${p(4,3)} = ${p(2,6)}. Iloraz: ${p(2,18)} : ${p(2,6)} = <b>${p(2,12)}</b>.`),
 // czerwiec 2022
 q('pw-7342',`${CHOOSE}Liczba ${p(3,5)} · ${p(9,6)} jest równa`,
  [p(27,30),p(27,11),p(3,17),p(3,13)],2,
  `${p(9,6)} = ${p(m2(p(3,2)),6)} = ${p(3,12)}. Zatem ${p(3,5)} · ${p(3,12)} = <b>${p(3,17)}</b>.`),
 // czerwiec 2023
 q('pw-7357',`${PFQ}${tf(`Wartość wyrażenia ${p(m2(p(4,4)),3)} jest równa ${p(4,7)}.`,`Wartości wyrażeń ${p(5,3)} · ${p(10,3)} oraz ${p(5,6)} · ${p(2,3)} są równe.`)}`,
  PF,2,
  `I: przy potędze potęgi mnożymy wykładniki: ${p(m2(p(4,4)),3)} = ${p(4,12)}, nie ${p(4,7)} — <b>F</b>. II: ${p(10,3)} = ${p(2,3)} · ${p(5,3)}, więc ${p(5,3)} · ${p(10,3)} = ${p(5,6)} · ${p(2,3)} — <b>P</b>.`),
 // czerwiec 2020
 q('pw-7298',`${FILL('Uzupełnij poniższe zdania.')}Wartość wyrażenia ${p('(−2)',4)} : ${p('(−2)',3)} jest równa ${box('A','B')}.${opts('<b>A.</b> −2','<b>B.</b> 2')}Wartość wyrażenia ${p('(−2)',2)} · ${p('(−2)',3)} jest równa ${box('C','D')}.${opts(`<b>C.</b> ${p('(−4)',5)}`,`<b>D.</b> ${p('(−2)',5)}`)}`,
  AC,1,
  `${p('(−2)',4)} : ${p('(−2)',3)} = ${p('(−2)',1)} = −2 — <b>A</b> (16 : (−8) = −2). ${p('(−2)',2)} · ${p('(−2)',3)} = ${p('(−2)',5)} — <b>D</b>. Podstawa się nie zmienia, dodajemy wykładniki.`),
 // styczeń 2026
 q('pw-7916',`${CHOOSE}Wartość wyrażenia ${p(4,3)} − ${p(8,2)} : ${p(2,4)} jest równa`,
  ['0','10','56','60'],3,
  `Najpierw potęgi, potem dzielenie, na końcu odejmowanie: ${p(4,3)} = 64, ${p(8,2)} : ${p(2,4)} = 64 : 16 = 4. Wynik: 64 − 4 = <b>60</b>. Wynik 0 to błędne odjęcie przed dzieleniem.`),
 // czerwiec 2024
 q('pw-7492',`${PFQ}${tf(`${p(m2(f(1,5)),8)} &gt; ${p(m2(f(1,5)),6)}`,`${p(2,2)} · ${p(m2(f(1,2)),2)} = ${p('(−2)',3)} · ${p(m2('−'+f(1,2)),3)}`)}`,
  PF,2,
  `I: mnożenie przez ${f(1,5)} zmniejsza liczbę dodatnią, więc im większy wykładnik, tym mniejsza potęga: ${p(m2(f(1,5)),8)} &lt; ${p(m2(f(1,5)),6)} — <b>F</b>. II: lewa strona ${p(m2(`2 · ${f(1,2)}`),2)} = 1, prawa ${p(m2(`(−2) · (−${f(1,2)})`),3)} = ${p(1,3)} = 1 — <b>P</b>.`),
 // kwiecień 2020 (pominięto odpowiedź D. (3⁵)³)
 q('pw-5368',`<b>Która z podanych niżej liczb <u>nie jest</u> równa ${p(3,15)}? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  [`3 · ${p(3,14)}`,`${p(3,9)} · ${p(3,6)}`,`${p(3,17)} : 9`,`${p(9,15)} : 3`],3,
  `3 · ${p(3,14)} = ${p(3,15)}, ${p(3,9)} · ${p(3,6)} = ${p(3,15)}, ${p(3,17)} : ${p(3,2)} = ${p(3,15)}. Natomiast ${p(9,15)} = ${p(3,30)}, więc <b>${p(9,15)} : 3</b> = ${p(3,29)}.`),
 // kwiecień 2012
 q('pw-3432',`<b>Dokończ zdanie tak, aby otrzymać zdanie prawdziwe.</b><br>Liczba ${f(`${p(3,2)} + ${p(3,2)} + ${p(3,2)}`,p(3,3))} jest równa`,
  [p(3,0),p(3,1),p(3,2),p(3,3)],0,
  `W liczniku są trzy jednakowe składniki: 3 · ${p(3,2)} = ${p(3,3)}. Zatem ${f(p(3,3),p(3,3))} = 1 = <b>${p(3,0)}</b>. Dodawanie potęg to nie mnożenie — ${p(3,2)} + ${p(3,2)} + ${p(3,2)} ≠ ${p(3,6)}.`),
 // maj 2023
 q('pw-6990',`${FILL('Uzupełnij poniższe zdania.')}Iloraz ${f(p(10,8),p(5,8))} jest równy ${box('A','B')}.${opts(`<b>A.</b> ${p(5,8)}`,`<b>B.</b> ${p(2,8)}`)}Iloczyn ${p(2,6)} · ${p(25,3)} jest równy ${box('C','D')}.${opts(`<b>C.</b> ${p(50,9)}`,`<b>D.</b> ${p(10,6)}`)}`,
  AC,3,
  `Potęgi o tym samym wykładniku dzielimy, dzieląc podstawy: ${p(m2('10 : 5'),8)} = ${p(2,8)} — <b>B</b>. ${p(25,3)} = ${p(5,6)}, więc ${p(2,6)} · ${p(5,6)} = ${p(10,6)} — <b>D</b>.`),
 // czerwiec 2021
 q('pw-7317',`${FILL('Uzupełnij zdania.')}Wartość wyrażenia ${f(p(27,6),p(3,6))} jest równa ${box('A','B')}.${opts(`<b>A.</b> ${p(3,2)}`,`<b>B.</b> ${p(3,12)}`)}Wartość wyrażenia ${f(p(25,8),p(5,4))} jest równa ${box('C','D')}.${opts(`<b>C.</b> ${p(5,4)}`,`<b>D.</b> ${p(5,12)}`)}`,
  AC,3,
  `${p(27,6)} = ${p(3,18)}, a ${p(3,18)} : ${p(3,6)} = ${p(3,12)} — <b>B</b>. ${p(25,8)} = ${p(5,16)}, a ${p(5,16)} : ${p(5,4)} = ${p(5,12)} — <b>D</b>.`),
 // marzec 2021
 q('pw-5522',`${CHOOSE}Wartość wyrażenia ${f(p(6,8),p(2,4))} jest równa`,
  [p(3,2),p(3,4),`${p(2,2)} · ${p(3,8)}`,`${p(2,4)} · ${p(3,8)}`],3,
  `${p(6,8)} = ${p(2,8)} · ${p(3,8)}. Dzielimy przez ${p(2,4)}: ${p(2,8)} : ${p(2,4)} = ${p(2,4)}, więc wynik to <b>${p(2,4)} · ${p(3,8)}</b>.`),
 // grudzień 2024
 q('pw-7599',`${PFQ}${tf(`Wartość wyrażenia ${p(5,2)} · ${p(5,3)} · ${p(5,5)} jest równa ${p(m2(p(5,5)),2)}.`,`Wyrażenia ${f(`${p(2,3)} · ${p(3,3)}`,6)} oraz ${p(m2(`${f(12,5)} : ${f(2,5)}`),2)} mają taką samą wartość.`)}`,
  PF,0,
  `I: ${p(5,2)} · ${p(5,3)} · ${p(5,5)} = ${p(5,10)} i ${p(m2(p(5,5)),2)} = ${p(5,10)} — <b>P</b>. II: ${p(2,3)} · ${p(3,3)} = ${p(6,3)} = 216, a 216 : 6 = 36; ${f(12,5)} : ${f(2,5)} = 6, a ${p(6,2)} = 36 — <b>P</b>.`),
 // czerwiec 2026
 q('pw-8174',`W tabeli zapisano cztery wyrażenia arytmetyczne:${rows([['I',`${p(2,24)} : 2`],['II',`${p(4,12)} · 4`],['III',`${p(2,25)} : 8`],['IV',p(m2('4 · 8'),4)]])}<b>Które z tych wyrażeń ma największą wartość? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['I','II','III','IV'],1,
  `Wszystko jako potęgi dwójki: I = ${p(2,23)}, II = ${p(4,13)} = ${p(2,26)}, III = ${p(2,25)} : ${p(2,3)} = ${p(2,22)}, IV = ${p(32,4)} = ${p(2,20)}. Największe jest <b>II</b>.`),
 // maj 2021
 q('pw-5621',`Z reguł działań na potęgach wynika, że:<div class="task-statements">${p('(200 000)',3)} = ${p('(2 · 100 000)',3)} = ${p('(2 · 10<sup>5</sup>)',3)} = ${p(2,3)} · ${p(10,15)}</div>${CHOOSE}Z tych samych reguł wynika, że liczba ${p('(60 000 000)',3)} jest równa`,
  [`${p(6,3)} · ${p(10,21)}`,`6 · ${p(10,21)}`,`${p(6,3)} · ${p(10,10)}`,`6 · ${p(10,10)}`],0,
  `60 000 000 = 6 · ${p(10,7)}, więc ${p('(6 · 10<sup>7</sup>)',3)} = ${p(6,3)} · ${p(10,21)}. Do potęgi podnosimy oba czynniki: <b>${p(6,3)} · ${p(10,21)}</b>.`),
 // maj 2022
 q('pw-6489',`Dane są trzy liczby:<div class="task-statements"><i>x</i> = ${f(`${p(10,30)} · ${p(10,70)}`,10)}&emsp;&emsp;<i>y</i> = ${p(m2(p(10,3)),15)} · ${p(10,60)}&emsp;&emsp;<i>z</i> = ${p(10,50)} · ${f(p(10,80),p(10,20))}</div><b>Która z tych liczb jest <u>mniejsza</u> od liczby ${p(10,100)}? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['Tylko <i>x</i>.','Tylko <i>y</i>.','Tylko <i>z</i>.','Każda z liczb <i>x</i>, <i>y</i>, <i>z</i>.'],0,
  `<i>x</i> = ${p(10,100)} : 10 = ${p(10,99)}, <i>y</i> = ${p(10,45)} · ${p(10,60)} = ${p(10,105)}, <i>z</i> = ${p(10,50)} · ${p(10,60)} = ${p(10,110)}. Mniejsza od ${p(10,100)} jest <b>tylko <i>x</i></b>.`),
 // kwiecień 2019
 q('pw-5258',`W tabeli zapisano trzy wyrażenia.${rows([['I',`${p(5,2)} · ${p(10,8)} · ${p(5,4)}`],['II',`(${p(5,10)} : ${p(5,2)}) · ${p(10,8)}`],['III',`${p(2,8)} · ${p(5,8)} · ${p(5,8)}`]])}<b>Które z tych wyrażeń są równe ${p(50,8)}? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['Tylko I i II.','Tylko II i III.','Tylko II.','Tylko III.'],1,
  `${p(50,8)} = ${p(10,8)} · ${p(5,8)} = ${p(2,8)} · ${p(5,16)}. I: ${p(5,6)} · ${p(10,8)} = ${p(2,8)} · ${p(5,14)} — nie. II: ${p(5,8)} · ${p(10,8)} — tak. III: ${p(2,8)} · ${p(5,16)} — tak. Odpowiedź: <b>Tylko II i III</b>.`),
 // materiały CKE (pominięto odpowiedź A. −2)
 q('pw-5867',`${CHOOSE}Najmniejszą liczbą całkowitą większą od liczby ${p(m2(`−1${f(2,3)}`),2)} jest`,
  ['−1','1','2','3'],3,
  `−1${f(2,3)} = −${f(5,3)}, a kwadrat liczby ujemnej jest dodatni: ${f(25,9)} = 2${f(7,9)}. Najmniejsza liczba całkowita większa od 2${f(7,9)} to <b>3</b>.`),
 // grudzień 2017
 q('pw-5410',`Narysowany kwadrat należy wypełnić tak, aby iloczyny liczb w każdym wierszu, każdej kolumnie i na obu przekątnych kwadratu były takie same.${square}${PFQ}${tf(`Iloczyn liczb na przekątnej kwadratu jest równy ${p(5,15)}.`,`W zacieniowane pole kwadratu należy wpisać liczbę ${p(5,9)}.`)}`,
  PF,0,
  `Pierwszy wiersz: ${p(5,6)} · 5 · ${p(5,8)} = ${p(5,15)}, więc każdy iloczyn (także na przekątnej) to ${p(5,15)} — <b>P</b>. Środkowa kolumna: 5 · ${p(5,5)} · □ = ${p(5,15)}, więc □ = ${p(5,9)} — <b>P</b>.`),
 // materiały CKE, zadanie otwarte (zamienione na wybór A–D)
 q('pw-5870',`<b>Oblicz wartość wyrażenia</b> ${f(p(36,6),`${p(27,5)} · ${p(8,5)}`)}.`,
  [f(1,6),f(1,216),'216',f(1,36)],1,
  `${p(36,6)} = ${p(m2(p(6,2)),6)} = ${p(6,12)}. ${p(27,5)} · ${p(8,5)} = ${p(m2('27 · 8'),5)} = ${p(216,5)} = ${p(m2(p(6,3)),5)} = ${p(6,15)}. Zatem ${f(p(6,12),p(6,15))} = ${f(1,p(6,3))} = <b>${f(1,216)}</b>.`),
 // materiały CKE
 q('pw-5868',`${PFQ}${tf(`Wartość wyrażenia 12 · ${p(7,13)} jest większa od wartości wyrażenia 13 · ${p(7,12)}.`,`Liczba ${p(3,50)} jest większa od liczby ${p(6,25)}.`)}`,
  PF,0,
  `I: 12 · ${p(7,13)} = 12 · 7 · ${p(7,12)} = 84 · ${p(7,12)}, a to więcej niż 13 · ${p(7,12)} — <b>P</b>. II: ${p(3,50)} = ${p(m2(p(3,2)),25)} = ${p(9,25)}, a ${p(9,25)} &gt; ${p(6,25)} — <b>P</b>.`),
 // kwiecień 2016
 q('pw-4592',`Dane są liczby:<div class="task-statements">I. ${p(25,41)}&emsp;&emsp;II. ${p(125,41)}&emsp;&emsp;III. ${p(2,862)}&emsp;&emsp;IV. ${p(5,431)}</div><b>Która z tych liczb jest największa? Wybierz właściwą odpowiedź spośród podanych.</b>`,
  ['I','II','III','IV'],3,
  `I = ${p(5,82)}, II = ${p(5,123)} — obie mniejsze od ${p(5,431)}. III = ${p(m2(p(2,2)),431)} = ${p(4,431)}, a ${p(4,431)} &lt; ${p(5,431)}. Największa jest <b>IV</b>.`),
 // materiały CKE, zadanie otwarte (zamienione na wybór A–D)
 q('pw-5872',`Powierzchnię metali można chronić, stosując powłoki z innych metali, np. ze złota. Blaszkę o powierzchni <i>S</i> = 0,001 m² pokryto warstwą złota o grubości <i>y</i> = 0,000001 m. Gęstość złota wynosi <i>d</i> = 19 300 kg/m³. Gęstość ciała wyraża się wzorem <i>d</i> = <i>m</i>/<i>V</i>, gdzie <i>m</i> jest masą ciała, a <i>V</i> jest jego objętością.<br><b>Oblicz masę złotej powłoki, którą pokryto blaszkę. Wynik zapisz w notacji wykładniczej <i>a</i> · 10<sup><i>k</i></sup>, gdzie 1 ≤ <i>a</i> &lt; 10.</b>`,
  [`1,93 · ${p(10,'−8')} kg`,`1,93 · ${p(10,'−4')} kg`,`1,93 · ${p(10,'−5')} kg`,`1,93 · ${p(10,'−2')} kg`],2,
  `Objętość powłoki: <i>V</i> = <i>S</i> · <i>y</i> = ${p(10,'−3')} · ${p(10,'−6')} = ${p(10,'−9')} m³. Masa: <i>m</i> = <i>d</i> · <i>V</i> = 1,93 · ${p(10,4)} · ${p(10,'−9')} = <b>1,93 · ${p(10,'−5')} kg</b>.`),
];
