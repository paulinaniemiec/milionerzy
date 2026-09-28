# Milionerzy – 8 klasa

Teleturniej w stylu *Milionerów* do powtórki przed egzaminem ósmoklasisty z matematyki.
6 scenariuszy (92 unikalne pytania łącznie), 12 pytań w jednej rozgrywce, drabinka 500 zł → 1 000 000 zł,
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

## Zmiana pytań

Dotychczasowe 12 pytań znajduje się w [`js/questions.js`](js/questions.js).
Nowe zestawy i katalog scenariuszy są w [`js/scenarios.js`](js/scenarios.js):

- Diagramy i wykresy — 12 autorskich pytań, każde z osobnym diagramem SVG.
- Prawdopodobieństwo — 12 autorskich pytań.
- Procenty na rozgrzewkę — 16 wariantów z 12 zadań źródłowych (4 zadania uzupełniające z pozostałych screenów).
- Procenty w życiu, zestaw 1 — 25 pytań (losowanie 12).
- Procenty w praktyce, zestaw 2 — 19 pytań (losowanie 12).

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
