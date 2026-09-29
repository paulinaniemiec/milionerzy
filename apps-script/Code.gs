/**
 * Odbiera wyniki z gry i dopisuje je do arkusza „Wyniki”.
 * Wklej do: arkusz Google → Rozszerzenia → Apps Script (instrukcja w README).
 *
 * Adnotacja poniżej ogranicza uprawnienia skryptu do TEGO jednego arkusza –
 * skrypt nie ma dostępu do pozostałych plików na Dysku, poczty ani konta.
 *
 * @OnlyCurrentDoc
 */

const SHEET_NAME = 'Wyniki';
const HEADER = ['Data', 'Imię', 'Klasa', 'Zestaw', 'Wynik', 'Wygrana (zł)', 'Poprawne odpowiedzi', 'Ostatnie pytanie', 'Użyte koła'];
const OUTCOMES = { won: 'Milion', lost: 'Błędna odpowiedź', walk: 'Rezygnacja' };
const MAX_ROWS_PER_REQUEST = 50;

// Celowo nie ma funkcji doGet – przez adres skryptu nie da się odczytać żadnych wyników.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const rows = (Array.isArray(data.rows) ? data.rows : [])
      .slice(0, MAX_ROWS_PER_REQUEST)
      .map(toRow)
      .filter(Boolean);
    if (rows.length) {
      const sheet = getSheet();
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADER.length).setValues(rows);
    }
  } catch (err) {
    // Błędne dane są po prostu pomijane
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}

function toRow(r) {
  if (!r || typeof r !== 'object' || !OUTCOMES[r.outcome]) return null;
  return [
    date(r.time),
    text(r.name, 24),
    Number.isInteger(r.grade) && r.grade >= 1 && r.grade <= 8 ? r.grade : '',
    text(r.scenario, 80),
    OUTCOMES[r.outcome],
    int(r.prize, 0, 1000000),
    int(r.correct, 0, 12),
    int(r.question, 1, 12),
    int(r.lifelinesUsed, 0, 3),
  ];
}

// Tekst zawsze jako zwykły tekst: apostrof blokuje wstrzyknięcie formuły (np. „=IMPORTXML(…)”)
function text(v, max) {
  const s = String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function int(v, min, max) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : '';
}

// Czas z urządzenia (wynik mógł czekać offline), ale nie z przyszłości ani sprzed ponad 30 dni
function date(v) {
  const now = new Date();
  const d = new Date(v);
  return isNaN(d) || d > now || now - d > 30 * 24 * 3600 * 1000 ? now : d;
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
  }
  return sheet;
}
