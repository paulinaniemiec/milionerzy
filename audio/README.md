# Własne nagrania (opcjonalnie)

Bez tego folderu gra używa syntezowanej oprawy dźwiękowej. Żeby podmienić wybrane motywy na pliki mp3,
wrzuć je tutaj i utwórz `audio/pack.json`:

```json
{
  "intro": "intro.mp3",
  "bed": "bed.mp3",
  "bedFinal": "bed-final.mp3",
  "correct": "correct.mp3",
  "win": "win.mp3"
}
```

| klucz      | kiedy gra                                        |
|------------|--------------------------------------------------|
| `intro`    | czołówka na ekranie startowym                    |
| `bed`      | podkład pod pytania 1–11 (zapętlony)             |
| `bedFinal` | podkład pod pytanie za milion (zapętlony)        |
| `correct`  | poprawna odpowiedź                               |
| `win`      | wygrana miliona                                  |

Brakujące klucze zostają syntezowane.

⚠️ **Prawa autorskie.** Muzyka z programu TV jest chroniona. `audio/*.mp3` i `audio/pack.json`
są w `.gitignore`, więc nie trafią do publicznego repozytorium ani na GitHub Pages.
Używaj ich lokalnie (np. na lekcji z laptopa). Publikowanie ich w publicznym repozytorium
może skończyć się zgłoszeniem DMCA i zablokowaniem repozytorium.
