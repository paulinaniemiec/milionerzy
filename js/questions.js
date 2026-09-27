// Zestaw pytań: „Powtórzenie wiadomości przed egzaminem” – matematyka, 8 klasa.
// Pytania i odpowiedzi 1:1 z prezentacji. `correct` to indeks poprawnej odpowiedzi (0 = A … 3 = D).
// Pola mogą zawierać proste HTML (potęgi <sup>, ułamki .frac).

export const SET_TITLE = 'Powtórzenie wiadomości przed egzaminem';
export const SET_SUBTITLE = 'Matematyka · 8 klasa';

// Drabinka wygranych (jak w polskiej edycji – 12 pytań)
export const LADDER = [500, 1000, 2000, 5000, 10000, 20000, 40000, 75000, 125000, 250000, 500000, 1000000];
// Indeksy pytań, które są progami gwarantowanymi (1000 zł i 40 000 zł)
export const THRESHOLDS = [1, 6];

const x = '<i>x</i>';
const frac = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;

export const QUESTIONS = [
  {
    q: 'W liczbie pięciocyfrowej 258#4, podzielnej przez 4 i niepodzielnej przez 3, cyfrę dziesiątek zastąpiono znakiem „#”. Jakiej cyfry na pewno <b>nie</b> zastąpiono znakiem „#”?',
    answers: ['0', '6', '8', '4'],
    correct: 2,
    explain: `Podzielność przez 4: dwie ostatnie cyfry (#4) muszą tworzyć liczbę podzielną przez 4 → 04, 24, 44, 64, 84, czyli # ∈ {0, 2, 4, 6, 8}.<br>
      Niepodzielność przez 3: suma cyfr 2 + 5 + 8 + # + 4 = 19 + # nie może dzielić się przez 3, więc # ≠ 2, 5, 8.<br>
      Zostają tylko 0, 4, 6 – cyfrą, której <b>na pewno nie</b> zastąpiono, jest <b>8</b>.`,
  },
  {
    q: 'Które zdanie jest <b>fałszywe</b>?',
    answers: [
      'Różnica dwóch liczb nieparzystych jest liczbą nieparzystą.',
      'Iloczyn kolejnych dwóch liczb naturalnych jest liczbą parzystą.',
      'Suma kolejnych dwóch liczb naturalnych jest liczbą nieparzystą.',
      'Suma dwóch liczb nieparzystych jest liczbą parzystą.',
    ],
    correct: 0,
    explain: `Nieparzysta − nieparzysta = <b>parzysta</b>, np. 7 − 3 = 4, więc zdanie A jest fałszywe.<br>
      Pozostałe są prawdziwe: n·(n+1) – jedna z liczb jest parzysta, więc iloczyn jest parzysty; n + (n+1) = 2n + 1 – nieparzysta; nieparzysta + nieparzysta = parzysta.`,
  },
  {
    q: `Uporządkuj dane liczby w kolejności rosnącej.<br><span class="math">a = (−2)<sup>12</sup>&emsp;b = (−2)<sup>11</sup>&emsp;c = 2<sup>10</sup></span>`,
    answers: ['a, b, c', 'b, c, a', 'b, a, c', 'a, c, b'],
    correct: 1,
    explain: `Liczba ujemna do potęgi parzystej daje wynik dodatni, do nieparzystej – ujemny.<br>
      a = (−2)<sup>12</sup> = 4096, &nbsp;b = (−2)<sup>11</sup> = −2048, &nbsp;c = 2<sup>10</sup> = 1024.<br>
      Rosnąco: <b>b &lt; c &lt; a</b>.`,
  },
  {
    q: 'Ala kupiła trzy zeszyty i blok rysunkowy. Średnia arytmetyczna cen tych czterech artykułów była równa 6 zł. Zeszyty kosztowały łącznie 15 zł. Ile kosztował blok?',
    answers: ['9 zł', '8 zł', '5 zł', '4 zł'],
    correct: 0,
    explain: `Suma cen = średnia · liczba artykułów = 6 zł · 4 = 24 zł.<br>
      Blok = 24 zł − 15 zł = <b>9 zł</b>.`,
  },
  {
    q: 'Jaki jest wynik działania <span class="math nowrap">85 645 · 103</span>?',
    answers: ['9 821 435', '9 822 445', '8 822 445', '8 821 435'],
    correct: 3,
    explain: `85 645 · 103 = 85 645 · 100 + 85 645 · 3 = 8 564 500 + 256 935 = <b>8 821 435</b>.<br>
      Szybki sprawdzian: 85 645 · 100 to ok. 8,5 mln, a · 103 to niewiele więcej – odpowiedzi zaczynające się od 9 odpadają od razu.`,
  },
  {
    q: 'Cenę roweru obniżono o 8%. Klient kupił rower po obniżonej cenie i dzięki temu zapłacił o 120 zł mniej, niż zapłaciłby przed obniżką. Ile kosztował ten rower przed obniżką?',
    answers: ['1500 zł', '960 zł', '1380 zł', '2000 zł'],
    correct: 0,
    explain: `8% ceny to 120 zł, więc 1% = 120 : 8 = 15 zł.<br>
      100% = 15 zł · 100 = <b>1500 zł</b>.`,
  },
  {
    q: 'W trójkącie stosunek miar kątów jest równy 2 : 3 : 7. Jaką miarę ma największy kąt?',
    answers: ['100°', '105°', '90°', '95°'],
    correct: 1,
    explain: `Suma kątów w trójkącie = 180°. Części: 2 + 3 + 7 = 12.<br>
      Jedna część: 180° : 12 = 15°. Największy kąt: 7 · 15° = <b>105°</b>.`,
  },
  {
    q: 'Wszystkich liczb naturalnych dwucyfrowych, których obie cyfry są mniejsze od 5, jest:',
    answers: ['16', '30', '20', '25'],
    correct: 2,
    explain: `Cyfra dziesiątek: 1, 2, 3, 4 (nie może być 0) – 4 możliwości.<br>
      Cyfra jedności: 0, 1, 2, 3, 4 – 5 możliwości.<br>
      Razem: 4 · 5 = <b>20</b> liczb.`,
  },
  {
    q: `W pudełku są 4 kule białe i ${x} kul czerwonych. Prawdopodobieństwo wylosowania kuli czerwonej jest równe 0,6, gdy ${x} jest równe:`,
    answers: ['10', '6', '8', '12'],
    correct: 1,
    explain: `P = ${x} / (4 + ${x}) = 0,6<br>
      ${x} = 0,6 · (4 + ${x}) → ${x} = 2,4 + 0,6${x} → 0,4${x} = 2,4 → ${x} = <b>6</b>.<br>
      Sprawdzenie: 6 czerwonych na 10 kul → 6/10 = 0,6 ✓`,
  },
  {
    q: `Rozwiązaniem równania <span class="math nowrap">8(${frac(7, 6)}${x} − 9) − 3(47 − 3${x}) = 7</span> jest liczba:`,
    answers: ['10', '12', '11', '9'],
    correct: 1,
    explain: `8 · ${frac(7, 6)}${x} − 72 − 141 + 9${x} = 7<br>
      ${frac(28, 3)}${x} + ${frac(27, 3)}${x} = 220 → ${frac(55, 3)}${x} = 220 → ${x} = <b>12</b>.<br>
      Sprawdzenie: 8 · (14 − 9) − 3 · (47 − 36) = 40 − 33 = 7 ✓`,
  },
  {
    q: 'Obwód trapezu równoramiennego jest równy 72 cm, ramię ma długość 20 cm, a różnica długości podstaw wynosi 24 cm. Ile cm<sup>2</sup> ma pole tego trapezu?',
    answers: ['225', '256', '169', '289'],
    correct: 1,
    explain: `Podstawy: a + b = 72 − 2 · 20 = 32 cm, a − b = 24 cm → a = 28 cm, b = 4 cm.<br>
      Wysokość (tw. Pitagorasa): odcinek przy dłuższej podstawie = 24 : 2 = 12 cm, h = √(20² − 12²) = √256 = 16 cm.<br>
      Pole = (28 + 4) : 2 · 16 = <b>256 cm²</b>.`,
  },
  {
    q: 'Jaka liczba większa od zera ma tę właściwość, że jak dodamy do niej połowę jej wartości i wyciągniemy pierwiastek z tej sumy, to otrzymamy dokładnie jej połowę?',
    answers: ['7', '5', '6', '4'],
    correct: 2,
    explain: `√(${x} + ${frac(1, 2)}${x}) = ${frac(1, 2)}${x} → 1,5${x} = ${frac(`${x}²`, 4)} → ${x}² = 6${x} → ${x} = <b>6</b> (bo ${x} &gt; 0).<br>
      Sprawdzenie: 6 + 3 = 9, √9 = 3 = połowa z 6 ✓`,
  },
];
