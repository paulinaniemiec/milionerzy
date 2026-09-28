// Autorskie zadania w stylu egzaminu ósmoklasisty. Każdy wykres jest osobnym zadaniem.
const q = (id, text, answers, correct, explain) => ({id, sourceGroup:id, q:text, answers, correct, explain});
const colors=['#f6c85c','#63d6e8','#cc9aff','#ff9d9d'];
const svg=(title,body,desc)=>`<figure class="exam-chart"><figcaption>${title}</figcaption><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 235" role="img" aria-label="${title}. ${desc}">${body}</svg></figure>`;
const text=(x,y,value,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="#f3f5ff" font-family="Arial, sans-serif" font-size="14">${value}</text>`;
function bars(title,labels,series,max,unit,step=max/4){
 let body=text(12,18,unit,'start');
 for(let v=0;v<=max;v+=step){const y=190-v/max*150;body+=`<path d="M42 ${y}H390" stroke="#465478"/>`+text(35,y+5,v,'end');}
 const slot=340/labels.length, bw=Math.min(40,slot/(series.length+1));
 labels.forEach((l,i)=>{body+=text(45+slot*(i+.5),212,l);series.forEach((s,j)=>{const v=s.values[i],x=45+slot*(i+.5)+(j-series.length/2)*bw;body+=`<rect x="${x}" y="${190-v/max*150}" width="${bw-3}" height="${v/max*150}" fill="${colors[j]}"/>`;});});
 return svg(title,body,labels.map((l,i)=>`${l}: ${series.map(s=>`${s.name} ${s.values[i]}`).join(', ')}`).join('; '))+ (series.length>1?`<div class="exam-legend">${series.map((s,i)=>`<span><i style="background:${colors[i]}"></i>${s.name}</span>`).join('')}</div>`:'');
}
function line(title,labels,values,min,max,unit,step){
 const y=v=>190-(v-min)/(max-min)*150,x=i=>48+i*330/(labels.length-1);let body=text(12,18,unit,'start');
 for(let v=min;v<=max;v+=step)body+=`<path d="M42 ${y(v)}H385" stroke="#465478"/>`+text(35,y(v)+5,v,'end');
 body+=`<polyline points="${values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="#63d6e8" stroke-width="3"/>`;
 values.forEach((v,i)=>body+=`<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#f6c85c"/>`+text(x(i),215,labels[i]));
 return svg(title,body,labels.map((l,i)=>`${l}: ${values[i]}`).join('; '));
}
function pie(title,labels,values){
 let angle=-Math.PI/2;let body='';values.forEach((v,i)=>{const end=angle+v/100*2*Math.PI, p=a=>[115+85*Math.cos(a),115+85*Math.sin(a)];const a=p(angle),b=p(end);body+=`<path d="M115 115L${a}A85 85 0 ${v>50?1:0} 1 ${b}Z" fill="${colors[i]}" stroke="#101b3b" stroke-width="2"/>`;
 body+=`<rect x="216" y="${45+i*40}" width="12" height="12" fill="${colors[i]}"/>`+text(237,57+i*40,`${labels[i]}: ${v}%`,'start');angle=end;});
 return svg(title,body,labels.map((l,i)=>`${l}: ${values[i]}%`).join('; '));
}
const single=(title,labels,values,max,unit,step)=>bars(title,labels,[{name:'wynik',values}],max,unit,step);
const pictogram=svg('Zbiórka karmy — jeden symbol oznacza 4 kg', ['8a','8b','8c'].map((name,i)=>text(25,57+i*65,name,'start')+Array.from({length:[3,5,4][i]},(_,j)=>`<rect x="${85+j*49}" y="${32+i*65}" width="32" height="32" rx="6" fill="#f6c85c"/>`).join('')).join(''),'8a: 3 symbole; 8b: 5 symboli; 8c: 4 symbole. Jeden symbol to 4 kg.');
export const diagramQuestions=[
 q('chart-1',`${single('Sprzedane bilety do planetarium',['Pt','Sob','Nd'],[60,100,80],100,'liczba biletów',20)}W sobotę i niedzielę sprzedano łącznie o ile więcej biletów niż w piątek?`,['40','80','120','180'],2,'W weekend: 100 + 80 = 180 biletów. Różnica: 180 − 60 = <b>120</b>.'),
 q('chart-2',`${line('Temperatura podczas zimowego spaceru',['8:00','10:00','12:00','14:00'],[-4,-1,2,0],-4,4,'temperatura (°C)',2)}O ile stopni wzrosła temperatura między 8:00 a 12:00?`,['2°C','6°C','4°C','8°C'],1,'Temperatura zmieniła się z −4°C na 2°C. Przyrost: 2 − (−4) = <b>6°C</b>.'),
 q('chart-3',`${pie('Ulubione zajęcia po lekcjach',['Sport','Gry','Muzyka','Inne'],[40,25,20,15])}Każdy ankietowany wskazał jedną odpowiedź. Muzykę wybrało 30 osób. Ile osób wzięło udział w ankiecie?`,['60','120','200','150'],3,'20% wszystkich to 30 osób. Całość: 30 : 0,20 = <b>150 osób</b>.'),
 q('chart-4',`${pictogram}O ile kilogramów więcej karmy zebrała klasa 8b niż klasa 8a?`,['8 kg','2 kg','12 kg','20 kg'],0,'Różnica to 5 − 3 = 2 symbole. Każdy oznacza 4 kg: 2 · 4 = <b>8 kg</b>.'),
 q('chart-5',`${bars('Dojazdy do szkoły na rowerze',['Pon','Wt','Śr'],[{name:'Klasa 8a',values:[8,12,10]},{name:'Klasa 8b',values:[12,8,16]}],20,'liczba uczniów',4)}W którym dniu łącznie najwięcej uczniów obu klas przyjechało rowerem?`,['W poniedziałek','We wtorek','W środę','Każdego dnia tyle samo'],2,'Sumy: poniedziałek 20, wtorek 20, środa 26. Największa suma przypada <b>w środę</b>.'),
 q('chart-6',`${single('Czas czytania w czterech dniach',['Pon','Wt','Śr','Czw'],[20,40,30,50],60,'czas (min)',10)}Ile wynosi średni dzienny czas czytania w tych czterech dniach?`,['30 min','35 min','40 min','45 min'],1,'(20 + 40 + 30 + 50) : 4 = 140 : 4 = <b>35 minut</b>.'),
 q('chart-7',`${line('Wycieczka — droga przebyta od startu',['0','1','2','3','4'],[0,4,4,8,12],0,12,'droga (km); oś pozioma: czas (h)',4)}Ile trwał postój widoczny na wykresie?`,['4 h','3 h','2 h','1 h'],3,'Od końca pierwszej do końca drugiej godziny droga pozostaje równa 4 km. Postój trwał <b>1 godzinę</b>.'),
 q('chart-8',`${pie('Głosy na temat szkolnego podcastu',['Nauka','Sport','Kultura','Inne'],[45,30,15,10])}Każdy z 200 uczniów oddał jeden głos. O ile więcej głosów dostała nauka niż sport?`,['30','15','60','90'],0,'Różnica to 45% − 30% = 15% wszystkich głosów. 0,15 · 200 = <b>30 głosów</b>.'),
 q('chart-9',`${single('Wyniki miniquizu — 20 uczestników',['0','1','2','3','4'],[2,4,8,4,2],8,'liczba osób; oś pozioma: punkty',2)}Jaki procent uczestników zdobył co najmniej 3 punkty?`,['20%','30%','40%','70%'],1,'Co najmniej 3 punkty to 3 lub 4 punkty: 4 + 2 = 6 osób. 6/20 = <b>30%</b>.'),
 q('chart-10',`${bars('Zapełnienie dwóch sal kinowych',['Sala A','Sala B'],[{name:'Zajęte miejsca',values:[60,50]}],100,'zajęte miejsca (%)',20)}Sala A ma 80 miejsc, sala B — 120. Które zdanie jest prawdziwe?`,['W A jest o 10 widzów więcej','W obu jest tyle samo widzów','W B jest o 12 widzów więcej','W A jest o 12 widzów więcej'],2,'Sala A: 60% · 80 = 48 widzów. Sala B: 50% · 120 = 60. W B jest <b>o 12 więcej</b>, choć procent jest mniejszy.'),
 q('chart-11',`${line('Stan licznika wody na początku miesiąca',['IV','V','VI','VII'],[120,126,135,141],120,144,'odczyt (m³)',6)}W którym miesiącu zużyto najwięcej wody? Odczyt pokazuje łączne zużycie od uruchomienia licznika.`,['W kwietniu','W maju','W czerwcu','W każdym tyle samo'],1,'Zużycie liczymy z różnic: kwiecień 126 − 120 = 6, maj 135 − 126 = 9, czerwiec 141 − 135 = 6 m³. Najwięcej <b>w maju</b>.'),
 q('chart-12',`${single('Oszczędności odłożone w kolejnych miesiącach',['I','II','III','IV'],[30,50,40,60],60,'kwota (zł)',10)}Lena zbiera 240 zł na słuchawki. Jaki procent tej kwoty brakuje jej po czterech miesiącach?`,['20%','30%','75%','25%'],3,'Odłożono 30 + 50 + 40 + 60 = 180 zł. Brakuje 60 zł z 240 zł: 60/240 = <b>25%</b>.'),
];
export const probabilityQuestions=[
 q('chance-1','W woreczku jest 5 czerwonych, 3 niebieskie i 4 zielone żetony różniące się tylko kolorem. Losujesz jeden. Jakie jest prawdopodobieństwo, że nie będzie czerwony?',['5/12','1/3','7/12','7/5'],2,'Wszystkich żetonów jest 12. Niebieskich i zielonych: 3 + 4 = 7. Prawdopodobieństwo: <b>7/12</b>.'),
 q('chance-2','Rzucasz uczciwą sześcienną kostką z oczkami od 1 do 6. Jakie jest prawdopodobieństwo otrzymania liczby oczek będącej dzielnikiem 6?',['1/3','2/3','1/2','1/6'],1,'Dzielniki 6 na kostce to 1, 2, 3 i 6 — cztery wyniki z sześciu: 4/6 = <b>2/3</b>.'),
 q('chance-3','W pudełku jest 40 jednakowych, zwiniętych losów. 8 daje bilet do kina, 6 — grę, a pozostałe są puste. Losujesz jeden. Jaka jest szansa na pusty los?',['7/20','13/40','3/5','13/20'],3,'Pustych losów: 40 − 8 − 6 = 26. 26/40 = <b>13/20</b>.'),
 q('chance-4','Losujesz jeden z 31 dni miesiąca, który zaczyna się w sobotę. Każdy dzień ma jednakową szansę. Jakie jest prawdopodobieństwo wylosowania niedzieli?',['5/31','4/31','1/7','2/7'],0,'Niedziele wypadają 2, 9, 16, 23 i 30 dnia miesiąca. Jest ich 5 z 31 dni: <b>5/31</b>.'),
 q('chance-5','Na 20 jednakowych kartach zapisano kolejne liczby od 1 do 20. Losujesz jedną kartę. Jaka jest szansa, że jej liczba jest podzielna przez 3 lub przez 5?',['3/5','9/20','1/2','1/4'],1,'Wielokrotności 3: 3, 6, 9, 12, 15, 18; wielokrotności 5: 5, 10, 15, 20. Liczbę 15 liczymy raz: 6 + 4 − 1 = 9. Wynik: <b>9/20</b>.'),
 q('chance-6','Rzucasz trzy razy uczciwą monetą. Jakie jest prawdopodobieństwo, że orzeł wypadnie dokładnie dwa razy?',['1/2','2/3','3/8','1/4'],2,'Jest 8 jednakowo prawdopodobnych ciągów. Pasują OOR, ORO i ROO — trzy: <b>3/8</b>.'),
 q('chance-7','Losowo wybierasz jedną liczbę dwucyfrową, każdą z jednakową szansą. Jakie jest prawdopodobieństwo, że obie jej cyfry są takie same?',['1/10','1/9','9/100','1/11'],0,'Liczb od 10 do 99 jest 90. Pasuje 9 liczb: 11, 22, …, 99. 9/90 = <b>1/10</b>.'),
 q('chance-8','W pudełku są 4 białe i 6 czarnych kulek, poza kolorem jednakowych. Ile białych kulek trzeba dołożyć, aby szansa wylosowania białej wynosiła 1/2?',['1','4','6','2'],3,'Przy szansie 1/2 kulek białych i czarnych musi być tyle samo. Trzeba zwiększyć liczbę białych z 4 do 6, czyli dołożyć <b>2</b>.'),
 q('chance-9','W pudełku A są 3 złote i 5 srebrnych żetonów. W pudełku B jest 5 złotych i 9 srebrnych. W każdym pudełku żetony różnią się tylko kolorem. Z którego pudełka łatwiej wylosować złoty żeton?',['Z B, bo ma więcej złotych','Z A, bo 3/8 > 5/14','Szanse są równe','Z B, bo 5/14 > 3/8'],1,'Porównujemy udziały, nie same liczby złotych żetonów: 3/8 = 21/56, 5/14 = 20/56. Większą szansę daje <b>pudełko A</b>.'),
 q('chance-10','Rzucasz dwiema uczciwymi sześciennymi kostkami. Jakie jest prawdopodobieństwo, że suma oczek wyniesie 9?',['1/6','1/12','1/9','1/4'],2,'Jest 36 jednakowo prawdopodobnych par. Suma 9: (3,6), (4,5), (5,4), (6,3). 4/36 = <b>1/9</b>.'),
 q('chance-11','W pudełku były 3 czerwone i 2 niebieskie kulki różniące się tylko kolorem. Wyjęto jedną czerwoną i nie włożono jej z powrotem. Teraz losujesz jedną z pozostałych. Jaka jest szansa na niebieską?',['2/5','1/4','2/3','1/2'],3,'Pozostały 2 czerwone i 2 niebieskie kulki. Niebieskie to 2 z 4, więc szansa wynosi <b>1/2</b>.'),
 q('chance-12','Z kart oznaczonych cyframi 1, 2 i 3 losujesz kolejno dwie bez zwracania. Pierwsza cyfra oznacza dziesiątki, druga — jedności. Każde losowanie jest równomierne. Jaka jest szansa uzyskania liczby parzystej?',['1/3','1/2','2/9','2/3'],0,'Możliwe liczby: 12, 13, 21, 23, 31, 32. Parzyste to 12 i 32 — dwie z sześciu: <b>1/3</b>.'),
];
