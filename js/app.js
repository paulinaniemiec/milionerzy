import { LADDER, THRESHOLDS } from './questions.js';
import { SCENARIOS, makeRound, restoreRound } from './scenarios.js';
import { sound } from './audio.js';
import { fx } from './fx.js';
import { reportResult } from './results.js';

let activeScenario = SCENARIOS[0];
let QUESTIONS = activeScenario.questions.slice(0, 12);
let selectedGrade = null;
const GRADES = [4, 5, 7, 8];
if (SCENARIOS.some(s => !GRADES.includes(s.grade))) {
  throw new Error(`Każdy scenariusz musi mieć przypisaną klasę: ${GRADES.join(', ')}.`);
}

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const LETTERS = ['A', 'B', 'C', 'D'];
const money = (n) => n.toLocaleString('pl-PL').replace(/\s/g, ' ') + ' zł';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Czas budowania napięcia po „ostatecznej odpowiedzi” (s) – rośnie jak w programie
const SUSPENSE = [1.1, 1.2, 1.4, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.6, 5.5];

const FRIENDS = [
  { emoji: '👩‍🏫', name: 'Pani od matematyki', desc: 'Prawie zawsze wie – ale czy zdąży w 30 sekund?', skill: 1.08 },
  { emoji: '👨‍🔧', name: 'Wujek inżynier', desc: 'Liczy błyskawicznie, czasem zbyt pewny siebie', skill: 1.0 },
  { emoji: '👩‍🎓', name: 'Starsza siostra z liceum', desc: 'Pisała ten egzamin trzy lata temu', skill: 0.94 },
  { emoji: '🧑‍🤝‍🧑', name: 'Ktoś z klasy – na żywo', desc: 'Prawdziwa rozmowa! Gra odmierza tylko 30 sekund', live: true },
];

const S = {
  name: '',
  i: 0,
  phase: 'idle', // intro | answer | confirm | locked | revealed | over
  pending: null,
  removed: new Set(),
  lifelines: { fifty: true, phone: true, audience: true },
  outcome: null, // won | lost | walk
  prize: 0,
  correctCount: 0,
  timers: [],
  phoneTimer: null,
  hubertAsked: false, // czy przy tym pytaniu prowadzący już dopytywał
  hubertCount: 0,
};

// Easter egg: czasem prowadzący dopytuje po zatwierdzeniu – niezależnie od tego, czy odpowiedź jest dobra
const HUBERT_LINES = [
  'Definitywnie?',
  'Definitywnie? Ostatecznie?',
  'Zaznaczamy?',
  'Mam zaznaczyć?',
  'Na pewno? Bo publiczność coś szepcze…',
  'Na pewno? Proszę pamiętać, o jaką kwotę gramy.',
];

// ---------------------------------------------------------------- ekrany

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  document.body.classList.toggle('on-title', id === 'screen-title' || id === 'screen-classes');
  if (id !== 'screen-game') $('#ladder-wrap').classList.remove('open');
}

function later(fn, ms) {
  const id = setTimeout(fn, ms);
  S.timers.push(id);
  return id;
}
function clearTimers() {
  S.timers.forEach(clearTimeout);
  S.timers = [];
  stopPhone();
}

// ---------------------------------------------------------------- drabinka

function renderLadder() {
  const ol = $('#ladder');
  ol.innerHTML = LADDER.map((v, k) => `
    <li data-k="${k}" class="${THRESHOLDS.includes(k) ? 'threshold' : ''}">
      <span class="n">${k + 1}</span><span class="d">◆</span><span class="a">${money(v)}</span>
    </li>`).join('');
}

function updateLadder(state) {
  $$('#ladder li').forEach((li) => {
    const k = +li.dataset.k;
    li.classList.toggle('done', k < S.i || (k === S.i && state === 'won'));
    li.classList.toggle('current', k === S.i);
    li.classList.toggle('won', k === S.i && state === 'won');
    li.classList.toggle('lost', k === S.i && state === 'lost');
  });
}

function updateStatus() {
  const who = S.name ? `${escapeHtml(S.name)} · ` : '';
  $('#top-status').innerHTML = ['idle', 'over'].includes(S.phase) ? '' :
    `<span class="wide-only">${who}Pytanie </span>${S.i + 1}/${LADDER.length} · <span class="wide-only">gra o </span><b>${money(LADDER[S.i])}</b>`;
}

function recordResult() {
  reportResult({
    name: S.name,
    grade: activeScenario.grade,
    scenarioId: activeScenario.id,
    scenario: activeScenario.title,
    outcome: S.outcome,
    prize: S.prize,
    correct: S.correctCount,
    question: S.i + 1,
    lifelinesUsed: Object.values(S.lifelines).filter((v) => !v).length,
  });
}

const guaranteed = (i) => {
  const t = THRESHOLDS.filter((k) => k < i).pop();
  return t === undefined ? 0 : LADDER[t];
};

// ---------------------------------------------------------------- przebieg gry

async function startGame() {
  await sound.unlock();
  QUESTIONS = makeRound(activeScenario);
  S.name = $('#player-name').value.trim();
  S.i = 0;
  S.lifelines = { fifty: true, phone: true, audience: true };
  S.correctCount = 0;
  S.outcome = null;
  S.prize = 0;
  S.hubertCount = 0;
  document.body.classList.remove('million');
  $$('.lifeline').forEach((b) => b.classList.remove('used', 'active'));
  fx.clear();
  showScreen('screen-game');
  loadQuestion(0);
}

const SAVE_KEY = 'mil-save';
function saveGame() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ scenarioId: activeScenario.id, questionIds: QUESTIONS.map(q => q.id), name: S.name, i: S.i, lifelines: S.lifelines, correctCount: S.correctCount })); } catch (e) {}
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }
function loadSave() {
  try {
    const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    return d && Number.isInteger(d.i) && d.i >= 0 && d.i < LADDER.length && restoreRound(d) ? d : null;
  } catch (e) { return null; }
}
function renderResume() {
  const d = loadSave();
  const el = $('#resume');
  el.hidden = !d || restoreRound(d).scenario.grade !== selectedGrade;
  if (d) el.innerHTML = `Wznów przerwaną grę${d.name ? ` (${escapeHtml(d.name)})` : ''} – ${restoreRound(d).scenario.title} · pytanie ${d.i + 1} za ${money(LADDER[d.i])}`;
}

async function resumeGame() {
  const d = loadSave();
  if (!d) return;
  await sound.unlock();
  const restored = restoreRound(d);
  if (selectedGrade !== restored.scenario.grade) chooseGrade(restored.scenario.grade);
  selectScenario(restored.scenario.id);
  QUESTIONS = restored.questions;
  S.name = d.name || '';
  S.lifelines = { fifty: !!d.lifelines?.fifty, phone: !!d.lifelines?.phone, audience: !!d.lifelines?.audience };
  S.correctCount = d.correctCount || d.i;
  S.outcome = null;
  S.prize = d.i > 0 ? LADDER[d.i - 1] : 0;
  document.body.classList.remove('million');
  $$('.lifeline').forEach((b) => b.classList.remove('active'));
  fx.clear();
  showScreen('screen-game');
  loadQuestion(d.i);
}

function loadQuestion(i) {
  clearTimers();
  S.i = i;
  saveGame();
  S.phase = 'intro';
  S.pending = null;
  S.removed = new Set();
  S.hubertAsked = false;
  const q = QUESTIONS[i];
  hidePanel();
  $('#banner').hidden = true;
  updateLadder();
  updateStatus();
  updateLifelines();

  const isT = THRESHOLDS.includes(i);
  $('#q-label').innerHTML = `Pytanie ${i + 1} · za ${money(LADDER[i])}${isT ? ' · próg gwarantowany' : ''}${i === LADDER.length - 1 ? ' · pytanie za milion!' : ''}`;
  const qt = $('#q-text');
  qt.innerHTML = q.q;
  qt.classList.toggle('long', q.q.replace(/<[^>]+>/g, '').length > 150);
  const qel = $('#question');
  qel.classList.remove('enter');
  void qel.offsetWidth;
  qel.classList.add('enter');

  $$('.answer').forEach((b, k) => {
    b.className = 'hex answer';
    b.disabled = true;
    b.style.visibility = 'hidden';
    const txt = $('.txt', b);
    txt.innerHTML = q.answers[k];
    txt.classList.toggle('long', q.answers[k].replace(/<[^>]+>/g, '').length > 38);
    b.setAttribute('aria-label', `${LETTERS[k]}: ${q.answers[k].replace(/<[^>]+>/g, '')}`);
  });
  setActions('');

  sound.letsPlay(i);
  const base = 900;
  $$('.answer').forEach((b, k) => later(() => {
    b.style.visibility = '';
    b.classList.add('enter');
    sound.reveal(k);
  }, base + k * 380));
  later(() => {
    S.phase = 'answer';
    $$('.answer').forEach((b) => (b.disabled = false));
    sound.questionBed(i);
    updateLifelines();
    answerActions();
  }, base + 4 * 380 + 200);
}

function answerActions() {
  const walk = S.i > 0
    ? `<button class="btn" data-act="walk">Rezygnuję · biorę ${money(LADDER[S.i - 1])}</button>`
    : '';
  setActions(`<div class="hint">Wybierz odpowiedź A, B, C lub D${S.i > 0 ? ' – albo zabierz dotychczasową wygraną' : ''}</div>${walk}`);
}

function setActions(html) { $('#actions').innerHTML = html; }

function choose(k) {
  if (!['answer', 'confirm'].includes(S.phase) || S.removed.has(k)) return;
  sound.click();
  S.pending = k;
  S.phase = 'confirm';
  $$('.answer').forEach((b, j) => b.classList.toggle('pending', j === k));
  const name = S.name ? `, ${escapeHtml(S.name)}` : '';
  setActions(`
    <div class="prompt">Odpowiedź ${LETTERS[k]}${name} – czy to ostateczna odpowiedź?</div>
    <button class="btn btn-gold" data-act="lock">Tak, ostateczna</button>
    <button class="btn" data-act="cancel">Jeszcze się zastanowię</button>`);
  $('[data-act="lock"]').focus({ preventScroll: true });
}

function cancelChoice() {
  if (S.phase !== 'confirm') return;
  S.pending = null;
  S.phase = 'answer';
  $$('.answer').forEach((b) => b.classList.remove('pending'));
  answerActions();
}

function hubertAsks() {
  S.hubertAsked = true;
  S.hubertCount++;
  sound.click();
  const line = pick(HUBERT_LINES);
  setActions(`
    <div class="hubert"><img src="images/hubert-face.jpg" alt="" width="160" height="160"><div class="hubert-bubble"><span class="who">Hubert Urbański</span>${line}</div></div>
    <button class="btn btn-gold" data-act="lock">Definitywnie!</button>
    <button class="btn" data-act="cancel">Jednak nie…</button>`);
  $('[data-act="lock"]').focus({ preventScroll: true });
}

function lockIn() {
  if (S.phase !== 'confirm') return;
  // najwyżej 3 razy na grę, nigdy przy pierwszym pytaniu
  if (!S.hubertAsked && S.i > 0 && S.hubertCount < 3 && Math.random() < 0.3) return hubertAsks();
  S.phase = 'locked';
  stopPhone();
  updateLifelines();
  const k = S.pending;
  $$('.answer').forEach((b, j) => {
    b.disabled = true;
    b.classList.remove('pending');
    b.classList.toggle('selected', j === k);
  });
  sound.lockIn(S.i);
  const d = SUSPENSE[S.i];
  later(() => sound.suspense(S.i, d - 0.3), 300);
  setActions(`<div class="prompt dots">Sprawdzamy</div>`);
  later(reveal, d * 1000);
}

function reveal() {
  const q = QUESTIONS[S.i];
  const ok = S.pending === q.correct;
  S.phase = 'revealed';
  const cb = $$('.answer')[q.correct];
  cb.classList.add('correct', 'flash');
  if (ok) {
    cb.classList.remove('selected');
    S.correctCount++;
    S.prize = LADDER[S.i];
    const isT = THRESHOLDS.includes(S.i);
    const last = S.i === LADDER.length - 1;
    if (!last) sound.correct(S.i, { threshold: isT });
    updateLadder('won');
    if (isT) fx.burst(160);
    later(() => {
      if (last) return million();
      showBanner({
        kicker: isT ? 'Próg gwarantowany osiągnięty!' : pick(['Dobrze!', 'Brawo!', 'Świetnie!', 'Znakomicie!', 'Tak jest!']) + (S.name ? ` ${escapeHtml(S.name)}` : ''),
        amount: money(LADDER[S.i]),
        sub: isT ? `Te ${money(LADDER[S.i])} są już Twoje – nawet jeśli pomylisz się później.` : `Następne pytanie za ${money(LADDER[S.i + 1])}`,
      });
      setActions(`
        <button class="btn" data-act="explain">Pokaż rozwiązanie</button>
        <button class="btn btn-gold" data-act="next">Następne pytanie →</button>`);
      $('[data-act="next"]').focus({ preventScroll: true });
    }, 1900);
  } else {
    sound.wrong(S.i);
    S.outcome = 'lost';
    S.prize = guaranteed(S.i);
    recordResult();
    updateLadder('lost');
    later(() => {
      showBanner({
        kicker: `Niestety – poprawna odpowiedź to ${LETTERS[q.correct]}`,
        amount: money(S.prize),
        sub: S.prize ? 'Tyle zabierasz dzięki progowi gwarantowanemu.' : 'Tym razem bez wygranej – ale teraz już wiesz, jak to policzyć!',
        lost: true,
      });
      setActions(`
        <button class="btn btn-gold" data-act="explain">Pokaż rozwiązanie</button>
        <button class="btn" data-act="finish">Zakończ grę</button>`);
    }, 2300);
  }
  updateLifelines();
}

function next() {
  if (S.phase !== 'revealed' || S.outcome) return;
  loadQuestion(S.i + 1);
}

function walkAway() {
  if (!['answer', 'confirm'].includes(S.phase) || S.i === 0) return;
  const take = LADDER[S.i - 1];
  openModal(`
    <h2>Rezygnacja</h2>
    <p>Czy na pewno chcesz zakończyć grę i zabrać <b>${money(take)}</b>?</p>
    <div class="row">
      <button class="btn" data-modal="close">Gram dalej</button>
      <button class="btn btn-gold" id="confirm-walk">Biorę pieniądze</button>
    </div>`, (box) => {
    $('#confirm-walk', box).onclick = () => {
      closeModal();
      stopPhone();
      S.phase = 'revealed';
      S.outcome = 'walk';
      S.prize = take;
      recordResult();
      sound.walkAway();
      $$('.answer').forEach((b) => { b.disabled = true; b.classList.remove('pending'); });
      const q = QUESTIONS[S.i];
      later(() => $$('.answer')[q.correct].classList.add('correct', 'flash'), 1200);
      updateLifelines();
      later(() => {
        showBanner({ kicker: `Poprawna odpowiedź to ${LETTERS[q.correct]}. Zabierasz`, amount: money(take), sub: 'Rozsądna decyzja!' });
        setActions(`
          <button class="btn" data-act="explain">Pokaż rozwiązanie</button>
          <button class="btn btn-gold" data-act="finish">Zakończ grę</button>`);
      }, 2400);
    };
  });
}

function million() {
  S.outcome = 'won';
  recordResult();
  sound.million();
  fx.rain(12000);
  finish();
}

function finish() {
  clearTimers();
  clearSave();
  S.phase = 'over';
  updateStatus();
  const who = S.name ? escapeHtml(S.name) : '';
  let kicker, msg;
  if (S.outcome === 'won') {
    document.body.classList.add('million');
    kicker = who ? `${who} – Milion!` : 'Milion złotych!';
    msg = `Wszystkie 12 pytań bez jednego błędu. ${activeScenario.grade === 8 ? 'Egzamin ósmoklasisty' : 'Matematyka'}? Pestka! 🏆`;
  } else if (S.outcome === 'walk') {
    kicker = who ? `${who} zabiera` : 'Wygrana';
    msg = `Poprawne odpowiedzi: ${S.correctCount} z ${LADDER.length}. Zajrzyj do omówienia i spróbuj dojść do miliona!`;
  } else {
    kicker = who ? `${who} wygrywa` : 'Wygrana';
    msg = `Poprawne odpowiedzi: ${S.correctCount} z ${LADDER.length}. ${S.prize ? 'Próg gwarantowany uratował wygraną!' : 'Każda pomyłka to lekcja – przejrzyj omówienie i zagraj jeszcze raz!'}`;
  }
  if (S.outcome !== 'won') sound.ambient();
  $('#teacher-award').hidden = S.outcome !== 'won';
  $('#screen-end .end-emblem').toggleAttribute('hidden', S.outcome === 'won');
  $('#end-kicker').innerHTML = kicker;
  $('#end-amount').textContent = money(S.prize);
  $('#end-msg').textContent = msg;
  showScreen('screen-end');
}

// ---------------------------------------------------------------- baner / panel

function showBanner({ kicker, amount, sub, lost }) {
  hidePanel();
  const b = $('#banner');
  b.className = 'banner' + (lost ? ' lost' : '');
  b.innerHTML = `<div class="kicker">${kicker}</div>
    <div class="hex"><div class="hex-in">${amount}</div></div>
    ${sub ? `<div class="sub">${sub}</div>` : ''}`;
  b.hidden = false;
}

function showPanel(html) {
  const p = $('#panel');
  p.innerHTML = html;
  p.hidden = false;
  p.style.animation = 'none';
  void p.offsetWidth;
  p.style.animation = '';
  return p;
}
function hidePanel() { $('#panel').hidden = true; $('#panel').innerHTML = ''; }

// ---------------------------------------------------------------- koła ratunkowe

function canUseLifeline(key) {
  return S.lifelines[key] && ['answer', 'confirm'].includes(S.phase) && !S.phoneTimer;
}

function updateLifelines() {
  $$('.lifeline').forEach((b) => {
    const key = b.dataset.ll;
    b.classList.toggle('used', !S.lifelines[key]);
    b.disabled = !canUseLifeline(key);
  });
}

function useLifeline(key) {
  if (!canUseLifeline(key)) return;
  if (key === 'fifty') fifty();
  if (key === 'phone') phoneChoose();
  if (key === 'audience') audienceChoose();
}

function markUsed(key) {
  S.lifelines[key] = false;
  updateLifelines();
}

function fifty() {
  markUsed('fifty');
  const q = QUESTIONS[S.i];
  const wrong = [0, 1, 2, 3].filter((k) => k !== q.correct).sort(() => Math.random() - 0.5).slice(0, 2);
  sound.fifty();
  wrong.forEach((k, n) => later(() => {
    S.removed.add(k);
    const b = $$('.answer')[k];
    b.classList.add('removed');
    b.classList.remove('pending');
    b.disabled = true;
    if (S.pending === k) cancelChoice();
  }, 60 + n * 280));
}

function phoneChoose() {
  const p = showPanel(`
    <h3>Telefon do przyjaciela</h3>
    <div class="choice-list">
      ${FRIENDS.map((f, n) => `
        <button class="choice" data-friend="${n}"><span class="emoji">${f.emoji}</span>
          <span><strong>${f.name}</strong><small>${f.desc}</small></span></button>`).join('')}
    </div>
    <div class="panel-actions" style="margin-top:12px"><button class="btn" data-panel="cancel">Jednak nie dzwonię</button></div>`);
  p.onclick = (e) => {
    const f = e.target.closest('[data-friend]');
    if (f) phoneCall(FRIENDS[+f.dataset.friend]);
    if (e.target.closest('[data-panel="cancel"]')) hidePanel();
  };
}

function friendAnswer(friend) {
  const q = QUESTIONS[S.i];
  const avail = [0, 1, 2, 3].filter((k) => !S.removed.has(k));
  const p = clamp((0.97 - S.i * 0.03) * friend.skill, 0.45, 0.98);
  const right = Math.random() < p;
  const k = right ? q.correct : pick(avail.filter((a) => a !== q.correct));
  const L = LETTERS[k];
  const sure = right ? Math.random() < p : Math.random() < 0.3;
  const high = [`Na sto procent ${L}! Liczyłem to dwa razy.`, `Zaznaczaj ${L}. Jestem tego pewien.`, `${L}! To akurat wiem na pewno.`];
  const mid = [`Wydaje mi się, że ${L}… ale głowy nie dam.`, `Stawiałbym na ${L}, choć trochę się waham.`, `Hmm… chyba ${L}. Tak na 70 procent.`];
  const low = [`Szczerze? Nie wiem. Strzelałbym ${L}.`, `Ojej, to trudne… może ${L}?`];
  const text = sure ? pick(high) : S.i > 7 && !right ? pick(low) : pick(mid);
  const g = friend.name.startsWith('Pani') || friend.name.includes('siostra');
  return g ? text.replace('Liczyłem', 'Liczyłam').replace('pewien', 'pewna').replace('Stawiałbym', 'Stawiałabym').replace('Strzelałbym', 'Strzelałabym') : text;
}

function phoneCall(friend) {
  markUsed('phone');
  $('.lifeline[data-ll="phone"]').classList.add('active');
  const total = 30;
  let left = total;
  const p = showPanel(`
    <h3>${friend.emoji} ${friend.name}</h3>
    <div class="phone-call">
      <div class="timer" id="ph-timer"><span>${total}</span></div>
      <div class="bubble" id="ph-bubble"><span class="who">${friend.live ? 'Rozmowa na żywo' : 'Dzwonię…'}</span><span class="dots" id="ph-text">${friend.live ? 'Przeczytaj pytanie i odpowiedzi – masz 30 sekund' : 'Łączę'}</span></div>
    </div>
    <div class="panel-actions" style="margin-top:14px"><button class="btn" data-panel="end">Zakończ rozmowę</button></div>`);
  sound.phoneRing();
  const answerAt = friend.live ? null : 7 + Math.floor(Math.random() * 12); // sekunda rozmowy
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    if (!friend.live) { $('#ph-text').textContent = 'Czyta pytanie… myśli'; $('.who', p).textContent = friend.name; }
    sound.clock(total, S.i);
    S.phoneTimer = setInterval(() => {
      left--;
      const t = $('#ph-timer');
      if (!t) return stopPhone();
      t.style.setProperty('--p', left / total);
      t.classList.toggle('low', left <= 5);
      $('span', t).textContent = left;
      if (answerAt && total - left === answerAt) {
        const el = $('#ph-text');
        el.classList.remove('dots');
        el.textContent = `„${friendAnswer(friend)}”`;
      }
      if (left <= 0) {
        stopPhone();
        sound.timeUp();
        const el = $('#ph-text');
        if (el && el.classList.contains('dots')) { el.classList.remove('dots'); el.textContent = friend.live ? 'Koniec czasu!' : '„Eee… nie zdążę… sorry!” – koniec czasu.'; }
        later(() => resumeBed(), 1200);
      }
    }, 1000);
    updateLifelines();
  };
  later(start, 2600);
  S.phoneTimer = -1; // blokuje inne koła na czas sygnału
  updateLifelines();
  p.onclick = (e) => {
    if (e.target.closest('[data-panel="end"]')) {
      const wasRunning = !!S.phoneTimer;
      stopPhone();
      hidePanel();
      if (wasRunning) resumeBed();
    }
  };
}

function stopPhone() {
  if (S.phoneTimer && S.phoneTimer !== -1) clearInterval(S.phoneTimer);
  if (S.phoneTimer) sound.stopBed(0.3);
  S.phoneTimer = null;
  $('.lifeline[data-ll="phone"]')?.classList.remove('active');
  updateLifelines();
}

function resumeBed() {
  if (['answer', 'confirm'].includes(S.phase)) sound.questionBed(S.i);
}

function audienceChoose() {
  const p = showPanel(`
    <h3>Pytanie do publiczności</h3>
    <div class="choice-list">
      <button class="choice" data-aud="sim"><span class="emoji">🎭</span><span><strong>Publiczność w studiu</strong><small>Wirtualna widownia zagłosuje za Ciebie</small></span></button>
      <button class="choice" data-aud="class"><span class="emoji">🙋</span><span><strong>Głosuje cała klasa</strong><small>Policz ręce w górze i wpisz wyniki</small></span></button>
    </div>
    <div class="panel-actions" style="margin-top:12px"><button class="btn" data-panel="cancel">Jednak nie</button></div>`);
  p.onclick = (e) => {
    const a = e.target.closest('[data-aud]');
    if (a) a.dataset.aud === 'sim' ? audienceSim() : audienceClass();
    if (e.target.closest('[data-panel="cancel"]')) hidePanel();
  };
}

function audienceSim() {
  markUsed('audience');
  showPanel(`<h3>Publiczność głosuje<span class="dots"></span></h3>${chartHtml([0, 0, 0, 0])}`);
  sound.audienceVote(4);
  later(() => {
    const votes = simulateVotes();
    showChart(votes);
    later(resumeBed, 1600);
  }, 4200);
}

function simulateVotes() {
  const q = QUESTIONS[S.i];
  const avail = [0, 1, 2, 3].filter((k) => !S.removed.has(k));
  let share = clamp(0.8 - S.i * 0.035 + (Math.random() * 0.16 - 0.08), 0.32, 0.92);
  if (avail.length === 2) share = Math.min(0.95, share + 0.12);
  const raw = [0, 0, 0, 0];
  const others = avail.filter((k) => k !== q.correct);
  const w = others.map(() => 0.2 + Math.random());
  const sw = w.reduce((a, b) => a + b, 0);
  others.forEach((k, n) => (raw[k] = ((1 - share) * w[n]) / sw));
  raw[q.correct] = share;
  // przy trudnych pytaniach publiczność czasem się myli
  if (S.i >= 8 && others.length && Math.random() < 0.18) {
    const top = others.reduce((a, b) => (raw[a] > raw[b] ? a : b));
    [raw[top], raw[q.correct]] = [raw[q.correct] * 0.95, raw[top] + raw[q.correct] * 0.05];
  }
  return toPercents(raw);
}

function toPercents(raw) {
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  const exact = raw.map((v) => (v / sum) * 100);
  const out = exact.map(Math.floor);
  let rest = 100 - out.reduce((a, b) => a + b, 0);
  exact.map((v, k) => [v - Math.floor(v), k]).sort((a, b) => b[0] - a[0]).forEach(([, k]) => { if (rest > 0 && raw[k] > 0) { out[k]++; rest--; } });
  return out;
}

function chartHtml(v) {
  return `<div class="chart">${v.map((p, k) => `
    <div class="bar${S.removed.has(k) ? ' off' : ''}"><span class="pct">${S.removed.has(k) ? '' : p + '%'}</span><div class="col" style="height:0"></div><span class="lbl">${LETTERS[k]}</span></div>`).join('')}</div>`;
}

function showChart(v, title = 'Wyniki głosowania publiczności') {
  const p = showPanel(`<h3>${title}</h3>${chartHtml(v)}`);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$('.col', p).forEach((c, k) => (c.style.height = `calc(${v[k]}% * .82)`));
  }));
  sound.bell && sound.ready && sound.bell(76, sound.t, { gain: 0.08 });
}

function audienceClass() {
  const counts = [0, 0, 0, 0];
  const p = showPanel(`
    <h3>Głosuje klasa – kto za którą odpowiedzią?</h3>
    <div class="vote-grid">${LETTERS.map((L, k) => `
      <div class="vote${S.removed.has(k) ? ' off' : ''}"><b>${L}</b><span class="count" data-c="${k}">0</span>
        <div class="pm"><button data-m="${k}" aria-label="Mniej głosów na ${L}">−</button><button data-p="${k}" aria-label="Więcej głosów na ${L}">+</button></div></div>`).join('')}</div>
    <div class="panel-actions"><button class="btn" data-panel="cancel">Wróć</button><button class="btn btn-gold" data-panel="show">Pokaż wyniki</button></div>`);
  p.onclick = (e) => {
    const plus = e.target.closest('[data-p]');
    const minus = e.target.closest('[data-m]');
    if (plus || minus) {
      const k = +(plus || minus).dataset[plus ? 'p' : 'm'];
      counts[k] = Math.max(0, counts[k] + (plus ? 1 : -1));
      $(`[data-c="${k}"]`, p).textContent = counts[k];
      sound.click();
    }
    if (e.target.closest('[data-panel="cancel"]')) audienceChoose();
    if (e.target.closest('[data-panel="show"]')) {
      if (!counts.some(Boolean)) return toast('Dodaj przynajmniej jeden głos');
      markUsed('audience');
      showChart(toPercents(counts), `Głosowało ${counts.reduce((a, b) => a + b, 0)} osób`);
    }
  };
}

// ---------------------------------------------------------------- modale

function openModal(html, onMount) {
  const m = $('#modal');
  $('#modal-body').innerHTML = html;
  m.hidden = false;
  onMount && onMount($('#modal-body'));
  $('#modal-close').focus({ preventScroll: true });
}
function closeModal() { $('#modal').hidden = true; $('#modal-body').innerHTML = ''; }

function showExplain(i = S.i) {
  const q = QUESTIONS[i];
  openModal(`
    <h2>Pytanie ${i + 1} – rozwiązanie</h2>
    <div class="rq">${q.q}</div>
    <p>Poprawna odpowiedź: <b style="color:var(--green-1)">${LETTERS[q.correct]}: ${q.answers[q.correct]}</b></p>
    <p class="explain">${q.explain}</p>
    <div class="row"><button class="btn btn-gold" data-modal="close">Rozumiem</button></div>`);
}

function showReview() {
  const bank = $('#screen-title').classList.contains('active');
  const reviewQuestions = bank ? activeScenario.questions : QUESTIONS;
  openModal(`
    <h2>${bank ? 'Baza pytań' : 'Omówienie rozgrywki'} · ${activeScenario.title}</h2>
    ${reviewQuestions.map((q, i) => `
      <div class="review-item">
        <h4>Pytanie ${i + 1}${bank ? '' : ` · ${money(LADDER[i])}`}</h4>
        <div class="rq">${q.q}</div>
        <div class="ra">${q.answers.map((a, k) => `<span class="${k === q.correct ? 'ok' : ''}">${LETTERS[k]}: ${a}${k === q.correct ? ' ✓' : ''}</span>`).join('')}</div>
        <div class="rs">${q.explain}</div>
      </div>`).join('')}`);
}

function showRules() {
  openModal(`
    <h2>Zasady gry</h2>
    <ul>
      <li>Wybierz scenariusz na ekranie startowym. Jeśli zawiera więcej niż 12 pytań, gra losuje 12 różnych zadań źródłowych — najwyżej jeden podpunkt z każdej tabeli lub wykresu. Kolejność jest losowa. Wznowienie zachowuje zestaw i kolejność.</li>
      <li><b>12 pytań</b> – od 500 zł do <b>1 000 000 zł</b>. Każde ma 4 odpowiedzi, tylko jedna jest poprawna.</li>
      <li>Po wybraniu odpowiedzi trzeba ją zatwierdzić – <i>„czy to ostateczna odpowiedź?”</i></li>
      <li><b>Progi gwarantowane:</b> ${money(LADDER[THRESHOLDS[0]])} i ${money(LADDER[THRESHOLDS[1]])}. Po błędnej odpowiedzi zabierasz kwotę z ostatniego osiągniętego progu.</li>
      <li>W każdej chwili możesz <b>zrezygnować</b> i zabrać dotychczasową wygraną.</li>
      <li><b>Koła ratunkowe</b> (każde raz na grę):
        <ul>
          <li><b>50:50</b> – znikają dwie błędne odpowiedzi,</li>
          <li><b>Telefon do przyjaciela</b> – 30 sekund rozmowy (z wirtualnym ekspertem albo z kimś z klasy),</li>
          <li><b>Pytanie do publiczności</b> – głosuje wirtualna widownia albo cała klasa.</li>
        </ul></li>
    </ul>
    <h2 style="margin-top:18px">Skróty klawiszowe</h2>
    <div class="keys">
      <span><kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd></span><span>wybór odpowiedzi</span>
      <span><kbd>Enter</kbd></span><span>zatwierdź / następne pytanie</span>
      <span><kbd>Esc</kbd></span><span>anuluj wybór / zamknij okno</span>
      <span><kbd>M</kbd></span><span>wycisz dźwięk</span>
      <span><kbd>F</kbd></span><span>pełny ekran</span>
    </div>
    <div class="row"><button class="btn btn-gold" data-modal="close">Gramy!</button></div>`);
}

function showSettings() {
  const pct = (v) => Math.round(v * 100) + '%';
  openModal(`
    <h2>Ustawienia</h2>
    <div class="setting"><label for="vol-music">Muzyka</label><input type="range" id="vol-music" min="0" max="1" step="0.05" value="${sound.musicVol}"><span id="vol-music-v">${pct(sound.musicVol)}</span></div>
    <div class="setting"><label for="vol-sfx">Efekty</label><input type="range" id="vol-sfx" min="0" max="1" step="0.05" value="${sound.sfxVol}"><span id="vol-sfx-v">${pct(sound.sfxVol)}</span></div>
    <p style="color:var(--muted);font-size:15px">Wskazówka: przy rzutniku lub tablicy interaktywnej włącz pełny ekran (<kbd>F</kbd>) i podłącz głośniki – muzyka robi połowę klimatu!</p>
    <div class="row"><button class="btn" id="test-sound">Test dźwięku</button><button class="btn btn-gold" data-modal="close">Gotowe</button></div>`, (box) => {
    const bind = (id, key) => {
      const el = $('#' + id, box);
      el.oninput = () => { sound.setVolumes({ [key]: +el.value }); $('#' + id + '-v', box).textContent = pct(+el.value); };
    };
    bind('vol-music', 'music');
    bind('vol-sfx', 'sfx');
    $('#test-sound', box).onclick = async () => { await sound.unlock(); sound.correct(3); };
  });
}

// ---------------------------------------------------------------- różne

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.hidden = true), 2200);
}

function toggleMute() {
  sound.setVolumes({ muted: !sound.muted });
  document.body.classList.toggle('muted', sound.muted);
}

function toggleFullscreen() {
  const d = document;
  const el = d.documentElement;
  if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
}

function goHome() {
  const inGame = ['intro', 'answer', 'confirm', 'locked', 'revealed'].includes(S.phase) && !S.outcome;
  const go = () => {
    clearTimers();
    closeModal();
    S.phase = 'idle';
    updateStatus();
    fx.clear();
    renderResume();
    showScreen('screen-classes');
    if (sound.ready) sound.ambient();
  };
  if (!inGame) return go();
  openModal(`
    <h2>Przerwać grę?</h2>
    <p>Aktualna gra zostanie zakończona.</p>
    <div class="row"><button class="btn" data-modal="close">Gram dalej</button><button class="btn btn-gold" id="confirm-home">Tak, do menu</button></div>`,
  (box) => { $('#confirm-home', box).onclick = go; });
}

// ---------------------------------------------------------------- zdarzenia

function selectScenario(id) {
  const scenario = SCENARIOS.find(s => s.id === id && s.grade === selectedGrade);
  if (!scenario) return;
  activeScenario = scenario;
  QUESTIONS = scenario.questions.slice(0, 12);
  $('#set-title').innerHTML = `<strong>${scenario.title}</strong>Matematyka · klasa ${scenario.grade}`;
  $('#scenario-select').value = id;
  $('#scenario-description').textContent = scenario.description;
  $$('.scenario-card').forEach(card => card.setAttribute('aria-pressed', String(card.dataset.scenario === id)));
}

function chooseGrade(grade) {
  if (!GRADES.includes(grade)) return;
  selectedGrade = grade;
  $('#scenario-legend').textContent = `Wybierz zestaw · klasa ${grade}`;
  const scenarios = SCENARIOS.filter(s => s.grade === grade);
  $('#scenario-select').innerHTML = scenarios.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
  $('#scenario-options').innerHTML = scenarios.map(s => `<button type="button" class="scenario-card" data-scenario="${s.id}" aria-pressed="false"><span><strong>${s.title}</strong><small>${s.description}</small></span></button>`).join('');
  selectScenario(activeScenario.grade === grade ? activeScenario.id : scenarios[0].id);
  renderResume();
  showScreen('screen-title');
}

function bind() {
  $('#scenario-select').addEventListener('change', e => selectScenario(e.target.value));
  $('#scenario-options').addEventListener('click', e => {
    const card = e.target.closest('[data-scenario]');
    if (card) selectScenario(card.dataset.scenario);
  });
  $('#class-list').addEventListener('click', e => {
    const button = e.target.closest('[data-grade]');
    if (button) chooseGrade(Number(button.dataset.grade));
  });
  $('#btn-change-grade').onclick = () => showScreen('screen-classes');
  document.body.classList.toggle('muted', sound.muted);
  if (!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)) $('#btn-fullscreen').hidden = true;

  $('#start-form').addEventListener('submit', (e) => { e.preventDefault(); clearSave(); startGame(); });
  $('#resume').onclick = resumeGame;
  renderResume();

  // Pierwsze dotknięcie ekranu tytułowego odblokowuje dźwięk i odpala czołówkę
  let introPlayed = false;
  const firstTouch = async (e) => {
    if (introPlayed || !$('#screen-title').classList.contains('active')) return;
    if (e.target.closest('button[type="submit"], .scenario-picker')) return;
    introPlayed = true;
    await sound.unlock();
    if (sound.ctx?.state !== 'running') { introPlayed = false; return; }
    if (!$('#screen-title').classList.contains('active')) return;
    sound.intro();
  };
  // Na ekranie dotykowym gest odblokowuje audio dopiero po puszczeniu palca.
  document.addEventListener('click', firstTouch);
  document.addEventListener('keydown', firstTouch);

  const resumeAudio = () => { void sound.resume(); };
  document.addEventListener('pointerup', resumeAudio, { capture: true, passive: true });
  document.addEventListener('touchend', resumeAudio, { capture: true, passive: true });
  document.addEventListener('click', resumeAudio, true);
  document.addEventListener('keydown', resumeAudio, true);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) resumeAudio();
  });
  window.addEventListener('pageshow', resumeAudio);

  $('#answers').addEventListener('click', (e) => {
    const b = e.target.closest('.answer');
    if (b && !b.disabled) choose(+b.dataset.i);
  });
  $('#actions').addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]')?.dataset.act;
    if (a === 'lock') lockIn();
    if (a === 'cancel') cancelChoice();
    if (a === 'next') next();
    if (a === 'walk') walkAway();
    if (a === 'explain') showExplain();
    if (a === 'finish') finish();
  });
  $('#lifelines').addEventListener('click', (e) => {
    const b = e.target.closest('.lifeline');
    if (b && !b.disabled) useLifeline(b.dataset.ll);
  });

  $('#btn-home').onclick = goHome;
  $('#btn-sound').onclick = async () => { await sound.unlock(); toggleMute(); };
  $('#btn-settings').onclick = showSettings;
  $('#btn-fullscreen').onclick = toggleFullscreen;
  $('#btn-ladder').onclick = () => $('#ladder-wrap').classList.toggle('open');
  $('#btn-ladder-close').onclick = () => $('#ladder-wrap').classList.remove('open');
  $('#btn-rules').onclick = showRules;
  $('#btn-review-title').onclick = showReview;
  $('#btn-review').onclick = showReview;
  $('#btn-again').onclick = () => { fx.clear(); renderResume(); showScreen('screen-title'); S.phase = 'idle'; updateStatus(); $('#player-name').focus(); };

  $('#modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.closest('#modal-close') || e.target.closest('[data-modal="close"]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, select, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key.toLowerCase();
    if (!$('#modal').hidden) { if (key === 'escape') closeModal(); return; }
    if (key === 'm') return toggleMute();
    if (key === 'f') return toggleFullscreen();
    if (!$('#screen-game').classList.contains('active')) return;
    const idx = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 }[key];
    if (idx !== undefined) { choose(idx); return; }
    if (key === 'enter') {
      if (S.phase === 'confirm') { e.preventDefault(); lockIn(); }
      else if (S.phase === 'revealed' && !S.outcome && document.activeElement?.dataset?.act !== 'explain') { e.preventDefault(); next(); }
    }
    if (key === 'escape') { cancelChoice(); $('#ladder-wrap').classList.remove('open'); }
  });
}

renderLadder();
bind();

// Hak do testów: ?debug udostępnia stan gry w konsoli
if (new URLSearchParams(location.search).has('debug')) {
  window.__game = { S, loadQuestion, choose, lockIn, next, startGame, get QUESTIONS() { return QUESTIONS; }, sound };
}

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
