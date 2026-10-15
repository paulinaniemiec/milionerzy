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
