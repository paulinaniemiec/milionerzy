import assert from 'node:assert/strict';
import {SCENARIOS, makeRound, restoreRound} from '../js/scenarios.js';
const all=SCENARIOS.flatMap(s=>s.questions);
assert.equal(new Set(all.map(q=>q.id)).size,68);
for(const s of SCENARIOS) {
 for(const q of s.questions) {
  assert.equal(q.answers.length,4,q.id);
  assert.equal(new Set(q.answers).size,4,q.id);
  assert(q.correct>=0&&q.correct<4&&q.explain&&q.q,q.id);
 }
 const seen=new Set();
 for(let i=0;i<100;i++) {
  const round=makeRound(s); assert.equal(round.length,12); assert.equal(new Set(round.map(q=>q.id)).size,12);
  const save={scenarioId:s.id,questionIds:round.map(q=>q.id)};
  assert.deepEqual(restoreRound(JSON.parse(JSON.stringify(save))).questions,round);
  round.forEach(q=>seen.add(q.id));
 }
 assert.equal(seen.size,s.questions.length,'all questions must be available');
}
assert(restoreRound({}),'legacy saved game');
assert.equal(restoreRound({scenarioId:'missing'}),null);
assert.equal(restoreRound({scenarioId:'check',questionIds:Array(12).fill('sp-1a')}),null);
// Independent arithmetic checks against the supplied exercises.
assert.equal(8*(1-.65-1/20)*60,144);
assert.equal(1320/.24+1320,6820);
assert.equal(500*.8*.7,280);
assert.equal([92,95,96,98,97,94,94,95,93,93].reduce((a,b)=>a+b)/10,94.7);
assert.equal(10620/9*4,4720);
assert.equal(37+.30*120+.44*125,128);
assert.equal(Math.round(129.60/1.08*1.23*100),14760);
assert(10/160>15/250);
console.log('PASS: 68 questions, four choices, unique IDs, all pools reachable, saved round/legacy restore, arithmetic checks');
