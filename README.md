# Milionerzy – matematyka, klasy 5, 7 i 8

Teleturniej w stylu *Milionerów* z wyborem klasy, a następnie zestawu pytań.
Klasa 5 ma zestaw o podzielności i wielokrotnościach, klasa 7 cztery zestawy o procentach, a klasa 8 cztery zestawy: diagramy, prawdopodobieństwo, przygotowanie do egzaminu i procenty.
Zestaw „Procenty — zadania egzaminacyjne” jest wspólny dla klas 7 i 8. Łącznie jest 9 scenariuszy (154 unikalne pytania), 12 pytań w jednej rozgrywce, drabinka 500 zł → 1 000 000 zł,
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
`grade` z wartością `5`, `7` albo `8` (lista dozwolonych klas: `GRADES` w `js/app.js`). Przed dodaniem następnego zestawu zapytaj właścicielkę projektu, do której klasy go przypisać.

- Klasa 5: Podzielność i wielokrotności — 30 autorskich pytań (losowanie 12), plik `js/grade5-sets.js`.
- Klasa 7: Procenty na rozgrzewkę — 16 wariantów z 12 zadań źródłowych (4 zadania uzupełniające z pozostałych screenów).
- Klasa 7: Procenty w życiu, zestaw 1 — 25 pytań (losowanie 12).
- Klasa 7: Procenty w praktyce, zestaw 2 — 19 pytań (losowanie 12).
- Klasy 7 i 8: Procenty — zadania egzaminacyjne — 32 pytania z 29 zadań (losowanie 12), plik `js/percent-exam-sets.js`. Źródło: [zadania egzaminacyjne z procentów](https://matematykaszkolna.pl/strona/5538.html) (egzaminy 2011–2026 i materiały CKE); zadania otwarte przerobiono na format A–D. W `js/scenarios.js` są dwa wpisy (`percent-exam-7` i `percent-exam-8`) z tymi samymi pytaniami, żeby wynik zapisywał się z właściwą klasą.
- Klasa 8: Diagramy i wykresy — 12 autorskich pytań, każde z osobnym diagramem SVG.
- Klasa 8: Prawdopodobieństwo — 12 autorskich pytań.
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
