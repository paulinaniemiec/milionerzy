import { QUESTIONS as original } from './questions.js';
import { diagramQuestions, probabilityQuestions } from './exam-sets.js';

// Każdy wpis ma trwałe ID: zapis gry odtwarza dokładnie te same pytania.
const q = (id, text, answers, correct, explain) => ({ id, sourceGroup: id.replace(/[a-z]+$/, ''), q: text, answers, correct, explain });
const table = (headers, rows, caption) => `<div class="task-table-wrap"><table class="task-table"><caption>${caption}</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((v, i) => i === 0 ? `<th scope="row">${v}</th>` : `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const pair = (id, context, a, b, truth, explain) => q(id, `${context}<div class="task-statements">I. ${a}<br>II. ${b}</div>Wybierz ocenę zdań (P — prawda, F — fałsz).`, ['I: P, II: P', 'I: P, II: F', 'I: F, II: P', 'I: F, II: F'], ['PP','PF','FP','FF'].indexOf(truth), explain);
const strip = '<div class="fraction-strip" role="img" aria-label="Prostokąt podzielony na 7 równych części: 5 zielonych i 2 żółte">' + Array.from({length:7}, (_,i)=>`<span class="${i<5?'green':'yellow'}"></span>`).join('')+'</div>';
const trip = table(['Miejsce','Głosy'], [['Jura Krakowsko-Częstochowska','20%'],['Beskid Żywiecki','25%'],['Pojezierze Suwalskie','28%'],['Kaszuby','?']], 'Wyniki głosowania na wycieczkę');
const attendance = table(['Miesiąc','Frekwencja'], [['IX','92%'],['X','95%'],['XI','96%'],['XII','98%'],['I','97%'],['II','94%'],['III','94%'],['IV','95%'],['V','93%'],['VI','93%']], 'Frekwencja w klasie 7c — dane z diagramu');
const coffee = table(['Kraj','2000 r.','2010 r.'], [['Brazylia','25%','34%'],['Wietnam','10,6%','13,2%'],['Meksyk','4,5%','3%']], 'Udział w światowych zbiorach kawy');
const library = table(['Klasy (liczba uczniów)','X','XI','XII'], [['6 (100)','12%','37%','38%'],['7 (120)','25%','30%','35%'],['8 (125)','68%','44%','48%']], 'Uczniowie wypożyczający książki — dane z diagramu');

const check = [
 q('sp-1a', `${strip}Jaką część całego prostokąta stanowi część zielona?`, ['5/7','2/7','5/2','2/5'],0,'Zielonych jest 5 z 7 równych części, więc stanowią <b>5/7</b> całości.'),
 q('sp-1b', `${strip}Jaki jest stosunek pola części zielonej do pola części żółtej?`, ['5 : 7','2 : 5','5 : 2','7 : 2'],2,'Porównujemy 5 zielonych części z 2 żółtymi: <b>5 : 2</b>. Stosunek 5 : 7 porównuje zieloną część z całością.'),
 q('sp-2a', `${trip}Jaka część uczniów wybrała Jurę Krakowsko-Częstochowską?`, ['Co czwarty','Co piąty','Co drugi','Co dziesiąty'],1,'20% = 1/5, czyli <b>co piąty</b> uczeń.'),
 q('sp-2b', `${trip}Które miejsce wybrało najwięcej uczniów?`, ['Jura Krakowsko-Częstochowska','Beskid Żywiecki','Kaszuby','Pojezierze Suwalskie'],3,'Na Kaszuby oddano 100% − 20% − 25% − 28% = 27%. Największy wynik to <b>28% — Pojezierze Suwalskie</b>.'),
 q('sp-2c', `${trip}Ile procent głosów oddano na Kaszuby?`, ['25%','27%','28%','33%'],1,'100% − (20% + 25% + 28%) = <b>27%</b>.'),
 q('sp-3a','Kwotę podzielono w stosunku 1 : 2 : 2. Jaki procent całości stanowi każda z dwóch większych części?', ['20%','25%','40%','50%'],2,'1 + 2 + 2 = 5 udziałów. Większa część to 2/5 całości, czyli <b>40%</b>.'),
 q('sp-3b','Kwotę podzielono w stosunku 1 : 2 : 2. Najmniejsza część wynosi 300 zł. Ile wynosi cała kwota?', ['600 zł','900 zł','1200 zł','1500 zł'],3,'Jeden udział to 300 zł, a wszystkich jest 5. 5 · 300 zł = <b>1500 zł</b>.'),
 q('sp-4','Podczas 8-godzinnej wycieczki turyści przez 65% czasu szli, przez 1/20 czasu jechali pociągiem, a resztę odpoczywali. Ile trwał odpoczynek?', ['2 h 40 min','2 h 24 min','1 h 20 min','1 h 12 min'],1,'1/20 = 5%. Odpoczynek: 100% − 65% − 5% = 30%. 0,3 · 8 h = 2,4 h = <b>2 h 24 min</b>.'),
 q('sp-5','W szkole jest 868 uczniów, w tym 448 chłopców. Jaki procent uczniów stanowią dziewczęta? Wybierz wynik przybliżony.', ['48%','52%','94%','107%'],0,'Dziewcząt jest 868 − 448 = 420. 420/868 · 100% ≈ <b>48%</b>.'),
 q('sp-6','Pani Paulina dostała podwyżkę równą 24% dotychczasowego wynagrodzenia i zarabia o 1320 zł więcej. Ile zarabia obecnie?', ['316,80 zł','5500 zł','1636,80 zł','6820 zł'],3,'Poprzednia pensja: 1320 : 0,24 = 5500 zł. Nowa: 5500 + 1320 = <b>6820 zł</b>.'),
 q('sp-7','Nocleg kosztował 80 zł. Cenę podniesiono o 25%, a następnie obniżono o 15%. Ile kosztuje nocleg po obu zmianach?', ['70 zł','85 zł','88 zł','100 zł'],1,'80 · 1,25 = 100 zł; 100 · 0,85 = <b>85 zł</b>.'),
 q('sp-8','Spodnie kosztowały 500 zł. Przeceniono je o 20%, a potem jeszcze o 30% nowej ceny. O ile procent łącznie obniżono cenę?', ['50%','56%','44%','6%'],2,'500 · 0,8 · 0,7 = 280 zł. Spadek: 220 zł, czyli 220/500 · 100% = <b>44%</b>. Obniżek nie dodajemy.'),
];

const revision1 = [
 q('z1-1','Na wesele zaproszono 80 gości. Co czwarty ma mniej niż 30 lat. Jaki procent gości stanowią osoby poniżej 30 lat?', ['20%','25%','32%','40%'],1,'Co czwarty to 1/4 = <b>25%</b> (20 spośród 80 osób).'),
 ...[
 ['a','14/25',['14%','25%','56%','140%'],2,'14/25 = 56/100 = <b>56%</b>.'],
 ['b','27/20',['135%','27%','75%','13,5%'],0,'27 : 20 = 1,35 = <b>135%</b>.'],
 ['c','7/4',['28%','175%','75%','700%'],1,'7 : 4 = 1,75 = <b>175%</b>.'],
 ['d','31/40',['31%','40%','7,75%','77,5%'],3,'31 : 40 = 0,775 = <b>77,5%</b>.'],
 ['e','7/8',['87,5%','78%','875%','12,5%'],0,'7 : 8 = 0,875 = <b>87,5%</b>.'],
 ['f','4/3',['75%','125%','133⅓%','1⅓%'],2,'4/3 · 100% = 400/3% = <b>133⅓%</b>.'],
 ].map(([part,f,a,c,e])=>q('z1-2'+part,`Zamień ułamek <b>${f}</b> na procenty.`,a,c,e)),
 q('z1-3','Spośród 250 uczniów 130 chodzi na zajęcia dodatkowe. Jaki to procent uczniów szkoły?', ['48%','52%','65%','13%'],1,'130/250 · 100% = <b>52%</b>.'),
 pair('z1-4ab',attendance,'Najniższa frekwencja była w maju i czerwcu.','Jesienią (we wrześniu, październiku i listopadzie) frekwencja rosła.','FP','Najniższy wynik to <b>92% we wrześniu</b>. Jesienią wyniki rosły: 92%, 95%, 96%. Zatem <b>F, P</b>.'),
 pair('z1-4cd',attendance,'Średnia z miesięcznych frekwencji wynosiła 91%.','W żadnym miesiącu frekwencja nie była równa 97%.','FF','Suma 10 wyników to 947%, a ich średnia to <b>94,7%</b>. W styczniu frekwencja wynosiła <b>97%</b>. Oba zdania są fałszywe.'),
 q('z1-5','Na koncert przyszło 900 osób. Kobiety stanowiły 60% publiczności. Ilu było mężczyzn?', ['540','600','360','180'],2,'Mężczyźni stanowili 40% publiczności: 0,4 · 900 = <b>360</b>.'),
 q('z1-6ab','60% uczniów wybrało język niemiecki, pozostali — hiszpański. O ile procent więcej osób wybrało niemiecki niż hiszpański?', ['20%','40%','50%','60%'],2,'Hiszpański: 40%. Różnicę 20 odnosimy do 40: 20/40 · 100% = <b>50%</b>. Stwierdzenie „o 20% więcej” jest fałszywe.'),
 q('z1-6c','Niemiecki wybrało 60% uczniów, a hiszpański 40%. O ile punktów procentowych wyższy jest odsetek wybierających niemiecki?', ['20 p.p.','50 p.p.','40 p.p.','100 p.p.'],0,'60% − 40% = <b>20 punktów procentowych</b>.'),
 q('z1-7','Kasia ma kupon dający 15% zniżki przy zakupach powyżej 50 zł. Jej koszyk kosztuje 65 zł. Ile zapłaci z kuponem?', ['50 zł','60 zł','55,25 zł','9,75 zł'],2,'Warunek 65 zł > 50 zł jest spełniony. 65 · 0,85 = <b>55,25 zł</b>.'),
 q('z1-8a','Asia zdobyła 60 punktów na 80 możliwych. Mira zdobyła o 5% punktów więcej niż Asia. Ile punktów zdobyła Mira?', ['64','63','65','75'],1,'5% z 60 to 3 punkty. 60 + 3 = <b>63</b>. Procent odnosimy do wyniku Asi, nie do 80.'),
 q('z1-8b','Asia zdobyła 60 punktów na 80 możliwych. Jola zdobyła o 5% punktów mniej niż Asia. Ile punktów zdobyła Jola?', ['55','56','59','57'],3,'0,95 · 60 = <b>57 punktów</b>.'),
 q('z1-9','Rodziny 4-osobowa i 5-osobowa dzielą koszt wycieczki 10 620 zł proporcjonalnie do liczby osób. Ile płacą odpowiednio?', ['4720 zł i 5900 zł','5310 zł i 5310 zł','4248 zł i 6372 zł','4800 zł i 5820 zł'],0,'Łącznie 9 osób: 10 620 : 9 = 1180 zł na osobę. 4 · 1180 = <b>4720 zł</b>; 5 · 1180 = <b>5900 zł</b>.'),
 q('z1-10','Podczas pobytu Ani w Szkocji deszcz padał przez 27 dni, czyli przez 90% pobytu. Ile dni trwał pobyt?', ['24','27','30','36'],2,'27 : 0,9 = <b>30 dni</b>.'),
 q('z1-11a',`${coffee}O ile punktów procentowych wzrósł udział Wietnamu i o ile zmalał udział Meksyku?`, ['2,6 p.p. i 1,5 p.p.','3,6 p.p. i 1,5 p.p.','2,6 p.p. i 3 p.p.','26 p.p. i 15 p.p.'],0,'Wietnam: 13,2 − 10,6 = <b>2,6 p.p.</b> Meksyk: 4,5 − 3 = <b>1,5 p.p.</b>'),
 q('z1-11b',`${coffee}O ile procent wzrósł udział Brazylii w światowych zbiorach kawy?`, ['9%','25%','34%','36%'],3,'Przyrost 34 − 25 = 9 punktów procentowych. Względem początkowych 25%: 9/25 · 100% = <b>36%</b>.'),
 pair('z1-12','Oceń dwa zdania.','Liczba 18 stanowi 30% liczby 60.','Liczba 18 stanowi 180% liczby 10.','PP','0,3 · 60 = 18 oraz 1,8 · 10 = 18. <b>Oba zdania są prawdziwe</b>.'),
 q('z1-13','Paczka terakoty kosztuje 32 zł netto. Ile wynosi cena z 23% VAT?', ['39,36 zł','35,20 zł','55 zł','7,36 zł'],0,'32 · 1,23 = <b>39,36 zł</b>.'),
 q('z1-14','Ile cukru i wody trzeba zmieszać, aby otrzymać 120 g roztworu cukru o stężeniu 15%?', ['15 g i 105 g','18 g i 102 g','20 g i 100 g','18 g i 120 g'],1,'Cukier: 0,15 · 120 = <b>18 g</b>. Woda: 120 − 18 = <b>102 g</b>.'),
 q('z1-15','Które wyrażenie oznacza liczbę o 17% mniejszą od 856,24?', ['0,17 · 856,24','1,17 · 856,24','0,83 · 856,24','1,83 · 856,24'],2,'Po zmniejszeniu o 17% zostaje 83% liczby: <b>0,83 · 856,24</b>.'),
 q('z1-16','Na 4 porcje lemoniady potrzeba 2 pomarańczy i 6 nasion kardamonu. Ile potrzeba na 18 porcji?', ['8 pomarańczy i 24 nasiona','9 pomarańczy i 27 nasion','18 pomarańczy i 54 nasiona','6 pomarańczy i 18 nasion'],1,'18 : 4 = 4,5. Mnożymy składniki przez 4,5: <b>9 pomarańczy i 27 nasion</b>.'),
];

const revision2 = [
 q('z2-1','35% pewnej liczby to:', ['0,65 tej liczby','0,035 tej liczby','7/20 tej liczby','20/7 tej liczby'],2,'35% = 35/100 = <b>7/20</b>.'),
 q('z2-2a','Jakim procentem roku jest kwartał?', ['3%','12%','25%','33⅓%'],2,'Kwartał to 3 z 12 miesięcy: 3/12 = 1/4 = <b>25%</b>.'),
 q('z2-2b','Jakim procentem doby jest 9 godzin?', ['9%','37,5%','40%','62,5%'],1,'9/24 · 100% = <b>37,5%</b>.'),
 q('z2-2c','Jakim procentem godziny zegarowej jest 45-minutowa lekcja?', ['45%','60%','75%','80%'],2,'45/60 = 3/4 = <b>75%</b>.'),
 q('z2-2d','Jakim procentem siedmiodniowego tygodnia jest 5 dni roboczych? Zaokrąglij do jednego miejsca po przecinku.', ['50,0%','70,0%','28,6%','71,4%'],3,'5/7 · 100% ≈ <b>71,4%</b>.'),
 q('z2-3','Książka kosztowała 36 zł. Cenę obniżono o 15%, a potem podniesiono o 15%. Ile wynosi cena końcowa?', ['36 zł','35,19 zł','30,60 zł','41,40 zł'],1,'36 · 0,85 = 30,60 zł; 30,60 · 1,15 = <b>35,19 zł</b>. Podwyżka ma inną podstawę niż obniżka.'),
 q('z2-4','W zadaniu przyjmij, że białko stanowi 2% masy awokado. Ile gramów awokado zawiera 75 g białka?', ['150 g','1500 g','375 g','3750 g'],3,'0,02 · masa = 75 g, więc masa = 75 : 0,02 = <b>3750 g</b>.'),
 q('z2-5a',`${library}Ilu ósmoklasistów wypożyczyło książki w październiku?`, ['68','85','80','95'],1,'0,68 · 125 = <b>85 uczniów</b>.'),
 q('z2-5b',`${library}Ilu uczniów klas 6–8 wypożyczyło książki w listopadzie?`, ['111','125','128','135'],2,'Klasy 6: 37; klasy 7: 0,3 · 120 = 36; klasy 8: 0,44 · 125 = 55. Razem 37 + 36 + 55 = <b>128</b>.'),
 q('z2-5c',`${library}W grudniu książki wypożyczyło więcej szóstoklasistów czy siódmoklasistów i o ile osób?`, ['Szóstoklasistów o 3','Siódmoklasistów o 3','Szóstoklasistów o 4','Siódmoklasistów o 4'],3,'Klasy 6: 0,38 · 100 = 38; klasy 7: 0,35 · 120 = 42. <b>Siódmoklasistów o 4 więcej</b>.'),
 q('z2-6','Opakowanie soczewek kosztuje 129,60 zł z 8% VAT. Ile kosztowałoby z 23% VAT przy tej samej cenie netto?', ['147,60 zł','149,04 zł','159,41 zł','120 zł'],0,'Cena netto: 129,60 : 1,08 = 120 zł. Z nowym VAT: 120 · 1,23 = <b>147,60 zł</b>.'),
 q('z2-7a','Spośród 25 osób 19 spędzi sylwestra z przyjaciółmi, a 8% — w domu. Ile osób spędzi go w domu?', ['6','8','2','4'],2,'8% · 25 = <b>2 osoby</b>, a nie 6.'),
 q('z2-7b','Spośród 25 osób 19 spędzi sylwestra z przyjaciółmi, 8% — w domu, a reszta jeszcze nie wie. Jaki procent stanowi ta ostatnia grupa?', ['15%','16%','24%','8%'],1,'W domu: 2 osoby. Niezdecydowani: 25 − 19 − 2 = 4. 4/25 · 100% = <b>16%</b>, a nie 15%.'),
 q('z2-8','Asia dodała 10 g cukru do 150 g herbaty, a Kasia 15 g cukru do 235 g herbaty. Który napój ma większe stężenie cukru i dlaczego?', ['Asi, bo 10/150 > 15/235','Kasi, bo 10/150 < 15/235','Asi, bo 10/160 > 15/250','Kasi, bo 10/160 < 15/250'],2,'Liczymy masę całego napoju po dodaniu cukru. Asia: 10/160 = 6,25%; Kasia: 15/250 = 6%. <b>Większe stężenie ma napój Asi</b>; poprawne uzasadnienie uwzględnia cukier w masie roztworu.'),
 pair('z2-9ab','Drut długości 3 m podzielono na trzy części. Pierwsza ma 70 cm, druga ma 140% długości pierwszej.','Druga część jest dłuższa od pierwszej o 40%.','Pierwsza część jest krótsza od drugiej o 40%.','PF','Druga część: 1,4 · 70 = 98 cm. Jest dłuższa o 28/70 = 40%. Pierwsza jest krótsza o 28/98 ≈ 28,6%. Zatem <b>P, F</b>.'),
 q('z2-9c','Drut ma 3 m. Pierwsza część ma 70 cm, a druga 140% długości pierwszej. Jaką część całego drutu stanowi w przybliżeniu druga część?', ['1/2','1/3','1/4','2/3'],1,'Druga część ma 98 cm. 98/300 ≈ 0,327, czyli około <b>1/3</b> całego drutu.'),
 q('z2-10',`${table(['Powierzchnia (m²)','Cena (tys. zł)'],[['30','120'],['60','180'],['80','200'],['90','225'],['100','250']],'Powierzchnie i ceny mieszkań')}Czy cena mieszkania jest wprost proporcjonalna do powierzchni?`, ['Tak, bo większe mieszkania są droższe','Tak, bo wszystkie ceny są dodatnie','Nie, bo cena za m² nie jest stała','Nie, bo powierzchnie są różne'],2,'120 : 30 = 4 tys. zł/m², a 180 : 60 = 3 tys. zł/m². Iloraz ceny i powierzchni nie jest stały, więc <b>nie ma proporcjonalności</b>.'),
 q('z2-11',`Zdjęcie o szerokości 15 cm i wysokości 10 cm powiększono z zachowaniem proporcji. Nowa szerokość to 21 cm. Ile wynosi wysokość <i>x</i>?<div class="photo-scale" role="img" aria-label="Dwa prostokąty o proporcjonalnych wymiarach: 15 na 10 cm i 21 na x cm"><span>15 × 10 cm</span><b>→</b><span>21 × x cm</span></div>`, ['12 cm','14 cm','16 cm','31,5 cm'],1,'Skala: 21 : 15 = 1,4. Wysokość: 10 · 1,4 = <b>14 cm</b>.'),
 q('z2-12','Agata pracowała w ogrodzie od 9.00, Marek od 10.00, a Zbyszek od 11.00. Wszyscy skończyli o 12.00. Jak podzielić 54 zł proporcjonalnie do czasu pracy (Agata, Marek, Zbyszek)?', ['18 zł, 18 zł, 18 zł','24 zł, 20 zł, 10 zł','30 zł, 18 zł, 6 zł','27 zł, 18 zł, 9 zł'],3,'Czas pracy: 3 h, 2 h i 1 h. Łącznie 6 h, więc 54 : 6 = 9 zł/h. Wypłaty: <b>27 zł, 18 zł, 9 zł</b>.'),
];

export const SCENARIOS = [
 // Przy dodawaniu kolejnego scenariusza zapytaj właścicielkę, do której klasy go przypisać.
 {id:'diagrams', grade:8, title:'Diagramy i wykresy', description:'Nowe zadania w stylu egzaminu ósmoklasisty. Każde z innym wykresem.', questions:diagramQuestions},
 {id:'probability', grade:8, title:'Prawdopodobieństwo', description:'Nowe zadania w stylu egzaminu ósmoklasisty. Kostki, losy, monety i szanse.', questions:probabilityQuestions},
 {id:'original', grade:8, title:'Przygotowanie do egzaminu', description:'Liczby, algebra i geometria. Dotychczasowy zestaw.', questions:original.map((v,i)=>({...v,id:`original-${i+1}`,sourceGroup:`original-${i+1}`}))},
 {id:'check', grade:7, title:'Procenty na rozgrzewkę', description:'„Sprawdź, czy potrafisz”. Ułamki, podziały i ceny.', questions:[...check, revision1.find(q=>q.id==='z1-1'), revision1.find(q=>q.id==='z1-7'), revision1.find(q=>q.id==='z1-14'), revision2.find(q=>q.id==='z2-11')]},
 {id:'revision-1', grade:7, title:'Procenty w życiu, zestaw 1', description:'„Powtórzenie I”. Rabaty, frekwencja, proporcje i VAT.', questions:revision1},
 {id:'revision-2', grade:7, title:'Procenty w praktyce, zestaw 2', description:'„Powtórzenie I”. Diagramy, stężenia, skala i podział kosztów.', questions:revision2},
];
function shuffle(items, random) {
 const result = [...items];
 for (let i=result.length-1;i>0;i--) {
   const j=Math.floor(random()*(i+1));
   [result[i],result[j]]=[result[j],result[i]];
 }
 return result;
}
export function makeRound(scenario, random = Math.random) {
 const groups = new Map();
 for (const question of scenario.questions) {
   const key = question.sourceGroup;
   if (!groups.has(key)) groups.set(key, []);
   groups.get(key).push(question);
 }
 if (groups.size < 12) throw new Error('Scenariusz wymaga 12 różnych zadań źródłowych');
 // Jeden podpunkt z danego zadania. Nigdy drugi raz ten sam wykres/tabela.
 const selected = shuffle([...groups.values()], random).slice(0,12);
 return selected.map(variants => variants[Math.floor(random()*variants.length)]);
}
export function restoreRound(save) {
 const scenario=SCENARIOS.find(s=>s.id===(save.scenarioId || 'original'));
 if (!scenario) return null;
 const ids=save.questionIds || (scenario.id==='original' ? scenario.questions.map(q=>q.id) : []);
 if (ids.length!==12 || new Set(ids).size!==12) return null;
 const questions=ids.map(id=>scenario.questions.find(q=>q.id===id));
 return questions.every(Boolean) ? {scenario,questions} : null;
}
