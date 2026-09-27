# Milionerzy – 8 klasa

Teleturniej w stylu *Milionerów* do powtórki przed egzaminem ósmoklasisty z matematyki.
12 pytań z prezentacji „Powtórzenie wiadomości przed egzaminem”, drabinka 500 zł → 1 000 000 zł,
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

Wszystkie pytania są w [`js/questions.js`](js/questions.js): treść, 4 odpowiedzi, indeks poprawnej
(`0` = A … `3` = D) i omówienie. Można tam też zmienić tytuł zestawu i drabinkę wygranych.

## Dźwięk

Domyślnie cała oprawa (czołówka, podkład napięcia rosnący z każdym pytaniem, „ostateczna odpowiedź”,
dobra/zła odpowiedź, koła ratunkowe, oklaski, fanfara za milion) jest **syntezowana na żywo** w Web Audio –
nie wymaga żadnych plików. Opcjonalnie można podłożyć własne nagrania – patrz [`audio/README.md`](audio/README.md).
