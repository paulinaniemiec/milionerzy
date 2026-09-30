import assert from 'node:assert/strict';
import {SCENARIOS, makeRound, restoreRound} from '../js/scenarios.js';
assert.deepEqual(SCENARIOS.filter(s=>s.grade===5).map(s=>s.title), ['Podzielność i wielokrotności']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===7).map(s=>s.title), [
 'Procenty na rozgrzewkę', 'Procenty w życiu, zestaw 1', 'Procenty w praktyce, zestaw 2', 'Procenty — zadania egzaminacyjne',
]);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===8).map(s=>s.title), [
 'Diagramy i wykresy', 'Prawdopodobieństwo', 'Przygotowanie do egzaminu', 'Procenty — zadania egzaminacyjne',
]);
assert.equal(SCENARIOS.length,9);
const all=SCENARIOS.flatMap(s=>s.questions);
assert.equal(new Set(all.map(q=>q.id)).size,154);
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
console.log(`PASS: ${SCENARIOS.length*1000} rounds, no repeated source exercise/table/chart, all questions reachable, exact save restoration, arithmetic`);

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

// Procenty — zadania egzaminacyjne: ten sam zestaw w klasie 7 i 8, każdy klucz liczony niezależnie.
const exam7=SCENARIOS.find(s=>s.id==='percent-exam-7'), exam8=SCENARIOS.find(s=>s.id==='percent-exam-8');
assert.equal(exam7.grade,7);assert.equal(exam8.grade,8);assert.equal(exam7.questions,exam8.questions);
assert.equal(exam7.questions.length,32);assert.equal(new Set(exam7.questions.map(q=>q.sourceGroup)).size,29);
const r2=x=>Math.round(x*100)/100, pct=x=>`${String(r2(x*100)).replace('.',',')}%`, zl=x=>`${r2(x).toFixed(2).replace('.',',')} zł`;
const truth=(a,b)=>`I: ${a?'P':'F'}, II: ${b?'P':'F'}`;
const raisins=.15*320, second=.7*5000, third=.6*second, maria=(43740-3*3780)/9;
const examAnswers={
 'pe-1':'0,6x + 0,8y',
 'pe-2a':`${80-raisins} g`, 'pe-2b':pct(80/(320+80)),
 'pe-3':`${r2(50/.4)}`, 'pe-4':`${r2(1500/.8)} zł`,
 'pe-5':(9.60*.8/20<9.60/24 ? 'Tak, bo w promocji II 1 dag czekolady kosztuje mniej niż w promocji I' : ''),
 'pe-6a':'0,18 · 84 500 − 556,02', 'pe-6b':'14 839,02 + 0,32 · (97 300 − 85 528)',
 'pe-7':truth(r2((2400+150)/.85)===3000, 2400/3000===.85),
 'pe-8':zl(.85*45),
 'pe-9a':`${r2(4/(.44+.72-1))}`, 'pe-9b':truth(r2(.44+.72-1)===.16, r2(4/.16)===25),
 'pe-10':(2/3<.7&&2/3<.75 ? 'najniższa w sklepie Alfa' : ''),
 'pe-11':truth(r2(1.2*180)===r2(1.8*120), r2(.2*36)===r2(.4*18)),
 'pe-12':`wzrosła o ${pct((280-56)/56)}`,
 'pe-13':`${r2(40*3-40*.8)} zł`,
 'pe-14':truth(third===1400, r2(1-third/5000)===.7),
 'pe-15':`${r2(.65*240)} zł`, 'pe-16':`${r2(100-288/450*100)}`,
 'pe-17':truth(r2((2.70-2.50)/2.50)===.08, r2(22*1.05)===24.10),
 'pe-18':zl(49/.7), 'pe-19':`${r2(.4*175-15)} cm`,
 'pe-20':pct((54-.9*30-24)/24), 'pe-21':pct((150-60)/60), 'pe-22':`${r2(300/(.02*75))}`, 'pe-23':pct((4*1.12-4)/4),
 'pe-24':`o ${pct(1-.8*1.2)}`, 'pe-25':`${(4+8)/.8-(4+8)}`,
 'pe-26':`o ${pct((3780-maria)/maria)}`, 'pe-27':`${r2(1.2*(3*3+2*8+5*3))} zł`,
 'pe-28':`${r2(4/(.5625-(1-.5625)))}`,
 'pe-29':(1-.75*.8<.45 ? 'Od razu o 45%' : ''),
};
assert.deepEqual(Object.keys(examAnswers),exam7.questions.map(q=>q.id));
for(const [id,answer] of Object.entries(examAnswers)) assert.equal(selected(id),answer,id);
console.log('PASS: percent exam set in grades 7 and 8, all 32 answer keys checked');
