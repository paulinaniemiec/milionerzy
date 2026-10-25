# Milionerzy – matematyka, klasy 5, 7 i 8

Teleturniej w stylu *Milionerów* z wyborem klasy, a następnie zestawu pytań.
Klasa 5 ma pięć zestawów: podzielność i wielokrotności, liczby pierwsze i złożone, potęgowanie, cyfry rzymskie oraz kolejność wykonywania działań, klasa 7 zestawy podzielone na działy (Procenty, Potęgi), a klasa 8 cztery zestawy: diagramy, prawdopodobieństwo, przygotowanie do egzaminu i procenty.
Zestaw „Procenty — zadania egzaminacyjne” jest wspólny dla klas 7 i 8. Łącznie jest 13 scenariuszy (302 unikalne pytania), 12 pytań w jednej rozgrywce, drabinka 500 zł → 1 000 000 zł,
progi gwarantowane (1000 zł i 40 000 zł), trzy koła ratunkowe i pełna oprawa dźwiękowa.

Działa w przeglądarce na każdym urządzeniu: tablica interaktywna / rzutnik, laptop, tablet, telefon.
Po pierwszym wczytaniu działa też offline (PWA – można „dodać do ekranu głównego”).

## Jak grać

- **A / B / C / D** – wybór odpowiedzi, potem „Tak, ostateczna” (albo **Enter**).
- **50:50** – znikają dwie błędne odpowiedzi.
- **Telefon do przyjaciela** – 30 s rozmowy z wirtualnym ekspertem albo z kimś z klasy (gra odmierza tylko czas).
- **Pytanie do publiczności** – głosuje wirtualna widownia albo cała klasa (nauczyciel wpisuje liczbę rąk w górze).
- **Rezygnuję** – zabierasz dotychczasową wygraną.
- Po każdym pytaniu: **„Pokaż rozwiązanie”** z krótkim omówieniem. Na końcu – omówienie wszystkich pytań.
- Przerwana gra (dzwonek, odświeżenie strony) – na ekranie startowym pojawi się „Wznów przerwaną grę”.
- **M** – wycisz, **F** – pełny ekran, **Esc** – anuluj.

## Uruchomienie lokalne

Gra to statyczne pliki – wystarczy dowolny serwer HTTP:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Publikacja (GitHub Pages)

1. Wypchnij repozytorium na GitHub (gałąź `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Każdy push na `main` publikuje grę przez `.github/workflows/deploy.yml`.
   Adres: `https://<użytkownik>.github.io/<repozytorium>/`.

## Zapisywanie wyników (arkusz Google)

Po zakończeniu gry (błędna odpowiedź, rezygnacja, milion) wynik może trafić do arkusza Google:
data, imię, klasa, zestaw, wynik, wygrana, liczba poprawnych odpowiedzi, ostatnie pytanie i liczba użytych kół.
Bez internetu wyniki czekają na urządzeniu i wysyłają się później. Dopóki adres w `js/results.js` jest pusty,
nic nie jest wysyłane.

Konfiguracja (jednorazowo, ok. 10 minut):

1. Utwórz **nowy, osobny** arkusz Google, np. „Milionerzy – wyniki”. Nie udostępniaj go publicznie.
2. W arkuszu: **Rozszerzenia → Apps Script**, usuń domyślny kod i wklej zawartość [`apps-script/Code.gs`](apps-script/Code.gs). Zapisz.
3. **Wdróż → Nowe wdrożenie → typ: Aplikacja internetowa**. Wykonaj jako: **Ja**, dostęp: **Każdy**. Kliknij „Wdróż”.
4. Google poprosi o uprawnienia. Pojawi się ostrzeżenie „Google nie zweryfikował tej aplikacji”, bo to Twój własny skrypt:
   **Zaawansowane → Przejdź do projektu**. Skrypt prosi tylko o dostęp do tego jednego arkusza (`@OnlyCurrentDoc`).
5. Skopiuj adres aplikacji (`https://script.google.com/macros/s/…/exec`) i wklej go do `RESULTS_URL` w `js/results.js`.

Bezpieczeństwo: adres skryptu jest widoczny w kodzie strony, więc ktoś może dopisać do arkusza fałszywy wiersz.
Nie da się natomiast przez niego niczego odczytać ani zmienić poza dopisaniem wiersza. Skrypt nie ma dostępu do innych
plików na koncie, a treść od graczy jest zapisywana jako zwykły tekst, a nie formuły. Grają uczniowie, więc wystarczy imię albo pseudonim.
Po zmianie `Code.gs` trzeba zrobić **Wdróż → Zarządzaj wdrożeniami → Edytuj → Nowa wersja**, żeby adres się nie zmienił.

## Zmiana pytań

Dotychczasowe 12 pytań znajduje się w [`js/questions.js`](js/questions.js).
Nowe zestawy i katalog scenariuszy są w [`js/scenarios.js`](js/scenarios.js). Każdy scenariusz ma pole
`grade` z wartością `4`, `5`, `7` albo `8` (lista dozwolonych klas: `GRADES` w `js/app.js`). Przed dodaniem następnego zestawu zapytaj właścicielkę projektu, do której klasy go przypisać.
W klasach 5, 7 i 8 zestawy są pogrupowane w działy: pole `section` (np. `'Procenty'`, `'Potęgi'`, `'Statystyka i prawdopodobieństwo'`). W klasie 8 zestawy egzaminacyjne mają dział `'Przygotowanie do egzaminu'`. Każdy zestaw klasy 8 ma za milion 3 plusy i hasło będące nazwą zwierzęcia (FLAMING, KANGUR, PINGWIN, ŻYRAFA, SURYKATKA, LENIWIEC, DELFIN, JEŻOZWIERZ); test pilnuje, żeby hasła się nie powtarzały. Na ekranie wyboru każdy dział ma własny nagłówek, a na telefonie i tablicy dotykowej najpierw wybiera się dział, potem zestaw. Jeśli w klasie choć jeden zestaw ma dział, muszą go mieć wszystkie.

- Klasa 4: Zegary, kalendarz i jednostki długości — 56 pytań z 30 zadań (losowanie 12), na wzór testu „Zegary, kalendarz, cyfry rzymskie, wzdłuż i wszerz”: jednostki czasu, obliczenia na godzinach, tarcza zegara (rysowana w SVG), dni miesięcy i daty w 2026 r., wieki, cyfry rzymskie do XXXIX, mm/cm/m/km. Plik `js/grade4-sets.js`.
- Klasa 4: Oś liczbowa — 33 pytania z 19 zadań (losowanie 12): odczytywanie liczb oznaczonych literami (podpisy przy zerze, w środku osi, co kilka kresek), masy zwierząt z osi, zadania bez rysunku. Osie rysuje ta sama funkcja co w klasie 8 (`line` z `js/axis-sets.js`).
- Klasa 4: Dodawanie i odejmowanie — 41 pytań z 24 zadań (losowanie 12): rachunki w pamięci przez próg dziesiątkowy, pełne setki i tysiące, okienka, sprawdzanie odejmowania, nazwy (składnik, odjemna, odjemnik, różnica), zadania tekstowe, kartoniki z cyframi i kwadrat magiczny. Błędne odpowiedzi to typowe pomyłki uczniów.
- Klasa 4: Szacowanie — 49 pytań z 25 zadań (losowanie 12), na wzór zadań z podręcznika: określenia „około”, „prawie”, „trochę ponad”, „niecałe”, wybór prawdziwego wyniku, hasło z liter (SKLEP), szacunki z ramki, wyniki „na pewno błędne”, zakupy z groszami i bez. Za milion hasło ZAKUPY i 1 plus.
- Klasa 4: Sprytne dodawanie — 49 pytań z 25 zadań (losowanie 12), na wzór zadań z podręcznika: które liczby dodać najpierw, przekładanie do pełnych dziesiątek i setek (69 + 47 = 70 + 46), kolejne liczby naturalne, okienka, tabelka ○ + ■, hasło z liter (DYNIA), jesienne zadania tekstowe. Za milion hasło „Jesienne dodawanie – matematyczne wyzwanie!” i 2 plusy.
- Klasa 4: Sprytne odejmowanie — 58 pytań z 24 zadań, na wzór zadań z podręcznika: zmiana odjemnej i odjemnika, odejmowanie „po kawałku”, powiększanie obu liczb, odejmowanie przez dodawanie, okienka, reszta z banknotu, lata i zadania tekstowe. Zadania są w pliku od najłatwiejszych do najtrudniejszych, a scenariusz ma `ordered: true`: pytanie 1 losuje się z najłatwiejszych zadań, pytanie 12 z najtrudniejszych. Za milion hasło „Minusy pokonane, punkty pozbierane!” i 2 plusy.
- Klasa 4: Powtórzenie: dodawanie i odejmowanie — 54 pytania z 26 zadań, na wzór zadań powtórzeniowych z działu II: nazwy w działaniach, zapis cyframi i słownie, cyfry jedności/dziesiątek/setek, porównywanie, oś liczbowa, kwoty według wzoru, szacowanie, sposoby dodawania i odejmowania, tabelka ○ − ■, zdania P/F i zadania tekstowe. Tak jak „Sprytne odejmowanie” ma `ordered: true` (od łatwych do trudnych). Za milion hasło „Powtórka zaliczona, wiedza utrwalona!” i 4 plusy.
- Klasa 5: Podzielność i wielokrotności — 30 autorskich pytań (losowanie 12), plik `js/grade5-sets.js`.
- Klasa 5: Liczby pierwsze i złożone — 34 pytania z 29 zadań (losowanie 12): dzielniki, liczby pierwsze, rozkład na czynniki pierwsze. Plik `js/grade5-sets.js`.
- Klasa 5: Potęgowanie — 34 pytania (losowanie 12): iloczyn ↔ potęga, obliczanie, odczytywanie („do kwadratu”, „do sześcianu”), kolejność działań.
- Klasa 5: Cyfry rzymskie — 40 pytań z 36 zadań (losowanie 12): odczytywanie i zapisywanie liczb, daty z obrazów i budowli, działania, zamazane liczby. Ilustracje w `images/roman/` pochodzą z Wikimedia Commons: obrazy Jana Matejki (domena publiczna), zdjęcie Kolumny Zygmunta (Adrian Grycuk, CC BY-SA 3.0 PL) i Pałacu Kultury (Kallerna, CC BY-SA 4.0) — autorzy są podpisani pod zdjęciami w grze.
- Klasa 5: Kolejność wykonywania działań — 40 pytań z 31 zadań (losowanie 12): które działanie najpierw, wynik, porównywanie wyrażeń, zadania tekstowe (wybór wyrażenia).
- Klasa 5, dział „Figury geometryczne”: Płaszczyzna, proste, półproste, odcinki — 36 pytań z 14 zadań, od łatwych do trudnych (`ordered: true`), plik `js/geometry5-sets.js`: prosta, półprosta i odcinek, zapis ⊥ i ∥, punkty wspólne, długości odcinków, punkty na prostej, proste równoległe i prostopadłe (także w kratce), boki wielokąta, liczenie odcinków, półprostych i prostych, przekątne czworokąta. Rysunki SVG mają współrzędne w atrybutach `data-*`, a test sprawdza na nich równoległość, prostopadłość i położenie punktów. Za milion hasło „Geometria powtórzona, wiedza świetnie utrwalona!” i 2 plusy. Pozostałe zestawy klasy 5 są w dziale „Liczby naturalne”.
- Klasa 5, dział „Figury geometryczne”: Kąty — 41 pytań z 13 zadań, od łatwych do trudnych, plik `js/geometry5-sets.js`: rodzaje kątów (także wklęsły), nazwy kątów, porównywanie, wskazówki zegara (rysunek i godziny), kąty przyległe i wierzchołkowe, drogi z rozwidlenia, kąty wielokątów, trzy proste przez jeden punkt. Test mierzy kąty na współrzędnych z rysunków. Za milion hasło „Quiz o kątach zakończony – każdy uczeń wyszkolony!” i 2 plusy.
- Klasa 7: Procenty na rozgrzewkę — 16 wariantów z 12 zadań źródłowych (4 zadania uzupełniające z pozostałych screenów).
- Klasa 7: Procenty w życiu, zestaw 1 — 25 pytań (losowanie 12).
- Klasa 7: Procenty w praktyce, zestaw 2 — 19 pytań (losowanie 12).
- Klasa 7: Potęgi — 54 pytania z 33 zadań (losowanie 12): ułamki zwykłe, dziesiętne i liczby mieszane do potęgi, liczby ujemne (−3⁴ a (−3)⁴), wykładnik 0 i 1, potęgi liczby 10, potęga ↔ iloczyn, zadania tekstowe (bakterie, składanie kartki). Plik `js/grade7-sets.js`.
- Klasa 7: Potęgi o tych samych podstawach — 70 pytań z 17 zadań (losowanie 12): mnożenie i dzielenie potęg, potęga potęgi, kilka działań i długie ułamki, potęgi z literami, „który wzór?”, brakujący wykładnik, potęgi liczby 10, prawda/fałsz, typowe błędy (suma potęg, mnożenie podstaw). Za milion hasło MATEMATYKA TO WF DLA MÓZGU i 2 plusy. Plik `js/grade7-sets.js`.
- Klasa 8, dział „Wyrażenia algebraiczne i równania”: Wyrażenia algebraiczne — 41 pytań z 18 zadań, od łatwych do trudnych (`ordered: true`), plik `js/algebra-sets.js`: zapisywanie wyrażeń, jednomiany, wartość wyrażenia, wyrazy podobne, nawiasy, obwody i pola figur (rysunki SVG), upraszczanie i obliczanie, wartość niezależna od zmiennych. Test sprawdza klucze kalkulatorem wyrażeń (równość dla losowych wartości zmiennych).
- Klasa 8, dział „Wyrażenia algebraiczne i równania”: Mnożenie sum algebraicznych — 32 pytania z 15 zadań, od łatwych do trudnych, plik `js/algebra-sets.js`: dwumian razy dwumian, dwie zmienne, pole i obwód prostokąta, pierwiastki, trójmiany, najprostsza postać, uprość i oblicz, wartość niezależna od zmiennej, trzy czynniki, figura z wycięciem, pole powierzchni prostopadłościanu.
- Klasa 8, dział „Wyrażenia algebraiczne i równania”: Równania — 31 pytań z 17 zadań, od łatwych do trudnych, plik `js/algebra-sets.js`: równania z nawiasami, z ułamkami i z mnożeniem sum, P/F (także równania tożsamościowe i sprzeczne), zadania tekstowe (tomy, zakupy, kino, procenty, pola prostokątów, trójkąt, kartki, prostopadłościan). Test sprawdza rozwiązania podstawieniem.
- Klasy 7 i 8: Procenty — zadania egzaminacyjne — 32 pytania z 29 zadań (losowanie 12), plik `js/percent-exam-sets.js`. Źródło: [zadania egzaminacyjne z procentów](https://matematykaszkolna.pl/strona/5538.html) (egzaminy 2011–2026 i materiały CKE); zadania otwarte przerobiono na format A–D. W `js/scenarios.js` są dwa wpisy (`percent-exam-7` i `percent-exam-8`) z tymi samymi pytaniami, żeby wynik zapisywał się z właściwą klasą.
- Klasa 8: Diagramy i wykresy — 12 autorskich pytań, każde z osobnym diagramem SVG.
- Klasa 8: Prawdopodobieństwo — 12 autorskich pytań.
- Klasa 8: Liczby na osi liczbowej — 31 pytań z 25 zadań (losowanie 12): odczytywanie współrzędnych, która oś pokazuje dany zbiór, zapisywanie warunku (x > a, x ≤ a), liczby naturalne i całkowite w zbiorze, odległość i środek odcinka. Osie rysowane w SVG, plik `js/axis-sets.js`.
- Klasa 8: Przygotowanie do egzaminu — dotychczasowe 12 pytań.

Każde pytanie ma trwałe `id`, treść `q`, cztery `answers`, indeks `correct` (0–3) i `explain`.
Zadania ze screenów zostały dostosowane do formatu A–D; podpunkty rozdzielono,
a dane z diagramów odtworzono w tabelach. Każda rozgrywka losuje 12 różnych zadań źródłowych, najwyżej jeden podpunkt z danego zadania, wykresu lub tabeli. Kolejność pytań jest losowa. Wszystkie pytania scenariusza można przejrzeć
przez „Omówienie pytań” przed startem. Zapis przechowuje scenariusz i identyfikatory
wylosowanych pytań, więc wznowienie nie losuje nowej rozgrywki.

Po 12 poprawnych odpowiedziach pojawia się zdjęcie Huberta Urbańskiego wręczającego
czek na 1 000 000 zł oraz trzy plusy. Zdjęcie znajduje się w `images/final-hubert.jpg`.
Nie pojawia się przy przegranej ani rezygnacji.

## Dźwięk

Domyślnie cała oprawa (czołówka, podkład napięcia rosnący z każdym pytaniem, „ostateczna odpowiedź”,
dobra/zła odpowiedź, koła ratunkowe, oklaski, fanfara za milion) jest **syntezowana na żywo** w Web Audio –
nie wymaga żadnych plików. Opcjonalnie można podłożyć własne nagrania – patrz [`audio/README.md`](audio/README.md).

## Sprawdzenie zestawów

Uruchom `node tests/scenarios.mjs` (Node.js 22+). Test obejmuje format pytań,
losowanie bez powtórzeń, odtwarzanie zapisu i wybrane obliczenia.

Nowe zestawy egzaminacyjne są w `js/exam-sets.js`. Punktem odniesienia dla zakresu i poziomu były [diagramy i wykresy](https://matematykaszkolna.pl/strona/5540.html) oraz [prawdopodobieństwo](https://matematykaszkolna.pl/strona/5562.html). Treści, dane, wykresy i odpowiedzi są nowe; nie są to oficjalne zadania CKE.
