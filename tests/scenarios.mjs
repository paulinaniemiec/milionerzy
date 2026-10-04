import assert from 'node:assert/strict';
import {SCENARIOS, makeRound, restoreRound} from '../js/scenarios.js';
assert.deepEqual(SCENARIOS.filter(s=>s.grade===4).map(s=>s.title), ['Zegary, kalendarz i jednostki długości']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===5).map(s=>s.title), ['Podzielność i wielokrotności', 'Liczby pierwsze i złożone', 'Potęgowanie', 'Cyfry rzymskie', 'Kolejność wykonywania działań']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===7).map(s=>s.title), [
 'Procenty na rozgrzewkę', 'Procenty w życiu, zestaw 1', 'Procenty w praktyce, zestaw 2', 'Potęgi', 'Procenty — zadania egzaminacyjne',
]);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===8).map(s=>s.title), [
 'Diagramy i wykresy', 'Prawdopodobieństwo', 'Liczby na osi liczbowej', 'Przygotowanie do egzaminu', 'Procenty — zadania egzaminacyjne',
]);
assert.equal(SCENARIOS.length,16);
const all=SCENARIOS.flatMap(s=>s.questions);
assert.equal(new Set(all.map(q=>q.id)).size,443);
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

// Klasa 5: potęgi, cyfry rzymskie i liczby pierwsze — klucze liczone niezależnie.
const plain=html=>html.replace(/<sup>(\d+)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'').trim();
const ev=t=>Function(`return ${plain(t).replace(/\^/g,'**').replace(/·/g,'*').replace(/ /g,'')}`)();
const ask=id=>all.find(q=>q.id===id);
const pick=id=>plain(selected(id));
const powers=SCENARIOS.find(s=>s.id==='powers'), roman=SCENARIOS.find(s=>s.id==='roman'), primes=SCENARIOS.find(s=>s.id==='primes');
assert.deepEqual([powers.grade,roman.grade,primes.grade],[5,5,5]);
assert.deepEqual([powers.questions.length,roman.questions.length,primes.questions.length],[34,40,34]);
// Iloczyn → potęga i potęga → iloczyn.
for(const id of ['pt-1','pt-2','pt-3','pt-4']){const f=plain(ask(id).q).match(/[\d ·]+(?=\s+w postaci)/)[0].trim().split(' · ');assert.equal(pick(id),`${f[0]}^${f.length}`,id);}
assert.equal(pick('pt-5'),'13^1');assert.equal(ev(pick('pt-6')),4**4);assert.equal(ev(pick('pt-7')),13**2);
// „Oblicz …” — wynik z kluczem.
for(const q of powers.questions.filter(q=>q.q.startsWith('Oblicz'))) assert.equal(Number(pick(q.id).replace(/ /g,'')),ev(plain(q.q).replace(/^Oblicz|\.$/g,'')),q.id);
assert.deepEqual(['pt-19','pt-20','pt-21','pt-22','pt-23'].map(pick),['dwa do kwadratu','trzy do sześcianu','pięć do potęgi czwartej','10^3','7^2']);
assert.equal(pick('pt-25'),String(9**2));assert.equal(pick('pt-26'),String(2**3));assert(2**3<3**2);assert.equal(pick('pt-27'),'2^3 < 3^2');
assert.equal(ask('pt-28').answers.map(a=>ev(a)).reduce((m,v,i,a)=>v>a[m]?i:m,0),ask('pt-28').correct);
assert.equal(pick('pt-32'),`${6**2} cm^2`);assert.equal(pick('pt-33'),String(4**3));assert.equal(pick('pt-34'),truth(5**2===10,1**5===1));
assert.equal(ask('pt-35').answers.filter(a=>Number.isInteger(Math.sqrt(a))).join(),pick('pt-35'));
// Cyfry rzymskie: zamiana w obie strony, tylko poprawne zapisy.
const RV={M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
const toRoman=n=>Object.entries(RV).reduce((s,[k,v])=>{while(n>=v){s+=k;n-=v;}return s;},'');
const fromRoman=s=>{const n=[...s].reduce((t,c,i,a)=>RV[c]<RV[a[i+1]]?t-RV[c]:t+RV[c],0);return toRoman(n)===s?n:NaN;};
const romanIn=t=>plain(t).match(/[MDCLXVI]{2,}|\b[MDCLXVI]\b/g);
for(const q of roman.questions){
 const text=plain(q.q), ans=pick(q.id);
 if(text.startsWith('Jaką liczbę')||/Który to rok\?/.test(text)||text.startsWith('Igrzyska')){const r=romanIn(q.q).at(-1);assert.equal(Number(ans.replace('.','')),fromRoman(r),q.id);}
 else if(/W którym wieku/.test(text)){const y=fromRoman(romanIn(q.q).at(-1));assert.equal(ans,toRoman(Math.ceil(y/100)),q.id);}
 else if(text.startsWith('Jak zapisać')){const n=Number(text.match(/\d+/)[0]);assert.equal(ans,toRoman(n),q.id);assert.equal(q.answers.filter(a=>fromRoman(plain(a))===n).length,1,q.id);}
 else if(text.startsWith('Oblicz')){const [a,op,b]=plain(q.q).replace('Oblicz:','').trim().split(' ');const x=fromRoman(a),y=fromRoman(b);assert.equal(fromRoman(ans),op==='+'?x+y:op==='−'?x-y:x*y,q.id);}
}
assert.equal(roman.questions.filter(q=>/Jaką liczbę|Który to rok|W którym wieku|Jak zapisać|Oblicz|Igrzyska/.test(q.q)).length,34);
assert.equal(pick('rz-26'),'10:00');
const blotted=(pattern,ans)=>{const hits=Object.keys(RV).filter(k=>k.length===1).map(c=>pattern.replace('?',c)).filter(s=>!Number.isNaN(fromRoman(s)));assert.deepEqual(hits.map(fromRoman),[Number(ans)]);};
blotted('XV?II',pick('rz-32'));blotted('LX?VIII',pick('rz-33'));
assert.deepEqual(ask('rz-34').answers.map(plain).filter(a=>Number.isNaN(fromRoman(a))),[pick('rz-34')]);
assert.equal(Math.max(...ask('rz-35').answers.map(a=>fromRoman(plain(a)))),fromRoman(pick('rz-35')));
assert.equal(pick('rz-36'),String(toRoman(38).length));
// Liczby pierwsze: dzielniki, pierwszość, rozkłady.
const isPrime=n=>n>1&&range(2,Math.floor(Math.sqrt(n))).every(d=>n%d);
const divisors=n=>range(1,n).filter(d=>n%d===0);
const factor=n=>{const f=[];for(let d=2;n>1;d++)while(n%d===0){f.push(d);n/=d;}return f;};
const product=s=>s.split(' · ').map(Number).reduce((a,b)=>a*b,1);
const decomp='2 · 3 · 5 · 11', big='2 · 2 · 3 · 7 · 7 · 11';
assert.equal(pick('lp-1'),divisors(18).join(', '));assert.equal(pick('lp-29'),divisors(30).join(', '));
assert.equal(pick('lp-2'),String(divisors(24).length));
for(const id of ['lp-3','lp-20']) assert.deepEqual(ask(id).answers.filter(a=>isPrime(+a)),[pick(id)]);
assert.deepEqual(ask('lp-4').answers.filter(a=>!isPrime(+a)),[pick('lp-4')]);
assert.deepEqual(ask('lp-19').answers.filter(a=>divisors(+a).length===2),[pick('lp-19')]);
assert.equal(pick('lp-6'),String(range(1,19).filter(isPrime).length));assert.equal(pick('lp-28'),String(range(21,29).filter(isPrime).length));
assert.equal(pick('lp-8'),[504,4525,6454,1581,1750,2383,7537].filter(isPrime).join(' i '));
for(const [id,n] of [['lp-9',110],['lp-14',84],['lp-15',360],['lp-23',150]]) assert.equal(pick(id),factor(n).join(' · '),id);
assert.equal(pick('lp-16'),`72 = ${factor(72).join(' · ')}`);
for(const [id,f] of [['lp-10','2 · 3 · 3 · 5 · 7'],['lp-11a',decomp],['lp-26','2 · 2 · 5 · 5']]) assert.equal(+pick(id),product(f),id);
assert.deepEqual(ask('lp-11b').answers.filter(a=>product(decomp)%a),[pick('lp-11b')]);
assert.deepEqual(ask('lp-11c').answers.filter(a=>product(decomp)%a===0),[pick('lp-11c')]);
assert.deepEqual(ask('lp-12a').answers.filter(a=>product(big)%a),[pick('lp-12a')]);
assert.deepEqual(ask('lp-12b').answers.filter(a=>product(big)%a===0),[pick('lp-12b')]);
assert.equal(pick('lp-12c'),truth(product(big)%49===0,product(big)%9===0));
const box=n=>factor(n).length>=3;
assert.deepEqual(ask('lp-13a').answers.filter(a=>box(+a)),[pick('lp-13a')]);assert.deepEqual(ask('lp-13b').answers.filter(a=>!box(+a)),[pick('lp-13b')]);
assert.equal(pick('lp-17'),String(range(10,99).find(isPrime)));assert.equal(pick('lp-18'),String(range(1,99).filter(isPrime).at(-1)));
assert.equal(pick('lp-21'),'złożoną, bo dzieli się przez 3');assert(!isPrime(111)&&111%3===0);
assert.equal(pick('lp-22'),'7 i 13');assert(isPrime(7)&&isPrime(13)&&7+13===20&&7*13===91);
assert.equal(pick('lp-24'),String(factor(96).length));
assert.deepEqual(ask('lp-27').answers.filter(a=>factor(+a).includes(7)),[pick('lp-27')]);
console.log('PASS: grade 5 — powers, Roman numerals and primes answer keys checked');

// Kolejność działań: każdy wynik i porównanie liczone przez JavaScript (te same zasady kolejności).
const order=SCENARIOS.find(s=>s.id==='order');
assert.equal(order.grade,5);assert.equal(order.questions.length,40);assert.equal(new Set(order.questions.map(q=>q.sourceGroup)).size,31);
const calc=t=>Function(`return ${plain(t).replace(/\^/g,'**').replace(/·/g,'*').replace(/:/g,'/').replace(/−/g,'-').replace(/\[/g,'(').replace(/\]/g,')')}`)();
const exprOf=q=>plain(q.q).replace(/^.*?(Oblicz: |wyrażeniu )/,'').replace(/\?$/,'');
for(const q of order.questions.filter(q=>q.q.startsWith('Oblicz'))) assert.equal(+pick(q.id),calc(exprOf(q)),q.id);
for(const q of order.questions.filter(q=>q.q.startsWith('Które wyrażenie ma większą'))){const [a,b]=plain(q.q).match(/A = (.*)B = (.*)$/).slice(1).map(calc);assert.equal(pick(q.id),a>b?'A':b>a?'B':'Mają równe wartości',q.id);}
// Pierwsze działanie, potem reszta wyrażenia od nowa.
assert.deepEqual(['kd-1a','kd-2a','kd-3a','kd-4a','kd-5a','kd-6a','kd-7a'].map(pick),['6 · 3','9 − 4','12 : 4','18 : 3','30 − 8','3^2','7 − 3']);
const vals=id=>ask(id).answers.map(a=>calc(a));
assert.equal(vals('kd-22').indexOf(Math.max(...vals('kd-22'))),ask('kd-22').correct);
assert.equal(calc(pick('kd-23')),4*3+2);assert.deepEqual(vals('kd-23').filter(v=>v===14).length,1);
assert.equal(calc(pick('kd-24')),2*3+2*2);assert.deepEqual(vals('kd-24').filter(v=>v===10).length,1);
assert.equal(calc(pick('kd-25')),4*4+3*2);assert.deepEqual(vals('kd-25').filter(v=>v===22).length,1);
assert.equal(+pick('kd-26'),5*3+2*2);
assert.deepEqual(vals('kd-27a').map(v=>v===28),[false,true,false,false]);assert.equal(pick('kd-27b'),`${50-(3*4+2*5)} zł`);
assert.deepEqual(vals('kd-27c').map(v=>v===28),[true,false,false,false]);
assert.equal(pick('kd-28'),`${3*18+12} zł`);assert.equal(+pick('kd-29'),60/5-4);
assert.deepEqual(ask('kd-30').answers.slice(0,3).map(calc).map(v=>v===16),[true,false,false]);
assert.equal(pick('kd-31'),truth(20-5*2===30,20/5*2===8));
assert.equal(order.questions.filter(q=>q.q.startsWith('Które wyrażenie ma większą')).length,6);
console.log('PASS: order of operations — all 40 answer keys checked');

// Klasa 7: potęgi — każdy wynik liczony niezależnie, dokładnie jedna odpowiedź ma poprawną wartość.
const pow7=SCENARIOS.find(s=>s.id==='powers-7');
assert.equal(pow7.grade,7);assert.equal(pow7.questions.length,54);assert.equal(new Set(pow7.questions.map(q=>q.sourceGroup)).size,33);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===pow7.questions).map(s=>s.grade),[7]);
const num=html=>Function(`return ${html
 .replace(/(\d+)<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g,'($1+$2/$3)')
 .replace(/<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g,'($1/$2)')
 .replace(/ cm<sup>2<\/sup>| m<sup>3<\/sup>/,'').replace(/,/g,'.').replace(/−/g,'-').replace(/ /g,'')}`)();
const near=(a,b)=>Math.abs(a-b)<1e-9;
const values7={
 'p7-1a':3**4,'p7-1b':2**5,'p7-2a':.3**2,'p7-2b':.2**3,'p7-2c':1.1**2,'p7-3a':(2/5)**2,'p7-3b':(3/4)**3,'p7-4a':(4/3)**2,'p7-4b':(5/2)**3,
 'p7-5a':37**0,'p7-5b':(-(4+2/7))**0,'p7-6a':.48**1,'p7-6b':(-9)**1,'p7-7a':(-3)**4,'p7-7b':(-2)**5,'p7-8a':-(5**2),'p7-8b':-((-2)**3),
 'p7-9a':(-.5)**2,'p7-9b':(-.1)**3,'p7-10a':(-1)**101,'p7-10b':(-1)**64,'p7-16':String(10n**20n).length-1,
 'p7-20a':2.5**2-1.5**2,'p7-20b':1.2**2+.8**2,'p7-20c':3**2-(-3)**2,'p7-21':(-1)**7+(-1)**8+1**9,'p7-22':2**3*(1/2)**2,'p7-23':.1**2*10**3,
 'p7-29':3**4,'p7-30':.3**3,'p7-31':(3/2)**2,'p7-32':2**6,
 'p7-33a':[5,6,8,32].find(n=>2**n===64),'p7-33b':[2,3,4,9].find(n=>(-3)**n===-27),'p7-33c':[4,5,16,32].find(n=>near((1/2)**n,1/32)),
};
for(const [id,v] of Object.entries(values7)){const a=ask(id).answers.map(num);assert(near(a[ask(id).correct],v),id);assert.equal(a.filter(x=>near(x,v)).length,1,id);}
// Prawda/fałsz, potęgi liczby 10, wybór liczby.
assert.equal(pick('p7-11'),truth(-(3**4)===(-3)**4,-(5**3)===(-5)**3));
assert.equal(pick('p7-12'),truth(15**0===1**15,near((2/3)**3,2**3/3)));
assert.equal(pick('p7-13'),truth(4**3===8**2,2**4===4**2));
assert.equal(pick('p7-14'),truth(6**0===0**6,2**3===3**2));
for(const [id,n] of [['p7-15a',100000],['p7-15b',1e10],['p7-15c',100000000],['p7-15d',1e12]]) assert.equal(pick(id),`10^${Math.log10(n)}`,id);
assert.deepEqual([15e6,150e6,1.5e6,15e8].map(v=>v===150000000),ask('p7-17').answers.map((_,i)=>i===ask('p7-17').correct));
const signs=[(-5)**4,-((-2)**3),(-.3)**3,(-1)**100];assert.equal(signs.findIndex(v=>v<0),ask('p7-24').correct);assert.equal(signs.filter(v=>v<0).length,1);
const big7=[.9**2,.9**3,.9,.9**0];assert.equal(big7.indexOf(Math.max(...big7)),ask('p7-25').correct);
const small7=[(-2)**3,(-2)**2,-(2**2),(-2)**0];assert.equal(small7.indexOf(Math.min(...small7)),ask('p7-26').correct);
assert((3/5)**2<3**2/5);assert.equal(pick('p7-27'),'Pierwsza jest mniejsza');
assert.equal(pick('p7-28'),`2^${180/20} = ${2**(180/20)}`);
assert.equal(pick('p7-19a'),'(−1,5)^4');assert.equal(pick('p7-19b'),'(23)^5');
assert.equal(plain(selected('p7-18a')).split(' · ').length,3);assert.equal(pick('p7-18b').split(' · ').length,4);assert.equal(pick('p7-18c').split(' · ').length,6);
console.log('PASS: grade 7 powers — all 54 answer keys checked');

// Liczby na osi: współrzędne liczone z danych rysunku (kreski), warunki i zbiory sprawdzane niezależnie.
const axis=SCENARIOS.find(s=>s.id==='axis');
assert.equal(axis.grade,8);assert.equal(axis.questions.length,31);assert.equal(new Set(axis.questions.map(q=>q.sourceGroup)).size,25);
const axesOf=html=>[...html.matchAll(/data-axis="([^"]*)" data-points="([^"]*)" data-ray="([^"]*)"/g)].map(([,ab,pts,ray])=>{
 const [a,b,seg]=ab.split(',').map(Number), at=k=>a+k*(b-a)/seg;
 return {points:Object.fromEntries(pts?pts.split(';').map(p=>{const [n,k]=p.split(':');return [n,at(+k)];}):[]),
  ray:ray?(([k,dir,closed])=>({v:at(+k),dir,closed:closed==='true'}))(ray.split(',')):null};});
const val=s=>{const m=s.match(/^(\d+)\/(\d+)$/);return m?m[1]/m[2]:Number(s.replace(',','.').replace('−','-'));};
const condOf=r=>`x ${r.dir==='right'?(r.closed?'≥':'>'):(r.closed?'≤':'<')} ${r.v}`;
const parseCond=s=>{const [,op,v]=plain(s).replace(/&gt;/,'>').replace(/&lt;/,'<').match(/^x ([<>≤≥]) (.+)$/);return `x ${op} ${val(v)}`;};
const sat=(r,v)=>r.dir==='right'?(r.closed?v>=r.v:v>r.v):(r.closed?v<=r.v:v<r.v);
// Odczytywanie współrzędnych: dokładnie jedna odpowiedź równa wartości z rysunku.
for(const q of axis.questions.filter(q=>q.q.includes('Jaka jest współrzędna punktu')&&q.q.includes('data-axis'))){
 const name=plain(q.q).match(/punktu (\w)\?/)[1], v=axesOf(q.q)[0].points[name];
 const vals=q.answers.map(a=>val(plain(a.replace(/<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/,'$1/$2'))));
 assert(near(vals[q.correct],v),q.id);assert.equal(vals.filter(x=>near(x,v)).length,1,q.id);
}
assert.equal(axis.questions.filter(q=>q.q.includes('Jaka jest współrzędna punktu')&&q.q.includes('data-axis')).length,11);
// Która oś: X ≠ 180 oraz zbiory x ≤ 5 i x > −2.
const xs=axesOf(ask('os-7').q).map(a=>a.points.X);assert.deepEqual(xs.map(v=>v!==180).map((b,i)=>b?i:-1).filter(i=>i>=0),[ask('os-7').correct]);
for(const [id,want] of [['os-8','x ≤ 5'],['os-9','x > -2']]){const c=axesOf(ask(id).q).map(a=>condOf(a.ray));assert.deepEqual(c.map((s,i)=>s===want?i:-1).filter(i=>i>=0),[ask(id).correct],id);}
// Zapisz warunek: odpowiedź = warunek z rysunku, tylko jedna taka.
for(const id of ['os-10','os-11','os-12','os-13','os-14']){const c=condOf(axesOf(ask(id).q)[0].ray);assert.equal(parseCond(selected(id)),c,id);assert.equal(ask(id).answers.filter(a=>parseCond(a)===c).length,1,id);}
const rM1=axesOf(ask('os-19a').q)[0].ray, r4=axesOf(ask('os-21').q)[0].ray;
assert.deepEqual(ask('os-19a').answers.filter(a=>sat(rM1,val(a))),[selected('os-19a')]);
assert.equal(pick('os-19b'),truth(sat(rM1,-.5),!sat(rM1,-1)));
assert.equal(pick('os-21'),truth(sat(r4,4),range(0,10).find(n=>sat(r4,n))===5));
// Bez rysunków.
const ints=range(-20,20);
assert.equal(+pick('os-15'),range(0,20).find(n=>n>4));assert.equal(+pick('os-16'),range(0,20).find(n=>n>=-7));
assert.equal(val(pick('os-17')),Math.max(...ints.filter(n=>n<-3)));
assert.equal(+pick('os-18'),ints.filter(n=>n>-3&&n<=2).length);
assert.deepEqual(ask('os-20').answers.filter(a=>!(val(a)>=-1.5)),[selected('os-20')]);
assert.equal(val(pick('os-22')),2-(-3.5));assert.equal(val(pick('os-23')),(-4+10)/2);assert.equal(val(pick('os-24')),-7+5);
assert.equal(+pick('os-25'),ints.filter(n=>n>-2.5&&n<1).length);
console.log('PASS: number line — all 31 answer keys checked against the drawings');

// Klasa 4: czas, kalendarz (prawdziwe daty 2026), wieki, cyfry rzymskie, długości — klucze liczone niezależnie.
const g4=SCENARIOS.find(s=>s.id==='time-length');
assert.equal(g4.grade,4);assert.equal(g4.questions.length,56);assert.equal(new Set(g4.questions.map(q=>q.sourceGroup)).size,30);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===g4.questions).map(s=>s.grade),[4]);
const hm=s=>{const [h,m]=s.split(':').map(Number);return h*60+m;}, clk=n=>`${Math.floor(((n%1440)+1440)%1440/60)}:${String(((n%60)+60)%60).padStart(2,'0')}`;
assert.deepEqual(['k4-1a','k4-1b','k4-1c','k4-1d','k4-2'].map(pick).map(Number),[60/2,3*15,2*60,2*24,2*60/15]);
assert.equal(pick('k4-3a'),clk(hm('9:50')+25));assert.equal(pick('k4-3b'),clk(hm('14:10')-35));
assert.equal(pick('k4-4'),clk(hm('8:55')+45));assert.equal(pick('k4-5'),clk(hm('17:40')+95));assert.equal(pick('k4-7'),clk(hm('10:25')+50));
const d6=hm('9:10')-hm('7:45');assert.equal(pick('k4-6'),`${Math.floor(d6/60)} h ${d6%60} min`);
for(const id of ['k4-8','k4-9','k4-10']){const t=ask(id).q.match(/data-time="([^"]+)"/)[1];assert.equal(pick(id),t,id);assert.equal(ask(id).answers.filter(a=>a===t).length,1);}
assert.equal(pick('k4-11a'),clk(hm('7:00')+12*60).padStart(5,'0'));
const days=(y,m)=>new Date(Date.UTC(y,m,0)).getUTCDate();
assert.deepEqual(['k4-12a','k4-12b','k4-12c'].map(pick).map(Number),[days(2026,5),days(2026,9),days(2026,2)]);
const MONTHS=['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];
assert.deepEqual(ask('k4-13').answers.filter(a=>days(2026,MONTHS.indexOf(a)+1)===30),[pick('k4-13')]);
assert.deepEqual(['k4-14a','k4-14b','k4-14c'].map(pick).map(Number),[5*7,2*12,3*100]);
assert.equal(pick('k4-15'),`${20-14+1} dni i ${20-14} noclegów`);
const day=(m,d)=>Date.UTC(2026,m-1,d)/864e5, DOW=['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'], dow=(m,d)=>DOW[new Date(Date.UTC(2026,m-1,d)).getUTCDay()];
assert.equal(+pick('k4-16'),day(11,3)-day(10,25));
assert.equal(pick('k4-17'),'1 marca 2026 r.');assert.equal(new Date(Date.UTC(2026,1,28+1)).getUTCMonth(),2);
assert.equal(dow(9,1),'wtorek');assert.equal(pick('k4-18'),dow(9,20));
assert.equal(dow(6,27),'sobota');const dep=new Date(Date.UTC(2026,5,27+12));assert.equal(pick('k4-19'),`${dep.getUTCDate()} lipca, ${DOW[dep.getUTCDay()]}`);
for(const id of ['k4-20a','k4-20b','k4-20c','k4-20d','k4-20e']){const y=+plain(ask(id).q).match(/\d+/)[0];assert.equal(pick(id),toRoman(Math.ceil(y/100)),id);}
assert.deepEqual(ask('k4-21').answers.filter(y=>Math.ceil(y/100)===20),[pick('k4-21')]);
for(const id of ['k4-22a','k4-22b','k4-22c','k4-22d']) assert.equal(+pick(id),fromRoman(plain(ask(id).q).match(/[IVX]+/)[0]),id);
for(const id of ['k4-23a','k4-23b','k4-23c']){const n=+plain(ask(id).q).match(/\d+/)[0];assert.equal(pick(id),toRoman(n),id);assert.equal(ask(id).answers.filter(a=>fromRoman(plain(a))===n).length,1,id);}
const r24=ask('k4-24').answers.map(a=>fromRoman(plain(a)));assert.equal(r24.indexOf(Math.max(...r24)),ask('k4-24').correct);
assert(g4.questions.every(q=>!/[LCDM]/.test(plain(q.answers.join(' ')).replace(/[a-ząćęłńóśźż]+/gi,w=>/^[IVX]+$/.test(w)?w:''))),'grade 4 roman numerals only I, V, X');
const mm=s=>[...s.matchAll(/(\d[\d ]*)\s*(mm|cm|km|m)\b/g)].reduce((t,[,v,u])=>t+Number(v.replace(/ /g,''))*{mm:1,cm:10,m:1000,km:1e6}[u],0);
for(const [id,v] of [['k4-27a',1000],['k4-27b',30],['k4-27c',2e6],['k4-27d',5e5],['k4-28a',4*1000+50],['k4-28b',2500]]){assert.equal(mm(selected(id)),v,id);assert.equal(ask(id).answers.filter(a=>mm(a)===v).length,1,id);}
assert.equal(mm(selected('k4-29')),1470-1320);
const l30=ask('k4-30').answers.map(mm);assert.equal(l30.indexOf(Math.max(...l30)),ask('k4-30').correct);
assert.deepEqual(['k4-26a','k4-26b','k4-26c','k4-26d','k4-26e','k4-25'].map(pick),['mm','m','km','cm','mm','centymetry']);
console.log('PASS: grade 4 — all 56 answer keys checked (real 2026 calendar)');
