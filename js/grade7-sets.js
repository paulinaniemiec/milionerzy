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
