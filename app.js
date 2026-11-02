document.body.classList.add('js');
const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('section h2,article h3,.project-intro,.project-bottom,.project-visual,.robot-layout figure,.detail-grid>div,.about-columns>p,.skill-grid>div').forEach((el,i)=>{el.style.setProperty('--reveal-delay',(i%3)*90+'ms');observer.observe(el);});}

if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const glowObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('viewport-glow');glowObserver.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.project').forEach(project=>glowObserver.observe(project));}
