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
