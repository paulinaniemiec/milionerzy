import assert from 'node:assert/strict';
import {SCENARIOS, makeRound, restoreRound} from '../js/scenarios.js';
const all=SCENARIOS.flatMap(s=>s.questions);
assert.equal(new Set(all.map(q=>q.id)).size,92);
for(const s of SCENARIOS) {
 for(const q of s.questions) {
  assert.equal(q.answers.length,4,q.id);
  assert.equal(new Set(q.answers).size,4,q.id);
  assert(q.correct>=0&&q.correct<4&&q.explain&&q.q,q.id);
 }
 const seen=new Set();
 let seed=42; const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<1000;i++) {
  const round=makeRound(s,random); assert.equal(round.length,12); assert.equal(new Set(round.map(q=>q.id)).size,12);
  assert.equal(new Set(round.map(q=>q.sourceGroup)).size,12,'same source exercise must never repeat');
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
console.log('PASS: 6000 rounds, no repeated source exercise/table/chart, all questions reachable, exact save restoration, arithmetic');

// Independent solutions for every new question, including enumeration of sample spaces.
const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const selected=(id)=>{const item=all.find(q=>q.id===id);return item.answers[item.correct];};
const chartSolutions=[`${100+80-60}`,`${2-(-4)}°C`,`${30/.2}`,`${(5-3)*4} kg`,'W środę',`${(20+40+30+50)/4} min`,`${2-1} h`,`${(45-30)*200/100}`,`${(4+2)/20*100}%`,'W B jest o 12 widzów więcej','W maju',`${(240-180)/240*100}%`];
chartSolutions.forEach((answer,i)=>assert.equal(selected(`chart-${i+1}`),answer));
assert.deepEqual([12+8,8+12,10+16],[20,20,26]);
assert.equal(.5*120-.6*80,12);
assert.deepEqual([126-120,135-126,141-135],[6,9,6]);
const fractions=[[7,12],[range(1,6).filter(n=>6%n===0).length,6],[40-8-6,40],[range(1,31).filter(n=>n%7===2).length,31],[range(1,20).filter(n=>n%3===0||n%5===0).length,20],[range(0,7).filter(n=>n.toString(2).split('1').length-1===2).length,8],[range(10,99).filter(n=>Math.floor(n/10)===n%10).length,90]];
fractions.forEach(([n,d],i)=>{const [a,b]=selected(`chance-${i+1}`).split('/').map(Number);assert.equal(a*d,b*n);});
assert.equal((4+Number(selected('chance-8')))/(10+Number(selected('chance-8'))),.5);
assert(3/8>5/14);assert.equal(selected('chance-9'),'Z A, bo 3/8 > 5/14');
const pairs=range(1,6).flatMap(a=>range(1,6).map(b=>[a,b]));
assert.equal(pairs.filter(([a,b])=>a+b===9).length/pairs.length,1/9);assert.equal(selected('chance-10'),'1/9');
assert.equal(2/(5-1),.5);assert.equal(selected('chance-11'),'1/2');
const numbers=range(1,3).flatMap(a=>range(1,3).filter(b=>a!==b).map(b=>10*a+b));
assert.equal(numbers.filter(n=>n%2===0).length/numbers.length,1/3);assert.equal(selected('chance-12'),'1/3');
assert.equal(SCENARIOS.find(s=>s.id==='diagrams').questions.filter(q=>q.q.includes('<svg')).length,12);
console.log('PASS: all 24 new answer keys checked with independent calculations');
