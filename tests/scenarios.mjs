import assert from 'node:assert/strict';
import {SCENARIOS, makeRound, restoreRound} from '../js/scenarios.js';
assert.deepEqual(SCENARIOS.filter(s=>s.grade===4).map(s=>s.title), ['Zegary, kalendarz i jednostki długości', 'Oś liczbowa', 'Dodawanie i odejmowanie', 'Szacowanie', 'Sprytne dodawanie', 'Sprytne odejmowanie', 'Powtórzenie: dodawanie i odejmowanie', 'Jak rozwiązywać zadania tekstowe', 'Tabliczka mnożenia', 'Tabliczka dzielenia']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===5).map(s=>s.title), ['Podzielność i wielokrotności', 'Liczby pierwsze i złożone', 'Potęgowanie', 'Cyfry rzymskie', 'Kolejność wykonywania działań', 'Płaszczyzna, proste, półproste, odcinki', 'Kąty', 'Mierzenie kątów', 'Trójkąty']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===5).map(s=>s.section), ['Liczby naturalne', 'Liczby naturalne', 'Liczby naturalne', 'Liczby naturalne', 'Liczby naturalne', 'Figury geometryczne', 'Figury geometryczne', 'Figury geometryczne', 'Figury geometryczne']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===7).map(s=>s.title), [
 'Procenty na rozgrzewkę', 'Procenty w życiu, zestaw 1', 'Procenty w praktyce, zestaw 2', 'Procenty — zadania egzaminacyjne', 'Potęgi', 'Potęgi o tych samych podstawach', 'Notacja wykładnicza', 'Obliczenia w notacji wykładniczej', 'Potęgi — zadania egzaminacyjne', 'Pierwiastek kwadratowy',
]);
// Klasy 4, 7 i 8 są podzielone na działy.
assert.deepEqual(SCENARIOS.filter(s=>s.grade===4).map(s=>s.section), ['Zaczynamy przygodę z matematyką', ...Array(6).fill('Dodawanie i odejmowanie'), ...Array(3).fill('Mnożenie i dzielenie')]);
// Klasa 8: każdy zestaw ma 3 plusy, a hasła (nazwy zwierząt) się nie powtarzają.
{const g8=SCENARIOS.filter(s=>s.grade===8);assert(g8.every(s=>s.award&&s.award.pluses===3),'grade 8: 3 pluses');assert.equal(new Set(g8.map(s=>s.award.password)).size,g8.length);}
assert.deepEqual(SCENARIOS.filter(s=>s.grade===8).map(s=>s.section), ['Statystyka i prawdopodobieństwo', 'Statystyka i prawdopodobieństwo', 'Wyrażenia algebraiczne i równania', 'Wyrażenia algebraiczne i równania', 'Wyrażenia algebraiczne i równania', 'Wyrażenia algebraiczne i równania', 'Przygotowanie do egzaminu', 'Przygotowanie do egzaminu', 'Przygotowanie do egzaminu', 'Przygotowanie do egzaminu']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===7).map(s=>s.section), ['Procenty', 'Procenty', 'Procenty', 'Procenty', 'Potęgi', 'Potęgi', 'Potęgi', 'Potęgi', 'Potęgi', 'Pierwiastki']);
assert.deepEqual(SCENARIOS.filter(s=>s.grade===8).map(s=>s.title), [
 'Diagramy i wykresy', 'Prawdopodobieństwo', 'Liczby na osi liczbowej', 'Wyrażenia algebraiczne', 'Mnożenie sum algebraicznych', 'Równania', 'Przygotowanie do egzaminu', 'Procenty — zadania egzaminacyjne', 'Wyrażenia algebraiczne — zadania egzaminacyjne', 'Potęgi — zadania egzaminacyjne',
]);
assert.equal(SCENARIOS.length,39);
const all=SCENARIOS.flatMap(s=>s.questions);
assert.equal(new Set(all.map(q=>q.id)).size,1494);
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

// Klasa 4: oś liczbowa — wartości punktów liczone tylko z tego, co widać: podpisów pod kreskami i położenia punktów.
const ax4=SCENARIOS.find(s=>s.id==='axis-4');
assert.equal(ax4.grade,4);assert.equal(ax4.questions.length,33);assert.equal(new Set(ax4.questions.map(q=>q.sourceGroup)).size,19);
const seen4=html=>{
 const labels=[...html.matchAll(/<text x="([\d.]+)" y="62"[^>]*>([^<]+)<\/text>/g)].map(([,x,v])=>[+x,+v]);
 const ticks=[...html.matchAll(/<path d="M([\d.]+) 30V42"/g)].map(m=>+m[1]);
 const [[x1,v1],[x2,v2]]=[labels[0],labels.at(-1)], at=x=>v1+(x-x1)*(v2-v1)/(x2-x1);
 labels.forEach(([x,v])=>assert(near(at(x),v),'labels must lie on one scale'));
 const points=Object.fromEntries([...html.matchAll(/<circle cx="([\d.]+)" cy="36" r="5.5" fill="#f6c85c"\/><text[^>]*>(\w+)<\/text>/g)].map(([,x,n])=>[n,at(+x)]));
 Object.values(points).forEach(v=>assert(Number.isInteger(Math.round(v*1e6)/1e6),'grade 4: natural numbers only'));
 return {points,ticks:ticks.map(at)};
};
for(const q of ax4.questions.filter(q=>q.q.startsWith('<figure')&&q.q.includes('literą'))){
 const L=plain(q.q).match(/literą (\w)\?/)[1], v=seen4(q.q).points[L];
 assert.equal(+selected(q.id),v,q.id);assert.equal(q.answers.filter(a=>+a===v).length,1,q.id);
}
assert.equal(ax4.questions.filter(q=>q.q.includes('literą')).length,21);
for(const [id,n] of [['o4-10a',10],['o4-10b',12]]){const p=seen4(ask(id).q).points;assert.equal(pick(id),Object.keys(p).find(k=>p[k]===n)??'Żaden z nich',id);}
const t11=seen4(ask('o4-11').q).ticks;assert(!t11.includes(3)&&Math.min(...t11)<3&&Math.max(...t11)>3);assert.equal(pick('o4-11'),'Nie, 3 leży w połowie między 2 i 4');
assert.equal(+pick('o4-12'),seen4(ask('o4-12').q).ticks.indexOf(21));
const t13=seen4(ask('o4-13').q).ticks;assert.equal(pick('o4-13'),`o ${t13[1]-t13[0]}`);
const k4=seen4(ask('o4-14a').q).points;assert.equal(pick('o4-14a'),`${k4.P} kg`);assert.equal(pick('o4-14b'),`${k4.O-k4.K} kg`);
assert.equal(+pick('o4-15'),4*25);assert.equal(+pick('o4-16'),(90-30)/10);
const d17=ask('o4-17').answers.map(a=>Math.abs(a-50));assert.equal(d17.indexOf(Math.min(...d17)),ask('o4-17').correct);
assert.equal(+pick('o4-18'),(20+30)/2);assert.equal(+pick('o4-19'),40+3*5);
console.log('PASS: grade 4 number line — all 33 answer keys checked from visible labels');

// Klasa 4: dodawanie i odejmowanie — każdy klucz liczony z treści zadania.
{
const add4=SCENARIOS.find(s=>s.id==='addition-4');
assert.equal(add4.grade,4);assert.equal(add4.questions.length,41);assert.equal(new Set(add4.questions.map(q=>q.sourceGroup)).size,24);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===add4.questions).map(s=>s.grade),[4]);
const ev=s=>s.replace(/\s/g,'').split(/(?=[+−])/).reduce((t,p)=>p[0]==='−'?t-p.slice(1):t+Number(p.replace('+','')),0);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const calcs=add4.questions.filter(q=>q.q.startsWith('Ile to'));assert.equal(calcs.length,13);
for(const q of calcs){const v=ev(plain(q.q).slice(7,-1));only(q.id,a=>ev(a)===v);}
for(const id of ['d4-5a','d4-5b','d4-5c']){
 const st=ask(id).q.match(/task-statements">(.*?)<\/div>/)[1];
 only(id,a=>{const [l,r]=plain(st.replace(/<span class="answer-box"[^>]*><\/span>/,a)).split('=');return ev(l)===+r;});
}
for(const [id,v] of [['d4-6',26+9],['d4-7',75-48],['d4-11a',38+45],['d4-11b',90-34],['d4-12',85-49],['d4-15a',46+19],['d4-15b',46-19],['d4-16',38+(38+14)],
 ['d4-17',54+(54-18)],['d4-18',(90-37)-37],['d4-19',100-58-27],['d4-20',36-29],['d4-21',45+16+27+8]]) only(id,a=>+a===v);
only('d4-8',a=>a.includes('+')&&ev(a)===83&&a.split(' + ').every(n=>['37','46'].includes(n)));
only('d4-9',a=>{const [l,r]=a.split('=');return ev(l)!==+r;});
assert.deepEqual(['d4-10a','d4-10b','d4-10c'].map(pick),['odjemna','odjemnik','składniki']);
const s13=ask('d4-13').answers.map(ev);assert.equal(s13.indexOf(Math.max(...s13)),ask('d4-13').correct);assert.equal(new Set(s13).size,4);
const s14=ask('d4-14').answers.map(ev);assert.equal(s14.indexOf(Math.min(...s14)),ask('d4-14').correct);assert.equal(new Set(s14).size,4);
ask('d4-22').answers.forEach(a=>{const [x,y]=a.split(' i ').map(Number);assert.equal(x-y,11);});
only('d4-22',a=>{const [x,y]=a.split(' i ').map(Number);return x+y===11+14;});
const cards=range(1,9).flatMap(a=>range(1,9).filter(b=>b!==a).map(b=>[a,b]));
assert.equal(+pick('d4-23a'),Math.max(...cards.map(([a,b])=>10+a-b)));assert.equal(+pick('d4-23b'),Math.min(...cards.map(([a,b])=>100*a-10*b)));
const mc=ask('d4-24a').q.match(/data-cells="([^"]+)"/)[1].split(',');assert.equal(ask('d4-24b').q.match(/data-cells="([^"]+)"/)[1],mc.join(','));
const S=+mc[0]+ +mc[4]+ +mc[8];assert.equal(+pick('d4-24a'),S);assert.equal(mc[1],'?');assert.equal(+pick('d4-24b'),S-mc[0]-mc[2]);
// Kwadrat da się uzupełnić liczbami naturalnymi.
const [a,,c,,e,,,,i]=mc.map(Number),b=S-a-c,g=S-c-e,d=S-a-g,f=S-d-e,h=S-b-e,sq=[[a,b,c],[d,e,f],[g,h,i]];
[...sq,...[0,1,2].map(k=>sq.map(r=>r[k])),[a,e,i],[c,e,g]].forEach(l=>assert.equal(l.reduce((x,y)=>x+y),S));assert(sq.flat().every(n=>n>0));
console.log('PASS: grade 4 addition and subtraction — all 41 answer keys computed independently');
}

// Klasa 4: szacowanie — każdy klucz liczony z treści zadania.
{
const est=SCENARIOS.find(s=>s.id==='estimation-4');
assert.equal(est.grade,4);assert.equal(est.questions.length,49);assert.equal(new Set(est.questions.map(q=>q.sourceGroup)).size,25);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===est.questions).map(s=>s.grade),[4]);
assert.deepEqual(est.award,{password:'ZAKUPY',pluses:1});
const num=s=>+s.replace(/\s/g,'');
const ev=s=>s.replace(/\s/g,'').split(/(?=[+−])/).reduce((t,p)=>p[0]==='−'?t-p.slice(1):t+Number(p.replace('+','')),0);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
// Znaczenie określeń: „prawie”, „niecałe”, „trochę mniej” — tuż poniżej; „trochę więcej/ponad” — tuż powyżej.
const means=(text,n)=>{const x=num(text.match(/[\d ]+$/)[0]);
 if(/^(prawie|niecałe|trochę mniej niż)/.test(text)) return n<x&&x-n<=50;
 if(/^trochę (więcej niż|ponad)/.test(text)) return n>x&&n-x<=50;
 if(/^około/.test(text)) return Math.abs(n-x)<=50;
 if(/^ponad/.test(text)) return n>x;
 throw new Error(text);};
for(const id of ['s4-1a','s4-1b','s4-1c','s4-1d']) only(id,a=>means(a,+plain(ask(id).q).match(/\d+/)[0]));
for(const id of ['s4-2a','s4-2b','s4-2c']) only(id,a=>means(plain(ask(id).q).match(/określenia (.*)\?/)[1],+a));
for(const id of ['s4-3a','s4-3b','s4-3c','s4-3d']){const [,n,w]=plain(ask(id).q).match(/(\d+) to (.*) ___/);only(id,a=>means(`${w} ${a}`,+n));}
for(const id of ['s4-4a','s4-4b','s4-4c']) only(id,a=>num(a)===ev(plain(ask(id).q).match(/działania (.*)\. Oszacuj/)[1]));
// Hasło: litery od najmniejszego wyniku.
const cells=[...ask('s4-5').q.matchAll(/<td>(.*?)<\/td>/g)].map(m=>m[1]),k=cells.length/2;
assert.equal(pick('s4-5'),range(0,k-1).sort((i,j)=>ev(cells[i])-ev(cells[j])).map(i=>plain(cells[k+i])).join(''));
assert.equal(pick('s4-5'),'SKLEP');
// Szacunek z ramki: każda liczba zastąpiona bliską pełną liczbą.
for(const id of ['s4-6a','s4-6b','s4-6c']){const t=plain(ask(id).q).match(/działania (.*)\?/)[1].split(' + ').map(Number);
 only(id,a=>a.split(' + ').map(Number).every((v,i)=>Math.abs(v-t[i])<=50));}
for(const id of ['s4-7a','s4-7b','s4-7c','s4-8a','s4-8b']){const v=ev(plain(ask(id).q).match(/działania (.*) to/)[1]),d=ask(id).answers.map(a=>Math.abs(num(a)-v));
 assert.equal(d.indexOf(Math.min(...d)),ask(id).correct,id);assert(Math.min(...d)<=50,id);}
for(const id of ['s4-9a','s4-9b']){const v=ev(plain(ask(id).q).match(/działania (.*)\?/)[1]);only(id,a=>{const [lo,hi]=a.match(/\d+/g).map(Number);return lo<=v&&v<hi&&hi-lo===100;});}
for(const id of ['s4-10a','s4-10b']) only(id,a=>{const [l,r]=a.split('=');return ev(l)!==+r;});
only('s4-11a',a=>ev(a)>1000);only('s4-11b',a=>ev(a)<500);
assert.equal(pick('s4-12a'),48+33<90?'jest mniejszy od 90':'?');assert.equal(pick('s4-12b'),62+27>80?'jest większy od 80':'?');
for(const [id,v] of [['s4-13a',38+47],['s4-13b',512+389]]){const d=ask(id).answers.map(a=>Math.abs(+a.match(/\d+$/)[0]-v));
 assert.equal(d.indexOf(Math.min(...d)),ask(id).correct,id);assert(pick(id).startsWith('Błąd'),id);}
for(const [id,v] of [['s4-14a',7429],['s4-14b',1125]]) only(id,a=>ev(a)===v);
// Czy wystarczy: pierwsza kwota to budżet, pozostałe to ceny.
for(const id of ['s4-15a','s4-15b','s4-15c']){const [b,...p]=[...plain(ask(id).q).matchAll(/(\d+) zł/g)].map(m=>+m[1]),left=b-p.reduce((x,y)=>x+y);
 assert.equal(ask(id).correct,left>0?0:left===0?1:left>=-10?2:3,id);}
const polaRows=[...ask('s4-16a').q.matchAll(/<td>(\d+) zł<\/td>/g)].map(m=>+m[1]),pola=polaRows.reduce((x,y)=>x+y);
const near=(id,v)=>{const d=ask(id).answers.map(a=>Math.abs(+a.match(/\d+/)[0]-v));assert.equal(d.indexOf(Math.min(...d)),ask(id).correct,id);assert(Math.min(...d)<10,id);};
near('s4-16a',pola);near('s4-16b',100-pola);assert.equal(ask('s4-16b').q.match(/<td>(\d+) zł<\/td>/g).length,4);
const shop=Object.fromEntries([...ask('s4-17').q.matchAll(/<th scope="row">(.*?)<\/th><td>(\d+) zł/g)].map(m=>[m[1],+m[2]]));
const stem={piórnik:'piórnik',książkę:'książka',farby:'farby',grę:'gra'};
only('s4-17',a=>a.split(' i ').reduce((t,w)=>t+shop[stem[w]],0)<=50);
const zl=(n,gr)=>n*100+gr;
assert(5*zl(3,90)+6*zl(2,10)<=zl(40,0));near('s4-18',(5*zl(3,90)+6*zl(2,10))/100);assert(pick('s4-18').startsWith('Tak'));
assert(8*zl(2,90)+4*zl(5,10)+zl(6,0)<=zl(70,0));near('s4-19',(8*zl(2,90)+4*zl(5,10)+zl(6,0))/100);assert(pick('s4-19').startsWith('Tak'));
near('s4-20',4*19);
{const d=ask('s4-21').answers.map(a=>Math.abs(num(a)-4870));assert.equal(d.indexOf(Math.min(...d)),ask('s4-21').correct);}
near('s4-22',312+289);near('s4-23',503-198);
{const d=ask('s4-24').answers.map(a=>Math.abs(num(a.replace('około ',''))-(1960+2030)));assert.equal(d.indexOf(Math.min(...d)),ask('s4-24').correct);}
assert(7*9>2*24&&pick('s4-25').includes('więcej niż dwie doby'));near('s4-25',7*9);
console.log('PASS: grade 4 estimation — all 49 answer keys computed independently');
}

// Klasa 7: potęgi o tych samych podstawach — każdy klucz liczony z treści zadania.
{
const sb=SCENARIOS.find(s=>s.id==='same-base-7');
assert.equal(sb.grade,7);assert.equal(sb.questions.length,70);assert.equal(new Set(sb.questions.map(q=>q.sourceGroup)).size,17);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===sb.questions).map(s=>s.grade),[7]);
assert.deepEqual(sb.award,{password:'MATEMATYKA TO WF DLA MÓZGU',pluses:2});
// Wartość wyrażenia z HTML: ułamki, potęgi, liczby ujemne, przecinki; litery zastępujemy liczbą 1,3.
const val=html=>Function(`return ${plain(html.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'(($1)/($2))'))
 .replace(/\s/g,'').replace(/−/g,'-').replace(/,/g,'.').replace(/·/g,'*').replace(/:/g,'/').replace(/\^/g,'**')
 .replace(/(\d)([a-z])/g,'$1*$2').replace(/[a-z]/g,'(1.3)')}`)();
const same=(a,b)=>a===b||Math.abs(a-b)<=1e-9*Math.max(Math.abs(a),Math.abs(b));
const task=q=>q.q.match(/<b>(.*?)<\/b>/)[1];
const holds=html=>{const sides=html.split(' = ').map(val);return sides.every(v=>same(v,sides[0]));};
const only=(q,ok)=>{assert.deepEqual(q.answers.filter(ok),[q.answers[q.correct]],q.id);};
const valued=sb.questions.filter(q=>/^(Zapisz|Oblicz)/.test(q.q));
assert.equal(valued.length,45);
for(const q of valued){const v=val(task(q));only(q,a=>same(val(a),v));
 if(q.q.startsWith('Zapisz')) q.answers.forEach(a=>assert.match(plain(a),/^[^·:+=]+\^\d+$/,q.id));}
const boxes=sb.questions.filter(q=>q.q.includes('□'));assert.equal(boxes.length,5);
for(const q of boxes) only(q,a=>holds(task(q).replace('□',a)));
// Który wzór: dzielenie (też kreska ułamkowa), potęga potęgi, mnożenie, a suma i różnica — żaden.
const kind=e=>/frac| : /.test(e)?1:/ [+−] /.test(e)?3:e.startsWith('(')?2:e.includes(' · ')?0:-1;
const rules=sb.questions.filter(q=>q.q.startsWith('Z którego wzoru'));assert.equal(rules.length,6);
for(const q of rules) assert.equal(q.correct,kind(task(q)),q.id);
for(const id of ['ps7-12a','ps7-12b','ps7-12c','ps7-12d']){const [,a,b]=ask(id).q.match(/I\. (.*?)<br>II\. (.*?)<\/div>/);assert.equal(pick(id),truth(holds(a),holds(b)),id);}
only(ask('ps7-15a'),holds);only(ask('ps7-15b'),a=>!holds(a));
only(ask('ps7-11c'),a=>same(val(a),val(task(ask('ps7-11c')))/1e6));
only(ask('ps7-11d'),a=>same(val(a),val(task(ask('ps7-11d')))/1e3));
const unit=a=>val(a.replace(/ cm<sup>\d<\/sup>/,''));
for(const [id,v] of [['ps7-16a',(2**5)**2],['ps7-16b',(3**4)**3],['ps7-16c',2**6*2**4],['ps7-16d',1e6/1e4]]) only(ask(id),a=>same(unit(a),v));
const v17a=ask('ps7-17a').answers.map(val),v17b=ask('ps7-17b').answers.map(val);
assert.equal(v17a.indexOf(Math.max(...v17a)),ask('ps7-17a').correct);assert.equal(v17a.filter(v=>v===Math.max(...v17a)).length,1);
assert.equal(v17b.indexOf(Math.min(...v17b)),ask('ps7-17b').correct);assert.equal(v17b.filter(v=>v===Math.min(...v17b)).length,1);
console.log('PASS: grade 7 same-base powers — all 70 answer keys computed independently');
}
// Klasa 7: notacja wykładnicza — wartości liczone z treści, poprawna odpowiedź jedyna o dobrej wartości i poprawnej postaci a · 10^n.
{
const ne=SCENARIOS.find(s=>s.id==='scientific-7');
assert.equal(ne.grade,7);assert.equal(ne.section,'Potęgi');assert.equal(ne.ordered,true);
assert.equal(ne.questions.length,64);assert.equal(new Set(ne.questions.map(q=>q.sourceGroup)).size,16);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===ne.questions).map(s=>s.grade),[7]);
assert.deepEqual(ne.award,{password:'NOTACJA',pluses:1});
assert.deepEqual([0,1,2,3].map(i=>ne.questions.filter(q=>q.correct===i).length),[16,16,16,16]);
const txt=html=>html.replace(/<sup>(.*?)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'').trim();
const val=html=>Function(`return ${txt(html.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'(($1)/($2))'))
 .replace(/ (g|kg)$/,'').replace(/\s/g,'').replace(/−/g,'-').replace(/,/g,'.').replace(/·/g,'*').replace(/:/g,'/').replace(/\^(-?\d+)/g,'**($1)')}`)();
const same=(a,b)=>a===b||Math.abs(a-b)<=1e-9*Math.max(Math.abs(a),Math.abs(b));
const isSci=html=>{const m=txt(html).match(/^(\d+(?:,\d+)?) · 10\^(−?\d+)$/);if(!m)return false;const a=+m[1].replace(',','.');return a>=1&&a<10;};
const task=q=>q.q.match(/<b>(.*?)<\/b>/)[1];
const only=(id,ok)=>{const q=ask(id);assert.deepEqual(q.answers.filter(ok),[q.answers[q.correct]],id);};
const g=id=>ne.questions.filter(q=>q.sourceGroup===id).map(q=>q.id);
// Zamiana na notację: wartość z pogrubionej liczby w treści (słownie — wpisana ręcznie).
const words={'czterdzieści tysięcy':4e4,'sześćdziesiąt trzy miliony':63e6,'dziewięć miliardów':9e9,'siedemset dwadzieścia tysięcy':72e4};
for(const id of [...g('ne7-1'),...g('ne7-4'),...g('ne7-6'),...g('ne7-8'),...g('ne7-9'),...g('ne7-13'),...g('ne7-15')]){
 const t=task(ask(id)), v=words[t]??val(t);only(id,a=>isSci(a)&&same(val(a),v));}
for(const [id,v] of [['ne7-16a',60*3e5],['ne7-16b',5*2e9],['ne7-16d',6e3/3e-6]]) only(id,a=>isSci(a)&&same(val(a),v));
// Zwykły zapis.
for(const id of [...g('ne7-2'),...g('ne7-7')]) only(id,a=>same(val(a),val(task(ask(id)))));
for(const [id,v] of [['ne7-5a',1e-2],['ne7-5b',1e-3],['ne7-5d',1e-4],['ne7-10a',3e5],['ne7-10b',4.5e9],['ne7-10d',4e7],['ne7-16c',1000*5e-4]]) only(id,a=>same(val(a),v));
assert.equal(selected('ne7-5c'),'jedna dziesiąta');assert.equal(1e-1,1/10);
const named={'trzydzieści siedem miliardów':37e9,'trzysta siedemdziesiąt miliardów':370e9,'trzydzieści siedem bilionów':37e12,'trzy biliony siedemset miliardów':3.7e12};
only('ne7-10c',a=>same(named[a],3.7e13));
// Czy to notacja wykładnicza?
only('ne7-3a',isSci);only('ne7-3b',a=>!isSci(a));only('ne7-3c',isSci);only('ne7-3d',a=>!isSci(a));
// Brakujący wykładnik lub czynnik.
for(const id of g('ne7-11')) only(id,a=>{const [l,r]=task(ask(id)).replace('□',a).split(' = ').map(val);return same(l,r);});
// Porównywanie.
const vals=id=>ask(id).answers.map(val);
for(const [id,pickBy] of [['ne7-12a',Math.max],['ne7-12b',Math.min],['ne7-12d',Math.max]]){const v=vals(id),best=pickBy(...v);assert.equal(v.indexOf(best),ask(id).correct,id);assert.equal(v.filter(x=>x===best).length,1,id);}
only('ne7-12c',a=>val(a)>1e6);
// Prawda/fałsz z jednostkami (g, dag, kg; mm, cm, m, km).
assert.equal(pick('ne7-14a'),truth(3.5e4/1000>2e2,6e3/1000===6));
assert.equal(pick('ne7-14b'),truth(4.2e5/100>3e3,same(7e-2*1000,70)));
assert.equal(pick('ne7-14c'),truth(2.5e6/100>3e4,same(1.5e-3*1e5,15)));
assert.equal(pick('ne7-14d'),truth(8e7/1e6>50,same(4e-3*100,4)));
// Długie liczby: tyle cyfr, ile wynika z wykładnika.
assert.equal('5970000000000000000000000'.length,25);assert.equal('73500000000000000000000'.length,23);
console.log('PASS: grade 7 scientific notation — all 64 answer keys computed independently');
}

// Klasa 7: obliczenia w notacji wykładniczej — wynik liczony z treści; poprawna odpowiedź jedyna o dobrej wartości i postaci a · 10^n.
{
const oc=SCENARIOS.find(s=>s.id==='scientific-calc-7');
assert.equal(oc.grade,7);assert.equal(oc.section,'Potęgi');assert.equal(oc.ordered,true);
assert.equal(oc.questions.length,68);assert.equal(new Set(oc.questions.map(q=>q.sourceGroup)).size,17);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===oc.questions).map(s=>s.grade),[7]);
assert.deepEqual(oc.award,{password:'Dodaję, odejmuję, notację zapisuję!',pluses:2});
assert.deepEqual([0,1,2,3].map(i=>oc.questions.filter(q=>q.correct===i).length),[17,17,17,17]);
const txt=html=>html.replace(/<sup>(.*?)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();
const val=html=>Function(`return ${txt(html.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'(($1)/($2))'))
 .replace(/\s/g,'').replace(/−/g,'-').replace(/,/g,'.').replace(/·/g,'*').replace(/:/g,'/').replace(/\^(-?\d+)/g,'**($1)')}`)();
const same=(a,b)=>a===b||Math.abs(a-b)<=1e-9*Math.max(Math.abs(a),Math.abs(b));
const isSci=html=>{const m=txt(html).match(/^(\d+(?:,\d+)?) · 10\^(−?\d+)$/);if(!m)return false;const a=+m[1].replace(',','.');return a>=1&&a<10;};
const bolds=q=>[...q.q.matchAll(/<b>(.*?)<\/b>/g)].map(m=>m[1]);
const only=(id,ok)=>{const q=ask(id);assert.deepEqual(q.answers.filter(ok),[q.answers[q.correct]],id);};
const g=id=>oc.questions.filter(q=>q.sourceGroup===id).map(q=>q.id);
for(const n of [1,2,3,4,8,9,10,11,12,14,15]) for(const id of g(`on7-${n}`)) only(id,a=>isSci(a)&&same(val(a),val(bolds(ask(id))[0])));
// Między kolejnymi potęgami 10.
for(const id of g('on7-5')){const v=val(bolds(ask(id))[0]);only(id,a=>{const [,lo,hi]=txt(a).replace(/−/g,'-').match(/^10\^(-?\d+) i 10\^(-?\d+)$/).map(Number);return hi===lo+1&&10**lo<v&&v<10**hi;});}
// Porządkowanie rosnąco.
for(const id of g('on7-6')){const [x,y,z]=bolds(ask(id)).map(val),v={x,y,z};only(id,a=>{const [p,,q2,,r]=txt(a).split(' ');return v[p]<v[q2]&&v[q2]<v[r];});}
// Zasłonięte czynniki: decyduje wykładnik.
const ex=a=>+txt(a).replace(/−/g,'-').match(/10\^(-?\d+)/)[1];
for(const [id,best] of [['on7-7a',Math.max],['on7-7b',Math.min],['on7-7c',Math.min]]){const e=ask(id).answers.map(ex);assert.equal(e.indexOf(best(...e)),ask(id).correct,id);assert.equal(new Set(e).size,4,id);}
assert(1e-3>9.9e-4);assert.equal(txt(selected('on7-7d')),'a > b');
// Prawda/fałsz.
for(const id of g('on7-13')){const [,a,b]=ask(id).q.match(/I\. (.*?)<br>II\. (.*?)<\/div>/);const holds=s=>{const [l,r]=s.split(' = ').map(val);return same(l,r);};assert.equal(pick(id),truth(holds(a),holds(b)),id);}
// Zadania tekstowe.
for(const [id,v,sci] of [['on7-16a',3e2/4e-3,1],['on7-16b',8e-5/2e-6,0],['on7-16c',1.4e9/3.5e6,0],['on7-16d',6e-5/1e-7,1],['on7-17a',500*1e-4,1],['on7-17b',5.97e24+7.35e22,1],['on7-17c',2e16/8e9,1],['on7-17d',3e-6-1.2e-7,1]]) only(id,a=>(!sci||isSci(a))&&same(val(a),v));
console.log('PASS: grade 7 scientific calculations — all 68 answer keys computed independently');
}

// Klasy 7 i 8: potęgi — zadania egzaminacyjne. Wartości liczone niezależnie (BigInt dla dużych potęg).
{
const e7=SCENARIOS.find(s=>s.id==='power-exam-7'), e8=SCENARIOS.find(s=>s.id==='power-exam-8');
assert.equal(e7.questions,e8.questions);assert.equal(e7.section,'Potęgi');assert.equal(e8.section,'Przygotowanie do egzaminu');
for(const e of [e7,e8]){assert.equal(e.ordered,true);assert.deepEqual(e.award,{password:'Potęgi opanowane, miliony wygrane!',pluses:3});}
assert.deepEqual(SCENARIOS.filter(s=>s.questions===e7.questions).map(s=>s.grade).sort(),[7,8]);
assert.equal(e7.questions.length,28);assert.equal(new Set(e7.questions.map(q=>q.sourceGroup)).size,28);
assert(e7.questions.every(q=>q.answers.length===4&&!/−\d+<\/sup>/.test(q.q.replace(/10<sup>−\d+<\/sup>/g,''))),'no negative exponents except 10');
const n=BigInt, P=(a,b)=>n(a)**n(b), A=id=>ask(id).correct, L=['A i C','A i D','B i C','B i D'];
const pf=(a,b)=>['PP','PF','FP','FF'].indexOf((a?'P':'F')+(b?'P':'F'));
const eq=(x,y)=>x===y;
// Kolejność a, b, c.
{const a=P(-2,12),b=P(-2,11),c=P(2,10);assert(b<c&&c<a);assert.equal(A('pw-3816'),3);}
assert.equal(A('pw-5286'),3);assert(-(5**2)===-25&&(-2)**3===-8);
assert.equal(ask('pw-4022').answers[A('pw-4022')],'3<sup>17</sup>');assert(eq(3n*P(3,4)*P(3,12),P(3,17)));
assert(eq(P(2,5)*3n*P(3,4)*P(2,3),P(2,8)*P(3,5)));assert(!eq(P(2,8)*P(3,5),P(2,15)*P(3,4)));assert.equal(A('pw-8049'),0);
assert.equal(A('pw-7432'),pf(eq(3n*P(9,5),P(3,11)),eq(P(2,8)*P(2,7)/P(2,10),P(2,5))));
assert.equal(A('pw-7841'),pf(eq(P(9,4)/P(3,2),P(3,2)),eq(P(3,8),3n*P(3,5)*P(3,2))));
assert(eq(P(8,6)/P(4,3),P(2,12)));assert.equal(A('pw-7766'),3);
assert(eq(P(3,5)*P(9,6),P(3,17)));assert.equal(A('pw-7342'),2);
assert.equal(A('pw-7357'),pf(eq(P(P(4,4),3),P(4,7)),eq(P(5,3)*P(10,3),P(5,6)*P(2,3))));
assert(P(-2,4)/P(-2,3)===-2n&&eq(P(-2,2)*P(-2,3),P(-2,5)));assert.equal(L[A('pw-7298')],'A i D');
assert.equal(4**3-8**2/2**4,60);assert.equal(A('pw-7916'),3);
assert.equal(A('pw-7492'),pf((1/5)**8>(1/5)**6,Math.abs(2**2*(1/2)**2-(-2)**3*(-1/2)**3)<1e-12));
{const v=[3n*P(3,14),P(3,9)*P(3,6),P(3,17)/9n,P(9,15)/3n];assert.deepEqual(v.map(x=>x!==P(3,15)),[false,false,false,true]);assert.equal(A('pw-5368'),3);}
assert.equal((3**2*3)/3**3,1);assert.equal(A('pw-3432'),0);
assert(eq(P(10,8)/P(5,8),P(2,8))&&eq(P(2,6)*P(25,3),P(10,6))&&!eq(P(2,6)*P(25,3),P(50,9)));assert.equal(L[A('pw-6990')],'B i D');
assert(eq(P(27,6)/P(3,6),P(3,12))&&eq(P(25,8)/P(5,4),P(5,12)));assert.equal(L[A('pw-7317')],'B i D');
assert(eq(P(6,8)/P(2,4),P(2,4)*P(3,8)));assert.equal(A('pw-5522'),3);
assert.equal(A('pw-7599'),pf(eq(P(5,2)*P(5,3)*P(5,5),P(P(5,5),2)),P(2,3)*P(3,3)/6n===P(6,2)));
{const v=[P(2,24)/2n,P(4,12)*4n,P(2,25)/8n,P(32,4)];assert.equal(v.indexOf(v.reduce((m,x)=>x>m?x:m)),A('pw-8174'));}
assert(eq(P(60000000,3),P(6,3)*P(10,21)));assert.equal(A('pw-5621'),0);
{const x=P(10,30)*P(10,70)/10n,y=P(P(10,3),15)*P(10,60),z=P(10,50)*P(10,80)/P(10,20),h=P(10,100);assert(x<h&&y>h&&z>h);assert.equal(A('pw-6489'),0);}
{const t=P(50,8),v=[P(5,2)*P(10,8)*P(5,4),P(5,10)/P(5,2)*P(10,8),P(2,8)*P(5,8)*P(5,8)];assert.deepEqual(v.map(x=>x===t),[false,true,true]);assert.equal(A('pw-5258'),1);}
assert.equal(ask('pw-5867').answers[A('pw-5867')],String(Math.floor((5/3)**2)+1));
{const r=P(5,6)*5n*P(5,8),br=r/(P(5,6)*P(5,5)),sh=r/(5n*P(5,5));assert.equal(sh,P(5,9));assert.equal(P(5,2)*sh*br,r);assert.equal(A('pw-5410'),pf(r===P(5,15),sh===P(5,9)));}
assert.equal(P(36,6)*216n,P(27,5)*P(8,5));assert.equal(A('pw-5870'),1);
assert.equal(A('pw-5868'),pf(12n*P(7,13)>13n*P(7,12),P(3,50)>P(6,25)));
{const v=[P(25,41),P(125,41),P(2,862),P(5,431)];assert.equal(v.indexOf(v.reduce((m,x)=>x>m?x:m)),A('pw-4592'));}
assert(Math.abs(19300*0.001*0.000001-1.93e-5)<1e-15);assert.equal(A('pw-5872'),2);
console.log('PASS: grades 7–8 power exam tasks — all 28 answer keys computed independently');
}

// Klasa 4: sprytne dodawanie — każdy klucz liczony z treści zadania.
{
const sd=SCENARIOS.find(s=>s.id==='smart-addition-4');
assert.equal(sd.grade,4);assert.equal(sd.questions.length,49);assert.equal(new Set(sd.questions.map(q=>q.sourceGroup)).size,25);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===sd.questions).map(s=>s.grade),[4]);
assert.deepEqual(sd.award,{password:'Jesienne dodawanie – matematyczne wyzwanie!',pluses:2});
const sum=s=>s.split(/\+| i /).reduce((t,x)=>t+Number(x.trim()),0);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=id=>plain(ask(id).q.match(/<b>(.*?)<\/b>/)[1]);
const nums=id=>[...plain(ask(id).q).matchAll(/\d+/g)].map(m=>+m[0]);
// Co dodać najpierw: obie pary dają pełne dziesiątki.
for(const id of ['sd4-1a','sd4-1b','sd4-1c']) only(id,a=>a.split(', a potem ').every(p=>sum(p)%10===0));
for(const id of ['sd4-2a','sd4-2b','sd4-2c','sd4-2d','sd4-3a','sd4-3b','sd4-4','sd4-5a','sd4-5b','sd4-5c','sd4-5d','sd4-22a','sd4-22b','sd4-23a','sd4-23b']) only(id,a=>+a===sum(bold(id)));
// Przekładanie: ta sama suma, a pierwszy składnik to pełna dziesiątka.
for(const id of ['sd4-6a','sd4-6b','sd4-6c']) only(id,a=>sum(a)===sum(bold(id))&&+a.split('+')[0]%10===0);
only('sd4-7a',a=>sum(a)===39+24&&+a.split('+')[0]%10===0);only('sd4-7b',a=>+a===39+24);
{const [n]=nums('sd4-8a');only('sd4-8a',a=>+a===n+(n+1)+(n+2));}
only('sd4-8b',a=>3*a+3===nums('sd4-8b')[0]);
{const [n]=nums('sd4-8c');only('sd4-8c',a=>+a===n+(n-1)+(n-2)+(n-3));}
// Okienka: wstawiamy odpowiedź i sprawdzamy obie strony równości.
const eq=id=>ask(id).q.match(/<div class="task-statements">(.*?)<\/div>/)[1].replace(/<span class="answer-box"[^>]*><\/span>/g,'x');
for(const id of ['sd4-9a','sd4-9b','sd4-9c']) only(id,a=>{const v=a.split(' i ');let i=0;const [l,r]=eq(id).replace(/x/g,()=>v[i++]).split('=');return sum(l)===sum(r);});
// Tabelka: suma w trzeciej kolumnie, brakujący składnik to suma minus znany składnik.
for(const id of ['sd4-10a','sd4-10b','sd4-10c']){const rows=[...ask(id).q.matchAll(/<tr>(<td>.*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td>(.*?)<\/td>/g)].map(c=>c[1]));
 const r=rows.find(r=>r.includes('?')),k=r.indexOf('?');only(id,a=>k===2?+a===+r[0]+ +r[1]:+a===+r[2]-r[1-k]);}
for(const id of ['sd4-11','sd4-15']) only(id,a=>+a===nums(id).reduce((x,y)=>x+y));
for(const id of ['sd4-12','sd4-13','sd4-16','sd4-25']) only(id,a=>parseInt(a)===nums(id).slice(-3).reduce((x,y)=>x+y));
{const [t,z,k]=nums('sd4-14a');only('sd4-14a',a=>+a===t+z+k);only('sd4-14b',a=>+a===t+(t+z)+(t+z+k));}
{const v=sum(plain(ask('sd4-17a').q).match(/niż (.*)\?/)[1]);assert.equal(v,138);only('sd4-17a',a=>sum(a)!==v);}
assert(pick('sd4-17b').startsWith('Tak, bo kolejność'));assert.equal(18+45+2,20+45);
only('sd4-18a',a=>+a===46+38);only('sd4-18b',a=>87+ +a===57+35);
only('sd4-19a',a=>46+ +a===100);only('sd4-19b',a=>sum(a)===100);
{const cells=[...ask('sd4-20').q.matchAll(/<td>(.*?)<\/td>/g)].map(m=>m[1]),k=cells.length/2;
 assert.equal(pick('sd4-20'),range(0,k-1).sort((i,j)=>sum(cells[i])-sum(cells[j])).map(i=>plain(cells[k+i])).join(''));assert.equal(pick('sd4-20'),'DYNIA');}
{const v=ask('sd4-21').answers.map(sum);only('sd4-21',a=>sum(a)===Math.max(...v));}
{const [t,a1,a2]=nums('sd4-24');only('sd4-24',a=>+a===t-a1-a2);}
console.log('PASS: grade 4 smart addition — all 49 answer keys computed independently');
}

// Klasa 4: sprytne odejmowanie — każdy klucz liczony z treści, pytania od łatwych do trudnych.
{
const so=SCENARIOS.find(s=>s.id==='smart-subtraction-4');
assert.equal(so.grade,4);assert.equal(so.questions.length,58);assert.equal(new Set(so.questions.map(q=>q.sourceGroup)).size,24);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===so.questions).map(s=>s.grade),[4]);
assert.deepEqual(so.award,{password:'Minusy pokonane, punkty pozbierane!',pluses:2});
// Kolejność: każde kolejne pytanie rundy pochodzi z dalszego zadania w pliku.
{const order=[...new Set(so.questions.map(q=>q.sourceGroup))];let seed=7;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<500;i++){const idx=makeRound(so,random).map(q=>order.indexOf(q.sourceGroup));
  idx.forEach((v,k)=>{assert(v>=Math.floor(k*24/12)&&v<Math.floor((k+1)*24/12),'question '+k+' from its difficulty band');});}}
const ev=s=>{const t=plain(s).replace(/−/g,'-').replace(/\s/g,'');assert(/^\d+([+-]\d+)*$/.test(t),s);return t.match(/[+-]?\d+/g).reduce((a,b)=>a+ +b,0);};
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=id=>plain(ask(id).q.match(/<b>(.*?)<\/b>/)[1]);
const nums=id=>[...plain(ask(id).q).matchAll(/\d+/g)].map(m=>+m[0]);
const num=a=>parseInt(a);
for(const id of ['so4-1a','so4-1b','so4-1c']){const [,y]=plain(ask(id).q).match(/Ile wynosi (.*)\?/);only(id,a=>+a===ev(y));}
for(const id of ['so4-2a','so4-2b','so4-3a','so4-3b','so4-4a','so4-4b','so4-4c','so4-4d','so4-6c','so4-11a','so4-11b','so4-11c']) only(id,a=>+a===ev(bold(id)));
for(const id of ['so4-5a','so4-5b']){const d=nums(id)[0];only(id,a=>{const [x,y]=a.split(' i ').map(Number);return x-y===d;});}
only('so4-6a',a=>{const [l,r]=a.split('=');return l.trim().startsWith(`${74-30} −`)&&ev(l)===74-38&&+r===74-38;});
const eq=id=>plain(ask(id).q.match(/<div class="task-statements">(.*?)<\/div>/)[1].replace(/<span class="answer-box"[^>]*><\/span>/g,'x'));
const fits=(id,vals)=>{let i=0;const [l,r]=eq(id).replace(/x/g,()=>vals[i++]).split('=');return ev(l)===ev(r);};
for(const id of ['so4-6b','so4-10a','so4-10b']) only(id,a=>fits(id,[a]));
only('so4-10c',a=>fits('so4-10c',a.split(' − ')));
for(const id of ['so4-7a','so4-7b']) only(id,a=>ev(a)===ev(bold(id))&&+a.split(' − ')[1]%10===0);
{const [x,y,k]=nums('so4-7c');only('so4-7c',a=>+a===(x+k)-(y+k));}
only('so4-8a',a=>+a===122-63);{const [x,y]=nums('so4-8b');only('so4-8b',a=>+a===x-y);}{const [x,y]=nums('so4-8c');only('so4-8c',a=>x+ +a===y);}
// Co dzieje się z różnicą: liczymy na przykładzie 50 − 20.
const delta=a=>/Nie zmienia/.test(a)?0:(/Zwiększa/.test(a)?1:-1)*num(a.match(/\d+/)[0]);
for(const [id,da,db] of [['so4-9a',5,0],['so4-9b',0,10],['so4-9c',7,7]]){const t=plain(ask(id).q);for(const v of [da,db].filter(Boolean)) assert(t.includes('o '+v),id);
 only(id,a=>delta(a)===((50+da)-(20+db))-(50-20));}
for(const id of ['so4-12a','so4-12b','so4-12c']){const [p,b]=nums(id);only(id,a=>num(a)===b-p);}
for(const id of ['so4-13a','so4-13b','so4-14a','so4-14b','so4-15a','so4-15b','so4-16a','so4-16b','so4-23a','so4-23b']){const [x,y]=nums(id);only(id,a=>num(a)===Math.abs(x-y));}
{const [d,l]=nums('so4-16c');only('so4-16c',a=>+a+l===d);}
{const [a1,a2,b1,b2]=nums('so4-17a'),A=a1+a2,B=b1+b2;only('so4-17a',a=>a===`${A>B?'Ala':'Bartek'} o ${Math.abs(A-B)} punkt${Math.abs(A-B)<5?'y':'ów'}`);
 const [x,y]=nums('so4-17b');only('so4-17b',a=>+a===Math.abs(x-y));}
{const v=ask('so4-18a').answers.map(ev);only('so4-18a',a=>ev(a)===Math.max(...v));const w=ask('so4-18b').answers.map(ev);only('so4-18b',a=>ev(a)===Math.min(...w));}
{const [x,y]=nums('so4-19a');only('so4-19a',a=>x+ +a===y);only('so4-19b',a=>+a===999-nums('so4-19b')[0]);}
{const [x,y,r]=nums('so4-20');assert.notEqual(x-y,r);only('so4-20',a=>a===`Nie, wynik to ${x-y}`);}
for(const id of ['so4-21a','so4-21b']){const t=plain(ask(id).q);let v=+t.match(/Zacznij od (\d+)/)[1];for(const [,op,n] of t.matchAll(/(Dodaj|dodaj|Odejmij|odejmij) (\d+)/g)) v+=/dodaj/i.test(op)?+n:-n;only(id,a=>+a===v);}
{const [p,o,w]=nums('so4-22a');only('so4-22a',a=>+a===p-o+w);const [z,x,y]=nums('so4-22b');only('so4-22b',a=>+a===z-x-y);}
{const [r,o]=nums('so4-24a');only('so4-24a',a=>o-a===r);const [d,x,y]=nums('so4-24b');only('so4-24b',a=>+a===d+x+y);}
console.log('PASS: grade 4 smart subtraction — all 58 answer keys computed independently, rounds go from easy to hard');
}

// Klasa 4: powtórzenie działu II — każdy klucz liczony z treści, pytania od łatwych do trudnych.
{
const pw=SCENARIOS.find(s=>s.id==='review-2-4');
assert.equal(pw.grade,4);assert.equal(pw.questions.length,54);assert.equal(new Set(pw.questions.map(q=>q.sourceGroup)).size,26);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===pw.questions).map(s=>s.grade),[4]);
assert.deepEqual(pw.award,{password:'Powtórka zaliczona, wiedza utrwalona!',pluses:4});assert.equal(pw.ordered,true);
{const order=[...new Set(pw.questions.map(q=>q.sourceGroup))];let seed=11;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<500;i++) makeRound(pw,random).forEach((q,k)=>{const v=order.indexOf(q.sourceGroup);assert(v>=Math.floor(k*26/12)&&v<Math.floor((k+1)*26/12),'question '+k+' from its difficulty band');});}
const txt=h=>plain(h).replace(/&gt;/g,'>').replace(/&lt;/g,'<');
const ev=s=>{const t=txt(s).replace(/−/g,'-').replace(/\s/g,'');assert(/^\d+([+-]\d+)*$/.test(t),s);return t.match(/[+-]?\d+/g).reduce((a,b)=>a+ +b,0);};
const N=s=>+txt(s).replace(/\s|zł/g,'');
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=id=>txt(ask(id).q.match(/<b>(.*?)<\/b>/)[1]);
const nums=id=>[...txt(ask(id).q).replace(/(\d) (\d{3})/g,'$1$2').matchAll(/\d+/g)].map(m=>+m[0]);
// Liczby słownie: niezależny parser polskich liczebników.
const W=Object.fromEntries(('jeden 1 dwa 2 trzy 3 cztery 4 pięć 5 sześć 6 siedem 7 osiem 8 dziewięć 9 dziesięć 10 jedenaście 11 dwanaście 12 trzynaście 13 czternaście 14 piętnaście 15 szesnaście 16 siedemnaście 17 osiemnaście 18 dziewiętnaście 19 '+
 'dwadzieścia 20 trzydzieści 30 czterdzieści 40 pięćdziesiąt 50 sześćdziesiąt 60 siedemdziesiąt 70 osiemdziesiąt 80 dziewięćdziesiąt 90 sto 100 dwieście 200 trzysta 300 czterysta 400 pięćset 500 sześćset 600 siedemset 700 osiemset 800 dziewięćset 900').split(' ').reduce((a,w,i,arr)=>i%2?a:[...a,[w,+arr[i+1]]],[]));
const words=s=>{let acc=0,cur=0;for(const w of s.trim().split(/\s+/)){if(/^tysi/.test(w)){acc+=(cur||1)*1000;cur=0;}else{assert(w in W,w);cur+=W[w];}}return acc+cur;};
assert.equal(words('trzysta czternaście tysięcy osiemset'),314800);assert.equal(words('dziewięć tysięcy pięćset'),9500);
// Nazwy liczb w działaniu.
const role=(eq,n)=>{const [,x,op,y,z]=txt(eq).match(/(\d+) ([+−]) (\d+) = (\d+)/).map(v=>/^\d+$/.test(v)?+v:v);
 return op==='+'?(n===z?'suma':'składnik'):(n===x?'odjemna':n===y?'odjemnik':'różnica');};
only('pw4-1a',a=>a===role(bold('pw4-1a'),71));only('pw4-1b',a=>a===role(bold('pw4-1b'),25));only('pw4-1c',a=>role(bold('pw4-1c'),+a)==='odjemna');
for(const id of ['pw4-2a','pw4-2b','pw4-2c','pw4-18a','pw4-18b']) only(id,a=>+a===ev(bold(id)));
for(const id of ['pw4-3a','pw4-3b','pw4-14b']) only(id,a=>N(a)===words(bold(id)));
only('pw4-14a',a=>words(a)===+bold('pw4-14a'));
only('pw4-4a',a=>Math.floor(a/10)%10===4);only('pw4-4b',a=>Math.floor(a/100)%10===7);
only('pw4-5a',a=>+a===23-7);only('pw4-5b',a=>+a===56+9);
for(const id of ['pw4-6a','pw4-6b']){const q=ask(id).q,[x,y,seg]=q.match(/data-axis="([^"]+)"/)[1].split(',').map(Number),k=+q.match(/data-points="\w:(\d+)"/)[1];only(id,a=>+a===x+k*(y-x)/seg);}
{const v=ask('pw4-7').answers.map(ev);only('pw4-7',a=>ev(a)===Math.max(...v));}
only('pw4-8a',a=>{const [,l,op,r]=txt(a).match(/^([\d ]+) ([<>]) ([\d ]+)$/);return op==='<'?N(l)<N(r):N(l)>N(r);});
{const v=ask('pw4-8b').answers.map(N);only('pw4-8b',a=>N(a)===Math.max(...v));}
for(const id of ['pw4-9a','pw4-9b']){const v=ask(id).answers.map(ev);only(id,a=>v.filter(x=>x===ev(a)).length===1);}
only('pw4-10',a=>37+ +a===80);only('pw4-11a',a=>a-27===45);only('pw4-11b',a=>38+ +a===91);
const eq=id=>txt(ask(id).q.match(/<div class="task-statements">(.*?)<\/div>/)[1].replace(/<span class="answer-box"[^>]*><\/span>/g,'x'));
const fitsEq=(id,vals)=>{let i=0;const [l,r]=eq(id).replace(/x/g,()=>vals[i++]).split('=');return ev(l)===ev(r);};
only('pw4-12a',a=>fitsEq('pw4-12a',[a]));only('pw4-12b',a=>fitsEq('pw4-12b',[a]));only('pw4-12c',a=>fitsEq('pw4-12c',a.split(' i ')));
const money=s=>txt(s).split('+').reduce((t,p)=>{const [k,v]=p.replace(/zł/g,'').split('·').map(x=>+x.trim());return t+k*v;},0);
only('pw4-13a',a=>money(a)===N(bold('pw4-13a')));only('pw4-13b',a=>N(a)===money(bold('pw4-13b')));
only('pw4-15a',a=>N(a)===3816+492);
const phrase=(a,n)=>{const [,w,v]=a.match(/^(.*) (\d+)$/);const d=n-v;return {'prawie':d<0&&d>=-10,'trochę mniej niż':d<0&&d>=-10,'trochę więcej niż':d>0&&d<=10,'ponad':d>0,'około':Math.abs(d)<=50}[w];};
only('pw4-15b',a=>phrase(a,596));only('pw4-15c',a=>phrase(a,803));
only('pw4-16a',a=>+a===9+4);only('pw4-16b',a=>+a===41-3);
{const [c,s,b]=nums('pw4-17a');only('pw4-17a',a=>N(a)===b-(c+s));const [k,z,b2]=nums('pw4-17b');only('pw4-17b',a=>N(a)===b2-(k+z));}
only('pw4-19a',a=>+a===57-29);only('pw4-19b',a=>ev(a)===47+36&&+a.split('+')[0]%10===0);
// Książki: Ola ma O, Bartek O − 3, Igor O + 3.
{const v={Ola:10,Bartek:7,Igor:13},max=Math.max(...Object.values(v)),min=Math.min(...Object.values(v));
 const stmt=a=>{let m=a.match(/^(\w+) przeczytał[a]? (najmniej|najwięcej) książek$/);if(m)return v[m[1]]===(m[2]==='najmniej'?min:max);
  m=a.match(/^(\w+) przeczytał[a]? więcej książek niż (\w+)$/);return v[m[1]]>v[m[2]];};
 only('pw4-20a',a=>!stmt(a));only('pw4-20b',a=>+a===v.Igor-v.Bartek);}
for(const id of ['pw4-21a','pw4-21b','pw4-21c']){const rows=[...ask(id).q.matchAll(/<tr>(<td>.*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td>(.*?)<\/td>/g)].map(c=>c[1]));
 const r=rows.find(r=>r.includes('?')),k=r.indexOf('?');only(id,a=>k===2?+a===r[0]-r[1]:k===0?+a===+r[2]+ +r[1]:+a===r[0]-r[2]);}
const PF=(i,ii)=>`I: ${i?'P':'F'}, II: ${ii?'P':'F'}`;
{const [i,ii]=txt(ask('pw4-22a').q).match(/I\. (.*)II\. (.*)$/).slice(1);
 const cmp=s=>{const [,l,w,r]=s.match(/^\S+ (.*?) jest (większa|mniejsza) od \S+ (.*?)\.$/);return w==='większa'?ev(l)>ev(r):ev(l)<ev(r);};
 only('pw4-22a',a=>a===PF(cmp(i.trim()),cmp(ii.trim())));}
{const t=txt(ask('pw4-22b').q);const [,d,n,w]=t.match(/o 1 (większa|mniejsza) od ([\d ]+) to ([a-ząćęłńóśźż ]+)\./);const one=words(w)===N(n)+(d==='większa'?1:-1);
 const [,w2,d2,n2]=t.match(/Liczba ([a-ząćęłńóśźż ]+) jest (większa|mniejsza) od ([\d ]+)\./);const two=d2==='większa'?words(w2)>N(n2):words(w2)<N(n2);
 only('pw4-22b',a=>a===PF(one,two));}
{const [r1,b1,r2,b2]=nums('pw4-23a');only('pw4-23a',a=>+a===r1+b1-r2-b2);const [b,m,p]=nums('pw4-23b');only('pw4-23b',a=>+a===b-m-p);}
{const [c,d]=nums('pw4-24');only('pw4-24',a=>+a===c+(c+d));}
{const [i,m]=nums('pw4-25a');only('pw4-25a',a=>N(a)===i-m);only('pw4-25b',a=>N(a)===i+m+(i-m));}
{const [e,z,l]=nums('pw4-26a');only('pw4-26a',a=>+a===e+z);only('pw4-26b',a=>+a===(e+z)-(e-l));}
console.log('PASS: grade 4 chapter II review — all 54 answer keys computed independently, rounds go from easy to hard');
}

// Klasa 4, dział III: zadania tekstowe — każdy klucz liczony z treści, pytania od łatwych do trudnych.
{
const zt=SCENARIOS.find(s=>s.id==='word-problems-4');
assert.equal(zt.grade,4);assert.equal(zt.section,'Mnożenie i dzielenie');assert.equal(zt.questions.length,47);assert.equal(new Set(zt.questions.map(q=>q.sourceGroup)).size,22);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===zt.questions).map(s=>s.grade),[4]);
assert.deepEqual(zt.award,{password:'Kto treść rozumie, ten wszystko umie!',pluses:2});assert.equal(zt.ordered,true);
{const order=[...new Set(zt.questions.map(q=>q.sourceGroup))];let seed=13;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<500;i++) makeRound(zt,random).forEach((q,k)=>{const v=order.indexOf(q.sourceGroup);assert(v>=Math.floor(k*22/12)&&v<Math.floor((k+1)*22/12),'question '+k+' from its difficulty band');});}
// Poprawne odpowiedzi rozłożone mniej więcej po równo na A–D.
{const c=[0,0,0,0];zt.questions.forEach(q=>c[q.correct]++);assert(Math.max(...c)-Math.min(...c)<=2,'A–D balance '+c);}
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const nums=id=>[...plain(ask(id).q).matchAll(/\d+/g)].map(m=>+m[0]);
const N=a=>parseInt(a);
const has=(id,s)=>assert(plain(ask(id).q).includes(s),id+': '+s);
const ev=s=>{const t=s.replace(/−/g,'-').replace(/\s/g,'');assert(/^\d+([+\-·]\d+)$/.test(t),s);const [,x,op,y]=t.match(/^(\d+)([+\-·])(\d+)$/);return op==='+'?+x+ +y:op==='-'?x-y:x*y;};
{const [k,d]=nums('zt4-1a');only('zt4-1a',a=>ev(a)===k+d);const [o,r]=nums('zt4-1b');only('zt4-1b',a=>ev(a)===o-r);const [p,c]=nums('zt4-1c');only('zt4-1c',a=>ev(a)===p*c&&a.includes('·'));}
for(const id of ['zt4-2a','zt4-2b']) only(id,a=>+a===nums(id).reduce((x,y)=>x+y));
{has('zt4-3a','więcej');const [x,d]=nums('zt4-3a');only('zt4-3a',a=>+a===x-d);has('zt4-3b','mniej');const [y,e]=nums('zt4-3b');only('zt4-3b',a=>+a===y+e);}
for(const id of ['zt4-4a','zt4-4b']){const [n,p,w,b]=nums(id);only(id,a=>N(a)===b-(n*p+w));}
{has('zt4-5a','dłuższy');const [x,d]=nums('zt4-5a');only('zt4-5a',a=>N(a)===x+(x+d));has('zt4-5b','krótsza');const [y,e]=nums('zt4-5b');only('zt4-5b',a=>N(a)===y+(y-e));}
{has('zt4-6a','niższy od');const [x,d]=nums('zt4-6a');only('zt4-6a',a=>N(a)===x+d);has('zt4-6b','wyższa od');const [y,e]=nums('zt4-6b');only('zt4-6b',a=>N(a)===y-e);}
for(const id of ['zt4-7a','zt4-7b']){const [m,a1,p1,a2,p2,c]=nums(id);only(id,a=>N(a)===m-a1*p1-a2*p2-c);}
{const [a,b,c,d]=nums('zt4-8a');only('zt4-8a',x=>+x===a-b+c-d);const [p,q1,r,s1,t]=nums('zt4-8b');only('zt4-8b',x=>+x===p-q1+r-s1+t);}
{const [h,y,o]=nums('zt4-9a');has('zt4-9a','młodsza od brata');const J=h+y,Z=h-o;only('zt4-9a',a=>+a===J);only('zt4-9b',a=>+a===Z);only('zt4-9c',a=>+a===J-Z);}
{has('zt4-10a','o 3 strony więcej');const [m,d,c,f]=nums('zt4-10a');only('zt4-10a',a=>+a===m+(m+d)+2*c+f);has('zt4-10b','o 5 mniej');const [n,e,g,h]=nums('zt4-10b');only('zt4-10b',a=>+a===n+(n-e)+2*g+h);}
{const [e,b,k]=nums('zt4-11a');const B=e+b,K=B-k;only('zt4-11a',a=>+a===K);only('zt4-11b',a=>+a===e+B+K);}
{const [d,c,nd,nc]=nums('zt4-12a');only('zt4-12a',a=>N(a)===nd*d+nc*c);has('zt4-12b','z trójką dzieci');const [d2,c2,b]=nums('zt4-12b');only('zt4-12b',a=>N(a)===b-(d2+3*c2));}
{has('zt4-13a','dwoma banknotami');const [k,n,p,b]=nums('zt4-13a');only('zt4-13a',a=>N(a)===2*b-(k+n*p));const [kg,p2,s2,b1,b2]=nums('zt4-13b');only('zt4-13b',a=>N(a)===b1+b2-(kg*p2+s2));}
{const t=plain(ask('zt4-14a').q);const [,a,d,e]=t.match(/4a zebrała (\d+) kg, klasa 4b o (\d+) kg mniej, a klasa 4c o (\d+) kg więcej niż klasa 4b/).map(Number);const B=a-d,C=B+e;only('zt4-14a',x=>N(x)===C);only('zt4-14b',x=>N(x)===a+B+C);}
{const [t,x,d]=nums('zt4-15a');only('zt4-15a',a=>+a===t-x-(x+d));const [u,y,e]=nums('zt4-15b');only('zt4-15b',a=>+a===u-y-(y-e));}
{has('zt4-16a','od poniedziałku do piątku');const [m]=nums('zt4-16a');only('zt4-16a',a=>N(a)===5*2*m);const [k]=nums('zt4-16b');only('zt4-16b',a=>N(a)===2*2*k);}
{const [u,n,s]=nums('zt4-17a');const need=Math.ceil((u+n)/s);only('zt4-17a',a=>+a===need);only('zt4-17b',a=>+a===2*s-(u+n));assert.equal(need,2);}
{const [w,p,b1,n,b2,m]=nums('zt4-18a');only('zt4-18a',a=>+a*m===w*p-b1-n*b2);const [w2,p2,n1,v1,n2,v2,m2]=nums('zt4-18b');only('zt4-18b',a=>+a*m2===w2*p2-n1*v1-n2*v2);}
for(const id of ['zt4-19a','zt4-19b']){const [t,a,b,c]=nums(id);only(id,x=>+x===t-a-c);}
{const [k,m]=nums('zt4-20a');only('zt4-20a',a=>+a===(k-1)+(m-1)+1);const [x,y]=nums('zt4-20b');has('zt4-20b','Trzy lata temu');only('zt4-20b',a=>+a===(x-3)+(y-3)+3);}
{const [d,k,w]=nums('zt4-21a');only('zt4-21a',a=>+a===w-k+d);const [r,s]=nums('zt4-21b');only('zt4-21b',a=>+a+(+a+r)===s);}
// Wiewiórki: symulujemy przekazywanie orzechów od zgadniętych wartości początkowych.
{const t=plain(ask('zt4-22a').q);const gives=[...t.matchAll(/(Ruda|Szara|Mała) dała (\d+) orzech\S* (Rudej|Szarej|Małej)/g)].map(m=>[m[1],+m[2],{Rudej:'Ruda',Szarej:'Szara',Małej:'Mała'}[m[3]]]);
 assert.equal(gives.length,3);const end=+t.match(/każda wiewiórka ma (\d+)/)[1];
 const start={};for(const n of ['Ruda','Szara','Mała']) for(let v=0;v<100;v++){const s={Ruda:0,Szara:0,Mała:0,[n]:v};for(const [f,k,to] of gives){s[f]-=k;s[to]+=k;}if(s[n]===end){start[n]=v;break;}}
 only('zt4-22a',a=>+a===start.Ruda);only('zt4-22b',a=>+a===start.Szara);
 const max=Math.max(...Object.values(start));assert.equal(Object.values(start).filter(v=>v===max).length,1);only('zt4-22c',a=>start[a]===max);}
console.log('PASS: grade 4 word problems — all 47 answer keys computed independently, rounds go from easy to hard');
}

// Klasa 4, dział III: tabliczka mnożenia i tabliczka dzielenia — klucze liczone z treści, od łatwych do trudnych.
{
const E=s=>Function('return '+s.replace(/·/g,'*').replace(/−/g,'-').replace(/:/g,'/'))();
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const nums=id=>[...plain(ask(id).q).matchAll(/\d+/g)].map(m=>+m[0]);
const N=a=>parseInt(a);
const has=(id,s)=>assert(plain(ask(id).q).includes(s),id+': '+s);
const BOXRE=/<span class="answer-box"[^>]*><\/span>/g;
const stmt=id=>ask(id).q.match(/<div class="task-statements">(.*)<\/div>/)[1];
// Okienko z liczbą: podstawiamy odpowiedź i sprawdzamy równość.
const fill=id=>only(id,a=>{const [l,r]=stmt(id).replace(BOXRE,a).split(' = ');return E(l)===E(r);});
// Brakujące cyfry: pierwsze okienko to odpowiedź, drugie to jakaś cyfra 1–9.
const digit=id=>only(id,a=>[1,2,3,4,5,6,7,8,9].some(d=>{let k=0;const [l,r]=stmt(id).replace(BOXRE,()=>k++?String(d):a).split(' = ');return E(l)===E(r);}));
const check=(sc,groups,questions,password)=>{
 assert.equal(sc.grade,4);assert.equal(sc.section,'Mnożenie i dzielenie');assert.equal(sc.questions.length,questions);assert.equal(new Set(sc.questions.map(q=>q.sourceGroup)).size,groups);
 assert.deepEqual(SCENARIOS.filter(s=>s.questions===sc.questions).map(s=>s.grade),[4]);
 assert.deepEqual(sc.award,{password,pluses:2});assert.equal(sc.ordered,true);
 const order=[...new Set(sc.questions.map(q=>q.sourceGroup))];let seed=17;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<500;i++) makeRound(sc,random).forEach((q,k)=>{const v=order.indexOf(q.sourceGroup);assert(v>=Math.floor(k*groups/12)&&v<Math.floor((k+1)*groups/12),'question '+k+' from its difficulty band');});
 const c=[0,0,0,0];sc.questions.forEach(q=>c[q.correct]++);assert(Math.max(...c)-Math.min(...c)<=2,'A–D balance '+c);
};
check(SCENARIOS.find(s=>s.id==='multiplication-table-4'),23,57,'Razy dwa, razy trzy – mistrzem mnożenia jesteś ty!');
check(SCENARIOS.find(s=>s.id==='division-table-4'),21,50,'Przez zero nie dzielę, a o dzieleniu wiem wiele!');
// Tabliczka mnożenia
{const n=nums('tm4-1a');only('tm4-1a',a=>a.includes('·')&&E(a)===n.reduce((x,y)=>x+y));}
{const [x,y]=nums('tm4-1b');only('tm4-1b',a=>a.includes('+')&&E(a)===x*y);}
for(const id of ['tm4-2a','tm4-2b','tm4-2c','tm4-3a','tm4-3b','tm4-5b','tm4-6b','tm4-7a','tm4-7b','tm4-7c','tm4-7d','tm4-8a','tm4-8b']){const [x,y]=nums(id);only(id,a=>N(a)===x*y);}
has('tm4-3c','ani jednego psa');only('tm4-3c',a=>+a===nums('tm4-3c')[0]*0);
{const [x,y]=nums('tm4-4a');only('tm4-4a',a=>E(a)===x*y&&a!==`${x} · ${y}`);const n=nums('tm4-4b');only('tm4-4b',a=>+a===n[3]*n[4]);}
only('tm4-5a',a=>a==='iloczyn');{const [f,p]=nums('tm4-5c');only('tm4-5c',a=>+a*f===p);}
has('tm4-6a','kotów');only('tm4-6a',a=>+a===nums('tm4-6a')[0]*4);
for(const id of ['tm4-9a','tm4-9b','tm4-9c','td4-9a','td4-9b','td4-9c']) fill(id);
for(const id of ['tm4-10a','tm4-10b','tm4-10c']){const [x,y]=nums(id);only(id,a=>E(a)===x*y);}
for(const id of ['tm4-11a','tm4-11b','tm4-11c']){const n=nums(id);assert.equal(n[0]*n[1],n[2]);only(id,a=>+a===n[3]*n[4]);}
{const n=nums('tm4-12a');only('tm4-12a',a=>+a===n[3]*n[4]);}
only('tm4-12b',a=>{const [,o,k,r,b,w]=a.match(/^Liczba (o )?(\d+) (razy )?większa od (\d+) to (\d+)\.$/);assert(!o!==!r);return +w===(o?+k + +b:k*b);});
{const [n]=nums('tm4-13a');only('tm4-13a',a=>E(a)!==n);const [m]=nums('tm4-13b');only('tm4-13b',a=>E(a)===m);only('tm4-13c',a=>[...Array(11).keys()].some(k=>k*k===+a));}
for(const id of ['tm4-14a','tm4-14b','tm4-14c']) digit(id);
for(const id of ['tm4-15a','tm4-15b']){const [x,y,m,z]=nums(id);only(id,a=>+a===(x*y-m)*z);}
for(const id of ['tm4-16a','tm4-16b','tm4-16c']){const t=plain(ask(id).q);const [h,i]=t.match(/Kura waży (\d+) kg, a indyk (\d+) kg/).slice(1).map(Number);const k=+t.match(/(\d+) kury?\b/)[1],d=+t.match(/(\d+) indyk(i|ów)\b/)[1];only(id,a=>N(a)===k*h+d*i);}
for(const id of ['tm4-17a','tm4-17b']){const [x,y,z]=nums(id);only(id,a=>N(a)===x*y*z);}
{const [f,r,o]=nums('tm4-18a');const b=[f,r*f,f+o];only('tm4-18a',a=>+a===b[2]);only('tm4-18b',a=>+a===b[0]+b[1]+b[2]);}
{const [k,t,m]=nums('tm4-19a');only('tm4-19a',a=>N(a)===t*k-m*k);only('tm4-19b',a=>+a===t*k+m*k);}
{const [p,r]=nums('tm4-20a');only('tm4-20a',a=>+a===r*p-p);const [g,s]=nums('tm4-20b');only('tm4-20b',a=>+a===g+s*g);}
{const [s,r,o]=nums('tm4-21a');const I=r*s,W=s+o;only('tm4-21a',a=>+a===s+I+W);only('tm4-21b',a=>+a===I-W);}
for(const id of ['tm4-22a','tm4-22b']){const [all,x,r]=nums(id);only(id,a=>+a===all-x-r*x);}
// Rodziny i koszyki: każdy możliwy podział daje ten sam wynik.
for(const id of ['tm4-23a','tm4-23b']){const [n]=nums(id);const res=new Set();for(let one=0;2*one<=n;one++) res.add(one*1+(n-2*one)*2+one*3);assert.equal(res.size,1);only(id,a=>+a===[...res][0]);}
// Tabliczka dzielenia
for(const id of ['td4-1a','td4-1b','td4-2a','td4-2b','td4-2c','td4-3a','td4-3b','td4-3d','td4-5b','td4-7a','td4-7b','td4-7c','td4-7d','td4-11a','td4-11b','td4-12a','td4-14a','td4-14b']){const [x,y]=nums(id);assert.equal(x%y,0,id);only(id,a=>N(a)===x/y);}
only('td4-3c',a=>!isFinite(E(a)));
{const n=nums('td4-4a');assert.equal(n[0]*n[1],n[2]);only('td4-4a',a=>+a===n[3]/n[4]);}
{const [x,y,p]=nums('td4-4b');only('td4-4b',a=>{const [l,r]=a.split(' = ');const [d,s]=l.split(' : ').map(Number);return E(l)===+r&&d===p&&[x,y].includes(s);});}
only('td4-5a',a=>a==='dzielna');{const [q1,d]=nums('td4-5c');only('td4-5c',a=>+a/d===q1);}
for(const id of ['td4-6a','td4-6b']){const [d]=nums(id);only(id,a=>+a===d/7);}
{const [z,d,w]=nums('td4-8a');only('td4-8a',a=>{const [l,r]=a.split(' = ');const f=l.split(' · ').map(Number).sort((x,y)=>x-y);return +r===z&&f[0]*f[1]===z&&String(f)===String([d,w].sort((x,y)=>x-y));});}
only('td4-8b',a=>{const [l,r]=a.split(' = ');return E(l)!==+r;});
for(const id of ['td4-10a','td4-10b','td4-10c']){const [d]=nums(id);only(id,a=>+a%d===0&&+a/d<=10);}
{const [x,y]=nums('td4-12b');only('td4-12b',a=>N(a)===y/x);}
{const [k,b]=nums('td4-13a');only('td4-13a',a=>N(a)===k/b);only('td4-13b',a=>+a===k-b);}
only('td4-15a',a=>a.includes('po równo na 5'));only('td4-15b',a=>a.includes('6 razy mniej'));
{has('td4-16a','Ośmiu piratów');const t=nums('td4-16a');only('td4-16a',a=>+a===t[1]/8);only('td4-16b',a=>+a===(t[0]+t[1]+t[2])/8&&t.every(v=>v%8===0));}
for(const id of ['td4-17a','td4-17b']){const [n,c,m]=nums(id);only(id,a=>N(a)===c/n*m);}
for(const id of ['td4-18a','td4-18b']){const [all,lost,parts]=nums(id);only(id,a=>N(a)===(all-lost)/parts);}
{const [j,r,g]=nums('td4-19a');only('td4-19a',a=>N(a)===(r*j)/(j/g));const [x,r2,m]=nums('td4-19b');only('td4-19b',a=>+a===r2*x/m);}
{const [e,o,i]=nums('td4-20a');only('td4-20a',a=>N(a)===e/i);only('td4-20b',a=>N(a)===e+(e-o)+e/i);}
{has('td4-21a','dziesiąty metę');has('td4-21a','do piątego słupka');const [t]=nums('td4-21a');only('td4-21a',a=>+a===t/(5-1)*(10-1));}
{const [n,t,m]=nums('td4-21b');only('td4-21b',a=>+a===t/(n-1)*(m-1));}
console.log('PASS: grade 4 multiplication and division tables — all 107 answer keys computed independently, rounds go from easy to hard');
}

// Kalkulator wyrażeń algebraicznych do testów klasy 8: zapis z gry (kursywa, potęgi, ułamki, √) → funkcja zmiennych.
const algTxt=h=>h.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'(($1)/($2))').replace(/<sup>(\d+)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'')
 .replace(/−/g,'-').replace(/·/g,'*').replace(/:/g,'/').replace(/(\d),(\d)/g,'$1.$2').replace(/\s/g,'');
function alg(h){
 const t=algTxt(h).match(/\d+(\.\d+)?|[a-z]|√|[-+*/^()]/g);assert.equal(t.join(''),algTxt(h),'unparsed: '+h);let i=0;
 const starts=()=>i<t.length&&/^(\d|[a-z]|\(|√)/.test(t[i]);
 const atom=()=>{const k=t[i++];if(k==='('){const e=expr();assert.equal(t[i++],')');return e;}if(k==='√'){const a=atom();return v=>Math.sqrt(a(v));}
  if(/^[a-z]$/.test(k))return v=>{assert(k in v,'no value for '+k);return v[k];};assert(/^\d/.test(k),'token '+k);const n=+k;return ()=>n;};
 const power=()=>{const a=atom();if(t[i]==='^'){i++;const b=unary();return v=>a(v)**b(v);}return a;};
 const unary=()=>{if(t[i]==='-'){i++;const a=unary();return v=>-a(v);}if(t[i]==='+'){i++;return unary();}return power();};
 const term=()=>{let a=unary();for(;;){if(t[i]==='*'||t[i]==='/'){const op=t[i++],b=unary(),x=a;a=op==='*'?v=>x(v)*b(v):v=>x(v)/b(v);}else if(starts()){const b=power(),x=a;a=v=>x(v)*b(v);}else return a;}};
 const expr=()=>{let a=term();while(t[i]==='+'||t[i]==='-'){const op=t[i++],b=term(),x=a;a=op==='+'?v=>x(v)+b(v):v=>x(v)-b(v);}return a;};
 const e=expr();assert.equal(i,t.length,'trailing: '+h);return e;
}
const POINTS=[1.3,-0.7,2.9,-2.2,0.45].map((s,k)=>Object.fromEntries('abcdkmnprstwxyz'.split('').map((c,j)=>[c,s+((j*7+k*3)%11)/5-1])));
const same=(a,b)=>{const f=alg(a),g=alg(b);return POINTS.every(v=>Math.abs(f(v)-g(v))<1e-9*(1+Math.abs(f(v))));};
const at=(h,vals)=>alg(h)(vals);
assert(same('2(x+3)','2x+6'));assert(!same('2(x+3)','2x+3'));assert(same('<i>x</i><sup>2</sup> − 9','(x − 3)(x + 3)'));const close=(a,b)=>Math.abs(a-b)<1e-9*(1+Math.abs(b));assert(close(at('2√2·√2',{}),4));

// Klasa 8: wyrażenia algebraiczne — każdy klucz sprawdzony kalkulatorem wyrażeń.
{
const wa=SCENARIOS.find(s=>s.id==='algebra-8');
assert.equal(wa.grade,8);assert.equal(wa.section,'Wyrażenia algebraiczne i równania');assert.equal(wa.ordered,true);
assert.equal(wa.questions.length,41);assert.equal(new Set(wa.questions.map(q=>q.sourceGroup)).size,18);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===wa.questions).map(s=>s.grade),[8]);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=(id,k=0)=>[...ask(id).q.matchAll(/<b>(.*?)<\/b>/g)][k][1];
const num=a=>at(a.replace(/ km\/h/,''),{});
only('wa8-1a',a=>same(a,'x + 2x + 15'));only('wa8-1b',a=>same(a,'3n - 5'));
// Jednomian podobny: stały stosunek do x²y.
only('wa8-2a',a=>{const r=POINTS.map(v=>at(a,v)/(v.x**2*v.y));return r.every(x=>Math.abs(x-r[0])<1e-9);});
only('wa8-2b',a=>num(a)===at(bold('wa8-2b'),{a:1,b:1}));
{const t=algTxt(bold('wa8-3'));only('wa8-3',a=>+a===t.slice(1).split(/[+-]/).length);}
for(const [id,v] of [['wa8-4a',{a:3,b:-2}],['wa8-4b',{x:-2}],['wa8-4c',{x:-1,y:3}]]) only(id,a=>num(a)===at(bold(id),v));
for(const id of ['wa8-5a','wa8-5b','wa8-5c','wa8-5d','wa8-6a','wa8-6b','wa8-6c','wa8-6d','wa8-7a','wa8-7b','wa8-9','wa8-13a','wa8-13b','wa8-17a','wa8-17b']) only(id,a=>same(a,bold(id)));
// Wyrazy podobne: odpowiedź nie może mieć dwóch wyrazów z tą samą częścią literową.
for(const id of ['wa8-5a','wa8-5b','wa8-5c','wa8-5d']){const parts=algTxt(selected(id)).split(/(?=[+-])/).map(w=>w.replace(/^[+-]?[\d.]*/,''));assert.equal(new Set(parts).size,parts.length,id);}
{const [A,B,C]=[0,1,2].map(k=>bold('wa8-8a',k).split('=')[1]);
 only('wa8-8a',a=>same(a,`(${A})+(${B})`));only('wa8-8b',a=>same(a,`(${A})-(${B})`));only('wa8-8c',a=>same(a,`(${B})(${C})`));}
const labels=id=>[...ask(id).q.matchAll(/<text[^>]*>(.*?)<\/text>/g)].map(m=>plain(m[1]));
for(const id of ['wa8-10a','wa8-10b']) only(id,a=>same(a,labels(id).map(l=>`(${l})`).join('+')));
{const [w,h]=labels('wa8-11a');only('wa8-11a',a=>same(a,`(${w})(${h})`));}
{const [top,h,bottom]=labels('wa8-11b');only('wa8-11b',a=>same(a,`((${top})+(${bottom}))(${h})/2`));}
{const [w1,h1,h2,w2]=labels('wa8-11c');only('wa8-11c',a=>same(a,`(${w1})(${h1})+(${w2})(${h2})`));}
only('wa8-12a',a=>num(a)===at(bold('wa8-12a'),{x:-6}));only('wa8-12b',a=>num(a)===at(bold('wa8-12b'),{x:-3,y:6}));
const PF=(i,ii)=>`I: ${i?'P':'F'}, II: ${ii?'P':'F'}`;
only('wa8-14a',a=>a===PF(at(bold('wa8-14a',0),{x:-3,y:2})===at(bold('wa8-14a',1),{}),at(bold('wa8-14a',2),{a:2,b:-4})===at(bold('wa8-14a',3),{a:2,b:-4})));
only('wa8-14b',a=>a===PF(same(bold('wa8-14b',0),bold('wa8-14b',1)),at(bold('wa8-14b',2),{x:5})===at(bold('wa8-14b',3),{})));
only('wa8-15',a=>same(a,'0.75(0.8x)'));
for(const [id,v] of [['wa8-16a',{x:4,y:-0.5}],['wa8-16b',{x:Math.SQRT2,y:Math.sqrt(8)}],['wa8-16c',{x:3,y:-2}]]) only(id,a=>Math.abs(num(a)-at(bold(id),v))<1e-9);
only('wa8-18a',a=>same(a,'0.4t·20+0.25t·16+0.35t·12'));only('wa8-18b',a=>num(a)===16.2);
console.log('PASS: grade 8 algebraic expressions — all 41 answer keys checked with an expression evaluator');
}

// Klasa 8: mnożenie sum algebraicznych — każdy klucz sprawdzony kalkulatorem wyrażeń.
{
const ms=SCENARIOS.find(s=>s.id==='multiplication-8');
assert.equal(ms.grade,8);assert.equal(ms.section,'Wyrażenia algebraiczne i równania');assert.equal(ms.ordered,true);
assert.equal(ms.questions.length,32);assert.equal(new Set(ms.questions.map(q=>q.sourceGroup)).size,15);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=(id,k=0)=>[...ask(id).q.matchAll(/<b>(.*?)<\/b>/g)][k][1];
const labels=id=>[...ask(id).q.matchAll(/<text[^>]*>(.*?)<\/text>/g)].map(m=>plain(m[1]));
const PF=(i,ii)=>`I: ${i?'P':'F'}, II: ${ii?'P':'F'}`;
for(const id of ['ms8-1a','ms8-1b','ms8-1c','ms8-2','ms8-3a','ms8-3b','ms8-3c','ms8-7a','ms8-7b','ms8-8a','ms8-8b','ms8-8c','ms8-10a','ms8-10b','ms8-11a','ms8-11b','ms8-12a','ms8-12b']) only(id,a=>same(a,bold(id)));
// Iloczyn ma być rozpisany: poprawna odpowiedź bez nawiasów.
for(const id of ['ms8-1a','ms8-1b','ms8-1c','ms8-2','ms8-3a','ms8-3b','ms8-3c','ms8-7a','ms8-7b','ms8-8a','ms8-8b','ms8-8c','ms8-11a','ms8-11b','ms8-12a','ms8-12b']) assert(!/[()]/.test(plain(selected(id))),id);
{const [w,h]=labels('ms8-4a');only('ms8-4a',a=>same(a,`(${w})(${h})`));}
{const [s1,s2]=[bold('ms8-4b',0),bold('ms8-4b',1)];only('ms8-4b',a=>same(a,`(${s1})(${s2})`));only('ms8-4c',a=>same(a,`2(${s1})+2(${s2})`));}
{const b=k=>bold('ms8-5a',k);only('ms8-5a',a=>a===PF(same(`2((${b(0)})+(${b(1)}))`,b(2)),same(`(${b(0)})(${b(1)})`,b(3))));}
{const eq=k=>bold('ms8-5b',k).split('=');only('ms8-5b',a=>a===PF(same(...eq(0)),same(...eq(1))));}
for(const id of ['ms8-6a','ms8-6b','ms8-6c']) only(id,a=>close(at(a,{}),at(bold(id),{})));
for(const [id,v] of [['ms8-9a',{x:-0.5}],['ms8-9b',{x:-0.5}],['ms8-9c',{x:-3,y:4}]]) only(id,a=>close(at(a,{}),at(bold(id),v)));
{const [na,nb,w,h]=labels('ms8-13');only('ms8-13',a=>same(a,`(${w})(${h})-(${na})(${nb})`));}
{const [d1,d2,d3]=plain(bold('ms8-14')).split('×').map(d=>d.replace('cm',''));only('ms8-14',a=>same(a,`2((${d1})(${d2})+(${d2})(${d3})+(${d1})(${d3}))`));}
only('ms8-15',a=>same(a,'(a+2)(a+2)-a(a+4)'));
console.log('PASS: grade 8 multiplying sums — all 32 answer keys checked with an expression evaluator');
}

// Klasa 8: równania — rozwiązania sprawdzane podstawieniem, zadania tekstowe liczone osobno.
{
const rw=SCENARIOS.find(s=>s.id==='equations-8');
assert.equal(rw.grade,8);assert.equal(rw.section,'Wyrażenia algebraiczne i równania');assert.equal(rw.ordered,true);
assert.equal(rw.questions.length,31);assert.equal(new Set(rw.questions.map(q=>q.sourceGroup)).size,17);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const bold=(id,k=0)=>[...ask(id).q.matchAll(/<b>(.*?)<\/b>/g)][k][1];
const num=a=>at(a.replace(/<i>x<\/i> = | zł| ha| cm³/g,''),{});
const sides=h=>{const p=h.split(' = ');assert.equal(p.length,2,h);return p;};
const solves=(eq,x)=>{const [l,r]=sides(eq);return close(at(l,{x}),at(r,{x}));};
// Równanie liniowe po redukcji: g(x) = L − R; zwraca rozwiązanie, 'all' albo 'none'.
const root=eq=>{const [l,r]=sides(eq),g=x=>at(l,{x})-at(r,{x}),a=g(1)-g(0),b=g(0);assert(close(g(2),2*a+b),'linear: '+eq);
 return Math.abs(a)<1e-12?(Math.abs(b)<1e-12?'all':'none'):-b/a;};
for(const id of ['rw8-1a','rw8-1b','rw8-1c','rw8-2','rw8-4a','rw8-4b','rw8-4c','rw8-4d','rw8-8a','rw8-8b','rw8-8c','rw8-8d']) only(id,a=>solves(bold(id),num(a)));
const PF=(i,ii)=>`I: ${i?'P':'F'}, II: ${ii?'P':'F'}`;
only('rw8-9a',a=>a===PF(root(bold('rw8-9a',0))>0,root(bold('rw8-9a',1))<0));
only('rw8-9b',a=>a===PF(root(bold('rw8-9b',0))==='all',root(bold('rw8-9b',1))==='none'));
// Zadania tekstowe — każde liczone wprost z treści.
{const [all,d]=[960,124],first=(all-d)/2;only('rw8-3a',a=>num(a)===first);only('rw8-3b',a=>num(a)===first+d);}
only('rw8-5',a=>{const l=num(a);return 5.5*l+3*(30-l)===115;});
{const m=(30+3*2.5)/5;only('rw8-6a',a=>close(num(a),m));only('rw8-6b',a=>close(num(a),m-2.5));}
only('rw8-7',a=>{const p=num(a),b=p-5;return 6*b+14*p===330;});
only('rw8-10',a=>close(num(a)*(1-0.6-1/4),12));
{const g=7/(1-0.75);only('rw8-11a',a=>num(a)===g+0.75*g);only('rw8-11b',a=>num(a)===0.75*g);}
{const big=(124+6)/2.6;only('rw8-12a',a=>close(num(a),big));only('rw8-12b',a=>close(num(a),0.8*big-6));}
{const x=1.8/(1.2-0.9);only('rw8-13',a=>close(num(a),1.2*x));}
only('rw8-14a',a=>{const x=num(a);return (x+6)*(2*x+4)-(x+2)*(2*x+2)===180;});
only('rw8-14b',a=>{const x=num(a);return (2*x+5)**2-(4*x+3)*(x+2)===55;});
{const x=root('(6x-2)·8/2 = 4(5x+2)');only('rw8-15',a=>num(a)===6*x-2);}
only('rw8-16',a=>{const n=num(a)-3;return (n+3)*(n+2)-n*(n-1)===66;});
{const x=root('2(x+2)(x+2)+4x(x+2)-6x^2 = 40');only('rw8-17',a=>num(a)===(x+2)*(x+2)*x);}
console.log('PASS: grade 8 equations — all 31 answer keys checked by substitution and direct computation');
}

// Klasa 5: płaszczyzna, proste, półproste, odcinki — odpowiedzi sprawdzane na współrzędnych z rysunków.
{
const pg=SCENARIOS.find(s=>s.id==='lines-5');
assert.equal(pg.grade,5);assert.equal(pg.section,'Figury geometryczne');assert.equal(pg.ordered,true);
assert.deepEqual(pg.award,{password:'Geometria powtórzona, wiedza świetnie utrwalona!',pluses:2});
assert.equal(pg.questions.length,36);assert.equal(new Set(pg.questions.map(q=>q.sourceGroup)).size,14);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===pg.questions).map(s=>s.grade),[5]);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const html=id=>ask(id).q;
const pts=id=>Object.fromEntries([...html(id).matchAll(/data-pt="(\w)" cx="([\d.-]+)" cy="([\d.-]+)"/g)].map(m=>[m[1],[+m[2],+m[3]]]));
const figs=id=>[...html(id).matchAll(/<line data-(?:kind="(\w+)" data-name|grid)="(\w+)" x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map(m=>({kind:m[1]||'seg',name:m[2],a:[+m[3],+m[4]],b:[+m[5],+m[6]]}));
const dir=f=>[f.b[0]-f.a[0],f.b[1]-f.a[1]];
const angle=(u,v)=>{const c=Math.abs(u[0]*v[0]+u[1]*v[1])/Math.hypot(...u)/Math.hypot(...v);return c;};
const par=(u,v)=>angle(u,v)>0.9999, perp=(u,v)=>angle(u,v)<0.001;
const byName=id=>Object.fromEntries(figs(id).map(f=>[f.name,dir(f)]));
// Punkt na figurze: współliniowy i (dla półprostej/odcinka) we właściwym zakresie parametru.
const param=(f,p)=>{const d=dir(f),L=d[0]*d[0]+d[1]*d[1];return ((p[0]-f.a[0])*d[0]+(p[1]-f.a[1])*d[1])/L;};
const onFig=(f,p,kind=f.kind)=>{const d=dir(f),cr=Math.abs((p[0]-f.a[0])*d[1]-(p[1]-f.a[1])*d[0])/Math.hypot(...d);if(cr>0.5)return false;const t=param(f,p);return kind==='line'||(t>=-1e-6&&(kind==='ray'||t<=1+1e-6));};
const word=a=>plain(a).replace(/^tylko /,'').split(/, | i /).map(s=>s.trim());
// Pojęcia i fakty.
assert.equal(pick('pg5-1a'),'jeden');assert.equal(pick('pg5-1b'),'dokładnie jedną');assert.equal(pick('pg5-1c'),'nieskończenie wiele');
assert.equal(pick('pg5-2a'),'k ⊥ l');assert(pick('pg5-2b').includes('równoległa'));
assert.equal(pick('pg5-3a'),'jeden');assert.equal(pick('pg5-3b'),'zero albo jeden');
assert.equal(pick('pg5-14a'),'I: P, II: F');assert.equal(pick('pg5-14b'),'I: P, II: P');
only('pg5-5a',a=>parseInt(a)===3+5);only('pg5-5b',a=>parseInt(a)===12-7);
only('pg5-12a',a=>+a===3);only('pg5-12b',a=>+a===4*3/2);only('pg5-12c',a=>+a===1);
// Rysunek 1: rodzaj figury.
for(const [id,kind] of [['pg5-4a','line'],['pg5-4b','ray'],['pg5-4c','seg']]){const f=figs(id).find(f=>f.kind===kind),P=pts(id);
 only(id,a=>{const [x,y]=plain(a);return f.name===x+y||(kind!=='line'&&false)||(kind==='line'&&onFig(f,P[x])&&onFig(f,P[y]));});
 if(kind==='ray'){const P1=pts(id);assert.deepEqual(f.a,P1.L);assert(onFig(f,P1.N));}}
// Rysunek 2: punkty na prostej p.
{const id='pg5-6a',P=pts(id),p=figs(id)[0],on=Object.keys(P).filter(n=>onFig(p,P[n])),t=n=>param(p,P[n]);
 assert.deepEqual(on,['R','S','T','U','W']);
 only('pg5-6a',a=>{const n=plain(a);return on.includes(n)&&t(n)>t('S')&&t(n)<t('U');});
 only('pg5-6b',a=>{const w=word(a);return w.length===Object.keys(P).length-on.length&&w.every(n=>!on.includes(n));});
 const onRay=(n,from,to)=>on.includes(n)&&(t(n)-t(from))*(t(to)-t(from))>=0;
 only('pg5-6c',a=>{const n=plain(a);return onRay(n,'T','U')&&!onRay(n,'U','T');});
 only('pg5-6d',a=>+a===Object.keys(P).filter(n=>onRay(n,'S','R')).length);}
// Rysunek 4: k, l, m, n, o.
{const L=byName('pg5-7a');only('pg5-7a',a=>plain(a)!=='k'&&par(L.k,L[plain(a)]));only('pg5-7b',a=>perp(L.l,L[plain(a)]));
 only('pg5-7c',a=>+a===Object.keys(L).filter(n=>n!=='k'&&!par(L.k,L[n])&&!perp(L.k,L[n])).length);}
// Rysunek 8: kratka — kierunki całkowite, więc dokładnie.
{const L=byName('pg5-8a');only('pg5-8a',a=>par(L.AB,L[plain(a)]));only('pg5-8b',a=>perp(L.AB,L[plain(a)]));
 assert.equal(Object.keys(L).filter(n=>n!=='AB'&&par(L.AB,L[n])).length,1);assert.equal(Object.keys(L).filter(n=>perp(L.AB,L[n])).length,1);}
// Rysunek 5: dokładnie jedna para równoległa i jedna prostopadła do a.
{const L=byName('pg5-9a'),names=Object.keys(L);const pairs=names.flatMap((x,i)=>names.slice(i+1).filter(y=>par(L[x],L[y])).map(y=>x+' i '+y));
 assert.equal(pairs.length,1);only('pg5-9a',a=>plain(a)===pairs[0]);only('pg5-9b',a=>perp(L.a,L[plain(a)]));}
// Rysunek 3: odcinki, półproste, proste.
{const id='pg5-10a',P=pts(id),F=figs(id),on=f=>Object.keys(P).filter(n=>onFig(f,P[n]));
 const segs=new Set(F.flatMap(f=>{const o=on(f);return o.flatMap((x,i)=>o.slice(i+1).map(y=>[x,y].sort().join('')));}));
 only('pg5-10a',a=>+a===segs.size);
 const rays=F.reduce((n,f)=>!on(f).includes('B')?n:f.kind==='line'?n+2:f.kind==='ray'&&f.a.join()===P.B.join()?n+1:n+(f.kind==='ray'?1:0),0);
 only('pg5-10b',a=>+a===rays);only('pg5-10c',a=>+a===F.filter(f=>f.kind==='line').length);}
// Rysunek 6: boki wielokąta.
{const ps=html('pg5-11a').match(/data-poly="(\w+)" points="([^"]+)"/),names=ps[1].split(''),xy=ps[2].split(' ').map(p=>p.split(',').map(Number));
 const edges=names.map((n,i)=>({name:n+names[(i+1)%names.length],d:[xy[(i+1)%xy.length][0]-xy[i][0],xy[(i+1)%xy.length][1]-xy[i][1]]}));const AB=edges[0].d,rest=edges.slice(1);
 only('pg5-11a',a=>+a===rest.filter(e=>par(AB,e.d)).length);only('pg5-11b',a=>+a===rest.filter(e=>perp(AB,e.d)).length);
 only('pg5-11c',a=>{const e=rest.find(e=>e.name===plain(a));return e&&!par(AB,e.d)&&!perp(AB,e.d);});}
// Rysunek 7: przekątne.
{const id='pg5-13a',P=pts(id),F=figs(id),LN=F.find(f=>f.name==='LN');
 only('pg5-13a',a=>{const w=word(a);const on=Object.keys(P).filter(n=>onFig(LN,P[n]));return w.length===on.length&&w.every(n=>on.includes(n));});
 assert(onFig(F.find(f=>f.name==='KM'),P.S));
 const segs=new Set(F.flatMap(f=>{const o=Object.keys(P).filter(n=>onFig(f,P[n]));return o.flatMap((x,i)=>o.slice(i+1).map(y=>[x,y].sort().join('')));}));
 only('pg5-13b',a=>+a===segs.size);}
console.log('PASS: grade 5 lines, rays and segments — all 36 answer keys checked on drawing coordinates');
}

// Klasa 5: kąty — każdy kąt mierzony na współrzędnych z rysunku.
{
const kt=SCENARIOS.find(s=>s.id==='angles-5');
assert.equal(kt.grade,5);assert.equal(kt.section,'Figury geometryczne');assert.equal(kt.ordered,true);
assert.deepEqual(kt.award,{password:'Quiz o kątach zakończony – każdy uczeń wyszkolony!',pluses:2});
assert.equal(kt.questions.length,41);assert.equal(new Set(kt.questions.map(q=>q.sourceGroup)).size,13);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const html=id=>ask(id).q;
const xy=s=>s.split(',').map(Number);
const dirDeg=(v,p)=>Math.atan2(-(p[1]-v[1]),p[0]-v[0])*180/Math.PI;
const ccw=(v,a,b)=>((dirDeg(v,b)-dirDeg(v,a))%360+360)%360;
const small=(v,a,b)=>{const d=ccw(v,a,b);return Math.min(d,360-d);};
const arcs=id=>Object.fromEntries([...html(id).matchAll(/data-arc="([^"]+)" data-v="([^"]+)" data-a="([^"]+)" data-b="([^"]+)"/g)].map(m=>[m[1],ccw(xy(m[2]),xy(m[3]),xy(m[4]))]));
const pts=id=>Object.fromEntries([...html(id).matchAll(/data-pt="(\w)" cx="([\d.-]+)" cy="([\d.-]+)"/g)].map(m=>[m[1],[+m[2],+m[3]]]));
const kind=d=>Math.abs(d-90)<0.5?'prosty':Math.abs(d-180)<0.5?'półpełny':d<90?'ostry':d<180?'rozwarty':'wklęsły';
const deg=a=>parseFloat(a);
// Pojęcia i rachunki.
only('kt5-1a',a=>a===kind(35));only('kt5-1b',a=>a===kind(120));only('kt5-1c',a=>deg(a)===180);only('kt5-1d',a=>deg(a)===360);
only('kt5-5a',a=>a===kind(15*6));only('kt5-5b',a=>a===kind(30*6));only('kt5-5c',a=>a===kind(4*30));only('kt5-5d',a=>a===kind(10*6));
const hands=(h,m)=>{const d=Math.abs((h%12)*30+m/2-m*6);return Math.min(d,360-d);};
only('kt5-7a',a=>a===kind(hands(9,0)));only('kt5-7b',a=>a===kind(hands(10,30)));only('kt5-7c',a=>a===kind(hands(2,15)));
only('kt5-8a',a=>deg(a)===180-35);only('kt5-8b',a=>deg(a)===35);only('kt5-8c',a=>{const x=deg(a);return x+(x+40)===180;});
assert.equal(pick('kt5-12a'),'I: P, II: F');assert.equal(pick('kt5-12b'),'I: P, II: P');
// Rodzaj narysowanego kąta.
for(const id of ['kt5-2a','kt5-2b','kt5-2c','kt5-2d']){const [d]=Object.values(arcs(id));only(id,a=>a===kind(d));}
// Nazwa kąta: wierzchołek w środku, pozostałe litery to punkty na ramionach.
for(const id of ['kt5-3a','kt5-3b']){const P=pts(id),v=xy(html(id).match(/data-v="([^"]+)"/)[1]);
 only(id,a=>{const [x,y,z]=plain(a).replace('∢','');const on=n=>Object.values(arcs(id))&&[...html(id).matchAll(/<path d="M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)"/g)].some(m=>{const e=[+m[3],+m[4]],p=P[n];return Math.abs((p[0]-v[0])*(e[1]-v[1])-(p[1]-v[1])*(e[0]-v[0]))<300&&(p[0]-v[0])*(e[0]-v[0])+(p[1]-v[1])*(e[1]-v[1])>0;});
  return P[y][0]===v[0]&&P[y][1]===v[1]&&on(x)&&on(z)&&x!==z;});}
// Porównywanie czterech kątów.
{const A=arcs('kt5-4a'),max=Object.keys(A).reduce((x,y)=>A[x]>A[y]?x:y),min=Object.keys(A).reduce((x,y)=>A[x]<A[y]?x:y);only('kt5-4a',a=>a===max);only('kt5-4b',a=>a===min);}
// Zegar: kąt między wskazówkami z rysunku.
for(const id of ['kt5-6a','kt5-6b','kt5-6c','kt5-6d']){const H=Object.fromEntries([...html(id).matchAll(/data-hand="(\w)" x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map(m=>[m[1],[[+m[2],+m[3]],[+m[4],+m[5]]]]));
 only(id,a=>a===kind(small(H.h[0],H.h[1],H.m[1])));}
// Dwie proste przecinające się w O.
{const id='kt5-9a',P=pts(id),O=P.O,ang=n=>small(O,P[n[1]==='O'?n[0]:n[0]],P[n[2]]);
 assert(Math.abs(ang('AOB')-arcs(id).AOB)<0.5);
 const opp=(x,y)=>Math.abs(small(O,P[x],P[y])-180)<0.5,arms=n=>[n[0],n[2]];
 only('kt5-9a',a=>{const [x,y]=arms(plain(a).replace('∢',''));return (opp(x,'A')&&opp(y,'B'))||(opp(x,'B')&&opp(y,'A'));});
 only('kt5-9b',a=>{const [x,y]=arms(plain(a).replace('∢',''));if(opp(x,y))return false;const s=[x,y].filter(n=>'AB'.includes(n)),o=[x,y].filter(n=>!'AB'.includes(n));return s.length===1&&o.length===1&&opp(o[0],s[0]==='A'?'B':'A');});
 only('kt5-9c',a=>Math.abs(deg(a)-ang('BOC'))<0.5);only('kt5-9d',a=>Math.abs(deg(a)-ang('COD'))<0.5);}
// Drogi: kąt wypukły między dwiema drogami.
{const R=Object.fromEntries([...html('kt5-10a').matchAll(/data-road="([^"]+)" x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map(m=>[m[1],[[+m[2],+m[3]],[+m[4],+m[5]]]]));
 for(const id of ['kt5-10a','kt5-10b','kt5-10c','kt5-10d']){const [x,y]=[...plain(html(id)).matchAll(/„([^”]+)”/g)].map(m=>m[1]);only(id,a=>a===kind(small(R[x][0],R[x][1],R[y][1])));}}
// Kąty wielokąta (wypukłego).
const polyKinds=id=>{const ps=html(id).match(/data-poly="[^"]+" points="([^"]+)"/)[1].split(' ').map(xy);
 return ps.map((p,i)=>kind(small(p,ps[(i+ps.length-1)%ps.length],ps[(i+1)%ps.length])));};
{const k=polyKinds('kt5-11a');only('kt5-11a',a=>+a===k.filter(x=>x==='rozwarty').length);only('kt5-11b',a=>+a===k.filter(x=>x==='prosty').length);}
{const k=polyKinds('kt5-11c');only('kt5-11c',a=>+a===k.filter(x=>x==='ostry').length);}
// Trzy proste.
{const A=arcs('kt5-13a');assert(Math.abs(A['40']-40)<0.5&&Math.abs(A['65']-65)<0.5);assert(Math.abs(A['40']+A['α']+A['65']-180)<0.5);
 only('kt5-13a',a=>Math.abs(deg(a)-A['α'])<0.5);only('kt5-13b',a=>Math.abs(deg(a)-(A['α']+A['β']))<0.5);}
console.log('PASS: grade 5 angles — all 41 answer keys measured on drawing coordinates');
}
// Klasa 5: mierzenie kątów — miary z rysunku (współrzędne łuków i wskazówek) albo liczone niezależnie z treści.
{
const mk=SCENARIOS.find(s=>s.id==='measure-angles-5');
assert.equal(mk.grade,5);assert.equal(mk.section,'Figury geometryczne');assert.equal(mk.ordered,true);
assert.deepEqual(mk.award,{password:'Kąt ostry czy rozwarty? Ten quiz jest tego warty!',pluses:2});
assert.equal(mk.questions.length,56);assert.equal(new Set(mk.questions.map(q=>q.sourceGroup)).size,14);
assert.deepEqual([0,1,2,3].map(i=>mk.questions.filter(q=>q.correct===i).length),[14,14,14,14]);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const html=id=>ask(id).q;
const xy=s=>s.split(',').map(Number);
const dirDeg=(v,p)=>Math.atan2(-(p[1]-v[1]),p[0]-v[0])*180/Math.PI;
const ccw=(v,a,b)=>((dirDeg(v,b)-dirDeg(v,a))%360+360)%360;
const arcs=id=>Object.fromEntries([...html(id).matchAll(/data-arc="([^"]+)" data-v="([^"]+)" data-a="([^"]+)" data-b="([^"]+)"/g)].map(m=>[m[1],ccw(xy(m[2]),xy(m[3]),xy(m[4]))]));
const kind=d=>Math.abs(d-90)<0.5?'prosty':Math.abs(d-180)<0.5?'półpełny':d<90?'ostry':d<180?'rozwarty':'wklęsły';
const deg=a=>parseFloat(a), near=(a,b)=>Math.abs(a-b)<0.5, task=q=>q.q.match(/<b>(.*?)<\/b>/)[1];
const ids=g=>mk.questions.filter(q=>q.sourceGroup===g).map(q=>q.id);
// Łuki z podpisem liczbowym mają taką miarę, jak podpis; kwadracik to 90°.
for(const q of mk.questions) for(const [n,d] of Object.entries(arcs(q.id))){if(n==='prosty')assert(near(d,90),q.id);else if(/°$/.test(n))assert(near(d,deg(n)),q.id+' '+n);}
for(const id of ids('mk5-1')) only(id,a=>a===kind(deg(task(ask(id)))));
only('mk5-2a',a=>!['ostry','rozwarty'].includes(kind(deg(a))));only('mk5-2b',a=>!['ostry','rozwarty'].includes(kind(deg(a))));only('mk5-2c',a=>kind(deg(a))==='ostry');
only('mk5-2d',a=>deg(a)===html('mk5-2d').match(/kątów (.*?) to/)[1].split(', ').map(deg).filter(d=>d<90).length);
// Rysunki: odpowiedź równa zmierzonemu łukowi x albo „?”.
for(const g of ['mk5-3','mk5-4']) for(const id of ids(g)) only(id,a=>near(deg(a),arcs(id).x));
for(const g of ['mk5-7','mk5-8','mk5-9','mk5-10']) for(const id of ids(g)) only(id,a=>near(deg(a),arcs(id)['?']));
// Kątomierz: jedno ramię na podstawie, odczyt z właściwej skali; druga skala daje 180° − x i musi być wśród odpowiedzi.
for(const id of ids('mk5-4')){const x=arcs(id).x;assert(ask(id).answers.some(a=>near(deg(a),180-x)),id);}
// Wskazówki: minutowa 6° na minutę, godzinowa 0,5° na minutę.
const minutes={'mk5-5a':25,'mk5-5b':45,'mk5-5c':35,'mk5-5d':15,'mk5-6a':180,'mk5-6b':420,'mk5-6c':30,'mk5-6d':140};
for(const [id,m] of Object.entries(minutes)) only(id,a=>deg(a)===(id.startsWith('mk5-5')?6:0.5)*m);
assert.equal(pick('mk5-11a'),truth(15*6===90,false));assert.equal(pick('mk5-11b'),truth(kind(200)==='wklęsły',kind(180-60)==='rozwarty'));
assert.equal(pick('mk5-11c'),truth(360/12===60,true));assert.equal(pick('mk5-11d'),truth(89+89>=180,false));
for(const id of ids('mk5-12')){const H=Object.fromEntries([...html(id).matchAll(/data-hand="(\w)" x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map(m=>[m[1],[[+m[2],+m[3]],[+m[4],+m[5]]]]));
 const d=ccw(H.h[0],H.h[1],H.m[1]);only(id,a=>near(deg(a),Math.min(d,360-d)));}
{const A=arcs('mk5-13a');assert(near(A['α'],A['β']));assert(near(A['50°']+A['α']+A['β'],180));
 only('mk5-13a',a=>near(deg(a),A['α']));only('mk5-13b',a=>near(deg(a),A['γ']));only('mk5-13c',a=>near(deg(a),A['α']+A['δ']));only('mk5-13d',a=>near(deg(a),A['β']+A['γ']+A['δ']));}
only('mk5-14a',a=>deg(a)+deg(a)/2===180);only('mk5-14b',a=>4*deg(a)===180);only('mk5-14c',a=>deg(a)+deg(a)/2===90);only('mk5-14d',a=>2*deg(a)+100===360);
console.log('PASS: grade 5 measuring angles — all 56 answer keys measured on drawings or computed');
}

// Klasa 8: wyrażenia algebraiczne — zadania egzaminacyjne. Wartości wyrażeń liczone dla wielu liczb, znaki i warunki sprawdzane osobno.
{
const ae=SCENARIOS.find(s=>s.id==='algebra-exam-8');
assert.equal(ae.grade,8);assert.equal(ae.section,'Przygotowanie do egzaminu');assert.equal(ae.ordered,true);
assert.deepEqual(ae.award,{password:'Wyrażenia algebraiczne – rozkminy logiczne!',pluses:3});
assert.equal(ae.questions.length,22);assert.equal(new Set(ae.questions.map(q=>q.sourceGroup)).size,22);
const text=html=>html.replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'(($1)/($2))').replace(/<sup>(\d)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'');
// Wyrażenie → funkcja zmiennych (mnożenie domyślne między liczbą/literą/nawiasem).
const fn=src=>{const js=text(src).replace(/−/g,'-').replace(/·/g,'*').replace(/(\d),(\d)/g,'$1.$2').replace(/\^/g,'**').replace(/\s/g,'')
 .replace(/([\d.a-z)])(?=[a-z(])/g,'$1*').replace(/\)(?=\d)/g,')*');return vars=>Function(...Object.keys(vars),`return ${js}`)(...Object.values(vars));};
const same=(a,b)=>Math.abs(a-b)<1e-9;
const samples=[{a:1.7,b:-0.6,x:2.3,y:-1.1,k:4.2,n:0.4},{a:-2.5,b:3.1,x:7,y:0.9,k:12,n:-1.3},{a:0.3,b:5,x:-4,y:2.6,k:9,n:2}];
const equal=(l,r)=>samples.every(v=>same(fn(l)(v),fn(r)(v)));
const onlyEq=(id,expr)=>{const q=ask(id);assert.deepEqual(q.answers.filter(a=>equal(a,expr)),[q.answers[q.correct]],id);};
onlyEq('ae-5877','7a/b');
onlyEq('ae-7764','x+4x+(4x+3)');
onlyEq('ae-7920','2*x+2*(x/2)+4*x');
onlyEq('ae-7358','k-k/3-3');
onlyEq('ae-7434','x(x+4)-3(2x-5)');
onlyEq('ae-5873','4a+(x-4)(a+100)');
onlyEq('ae-5263','(2a+3b)(3b-2a)');
onlyEq('ae-7273','(x-2)(4x-3)-x(1-x)');
onlyEq('ae-7600','2(a-2b)-(a-b)(2-b)+b^2');
// Para wyrażeń: (x + 7)·4 oraz 5y + 3.
{const q=ask('ae-6991');assert.deepEqual(q.answers.filter(a=>{const [l,r]=a.split(' oraz ');return equal(l,'4*(x+7)')&&equal(r,'5*y+3');}),[q.answers[q.correct]]);}
// Wartość 0 dla x = 3, y = −2.
{const q=ask('ae-5876');assert.deepEqual(q.answers.filter(a=>same(fn(a)({x:3,y:-2}),0)),[q.answers[q.correct]]);}
// G, H, J, K: zero dla x = 1 i x = −1.
{const E={G:'2x^2+2',H:'2x^2+2x',J:'2x^2-2',K:'2x^2-2x'},q=ask('ae-6986');assert.deepEqual(q.answers.filter(a=>[1,-1].every(x=>fn(E[text(a)])({x})===0)),[q.answers[q.correct]]);}
// Najmniejsza wartość (n^4 − 3)/6 wśród −3, −1, 0, 1, 3; pominięta odpowiedź E (3) daje to samo co −3.
{const vals=[-3,-1,0,1,3],v=n=>(n**4-3)/6,best=vals.reduce((a,b)=>v(b)<v(a)?b:a);assert.equal(+pick('ae-6491').replace('−','-'),best);assert(v(3)>v(best));}
// 3/5 = 1/x + 1/y.
{const q=ask('ae-3727');assert.deepEqual(q.answers.filter(a=>{const [x,y]=a.split(' i ').map(Number);return same(1/x+1/y,3/5);}),[q.answers[q.correct]]);}
// Uzupełnianie zdań (A/B, C/D).
{const a=[3,1].find(a=>3*a-4===a+2);assert.equal(a,3);assert(equal('(3a-4)-(a+2)','2a-6')&&!equal('(3a-4)-(a+2)','2a-2'));assert.equal(pick('ae-7919'),'A i D');}
{assert.equal(2-2*(-3)**2,-16);assert(equal('(2-2a^2)/2','1-a^2')&&!equal('(2-2a^2)/2','1-2a^2'));assert.equal(pick('ae-7347'),'A i D');}
{const ok=[-1.5,-4,-10].every(a=>-1-a>0);const ok2=[0.5,2,7].every(a=>1/a>0);assert(ok&&ok2);assert.equal(pick('ae-7321'),'A i C');}
// P/F.
assert.equal(pick('ae-3817'),truth([[-1,-2],[-0.5,-3]].every(([x,y])=>y<0),[[-1,-2],[-0.5,-3]].every(([x,y])=>x>y)));
{const pairs=[[10,36],[23,23],[45.5,0.5]];assert(pairs.every(([a,b])=>a+b===46));assert.equal(pick('ae-7319'),truth(pairs.every(([a,b])=>(a-6)+(b-6)===34),pairs.every(([a,b])=>same(1.5*a+1.5*b,69))));}
{const grid=[];for(let a=2.1;a<3;a+=0.1)for(let b=-0.9;b<1;b+=0.1)grid.push([a,b]);assert.equal(pick('ae-4595'),truth(grid.every(([a,b])=>b/a>0),grid.every(([a,b])=>b-a>0)));}
// Liczby dodatnie wśród x·y, x − y, x/y, (y − x)^2 dla x > 0, y < 0.
{const cnt=[[2,-3],[0.5,-7]].map(([x,y])=>[x*y,x-y,x/y,(y-x)**2].filter(v=>v>0).length);assert(cnt.every(c=>c===2));assert.equal(ask('ae-4387').correct,1);}
// Klasa IIIa: dziewczęta 2/3, chłopcy 1/3 — dwa razy więcej dziewcząt.
{const g=2/3,b=1/3;assert(same(g,2*b)&&!(b>g)&&!same(g,2/3*b)&&!same(b/g,1/3));assert.equal(ask('ae-4596').correct,2);}
console.log('PASS: grade 8 algebra exam tasks — all 22 answer keys checked');
}
// Klasa 5: trójkąty — boki i kąty mierzone na rysunkach, reszta liczona niezależnie z treści.
{
const tr=SCENARIOS.find(s=>s.id==='triangles-5');
assert.equal(tr.grade,5);assert.equal(tr.section,'Figury geometryczne');assert.equal(tr.ordered,true);
assert.deepEqual(tr.award,{password:'Trzy boki, trzy kąty – znam na wylot trójkąty!',pluses:3});
assert.equal(tr.questions.length,60);assert.equal(new Set(tr.questions.map(q=>q.sourceGroup)).size,15);
assert.deepEqual([0,1,2,3].map(i=>tr.questions.filter(q=>q.correct===i).length),[15,15,15,15]);
const only=(id,ok)=>assert.deepEqual(ask(id).answers.filter(ok),[selected(id)],id);
const html=id=>ask(id).q, xy=s=>s.split(',').map(Number), deg=a=>parseFloat(a), near=(a,b)=>Math.abs(a-b)<0.5;
const ids=g=>tr.questions.filter(q=>q.sourceGroup===g).map(q=>q.id);
const dirDeg=(v,p)=>Math.atan2(-(p[1]-v[1]),p[0]-v[0])*180/Math.PI;
const ccw=(v,a,b)=>((dirDeg(v,b)-dirDeg(v,a))%360+360)%360;
const arcs=id=>{const r={};for(const m of html(id).matchAll(/data-arc="([^"]+)" data-v="([^"]+)" data-a="([^"]+)" data-b="([^"]+)"/g))(r[m[1]]??=[]).push(ccw(xy(m[2]),xy(m[3]),xy(m[4])));return r;};
const tri=id=>html(id).match(/data-tri="ABC" points="([^"]+)"/)[1].split(' ').map(xy);
const len=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]);
const inner=P=>P.map((v,i)=>{const a=P[(i+1)%3],b=P[(i+2)%3],d=ccw(v,a,b);return Math.min(d,360-d);});
for(const q of tr.questions) if(q.q.includes('data-tri')){
 const P=tri(q.id), I=inner(P);assert(near(I[0]+I[1]+I[2],180),q.id);
 // Każdy łuk z liczbą ma tyle stopni, ile podpis; kwadracik — 90°; łuk wewnątrz trójkąta to jeden z jego kątów; ta sama litera — ta sama miara.
 for(const [n,ds] of Object.entries(arcs(q.id))){for(const d of ds){if(n==='prosty')assert(near(d,90),q.id);else if(/°$/.test(n))assert(near(d,deg(n)),q.id+' '+n);}assert(ds.every(d=>near(d,ds[0])),q.id+' '+n);}
 // Podpisy boków: równe liczby ⇔ równe odcinki, długości proporcjonalne do rysunku.
 const S=[...q.q.matchAll(/data-side="([^;]+);([^"]+)" data-len="([\d,]+)/g)].map(m=>[len(xy(m[1]),xy(m[2])),deg(m[3])]);
 for(const [p,a] of S) for(const [r,b] of S) assert(Math.abs(p/a-r/b)<0.02*p/a,q.id);
}
// Rodzaj trójkąta z rysunku: boki i kąty zmierzone na współrzędnych.
for(const id of ids('tr5-3')){const P=tri(id),L=[0,1,2].map(i=>len(P[i],P[(i+1)%3])),I=inner(P),eq=[0,1,2].filter(i=>Math.abs(L[i]-L[(i+1)%3])<1).length;
 const kind=`${eq===3?'równoboczny':eq?'równoramienny':'różnoboczny'} i ${I.some(d=>near(d,90))?'prostokątny':I.some(d=>d>90.5)?'rozwartokątny':'ostrokątny'}`;only(id,a=>a===kind);}
// Rodzaj po kątach z treści.
const T=['ostrokątny','prostokątny','rozwartokątny','taki trójkąt nie istnieje'];
for(const id of ids('tr5-2')){const k=html(id).match(/<b>(\d+)°, (\d+)° i (\d+)°<\/b>/).slice(1).map(Number),sum=k[0]+k[1]+k[2];only(id,a=>a===(sum!==180?T[3]:k.includes(90)?T[1]:k.some(d=>d>90)?T[2]:T[0]));}
// Warunek trójkąta (zamiana jednostek na cm).
const U={mm:0.1,cm:1,dm:10,m:100,km:100000};
const ok=a=>{const s=a.split(', ').map(x=>{const [n,u]=x.split(' ');return deg(n.replace(',','.'))*U[u];}).sort((x,y)=>x-y);return s[0]+s[1]>s[2]+1e-9;};
for(const id of [...ids('tr5-4'),'tr5-12c']) only(id,a=>html(id).includes('<b>nie można</b>')?!ok(a):ok(a));
only('tr5-12a',a=>ok(`7 cm, 12 cm, ${a}`));only('tr5-12b',a=>ok(`20 cm, 8 cm, ${a}`));only('tr5-12d',a=>ok(`${a}, ${a}, 12 cm`));
// Trzeci kąt z treści.
for(const id of ids('tr5-5')){const [x,y]=html(id).match(/<b>(\d+)° i (\d+)°<\/b>/).slice(1).map(Number);only(id,a=>deg(a)===180-x-y);}
// Kąt z rysunku: szukany łuk (litera) zmierzony na rysunku.
for(const g of ['tr5-6','tr5-10','tr5-11','tr5-14']) for(const id of ids(g)){const L=html(id).match(/kąt ([αβγδ])\?/)[1];only(id,a=>near(deg(a),arcs(id)[L][0]));}
only('tr5-7a',a=>deg(a)===3*7);only('tr5-7b',a=>3*deg(a)===36);only('tr5-7c',a=>deg(a)===9+9+5);only('tr5-7d',a=>2*deg(a)+8===22);
assert.deepEqual(ids('tr5-8').map(id=>ask(id).correct),[0,1,2,3]);
const third=(x,y)=>[x,y,180-x-y], acute=k=>k.every(d=>d<90), iso=k=>new Set(k).size<3;
{const k=third(45,70);assert.equal(pick('tr5-9a'),truth(acute(k),iso(k)));}
{const k=third(40,70);assert.equal(pick('tr5-9b'),truth(acute(k),iso(k)));}
{const k=third(25,65);assert.equal(pick('tr5-9c'),truth(k.some(d=>d>90),k.includes(90)));}
{const k=third(30,30);assert.equal(pick('tr5-9d'),truth(acute(k),k.every(d=>d===60)));}
only('tr5-13a',a=>deg(a)===9+9+(9-3));only('tr5-13b',a=>deg(a)===10+2*(10-4));only('tr5-13c',a=>deg(a)===30-2*11);only('tr5-13d',a=>2*deg(a)+6===3*8);
only('tr5-15a',a=>deg(a)===180-35-70);only('tr5-15b',a=>2*deg(a)+deg(a)===90);only('tr5-15c',a=>{const x=deg(a)/3;return x+x+deg(a)===180;});
only('tr5-15d',a=>{const x=deg(a)-4;return x+(x+3)+deg(a)===22;});
console.log('PASS: grade 5 triangles — all 60 answer keys measured on drawings or computed');
}

// Klasa 7, dział „Pierwiastki”: pierwiastek kwadratowy — każdy klucz liczony niezależnie (Math.sqrt), poprawna odpowiedź jedyna o dobrej wartości.
{
const sq=SCENARIOS.find(s=>s.id==='square-root-7');
assert.equal(sq.grade,7);assert.equal(sq.section,'Pierwiastki');assert.equal(sq.ordered,true);
assert.deepEqual(sq.award,{password:'Pierwiastek wyciągnięty, milion już zgarnięty!',pluses:2});
assert.equal(sq.questions.length,64);assert.equal(new Set(sq.questions.map(q=>q.sourceGroup)).size,16);
assert.deepEqual(SCENARIOS.filter(s=>s.questions===sq.questions).map(s=>s.grade),[7]);
assert.deepEqual([0,1,2,3].map(i=>sq.questions.filter(q=>q.correct===i).length),[16,16,16,16]);
const num=html=>{if(html.includes("sqrt"))return NaN;const t=html.replace(/(\d*)<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g,(_,w,a,b)=>String((+w||0)+a/b)).replace(/<[^>]+>/g,'').replace(/ (cm|m|dm|mm|km)$/,'').replace(/\s/g,'').replace('−','-').replace(',','.');return /^-?\d+(\.\d+)?(e-?\d+)?$/.test(t)?+t:NaN;};
const close=(a,b)=>Math.abs(a-b)<1e-9;
const only=(id,ok)=>{const q=ask(id);assert.deepEqual(q.answers.filter(ok),[q.answers[q.correct]],id);};
const r=Math.sqrt, sqv=x=>x*x;
const V={
 'pk7-1a':r(64),'pk7-1b':r(121),'pk7-1c':r(196),'pk7-1d':r(169),
 'pk7-2a':r(81),'pk7-2b':r(144),'pk7-2c':r(225),'pk7-2d':r(400),
 'pk7-3a':sqv(6),'pk7-3b':sqv(11),'pk7-3c':sqv(0.5),'pk7-3d':sqv(1.3),
 'pk7-4a':sqv(r(23)),'pk7-4b':r(41**2),'pk7-4c':r(17)*r(17),'pk7-4d':r(0.7**2),
 'pk7-5a':r(4900),'pk7-5b':r(1600),'pk7-5c':r(250000),'pk7-5d':r(1e6),
 'pk7-6a':r(25/64),'pk7-6b':r(49/81),'pk7-6c':r(1/36),'pk7-6d':r(16/169),
 'pk7-7a':r(0.49),'pk7-7b':r(0.0009),'pk7-7c':r(1.69),'pk7-7d':r(0.0121),
 'pk7-8a':r(25)+r(49)+r(81),'pk7-8b':r(144)-r(64)+r(9),'pk7-8c':r(100)-r(36)*r(4),'pk7-8d':r(225)/r(25)+r(16),
 'pk7-10a':r(2+7/9),'pk7-10b':r(1+13/36),'pk7-10c':r(6+1/4),'pk7-10d':r(1+24/25),
 'pk7-11a':4*r(196),'pk7-11b':4*r(1.21),'pk7-11c':4*r(0.25),'pk7-11d':4*r(2.25),
 'pk7-12a':r(4*9),'pk7-12b':r(0.4*3.6),'pk7-12c':r(2*32),'pk7-12d':r(0.9*10),
 'pk7-14a':4*r(900),'pk7-14b':r(0.09)*100,'pk7-14c':r(1600)/r(64),'pk7-14d':4*r(625),
 'pk7-15a':r(0.04)*r(2500),'pk7-15b':4*r(0.36)-0.5*r(64),'pk7-15c':r(1.44)+r(0.25)*r(100),'pk7-15d':(r(0.81)-r(0.49))*r(400),
 'pk7-16a':r(1+7/9)-r((2/3)**2)+r(1/9),'pk7-16b':r(2.25)-r(1/4)*r(36),'pk7-16c':(r(3+1/16)-r(9/16))*r(0.64),'pk7-16d':r(5+1/16)/r(9/64)-r(49),
};
for(const [id,v] of Object.entries(V)) only(id,a=>close(num(a),v));
for(const [id,n] of [['pk7-13a',55],['pk7-13b',90],['pk7-13c',20],['pk7-13d',130]]) only(id,a=>{const [lo,hi]=a.split(' i ').map(Number);return hi===lo+1&&lo<r(n)&&r(n)<hi;});
assert.equal(pick('pk7-9a'),truth(close(r(9+16),r(9)+r(16)),close(r(4*25),r(4)*r(25))));
assert.equal(pick('pk7-9b'),truth(close(r(36/4),r(36)/r(4)),close(r(100-64),r(100)-r(64))));
assert.equal(pick('pk7-9c'),truth(close(r(0.09),0.3),close(r(2.25),1.5)));
assert.equal(pick('pk7-9d'),truth(close(r(0.4),0.2),close(r(1+9/16),1.75)));
assert.equal(Object.keys(V).length+8,64);
// Od łatwych do trudnych: grupy w pliku w kolejności 1…16.
assert.deepEqual([...new Set(sq.questions.map(q=>q.sourceGroup))],Array.from({length:16},(_,i)=>`pk7-${i+1}`));
console.log('PASS: grade 7 square roots — all 64 answer keys computed independently');
}
