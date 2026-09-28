// Zapisywanie wyników do arkusza Google (przez Apps Script – kod w apps-script/Code.gs).
// Pusty adres = zapisywanie wyłączone. Adres wkleja się po wdrożeniu skryptu (patrz README).
const RESULTS_URL = '';

// Bez internetu wyniki czekają w kolejce i wysyłają się przy następnej okazji.
const QUEUE_KEY = 'mil-results-queue';
const MAX_QUEUE = 200;
let sending = false;

function loadQueue() {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    return Array.isArray(q) ? q : [];
  } catch (e) { return []; }
}
function saveQueue(q) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-MAX_QUEUE))); } catch (e) {}
}

export function reportResult(entry) {
  if (!RESULTS_URL) return;
  saveQueue([...loadQueue(), { ...entry, time: new Date().toISOString() }]);
  flushResults();
}

export async function flushResults() {
  if (!RESULTS_URL || sending) return;
  const rows = loadQueue().slice(0, 50);
  if (!rows.length) return;
  sending = true;
  try {
    // text/plain + no-cors: bez zapytania wstępnego CORS, którego Apps Script nie obsługuje
    await fetch(RESULTS_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ rows }),
    });
    saveQueue(loadQueue().slice(rows.length));
  } catch (e) {
    return; // brak sieci – spróbujemy później
  } finally {
    sending = false;
  }
  if (loadQueue().length) flushResults();
}

if (RESULTS_URL) {
  addEventListener('online', flushResults);
  flushResults();
}
