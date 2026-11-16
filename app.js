'use strict';
const INITIAL={
life:['Higiena poranna','Higiena wieczorna','Pościelenie łóżka','Spacer','Trening siłowy','Mobilność i rozciąganie','Równowaga','Nauka tańca','Posiłki i odżywianie','Suplementy według zaleceń','Ważenie','Sen i regeneracja','Zakupy','Lista zakupów','Pranie','Zmiana pościeli','Sprzątanie','Porządek 5 minut','Sprawy urzędowe','Finanse osobiste','Rodzina i znajomi','Opieka nad psem','Warsztat samochodowy','Audi 80 B4','Mitsubishi Pajero IV','Czas wolny i hobby'],
work:['Praca w biurze','Praca z domu','Praca projektowa','Spotkania i ustalenia','Administracja i organizacja','Praca kreatywna','Głębokie skupienie','Przegląd wykonanej pracy'],
academy:['Dykcja','Artykulacja','Emisja głosu','Oddech','Śpiew i intonacja','Słownictwo polskie','Angielski','Spontaniczna wypowiedź','Argumentacja','Charyzma','Komunikacja interpersonalna','Psychologia','Stres i strach','Praca z trudnymi ludźmi','Przywództwo','Perswazja','Storytelling','Pisanie — warsztat','Czytanie książek','Dyscyplina i nawyki','Produktywność','Programowanie — nauka','Blender — nauka','Animacja 3D — nauka','Fotografia — nauka','Film i montaż — nauka','Fotogrametria','Gaussian Splatting','Druk 3D — nauka'],
projects:['Prison Escape Game','CircleGrind','NightTower','ScrapSpace','Stunt','Syndrome','MagicKeys','NoteCoach','Dron','Favoritka','Green Rack','Gruz','Light&Sound','Line Camera Rig','Atlantis Scene','Escape by Water','Fog Farm','Hey Mambo Commercial','InsideStory Intro','Selena — 3D Character','An Office Without Humanity','Hidi','No Man’s Land','Selena — Graphic Novel','The Graveyard','The Mockingbird','OLIMP AI 1.0','Cyberdeck 1.0','Schuette — Plissees','Schuette — Vorhänge','Schuette — Bettwäsche','Figurki i modele do druku 3D']};
// Compact, non-overlapping quick-log presets. Minutes are fixed per tap.
const QUICK={
 life:[['Poranna rutyna',15],['Wieczorna rutyna',15],['Sprzątanie',15],['Zakupy i sprawunki',30],['Sprawy domowe',30],['Relacje i bliscy',30],['Odpoczynek',30]],
 work:[['Praca — 30 minut',30,15],['Praca — krótka zmiana',240,60],['Praca — pełna zmiana',480,100],['Dzień wolny',0,0]],
 academy:[['Czytanie',30],['Nauka',30],['Język obcy',15],['Ćwiczenia głosu',15],['Rozwój komunikacji',15]],
 projects:[['Praca nad projektem',30],['Projektowanie',30],['Tworzenie 3D',30],['Programowanie',30],['Majsterkowanie',30]],
 fitness:[['Spacer',30],['Trening',30],['Mobilność',15],['Rower',30],['Bieganie',30],['Regeneracja ruchowa',15]]
};
const FITNESS=['Trening siłowy','Mobilność i rozciąganie','Spacer','Ćwiczenia na równowagę','Joga i rozciąganie','Pompki','Ćwiczenia z hantlami','Ćwiczenia z gumami oporowymi','Trening core','Rolowanie i regeneracja','Rower','Bieg lub marsz','Nauka tańca'];
INITIAL.fitness=FITNESS;
const C={fitness:['♜','Sprawność fizyczna',14],life:['☼','Codzienność',12],work:['◈','Praca i skupienie',10],academy:['✧','Akademia',16],projects:['⚒','Warsztat twórcy',20]};
const ROT={0:'Odpoczynek i opcjonalny przegląd tygodnia',1:'Trening, DEV i czytanie',2:'Mobilność, 3D i angielski',3:'Trening, dowolny projekt i czytanie',4:'Spacer, DEV i angielski',5:'Trening, 3D i czytanie',6:'Odpoczynek i spacer, jeśli masz ochotę'};
const APP_VERSION='3.5.0';const KEY='quest-personal-rpg-v1';const clone=x=>JSON.parse(JSON.stringify(x));const fresh=()=>({library:clone(INITIAL),entries:[],modes:{},boundary:5});
let data;try{data=JSON.parse(localStorage.getItem(KEY));if(!data||!data.library||!Array.isArray(data.entries))data=fresh()}catch{data=fresh()}
data={...fresh(),...data};data.library={...clone(INITIAL),...data.library};let view='today',tab='life';
const ATTRS=[['knowledge','Wiedza','#9D8CFF','◈'],['charisma','Charyzma','#F3A4CF','✧'],['habits','Nawyki','#6ED4D1','◉'],['fitness','Kondycja','#F2A46F','◆'],['skills','Umiejętności','#A5CF76','⬡']];
const ATTR_KEYS=ATTRS.map(a=>a[0]);
data.attributeRules=data.attributeRules||{};
data.dailyGoal=Number.isFinite(+data.dailyGoal)&&+data.dailyGoal>0?+data.dailyGoal:60;
function defaultPoints(cat,name){
 const n=String(name).toLowerCase(),p={knowledge:0,charisma:0,habits:0,fitness:0,skills:0};
 if(cat==='academy'){p.knowledge=5;p.habits=2}
 if(cat==='work'){p.habits=5;p.knowledge=2}
 if(cat==='life'){p.habits=3;p.habits=2}
 if(cat==='fitness'){p.fitness=5;p.habits=2}
 if(cat==='projects'){p.skills=5;p.knowledge=2;p.habits=1}
 if(/warsztat|audi|pajero|samochod|napraw|mechanik/i.test(n)){p.knowledge=2;p.habits=3;p.skills=2;p.fitness=0}
 if(/dykc|artykul|głos|śpiew|komunik|charyzm|argument|perswaz|relac|wystąp|rozmow|przywództw/i.test(n)){p.charisma=5;p.knowledge=2;p.habits=1}
 if(/czytan|książ|angiel|programow|blender|nauk|psycholog|słownictw/i.test(n)){p.knowledge=5;p.habits=2}
 if(/higien|kąpiel|prysznic|zęb|sprząt|prani|pościel|porządek|pielęgnac/i.test(n)){p.habits=5;p.habits=2}
 if(/trening|spacer|mobilno|joga|równowag|hantl|guma|bieg|rower|pomp|rozciąg|core|taniec/i.test(n)){p.fitness=5;p.habits=2;p.habits=0}
 return p;
}
function normalizePoints(raw,cat,name){const p={...defaultPoints(cat,name)};if(!raw)return p;for(const k of ATTR_KEYS){if(Object.prototype.hasOwnProperty.call(raw,k))p[k]=Math.max(0,+raw[k]||0)}
if(!Object.prototype.hasOwnProperty.call(raw,'habits')&&(raw.hygiene!==undefined||raw.discipline!==undefined))p.habits=Math.max(0,+raw.hygiene||0)+Math.max(0,+raw.discipline||0);
if(!Object.prototype.hasOwnProperty.call(raw,'skills')&&cat==='projects')p.skills=Math.max(0,(+raw.knowledge||0)+(+raw.discipline||0));
return p}
function points(cat,name){return normalizePoints(data.attributeRules[cat+'::'+name],cat,name)}
function entryPoints(e){return e.attributes&&typeof e.attributes==='object'?normalizePoints(e.attributes,e.cat,e.activity):points(e.cat,e.activity)}
function totals(items){let t=Object.fromEntries(ATTR_KEYS.map(k=>[k,0]));items.forEach(e=>{let p=entryPoints(e);ATTR_KEYS.forEach(k=>t[k]+=Math.max(0,+p[k]||0))});return t}
function tubes(items,compact=false){const t=totals(items);return '<div class="attribute-tubes '+(compact?'mini':'')+'">'+ATTRS.map(([key,name,color,icon])=>{const value=t[key],fill=value%100,level=1+Math.floor(value/100);return '<div class="attribute-unit" style="--liquid:'+color+'"><div class="tube-number">'+value+'</div><div class="tube"><div class="liquid" style="height:'+fill+'%"></div><span class="tube-symbol">'+icon+'</span></div><b>'+name+'</b><small>Poziom '+level+'</small></div>'}).join('')+'</div>'}
function attributeEditor(cat,name){let p=points(cat,name);modal('<div class="modalhead"><h2>Punkty atrybutów</h2><button class="iconbtn" data-close="1">×</button></div><p class="muted">'+h(name)+' · '+C[cat][1]+'</p><form id="attributeform">'+ATTRS.map(([key,label,color])=>'<label class="attribute-input"><span style="color:'+color+'">'+label+'</span><input type="number" min="0" max="20" step="1" name="'+key+'" value="'+(+p[key]||0)+'" required></label>').join('')+'<button class="primary" type="submit">Zapisz punktację</button></form><p class="muted">Nawyki łączą dawną Higienę i Dyscyplinę. Umiejętności rosną głównie dzięki projektom. Zmiana zasad dotyczy przyszłych wpisów.</p>');document.getElementById('attributeform').onsubmit=e=>{e.preventDefault();let p={};ATTR_KEYS.forEach(k=>p[k]=Math.max(0,Math.min(20,Math.round(+e.target.elements[k].value||0))));data.attributeRules[cat+'::'+name]=p;save();document.getElementById('overlay').remove();render()}}
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]));const pad=n=>String(n).padStart(2,'0');
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function today(){let d=new Date();if(d.getHours()<(data.boundary??5))d.setDate(d.getDate()-1);return iso(d)}
function nice(s){return new Date(s+'T12:00:00').toLocaleDateString('pl-PL',{weekday:'long',day:'numeric',month:'long'})}
function xp(e){return Number.isFinite(e.xpAward)?Math.max(0,e.xpAward):Math.round(C[e.cat][2]+Math.min(120,Math.max(0,+e.minutes||0))*.5)}
function sum(arr,fn){return arr.reduce((a,x)=>a+fn(x),0)}
function entries(date){return data.entries.filter(e=>e.date===date)}

const ICONS={recipes:'♨',today:'⌂',stats:'▥',projects:'▦',settings:'⚙',life:'☀',work:'◈',academy:'✧',projectsCat:'◇'};
function head(){const d=today(),all=sum(data.entries,xp),lvl=1+Math.floor(all/300);return '<header class="topbar"><div><div class="eyebrow">QUEST <span class="version">'+APP_VERSION+'</span></div><h1>'+({today:'Dzisiaj',stats:'Statystyki',projects:'Projekty',settings:'Ustawienia',recipes:'Przepisy',workout:'Trening'}[view])+'</h1></div><div class="level"><span class="level-icon">✦</span><div><strong>LVL '+lvl+'</strong><small>'+all%300+' / 300 XP</small></div></div></header>'}
function bottom(){return '<nav class="bottomnav" aria-label="Nawigacja główna">'+[['today','Dzisiaj'],['stats','Statystyki'],['projects','Projekty'],['settings','Ustawienia']].map(([id,t])=>'<button aria-label="'+t+'" class="navitem '+(view===id?'active':'')+'" data-view="'+id+'"><span class="navicon">'+ICONS[id]+'</span><span>'+t+'</span></button>').join('')+'</nav>'}
function entry(e){return '<div class="entry"><div class="entrytext"><strong>'+h(e.activity)+'</strong><small>'+C[e.cat][1]+' · '+(+e.minutes||0)+' min'+(e.note?' · '+h(e.note):'')+'</small></div><div class="entryright"><b>+'+xp(e)+' XP</b><button class="iconbtn" data-delete="'+h(e.id)+'" aria-label="Usuń wpis">×</button></div></div>'}
const WORKOUT_START='2026-10-05';
const WORKOUT_NAMES=['Siła i stabilizacja','Core i równowaga','Góra ciała i postawa','Nogi i mobilność','Całe ciało','Lekki ruch i rozciąganie','Regeneracja i równowaga'];
const EX=(name,seconds,sets=1,reps='')=>({name,seconds,sets,reps});
const WORKOUTS=[
 [EX('Cat–Cow',60),EX('Pompki',40,2,'8 powt.'),EX('Bird Dog',50,2,'8 / strona'),EX('Glute Bridge',45,2,'12 powt.'),EX('Wiosłowanie gumą',45,2,'12 powt.'),EX('Dysk równoważny',120),EX('Rozciąganie tyłu nóg',30,2),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Pompki',45,2,'9 powt.'),EX('Bird Dog',55,2,'9 / strona'),EX('Glute Bridge',45,2,'12 powt.'),EX('Wiosłowanie gumą',45,2,'12 powt.'),EX('Plank',30,2),EX('Dysk równoważny',120),EX('Rozciąganie tyłu nóg',30,2),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Pompki',45,2,'10 powt.'),EX('Bird Dog',55,2,'10 / strona'),EX('Glute Bridge',50,2,'15 powt.'),EX('Wiosłowanie gumą',50,2,'15 powt.'),EX('Plank',30,2),EX('Dysk równoważny',120),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Przysiady',50,2,'15 powt.'),EX('Glute Bridge',50,2,'18 powt.'),EX('Dead Bug',55,2,'10 / strona'),EX('Plank boczny',40,2,'20 s / strona'),EX('Dysk równoważny',120),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Pompki',50,2,'10–12 powt.'),EX('Przysiady',50,2,'15 powt.'),EX('Wiosłowanie gumą',50,2,'15 powt.'),EX('Bird Dog',55,2,'10 / strona'),EX('Plank',35,2),EX('Dysk równoważny',120),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Mobilność bioder',60,2),EX('Rozciąganie tyłu nóg',40,2),EX('Bird Dog',50,2,'10 / strona'),EX('Dysk równoważny',120),EX('Child’s Pose',60)],
 [EX('Cat–Cow',60),EX('Spokojny marsz w miejscu',120),EX('Mobilność kręgosłupa',60,2),EX('Dysk równoważny',120),EX('Rozciąganie tyłu nóg',40,2),EX('Child’s Pose',60)]
];
let workoutTimer=null,workoutRemaining=0,workoutSequence=[],workoutIndex=0,workoutRunning=false;
function workoutDay(){const a=new Date(WORKOUT_START+'T12:00:00'),b=new Date(today()+'T12:00:00');return ((Math.round((b-a)/86400000)%7)+7)%7}
function workoutView(){let day=workoutDay(),list=WORKOUTS[day];return '<div class="workout-screen"><button class="quietbtn" data-view="today">‹ Wróć do dnia</button><section class="contentcard workout-hero"><div class="eyebrow">TWÓJ CYKL · TRENING '+(day+1)+'/7</div><h2>'+WORKOUT_NAMES[day]+'</h2><p>Ćwiczenia na macie, z gumą i dyskiem równoważnym. Bez hantli.</p><div class="workout-meta"><span>'+list.length+' ćwiczeń</span><span>Przerwy: 20–30 s</span></div><button class="primary workout-start" data-workout-start="1">▶ Rozpocznij trening z timerem</button></section><section class="contentcard"><h2>Dzisiejszy zestaw</h2>'+list.map((x,i)=>'<div class="workout-exercise"><span class="workout-order">'+(i+1)+'</span><div><b>'+h(x.name)+'</b><small>'+x.sets+' × '+(x.reps||x.seconds+' s')+'</small></div><span>'+x.seconds+' s</span></div>').join('')+'</section><p class="muted">Zestawy 3–7 są roboczym odwzorowaniem wcześniejszego cyklu. Możemy je doprecyzować. Timer odlicza czas, a liczbę powtórzeń traktuj jako wskazówkę.</p></div>'}
function workoutStop(){if(workoutTimer!==null){clearInterval(workoutTimer);workoutTimer=null}workoutRunning=false}
function workoutStart(){workoutStop();const list=WORKOUTS[workoutDay()];workoutSequence=[];list.forEach((ex,i)=>{for(let j=0;j<ex.sets;j++){workoutSequence.push({name:ex.name,seconds:ex.seconds,reps:ex.reps,type:'exercise'});if(j<ex.sets-1||i<list.length-1)workoutSequence.push({name:'Przerwa',seconds:j<ex.sets-1?20:30,type:'rest'})}});workoutIndex=0;workoutRemaining=workoutSequence[0].seconds;workoutTimerModal()}
function workoutTimerModal(){document.getElementById('overlay')?.remove();modal('<div class="modalhead"><h2>Trening · timer</h2><button class="iconbtn" data-workout-exit="1">×</button></div><div class="workout-timer"><div class="eyebrow" id="timer-kind"></div><h2 id="timer-name"></h2><div class="timer-clock" id="timer-clock">00:00</div><p id="timer-reps" class="muted"></p><p id="timer-progress" class="muted"></p><div class="timer-actions"><button data-workout-toggle="1" id="timer-toggle" class="primary">▶ Start</button><button data-workout-next="1">Pomiń ›</button></div></div>');workoutPaint()}
function workoutPaint(){let x=workoutSequence[workoutIndex];if(!x)return;const put=(id,v)=>{let el=document.getElementById(id);if(el)el.textContent=v};put('timer-kind',x.type==='rest'?'ODPOCZYNEK':'ĆWICZENIE');put('timer-name',x.name);put('timer-clock',pad(Math.floor(workoutRemaining/60))+':'+pad(workoutRemaining%60));put('timer-reps',x.reps||'');put('timer-progress',(workoutIndex+1)+' / '+workoutSequence.length);put('timer-toggle',workoutRunning?'Ⅱ Pauza':'▶ Start')}
function workoutNext(){workoutStop();workoutIndex++;if(workoutIndex>=workoutSequence.length){document.getElementById('overlay')?.remove();if(confirm('Trening ukończony! Zapisać go w dzisiejszych aktywnościach?')){let name='Trening '+(workoutDay()+1)+' — '+WORKOUT_NAMES[workoutDay()];data.entries.push({id:crypto.randomUUID?.()||String(Date.now()),cat:'fitness',activity:name,date:today(),minutes:20,attributes:points('fitness',name),note:'Ukończony zestaw QUEST'});save();render()}return}workoutRemaining=workoutSequence[workoutIndex].seconds;workoutPaint();workoutToggle()}
function workoutToggle(){if(workoutRunning){workoutStop();workoutPaint();return}workoutRunning=true;workoutPaint();workoutTimer=setInterval(()=>{if(workoutRemaining>0)workoutRemaining--;workoutPaint();if(workoutRemaining===0)workoutNext()},1000)}
function recommendations(d){
 const day=new Date(d+'T12:00:00').getDay(),y=new Date(d+'T12:00:00');y.setDate(y.getDate()-1);
 const yesterday=entries(iso(y)),mins=sum(yesterday,e=>+e.minutes||0),n=yesterday.length;
 const strenuous=yesterday.some(e=>e.cat==='fitness'&&/siłow|hantl|pomp|bieg|trening core/i.test(e.activity));
 const active=n>=5||mins>=240,quiet=n>0&&n<=2&&mins<90;
 const weekend=day===0||day===6;
 const workOff=entries(d).some(e=>e.cat==='work'&&e.activity==='Dzień wolny');
 let suggestions=[];
 if(!n)suggestions.push({cat:'life',title:'Zacznij spokojnie',desc:'Brak wczorajszych wpisów — bez zakładania, że był to wolny dzień.'});
 else if(active)suggestions.push({cat:'life',title:'Zadbaj o regenerację',desc:'Wczoraj: '+n+' aktywności, '+mins+' min. Dziś wybierz lżejsze tempo.'});
 else if(quiet)suggestions.push({cat:'life',title:'Dziś możesz rozwinąć tempo',desc:'Wczoraj zapisano '+n+' aktywności. Wybierz jedną rzecz więcej, jeśli masz energię.'});
 else suggestions.push({cat:'life',title:'Utrzymaj dobry rytm',desc:'Wczoraj: '+n+' aktywności. Postaw na regularność.'});
 suggestions.push(strenuous?{cat:'fitness',title:'Mobilność lub lekki spacer',desc:'Po wczorajszym wysiłku siłowym proponuję lżejszy ruch.'}:{cat:'fitness',title:active?'Spacer i rozciąganie':'Krótki trening lub spacer',desc:active?'Regeneracyjny ruch bez presji.':'Wybierz aktywność dopasowaną do samopoczucia.'});
 if(weekend)suggestions.push({cat:'academy',title:'Czytanie albo pełen odpoczynek',desc:'Weekend — rozwój jest opcjonalny.'});
 else {const topics={1:'Psychologia i komunikacja',2:'Angielski',3:'Dykcja i argumentacja',4:'Nauka techniczna',5:'Pisanie i kreatywność'};suggestions.push({cat:'academy',title:topics[day]||'Czytanie',desc:active?'Wystarczy 5–10 minut.':'Proponuję 20 minut: głos, czytanie i słownictwo.'})}
 if(!weekend&&!workOff&&!active)suggestions.push({cat:'work',title:'Jeden konkretny rezultat',desc:'Wybierz ważne zadanie zamiast sztywnego harmonogramu.'});
 return suggestions.slice(0,3);
}
function suggestModal(){let d=today();modal('<div class="modalhead"><h2>Propozycje na dziś</h2><button class="iconbtn" data-close="1">×</button></div><p class="muted">Wskazówki na podstawie dnia tygodnia i zapisanych aktywności. Nie są obowiązkami.</p>'+recommendations(d).map(x=>'<button class="suggestion-item" data-add="'+x.cat+'"><b>'+h(x.title)+'</b><small>'+h(x.desc)+'</small><span>Dodaj aktywność ＋</span></button>').join(''))}
let todayLogOpen=false;
function todayView(){
 const d=today(),a=entries(d),tip=recommendations(d)[0];
 const earned=sum(a,xp),goal=data.dailyGoal||60,percent=Math.min(100,Math.round(earned/goal*100));
 const cats=[['life','☀','Codzienność'],['work','◈','Praca'],['academy','✧','Akademia'],['projects','◇','Twórczość'],['fitness','♜','Sprawność']];
 return '<div class="today-layout quest-home">'+
 '<section class="home-summary"><div class="home-summary-top"><div><span class="home-date">'+nice(d)+'</span><strong>Twój postęp</strong></div><div class="home-xp">+'+earned+' <small>XP</small></div></div>'+
 '<div class="home-progress"><i style="width:'+percent+'%"></i></div>'+
 '<div class="home-summary-foot"><span>'+a.length+' wykonanych · cel '+goal+' XP</span></div>'+
 '<button class="home-tip" data-suggestions="1"><span class="home-tip-star">✦</span><span><b>Pomysł na dziś</b><small>'+h(tip.title)+'</small></span><span class="home-chevron">›</span></button></section>'+
 '<div class="home-section-label"><strong>Dodaj aktywność</strong><span>Wybierz kategorię</span></div>'+
 '<section class="category-grid home-categories">'+cats.map(([k,icon,label])=>'<button class="category-card '+k+'" data-add="'+k+'"><span class="cat-icon">'+icon+'</span><span class="cat-name">'+label+'</span><span class="cat-foot"><span class="plus">＋</span></span></button>').join('')+'</section>'+
 '<section class="home-actions"><button class="home-action" data-view="recipes"><span class="home-action-icon">♨</span><span><b>Przepis na dziś</b><small>Losuj danie · przygotowanie · lista zakupów</small></span><span class="home-chevron">›</span></button><button class="home-action" data-view="workout"><span class="home-action-icon">♜</span><span><b>Dzisiejszy trening</b><small>Zestaw '+(workoutDay()+1)+'/7 · timer i przerwy</small></span><span class="home-chevron">›</span></button>'+
 '<button class="home-action" data-toggle-entries="1" aria-expanded="'+todayLogOpen+'"><span class="home-action-icon">☷</span><span><b>Historia dnia</b><small>'+a.length+' '+(a.length===1?'wpis':'wpisów')+' · popraw lub usuń</small></span><span class="home-chevron">'+(todayLogOpen?'⌃':'⌄')+'</span></button></section>'+
 (todayLogOpen?'<section class="home-log"><div class="row"><strong>Dodane dzisiaj</strong><button class="quietbtn" data-view="history">Cała historia ›</button></div>'+(a.length?a.slice().reverse().map(entry).join(''):'<p class="muted">Brak wpisów na dziś.</p>')+'</section>':'')+
 '</div>';
}
function statsView(){let a=data.entries,now=new Date(today()+'T12:00:00'),start=new Date(now);start.setDate(start.getDate()-6);let week=a.filter(e=>e.date>=iso(start)&&e.date<=today());let total=sum(a,xp);return '<section class="contentcard attribute-card"><div class="row"><h2>Atrybuty postaci</h2><span class="muted">100 pkt / poziom</span></div>'+tubes(a)+'</section><section class="statsgrid">'+[['XP łącznie',total,'✦'],['Poziom',1+Math.floor(total/300),'⬡'],['Wpisy / 7 dni',week.length,'✓'],['Minuty / 7 dni',sum(week,e=>+e.minutes||0),'◷']].map(x=>'<div class="metric"><span>'+x[2]+'</span><small>'+x[0]+'</small><b>'+x[1]+'</b></div>').join('')+'</section><section class="contentcard"><h2>Ostatnie 7 dni</h2><div class="weekbars">'+Array.from({length:7},(_,i)=>{let d=new Date(start);d.setDate(d.getDate()+i);let es=entries(iso(d));return '<div class="daybar"><b>'+sum(es,xp)+'</b><div class="bartrack"><i style="height:'+Math.min(100,Math.max(4,sum(es,xp)/2))+'%"></i></div><small>'+['Nd','Pn','Wt','Śr','Cz','Pt','So'][d.getDay()]+'</small></div>'}).join('')+'</div></section><section class="contentcard"><h2>Obszary rozwoju</h2>'+Object.keys(C).map(k=>'<div class="area-row"><span>'+C[k][1]+'</span><b>'+week.filter(e=>e.cat===k).length+' wpisów</b></div>').join('')+'</section>'}
function projectsView(){let groups=[['Gry i programowanie',['Prison Escape Game','CircleGrind','NightTower','ScrapSpace','Stunt','Syndrome','MagicKeys','NoteCoach','OLIMP AI 1.0','Cyberdeck 1.0']],['Inżynieria i konstrukcje',['Dron','Favoritka','Green Rack','Gruz','Light&Sound','Line Camera Rig']],['Grafika i film',['Atlantis Scene','Escape by Water','Fog Farm','Hey Mambo Commercial','InsideStory Intro','Selena — 3D Character']],['Pisanie',['An Office Without Humanity','Hidi','No Man’s Land','Selena — Graphic Novel','The Graveyard','The Mockingbird']],['Pozostałe',['Schuette — Plissees','Schuette — Vorhänge','Schuette — Bettwäsche','Figurki i modele do druku 3D']]];const visuals={'Gry i programowanie':['🎮','game'],'Inżynieria i konstrukcje':['⚙','engineering'],'Grafika i film':['◈','visual'],'Pisanie':['✎','writing'],'Pozostałe':['✦','other'],'Inne':['◇','other']};let projects=data.library.projects||[];let known=new Set(groups.flatMap(g=>g[1]));let extra=projects.filter(p=>!known.has(p));if(extra.length)groups.push(['Inne',extra]);return '<div class="project-intro"><span>'+projects.length+' projektów w bibliotece</span><button class="quietbtn" data-library="projects">Edytuj listę</button></div><div class="project-groups">'+groups.map(([name,list])=>{let current=list.filter(x=>projects.includes(x));return current.length?'<section class="project-group project-'+visuals[name][1]+'"><div class="group-title"><b><span class="project-group-icon">'+visuals[name][0]+'</span> '+name+'</b><span>'+current.length+'</span></div><div class="project-items">'+current.map(x=>'<button class="projectitem" data-project="'+h(x)+'"><span class="project-symbol">'+visuals[name][0]+'</span><b>'+h(x)+'</b><span>＋</span></button>').join('')+'</div></section>':''}).join('')+'</div>'}
function recipeState(){
 if(!data.recipePlanner||typeof data.recipePlanner!=='object')data.recipePlanner={selected:null,checked:{},type:'Wszystkie'};
 return data.recipePlanner;
}
function currentRecipe(){const st=recipeState();return (typeof QUEST_RECIPES!=='undefined'?QUEST_RECIPES:[]).find(r=>r.id===st.selected)}
function chooseRecipe(){
 const st=recipeState(),list=(typeof QUEST_RECIPES!=='undefined'?QUEST_RECIPES:[]).filter(r=>st.type==='Wszystkie'||r.type===st.type);
 if(!list.length)return;
 const options=list.length>1?list.filter(r=>r.id!==st.selected):list;
 st.selected=options[Math.floor(Math.random()*options.length)].id;
 st.checked={};save();render();
}
function recipesView(){
 const st=recipeState(),r=currentRecipe(),all=typeof QUEST_RECIPES!=='undefined'?QUEST_RECIPES:[];
 const types=['Wszystkie','Śniadanie','Obiad','Przekąska'];
 return '<div class="recipe-screen"><div class="row librarytop"><button data-view="today">‹ Wróć</button><span class="muted">'+all.length+' przepisów</span></div>'+
 '<section class="contentcard recipe-hero"><div class="eyebrow">TWÓJ KUCHARZ · QUEST</div><h2>Co dziś gotujemy?</h2><p>Wylosuj przepis ze swojej kolekcji. Lista zakupów zostanie na tym urządzeniu.</p><div class="recipe-types">'+types.map(x=>'<button class="recipe-type '+(st.type===x?'active':'')+'" data-recipe-type="'+h(x)+'">'+h(x)+'</button>').join('')+'</div><button class="primary recipe-random" data-recipe-random="1">⤨ '+(r?'Losuj inny przepis':'Wylosuj przepis')+'</button></section>'+
 (r?'<section class="contentcard recipe-card"><div class="eyebrow">'+h(r.type)+' · '+r.minutes+' min · '+r.servings+' '+(r.servings===1?'porcja':'porcje')+'</div><h2>'+h(r.name)+'</h2><p class="muted">'+h(r.source)+'</p></section>'+
 '<section class="contentcard recipe-card"><div class="row"><h2>Lista zakupów</h2><span class="muted" id="recipe-count">'+Object.values(st.checked).filter(Boolean).length+' / '+r.ingredients.length+'</span></div><div class="recipe-checklist">'+r.ingredients.map((item,i)=>'<label class="recipe-check"><input type="checkbox" data-recipe-check="'+i+'" '+(st.checked[i]?'checked':'')+'><span>'+h(item)+'</span></label>').join('')+'</div><button class="quietbtn" data-recipe-reset="1">Odznacz wszystkie</button></section>'+
 '<section class="contentcard recipe-card"><h2>Przygotowanie</h2><ol class="recipe-steps">'+r.steps.map(step=>'<li>'+h(step)+'</li>').join('')+'</ol></section>':'<section class="contentcard"><p class="muted">Wybierz rodzaj posiłku i naciśnij „Wylosuj przepis”.</p></section>')+
 '</div>';
}
function libraryView(){let items=data.library[tab]||[];return '<div class="row librarytop"><button data-view="settings">‹ Wróć</button><h2>'+C[tab][1]+'</h2><button class="primary" data-new="'+tab+'">＋ Nowa</button></div><div class="scroll-list">'+items.map((s,i)=>'<div class="item"><span>'+h(s)+'</span><div class="row"><button data-attributes="'+i+'">Atrybuty</button><button data-edit="'+i+'">Edytuj</button><button data-drop="'+i+'">×</button></div></div>').join('')+'</div>'}
function historyView(){let a=data.entries.slice().sort((x,y)=>y.date.localeCompare(x.date));return '<div class="row librarytop"><button data-view="today">‹ Wróć</button><h2>Historia</h2></div><div class="scroll-list">'+(a.length?a.map(entry).join(''):'<p class="muted">Jeszcze nie ma wpisów.</p>')+'</div>'}
function settingsView(){return '<div class="settings-list"><section class="contentcard"><h2>Biblioteka aktywności</h2><p>Edytuj listy, z których wybierasz wykonane rzeczy.</p>'+Object.keys(C).map(k=>'<button class="setting-row" data-library="'+k+'"><span>'+C[k][1]+'</span><span>›</span></button>').join('')+'</section><section class="contentcard"><h2>Twoje dane</h2><p>Dane zapisują się lokalnie na urządzeniu.</p><div class="settings-actions"><button class="primary" id="export">Eksport JSON</button><button id="import">Import JSON</button><button id="restore">Przywróć listy</button></div></section><section class="contentcard"><div class="row"><h2>Aktualizacje</h2><span class="version-pill">v'+APP_VERSION+'</span></div><button class="update-btn" id="update-app"><span class="update-icon">↻</span><span>Sprawdź aktualizacje</span><span class="update-chevron">›</span></button><p id="update-status" class="muted">Zainstalowana wersja: '+APP_VERSION+'</p></section><section class="contentcard"><h2>Granica dnia</h2><label class="field">Nowy dzień od godziny<select id="boundary">'+[3,4,5,6,7,8].map(i=>'<option value="'+i+'" '+(data.boundary===i?'selected':'')+'>'+pad(i)+':00</option>').join('')+'</select></label></section><section class="contentcard"><button id="wipe" class="danger">Usuń wszystkie lokalne dane</button></section></div>'}
function render(){document.getElementById('app').innerHTML='<div class="app-shell">'+head()+'<main class="main '+view+'">'+({today:todayView,stats:statsView,projects:projectsView,settings:settingsView,library:libraryView,history:historyView,recipes:recipesView,workout:workoutView}[view])()+'</main>'+bottom()+'</div>'}
function modal(inner){let x=document.createElement('div');x.className='modalbg';x.id='overlay';x.innerHTML='<div class="modal">'+inner+'</div>';x.addEventListener('click',e=>{if(e.target===x){workoutStop();x.remove()}});document.body.append(x)}
function recordActivity(cat,name,minutes,note='',xpAward){
 data.entries.push({id:crypto.randomUUID?.()||String(Date.now())+'-'+Math.random().toString(36).slice(2),cat,activity:name,date:today(),minutes,attributes:points(cat,name),note,...(Number.isFinite(xpAward)?{xpAward}:{})});
 save();
}
function add(cat){
 cat=QUICK[cat]?cat:'life';
 const list=QUICK[cat],counts=entries(today());
 const countFor=(name)=>counts.filter(e=>e.cat===cat&&e.activity===name).length;
 modal('<div class="modalhead"><div><div class="eyebrow">SZYBKI ZAPIS · '+h(C[cat][1])+'</div><h2>Co udało się zrobić?</h2></div><button class="iconbtn" data-close="1" aria-label="Zamknij">×</button></div><p class="quick-help">Jedno dotknięcie = jedna porcja czasu. Możesz dotknąć ponownie.</p><div class="quick-grid">'+list.map(([name,mins,award],i)=>'<button class="quick-activity" data-quick="'+i+'"><span class="quick-name">'+h(name)+'</span><span class="quick-detail">'+(cat==='work'?(mins?mins/60>=1?mins/60+' h':mins+' min':'Wolne') : mins+' min')+(Number.isFinite(award)?' · '+award+' XP':'')+' <b class="quick-count" data-quick-count="'+i+'">'+(countFor(name)?'× '+countFor(name):'＋')+'</b></span></button>').join('')+'</div><div class="quick-footer"><span id="quick-feedback" aria-live="polite">Wybierz aktywność</span><button class="quick-more" data-advanced="'+cat+'">Inna aktywność ›</button></div>');
}
function quickRecord(i){
 const overlay=document.getElementById('overlay'),cat=overlay?.dataset.quickCategory;
 const list=QUICK[cat];if(!list||!list[i])return;
 const [name,mins,award]=list[i];if(cat==='work'&&name==='Dzień wolny'&&entries(today()).some(e=>e.cat==='work'&&e.activity===name)){const feedback=document.getElementById('quick-feedback');if(feedback)feedback.textContent='Dzień wolny już zapisany';return}recordActivity(cat,name,mins,'',award);
 const count=entries(today()).filter(e=>e.cat===cat&&e.activity===name).length;
 const badge=overlay.querySelector('[data-quick-count="'+i+'"]');
 if(badge)badge.textContent='× '+count;
 const feedback=document.getElementById('quick-feedback');
 if(feedback)feedback.textContent='✓ '+name+' · +'+(Number.isFinite(award)?award:xp({cat,minutes:mins}))+' XP';
 render();
}
function advancedAdd(cat){
 modal('<div class="modalhead"><h2>Inna aktywność</h2><button class="iconbtn" data-close="1">×</button></div><form id="entryform"><label class="field">Nazwa aktywności<input id="custom" maxlength="110" required placeholder="Co zrobiłeś?"></label><label class="field">Czas w minutach<input id="minutes" type="number" min="1" max="1440" value="30" required></label><label class="field">Data<input id="date" type="date" value="'+today()+'" required></label><label class="field">Notatka (opcjonalnie)<textarea id="note" maxlength="500"></textarea></label><button class="primary" type="submit">Zapisz</button></form>');
 document.getElementById('entryform').onsubmit=e=>{e.preventDefault();const name=document.getElementById('custom').value.trim(),mins=+document.getElementById('minutes').value,date=document.getElementById('date').value;if(!name||!Number.isFinite(mins)||mins<1||mins>1440||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date))return alert('Sprawdź dane');data.entries.push({id:crypto.randomUUID?.()||String(Date.now())+'-'+Math.random(),cat,activity:name,date,minutes:mins,attributes:points(cat,name),note:document.getElementById('note').value.trim()});save();document.getElementById('overlay')?.remove();render()};
}
function itemEdit(i){let val=i===null?'':data.library[tab][i];modal('<h2>'+(i===null?'Nowa pozycja':'Edytuj pozycję')+'</h2><form id="itemform"><label class="field">Nazwa<input id="name" maxlength="110" required value="'+h(val)+'"></label><button class="primary">Zapisz</button> <button type="button" id="cancel">Anuluj</button></form>');document.getElementById('cancel').onclick=()=>document.getElementById('overlay').remove();document.getElementById('itemform').onsubmit=e=>{e.preventDefault();let v=document.getElementById('name').value.trim();if(!v)return;if(i===null){if(!data.library[tab].includes(v))data.library[tab].push(v)}else data.library[tab][i]=v;save();document.getElementById('overlay').remove();render()}}
async function checkAppUpdate(){
 const btn=document.getElementById('update-app'),status=document.getElementById('update-status');
 if(btn)btn.disabled=true;
 if(status)status.textContent='Sprawdzam aktualizacje na serwerze…';
 try{
  if(!navigator.onLine)throw Error('Brak połączenia z internetem');
  const url=new URL('./index.html',location.href);url.searchParams.set('_quest_check',Date.now().toString());
  const response=await fetch(url.toString(),{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
  if(!response.ok)throw Error('Serwer zwrócił błąd '+response.status);
  const html=await response.text();
  const match=html.match(/<meta\s+name="quest-version"\s+content="([^"]+)"/i);
  if(!match){if(status)status.textContent='Nie mogę odczytać wersji serwera. Spróbuj ponownie później.';return}
  const remote=match[1];
  if(remote!==APP_VERSION){
   if(status)status.textContent='Dostępna wersja '+remote+'. Aktualizuję…';
   const next=new URL(location.href);next.searchParams.set('quest_update',remote);next.searchParams.set('_reload',Date.now().toString());
   location.replace(next.toString());
  }else if(status)status.textContent='Masz aktualną wersję QUEST ('+APP_VERSION+').';
 }catch(e){if(status)status.textContent='Nie udało się sprawdzić aktualizacji: '+e.message}
 finally{if(btn)btn.disabled=false}
}
function exportData(){let a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.href=url;a.download='quest-backup-'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function importData(){let input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=async()=>{try{let d=JSON.parse(await input.files[0].text());if(!d.library||!Array.isArray(d.entries)||!['life','work','academy','projects'].every(k=>Array.isArray(d.library[k])))throw Error('format');if(confirm('Zastąpić wszystkie obecne dane kopią?')){data={...fresh(),...d};data.library={...clone(INITIAL),...data.library};save();render()}}catch{alert('Nieprawidłowy plik JSON')}};input.click()}
document.addEventListener('click',e=>{let t=e.target.closest('button');if(!t)return;if(t.dataset.view){view=t.dataset.view;render()}else if(t.dataset.recipeRandom){chooseRecipe()}else if(t.dataset.recipeType){recipeState().type=t.dataset.recipeType;save();render()}else if(t.dataset.recipeReset){recipeState().checked={};save();render()}else if(t.dataset.toggleEntries){todayLogOpen=!todayLogOpen;render()}else if(t.dataset.add){document.getElementById('overlay')?.remove();add(t.dataset.add);document.getElementById('overlay').dataset.quickCategory=t.dataset.add}else if(t.dataset.quick!==undefined){quickRecord(+t.dataset.quick)}else if(t.dataset.advanced){document.getElementById('overlay')?.remove();advancedAdd(t.dataset.advanced)}else if(t.dataset.suggestions){suggestModal()}else if(t.dataset.workoutStart){workoutStart()}else if(t.dataset.workoutToggle){workoutToggle()}else if(t.dataset.workoutNext){workoutNext()}else if(t.dataset.workoutExit){workoutStop();document.getElementById('overlay')?.remove()}else if(t.dataset.close){document.getElementById('overlay')?.remove()}else if(t.dataset.library){tab=t.dataset.library;view='library';render()}else if(t.dataset.project){advancedAdd('projects');document.getElementById('custom').value=t.dataset.project}else if(t.dataset.tab){tab=t.dataset.tab;render()}else if(t.dataset.new)itemEdit(null);else if(t.dataset.attributes!==undefined)attributeEditor(tab,data.library[tab][+t.dataset.attributes]);else if(t.dataset.edit!==undefined)itemEdit(+t.dataset.edit);else if(t.dataset.drop!==undefined){if(confirm('Usunąć pozycję z biblioteki?')){data.library[tab].splice(+t.dataset.drop,1);save();render()}}else if(t.dataset.delete){const selected=data.entries.find(x=>String(x.id)===t.dataset.delete);if(selected&&confirm('Usunąć „'+selected.activity+'” z '+selected.date+'? XP i atrybuty zostaną przeliczone.')){data.entries=data.entries.filter(x=>String(x.id)!==t.dataset.delete);save();render()}}else if(t.id==='update-app')checkAppUpdate();else if(t.id==='export')exportData();else if(t.id==='import')importData();else if(t.id==='restore'){if(confirm('Przywrócić początkowe listy?')){data.library=clone(INITIAL);save();render()}}else if(t.id==='wipe'){if(confirm('Usunąć wszystkie dane lokalne?')){data=fresh();save();render()}}});
document.addEventListener('change',e=>{if(e.target.dataset.recipeCheck!==undefined){recipeState().checked[e.target.dataset.recipeCheck]=e.target.checked;save();const count=document.getElementById('recipe-count');if(count){const r=currentRecipe();count.textContent=Object.values(recipeState().checked).filter(Boolean).length+' / '+(r?r.ingredients.length:0)}return}if(e.target.id==='boundary'){data.boundary=+e.target.value;save();render()}else if(e.target.id==='dailygoal'){data.dailyGoal=Math.max(10,Math.min(2000,+e.target.value||60));save();render()}});
render();
// QUEST uses a network-first service worker for installability.
