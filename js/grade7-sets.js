// Klasa 7: potęgi o wykładniku naturalnym — ułamki, liczby ujemne, wykładnik 0 i 1, potęgi liczby 10, zadania tekstowe.
// Podpunkty jednego zadania mają wspólną grupę: p7-2a i p7-2b to jedno zadanie.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id.replace(/[a-z]$/, ''), q:text, answers, correct, explain});
const p = (base, exp) => `${base}<sup>${exp}</sup>`;
const f = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const m = (whole, a, b) => `${whole}${f(a, b)}`;
const calc = (e) => `Oblicz: <b>${e}</b>`;
const pair = (id, a, b, truth, explain) => q(id, `Czy podane równości są prawdziwe?<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
const ten = (text) => `Zapisz liczbę <b>${text}</b> jako potęgę liczby 10.`;
const SIGN = 'Liczba ujemna podniesiona do potęgi parzystej daje wynik dodatni, a do nieparzystej — ujemny.';

export const powerQuestions7 = [
 q('p7-1a',calc(p(3,4)), ['12','27','64','81'],3,`3 · 3 · 3 · 3 = 9 · 9 = <b>81</b>. Wynik 12 to 3 · 4 — wykładnika nie mnożymy przez podstawę.`),
 q('p7-1b',calc(p(2,5)), ['10','25','32','64'],2,'2 · 2 · 2 · 2 · 2: 2, 4, 8, 16, <b>32</b>. 25 to 5², czyli zamienione podstawa z wykładnikiem.'),
 q('p7-2a',calc(p('0,3',2)), ['0,9','0,09','0,6','0,06'],1,'0,3 · 0,3 = <b>0,09</b>. Iloczyn ma tyle miejsc po przecinku, ile czynniki razem: 1 + 1 = 2.'),
 q('p7-2b',calc(p('0,2',3)), ['0,6','0,08','0,008','0,8'],2,'0,2 · 0,2 · 0,2 = 0,04 · 0,2 = <b>0,008</b> (3 miejsca po przecinku).'),
 q('p7-2c',calc(p('1,1',2)), ['1,21','2,2','1,1','12,1'],0,'1,1 · 1,1 = <b>1,21</b>. Wynik 2,2 to 1,1 · 2.'),
 q('p7-3a',calc(p(`(${f(2,5)})`,2)), [f(4,10),f(4,25),f(2,25),f(4,5)],1,`Do potęgi podnosimy licznik i mianownik: ${f(`${p(2,2)}`,`${p(5,2)}`)} = <b>${f(4,25)}</b>.`),
 q('p7-3b',calc(p(`(${f(3,4)})`,3)), [f(9,12),f(27,64),f(9,64),f(27,4)],1,`${f(p(3,3),p(4,3))} = <b>${f(27,64)}</b>. Mianownik też podnosimy do potęgi — dlatego ${f(27,4)} to błąd.`),
 q('p7-4a',calc(p(`(${m(1,1,3)})`,2)), [m(1,1,9),m(1,7,9),m(2,2,3),m(1,2,3)],1,`Najpierw zamieniamy na ułamek niewłaściwy: ${m(1,1,3)} = ${f(4,3)}. Potem ${f(16,9)} = <b>${m(1,7,9)}</b>. Nie wolno osobno podnosić części całkowitej i ułamka (1 + ${f(1,9)}).`),
 q('p7-4b',calc(p(`(${m(2,1,2)})`,3)), [m(8,1,8),m(15,5,8),m(7,1,2),m(6,1,4)],1,`${m(2,1,2)} = ${f(5,2)}, więc ${f(p(5,3),p(2,3))} = ${f(125,8)} = <b>${m(15,5,8)}</b>. ${m(8,1,8)} to błąd: osobno 2³ i (½)³.`),
 q('p7-5a',calc(p(37,0)), ['0','1','37','370'],1,'Każda liczba różna od zera podniesiona do potęgi 0 daje <b>1</b>.'),
 q('p7-5b',calc(p(`(−${m(4,2,7)})`,0)), ['0','1','−1',`−${m(4,2,7)}`],1,'Wykładnik 0 daje <b>1</b> dla każdej podstawy różnej od zera — także ujemnej i ułamkowej.'),
 q('p7-6a',calc(p('0,48',1)), ['0,48','1','0,4','0,2304'],0,'Potęga o wykładniku 1 jest równa swojej podstawie: <b>0,48</b>. 0,2304 to 0,48².'),
 q('p7-6b',calc(p('(−9)',1)), ['9','1','−9','81'],2,'Wykładnik 1 nie zmienia liczby ani jej znaku: <b>−9</b>.'),
 q('p7-7a',calc(p('(−3)',4)), ['−81','81','−12','12'],1,`(−3) · (−3) · (−3) · (−3) = 9 · 9 = <b>81</b>. ${SIGN}`),
 q('p7-7b',calc(p('(−2)',5)), ['32','−32','−10','10'],1,`2⁵ = 32, a wykładnik 5 jest nieparzysty, więc wynik jest ujemny: <b>−32</b>.`),
 q('p7-8a',calc(`−${p(5,2)}`), ['25','−25','−10','10'],1,`Bez nawiasu do kwadratu podnosimy tylko 5, a minus zostaje przed wynikiem: −(5 · 5) = <b>−25</b>. Inaczej niż (−5)² = 25.`),
 q('p7-8b',calc(`−${p('(−2)',3)}`), ['−8','8','6','−6'],1,'(−2)³ = −8, a minus przed potęgą zmienia znak wyniku: −(−8) = <b>8</b>.'),
 q('p7-9a',calc(p('(−0,5)',2)), ['−0,25','0,25','−1','1'],1,`(−0,5) · (−0,5) = <b>0,25</b>. Wykładnik parzysty, więc wynik jest dodatni.`),
 q('p7-9b',calc(p('(−0,1)',3)), ['0,001','−0,001','−0,3','−0,01'],1,'0,1³ = 0,001, a wykładnik 3 jest nieparzysty: <b>−0,001</b>.'),
 q('p7-10a',calc(p('(−1)',101)), ['1','−1','101','−101'],1,'Iloczyn minus jedynek daje 1 lub −1. Wykładnik 101 jest nieparzysty, więc <b>−1</b>.'),
 q('p7-10b',calc(p('(−1)',64)), ['1','−1','64','−64'],0,'Wykładnik 64 jest parzysty — minus jedynki łączą się w pary i dają <b>1</b>.'),
 pair('p7-11',`−${p(3,4)} = ${p('(−3)',4)}`,`−${p(5,3)} = ${p('(−5)',3)}`,'FP',`I: −3⁴ = −81, a (−3)⁴ = 81 — <b>fałsz</b>. II: −5³ = −125 i (−5)³ = −125 — <b>prawda</b>, bo przy nieparzystym wykładniku oba zapisy dają ten sam wynik.`),
 pair('p7-12',`${p(15,0)} = ${p(1,15)}`,`${p(`(${f(2,3)})`,3)} = ${f(p(2,3),3)}`,'PF',`I: 15⁰ = 1 i 1¹⁵ = 1 — <b>prawda</b>. II: (${f(2,3)})³ = ${f(8,27)}, a ${f(p(2,3),3)} = ${f(8,3)} — <b>fałsz</b>: mianownik też trzeba podnieść do potęgi.`),
 pair('p7-13',`${p(4,3)} = ${p(8,2)}`,`${p(2,4)} = ${p(4,2)}`,'PP','I: 4³ = 64 i 8² = 64 — <b>prawda</b>. II: 2⁴ = 16 i 4² = 16 — <b>prawda</b>. Takie równości to wyjątki — zwykle zamiana podstaw i wykładników zmienia wynik.'),
 pair('p7-14',`${p(6,0)} = ${p(0,6)}`,`${p(2,3)} = ${p(3,2)}`,'FF','I: 6⁰ = 1, a 0⁶ = 0 — <b>fałsz</b>. II: 2³ = 8, a 3² = 9 — <b>fałsz</b>.'),
 q('p7-15a',ten('sto tysięcy'), [p(10,4),p(10,5),p(10,6),p(5,10)],1,`Sto tysięcy = 100 000 — jedynka i 5 zer, więc <b>${p(10,5)}</b>.`),
 q('p7-15b',ten('dziesięć miliardów'), [p(10,9),p(10,10),p(10,11),p(10,12)],1,`Miliard ma 9 zer (${p(10,9)}), a dziesięć miliardów — o jedno więcej: <b>${p(10,10)}</b>.`),
 q('p7-15c',ten('100 000 000'), [p(10,7),p(10,8),p(10,9),p(8,10)],1,`Liczymy zera: jest ich 8, więc <b>${p(10,8)}</b>.`),
 q('p7-15d',ten('jeden bilion'), [p(10,9),p(10,12),p(10,15),p(10,6)],1,`Milion to ${p(10,6)}, miliard ${p(10,9)}, a bilion — 1 000 000 000 000, czyli <b>${p(10,12)}</b>.`),
 q('p7-16',`Ile zer ma liczba <b>${p(10,20)}</b> zapisana w zwykły sposób?`, ['2','19','20','21'],2,`Wykładnik potęgi liczby 10 mówi, ile zer stoi po jedynce: <b>20</b>.`),
 q('p7-17',`Odległość Ziemi od Słońca wynosi około <b>150 000 000 km</b>. Który zapis jest równy tej liczbie?`, [`15 · ${p(10,6)}`,`150 · ${p(10,6)}`,`1,5 · ${p(10,6)}`,`15 · ${p(10,8)}`],1,`${p(10,6)} = 1 000 000, a 150 · 1 000 000 = <b>150 000 000</b>. Liczba 150 000 000 to 150 milionów.`),
 q('p7-18a',`Zapisz potęgę <b>${p(`(${m(2,3,4)})`,3)}</b> w postaci iloczynu.`, [`${m(2,3,4)} · ${m(2,3,4)} · ${m(2,3,4)}`,`${m(2,3,4)} · 3`,`2 · 2 · 2 · ${f(3,4)}`,`${m(2,3,4)} + ${m(2,3,4)} + ${m(2,3,4)}`],0,`Wykładnik 3 oznacza, że całą liczbę ${m(2,3,4)} mnożymy przez siebie 3 razy: <b>${m(2,3,4)} · ${m(2,3,4)} · ${m(2,3,4)}</b>.`),
 q('p7-18b',`Zapisz potęgę <b>${p('(−0,7)',4)}</b> w postaci iloczynu.`, ['(−0,7) · 4','−0,7 · 0,7 · 0,7 · 0,7','(−0,7) · (−0,7) · (−0,7) · (−0,7)','(−0,7) + (−0,7) + (−0,7) + (−0,7)'],2,'Nawias oznacza, że podstawą jest cała liczba −0,7 razem z minusem: <b>(−0,7) · (−0,7) · (−0,7) · (−0,7)</b>. Zapis −0,7 · 0,7 · 0,7 · 0,7 to −0,7⁴ — wynik ujemny.'),
 q('p7-18c',`Zapisz potęgę <b>${p('<i>y</i>',6)}</b> w postaci iloczynu.`, ['6 · <i>y</i>','<i>y</i> · <i>y</i> · <i>y</i> · <i>y</i> · <i>y</i> · <i>y</i>','<i>y</i> + <i>y</i> + <i>y</i> + <i>y</i> + <i>y</i> + <i>y</i>','<i>y</i> · <i>y</i> · <i>y</i> · <i>y</i> · <i>y</i>'],1,'Litera <i>y</i> występuje jako czynnik 6 razy: <b><i>y</i> · <i>y</i> · <i>y</i> · <i>y</i> · <i>y</i> · <i>y</i></b>. Suma sześciu <i>y</i> to 6<i>y</i> — inne wyrażenie.'),
 q('p7-19a','Zapisz iloczyn <b>(−1,5) · (−1,5) · (−1,5) · (−1,5)</b> w postaci potęgi.', [`−${p('1,5',4)}`,p('(−1,5)',4),p('(−1,5)',3),'4 · (−1,5)'],1,`Czynnik −1,5 powtarza się 4 razy, a minus należy do podstawy, więc potrzebny jest nawias: <b>${p('(−1,5)',4)}</b>. Bez nawiasu −1,5⁴ jest liczbą ujemną.`),
 q('p7-19b',`Zapisz iloczyn <b>${f(2,3)} · ${f(2,3)} · ${f(2,3)} · ${f(2,3)} · ${f(2,3)}</b> w postaci potęgi.`, [p(`(${f(2,3)})`,5),f(p(2,5),3),p(`(${f(2,3)})`,4),`5 · ${f(2,3)}`],0,`Ułamek ${f(2,3)} jest czynnikiem 5 razy: <b>${p(`(${f(2,3)})`,5)}</b>. Zapis ${f(p(2,5),3)} podnosi do potęgi tylko licznik.`),
 q('p7-20a',calc(`${p('2,5',2)} − ${p('1,5',2)}`), ['1','4','2','16'],1,'6,25 − 2,25 = <b>4</b>. Wynik 1 to (2,5 − 1,5)² — tak liczyć nie wolno.'),
 q('p7-20b',calc(`${p('1,2',2)} + ${p('0,8',2)}`), ['2,08','4','2,8','1,48'],0,'1,44 + 0,64 = <b>2,08</b>. Wynik 4 to (1,2 + 0,8)² — najpierw potęgujemy każdą liczbę osobno.'),
 q('p7-20c',calc(`${p(3,2)} − ${p('(−3)',2)}`), ['0','18','−18','12'],0,'3² = 9 i (−3)² = 9, więc 9 − 9 = <b>0</b>.'),
 q('p7-21',calc(`${p('(−1)',7)} + ${p('(−1)',8)} + ${p(1,9)}`), ['−1','1','3','0'],1,'(−1)⁷ = −1, (−1)⁸ = 1, 1⁹ = 1. Razem −1 + 1 + 1 = <b>1</b>.'),
 q('p7-22',calc(`${p(2,3)} · ${p(`(${f(1,2)})`,2)}`), ['2','4','1',f(1,2)],0,`2³ = 8 i (${f(1,2)})² = ${f(1,4)}. 8 · ${f(1,4)} = <b>2</b>.`),
 q('p7-23',calc(`${p('0,1',2)} · ${p(10,3)}`), ['10','1','100','0,1'],0,'0,1² = 0,01, a 10³ = 1000. 0,01 · 1000 = <b>10</b> (przecinek przesuwamy o 3 miejsca w prawo).'),
 q('p7-24','Która z liczb jest <b>ujemna</b>?', [p('(−5)',4),`−${p('(−2)',3)}`,p('(−0,3)',3),p('(−1)',100)],2,`(−5)⁴ = 625, −(−2)³ = 8, (−1)¹⁰⁰ = 1. Ujemna jest tylko <b>(−0,3)³ = −0,027</b> — liczba ujemna do nieparzystej potęgi.`),
 q('p7-25','Która liczba jest <b>największa</b>?', [p('0,9',2),p('0,9',3),'0,9',p('0,9',0)],3,`0,9² = 0,81, 0,9³ = 0,729, a 0,9⁰ = 1. Największa jest <b>${p('0,9',0)}</b>. Liczba mniejsza od 1 maleje, gdy podnosimy ją do coraz wyższej potęgi.`),
 q('p7-26','Która liczba jest <b>najmniejsza</b>?', [p('(−2)',3),p('(−2)',2),`−${p(2,2)}`,p('(−2)',0)],0,`(−2)³ = −8, (−2)² = 4, −2² = −4, (−2)⁰ = 1. Najmniejsza jest <b>${p('(−2)',3)}</b>.`),
 q('p7-27',`Porównaj liczby <b>${p(`(${f(3,5)})`,2)}</b> i <b>${f(p(3,2),5)}</b>.`, ['Pierwsza jest większa','Pierwsza jest mniejsza','Są równe','Nie da się ich porównać'],1,`(${f(3,5)})² = ${f(9,25)}, a ${f(p(3,2),5)} = ${f(9,5)}. Mianowniki: 25 > 5, więc <b>pierwsza liczba jest mniejsza</b>.`),
 q('p7-28','Pewne bakterie dzielą się co 20 minut — z jednej powstają dwie. Ile bakterii powstanie z jednej po 3 godzinach?', [`${p(2,9)} = 512`,`${p(2,3)} = 8`,`${p(9,2)} = 81`,'2 · 9 = 18'],0,`W 3 godzinach jest 180 : 20 = 9 podziałów. Po każdym liczba bakterii się podwaja: <b>${p(2,9)} = 512</b>.`),
 q('p7-29','Pierwszego dnia Ola wysłała wiadomość do 3 osób. Każda osoba, która ją dostała, następnego dnia wysyła ją do 3 nowych osób. Ile osób dostanie wiadomość czwartego dnia?', ['12','64','81','243'],2,`Dzień 1: 3, dzień 2: 3 · 3 = 9, dzień 3: 27, dzień 4: <b>${p(3,4)} = 81</b>.`),
 q('p7-30','Sześcienne pudełko ma krawędź długości 0,3 m. Ile wynosi jego objętość?', ['0,9 m<sup>3</sup>','0,09 m<sup>3</sup>','0,027 m<sup>3</sup>','0,27 m<sup>3</sup>'],2,`Objętość sześcianu to krawędź do sześcianu: ${p('0,3',3)} = 0,3 · 0,3 · 0,3 = <b>0,027 m<sup>3</sup></b>.`),
 q('p7-31',`Bok kwadratu ma długość <b>${m(1,1,2)} cm</b>. Ile wynosi jego pole?`, [`${m(2,1,4)} cm<sup>2</sup>`,`${m(1,1,4)} cm<sup>2</sup>`,'3 cm<sup>2</sup>','6 cm<sup>2</sup>'],0,`Pole to (${m(1,1,2)})² = (${f(3,2)})² = ${f(9,4)} = <b>${m(2,1,4)} cm<sup>2</sup></b>. 6 cm to obwód.`),
 q('p7-32','Kartkę papieru złożono na pół, potem jeszcze raz na pół — i tak 6 razy. Ile warstw papieru powstało?', ['12','32','36','64'],3,`Każde złożenie podwaja liczbę warstw: 2, 4, 8, 16, 32, 64. To <b>${p(2,6)} = 64</b>.`),
 q('p7-33a','Jaką liczbę trzeba wpisać w miejsce □, aby 2<sup>□</sup> = 64?', ['5','6','8','32'],1,`2, 4, 8, 16, 32, 64 — dwójkę mnożymy 6 razy: <b>${p(2,6)} = 64</b>.`),
 q('p7-33b','Jaką liczbę trzeba wpisać w miejsce □, aby (−3)<sup>□</sup> = −27?', ['2','3','4','9'],1,`(−3)³ = (−3) · (−3) · (−3) = −27. Wykładnik musi być nieparzysty, więc <b>3</b>.`),
 q('p7-33c',`Jaką liczbę trzeba wpisać w miejsce □, aby (${f(1,2)})<sup>□</sup> = ${f(1,32)}?`, ['4','5','16','32'],1,`32 = ${p(2,5)}, więc (${f(1,2)})⁵ = ${f(1,32)}. Odpowiedź: <b>5</b>.`),
];

// Klasa 7: potęgi o tych samych podstawach — mnożenie, dzielenie, potęga potęgi.
const pp = (base, exp) => p(`(${base})`, exp);
const X = (s) => `<i>${s}</i>`;
const one = (e, cond = '') => `Zapisz w postaci jednej potęgi: <b>${e}</b>${cond}.`;
const box = (e) => `Jaką liczbę należy wpisać w miejsce □, aby otrzymać równość <b>${e}</b>?`;
const ADD = 'Mnożąc potęgi o tych samych podstawach, wykładniki dodajemy';
const SUB = 'Dzieląc potęgi o tych samych podstawach, wykładniki odejmujemy';
const MUL = 'Potęgując potęgę, wykładniki mnożymy';
const RULES = [
 `${p(X('a'),X('n'))} · ${p(X('a'),X('m'))} = ${p(X('a'),`${X('n')} + ${X('m')}`)}`,
 `${p(X('a'),X('n'))} : ${p(X('a'),X('m'))} = ${p(X('a'),`${X('n')} − ${X('m')}`)}`,
 `${pp(p(X('a'),X('n')),X('m'))} = ${p(X('a'),`${X('n')} · ${X('m')}`)}`,
 'z żadnego z tych wzorów',
];
const rule = (id, e, correct, explain) => q(id, `Z którego wzoru można skorzystać, aby uprościć wyrażenie <b>${e}</b>?`, RULES, correct, explain);
const NO_SUM = 'Wzory działają tylko dla mnożenia, dzielenia i potęgowania. Sumy ani różnicy potęg nie da się zapisać jako jednej potęgi';
const cm = (e, n) => `${e} cm<sup>${n}</sup>`;

export const samePowerQuestions7 = [
 // Mnożenie potęg
 q('ps7-1a',one(`${p(3,4)} · ${p(3,5)}`), [p(3,20),p(3,9),p(9,9),p(6,9)],1,`${ADD}: 4 + 5 = 9, więc <b>${p(3,9)}</b>. Podstawa się nie zmienia — ${p(9,9)} i ${p(6,9)} to błąd, a ${p(3,20)} to pomnożone wykładniki.`),
 q('ps7-1b',one(`7 · ${p(7,3)} · ${p(7,6)}`), [p(7,9),p(7,10),p(7,18),p(49,10)],1,`Samo 7 to ${p(7,1)}. ${ADD}: 1 + 3 + 6 = 10, więc <b>${p(7,10)}</b>. ${p(7,9)} wychodzi, gdy zapomni się o tej jedynce.`),
 q('ps7-1c',one(`${pp('−2',3)} · ${pp('−2',5)}`), [pp('−2',8),pp('−2',15),pp('−2',2),p(4,8)],0,`${ADD}: 3 + 5 = 8. Podstawą jest cała liczba −2 razem z minusem, więc zostaje w nawiasie: <b>${pp('−2',8)}</b>.`),
 q('ps7-1d',one(`${pp(f(2,3),2)} · ${pp(f(2,3),4)} · ${f(2,3)}`), [pp(f(2,3),6),pp(f(2,3),8),pp(f(4,9),7),pp(f(2,3),7)],3,`Ostatni czynnik to ${pp(f(2,3),1)}. ${ADD}: 2 + 4 + 1 = 7, więc <b>${pp(f(2,3),7)}</b>.`),
 q('ps7-1e',one(`${p('0,4',6)} · ${p('0,4',0)} · ${p('0,4',2)}`), [p('0,4',8),p('0,4',9),p('0,4',12),p('1,2',8)],0,`${ADD}: 6 + 0 + 2 = 8, więc <b>${p('0,4',8)}</b>. ${p('0,4',0)} = 1, więc niczego nie zmienia — wykładnik 0 to nie 1.`),
 // Dzielenie potęg
 q('ps7-2a',one(`${p(5,12)} : ${p(5,4)}`), [p(5,3),p(5,8),p(5,16),p(5,48)],1,`${SUB}: 12 − 4 = 8, więc <b>${p(5,8)}</b>. Wykładników nie dzielimy (${p(5,3)}) ani nie mnożymy (${p(5,48)}).`),
 q('ps7-2b',one(`${pp('−6',11)} : ${pp('−6',8)}`), [pp('−6',3),p(6,3),pp('−6',19),pp('−6',88)],0,`${SUB}: 11 − 8 = 3. Minus należy do podstawy, więc zostaje w nawiasie: <b>${pp('−6',3)}</b>.`),
 q('ps7-2c',one(`${p('0,3',15)} : ${p('0,3',5)}`), [p('0,3',20),p('0,3',75),p('0,3',3),p('0,3',10)],3,`${SUB}: 15 − 5 = 10, więc <b>${p('0,3',10)}</b>.`),
 q('ps7-2d',one(`${pp(f(1,4),7)} : ${pp(f(1,4),2)}`), [pp(f(1,4),9),pp(f(1,4),5),pp(f(1,4),14),p(1,5)],1,`${SUB}: 7 − 2 = 5, więc <b>${pp(f(1,4),5)}</b>. Podstawa ${f(1,4)} się nie zmienia.`),
 q('ps7-2e',one(f(p(2,15),p(2,13))), [p(2,2),p(2,28),p(2,195),p(1,2)],0,`Kreska ułamkowa oznacza dzielenie: ${p(2,15)} : ${p(2,13)}. ${SUB}: 15 − 13 = 2, więc <b>${p(2,2)}</b>.`),
 // Potęga potęgi
 q('ps7-3a',one(pp(p(4,3),5)), [p(4,8),p(4,15),p(12,5),p(4,243)],1,`${MUL}: 3 · 5 = 15, więc <b>${p(4,15)}</b>. ${p(4,8)} to dodane wykładniki, a 243 to ${p(3,5)} — wykładników nie potęgujemy.`),
 q('ps7-3b',one(pp(pp(p(2,3),2),4)), [p(2,9),p(2,24),p(2,12),p(6,8)],1,`${MUL} — wszystkie po kolei: 3 · 2 · 4 = 24, więc <b>${p(2,24)}</b>. ${p(2,9)} to dodane wykładniki.`),
 q('ps7-3c',one(pp(pp('−0,5',4),3)), [pp('−0,5',7),pp('−0,5',64),pp('−0,5',12),pp('−0,5',81)],2,`${MUL}: 4 · 3 = 12, więc <b>${pp('−0,5',12)}</b>. 64 to ${p(4,3)}, a 81 to ${p(3,4)} — wykładników nie potęgujemy.`),
 // Potęga potęgi — oblicz
 q('ps7-4a',calc(pp(pp(f(1,2),2),2)), [f(1,16),f(1,8),f(1,4),f(1,32)],0,`${pp(pp(f(1,2),2),2)} = ${pp(f(1,2),4)} = ${f(1,p(2,4))} = <b>${f(1,16)}</b>.`),
 q('ps7-4b',calc(pp(pp('−1',7),11)), ['1','−1','77','−77'],1,`${pp(pp('−1',7),11)} = ${pp('−1',77)}. Wykładnik 77 jest nieparzysty, więc wynik to <b>−1</b>.`),
 q('ps7-4c',calc(pp(pp(f(2,5),3),0)), ['0','1',f(2,5),f(8,125)],1,`${MUL}: 3 · 0 = 0, a każda liczba różna od zera do potęgi 0 daje <b>1</b>.`),
 q('ps7-4d',calc(pp(p('0,1',2),3)), ['0,001','0,0001','0,00001','0,000001'],3,`${pp(p('0,1',2),3)} = ${p('0,1',6)}. Wynik ma 6 miejsc po przecinku: <b>0,000001</b>.`),
 // Kilka działań
 q('ps7-5a',one(`${p(4,8)} : ${p(4,3)} · ${p(4,2)}`), [p(4,3),p(4,7),p(4,13),p(4,48)],1,`Mnożenie i dzielenie wykonujemy po kolei, od lewej: 8 − 3 + 2 = 7, więc <b>${p(4,7)}</b>. ${p(4,3)} wychodzi, gdy najpierw pomnoży się ${p(4,3)} · ${p(4,2)}.`),
 q('ps7-5b',one(`${p('0,2',5)} · ${p('0,2',6)} : ${p('0,2',4)}`), [p('0,2',15),p('0,2',3),p('0,2',7),p('0,2',5)],2,`Od lewej: 5 + 6 − 4 = 7, więc <b>${p('0,2',7)}</b>. ${p('0,2',15)} to wszystkie wykładniki dodane.`),
 q('ps7-5c',one(`${pp('−10',8)} : ${pp('−10',3)} · ${pp('−10',2)}`), [pp('−10',7),pp('−10',3),pp('−10',13),p(10,7)],0,`Od lewej: 8 − 3 + 2 = 7, więc <b>${pp('−10',7)}</b>. Minus zostaje w podstawie.`),
 q('ps7-5d',one(`${pp(f(3,4),6)} · ${pp(f(3,4),0)} : ${pp(f(3,4),5)}`), [pp(f(3,4),0),pp(f(3,4),1),pp(f(3,4),2),pp(f(3,4),11)],1,`6 + 0 − 5 = 1, więc <b>${pp(f(3,4),1)}</b>, czyli po prostu ${f(3,4)}. ${pp(f(3,4),2)} wychodzi, gdy wykładnik 0 policzy się jak 1.`),
 q('ps7-5e',one(`(${p(9,3)} · ${p(9,4)}) : (${p(9,2)} · 9)`), [p(9,4),p(9,6),p(9,8),p(9,2)],0,`Najpierw nawiasy: ${p(9,3)} · ${p(9,4)} = ${p(9,7)} oraz ${p(9,2)} · 9 = ${p(9,3)}. Potem ${p(9,7)} : ${p(9,3)} = <b>${p(9,4)}</b>. ${p(9,6)} wychodzi, gdy pominie się nawiasy.`),
 q('ps7-6a',one(pp(`${p(5,2)} · ${p(5,3)}`,4)), [p(5,9),p(5,14),p(5,20),p(5,24)],2,`W nawiasie ${p(5,2)} · ${p(5,3)} = ${p(5,5)}. Potem ${pp(p(5,5),4)} = <b>${p(5,20)}</b>.`),
 q('ps7-6b',one(pp(`${p(7,9)} : 7`,3)), [p(7,24),p(7,27),p(7,26),p(7,9)],0,`W nawiasie ${p(7,9)} : ${p(7,1)} = ${p(7,8)}. Potem ${pp(p(7,8),3)} = <b>${p(7,24)}</b>. Samo 7 to ${p(7,1)}.`),
 q('ps7-6c',one(`${pp(p(6,3),2)} · ${p(6,4)}`), [p(6,9),p(6,10),p(6,24),p(36,10)],1,`${pp(p(6,3),2)} = ${p(6,6)}, a ${p(6,6)} · ${p(6,4)} = <b>${p(6,10)}</b>.`),
 q('ps7-6d',one(`3 · ${pp(p(3,5),4)}`), [p(3,20),p(3,21),p(3,10),p(9,20)],1,`${pp(p(3,5),4)} = ${p(3,20)}, a 3 · ${p(3,20)} = ${p(3,1)} · ${p(3,20)} = <b>${p(3,21)}</b>.`),
 // Który wzór?
 rule('ps7-7a',`${p(3,12)} : ${p(3,4)}`,1,'To dzielenie potęg o tej samej podstawie 3, więc pasuje wzór na <b>dzielenie</b>: wykładniki odejmujemy.'),
 rule('ps7-7b',`${p(3,12)} + ${p(3,4)}`,3,`${NO_SUM} — <b>żaden wzór</b> tu nie pasuje.`),
 rule('ps7-7c',pp(p(3,12),4),2,'Potęga jest podniesiona do potęgi, więc pasuje wzór na <b>potęgę potęgi</b>: wykładniki mnożymy.'),
 rule('ps7-7d',`${p(3,12)} · ${p(3,4)}`,0,'To mnożenie potęg o tej samej podstawie 3, więc pasuje wzór na <b>mnożenie</b>: wykładniki dodajemy.'),
 rule('ps7-7e',f(p(3,12),p(3,4)),1,'Kreska ułamkowa oznacza dzielenie, więc pasuje wzór na <b>dzielenie</b>.'),
 rule('ps7-7f',`${p(3,12)} − ${p(3,4)}`,3,`${NO_SUM} — <b>żaden wzór</b> tu nie pasuje.`),
 // Potęgi z literami
 q('ps7-8a',one(`${p(X('a'),2)} · ${p(X('a'),4)} · ${X('a')}`), [p(X('a'),6),p(X('a'),7),p(X('a'),8),`3${p(X('a'),7)}`],1,`Samo <i>a</i> to ${p(X('a'),1)}. ${ADD}: 2 + 4 + 1 = 7, więc <b>${p(X('a'),7)}</b>.`),
 q('ps7-8b',one(`${p(X('x'),15)} : ${p(X('x'),5)}`,` (${X('x')} ≠ 0)`), [p(X('x'),3),p(X('x'),10),p(X('x'),20),p(X('x'),75)],1,`${SUB}: 15 − 5 = 10, więc <b>${p(X('x'),10)}</b>.`),
 q('ps7-8c',one(`${pp('−'+X('b'),9)} : ${pp('−'+X('b'),3)} · (−${X('b')})`,` (${X('b')} ≠ 0)`), [pp('−'+X('b'),7),pp('−'+X('b'),5),pp('−'+X('b'),13),p(X('b'),7)],0,`Od lewej: 9 − 3 + 1 = 7, więc <b>${pp('−'+X('b'),7)}</b>. Podstawą jest −<i>b</i>, więc minus zostaje w nawiasie.`),
 q('ps7-8d',one(f(p(X('m'),18),p(X('m'),6)),` (${X('m')} ≠ 0)`), [p(X('m'),3),p(X('m'),12),p(X('m'),24),p(X('m'),108)],1,`Kreska ułamkowa to dzielenie: 18 − 6 = 12, więc <b>${p(X('m'),12)}</b>.`),
 q('ps7-8e',one(`${pp(p(X('y'),4),3)} · ${p(X('y'),2)}`), [p(X('y'),9),p(X('y'),12),p(X('y'),14),p(X('y'),24)],2,`${pp(p(X('y'),4),3)} = ${p(X('y'),12)}, a ${p(X('y'),12)} · ${p(X('y'),2)} = <b>${p(X('y'),14)}</b>.`),
 // Brakujący wykładnik
 q('ps7-9a',box(`${p(6,5)} · ${p(6,'□')} = ${p(6,13)}`), ['8','9','13','18'],0,`Wykładniki się dodają: 5 + □ = 13, więc □ = <b>8</b>.`),
 q('ps7-9b',box(`${p(4,'□')} : ${p(4,6)} = ${p(4,5)}`), ['1','5','11','30'],2,`Wykładniki się odejmują: □ − 6 = 5, więc □ = <b>11</b>.`),
 q('ps7-9c',box(`${pp(p(2,'□'),4)} = ${p(2,20)}`), ['5','16','24','80'],0,`Wykładniki się mnożą: □ · 4 = 20, więc □ = <b>5</b>.`),
 q('ps7-9d',box(`1 = ${p(9,3)} · ${p(9,4)} : ${p(9,'□')}`), ['0','1','7','12'],2,`${p(9,3)} · ${p(9,4)} = ${p(9,7)}. Wynik 1 to ${p(9,0)}, więc 7 − □ = 0, czyli □ = <b>7</b>.`),
 q('ps7-9e',box(`${p(8,7)} = ${p(8,'□')} · (${p(8,11)} : ${p(8,6)})`), ['1','2','5','12'],1,`W nawiasie ${p(8,11)} : ${p(8,6)} = ${p(8,5)}. Potem □ + 5 = 7, więc □ = <b>2</b>.`),
 // Oblicz
 q('ps7-10a',calc(`(${p(4,5)} · ${p(4,9)}) : (${p(4,6)} · ${p(4,7)})`), ['4','1','16','64'],0,`Nawiasy: ${p(4,14)} i ${p(4,13)}. Potem ${p(4,14)} : ${p(4,13)} = ${p(4,1)} = <b>4</b>.`),
 q('ps7-10b',calc(`${p(10,7)} − ${p(10,6)}`), ['10','1 000 000','9 000 000','10 000 000'],2,`${NO_SUM}. Liczymy: 10 000 000 − 1 000 000 = <b>9 000 000</b>. Wynik 10 to błędne ${p(10,'7 − 6')}.`),
 q('ps7-10c',calc(`${p(2,5)} − ${p(2,3)}`), ['4','8','24','32'],2,`${NO_SUM}. Liczymy: 32 − 8 = <b>24</b>. Wynik 4 to błędne ${p(2,'5 − 3')}.`),
 q('ps7-10d',calc(`${pp(p(5,3),2)} : ${pp(p(5,2),2)} − 5`), ['0','5','20','25'],2,`${pp(p(5,3),2)} : ${pp(p(5,2),2)} = ${p(5,6)} : ${p(5,4)} = ${p(5,2)} = 25. Na końcu odejmowanie: 25 − 5 = <b>20</b>.`),
 q('ps7-10e',calc(f(`${p(7,3)} · ${p(7,5)} : ${p(7,0)}`,`${p(7,4)} · ${p(7,2)}`)), ['1','7','49','343'],2,`Licznik: 3 + 5 − 0 = 8, czyli ${p(7,8)}. Mianownik: ${p(7,6)}. ${p(7,8)} : ${p(7,6)} = ${p(7,2)} = <b>49</b>.`),
 q('ps7-10f',calc(`${p(8,10)} : ${p(8,8)}`), ['2','8','16','64'],3,`${p(8,10)} : ${p(8,8)} = ${p(8,2)} = <b>64</b>. Wynik 2 to sam wykładnik, a nie wartość potęgi.`),
 // Potęgi liczby 10
 q('ps7-11a',`Zapisz w postaci jednej potęgi liczby 10: <b>100 · ${p(10,5)}</b>.`, [p(10,6),p(10,7),p(10,10),p(1000,5)],1,`100 = ${p(10,2)}, więc ${p(10,2)} · ${p(10,5)} = <b>${p(10,7)}</b>.`),
 q('ps7-11b',`Zapisz w postaci jednej potęgi liczby 10: <b>0,001 · ${p(10,7)}</b>.`, [p(10,3),p(10,4),p(10,7),p(10,10)],1,`${p(10,7)} = 10 000 000. Mnożąc przez 0,001, przesuwamy przecinek o 3 miejsca w lewo: 10 000 = <b>${p(10,4)}</b>.`),
 q('ps7-11c',`Ile to milionów: <b>${pp(p(10,2),5)}</b>?`, ['10','100','1000','10 000'],3,`${pp(p(10,2),5)} = ${p(10,10)}, a milion to ${p(10,6)}. ${p(10,10)} : ${p(10,6)} = ${p(10,4)}, czyli <b>10 000</b> milionów. Wynik 10 wychodzi z błędnego ${p(10,'2 + 5')}.`),
 q('ps7-11d',`Ile to tysięcy: <b>${pp(p(10,4),3)} : ${p(10,5)}</b>?`, ['100','1000','10 000','100 000'],2,`${p(10,12)} : ${p(10,5)} = ${p(10,7)}, a tysiąc to ${p(10,3)}. ${p(10,7)} : ${p(10,3)} = ${p(10,4)}, czyli <b>10 000</b> tysięcy.`),
 // Prawda czy fałsz
 pair('ps7-12a',`${p(2,3)} · ${p(2,4)} = ${p(4,7)}`,`${pp(p(5,2),3)} = ${p(5,6)}`,'FP',`I: podstawa się nie zmienia, ${p(2,3)} · ${p(2,4)} = ${p(2,7)} — <b>fałsz</b>. II: 2 · 3 = 6 — <b>prawda</b>.`),
 pair('ps7-12b',`${p(3,5)} + ${p(3,5)} + ${p(3,5)} = ${p(3,6)}`,`${p(2,6)} : ${p(2,3)} = ${p(2,2)}`,'PF',`I: trzy takie same składniki to 3 · ${p(3,5)} = ${p(3,1)} · ${p(3,5)} = ${p(3,6)} — <b>prawda</b>. II: 6 − 3 = 3, więc ${p(2,3)}, a nie ${p(2,2)} — <b>fałsz</b>.`),
 pair('ps7-12c',`${pp('−4',3)} · ${pp('−4',2)} = ${pp('−4',5)}`,`${p(10,4)} · ${p(10,4)} = ${p(100,4)}`,'PP',`I: 3 + 2 = 5 — <b>prawda</b>. II: lewa strona to ${p(10,8)}, a ${p(100,4)} = ${pp(p(10,2),4)} = ${p(10,8)} — też <b>prawda</b>.`),
 pair('ps7-12d',`${pp(p(2,5),2)} = ${p(2,25)}`,`${p(6,9)} : 6 = ${p(6,9)}`,'FF',`I: ${pp(p(2,5),2)} = ${p(2,10)}, wykładniki się mnożą — <b>fałsz</b>. II: 6 = ${p(6,1)}, więc ${p(6,9)} : 6 = ${p(6,8)} — <b>fałsz</b>.`),
 // Długie wyrażenia
 q('ps7-13a',calc(f(`${pp(p(2,4),3)} : ${p(2,5)} · 2`,`${p(2,0)} · ${pp(p(2,2),5)} : ${p(2,6)}`)), ['2','4','16','256'],2,`Licznik: ${p(2,12)} : ${p(2,5)} · ${p(2,1)} = ${p(2,8)}. Mianownik: ${p(2,0)} · ${p(2,10)} : ${p(2,6)} = ${p(2,4)}. ${p(2,8)} : ${p(2,4)} = ${p(2,4)} = <b>16</b>.`),
 q('ps7-13b',one(f(`${pp(`${p(5,6)} · ${p(5,0)}`,3)} : ${p(5,10)}`,`5 · (${p(5,4)} : ${p(5,2)})`)), [p(5,5),p(5,6),p(5,7),p(5,3)],0,`Licznik: ${pp(p(5,6),3)} : ${p(5,10)} = ${p(5,18)} : ${p(5,10)} = ${p(5,8)}. Mianownik: ${p(5,1)} · ${p(5,2)} = ${p(5,3)}. ${p(5,8)} : ${p(5,3)} = <b>${p(5,5)}</b>.`),
 q('ps7-13c',calc(f(pp(`${pp('−3',8)} : ${pp(pp('−3',2),3)}`,3),`${pp('−3',4)} · (−3)`)), ['−3','3','9','−27'],0,`Licznik: ${pp('−3',8)} : ${pp('−3',6)} = ${pp('−3',2)}, a ${pp(pp('−3',2),3)} = ${pp('−3',6)}. Mianownik: ${pp('−3',5)}. ${pp('−3',6)} : ${pp('−3',5)} = ${pp('−3',1)} = <b>−3</b>.`),
 // Ta sama podstawa ukryta w liczbie
 q('ps7-14a',`Zapisz w postaci potęgi liczby 3: <b>9 · ${p(3,5)}</b>.`, [p(3,6),p(3,7),p(3,10),p(27,5)],1,`9 = ${p(3,2)}, więc ${p(3,2)} · ${p(3,5)} = <b>${p(3,7)}</b>.`),
 q('ps7-14b',`Zapisz w postaci potęgi liczby 2: <b>32 : ${p(2,3)}</b>.`, [p(2,2),p(2,3),p(2,8),p(2,29)],0,`32 = ${p(2,5)}, więc ${p(2,5)} : ${p(2,3)} = <b>${p(2,2)}</b>.`),
 q('ps7-14c',`Zapisz w postaci potęgi liczby 2: <b>${p(4,5)}</b>.`, [p(2,7),p(2,10),p(2,20),p(2,25)],1,`4 = ${p(2,2)}, więc ${p(4,5)} = ${pp(p(2,2),5)} = <b>${p(2,10)}</b>.`),
 // Typowe błędy
 q('ps7-15a','Który rachunek jest <b>poprawny</b>?', [`${p(5,3)} · ${p(5,4)} = ${p(25,7)}`,`${p(5,3)} · ${p(5,4)} = ${p(5,12)}`,`${pp(p(5,3),4)} = ${p(5,12)}`,`${p(5,8)} : ${p(5,4)} = ${p(5,2)}`],2,`<b>${pp(p(5,3),4)} = ${p(5,12)}</b> — przy potęgowaniu potęgi wykładniki mnożymy. ${p(5,3)} · ${p(5,4)} = ${p(5,7)} (podstawa zostaje, wykładniki dodajemy), a ${p(5,8)} : ${p(5,4)} = ${p(5,4)}.`),
 q('ps7-15b','Który rachunek jest <b>błędny</b>?', [`${p(2,7)} : ${p(2,7)} = ${p(2,0)} = 1`,`${pp(p(2,2),0)} = 1`,`${p(2,4)} · ${p(2,0)} = ${p(2,4)}`,`${p(2,6)} : ${p(2,3)} = ${p(2,2)}`],3,`<b>${p(2,6)} : ${p(2,3)}</b> to ${p(2,3)}, bo wykładniki odejmujemy, a nie dzielimy. Pozostałe rachunki są poprawne.`),
 // Zadania tekstowe
 q('ps7-16a',`Bok kwadratu ma długość <b>${p(2,5)} cm</b>. Ile wynosi pole tego kwadratu?`, [cm(p(2,7),2),cm(p(2,10),2),cm(p(2,25),2),cm(p(4,10),2)],1,`Pole kwadratu to bok do kwadratu: ${pp(p(2,5),2)} = <b>${cm(p(2,10),2)}</b>.`),
 q('ps7-16b',`Sześcienne pudełko ma krawędź długości <b>${p(3,4)} cm</b>. Ile wynosi jego objętość?`, [cm(p(3,7),3),cm(p(3,12),3),cm(p(3,64),3),cm(p(9,12),3)],1,`Objętość sześcianu to krawędź do sześcianu: ${pp(p(3,4),3)} = <b>${cm(p(3,12),3)}</b>.`),
 q('ps7-16c',`W magazynie stoi ${p(2,6)} pudełek, a w każdym jest ${p(2,4)} kredek. Ile kredek jest w magazynie?`, [p(2,10),p(2,24),p(4,10),p(2,2)],0,`${p(2,6)} · ${p(2,4)} = <b>${p(2,10)}</b>, czyli 1024 kredki.`),
 q('ps7-16d',`Zbiornik mieści ${p(10,6)} litrów wody. Pompa wypompowuje ${p(10,4)} litrów na godzinę. Po ilu godzinach opróżni pełny zbiornik?`, ['10','100','1000','10 000'],1,`${p(10,6)} : ${p(10,4)} = ${p(10,2)} = <b>100</b> godzin.`),
 // Porównywanie
 q('ps7-17a','Która liczba jest <b>największa</b>?', [`${p(2,5)} · ${p(2,3)}`,pp(p(2,3),3),`${p(2,12)} : ${p(2,2)}`,p(4,6)],3,`Wszystko jako potęgi dwójki: ${p(2,8)}, ${p(2,9)}, ${p(2,10)} oraz ${p(4,6)} = ${pp(p(2,2),6)} = ${p(2,12)}. Największa jest <b>${p(4,6)}</b>.`),
 q('ps7-17b','Która liczba jest <b>najmniejsza</b>?', [`${p(3,9)} : ${p(3,4)}`,pp(p(3,2),3),`3 · ${p(3,2)}`,p(9,2)],2,`Wszystko jako potęgi trójki: ${p(3,5)}, ${p(3,6)}, ${p(3,3)} oraz ${p(9,2)} = ${p(3,4)}. Najmniejsza jest <b>3 · ${p(3,2)} = ${p(3,3)} = 27</b>.`),
];

// Klasa 7: notacja wykładnicza — duże i małe liczby w postaci a · 10ⁿ (1 ≤ a < 10), ujemne wykładniki, jednostki.
// Zadania są w kolejności od najłatwiejszych do najtrudniejszych (`ordered: true` w scenariuszu).
const e10 = (n) => p(10, n < 0 ? `−${-n}` : n);
const sci = (a, n) => `${a} · ${e10(n)}`;
const toSci = (text, intro = 'Zapisz liczbę') => `${intro} <b>${text}</b> w notacji wykładniczej.`;
const fromSci = (e) => `Zapisz liczbę <b>${e}</b> bez użycia notacji wykładniczej.`;
const gap = (e) => `Jaką liczbę trzeba wpisać w miejsce □, aby otrzymać równość <b>${e}</b>?`;
const judge = (id, a, b, truth, explain) => q(id, `Oceń prawdziwość zdań.<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
const SCI = 'W notacji wykładniczej liczbę zapisujemy jako <i>a</i> · 10<sup><i>n</i></sup>, gdzie 1 ≤ <i>a</i> &lt; 10';

export const scientificQuestions7 = [
 // Duża liczba → notacja wykładnicza
 q('ne7-1a',toSci('340 000'), [sci(34,4),sci('3,4',5),sci('3,4',4),sci('0,34',6)],1,`Przecinek stawiamy po pierwszej cyfrze: 3,4. Do 340 000 trzeba go przesunąć o 5 miejsc w prawo, więc <b>${sci('3,4',5)}</b>. ${sci(34,4)} ma dobrą wartość, ale 34 nie jest mniejsze od 10.`),
 q('ne7-1b',toSci('7 000 000'), [sci(7,5),sci(70,5),sci(7,7),sci(7,6)],3,`7 000 000 to 7 i sześć zer, czyli <b>${sci(7,6)}</b>. ${sci(70,5)} ma tę samą wartość, ale 70 nie jest mniejsze od 10.`),
 q('ne7-1c',toSci('52 000'), [sci('5,2',4),sci(52,3),sci('5,2',3),sci('0,52',5)],0,`5,2 · 10 000 = 52 000, więc <b>${sci('5,2',4)}</b>. ${sci(52,3)} to nie notacja wykładnicza, bo 52 jest większe od 10.`),
 q('ne7-1d',toSci('1 800 000'), [sci('1,8',5),sci(18,5),sci('1,8',6),sci('1,8',7)],2,`1 800 000 = 1,8 · 1 000 000 = <b>${sci('1,8',6)}</b>. Przecinek przesuwamy o 6 miejsc.`),
 // Notacja wykładnicza → zwykły zapis
 q('ne7-2a',fromSci(sci(4,5)), ['400 000','40 000','4 000 000','20'],0,`${e10(5)} = 100 000, a 4 · 100 000 = <b>400 000</b>. Wynik 20 to 4 · 5 — wykładnik mówi, ile zer ma potęga, a nie przez co mnożyć.`),
 q('ne7-2b',fromSci(sci('2,7',6)), ['270 000','2 700 000','27 000 000','16,2'],1,`${e10(6)} = 1 000 000. Przecinek w 2,7 przesuwamy o 6 miejsc w prawo: <b>2 700 000</b>. Wynik 16,2 to błędne 2,7 · 6.`),
 q('ne7-2c',fromSci(sci('9,05',4)), ['9 050','905 000','90 500','95 000'],2,`Przecinek w 9,05 przesuwamy o 4 miejsca w prawo: <b>90 500</b>. Zero po przecinku nie znika.`),
 q('ne7-2d',fromSci(sci('1,36',7)), ['136 000 000','1 360 000','136 000','13 600 000'],3,`Przecinek w 1,36 przesuwamy o 7 miejsc w prawo: <b>13 600 000</b>, czyli 13,6 miliona.`),
 // Czy to jest notacja wykładnicza?
 q('ne7-3a','Która liczba jest zapisana w <b>notacji wykładniczej</b>?', [sci(25,3),sci('0,4',5),sci('3,7',6),sci(10,2)],2,`${SCI}. Warunek spełnia tylko <b>${sci('3,7',6)}</b>. Liczby 25 i 10 są za duże, a 0,4 — za mała.`),
 q('ne7-3b','Który zapis <b>nie jest</b> notacją wykładniczą?', [sci('1,2',4),sci('9,99',7),sci(5,-2),sci(12,3)],3,`${SCI}. W zapisie <b>${sci(12,3)}</b> liczba 12 jest większa od 10. Wykładnik może być ujemny, jak w ${sci(5,-2)}.`),
 q('ne7-3c','Która liczba jest zapisana w <b>notacji wykładniczej</b>?', [sci('7,05',8),sci('70,5',7),sci('0,705',9),sci(705,6)],0,`${SCI}. Warunek spełnia tylko <b>${sci('7,05',8)}</b>. Pozostałe zapisy mają tę samą wartość, ale 70,5 i 705 są za duże, a 0,705 — za mała.`),
 q('ne7-3d','Który zapis <b>nie jest</b> notacją wykładniczą?', [sci(6,9),sci('0,6',-3),sci(1,5),sci('4,44',-8)],1,`${SCI}. Liczba 0,6 jest mniejsza od 1, więc <b>${sci('0,6',-3)}</b> nie jest notacją wykładniczą (poprawnie: ${sci(6,-4)}). Ujemny wykładnik jest dozwolony.`),
 // Słownie → notacja wykładnicza
 q('ne7-4a',toSci('czterdzieści tysięcy'), [sci(4,3),sci(4,4),sci(40,3),sci(4,5)],1,`Czterdzieści tysięcy to 40 000 = 4 · 10 000 = <b>${sci(4,4)}</b>.`),
 q('ne7-4b',toSci('sześćdziesiąt trzy miliony'), [sci(63,6),sci('6,3',6),sci('6,3',7),sci('6,3',8)],2,`Sześćdziesiąt trzy miliony to 63 000 000 = 6,3 · 10 000 000 = <b>${sci('6,3',7)}</b>. ${sci(63,6)} ma tę samą wartość, ale 63 jest większe od 10.`),
 q('ne7-4c',toSci('dziewięć miliardów'), [sci(9,9),sci(9,6),sci(9,12),sci(90,8)],0,`Miliard to 1 i 9 zer, czyli ${e10(9)}. Dziewięć miliardów to <b>${sci(9,9)}</b>.`),
 q('ne7-4d',toSci('siedemset dwadzieścia tysięcy'), [sci(72,4),sci('7,2',4),sci('7,2',6),sci('7,2',5)],3,`Siedemset dwadzieścia tysięcy to 720 000. Przecinek po siódemce daje 7,2, a przesunięcie wynosi 5 miejsc: <b>${sci('7,2',5)}</b>.`),
 // Potęgi liczby 10 o wykładniku ujemnym
 q('ne7-5a',`Ile jest równa potęga <b>${e10(-2)}</b>?`, ['−100','0,1','0,01','−20'],2,`${e10(-2)} = ${f(1,p(10,2))} = ${f(1,100)} = <b>0,01</b>. Ujemny wykładnik nie daje liczby ujemnej — oznacza odwrotność potęgi.`),
 q('ne7-5b',`Zapisz potęgę <b>${e10(-3)}</b> w postaci ułamka zwykłego.`, [f(1,1000),'−1000',f(1,100),'−30'],0,`${e10(-3)} = ${f(1,p(10,3))} = <b>${f(1,1000)}</b>, czyli 0,001.`),
 q('ne7-5c',`Jak słownie zapisać wartość potęgi <b>${e10(-1)}</b>?`, ['minus dziesięć','minus jeden','jedna setna','jedna dziesiąta'],3,`${e10(-1)} = ${f(1,10)} = 0,1, czyli <b>jedna dziesiąta</b>.`),
 q('ne7-5d','Zapisz liczbę <b>0,0001</b> jako potęgę liczby 10.', [e10(4),e10(-4),e10(-3),e10(-5)],1,`0,0001 = ${f(1,'10 000')} = ${f(1,p(10,4))} = <b>${e10(-4)}</b>. Jedynka stoi na 4. miejscu po przecinku.`),
 // Mała liczba → notacja wykładnicza
 q('ne7-6a',toSci('0,003'), [sci(3,-2),sci(3,3),sci(3,-3),sci('0,3',-2)],2,`Przecinek przesuwamy w prawo, aż stanie za pierwszą cyfrą różną od zera: 0,003 → 3. To 3 miejsca, a liczba jest mniejsza od 1, więc wykładnik jest ujemny: <b>${sci(3,-3)}</b>.`),
 q('ne7-6b',toSci('0,00045'), [sci('4,5',-4),sci(45,-5),sci('4,5',-5),sci('4,5',4)],0,`0,00045 → 4,5: przecinek przesuwamy o 4 miejsca w prawo, więc <b>${sci('4,5',-4)}</b>. ${sci(45,-5)} ma tę samą wartość, ale 45 jest większe od 10.`),
 q('ne7-6c',toSci('0,000072'), [sci(72,-6),sci('7,2',-6),sci('0,72',-4),sci('7,2',-5)],3,`0,000072 → 7,2: przecinek przesuwamy o 5 miejsc, więc <b>${sci('7,2',-5)}</b>.`),
 q('ne7-6d',toSci('0,0608'), [sci('6,08',-3),sci('6,08',-2),sci('60,8',-3),sci('6,8',-2)],1,`0,0608 → 6,08: przecinek przesuwamy o 2 miejsca, więc <b>${sci('6,08',-2)}</b>. Zero w środku zostaje: 6,08, a nie 6,8.`),
 // Ujemny wykładnik → ułamek dziesiętny
 q('ne7-7a',fromSci(sci(5,-3)), ['0,005','0,0005','0,05','−5000'],0,`Wykładnik −3: przecinek w liczbie 5 przesuwamy o 3 miejsca w lewo: <b>0,005</b>. Ujemny wykładnik nie daje liczby ujemnej.`),
 q('ne7-7b',fromSci(sci('3,1',-4)), ['0,0031','0,00031','0,000031','−31 000'],1,`Przecinek w 3,1 przesuwamy o 4 miejsca w lewo: <b>0,00031</b>.`),
 q('ne7-7c',fromSci(sci('8,25',-2)), ['0,825','0,00825','0,0825','825'],2,`Przecinek w 8,25 przesuwamy o 2 miejsca w lewo: <b>0,0825</b>.`),
 q('ne7-7d',fromSci(sci(6,-6)), ['0,00006','0,0000006','−6 000 000','0,000006'],3,`Przecinek w liczbie 6 przesuwamy o 6 miejsc w lewo: <b>0,000006</b> — szóstka stoi na 6. miejscu po przecinku.`),
 // Duże wielkości z życia i kosmosu
 q('ne7-8a',toSci('384 000','Średnia odległość Ziemi od Księżyca wynosi około 384 000 km. Zapisz liczbę'), [sci('3,84',5),sci('38,4',4),sci('3,84',6),sci('3,84',4)],0,`384 000 → 3,84 i przesunięcie przecinka o 5 miejsc: <b>${sci('3,84',5)}</b> km.`),
 q('ne7-8b',toSci('37 500 000','W Polsce mieszka około 37 500 000 osób. Zapisz liczbę'), [sci('3,75',6),sci('3,75',7),sci('37,5',6),sci('3,75',8)],1,`37 500 000 → 3,75 i przesunięcie o 7 miejsc: <b>${sci('3,75',7)}</b>. ${sci('37,5',6)} nie jest notacją wykładniczą, bo 37,5 jest większe od 10.`),
 q('ne7-8c',toSci('143 000','Średnica Jowisza, największej planety Układu Słonecznego, wynosi około 143 000 km. Zapisz liczbę'), [sci('1,43',4),sci('14,3',4),sci('1,43',5),sci('1,43',6)],2,`143 000 → 1,43 i przesunięcie o 5 miejsc: <b>${sci('1,43',5)}</b> km.`),
 q('ne7-8d',toSci('4 500 000 000','Neptun krąży około 4 500 000 000 km od Słońca. Zapisz liczbę'), [sci('4,5',8),sci(45,8),sci('4,5',10),sci('4,5',9)],3,`4 500 000 000 to 4,5 miliarda. Przecinek przesuwamy o 9 miejsc: <b>${sci('4,5',9)}</b> km.`),
 // Małe wielkości z przyrody
 q('ne7-9a',toSci('0,0001','Kartka papieru ma grubość około 0,0001 m. Zapisz liczbę'), [sci(1,-4),sci(1,-3),sci(1,4),sci('0,1',-3)],0,`0,0001 → 1: przecinek przesuwamy o 4 miejsca w prawo, więc <b>${sci(1,-4)}</b> m. ${sci('0,1',-3)} nie jest notacją wykładniczą, bo 0,1 jest mniejsze od 1.`),
 q('ne7-9b',toSci('0,000007','Czerwona krwinka ma średnicę około 0,000007 m. Zapisz liczbę'), [sci(7,-5),sci(7,-6),sci(7,6),sci(7,-7)],1,`0,000007 → 7: przecinek przesuwamy o 6 miejsc, więc <b>${sci(7,-6)}</b> m.`),
 q('ne7-9c',toSci('0,0000025','Komar waży około 0,0000025 kg. Zapisz liczbę'), [sci(25,-7),sci('2,5',-5),sci('2,5',-6),sci('2,5',6)],2,`0,0000025 → 2,5: przecinek przesuwamy o 6 miejsc, więc <b>${sci('2,5',-6)}</b> kg.`),
 q('ne7-9d',toSci('0,000035','Ziarenko pyłku kwiatowego ma średnicę około 0,000035 m. Zapisz liczbę'), [sci('3,5',-4),sci(35,-6),sci('3,5',5),sci('3,5',-5)],3,`0,000035 → 3,5: przecinek przesuwamy o 5 miejsc, więc <b>${sci('3,5',-5)}</b> m.`),
 // Notacja wykładnicza w tekście → zwykły zapis
 q('ne7-10a',`Światło w ciągu jednej sekundy pokonuje około <b>${sci(3,5)}</b> km. Ile to kilometrów?`, ['3 000 000','30 000','15','300 000'],3,`${e10(5)} = 100 000, więc 3 · 100 000 = <b>300 000</b> km. Wynik 15 to błędne 3 · 5.`),
 q('ne7-10b',`Ziemia ma około <b>${sci('4,5',9)}</b> lat. Ile to lat?`, ['4 500 000 000','450 000 000','45 000 000 000','40,5'],0,`Przecinek w 4,5 przesuwamy o 9 miejsc w prawo: <b>4 500 000 000</b> lat, czyli 4,5 miliarda. 40,5 to błędne 4,5 · 9.`),
 q('ne7-10c',`Ciało dorosłego człowieka składa się z około <b>${sci('3,7',13)}</b> komórek. Jak zapisać tę liczbę słownie?`, ['trzydzieści siedem miliardów','trzysta siedemdziesiąt miliardów','trzydzieści siedem bilionów','trzy biliony siedemset miliardów'],2,`${sci('3,7',13)} = 37 · ${e10(12)}, a bilion to ${e10(12)}. To <b>trzydzieści siedem bilionów</b>.`),
 q('ne7-10d',`Serce człowieka uderza w ciągu roku około <b>${sci(4,7)}</b> razy. Ile to razy?`, ['4 000 000','40 000 000','400 000 000','28'],1,`${e10(7)} = 10 000 000, więc 4 · 10 000 000 = <b>40 000 000</b>, czyli 40 milionów. Wynik 28 to błędne 4 · 7.`),
 // Brakujący wykładnik lub czynnik
 q('ne7-11a',gap(`37 000 000 = ${sci('3,7','□')}`), ['6','7','8','−7'],1,`Przecinek przesuwamy z końca liczby za trójkę o 7 miejsc: 37 000 000 = ${sci('3,7',7)}, więc □ = <b>7</b>.`),
 q('ne7-11b',gap(`0,00056 = ${sci('5,6','□')}`), ['−5','4','−3','−4'],3,`0,00056 → 5,6: przecinek przesuwamy o 4 miejsca w prawo, a liczba jest mniejsza od 1, więc □ = <b>−4</b>.`),
 q('ne7-11c',gap(`0,0408 = ${sci('4,08','□')}`), ['2','−3','−2','−1'],2,`0,0408 → 4,08: przecinek przesuwamy o 2 miejsca w prawo, a liczba jest mniejsza od 1, więc □ = <b>−2</b>.`),
 q('ne7-11d',gap(`260 000 = □ · ${e10(5)}`), ['2,6','26','0,26','260'],0,`${e10(5)} = 100 000, a 260 000 : 100 000 = <b>2,6</b>.`),
 // Porównywanie
 q('ne7-12a','Która liczba jest <b>największa</b>?', [sci('9,8',5),sci('1,2',6),sci(5,5),sci('9,99',4)],1,`Najpierw porównujemy wykładniki. Tylko ${sci('1,2',6)} ma wykładnik 6 — to ponad milion, a pozostałe liczby są mniejsze od miliona. Największa jest <b>${sci('1,2',6)}</b>.`),
 q('ne7-12b','Która liczba jest <b>najmniejsza</b>?', [sci(3,-4),sci('2,9',-3),sci(1,-3),sci(8,-5)],3,`Bez notacji: 0,0003; 0,0029; 0,001; 0,00008. Najmniejsza jest <b>${sci(8,-5)}</b> — ma najmniejszy wykładnik (−5).`),
 q('ne7-12c','Która liczba jest <b>większa od miliona</b>?', [sci('9,9',5),sci(1,6),sci('1,01',6),sci(9,5)],2,`Milion to ${sci(1,6)}, więc ta liczba nie jest od niego większa. ${sci('9,9',5)} i ${sci(9,5)} są mniejsze. Większa od miliona jest tylko <b>${sci('1,01',6)}</b> = 1 010 000.`),
 q('ne7-12d','Która liczba jest <b>największa</b>?', [sci(6,-2),sci(9,-3),sci(1,-2),sci('9,9',-3)],0,`Bez notacji: 0,06; 0,009; 0,01; 0,0099. Największa jest <b>${sci(6,-2)}</b>. Ma największy wykładnik (−2 jest większe od −3), a spośród liczb z wykładnikiem −2 — większy pierwszy czynnik.`),
 // Bardzo duże i bardzo małe liczby
 q('ne7-13a',toSci('5 970 000 000 000 000 000 000 000','Masa Ziemi wynosi około 5 970 000 000 000 000 000 000 000 kg. Zapisz liczbę'), [sci('5,97',21),sci(597,22),sci('5,97',24),sci('5,97',27)],2,`Liczba ma 25 cyfr, więc po piątce stoją 24 cyfry. Przecinek przesuwamy o 24 miejsca: <b>${sci('5,97',24)}</b> kg.`),
 q('ne7-13b',toSci('73 500 000 000 000 000 000 000','Masa Księżyca wynosi około 73 500 000 000 000 000 000 000 kg. Zapisz liczbę'), [sci('73,5',21),sci('7,35',21),sci('7,35',23),sci('7,35',22)],3,`Liczba ma 23 cyfry, więc po siódemce stoją 22 cyfry. Przecinek przesuwamy o 22 miejsca: <b>${sci('7,35',22)}</b> kg.`),
 q('ne7-13c',toSci('40 000 000 000 000','Najbliższa Słońcu gwiazda, Proxima Centauri, jest oddalona od nas o około 40 000 000 000 000 km. Zapisz liczbę'), [sci(4,13),sci(4,12),sci(40,12),sci(4,14)],0,`Po czwórce stoi 13 zer, więc <b>${sci(4,13)}</b> km. To około 40 bilionów kilometrów.`),
 q('ne7-13d',toSci('0,0000001','Wirus grypy ma średnicę około 0,0000001 m. Zapisz liczbę'), [sci(1,-6),sci(1,-7),sci(1,7),sci(1,-8)],1,`Jedynka stoi na 7. miejscu po przecinku, więc <b>${sci(1,-7)}</b> m.`),
 // Prawda czy fałsz — porównania z jednostkami
 judge('ne7-14a',`Masa ${sci('3,5',4)} g jest większa niż masa ${sci(2,2)} kg.`,`Długość ${sci(6,3)} m to 6 km.`,'FP',`I: ${sci('3,5',4)} g = 35 000 g = 35 kg, a ${sci(2,2)} kg = 200 kg — <b>fałsz</b>. II: 6000 m = 6 km — <b>prawda</b>.`),
 judge('ne7-14b',`Długość ${sci('4,2',5)} cm jest większa niż długość ${sci(3,3)} m.`,`Masa ${sci(7,-2)} kg to 70 g.`,'PP',`I: 420 000 cm = 4200 m, a to więcej niż 3000 m — <b>prawda</b>. II: 0,07 kg = 70 g — <b>prawda</b>.`),
 judge('ne7-14c',`Masa ${sci('2,5',6)} dag jest większa niż masa ${sci(3,4)} kg.`,`Długość ${sci('1,5',-3)} km to 15 cm.`,'FF',`I: 1 kg = 100 dag, więc 2 500 000 dag = 25 000 kg, a ${sci(3,4)} kg = 30 000 kg — <b>fałsz</b>. II: 0,0015 km = 1,5 m = 150 cm — <b>fałsz</b>.`),
 judge('ne7-14d',`Długość ${sci(8,7)} mm jest większa niż 50 km.`,`Długość ${sci(4,-3)} m to 4 cm.`,'PF',`I: 80 000 000 mm = 80 000 m = 80 km — <b>prawda</b>. II: 0,004 m = 4 mm — <b>fałsz</b>.`),
 // Działania w notacji wykładniczej
 q('ne7-15a',`Oblicz i wynik zapisz w notacji wykładniczej: <b>(${sci(3,4)}) · (${sci(2,5)})</b>.`, [sci(6,20),sci(5,9),sci(6,9),sci(6,10)],2,`Mnożymy osobno liczby i potęgi: 3 · 2 = 6 oraz ${e10(4)} · ${e10(5)} = ${e10(9)}. Wynik: <b>${sci(6,9)}</b>. ${e10(20)} to pomnożone wykładniki.`),
 q('ne7-15b',`Oblicz i wynik zapisz w notacji wykładniczej: <b>(${sci(5,6)}) · (${sci(4,2)})</b>.`, [sci(20,8),sci(2,9),sci(2,8),sci(9,8)],1,`5 · 4 = 20 i ${e10(6)} · ${e10(2)} = ${e10(8)}, czyli ${sci(20,8)}. Ale 20 jest większe od 10: 20 = ${sci(2,1)}, więc wynik to <b>${sci(2,9)}</b>.`),
 q('ne7-15c',`Oblicz i wynik zapisz w notacji wykładniczej: <b>(${sci(8,9)}) : (${sci(2,3)})</b>.`, [sci(4,6),sci(4,3),sci(6,6),sci(4,12)],0,`8 : 2 = 4 i ${e10(9)} : ${e10(3)} = ${e10(6)}. Wynik: <b>${sci(4,6)}</b>. ${e10(3)} to podzielone wykładniki.`),
 q('ne7-15d',`Oblicz i wynik zapisz w notacji wykładniczej: <b>(${sci('1,5',-3)}) · (${sci(4,7)})</b>.`, [sci(6,-21),sci(6,10),sci('5,5',4),sci(6,4)],3,`1,5 · 4 = 6 i ${e10(-3)} · ${e10(7)} = ${e10(4)}, bo −3 + 7 = 4. Wynik: <b>${sci(6,4)}</b>.`),
 // Zadania tekstowe z obliczeniami
 q('ne7-16a',`Światło pokonuje w ciągu sekundy około ${sci(3,5)} km. Ile kilometrów pokonuje w ciągu <b>minuty</b>? Wynik podaj w notacji wykładniczej.`, [sci('1,8',7),sci(18,6),sci('1,8',6),sci('1,8',5)],0,`Minuta ma 60 sekund: 60 · 3 · ${e10(5)} = 180 · ${e10(5)} = 18 000 000 km, czyli <b>${sci('1,8',7)}</b> km. ${sci(18,6)} ma dobrą wartość, ale 18 jest większe od 10.`),
 q('ne7-16b',`Komputer wykonuje w ciągu sekundy ${sci(2,9)} działań. Ile działań wykona w ciągu <b>5 sekund</b>? Wynik podaj w notacji wykładniczej.`, [sci(10,9),sci(7,9),sci(1,10),sci(1,45)],2,`5 · 2 · ${e10(9)} = 10 · ${e10(9)} = <b>${sci(1,10)}</b>. ${sci(10,9)} ma dobrą wartość, ale nie jest notacją wykładniczą, bo pierwszy czynnik musi być mniejszy od 10.`),
 q('ne7-16c',`Ziarenko maku waży około ${sci(5,-4)} g. Ile waży <b>1000</b> takich ziarenek?`, ['5 g','0,5 g','0,05 g','50 g'],1,`${sci(5,-4)} g = 0,0005 g, a 1000 · 0,0005 g = <b>0,5 g</b>. Inaczej: ${e10(3)} · ${e10(-4)} = ${e10(-1)}, więc 5 · ${e10(-1)} g = 0,5 g.`),
 q('ne7-16d',`Słoń afrykański waży około ${sci(6,3)} kg, a mrówka około ${sci(3,-6)} kg. <b>Ile razy</b> słoń jest cięższy od mrówki?`, [sci(2,3),sci(2,-3),sci(18,-3),sci(2,9)],3,`6 : 3 = 2 oraz ${e10(3)} : ${e10(-6)} = ${e10(9)}, bo 3 − (−6) = 9. Słoń jest <b>${sci(2,9)}</b> razy, czyli 2 miliardy razy cięższy.`),
];

// Klasa 7: obliczenia w notacji wykładniczej — działania, poprawianie wyniku do postaci a · 10ⁿ, porządkowanie i zadania tekstowe.
// Zadania są w kolejności od najłatwiejszych do najtrudniejszych (`ordered: true` w scenariuszu).
const B = (a, n) => `(${sci(a, n)})`;
const ops = (e) => `Oblicz i wynik zapisz w notacji wykładniczej: <b>${e}</b>.`;
const between = (v) => `Między którymi dwiema kolejnymi potęgami liczby 10 leży liczba <b>${v}</b>?`;
const pw = (a, b) => `${e10(a)} i ${e10(b)}`;
const xyz = (x, y, z) => `Ustaw liczby w kolejności rosnącej.<div class="task-statements"><i>x</i> = <b>${x}</b>, <i>y</i> = <b>${y}</b>, <i>z</i> = <b>${z}</b></div>`;
const lt = (s) => s.split(' ').map(c => c === '<' ? '&lt;' : `<i>${c}</i>`).join(' ');
const dot = (n) => `● · ${e10(n)}`;
const HIDE = 'Pierwsze czynniki liczb zapisanych w notacji wykładniczej zasłonięto (●).';
const FIX = 'Pierwszy czynnik musi być nie mniejszy niż 1 i mniejszy od 10';

export const scientificCalcQuestions7 = [
 // Dodawanie — te same wykładniki
 q('on7-1a',ops(`${sci('2,1',6)} + ${sci('3,5',6)}`), [sci('5,6',6),sci('5,6',12),sci('7,35',12),sci(56,5)],0,`Wykładniki są równe, więc dodajemy tylko pierwsze czynniki: 2,1 + 3,5 = 5,6. Potęga ${e10(6)} zostaje bez zmian: <b>${sci('5,6',6)}</b>. Przy dodawaniu wykładników się nie dodaje.`),
 q('on7-1b',ops(`${sci('4,3',-5)} + ${sci('1,4',-5)}`), [sci('5,7',-10),sci('5,7',-5),sci('5,7',5),sci('6,02',-10)],1,`4,3 + 1,4 = 5,7, a potęga ${e10(-5)} zostaje: <b>${sci('5,7',-5)}</b>. Wykładnik −10 to błąd: przy dodawaniu wykładników się nie dodaje.`),
 q('on7-1c',ops(`${sci('3,25',9)} + ${sci('6,5',9)}`), [sci('9,75',18),sci('97,5',8),sci('9,75',9),sci('9,75',10)],2,`3,25 + 6,5 = 9,75, a potęga ${e10(9)} zostaje: <b>${sci('9,75',9)}</b>. ${sci('97,5',8)} ma tę samą wartość, ale 97,5 jest większe od 10.`),
 q('on7-1d',ops(`${sci('1,6',-2)} + ${sci('2,2',-2)}`), [sci('3,8',-4),sci('3,52',-4),sci('3,8',2),sci('3,8',-2)],3,`1,6 + 2,2 = 3,8, a potęga ${e10(-2)} zostaje: <b>${sci('3,8',-2)}</b>.`),
 // Odejmowanie — te same wykładniki
 q('on7-2a',ops(`${sci('9,8',7)} − ${sci('4,5',7)}`), [sci('5,3',0),sci('5,3',14),sci('1,43',8),sci('5,3',7)],3,`9,8 − 4,5 = 5,3, a potęga ${e10(7)} zostaje: <b>${sci('5,3',7)}</b>. Wykładników nie odejmujemy — dlatego ${sci('5,3',0)} to błąd.`),
 q('on7-2b',ops(`${sci('7,8',-4)} − ${sci('2,3',-4)}`), [sci('5,5',-4),sci('5,5',0),sci('5,5',-8),sci('5,5',4)],0,`7,8 − 2,3 = 5,5, a potęga ${e10(-4)} zostaje: <b>${sci('5,5',-4)}</b>.`),
 q('on7-2c',ops(`${sci('6,75',11)} − ${sci('2,5',11)}`), [sci('4,25',0),sci('4,25',11),sci('42,5',10),sci('9,25',11)],1,`6,75 − 2,5 = 4,25, a potęga ${e10(11)} zostaje: <b>${sci('4,25',11)}</b>. ${sci('9,25',11)} to suma, a nie różnica.`),
 q('on7-2d',ops(`${sci(5,-8)} − ${sci('1,2',-8)}`), [sci('3,8',-16),sci('3,8',0),sci('3,8',-8),sci('6,2',-8)],2,`5 − 1,2 = 3,8, a potęga ${e10(-8)} zostaje: <b>${sci('3,8',-8)}</b>.`),
 // Mnożenie bez poprawiania
 q('on7-3a',ops(`${B(2,5)} · ${B(4,3)}`), [sci(8,15),sci(6,8),sci(8,8),sci(8,2)],2,`Mnożymy osobno liczby i potęgi: 2 · 4 = 8 oraz ${e10(5)} · ${e10(3)} = ${e10(8)}. Wynik: <b>${sci(8,8)}</b>. ${e10(15)} to pomnożone wykładniki.`),
 q('on7-3b',ops(`${B(3,-4)} · ${B(3,9)}`), [sci(9,-36),sci(6,5),sci(9,13),sci(9,5)],3,`3 · 3 = 9 oraz ${e10(-4)} · ${e10(9)} = ${e10(5)}, bo −4 + 9 = 5. Wynik: <b>${sci(9,5)}</b>.`),
 q('on7-3c',ops(`${B('1,2',6)} · ${B(4,2)}`), [sci('4,8',8),sci('4,8',12),sci('5,2',8),sci(48,7)],0,`1,2 · 4 = 4,8 oraz ${e10(6)} · ${e10(2)} = ${e10(8)}. Wynik: <b>${sci('4,8',8)}</b>. 5,2 to suma 1,2 + 4, a nie iloczyn.`),
 q('on7-3d',ops(`${B('2,5',-3)} · ${B(3,-4)}`), [sci('7,5',12),sci('7,5',-7),sci('7,5',-1),sci('5,5',-7)],1,`2,5 · 3 = 7,5 oraz ${e10(-3)} · ${e10(-4)} = ${e10(-7)}, bo −3 + (−4) = −7. Wynik: <b>${sci('7,5',-7)}</b>.`),
 // Dzielenie bez poprawiania
 q('on7-4a',ops(`${B('9,6',8)} : ${B(3,2)}`), [sci('3,2',4),sci('3,2',6),sci('3,2',10),sci('6,6',6)],1,`Dzielimy osobno liczby i potęgi: 9,6 : 3 = 3,2 oraz ${e10(8)} : ${e10(2)} = ${e10(6)}. Wynik: <b>${sci('3,2',6)}</b>. ${e10(4)} to podzielone wykładniki.`),
 q('on7-4b',ops(`${B(8,-2)} : ${B(2,5)}`), [sci(4,3),sci(6,-7),sci(4,-7),sci(4,7)],2,`8 : 2 = 4 oraz ${e10(-2)} : ${e10(5)} = ${e10(-7)}, bo −2 − 5 = −7. Wynik: <b>${sci(4,-7)}</b>.`),
 q('on7-4c',ops(`${B('6,3',12)} : ${B('2,1',4)}`), [sci(3,3),sci(3,16),sci('4,2',8),sci(3,8)],3,`6,3 : 2,1 = 3 oraz ${e10(12)} : ${e10(4)} = ${e10(8)}. Wynik: <b>${sci(3,8)}</b>. ${e10(3)} to podzielone wykładniki.`),
 q('on7-4d',ops(`${B('7,2',-3)} : ${B('1,2',-9)}`), [sci(6,6),sci(6,-12),sci(6,-6),sci(6,3)],0,`7,2 : 1,2 = 6 oraz ${e10(-3)} : ${e10(-9)} = ${e10(6)}, bo −3 − (−9) = −3 + 9 = 6. Wynik: <b>${sci(6,6)}</b>.`),
 // Między kolejnymi potęgami liczby 10
 q('on7-5a',between('4800'), [pw(2,3),pw(3,4),pw(4,5),pw(-4,-3)],1,`4800 = ${sci('4,8',3)}, a 1 ≤ 4,8 &lt; 10. Zatem ${e10(3)} = 1000 &lt; 4800 &lt; 10 000 = ${e10(4)}: <b>${pw(3,4)}</b>.`),
 q('on7-5b',between('0,0006'), [pw(-3,-2),pw(-5,-4),pw(-4,-3),pw(3,4)],2,`0,0006 = ${sci(6,-4)}. Zatem ${e10(-4)} = 0,0001 &lt; 0,0006 &lt; 0,001 = ${e10(-3)}: <b>${pw(-4,-3)}</b>.`),
 q('on7-5c',between('52 000 000'), [pw(6,7),pw(8,9),pw(5,6),pw(7,8)],3,`52 000 000 = ${sci('5,2',7)}. Zatem ${e10(7)} = 10 000 000 &lt; 52 000 000 &lt; 100 000 000 = ${e10(8)}: <b>${pw(7,8)}</b>.`),
 q('on7-5d',between('0,035'), [pw(-2,-1),pw(-3,-2),pw(1,2),pw(-1,0)],0,`0,035 = ${sci('3,5',-2)}. Zatem ${e10(-2)} = 0,01 &lt; 0,035 &lt; 0,1 = ${e10(-1)}: <b>${pw(-2,-1)}</b>.`),
 // Porządkowanie rosnąco
 q('on7-6a',xyz(sci('4,1',12),sci('9,5',11),sci('1,2',13)), [lt('x < y < z'),lt('y < x < z'),lt('z < x < y'),lt('y < z < x')],1,`Najpierw porównujemy wykładniki: 11 &lt; 12 &lt; 13. Zatem <b>${lt('y < x < z')}</b>. Duży pierwszy czynnik 9,5 nie wystarczy, gdy wykładnik jest mniejszy.`),
 q('on7-6b',xyz(sci(6,-8),sci(2,-7),sci(8,-9)), [lt('z < x < y'),lt('x < y < z'),lt('y < x < z'),lt('z < y < x')],0,`Porównujemy wykładniki: −9 &lt; −8 &lt; −7. Zatem <b>${lt('z < x < y')}</b>. Bez notacji: 0,000000008 &lt; 0,00000006 &lt; 0,0000002.`),
 q('on7-6c',xyz(sci('3,5',9),sci('3,05',9),sci('5,3',8)), [lt('x < y < z'),lt('y < z < x'),lt('z < y < x'),lt('z < x < y')],2,`<i>z</i> ma najmniejszy wykładnik (8), więc jest najmniejsza. <i>x</i> i <i>y</i> mają wykładnik 9, a 3,05 &lt; 3,5. Zatem <b>${lt('z < y < x')}</b>.`),
 q('on7-6d',xyz(sci(7,-5),sci('2,4',-4),sci('7,5',-5)), [lt('y < x < z'),lt('z < x < y'),lt('x < y < z'),lt('x < z < y')],3,`<i>y</i> ma największy wykładnik (−4 &gt; −5), więc jest największa. <i>x</i> i <i>z</i> mają wykładnik −5, a 7 &lt; 7,5. Zatem <b>${lt('x < z < y')}</b>.`),
 // Zasłonięte pierwsze czynniki
 q('on7-7a',`${HIDE} Która liczba jest <b>na pewno największa</b>?`, [dot(7),dot(6),dot(8),dot(9)],3,`${FIX}, więc o kolejności decyduje wykładnik. Nawet 9,99 · ${e10(8)} jest mniejsze od 1 · ${e10(9)}. Największa jest <b>${dot(9)}</b>.`),
 q('on7-7b',`${HIDE} Która liczba jest <b>na pewno najmniejsza</b>?`, [dot(-3),dot(2),dot(-5),dot(-4)],2,`${FIX}, więc o kolejności decyduje wykładnik. Najmniejszy jest −5: <b>${dot(-5)}</b> to mniej niż 0,0001, a każda z pozostałych liczb jest od 0,0001 nie mniejsza.`),
 q('on7-7c',`${HIDE} Która liczba jest <b>na pewno najmniejsza</b>?`, [dot(-6),dot(-7),dot(-2),dot(-1)],1,`${FIX}, więc o kolejności decyduje wykładnik. Najmniejszy jest −7, więc najmniejsza jest <b>${dot(-7)}</b>.`),
 q('on7-7d',`Liczba <i>a</i> = <b>${dot(-3)}</b> jest zapisana w notacji wykładniczej, ale jej pierwszy czynnik zasłonięto. Liczba <i>b</i> = <b>${sci('9,9',-4)}</b>. Co na pewno wiadomo?`, ['<i>a</i> &gt; <i>b</i>','<i>a</i> &lt; <i>b</i>','<i>a</i> = <i>b</i>','Nie da się tego ustalić'],0,`Najmniejsza możliwa wartość <i>a</i> to 1 · ${e10(-3)} = 0,001, a <i>b</i> = 0,00099. Zatem na pewno <b><i>a</i> &gt; <i>b</i></b>.`),
 // Dodawanie z poprawianiem wyniku
 q('on7-8a',ops(`${sci('6,4',5)} + ${sci('5,8',5)}`), [sci('12,2',5),sci('1,22',6),sci('1,22',10),sci('1,22',5)],1,`6,4 + 5,8 = 12,2, czyli ${sci('12,2',5)}. Ale 12,2 jest większe od 10: 12,2 = ${sci('1,22',1)}, więc wynik to <b>${sci('1,22',6)}</b>.`),
 q('on7-8b',ops(`${sci('8,5',-3)} + ${sci('3,9',-3)}`), [sci('1,24',-2),sci('1,24',-4),sci('12,4',-3),sci('1,24',-6)],0,`8,5 + 3,9 = 12,4, czyli ${sci('12,4',-3)}. 12,4 = ${sci('1,24',1)}, a −3 + 1 = −2, więc wynik to <b>${sci('1,24',-2)}</b>.`),
 q('on7-8c',ops(`${sci('7,25',10)} + ${sci('4,75',10)}`), [sci(12,10),sci('1,2',9),sci('1,2',11),sci('1,2',20)],2,`7,25 + 4,75 = 12, czyli ${sci(12,10)}. 12 = ${sci('1,2',1)}, więc wynik to <b>${sci('1,2',11)}</b>. Przecinek przesunął się w lewo, więc wykładnik rośnie.`),
 q('on7-8d',ops(`${sci('9,6',-7)} + ${sci('5,4',-7)}`), [sci('1,5',-8),sci(15,-7),sci('1,5',-14),sci('1,5',-6)],3,`9,6 + 5,4 = 15, czyli ${sci(15,-7)}. 15 = ${sci('1,5',1)}, a −7 + 1 = −6, więc wynik to <b>${sci('1,5',-6)}</b>.`),
 // Odejmowanie z poprawianiem wyniku
 q('on7-9a',ops(`${sci('3,1',-6)} − ${sci('2,7',-6)}`), [sci('0,4',-6),sci(4,-5),sci(4,-7),sci(4,0)],2,`3,1 − 2,7 = 0,4, czyli ${sci('0,4',-6)}. Ale 0,4 jest mniejsze od 1: 0,4 = ${sci(4,-1)}, a −6 + (−1) = −7. Wynik: <b>${sci(4,-7)}</b>.`),
 q('on7-9b',ops(`${sci('2,05',8)} − ${sci('1,8',8)}`), [sci('2,5',7),sci('2,5',9),sci('0,25',8),sci('3,85',8)],0,`2,05 − 1,8 = 0,25, czyli ${sci('0,25',8)}. 0,25 = ${sci('2,5',-1)}, więc wynik to <b>${sci('2,5',7)}</b>. Przecinek przesunął się w prawo, więc wykładnik maleje.`),
 q('on7-9c',ops(`${sci('5,3',4)} − ${sci('4,9',4)}`), [sci(4,5),sci('0,4',4),sci(4,0),sci(4,3)],3,`5,3 − 4,9 = 0,4, czyli ${sci('0,4',4)} = 4000. 0,4 = ${sci(4,-1)}, więc wynik to <b>${sci(4,3)}</b>.`),
 q('on7-9d',ops(`${sci(6,-10)} − ${sci('5,2',-10)}`), [sci(8,-9),sci(8,-11),sci('0,8',-10),sci(8,-20)],1,`6 − 5,2 = 0,8, czyli ${sci('0,8',-10)}. 0,8 = ${sci(8,-1)}, a −10 + (−1) = −11. Wynik: <b>${sci(8,-11)}</b>.`),
 // Mnożenie z poprawianiem wyniku
 q('on7-10a',ops(`${B(7,6)} · ${B('1,5',4)}`), [sci('1,05',10),sci('10,5',10),sci('1,05',11),sci('1,05',24)],2,`7 · 1,5 = 10,5 oraz ${e10(6)} · ${e10(4)} = ${e10(10)}, czyli ${sci('10,5',10)}. 10,5 = ${sci('1,05',1)}, więc wynik to <b>${sci('1,05',11)}</b>.`),
 q('on7-10b',ops(`${B('0,6',-5)} · ${B('0,4',9)}`), [sci('2,4',3),sci('0,24',4),sci('2,4',5),sci('2,4',-45)],0,`0,6 · 0,4 = 0,24 oraz ${e10(-5)} · ${e10(9)} = ${e10(4)}, czyli ${sci('0,24',4)}. 0,24 = ${sci('2,4',-1)}, więc wynik to <b>${sci('2,4',3)}</b> = 2400.`),
 q('on7-10c',ops(`${B(5,-3)} · ${B(8,-6)}`), [sci(4,-10),sci(40,-9),sci(4,18),sci(4,-8)],3,`5 · 8 = 40 oraz ${e10(-3)} · ${e10(-6)} = ${e10(-9)}, czyli ${sci(40,-9)}. 40 = ${sci(4,1)}, a −9 + 1 = −8. Wynik: <b>${sci(4,-8)}</b>.`),
 q('on7-10d',ops(`${B('2,5',7)} · ${B('0,2',-3)}`), [sci(5,5),sci(5,3),sci('0,5',4),sci('2,7',4)],1,`2,5 · 0,2 = 0,5 oraz ${e10(7)} · ${e10(-3)} = ${e10(4)}, czyli ${sci('0,5',4)}. 0,5 = ${sci(5,-1)}, więc wynik to <b>${sci(5,3)}</b> = 5000.`),
 // Dzielenie z poprawianiem wyniku
 q('on7-11a',ops(`${B('2,4',-3)} : ${B(6,5)}`), [sci(4,-9),sci(4,-7),sci('0,4',-8),sci(4,2)],0,`2,4 : 6 = 0,4 oraz ${e10(-3)} : ${e10(5)} = ${e10(-8)}, czyli ${sci('0,4',-8)}. 0,4 = ${sci(4,-1)}, więc wynik to <b>${sci(4,-9)}</b>.`),
 q('on7-11b',ops(`${B('6,3',-4)} : ${B('0,3',5)}`), [sci(21,-9),sci('2,1',-8),sci('2,1',-10),sci('2,1',1)],1,`6,3 : 0,3 = 21 oraz ${e10(-4)} : ${e10(5)} = ${e10(-9)}, czyli ${sci(21,-9)}. 21 = ${sci('2,1',1)}, a −9 + 1 = −8. Wynik: <b>${sci('2,1',-8)}</b>.`),
 q('on7-11c',ops(`${B('1,8',12)} : ${B(9,4)}`), [sci(2,9),sci('0,2',8),sci(2,7),sci(2,3)],2,`1,8 : 9 = 0,2 oraz ${e10(12)} : ${e10(4)} = ${e10(8)}, czyli ${sci('0,2',8)}. 0,2 = ${sci(2,-1)}, więc wynik to <b>${sci(2,7)}</b>.`),
 q('on7-11d',ops(`${B(9,-5)} : ${B('0,3',-8)}`), [sci(30,3),sci(3,3),sci(3,-12),sci(3,4)],3,`9 : 0,3 = 30 oraz ${e10(-5)} : ${e10(-8)} = ${e10(3)}, bo −5 − (−8) = 3. Mamy ${sci(30,3)}, a 30 = ${sci(3,1)}, więc wynik to <b>${sci(3,4)}</b>. ${sci(3,3)} to błąd 9 : 0,3 = 3.`),
 // Potęgowanie
 q('on7-12a',ops(p(B(3,4),2)), [sci(9,16),sci(6,8),sci(9,6),sci(9,8)],3,`Do kwadratu podnosimy oba czynniki: 3² = 9 oraz ${p(`(${e10(4)})`,2)} = ${e10(8)}. Wynik: <b>${sci(9,8)}</b>. 6 to 3 · 2, a nie 3².`),
 q('on7-12b',ops(p(B(2,-3),3)), [sci(8,-9),sci(6,-9),sci(8,-27),sci(8,0)],0,`2³ = 8 oraz ${p(`(${e10(-3)})`,3)} = ${e10(-9)}, bo −3 · 3 = −9. Wynik: <b>${sci(8,-9)}</b>.`),
 q('on7-12c',ops(p(B('0,5',-3),2)), [sci('0,25',-6),sci('2,5',-5),sci('2,5',-7),sci('2,5',9)],2,`0,5² = 0,25 oraz ${p(`(${e10(-3)})`,2)} = ${e10(-6)}, czyli ${sci('0,25',-6)}. 0,25 = ${sci('2,5',-1)}, więc wynik to <b>${sci('2,5',-7)}</b>.`),
 q('on7-12d',ops(p(B(4,5),3)), [sci(64,15),sci('6,4',16),sci(12,15),sci('6,4',8)],1,`4³ = 64 oraz ${p(`(${e10(5)})`,3)} = ${e10(15)}, czyli ${sci(64,15)}. 64 = ${sci('6,4',1)}, więc wynik to <b>${sci('6,4',16)}</b>.`),
 // Prawda czy fałsz — reguły działań
 judge('on7-13a',`${sci(2,5)} + ${sci(3,5)} = ${sci(5,10)}`,`${B(2,5)} · ${B(3,5)} = ${sci(6,10)}`,'FP',`I: przy dodawaniu potęga ${e10(5)} zostaje: 2 + 3 = 5, więc suma to ${sci(5,5)} — <b>fałsz</b>. II: 2 · 3 = 6 i ${e10(5)} · ${e10(5)} = ${e10(10)} — <b>prawda</b>.`),
 judge('on7-13b',`${B(6,8)} : ${B(2,4)} = ${sci(3,4)}`,`${sci(7,6)} − ${sci(2,6)} = ${sci(5,0)}`,'PF',`I: 6 : 2 = 3 i ${e10(8)} : ${e10(4)} = ${e10(4)} — <b>prawda</b>. II: przy odejmowaniu potęga ${e10(6)} zostaje, więc różnica to ${sci(5,6)}, a nie 5 — <b>fałsz</b>.`),
 judge('on7-13c',`${p(B(3,-2),2)} = ${sci(9,-4)}`,`${sci('4,5',7)} + ${sci('5,5',7)} = ${sci(1,8)}`,'PP',`I: 3² = 9 i ${p(`(${e10(-2)})`,2)} = ${e10(-4)} — <b>prawda</b>. II: 4,5 + 5,5 = 10, a ${sci(10,7)} = ${sci(1,8)} — <b>prawda</b>.`),
 judge('on7-13d',`${B(5,4)} · ${B(4,3)} = ${sci(2,7)}`,`${sci(9,-5)} − ${sci(3,-5)} = ${sci(6,0)}`,'FF',`I: 5 · 4 = 20, więc iloczyn to ${sci(20,7)} = ${sci(2,8)} — <b>fałsz</b>. II: różnica to ${sci(6,-5)}, a nie 6 — <b>fałsz</b>.`),
 // Dodawanie i odejmowanie — różne wykładniki
 q('on7-14a',ops(`${sci(4,5)} + ${sci(3,4)}`), [sci(7,9),sci(7,5),sci('4,3',5),sci(43,4)],2,`Wykładniki są różne, więc najpierw je wyrównujemy: ${sci(4,5)} = ${sci(40,4)}. Teraz 40 + 3 = 43, czyli ${sci(43,4)} = <b>${sci('4,3',5)}</b>. Nie wolno dodać 4 + 3 = 7.`),
 q('on7-14b',ops(`${sci('2,5',-3)} + ${sci(6,-4)}`), [sci('8,5',-7),sci('3,1',-3),sci('8,5',-4),sci('3,1',-4)],1,`Wyrównujemy wykładniki: ${sci('2,5',-3)} = ${sci(25,-4)}. Teraz 25 + 6 = 31, czyli ${sci(31,-4)} = <b>${sci('3,1',-3)}</b>. Sprawdzenie: 0,0025 + 0,0006 = 0,0031.`),
 q('on7-14c',ops(`${sci(5,8)} − ${sci(4,7)}`), [sci(1,1),sci(1,8),sci('4,6',7),sci('4,6',8)],3,`Wyrównujemy wykładniki: ${sci(5,8)} = ${sci(50,7)}. Teraz 50 − 4 = 46, czyli ${sci(46,7)} = <b>${sci('4,6',8)}</b>. Odejmowanie 5 − 4 bez wyrównania daje błędne ${sci(1,8)}.`),
 q('on7-14d',ops(`${sci('1,2',-5)} − ${sci(8,-7)}`), [sci('1,12',-5),sci('1,12',-7),sci(4,-6),sci('11,2',-6)],0,`Wyrównujemy wykładniki: ${sci('1,2',-5)} = ${sci(120,-7)}. Teraz 120 − 8 = 112, czyli ${sci(112,-7)} = <b>${sci('1,12',-5)}</b>.`),
 // Ułamki
 q('on7-15a',ops(f(sci('5,6',12),sci(7,4))), [sci('0,8',8),sci(8,8),sci(8,16),sci(8,7)],3,`Kreska ułamkowa to dzielenie: 5,6 : 7 = 0,8 oraz ${e10(12)} : ${e10(4)} = ${e10(8)}, czyli ${sci('0,8',8)}. 0,8 = ${sci(8,-1)}, więc wynik to <b>${sci(8,7)}</b>.`),
 q('on7-15b',ops(f(`${B(4,6)} · ${B(3,-2)}`,sci(6,3))), [sci(2,1),sci(2,7),sci(2,-1),sci(2,11)],0,`Licznik: 4 · 3 = 12 i ${e10(6)} · ${e10(-2)} = ${e10(4)}, czyli ${sci(12,4)}. Dzielimy: 12 : 6 = 2 i ${e10(4)} : ${e10(3)} = ${e10(1)}. Wynik: <b>${sci(2,1)}</b> = 20.`),
 q('on7-15c',ops(f(sci(3,5),`${B(2,-3)} · ${B(3,2)}`)), [sci('0,5',6),sci(5,3),sci(5,5),sci(5,7)],2,`Mianownik: 2 · 3 = 6 i ${e10(-3)} · ${e10(2)} = ${e10(-1)}, czyli ${sci(6,-1)}. Dzielimy: 3 : 6 = 0,5 i ${e10(5)} : ${e10(-1)} = ${e10(6)}, czyli ${sci('0,5',6)} = <b>${sci(5,5)}</b>.`),
 q('on7-15d',ops(f(`${B('2,4',-5)} · ${B(5,8)}`,`${B(4,-2)} · ${B(3,7)}`)), [sci(1,2),sci(1,-2),sci(12,-2),sci(1,8)],1,`Licznik: 2,4 · 5 = 12 i ${e10(-5)} · ${e10(8)} = ${e10(3)}. Mianownik: 4 · 3 = 12 i ${e10(-2)} · ${e10(7)} = ${e10(5)}. Dzielimy: 12 : 12 = 1 i ${e10(3)} : ${e10(5)} = ${e10(-2)}. Wynik: <b>${sci(1,-2)}</b>.`),
 // Ile razy?
 q('on7-16a',`Wieża Eiffla ma wysokość około <b>${sci(3,2)}</b> m, a mrówka ma długość około <b>${sci(4,-3)}</b> m. Ile razy wysokość wieży jest większa od długości mrówki? Wynik podaj w notacji wykładniczej.`, [sci('7,5',-1),sci('7,5',5),sci('1,2',0),sci('7,5',4)],3,`Dzielimy: 3 : 4 = 0,75 oraz ${e10(2)} : ${e10(-3)} = ${e10(5)}, czyli ${sci('0,75',5)} = <b>${sci('7,5',4)}</b> = 75 000 razy.`),
 q('on7-16b',`Włos ludzki ma grubość około <b>0,00008</b> m, a bakteria pałeczka okrężnicy ma długość około <b>${sci(2,-6)}</b> m. Ile razy grubość włosa jest większa od długości bakterii?`, ['4','40','400','4000'],1,`0,00008 = ${sci(8,-5)}. Dzielimy: 8 : 2 = 4 oraz ${e10(-5)} : ${e10(-6)} = ${e10(1)}. Wynik: ${sci(4,1)} = <b>40</b> razy.`),
 q('on7-16c',`Średnica Słońca wynosi około <b>${sci('1,4',9)}</b> m, a średnica Księżyca około <b>${sci('3,5',6)}</b> m. Ile razy średnica Słońca jest większa od średnicy Księżyca?`, ['400','40','4000','40 000'],0,`1,4 : 3,5 = 0,4 oraz ${e10(9)} : ${e10(6)} = ${e10(3)}. Wynik: ${sci('0,4',3)} = <b>400</b> razy. Słońce jest też około 400 razy dalej od Ziemi niż Księżyc — dlatego na niebie wyglądają na podobnie duże.`),
 q('on7-16d',`Ziarenko pyłku sosny ma średnicę około <b>${sci(6,-5)}</b> m, a wirus grypy — około <b>${sci(1,-7)}</b> m. Ile razy ziarenko pyłku jest większe od wirusa? Wynik podaj w notacji wykładniczej.`, [sci(6,-12),sci(6,1),sci(6,2),sci(6,3)],2,`6 : 1 = 6 oraz ${e10(-5)} : ${e10(-7)} = ${e10(2)}, bo −5 − (−7) = 2. Wynik: <b>${sci(6,2)}</b> = 600 razy. ${e10(-12)} to dodane wykładniki.`),
 // Zadania tekstowe z działaniami
 q('on7-17a',`Kartka papieru ma grubość około <b>${sci(1,-4)}</b> m. Jaką grubość ma ryza, czyli <b>500</b> kartek? Wynik podaj w notacji wykładniczej.`, [sci(5,-2),sci(5,-6),sci(5,2),sci(5,-3)],0,`500 = ${sci(5,2)}. Mnożymy: 5 · 1 = 5 oraz ${e10(2)} · ${e10(-4)} = ${e10(-2)}. Wynik: <b>${sci(5,-2)}</b> m = 5 cm.`),
 q('on7-17b',`Masa Ziemi wynosi około <b>${sci('5,97',24)}</b> kg, a masa Księżyca — około <b>${sci('7,35',22)}</b> kg. Ile wynosi suma tych mas? Wynik podaj w notacji wykładniczej.`, [sci('1,332',25),sci('6,0435',24),sci('1,332',47),sci('6,0435',22)],1,`Wyrównujemy wykładniki: ${sci('5,97',24)} = ${sci(597,22)}. Teraz 597 + 7,35 = 604,35, czyli ${sci('604,35',22)} = <b>${sci('6,0435',24)}</b> kg. Dodawanie 5,97 + 7,35 bez wyrównania wykładników to błąd.`),
 q('on7-17c',`Szacuje się, że na Ziemi żyje około <b>${sci(2,16)}</b> mrówek i około <b>${sci(8,9)}</b> ludzi. Ile mrówek przypada na jednego człowieka? Wynik podaj w notacji wykładniczej.`, [sci(4,-7),sci('2,5',7),sci('2,5',6),sci('2,5',26)],2,`Dzielimy liczbę mrówek przez liczbę ludzi: 2 : 8 = 0,25 oraz ${e10(16)} : ${e10(9)} = ${e10(7)}, czyli ${sci('0,25',7)} = <b>${sci('2,5',6)}</b>, czyli 2,5 miliona mrówek. ${sci(4,-7)} to dzielenie w odwrotną stronę.`),
 q('on7-17d',`Wirus ma długość około <b>${sci('1,2',-7)}</b> m, a bakteria — około <b>${sci(3,-6)}</b> m. <b>O ile</b> metrów bakteria jest dłuższa od wirusa? Wynik podaj w notacji wykładniczej.`, [sci('1,8',-6),sci('2,88',-7),sci('2,5',1),sci('2,88',-6)],3,`„O ile” to różnica. Wyrównujemy wykładniki: ${sci('1,2',-7)} = ${sci('0,12',-6)}. Teraz 3 − 0,12 = 2,88, więc różnica to <b>${sci('2,88',-6)}</b> m. ${sci('2,5',1)} = 25 odpowiada na pytanie „ile razy”.`),
];

// Klasa 7, dział „Pierwiastki”: pierwiastek kwadratowy. Zadania od najłatwiejszych do najtrudniejszych (ordered).
const R = (x) => `<span class="sqrt"><span>${x}</span></span>`;
const neg = (s) => `−${s}`;
const nat = (n) => `Między którymi kolejnymi liczbami naturalnymi leży liczba <b>${R(n)}</b>?`;
const side = (pole) => `Pole kwadratu jest równe <b>${pole}</b>. Jaką długość ma bok tego kwadratu?`;
const perim = (pole) => `Pole kwadratu jest równe <b>${pole}</b>. Ile wynosi obwód tego kwadratu?`;
const rect = (a, b) => `Prostokąt ma boki długości <b>${a}</b> i <b>${b}</b>. Jaką długość ma bok kwadratu o takim samym polu?`;
const root = (a) => `Jaką liczbę trzeba wstawić w miejsce <i>a</i>, aby otrzymać równość <b>${R('<i>a</i>')} = ${a}</b>?`;
const CHECK = 'Pierwiastek kwadratowy z liczby to taka liczba nieujemna, która podniesiona do kwadratu daje tę liczbę.';

export const squareRootQuestions7 = [
 // Pierwiastki z kwadratów liczb naturalnych
 q('pk7-1a',calc(R(64)), ['32','8','16','4'],1,`8 · 8 = 64, więc <b>${R(64)} = 8</b>. 32 to 64 : 2 — pierwiastek to nie połowa liczby.`),
 q('pk7-1b',calc(R(121)), ['11','60,5','12','21'],0,`11 · 11 = 121, więc <b>${R(121)} = 11</b>. 12 · 12 = 144, a 60,5 to połowa liczby 121.`),
 q('pk7-1c',calc(R(196)), ['98','16','14','13'],2,`14 · 14 = 196, więc <b>${R(196)} = 14</b>. Sprawdzamy: 13 · 13 = 169 i 16 · 16 = 256 — za mało i za dużo.`),
 q('pk7-1d',calc(R(169)), ['84,5','17','12','13'],3,`13 · 13 = 169, więc <b>${R(169)} = 13</b>. ${CHECK}`),
 // Bok kwadratu o danym polu
 q('pk7-2a',side('81 cm²'), ['9 cm','20,25 cm','40,5 cm','18 cm'],0,`Pole kwadratu to <i>a</i> · <i>a</i>. 9 · 9 = 81, więc bok ma <b>9 cm</b>. 20,25 cm to 81 : 4 — tak liczy się bok z obwodu, a nie z pola.`),
 q('pk7-2b',side('144 m²'), ['36 m','12 m','72 m','14 m'],1,`${R(144)} = 12, bo 12 · 12 = 144. Bok ma <b>12 m</b>.`),
 q('pk7-2c',side('225 dm²'), ['56,25 dm','25 dm','15 dm','112,5 dm'],2,`${R(225)} = 15, bo 15 · 15 = 225. Bok ma <b>15 dm</b>.`),
 q('pk7-2d',side('400 mm²'), ['100 mm','200 mm','40 mm','20 mm'],3,`${R(400)} = 20, bo 20 · 20 = 400. Bok ma <b>20 mm</b>. 100 mm to 400 : 4.`),
 // Jaka liczba pod pierwiastkiem?
 q('pk7-3a',root(6), ['3','12','36','18'],2,`Pod pierwiastkiem jest kwadrat wyniku: 6² = 6 · 6 = <b>36</b>. Sprawdzenie: ${R(36)} = 6.`),
 q('pk7-3b',root(11), ['121','22','5,5','111'],0,`<i>a</i> = 11² = <b>121</b>. 22 to 11 · 2, a nie 11 · 11.`),
 q('pk7-3c',root('0,5'), ['0,05','0,25','1','2,5'],1,`<i>a</i> = 0,5² = 0,5 · 0,5 = <b>0,25</b>. Sprawdzenie: ${R('0,25')} = 0,5.`),
 q('pk7-3d',root('1,3'), ['2,6','1,9','16,9','1,69'],3,`<i>a</i> = 1,3² = 1,3 · 1,3 = <b>1,69</b>. 2,6 to 1,3 · 2.`),
 // Pierwiastek i kwadrat się znoszą
 q('pk7-4a',calc(p(`(${R(23)})`,2)), ['529','46',R(23),'23'],3,`(${R(23)})² = ${R(23)} · ${R(23)}, a to jest liczba, która podniesiona do kwadratu daje 23. Wynik: <b>23</b>. Nie trzeba liczyć 23².`),
 q('pk7-4b',calc(R(p(41,2))), ['1681','41','82','20,5'],1,`${R(p(41,2))} to liczba nieujemna, której kwadrat jest równy 41². To <b>41</b>. Kwadrat i pierwiastek się znoszą.`),
 q('pk7-4c',calc(`${R(17)} · ${R(17)}`), ['289','34','17',R(34)],2,`${R(17)} · ${R(17)} = (${R(17)})² = <b>17</b>. 289 to 17 · 17, a 34 to 17 + 17.`),
 q('pk7-4d',calc(R(p('0,7',2))), ['0,7','0,49','1,4','0,07'],0,`${R(p('0,7',2))} = <b>0,7</b>, bo 0,7 jest liczbą nieujemną, której kwadrat to 0,7². Można też policzyć: 0,7² = 0,49 i ${R('0,49')} = 0,7.`),
 // Pełne dziesiątki i setki
 q('pk7-5a',calc(R(4900)), ['700','70','2450','7'],1,`70 · 70 = 4900, więc <b>${R(4900)} = 70</b>. Zera „zabieramy” parami: pod pierwiastkiem są dwa zera, w wyniku zostaje jedno.`),
 q('pk7-5b',calc(R(1600)), ['400','160','40','800'],2,`40 · 40 = 1600, więc <b>${R(1600)} = 40</b>. 400 · 400 = 160 000 — za dużo.`),
 q('pk7-5c',calc(R('250 000')), ['500','5000','50','125 000'],0,`500 · 500 = 250 000, więc <b>${R('250 000')} = 500</b>. 25 pod pierwiastkiem daje 5, a z czterech zer zostają dwa.`),
 q('pk7-5d',calc(R('1 000 000')), ['10 000','100 000','500 000','1000'],3,`1000 · 1000 = 1 000 000, więc <b>${R('1 000 000')} = 1000</b>. Sześć zer pod pierwiastkiem, trzy w wyniku.`),
 // Ułamki zwykłe
 q('pk7-6a',calc(R(f(25,64))), [f(5,8),f(25,8),f(5,64),f(5,32)],0,`Pierwiastkujemy licznik i mianownik: ${f(R(25),R(64))} = <b>${f(5,8)}</b>. Sprawdzenie: ${f(5,8)} · ${f(5,8)} = ${f(25,64)}.`),
 q('pk7-6b',calc(R(f(49,81))), [f(7,81),f(49,9),f(7,9),f(9,7)],2,`${f(R(49),R(81))} = <b>${f(7,9)}</b>. Pierwiastek wyciągamy i z licznika, i z mianownika.`),
 q('pk7-6c',calc(R(f(1,36))), [f(1,18),f(1,72),f(1,36),f(1,6)],3,`${f(R(1),R(36))} = <b>${f(1,6)}</b>, bo ${f(1,6)} · ${f(1,6)} = ${f(1,36)}. ${f(1,18)} to ${f(1,36)} · 2 — pierwiastek to nie mnożenie przez 2.`),
 q('pk7-6d',calc(R(f(16,169))), [f(16,13),f(4,13),f(8,13),f(4,169)],1,`${f(R(16),R(169))} = <b>${f(4,13)}</b>, bo 4 · 4 = 16 i 13 · 13 = 169.`),
 // Ułamki dziesiętne
 q('pk7-7a',calc(R('0,49')), ['0,07','0,7','0,245','7'],1,`0,7 · 0,7 = 0,49, więc <b>${R('0,49')} = 0,7</b>. 0,07 · 0,07 = 0,0049 — za mało.`),
 q('pk7-7b',calc(R('0,0009')), ['0,3','0,003','0,03','0,0003'],2,`0,03 · 0,03 = 0,0009, więc <b>${R('0,0009')} = 0,03</b>. Wynik ma dwa razy mniej miejsc po przecinku: 4 → 2.`),
 q('pk7-7c',calc(R('1,69')), ['1,3','0,13','13','0,845'],0,`1,3 · 1,3 = 1,69, więc <b>${R('1,69')} = 1,3</b>.`),
 q('pk7-7d',calc(R('0,0121')), ['1,1','0,011','0,0011','0,11'],3,`0,11 · 0,11 = 0,0121, więc <b>${R('0,0121')} = 0,11</b>. Cztery miejsca po przecinku pod pierwiastkiem, dwa w wyniku.`),
 // Kilka pierwiastków w jednym działaniu
 q('pk7-8a',calc(`${R(25)} + ${R(49)} + ${R(81)}`), ['155','21','35','19'],1,`5 + 7 + 9 = <b>21</b>. 155 to 25 + 49 + 81 — zapomniany pierwiastek.`),
 q('pk7-8b',calc(`${R(144)} − ${R(64)} + ${R(9)}`), ['7','1','89','17'],0,`12 − 8 + 3 = <b>7</b>. Dodawanie i odejmowanie wykonujemy po kolei, od lewej: wynik 1 to 12 − (8 + 3).`),
 q('pk7-8c',calc(`${R(100)} − ${R(36)} · ${R(4)}`), ['8','4','−2','2'],2,`10 − 6 · 2 = 10 − 12 = <b>−2</b>. Mnożenie przed odejmowaniem — 8 to (10 − 6) · 2.`),
 q('pk7-8d',calc(`${R(225)} : ${R(25)} + ${R(16)}`), ['3',m(1,2,3),'19','7'],3,`15 : 5 + 4 = 3 + 4 = <b>7</b>. ${m(1,2,3)} to 15 : (5 + 4) — dzielenie wykonujemy przed dodawaniem.`),
 // Prawda czy fałsz
 pair('pk7-9a',`${R('9 + 16')} = ${R(9)} + ${R(16)}`,`${R('4 · 25')} = ${R(4)} · ${R(25)}`,'FP',`I: ${R(25)} = 5, a 3 + 4 = 7 — <b>fałsz</b>. Pierwiastek z sumy to nie suma pierwiastków. II: ${R(100)} = 10 i 2 · 5 = 10 — <b>prawda</b>.`),
 pair('pk7-9b',`${R('36 : 4')} = ${R(36)} : ${R(4)}`,`${R('100 − 64')} = ${R(100)} − ${R(64)}`,'PF',`I: ${R(9)} = 3 i 6 : 2 = 3 — <b>prawda</b>. II: ${R(36)} = 6, a 10 − 8 = 2 — <b>fałsz</b>.`),
 pair('pk7-9c',`${R('0,09')} = 0,3`,`${R(m(2,1,4))} = ${m(1,1,2)}`,'PP',`I: 0,3 · 0,3 = 0,09 — <b>prawda</b>. II: ${m(2,1,4)} = ${f(9,4)}, a ${R(f(9,4))} = ${f(3,2)} = ${m(1,1,2)} — <b>prawda</b>.`),
 pair('pk7-9d',`${R('0,4')} = 0,2`,`${R(m(1,9,16))} = ${m(1,3,4)}`,'FF',`I: 0,2 · 0,2 = 0,04, a nie 0,4 — <b>fałsz</b>. II: ${m(1,9,16)} = ${f(25,16)}, więc pierwiastek to ${f(5,4)} = ${m(1,1,4)} — <b>fałsz</b>.`),
 // Liczby mieszane
 q('pk7-10a',calc(R(m(2,7,9))), [m(1,2,3),f(25,9),m(1,1,3),m(2,1,3)],0,`Najpierw ułamek niewłaściwy: ${m(2,7,9)} = ${f(25,9)}. Potem ${R(f(25,9))} = ${f(5,3)} = <b>${m(1,2,3)}</b>.`),
 q('pk7-10b',calc(R(m(1,13,36))), [f(49,36),m(1,1,6),m(1,5,6),f(7,36)],1,`${m(1,13,36)} = ${f(49,36)}, więc ${R(f(49,36))} = ${f(7,6)} = <b>${m(1,1,6)}</b>. Sprawdzenie: ${f(7,6)} · ${f(7,6)} = ${f(49,36)}.`),
 q('pk7-10c',calc(R(m(6,1,4))), [m(3,1,2),m(6,1,2),m(2,1,2),m(1,1,4)],2,`${m(6,1,4)} = ${f(25,4)}, więc ${R(f(25,4))} = ${f(5,2)} = <b>${m(2,1,2)}</b>.`),
 q('pk7-10d',calc(R(m(1,24,25))), [m(1,1,5),f(49,25),m(2,2,5),m(1,2,5)],3,`${m(1,24,25)} = ${f(49,25)}, więc ${R(f(49,25))} = ${f(7,5)} = <b>${m(1,2,5)}</b>.`),
 // Obwód kwadratu o danym polu
 q('pk7-11a',perim('196 cm²'), ['14 cm','49 cm','56 cm','28 cm'],2,`Bok: ${R(196)} = 14 cm. Obwód: 4 · 14 cm = <b>56 cm</b>. 14 cm to sam bok, a 49 cm to 196 : 4.`),
 q('pk7-11b',perim('1,21 m²'), ['4,4 m','1,1 m','4,84 m','0,3025 m'],0,`Bok: ${R('1,21')} = 1,1 m. Obwód: 4 · 1,1 m = <b>4,4 m</b>.`),
 q('pk7-11c',perim('0,25 dm²'), ['1 dm','0,5 dm','0,0625 dm','2 dm'],3,`Bok: ${R('0,25')} = 0,5 dm. Obwód: 4 · 0,5 dm = <b>2 dm</b>.`),
 q('pk7-11d',perim(`${m(2,1,4)} km²`), ['9 km','6 km','1,5 km','3 km'],1,`${m(2,1,4)} = ${f(9,4)}, więc bok: ${R(f(9,4))} = ${f(3,2)} = 1,5 km. Obwód: 4 · 1,5 km = <b>6 km</b>.`),
 // Kwadrat o polu takim jak prostokąt
 q('pk7-12a',rect('4 cm','9 cm'), ['6,5 cm','6 cm','13 cm','36 cm'],1,`Pole prostokąta: 4 · 9 = 36 cm². Bok kwadratu: ${R(36)} = <b>6 cm</b>. 6,5 cm to średnia boków — wtedy pole byłoby 42,25 cm².`),
 q('pk7-12b',rect('0,4 dm','3,6 dm'), ['2 dm','1,44 dm','1,2 dm','12 dm'],2,`Pole: 0,4 · 3,6 = 1,44 dm². Bok kwadratu: ${R('1,44')} = <b>1,2 dm</b>.`),
 q('pk7-12c',rect('2 m','32 m'), ['8 m','17 m','16 m','34 m'],0,`Pole: 2 · 32 = 64 m². Bok kwadratu: ${R(64)} = <b>8 m</b>.`),
 q('pk7-12d',rect('0,9 m','10 m'), ['5,45 m','9 m','4,5 m','3 m'],3,`Pole: 0,9 · 10 = 9 m². Bok kwadratu: ${R(9)} = <b>3 m</b>. 9 m to pole, a nie bok.`),
 // Między którymi liczbami naturalnymi?
 q('pk7-13a',nat(55), ['27 i 28','5 i 6','7 i 8','6 i 7'],2,`7² = 49 &lt; 55 &lt; 64 = 8², więc ${R(49)} &lt; ${R(55)} &lt; ${R(64)}, czyli <b>7 &lt; ${R(55)} &lt; 8</b>.`),
 q('pk7-13b',nat(90), ['9 i 10','8 i 9','45 i 46','10 i 11'],0,`9² = 81 &lt; 90 &lt; 100 = 10², więc <b>9 &lt; ${R(90)} &lt; 10</b>.`),
 q('pk7-13c',nat(20), ['3 i 4','10 i 11','5 i 6','4 i 5'],3,`4² = 16 &lt; 20 &lt; 25 = 5², więc <b>4 &lt; ${R(20)} &lt; 5</b>.`),
 q('pk7-13d',nat(130), ['12 i 13','11 i 12','65 i 66','10 i 11'],1,`11² = 121 &lt; 130 &lt; 144 = 12², więc <b>11 &lt; ${R(130)} &lt; 12</b>.`),
 // Zadania tekstowe
 q('pk7-14a',`Działka w kształcie kwadratu ma powierzchnię <b>900 m²</b>. Ile metrów siatki potrzeba, żeby ogrodzić ją dookoła?`, ['30 m','225 m','60 m','120 m'],3,`Bok działki: ${R(900)} = 30 m. Siatka idzie dookoła, więc liczymy obwód: 4 · 30 m = <b>120 m</b>.`),
 q('pk7-14b',`Kwadratowa płytka ma pole <b>0,09 m²</b>. Ile centymetrów ma jej bok?`, ['3 cm','30 cm','9 cm','0,3 cm'],1,`Bok: ${R('0,09')} = 0,3 m, a 0,3 m = <b>30 cm</b>.`),
 q('pk7-14c',`Kwadratowa szachownica składa się z <b>64</b> jednakowych kwadratowych pól, a jej pole jest równe <b>1600 cm²</b>. Jaką długość ma bok jednego pola?`, ['5 cm','25 cm','40 cm','20 cm'],0,`Bok szachownicy: ${R(1600)} = 40 cm, a wzdłuż boku jest ${R(64)} = 8 pól. 40 cm : 8 = <b>5 cm</b>. Inaczej: jedno pole ma 1600 : 64 = 25 cm², a ${R(25)} = 5.`),
 q('pk7-14d',`Ola obszywa koronką dookoła kwadratową serwetkę o polu <b>625 cm²</b>. Ile centymetrów koronki zużyje?`, ['25 cm','156,25 cm','100 cm','50 cm'],2,`Bok serwetki: ${R(625)} = 25 cm, bo 25 · 25 = 625. Koronka idzie dookoła: 4 · 25 cm = <b>100 cm</b>.`),
 // Działania z ułamkami dziesiętnymi
 q('pk7-15a',calc(`${R('0,04')} · ${R(2500)}`), ['100','1','10','0,1'],2,`${R('0,04')} = 0,2 i ${R(2500)} = 50, więc 0,2 · 50 = <b>10</b>.`),
 q('pk7-15b',calc(`4${R('0,36')} − 0,5${R(64)}`), ['1,6','−1,6','−0,4','2,8'],1,`4 · ${R('0,36')} = 4 · 0,6 = 2,4 oraz 0,5 · ${R(64)} = 0,5 · 8 = 4. Zatem 2,4 − 4 = <b>−1,6</b>.`),
 q('pk7-15c',calc(`${R('1,44')} + ${R('0,25')} · ${R(100)}`), ['17','1,7','11,2','6,2'],3,`1,2 + 0,5 · 10 = 1,2 + 5 = <b>6,2</b>. Mnożenie przed dodawaniem — 17 to (1,2 + 0,5) · 10.`),
 q('pk7-15d',calc(`(${R('0,81')} − ${R('0,49')}) · ${R(400)}`), ['4','0,4','40','3,2'],0,`(0,9 − 0,7) · 20 = 0,2 · 20 = <b>4</b>.`),
 // Trudniejsze działania z ułamkami
 q('pk7-16a',calc(`${R(m(1,7,9))} − ${R(p(`(${f(2,3)})`,2))} + ${R(f(1,9))}`), [f(1,3),'1',m(2,1,3),f(4,9)],1,`${R(f(16,9))} = ${f(4,3)}, ${R(p(`(${f(2,3)})`,2))} = ${f(2,3)} i ${R(f(1,9))} = ${f(1,3)}. Zatem ${f(4,3)} − ${f(2,3)} + ${f(1,3)} = ${f(3,3)} = <b>1</b>.`),
 q('pk7-16b',calc(`${R(m(2,1,4))} − ${R(f(1,4))} · ${R(36)}`), ['6',m(1,1,2),'−3',neg(m(1,1,2))],3,`${R(f(9,4))} = ${f(3,2)}, ${R(f(1,4))} = ${f(1,2)} i ${R(36)} = 6. Mnożenie najpierw: ${f(1,2)} · 6 = 3, więc ${f(3,2)} − 3 = <b>${neg(m(1,1,2))}</b>. Wynik 6 to (${f(3,2)} − ${f(1,2)}) · 6.`),
 q('pk7-16c',calc(`(${R(m(3,1,16))} − ${R(f(9,16))}) · ${R('0,64')}`), ['0,8','1,15','4','0,08'],0,`${m(3,1,16)} = ${f(49,16)}, więc ${R(f(49,16))} = ${f(7,4)}, a ${R(f(9,16))} = ${f(3,4)}. W nawiasie ${f(7,4)} − ${f(3,4)} = 1, a ${R('0,64')} = 0,8. Wynik: 1 · 0,8 = <b>0,8</b>.`),
 q('pk7-16d',calc(`${R(m(5,1,16))} : ${R(f(9,64))} − ${R(49)}`), ['13','6','−1',f(27,32)],2,`${m(5,1,16)} = ${f(81,16)}, więc ${R(f(81,16))} = ${f(9,4)}, a ${R(f(9,64))} = ${f(3,8)}. Dzielenie: ${f(9,4)} : ${f(3,8)} = ${f(9,4)} · ${f(8,3)} = 6. Potem 6 − 7 = <b>−1</b>.`),
];

// Klasa 7, dział „Pierwiastki”: szacowanie pierwiastków. Zadania od najłatwiejszych do najtrudniejszych (ordered).
const IRR = 'Która z podanych liczb jest <b>niewymierna</b>?';
const betweenNat = (n) => `Między którymi kolejnymi liczbami naturalnymi leży na osi liczbowej liczba <b>${R(n)}</b>?`;
const nearest = (n) => `Do której liczby naturalnej jest najbliżej liczba <b>${R(n)}</b>?`;
const naturals = (a, b) => `Jakie liczby naturalne leżą na osi liczbowej między liczbami <b>${R(a)}</b> i <b>${R(b)}</b>?`;
const howMany = (a, b) => `Ile jest liczb naturalnych <i>m</i> spełniających warunek <b>${R(a)} &lt; <i>m</i> &lt; ${R(b)}</b>?`;
const BIGGEST = 'Która z podanych liczb jest <b>największa</b>?';
const BOX = `Wiedząc, że ${R(2)} ≈ 1,41, ${R(3)} ≈ 1,73, ${R(5)} ≈ 2,24 i ${R(10)} ≈ 3,16, oblicz`;
const tiles = (n, what) => `Uczniowie mają <b>${n}</b> jednakowych kwadratowych ${what}. Z jak największej ich liczby chcą ułożyć jeden duży kwadrat. Ile ${what} zostanie?`;
const rng = (lo) => `większa od ${lo} i mniejsza od ${lo + 1}`;
const UNDER10 = 'Wartość którego wyrażenia jest <b>mniejsza od 10</b>?';
const addTo = (a, b) => `Do liczby <b>−${R(a)}</b> dodajemy <b>${b}</b>. Otrzymany wynik jest liczbą`;
const ADDED = ['większą od 1', 'dodatnią mniejszą od 1', 'ujemną większą od −1', 'mniejszą od −1'];
const three = (a, b, c, cond) => `Dane są trzy liczby:<div class="task-statements">I. ${a}<br>II. ${b}<br>III. ${c}</div>Które z tych liczb są <b>${cond}</b>?`;
const where = (a, b, truth, explain) => (id) => q(id, `Czy podane zdania są prawdziwe?<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
const IRRWHY = 'Pierwiastek z liczby naturalnej, która nie jest kwadratem liczby naturalnej, jest liczbą niewymierną.';

export const rootEstimationQuestions7 = [
 // Liczby niewymierne wśród pierwiastków z liczb naturalnych
 q('sp7-1a',IRR, [R(36),R(52),R(81),R(100)],1,`7² = 49 i 8² = 64, więc 52 nie jest kwadratem żadnej liczby naturalnej — <b>${R(52)}</b> jest niewymierny. Pozostałe: ${R(36)} = 6, ${R(81)} = 9, ${R(100)} = 10. ${IRRWHY}`),
 q('sp7-1b',IRR, [R(63),R(64),R(121),R(25)],0,`7² = 49 i 8² = 64, a 63 leży między nimi, więc <b>${R(63)}</b> jest niewymierny. ${R(64)} = 8, ${R(121)} = 11, ${R(25)} = 5.`),
 q('sp7-1c',IRR, [R(144),R(169),R(170),R(196)],2,`13² = 169 i 14² = 196, więc 170 nie jest kwadratem — <b>${R(170)}</b> jest niewymierny. ${R(144)} = 12, ${R(169)} = 13, ${R(196)} = 14.`),
 q('sp7-1d',IRR, [R(225),R(1),R(400),R(99)],3,`9² = 81 i 10² = 100, więc <b>${R(99)}</b> jest niewymierny. ${R(225)} = 15, ${R(1)} = 1, ${R(400)} = 20.`),
 // Liczby niewymierne wśród pierwiastków z ułamków
 q('sp7-2a',IRR, [R(f(16,49)),R('0,25'),R(f(9,20)),R('1,44')],2,`20 nie jest kwadratem liczby naturalnej, więc <b>${R(f(9,20))}</b> jest niewymierny. Pozostałe: ${R(f(16,49))} = ${f(4,7)}, ${R('0,25')} = 0,5, ${R('1,44')} = 1,2.`),
 q('sp7-2b',IRR, [R('0,4'),R(f(1,64)),R('0,81'),R(m(2,1,4))],0,`0,4 = ${f(4,10)} = ${f(2,5)}, a ani 2, ani 5 nie są kwadratami, więc <b>${R('0,4')}</b> jest niewymierny. Uwaga: 0,2² = 0,04, a nie 0,4. Pozostałe: ${R(f(1,64))} = ${f(1,8)}, ${R('0,81')} = 0,9, ${R(m(2,1,4))} = ${R(f(9,4))} = ${m(1,1,2)}.`),
 q('sp7-2c',IRR, [R(f(25,36)),R('1,6'),R('0,01'),R(m(1,7,9))],1,`1,6 = ${f(16,10)} = ${f(8,5)} — to nie jest kwadrat ułamka, więc <b>${R('1,6')}</b> jest niewymierny. Sprawdzenie: 1,2² = 1,44 i 1,3² = 1,69, a 1,6 leży między nimi. Pozostałe: ${R(f(25,36))} = ${f(5,6)}, ${R('0,01')} = 0,1, ${R(m(1,7,9))} = ${R(f(16,9))} = ${f(4,3)}.`),
 q('sp7-2d',IRR, [R('0,64'),R(f(4,121)),R(m(3,1,16)),R(f(49,60))],3,`60 nie jest kwadratem liczby naturalnej, więc <b>${R(f(49,60))}</b> jest niewymierny. Pozostałe: ${R('0,64')} = 0,8, ${R(f(4,121))} = ${f(2,11)}, ${R(m(3,1,16))} = ${R(f(49,16))} = ${f(7,4)}.`),
 // Między którymi liczbami naturalnymi?
 q('sp7-3a',betweenNat(33), ['5 i 6','16 i 17','6 i 7','4 i 5'],0,`5² = 25 &lt; 33 &lt; 36 = 6², więc <b>5 &lt; ${R(33)} &lt; 6</b>. 16 i 17 to połowa liczby 33 — pierwiastek to nie dzielenie przez 2.`),
 q('sp7-3b',betweenNat(58), ['29 i 30','8 i 9','6 i 7','7 i 8'],3,`7² = 49 &lt; 58 &lt; 64 = 8², więc <b>7 &lt; ${R(58)} &lt; 8</b>.`),
 q('sp7-3c',betweenNat(105), ['52 i 53','9 i 10','10 i 11','11 i 12'],2,`10² = 100 &lt; 105 &lt; 121 = 11², więc <b>10 &lt; ${R(105)} &lt; 11</b>.`),
 q('sp7-3d',betweenNat(150), ['11 i 12','12 i 13','75 i 76','13 i 14'],1,`12² = 144 &lt; 150 &lt; 169 = 13², więc <b>12 &lt; ${R(150)} &lt; 13</b>.`),
 // Przybliżenie do całości
 q('sp7-4a',nearest(26), ['6','13','5','4'],2,`5² = 25 i 5,5² = 30,25. Skoro 25 &lt; 26 &lt; 30,25, to 5 &lt; ${R(26)} &lt; 5,5, więc ${R(26)} ≈ <b>5</b>.`),
 q('sp7-4b',nearest(47), ['7','6','23','8'],0,`6,5² = 42,25 i 7² = 49. Skoro 42,25 &lt; 47 &lt; 49, to 6,5 &lt; ${R(47)} &lt; 7, więc ${R(47)} ≈ <b>7</b>.`),
 q('sp7-4c',nearest(83), ['10','41','8','9'],3,`9² = 81 i 9,5² = 90,25. Skoro 81 &lt; 83 &lt; 90,25, to 9 &lt; ${R(83)} &lt; 9,5, więc ${R(83)} ≈ <b>9</b>.`),
 q('sp7-4d',nearest(118), ['10','11','59','12'],1,`10,5² = 110,25 i 11² = 121. Skoro 110,25 &lt; 118 &lt; 121, to 10,5 &lt; ${R(118)} &lt; 11, więc ${R(118)} ≈ <b>11</b>.`),
 // Większe liczby pod pierwiastkiem
 q('sp7-5a',betweenNat(350), ['17 i 18','18 i 19','175 i 176','19 i 20'],1,`18² = 324 &lt; 350 &lt; 361 = 19², więc <b>18 &lt; ${R(350)} &lt; 19</b>.`),
 q('sp7-5b',betweenNat(500), ['21 i 22','250 i 251','23 i 24','22 i 23'],3,`22² = 484 &lt; 500 &lt; 529 = 23², więc <b>22 &lt; ${R(500)} &lt; 23</b>. Najpierw szacujemy z grubsza: 20² = 400 i 30² = 900, a potem sprawdzamy kolejne kwadraty.`),
 q('sp7-5c',betweenNat(700), ['26 i 27','25 i 26','27 i 28','350 i 351'],0,`26² = 676 &lt; 700 &lt; 729 = 27², więc <b>26 &lt; ${R(700)} &lt; 27</b>.`),
 q('sp7-5d',betweenNat(1100), ['32 i 33','550 i 551','33 i 34','34 i 35'],2,`33² = 1089 &lt; 1100 &lt; 1156 = 34², więc <b>33 &lt; ${R(1100)} &lt; 34</b>.`),
 // Jakie liczby naturalne leżą między pierwiastkami?
 q('sp7-6a',naturals(3,20), ['1, 2, 3, 4','3, 4, 5','2, 3, 4, 5','2, 3, 4'],3,`1 &lt; ${R(3)} &lt; 2 i 4 &lt; ${R(20)} &lt; 5, więc między tymi liczbami leżą <b>2, 3, 4</b>. Liczba 1 jest mniejsza od ${R(3)}, a 5 większa od ${R(20)}.`),
 q('sp7-6b',naturals(10,50), ['3, 4, 5, 6, 7','4, 5, 6','4, 5, 6, 7','5, 6, 7'],2,`3 &lt; ${R(10)} &lt; 4 i 7 &lt; ${R(50)} &lt; 8, więc między nimi leżą <b>4, 5, 6, 7</b>.`),
 q('sp7-6c',naturals(16,60), ['4, 5, 6, 7','5, 6, 7','5, 6, 7, 8','4, 5, 6'],1,`${R(16)} = 4, a 7 &lt; ${R(60)} &lt; 8. Liczba 4 to jeden z końców, a nie liczba „między”, więc zostają <b>5, 6, 7</b>.`),
 q('sp7-6d',naturals(40,90), ['7, 8, 9','6, 7, 8, 9','7, 8, 9, 10','8, 9'],0,`6 &lt; ${R(40)} &lt; 7 i 9 &lt; ${R(90)} &lt; 10, więc między nimi leżą <b>7, 8, 9</b>.`),
 // Ile liczb naturalnych spełnia warunek?
 q('sp7-7a',howMany(8,90), ['6','7','8','82'],1,`2 &lt; ${R(8)} &lt; 3 i 9 &lt; ${R(90)} &lt; 10, więc <i>m</i> = 3, 4, 5, 6, 7, 8, 9 — to <b>7</b> liczb. 82 to 90 − 8: nie odejmujemy liczb spod pierwiastka.`),
 q('sp7-7b',howMany(20,200), ['10','9','11','180'],0,`4 &lt; ${R(20)} &lt; 5 i 14 &lt; ${R(200)} &lt; 15, więc <i>m</i> = 5, 6, …, 14 — to <b>10</b> liczb.`),
 q('sp7-7c',howMany(50,250), ['7','9','200','8'],3,`7 &lt; ${R(50)} &lt; 8 i 15 &lt; ${R(250)} &lt; 16, więc <i>m</i> = 8, 9, …, 15 — to <b>8</b> liczb.`),
 q('sp7-7d',howMany(100,500), ['11','13','12','400'],2,`${R(100)} = 10 i 22 &lt; ${R(500)} &lt; 23. Nierówność jest ostra, więc 10 odpada: <i>m</i> = 11, 12, …, 22 — to <b>12</b> liczb.`),
 // Porównywanie
 q('sp7-8a',BIGGEST, [R(50),'7','6,9',R(45)],0,`Porównujemy kwadraty: (${R(50)})² = 50, 7² = 49, 6,9² = 47,61, (${R(45)})² = 45. Największa jest <b>${R(50)}</b> — trochę większa od 7.`),
 q('sp7-8b',BIGGEST, ['4,5',R(19),R(21),'4,4'],2,`Kwadraty: 4,5² = 20,25, (${R(19)})² = 19, (${R(21)})² = 21, 4,4² = 19,36. Największa jest <b>${R(21)}</b>.`),
 q('sp7-8c',BIGGEST, ['8',R(63),'7,9',R(65)],3,`Kwadraty: 8² = 64, (${R(63)})² = 63, 7,9² = 62,41, (${R(65)})² = 65. Największa jest <b>${R(65)}</b>, bo 65 &gt; 64.`),
 q('sp7-8d',BIGGEST, [R(30),R(35),'5,9','5,8'],1,`Kwadraty: (${R(30)})² = 30, (${R(35)})² = 35, 5,9² = 34,81, 5,8² = 33,64. Największa jest <b>${R(35)}</b>, bo 35 &gt; 34,81.`),
 // Prawda czy fałsz: gdzie leży pierwiastek?
 where(`Liczba ${R(1500)} leży na osi liczbowej między 30 a 40.`,`Liczba ${R(1500)} leży na osi liczbowej między 40 a 50.`,'PF',`30² = 900, 40² = 1600, 50² = 2500. Skoro 900 &lt; 1500 &lt; 1600, to 30 &lt; ${R(1500)} &lt; 40. I — <b>prawda</b>, II — <b>fałsz</b>.`)('sp7-9a'),
 where(`Liczba ${R(700)} leży na osi liczbowej między 20 a 25.`,`Liczba ${R(700)} leży na osi liczbowej między 25 a 30.`,'FP',`25² = 625 i 30² = 900. Skoro 625 &lt; 700 &lt; 900, to 25 &lt; ${R(700)} &lt; 30. I — <b>fałsz</b>, II — <b>prawda</b>.`)('sp7-9b'),
 where(`${R(3000)} &gt; 50`,`${R(3000)} &lt; 60`,'PP',`50² = 2500 &lt; 3000 &lt; 3600 = 60², więc 50 &lt; ${R(3000)} &lt; 60. Oba zdania — <b>prawda</b>.`)('sp7-9c'),
 where(`Liczba ${R(2400)} leży na osi liczbowej między 50 a 60.`,`${R(5000)} &lt; 70`,'FF',`I: 50² = 2500 &gt; 2400, więc ${R(2400)} &lt; 50 — <b>fałsz</b>. II: 70² = 4900 &lt; 5000, więc ${R(5000)} &gt; 70 — <b>fałsz</b>.`)('sp7-9d'),
 // Przybliżenia z ramki
 q('sp7-10a',`${BOX} przybliżoną wartość iloczynu <b>6${R(2)}</b>.`, ['7,41','84,6','8,46','6,82'],2,`6${R(2)} to 6 · ${R(2)} ≈ 6 · 1,41 = <b>8,46</b>. 7,41 to 6 + 1,41 — między liczbą a pierwiastkiem jest mnożenie.`),
 q('sp7-10b',`${BOX} przybliżoną wartość iloczynu <b>3${R(5)}</b>.`, ['5,24','6,72','6,62','67,2'],1,`3 · 2,24 = <b>6,72</b>.`),
 q('sp7-10c',`${BOX} przybliżoną wartość iloczynu <b>5${R(3)}</b>.`, ['8,65','6,73','8,15','86,5'],0,`5 · 1,73 = <b>8,65</b>.`),
 q('sp7-10d',`${BOX} przybliżoną wartość iloczynu <b>2${R(10)}</b>.`, ['5,16','63,2','6,22','6,32'],3,`2 · 3,16 = <b>6,32</b>. 5,16 to 2 + 3,16.`),
 // Przybliżone wartości wyrażeń
 q('sp7-11a',`${BOX} przybliżoną wartość wyrażenia <b>4${R(5)} − ${R(2)}</b>.`, ['6,55','7,55','10,37','8,96'],1,`4 · 2,24 − 1,41 = 8,96 − 1,41 = <b>7,55</b>. Najpierw mnożenie, potem odejmowanie.`),
 q('sp7-11b',`${BOX} przybliżoną wartość wyrażenia <b>3${R(3)} + 2${R(2)}</b>.`, ['7,46','8,81','6,01','8,01'],3,`3 · 1,73 + 2 · 1,41 = 5,19 + 2,82 = <b>8,01</b>.`),
 q('sp7-11c',`${BOX} przybliżoną wartość wyrażenia <b>10${R(10)} − 10${R(2)}</b>.`, ['1,75','16,5','17,5','175'],2,`10 · 3,16 − 10 · 1,41 = 31,6 − 14,1 = <b>17,5</b>.`),
 q('sp7-11d',`${BOX} przybliżoną wartość wyrażenia <b>${R(10)} + ${R(5)} − ${R(3)}</b>.`, ['3,67','4,67','7,13','2,67'],0,`3,16 + 2,24 − 1,73 = 5,40 − 1,73 = <b>3,67</b>. 7,13 to suma wszystkich trzech liczb.`),
 // Największy kwadrat z płytek
 q('sp7-12a',tiles(300,'płytek'), ['11','17','24','13'],0,`17² = 289 &lt; 300 &lt; 324 = 18², więc największy kwadrat ma bok z 17 płytek i zużywa 289 płytek. Zostanie 300 − 289 = <b>11</b>. 17 to bok kwadratu, a nie reszta.`),
 q('sp7-12b',tiles(450,'karteczek'), ['21','34','9','12'],2,`21² = 441 &lt; 450 &lt; 484 = 22², więc kwadrat 21 × 21 zużyje 441 karteczek. Zostanie 450 − 441 = <b>9</b>.`),
 q('sp7-12c',tiles(700,'płytek'), ['26','24','29','4'],1,`26² = 676 &lt; 700 &lt; 729 = 27², więc kwadrat 26 × 26 zużyje 676 płytek. Zostanie 700 − 676 = <b>24</b>. 29 to brak do kwadratu 27 × 27.`),
 q('sp7-12d',tiles(1000,'karteczek'), ['31','24','61','39'],3,`31² = 961 &lt; 1000 &lt; 1024 = 32², więc kwadrat 31 × 31 zużyje 961 karteczek. Zostanie 1000 − 961 = <b>39</b>.`),
 // Liczba z pierwiastkiem — gdzie leży?
 q('sp7-13a',`Liczba <b>3 + ${R(20)}</b> jest`, [rng(4),rng(5),rng(6),rng(7)],3,`4 &lt; ${R(20)} &lt; 5, bo 16 &lt; 20 &lt; 25. Dodajemy 3: 7 &lt; 3 + ${R(20)} &lt; 8. Liczba jest <b>${rng(7)}</b>.`),
 q('sp7-13b',`Liczba <b>10 − ${R(30)}</b> jest`, [rng(4),rng(5),rng(6),rng(3)],0,`5 &lt; ${R(30)} &lt; 6. Odejmujemy od 10 — większy pierwiastek daje mniejszy wynik: 10 − 6 &lt; 10 − ${R(30)} &lt; 10 − 5, czyli 4 &lt; 10 − ${R(30)} &lt; 5. Liczba jest <b>${rng(4)}</b>.`),
 q('sp7-13c',`Liczba <b>${R(65)} + 2</b> jest`, [rng(8),rng(9),rng(10),rng(11)],2,`8 &lt; ${R(65)} &lt; 9, bo 64 &lt; 65 &lt; 81. Dodajemy 2: 10 &lt; ${R(65)} + 2 &lt; 11. Liczba jest <b>${rng(10)}</b>.`),
 q('sp7-13d',`Liczba <b>20 − ${R(130)}</b> jest`, [rng(7),rng(8),rng(9),rng(11)],1,`11 &lt; ${R(130)} &lt; 12, więc 20 − 12 &lt; 20 − ${R(130)} &lt; 20 − 11, czyli 8 &lt; 20 − ${R(130)} &lt; 9. Liczba jest <b>${rng(8)}</b>. 11 i 12 to oszacowanie samego pierwiastka.`),
 // Które wyrażenie jest mniejsze od 10?
 q('sp7-14a',UNDER10, [`3 + ${R(50)}`,`5 + ${R(24)}`,`13 − ${R(8)}`,`2 + ${R(70)}`],1,`${R(24)} &lt; 5, bo 24 &lt; 25, więc <b>5 + ${R(24)}</b> &lt; 10. Pozostałe są większe od 10: ${R(50)} &gt; 7, ${R(8)} &lt; 3 (więc 13 − ${R(8)} &gt; 10), ${R(70)} &gt; 8.`),
 q('sp7-14b',UNDER10, [`6 + ${R(17)}`,`16 − ${R(35)}`,`4 + ${R(37)}`,`1 + ${R(80)}`],3,`${R(80)} &lt; 9, bo 80 &lt; 81, więc <b>1 + ${R(80)}</b> &lt; 10. Pozostałe: ${R(17)} &gt; 4, ${R(35)} &lt; 6 (więc 16 − ${R(35)} &gt; 10), ${R(37)} &gt; 6.`),
 q('sp7-14c',UNDER10, [R(99),`7 + ${R(10)}`,`12 − ${R(3)}`,`${R(26)} + 5`],0,`${R(99)} &lt; ${R(100)} = 10, więc <b>${R(99)}</b> &lt; 10. Pozostałe: ${R(10)} &gt; 3, ${R(3)} &lt; 2 (więc 12 − ${R(3)} &gt; 10), ${R(26)} &gt; 5.`),
 q('sp7-14d',UNDER10, [`8 + ${R(5)}`,`14 − ${R(15)}`,`3 + ${R(48)}`,`2 + ${R(65)}`],2,`${R(48)} &lt; 7, bo 48 &lt; 49, więc <b>3 + ${R(48)}</b> &lt; 10. Pozostałe: ${R(5)} &gt; 2, ${R(15)} &lt; 4 (więc 14 − ${R(15)} &gt; 10), ${R(65)} &gt; 8.`),
 // Do liczby −√a dodajemy b
 q('sp7-15a',addTo(15,5), ADDED,0,`3 &lt; ${R(15)} &lt; 4, więc −4 &lt; −${R(15)} &lt; −3. Po dodaniu 5: 1 &lt; 5 − ${R(15)} &lt; 2. Wynik jest <b>większy od 1</b>.`),
 q('sp7-15b',addTo(50,8), ADDED,1,`7 &lt; ${R(50)} &lt; 8, więc −8 &lt; −${R(50)} &lt; −7. Po dodaniu 8: 0 &lt; 8 − ${R(50)} &lt; 1. Wynik jest <b>dodatni i mniejszy od 1</b>.`),
 q('sp7-15c',addTo(70,8), ADDED,2,`8 &lt; ${R(70)} &lt; 9, więc −9 &lt; −${R(70)} &lt; −8. Po dodaniu 8: −1 &lt; 8 − ${R(70)} &lt; 0. Wynik jest <b>ujemny i większy od −1</b>.`),
 q('sp7-15d',addTo(90,7), ADDED,3,`9 &lt; ${R(90)} &lt; 10, więc −10 &lt; −${R(90)} &lt; −9. Po dodaniu 7: −3 &lt; 7 − ${R(90)} &lt; −2. Wynik jest <b>mniejszy od −1</b>.`),
 // Które z trzech liczb spełniają warunek?
 q('sp7-16a',three(R(85),`4 + ${R(24)}`,`6 + ${R(10)}`,'większe od 9'), ['Tylko I','Tylko I i II','Tylko I i III','Tylko II i III'],2,`I: ${R(85)} &gt; ${R(81)} = 9 — tak. II: ${R(24)} &lt; 5, więc 4 + ${R(24)} &lt; 9 — nie. III: ${R(10)} &gt; 3, więc 6 + ${R(10)} &gt; 9 — tak. Odpowiedź: <b>tylko I i III</b>.`),
 q('sp7-16b',three(R(60),`5 + ${R(10)}`,`12 − ${R(15)}`,'mniejsze od 8'), ['Tylko I','Tylko II','Tylko I i III','Tylko II i III'],0,`I: ${R(60)} &lt; ${R(64)} = 8 — tak. II: ${R(10)} &gt; 3, więc 5 + ${R(10)} &gt; 8 — nie. III: ${R(15)} &lt; 4, więc 12 − ${R(15)} &gt; 8 — nie. Odpowiedź: <b>tylko I</b>.`),
 q('sp7-16c',three(R(140),`9 + ${R(8)}`,`20 − ${R(60)}`,'większe od 12'), ['Tylko I','Tylko I i II','Tylko II i III','Tylko III'],3,`I: ${R(140)} &lt; ${R(144)} = 12 — nie. II: ${R(8)} &lt; 3, więc 9 + ${R(8)} &lt; 12 — nie. III: ${R(60)} &lt; 8, więc 20 − ${R(60)} &gt; 12 — tak. Odpowiedź: <b>tylko III</b>.`),
 q('sp7-16d',three(R(33),`2 + ${R(15)}`,`10 − ${R(15)}`,'mniejsze od 6'), ['Tylko I','Tylko I i II','Tylko II','Wszystkie trzy'],1,`I: ${R(33)} &lt; ${R(36)} = 6 — tak. II: ${R(15)} &lt; 4, więc 2 + ${R(15)} &lt; 6 — tak. III: ${R(15)} &lt; 4, więc 10 − ${R(15)} &gt; 6 — nie. Odpowiedź: <b>tylko I i II</b>.`),
];

// Klasa 7, dział „Pierwiastki”: własności pierwiastkowania. Zadania od najłatwiejszych do najtrudniejszych (ordered).
const k = (c, n) => `${c}${R(n)}`;
const simp = (e) => `Zapisz w najprostszej postaci: <b>${e}</b>`;
const into = (e) => `Włącz liczbę pod znak pierwiastka: <b>${e}</b>`;
const out = (n) => `Wyłącz czynnik przed znak pierwiastka: <b>${R(n)}</b>`;
const area = (a, b) => `Prostokąt ma boki długości <b>${a}</b> i <b>${b}</b>. Ile wynosi jego pole?`;
const rectPF = (a, b, s1, s2, truth, explain) => (id) => q(id, `Prostokąt ma boki długości <b>${a}</b> i <b>${b}</b>. Czy podane zdania są prawdziwe?<div class="task-statements">I. Pole tego prostokąta jest równe ${s1}.<br>II. Obwód tego prostokąta jest równy ${s2}.</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
const solveX = (e) => `Dla jakiej wartości <i>x</i> równość <b>${e}</b> jest prawdziwa?`;
const MULR = `Iloczyn pierwiastków to pierwiastek z iloczynu: ${R('<i>a</i>')} · ${R('<i>b</i>')} = ${R('<i>a</i> · <i>b</i>')}.`;

export const rootPropertyQuestions7 = [
 // Mnożenie pierwiastków
 q('wp7-1a',calc(`${R(3)} · ${R(12)}`), ['6',R(15),'36','15'],0,`${R(3)} · ${R(12)} = ${R('3 · 12')} = ${R(36)} = <b>6</b>. ${MULR} ${R(15)} to dodane liczby, a nie pomnożone.`),
 q('wp7-1b',calc(`${R(2)} · ${R(50)}`), [R(52),'100','10','25'],2,`${R('2 · 50')} = ${R(100)} = <b>10</b>. 100 to liczba pod pierwiastkiem — trzeba jeszcze z niej wyciągnąć pierwiastek.`),
 q('wp7-1c',calc(`${R(5)} · ${R(45)}`), [R(50),'225','50','15'],3,`${R('5 · 45')} = ${R(225)} = <b>15</b>.`),
 q('wp7-1d',calc(`${R(6)} · ${R(24)}`), [R(30),'12','144','30'],1,`${R('6 · 24')} = ${R(144)} = <b>12</b>.`),
 // Dzielenie pierwiastków
 q('wp7-2a',calc(`${R(200)} : ${R(2)}`), ['100',R(198),'5','10'],3,`Iloraz pierwiastków to pierwiastek z ilorazu: ${R('200 : 2')} = ${R(100)} = <b>10</b>.`),
 q('wp7-2b',calc(`${R(108)} : ${R(3)}`), ['6','36',R(105),'3'],0,`${R('108 : 3')} = ${R(36)} = <b>6</b>. 36 to wynik dzielenia pod pierwiastkiem, a nie cały wynik.`),
 q('wp7-2c',calc(f(R(147),R(3))), ['49','7',R(150),'3,5'],1,`${f(R(147),R(3))} = ${R(f(147,3))} = ${R(49)} = <b>7</b>.`),
 q('wp7-2d',calc(`${R('0,8')} : ${R('0,2')}`), ['0,4','4','2',R('0,6')],2,`${R('0,8 : 0,2')} = ${R(4)} = <b>2</b>. 4 to iloraz pod pierwiastkiem.`),
 // Pierwiastek z sumy i różnicy
 q('wp7-3a',calc(R('100 − 36')), ['4','64','2','8'],3,`Najpierw działanie pod pierwiastkiem: 100 − 36 = 64, a ${R(64)} = <b>8</b>. Wynik 4 to ${R(100)} − ${R(36)} = 10 − 6 — tak liczyć nie wolno.`),
 q('wp7-3b',calc(R('169 − 144')), ['5','1','25','13'],0,`169 − 144 = 25, a ${R(25)} = <b>5</b>. 1 to 13 − 12 — pierwiastek z różnicy to nie różnica pierwiastków.`),
 q('wp7-3c',calc(R('0,64 + 0,36')), ['1,4','1','0,1','10'],1,`0,64 + 0,36 = 1, a ${R(1)} = <b>1</b>. 1,4 to 0,8 + 0,6 — pierwiastek z sumy to nie suma pierwiastków.`),
 q('wp7-3d',calc(R('225 − 81')), ['6','144','12','24'],2,`225 − 81 = 144, a ${R(144)} = <b>12</b>. 6 to 15 − 9.`),
 // Iloczyny i ilorazy z ułamkami
 q('wp7-4a',calc(R('9 · 64')), [R(73),'576','24','72'],2,`${R('9 · 64')} = ${R(9)} · ${R(64)} = 3 · 8 = <b>24</b>.`),
 q('wp7-4b',calc(`${R('2,5')} · ${R(10)}`), ['5','25',R('12,5'),'2,5'],0,`${R('2,5 · 10')} = ${R(25)} = <b>5</b>.`),
 q('wp7-4c',calc(`${R(f(9,7))} · ${R(7)}`), [R(63),'9','21','3'],3,`${R(`${f(9,7)} · 7`)} = ${R(9)} = <b>3</b>. Siódemki się skracają.`),
 q('wp7-4d',calc(R(f('0,36','0,25'))), ['0,12','1,2','1,44','0,11'],1,`${f(R('0,36'),R('0,25'))} = ${f('0,6','0,5')} = <b>1,2</b>. 1,44 to sam iloraz 0,36 : 0,25 — bez pierwiastka.`),
 // Dodawanie i odejmowanie pierwiastków podobnych
 q('wp7-5a',simp(`3${R(5)} + 4${R(5)} − 2${R(5)}`), [k(9,5),k(5,5),R(25),k(5,15)],1,`Dodajemy liczby przed pierwiastkami, jak przy wyrazach podobnych: 3 + 4 − 2 = 5, więc wynik to <b>${k(5,5)}</b>. Liczb pod pierwiastkiem nie dodajemy.`),
 q('wp7-5b',simp(`${R(7)} − 6${R(7)} + 2${R(7)}`), [k(3,7),k('−5',7),k('−4',7),k('−3',7)],3,`${R(7)} to 1 · ${R(7)}. 1 − 6 + 2 = −3, więc <b>${k('−3',7)}</b>.`),
 q('wp7-5c',simp(`2${R(11)} + ${R(11)}`), [k(3,11),k(2,22),k(3,22),k(2,11)],0,`2${R(11)} + 1${R(11)} = <b>${k(3,11)}</b>. ${k(2,22)} to błąd: dodane liczby pod pierwiastkiem.`),
 q('wp7-5d',simp(`8${R(6)} − 3${R(6)} − 5${R(6)}`), [k(16,6),k(10,6),'0',R(6)],2,`8 − 3 − 5 = 0, więc wynik to 0 · ${R(6)} = <b>0</b>.`),
 // Włączanie liczby pod pierwiastek
 q('wp7-6a',into(k(4,3)), [R(48),R(12),R(7),R(19)],0,`4 = ${R(16)}, więc 4${R(3)} = ${R(16)} · ${R(3)} = ${R('16 · 3')} = <b>${R(48)}</b>. Pod pierwiastek liczba wchodzi jako swój kwadrat — ${R(12)} to 4 · 3.`),
 q('wp7-6b',into(k(8,2)), [R(16),R(66),R(128),R(10)],2,`8 = ${R(64)}, więc 8${R(2)} = ${R('64 · 2')} = <b>${R(128)}</b>.`),
 q('wp7-6c',into(k(2,13)), [R(26),R(52),R(15),R(169)],1,`2 = ${R(4)}, więc 2${R(13)} = ${R('4 · 13')} = <b>${R(52)}</b>.`),
 q('wp7-6d',into(`${f(1,2)}${R(12)}`), [R(6),R(24),R(48),R(3)],3,`${f(1,2)} = ${R(f(1,4))}, więc ${f(1,2)}${R(12)} = ${R(`${f(1,4)} · 12`)} = <b>${R(3)}</b>. ${R(6)} to błąd: ${f(1,2)} trzeba podnieść do kwadratu.`),
 // Wyłączanie czynnika przed pierwiastek
 q('wp7-7a',out(18), [k(9,2),k(3,2),k(2,3),k(3,6)],1,`18 = 9 · 2, a 9 to kwadrat: ${R(18)} = ${R(9)} · ${R(2)} = <b>${k(3,2)}</b>. Przed pierwiastek wychodzi ${R(9)} = 3, a nie 9.`),
 q('wp7-7b',out(52), [k(4,13),k(13,2),k(26,2),k(2,13)],3,`52 = 4 · 13: ${R(52)} = ${R(4)} · ${R(13)} = <b>${k(2,13)}</b>.`),
 q('wp7-7c',out(98), [k(7,2),k(2,7),k(49,2),k(14,7)],0,`98 = 49 · 2: ${R(98)} = ${R(49)} · ${R(2)} = <b>${k(7,2)}</b>.`),
 q('wp7-7d',out(300), [k(3,10),k(100,3),k(10,3),k(30,10)],2,`300 = 100 · 3: ${R(300)} = ${R(100)} · ${R(3)} = <b>${k(10,3)}</b>.`),
 // Wyłączanie — szukamy największego kwadratu
 q('wp7-8a',out(162), [k(81,2),k(6,3),k(9,2),k(4,10)],2,`162 = 81 · 2: ${R(162)} = ${R(81)} · ${R(2)} = <b>${k(9,2)}</b>.`),
 q('wp7-8b',out(252), [k(6,7),k(7,6),k(36,7),k(3,14)],0,`252 = 36 · 7: ${R(252)} = ${R(36)} · ${R(7)} = <b>${k(6,7)}</b>. Gdy rozłożymy 252 = 4 · 63, trzeba dalej wyłączać, bo 63 = 9 · 7.`),
 q('wp7-8c',out(363), [k(3,11),k(121,3),k(9,11),k(11,3)],3,`363 = 121 · 3: ${R(363)} = ${R(121)} · ${R(3)} = <b>${k(11,3)}</b>.`),
 q('wp7-8d',out(320), [k(5,8),k(8,5),k(16,5),k(4,10)],1,`320 = 64 · 5: ${R(320)} = ${R(64)} · ${R(5)} = <b>${k(8,5)}</b>. ${k(4,10)} to ${R(160)}, a nie ${R(320)}.`),
 // Najpierw wyłączamy, potem dodajemy
 q('wp7-9a',simp(`${R(12)} + ${R(27)}`), [R(39),k(6,3),k(5,3),k(5,6)],2,`${R(12)} = ${k(2,3)} i ${R(27)} = ${k(3,3)}, więc ${k(2,3)} + ${k(3,3)} = <b>${k(5,3)}</b>. ${R(39)} to błąd: ${R(12)} + ${R(27)} ≠ ${R('12 + 27')}.`),
 q('wp7-9b',simp(`${R(50)} − ${R(8)}`), [k(3,2),R(42),k(7,2),k(3,6)],0,`${R(50)} = ${k(5,2)} i ${R(8)} = ${k(2,2)}, więc ${k(5,2)} − ${k(2,2)} = <b>${k(3,2)}</b>.`),
 q('wp7-9c',simp(`${R(80)} − ${R(20)}`), [R(60),k(6,5),k(4,5),k(2,5)],3,`${R(80)} = ${k(4,5)} i ${R(20)} = ${k(2,5)}, więc ${k(4,5)} − ${k(2,5)} = <b>${k(2,5)}</b>.`),
 q('wp7-9d',simp(`${R(2)} + ${R(18)} + ${R(72)}`), [R(92),k(10,2),k(9,2),k(10,6)],1,`${R(18)} = ${k(3,2)} i ${R(72)} = ${k(6,2)}, więc ${R(2)} + ${k(3,2)} + ${k(6,2)} = (1 + 3 + 6)${R(2)} = <b>${k(10,2)}</b>.`),
 // Mnożenie z liczbami przed pierwiastkiem
 q('wp7-10a',calc(p(`(3${R(2)})`,2)), ['6','18','36','12'],1,`(3${R(2)})² = 3² · (${R(2)})² = 9 · 2 = <b>18</b>. Do kwadratu podnosimy oba czynniki — 6 to 3 · 2.`),
 q('wp7-10b',calc(`2${R(3)} · 4${R(3)}`), [k(8,3),'8',k(6,3),'24'],3,`Mnożymy liczby z liczbami i pierwiastki z pierwiastkami: 2 · 4 · ${R(3)} · ${R(3)} = 8 · 3 = <b>24</b>.`),
 q('wp7-10c',calc(`2${R(3)} · 5${R(6)}`), [k(30,2),'30',k(7,18),k(10,6)],0,`2 · 5 · ${R('3 · 6')} = 10${R(18)} = 10 · 3${R(2)} = <b>${k(30,2)}</b>.`),
 q('wp7-10d',calc(`${R(5)} · (${R(20)} − ${R(5)})`), [R(15),'15','5','10'],2,`Mnożymy każdy wyraz w nawiasie: ${R(5)} · ${R(20)} − ${R(5)} · ${R(5)} = ${R(100)} − 5 = 10 − 5 = <b>5</b>.`),
 // Porównywanie: włączamy liczbę pod pierwiastek
 q('wp7-11a',BIGGEST, [k(3,5),k(2,11),k(4,3),R(46)],2,`Włączamy liczby pod pierwiastek: 3${R(5)} = ${R(45)}, 2${R(11)} = ${R(44)}, 4${R(3)} = ${R(48)}. Największa jest <b>${k(4,3)}</b>.`),
 q('wp7-11b',BIGGEST, [k(5,2),'7',k(2,13),k(3,6)],3,`5${R(2)} = ${R(50)}, 7 = ${R(49)}, 2${R(13)} = ${R(52)}, 3${R(6)} = ${R(54)}. Największa jest <b>${k(3,6)}</b>.`),
 q('wp7-11c',BIGGEST, [R(29),k(2,7),k(3,3),'5,3'],0,`2${R(7)} = ${R(28)}, 3${R(3)} = ${R(27)}, 5,3 = ${R('28,09')}. Największa jest <b>${R(29)}</b>.`),
 q('wp7-11d',BIGGEST, [k(6,2),k(4,5),k(5,3),'8,9'],1,`6${R(2)} = ${R(72)}, 4${R(5)} = ${R(80)}, 5${R(3)} = ${R(75)}, 8,9 = ${R('79,21')}. Największa jest <b>${k(4,5)}</b>.`),
 // Ile razy? O ile?
 q('wp7-12a',`<b>Ile razy</b> liczba ${R(75)} jest większa od liczby ${R(3)}?`, ['25','5',k(4,3),R(72)],1,`„Ile razy” to iloraz: ${R(75)} : ${R(3)} = ${R(25)} = <b>5</b>. 25 to iloraz pod pierwiastkiem.`),
 q('wp7-12b',`<b>O ile</b> liczba ${R(75)} jest większa od liczby ${R(3)}?`, ['5',R(72),k(4,3),'4'],2,`„O ile” to różnica: ${R(75)} = ${k(5,3)}, więc ${k(5,3)} − ${R(3)} = <b>${k(4,3)}</b>. ${R(72)} to błąd: ${R(75)} − ${R(3)} ≠ ${R('75 − 3')}.`),
 q('wp7-12c',`<b>Ile razy</b> liczba ${R(112)} jest większa od liczby ${R(7)}?`, [k(3,7),'16',R(105),'4'],3,`${R(112)} : ${R(7)} = ${R(16)} = <b>4</b>.`),
 q('wp7-12d',`<b>O ile</b> liczba ${R(112)} jest większa od liczby ${R(7)}?`, [k(3,7),'4',R(105),k(4,7)],0,`${R(112)} = ${R('16 · 7')} = ${k(4,7)}, więc ${k(4,7)} − ${R(7)} = <b>${k(3,7)}</b>.`),
 // Pole prostokąta
 q('wp7-13a',area(k(2,3),k(5,3)), [k(10,3),'30',k(7,3),'15'],1,`2${R(3)} · 5${R(3)} = 2 · 5 · ${R(3)} · ${R(3)} = 10 · 3 = <b>30</b>. ${k(10,3)} to błąd: ${R(3)} · ${R(3)} = 3.`),
 q('wp7-13b',area(R(6),R(24)), [R(30),'144','6','12'],3,`${R(6)} · ${R(24)} = ${R(144)} = <b>12</b>.`),
 q('wp7-13c',area(k(3,2),k(4,2)), ['24',k(12,2),k(7,2),'12'],0,`3 · 4 · ${R(2)} · ${R(2)} = 12 · 2 = <b>24</b>.`),
 q('wp7-13d',area(R(5),k(2,20)), ['10','40','20','100'],2,`${R(5)} · 2${R(20)} = 2${R(100)} = 2 · 10 = <b>20</b>.`),
 // Pole i obwód — prawda czy fałsz
 rectPF(k(2,5),k(4,5),'40',k(12,5),'PP',`Pole: 2${R(5)} · 4${R(5)} = 8 · 5 = 40 — <b>prawda</b>. Obwód: 2 · (2${R(5)} + 4${R(5)}) = 2 · 6${R(5)} = 12${R(5)} — <b>prawda</b>.`)('wp7-14a'),
 rectPF(k(3,2),k(4,2),k(12,2),k(14,2),'FP',`Pole: 3${R(2)} · 4${R(2)} = 12 · 2 = 24, a nie 12${R(2)} — <b>fałsz</b>. Obwód: 2 · 7${R(2)} = 14${R(2)} — <b>prawda</b>.`)('wp7-14b'),
 rectPF(R(3),k(3,3),'9',k(4,3),'PF',`Pole: ${R(3)} · 3${R(3)} = 3 · 3 = 9 — <b>prawda</b>. Obwód: 2 · (${R(3)} + 3${R(3)}) = 2 · 4${R(3)} = 8${R(3)}, a nie 4${R(3)} — <b>fałsz</b> (to połowa obwodu).`)('wp7-14c'),
 rectPF(k(2,7),R(7),k(2,7),k(3,7),'FF',`Pole: 2${R(7)} · ${R(7)} = 2 · 7 = 14 — <b>fałsz</b>. Obwód: 2 · 3${R(7)} = 6${R(7)} — <b>fałsz</b>.`)('wp7-14d'),
 // Brakująca liczba przed pierwiastkiem
 q('wp7-15a',solveX(`<i>x</i>${R(2)} = ${R(32)}`), ['16','4','2','8'],1,`${R(32)} = ${R('16 · 2')} = 4${R(2)}, więc <i>x</i> = <b>4</b>. 16 to 32 : 2 — tak byłoby pod pierwiastkiem.`),
 q('wp7-15b',solveX(`<i>x</i>${R(3)} = ${R(75)}`), ['25','72','5','15'],2,`${R(75)} = ${R('25 · 3')} = 5${R(3)}, więc <i>x</i> = <b>5</b>.`),
 q('wp7-15c',solveX(`2<i>x</i>${R(5)} = ${R(180)}`), ['6','18','90','3'],3,`${R(180)} = ${R('36 · 5')} = 6${R(5)}, więc 2<i>x</i> = 6 i <i>x</i> = <b>3</b>. 6 to wartość 2<i>x</i>, a nie <i>x</i>.`),
 q('wp7-15d',solveX(`<i>x</i>${R(7)} = 3${R(28)}`), ['6','3','12','4'],0,`${R(28)} = 2${R(7)}, więc 3${R(28)} = 3 · 2${R(7)} = 6${R(7)}. Zatem <i>x</i> = <b>6</b>.`),
 // Potęgi pod pierwiastkiem
 q('wp7-16a',simp(R(`${p(2,2)} · ${p(3,2)} · 7`)), [k(36,7),k(5,7),k(6,7),k(12,7)],2,`Kwadraty wychodzą przed pierwiastek bez potęgi: ${R(p(2,2))} = 2 i ${R(p(3,2))} = 3. Wynik: 2 · 3${R(7)} = <b>${k(6,7)}</b>.`),
 q('wp7-16b',simp(R(`${p(5,3)} · ${p(2,2)}`)), [k(10,5),k(50,5),k(25,2),k(5,10)],0,`5³ = 5² · 5, więc ${R(`${p(5,2)} · 5 · ${p(2,2)}`)} = 5 · 2 · ${R(5)} = <b>${k(10,5)}</b>.`),
 q('wp7-16c',simp(R(`${p(3,3)} · ${p(11,2)}`)), [k(3,33),k(99,3),k(11,3),k(33,3)],3,`3³ = 3² · 3, więc ${R(`${p(3,2)} · ${p(11,2)} · 3`)} = 3 · 11 · ${R(3)} = <b>${k(33,3)}</b>.`),
 q('wp7-16d',simp(R(`${p(2,5)} · ${p(7,2)}`)), [k(14,2),k(28,2),k(56,2),k(7,10)],1,`2⁵ = 2⁴ · 2 = (2²)² · 2, więc przed pierwiastek wychodzi 2² = 4. Do tego ${R(p(7,2))} = 7: 4 · 7 · ${R(2)} = <b>${k(28,2)}</b>.`),
];
