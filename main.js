document.documentElement.classList.add('js');
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* reveal + skills + counters */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
  e.target.classList.add('in');
  e.target.querySelectorAll('.fill').forEach(function(f){f.style.width=f.dataset.v+'%'});
  io.unobserve(e.target);});},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
function count(el){var n=+el.dataset.n,s=el.dataset.s||'',t0=null;
  if(rm){el.textContent=n+s;return}
  (function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(step)})(performance.now());}
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}})},{threshold:.6});
document.querySelectorAll('[data-n]').forEach(function(el){cio.observe(el)});
/* typing roles */
var roles=['Veb-dasturchi','Frontend dasturchi','Backend dasturchi','Telegram-bot ishlab chiquvchi'],ri=0,ci=0,del=false,ty=document.getElementById('typed');
function type(){var w=roles[ri];
  if(rm){ty.textContent=w;return}
  ty.textContent=w.slice(0,ci);
  if(!del&&ci<w.length){ci++;setTimeout(type,80)}
  else if(!del){del=true;setTimeout(type,1400)}
  else if(ci>0){ci--;setTimeout(type,40)}
  else{del=false;ri=(ri+1)%roles.length;setTimeout(type,300)}}
type();
/* hero glow follows pointer */
var hero=document.getElementById('hero');
hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-r.left)+'px');hero.style.setProperty('--my',(e.clientY-r.top)+'px')});
/* 3D tilt on project cards */
if(!rm)document.querySelectorAll('.tilt').forEach(function(c){
  c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform='perspective(700px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)'});
  c.addEventListener('pointerleave',function(){c.style.transform=''})});
/* progress bar + back to top */
var bar=document.getElementById('bar'),top_=document.getElementById('top');
function sc(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;bar.style.width=(m>0?scrollY/m*100:0)+'%';top_.classList.toggle('on',scrollY>500)}
addEventListener('scroll',sc,{passive:true});sc();
top_.addEventListener('click',function(){scrollTo({top:0})});
/* theme toggle */
document.getElementById('theme').addEventListener('click',function(){
  var d=document.documentElement,cur=d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  d.dataset.theme=cur==='dark'?'light':'dark'});
