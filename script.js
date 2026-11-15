// All project previews are first-party, device-specific captures of the linked sites.
const projects=[
{id:'jarama',name:'Jarama Home & Deco',category:'ecommerce web',type:'Proyecto en desarrollo',url:'https://rodrigobrun.github.io/PruebaJarama/',label:'Retail / E-commerce',desc:'Un espacio digital para descubrir muebles, objetos y nuevas maneras de habitar. Catálogo y experiencia de compra con una mirada editorial.',tags:['E-commerce','UX/UI','Catálogo']},
{id:'sandro',name:'Sandro Fernández Transportes',category:'web',type:'Sitio publicado',url:'https://sandrofernandeztransportes.com.uy/',label:'Industria / Web corporativa',desc:'Una presencia digital sólida para una empresa que mueve industria. Servicios, flota y trayectoria, en un recorrido claro.',tags:['Dirección digital','Desarrollo web','Responsive']},
{id:'celeste',name:'Celeste en Agenda',category:'product web',type:'Producto propio',url:'https://rodribru.github.io/Partidos-de-Uruguay-Mundial/',label:'Deporte / Experiencia digital',desc:'Seguir a Uruguay, descubrir los encuentros y llevarlos al calendario. Una idea simple, convertida en una experiencia digital propia.',tags:['Producto digital','Calendarios','Interacción']}
];
const captureSrc=(project,device='desktop')=>`assets/projects/${project.id}-${device}.webp`;
const services=[
{n:'01',name:'Branding e identidad',summary:'Una marca reconocible, coherente y lista para crecer.',body:'Definimos la dirección estratégica y construimos un sistema visual que pueda vivir en todos los puntos de contacto.',items:['Estrategia de marca','Identidad visual','Sistema gráfico','Manual de marca','Aplicaciones','Dirección de arte']},
{n:'02',name:'Diseño y desarrollo web',summary:'Sitios que comunican rápido, funcionan bien y se sienten propios.',body:'Diseñamos y desarrollamos experiencias responsive con foco en claridad, conversión y rendimiento.',items:['Arquitectura','UX/UI','Frontend','Responsive','SEO inicial','Integraciones']},
{n:'03',name:'E-commerce y reservas',summary:'Experiencias digitales preparadas para vender, reservar y escalar.',body:'Creamos catálogos, flujos de compra, sistemas de turnos y paneles administrativos adaptados al negocio.',items:['Catálogo','Carrito','Pagos','Reservas','Panel admin','Automatizaciones']},
{n:'04',name:'Estrategia y marketing digital',summary:'Una dirección clara para comunicar con intención.',body:'Ordenamos mensajes, canales y contenido para que la marca construya presencia y oportunidades reales.',items:['Estrategia digital','Contenido','Campañas','Mensajes clave','Roadmap','Medición']},
{n:'05',name:'Productos digitales',summary:'Herramientas, plataformas y experiencias que resuelven algo concreto.',body:'Transformamos ideas en productos interactivos, automatizaciones y soluciones a medida.',items:['Web apps','MVP','Dashboards','Automatización','APIs','Sistemas internos']}
];
const qs=(s,c=document)=>c.querySelector(s),qsa=(s,c=document)=>[...c.querySelectorAll(s)];
function projectVisual(p){return `<button class="project-visual" type="button" data-project="${p.id}" aria-label="Explorar ${p.name}"><picture><source media="(max-width:600px)" srcset="${captureSrc(p,'mobile')}"><source media="(max-width:1000px)" srcset="${captureSrc(p,'tablet')}"><img src="${captureSrc(p)}" width="1440" height="960" loading="lazy" decoding="async" alt="Captura del sitio ${p.name}"></picture><span class="project-visual-action" aria-hidden="true"><i class="ph ph-arrows-out-simple"></i></span></button>`}
function renderProjects(){const grid=qs('#project-grid');if(!grid)return;grid.dataset.filter='all';grid.innerHTML=projects.map((p,i)=>`<article class="project-card reveal" data-category="${p.category}" data-project-id="${p.id}">${projectVisual(p)}<div class="project-info"><div><p class="project-label"><span>0${i+1}</span> ${p.label}</p><h3>${p.name}</h3><p class="project-state">${p.type}</p></div><button class="project-open" type="button" data-project="${p.id}" aria-label="Ver proyecto ${p.name}"><i class="ph ph-arrow-up-right" aria-hidden="true"></i></button></div></article>`).join('');observeReveals();qsa('.project-visual img',grid).forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.closest('.project-visual').classList.add('capture-unavailable');img.closest('.project-visual').insertAdjacentHTML('beforeend','<span>Conocé el proyecto</span>')},{once:true}))}
function renderServices(){const deck=qs('#service-deck');if(deck)deck.innerHTML=services.map(s=>`<article class="service-card"><span>${s.n}</span><div><h3>${s.name}</h3><p>${s.summary}</p></div><button type="button" aria-expanded="false" aria-label="Abrir ${s.name}"><i class="ph-bold ph-plus" aria-hidden="true"></i></button><div class="service-details"><p>${s.body}</p><ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul></div></article>`).join('');const full=qs('#services-full');if(full)full.innerHTML=services.map(s=>`<article class="capability-row"><span>${s.n}</span><div><h2>${s.name}</h2><p>${s.body}</p></div><ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('')}
function initFilters(){qsa('.project-filters').forEach(group=>{group.setAttribute('role','group');group.setAttribute('aria-label','Filtrar proyectos');qsa('button',group).forEach(b=>{b.setAttribute('aria-pressed',String(b.classList.contains('active')));b.addEventListener('click',()=>{qsa('button',group).forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});const grid=qs('#project-grid');grid.dataset.filter=b.dataset.filter;qsa('.project-card',grid).forEach(c=>c.hidden=!(b.dataset.filter==='all'||c.dataset.category.split(' ').includes(b.dataset.filter)))})})})}
function initServices(){qsa('.service-card').forEach(card=>{const b=qs('button',card);b.addEventListener('click',()=>{const open=card.classList.toggle('open');b.setAttribute('aria-expanded',String(open))})})}
// A decoded local capture is the only success signal. Stale loads never replace a newer selection.
const captureRequests=new WeakMap();
function showCapture(surface,project,device){
 const token={};captureRequests.set(surface,token);surface.dataset.state='loading';surface.setAttribute('aria-busy','true');
 const status=qs('[data-capture-status]',surface);status.textContent='Cargando captura…';
 const img=new Image();img.width={desktop:1440,tablet:834,mobile:390}[device];img.height={desktop:960,tablet:1112,mobile:844}[device];img.alt=`${project.name}: captura real en ${device==='desktop'?'escritorio':device==='tablet'?'tablet':'móvil'}`;img.decoding='async';
 img.onload=async()=>{try{await img.decode()}catch{}if(captureRequests.get(surface)!==token)return;const old=qs('img',surface);old?.remove();surface.prepend(img);surface.dataset.state='ready';surface.setAttribute('aria-busy','false');status.textContent=''};
 img.onerror=()=>{if(captureRequests.get(surface)!==token)return;qs('img',surface)?.remove();surface.dataset.state='error';surface.setAttribute('aria-busy','false');status.textContent='No pudimos cargar esta captura. Podés abrir el sitio original.'};
 img.src=captureSrc(project,device);
}
function initModal(){
 const modal=qs('#project-modal');if(!modal)return;let lastFocus,background=[];
 function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('locked');background.forEach(([el,was])=>el.inert=was);qs('#modal-content').innerHTML='';lastFocus?.focus()}
 document.addEventListener('click',e=>{const btn=e.target.closest('[data-project]');if(!btn)return;const p=projects.find(x=>x.id===btn.dataset.project);if(!p)return;lastFocus=btn;qs('#modal-content').innerHTML=`<p class="section-index">${p.label}</p><h2 id="modal-title">${p.name}</h2><p class="modal-intro">${p.desc}</p><div class="modal-capture capture-surface" data-state="loading"><span data-capture-status role="status"></span></div><div class="modal-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="pill-button pill-button--dark" href="${p.url}" target="_blank" rel="noopener noreferrer"><span>Abrir sitio original</span><b aria-hidden="true"><i class="ph-bold ph-arrow-up-right"></i></b></a><p class="capture-note">${p.type} · Captura del sitio, sin formularios activos.</p>`;background=qsa('body > :not(.project-modal):not(script)').map(el=>[el,el.inert]);background.forEach(([el])=>el.inert=true);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('locked');showCapture(qs('.capture-surface',modal),p,matchMedia('(max-width:600px)').matches?'mobile':'desktop');qs('.modal-close',modal).focus()});
 qsa('[data-close-modal]',modal).forEach(x=>x.addEventListener('click',close));document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='Tab'){const items=qsa('button,a[href]',modal),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
}
function initPreview(){
 const picker=qs('#project-picker'),frame=qs('#live-frame'),surface=qs('#live-capture');if(!picker||!frame||!surface)return;
 let selected=projects[0],device=matchMedia('(max-width:600px)').matches?'mobile':matchMedia('(max-width:1000px)').matches?'tablet':'desktop';picker.innerHTML=projects.map((p,i)=>`<button type="button" data-id="${p.id}" aria-pressed="${i===0}" class="${i===0?'active':''}"><span class="picker-index">0${i+1}</span><span>${p.name}<small>${p.label}</small></span><i class="ph ph-arrow-up-right" aria-hidden="true"></i></button>`).join('');
 function load(){qsa('.device-switcher button').forEach(x=>{x.classList.toggle('active',x.dataset.device===device);x.setAttribute('aria-pressed',String(x.dataset.device===device))});qsa('button',picker).forEach(x=>{x.classList.toggle('active',x.dataset.id===selected.id);x.setAttribute('aria-pressed',String(x.dataset.id===selected.id))});qs('#live-url').textContent=new URL(selected.url).hostname;qs('#live-open').href=selected.url;qs('#preview-project-title').textContent=selected.name;qs('#preview-project-state').textContent=selected.type;frame.dataset.device=device;showCapture(surface,selected,device)}
 picker.addEventListener('click',e=>{const button=e.target.closest('button[data-id]');if(!button||!picker.contains(button))return;selected=projects.find(x=>x.id===button.dataset.id);load()});
 qsa('.device-switcher button').forEach(b=>{b.setAttribute('aria-pressed',String(b.classList.contains('active')));b.addEventListener('click',()=>{qsa('.device-switcher button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});device=b.dataset.device;load()})});load();
}
function initIdeaLab(){const form=qs('#idea-builder'),result=qs('#idea-result');if(!form)return;const copy={vender:['Una experiencia que convierte interés en acción.','Identidad enfocada + recorrido comercial + web preparada para convertir.'],posicionar:['Una marca que se vea tan profesional como el trabajo que hace.','Sistema visual + mensajes claros + sitio con autoridad.'],reservas:['Menos mensajes perdidos. Más turnos confirmados.','Experiencia de reserva + automatización + panel de gestión.'],lanzar:['Una idea nueva necesita una entrada imposible de ignorar.','Concepto de marca + landing de lanzamiento + sistema para crecer.']};form.addEventListener('submit',e=>{e.preventDefault();const g=qs('#goal-select').value,v=qs('#vibe-select').selectedOptions[0].textContent;result.innerHTML=`<span>ATRY / CONCEPT ${String(Math.floor(Math.random()*900)+100)}</span><h3>${copy[g][0]}</h3><p>${copy[g][1]} Dirección: ${v}.</p><div><b>IDENTITY</b><b>EXPERIENCE</b><b>GROWTH</b></div>`})}
function initPlayground(){const canvas=qs('#brand-canvas');if(!canvas)return;const ranges=['energy-range','clarity-range','motion-range'].map(id=>qs('#'+id));function paint(){const [e,c,m]=ranges.map(r=>+r.value);canvas.style.background=`linear-gradient(${120+m}deg,hsl(${190+e/4} 85% ${8+c/12}%),hsl(${205+m/5} 85% ${38+e/8}%),hsl(${240+c/5} 70% 55%))`;canvas.style.transform=`perspective(1000px) rotateX(${(m-50)/20}deg) rotateY(${(e-50)/25}deg)`;qs('#canvas-caption').textContent=`${e>66?'Audaz':'Equilibrada'} · ${c>66?'Clara':'Exploratoria'} · ${m>66?'Dinámica':'Precisa'}`}ranges.forEach(r=>r.addEventListener('input',paint));qs('#randomize-brand').addEventListener('click',()=>{ranges.forEach(r=>r.value=Math.floor(Math.random()*100));paint()});paint()}
function observeReveals(){const els=qsa('.reveal:not(.watched)');const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in-view');io.unobserve(x.target)}}),{threshold:.14});els.forEach(el=>{el.classList.add('watched');io.observe(el)})}
function initHeader() {
  const header = qs('[data-header]');
  if (header) {
    const sync = () => header.classList.toggle('is-scrolled', scrollY > 30 || document.body.classList.contains('inner-page'));
    addEventListener('scroll', sync, {passive: true});
    sync();
  }
  const toggle = qs('.menu-toggle'), menu = qs('.mobile-menu');
  if (!toggle || !menu) return;
  function setOpen(open, restore = false) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    qsa('main, .site-footer').forEach(el => { el.inert = open; });
    document.body.classList.toggle('locked', open);
    if (!open && restore) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  qsa('a', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { setOpen(false, true); return; }
    if (e.key === 'Tab') {
      const links = [toggle, ...qsa('a,button', menu)];
      const i = links.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); links.at(-1).focus(); }
      else if (!e.shiftKey && i === links.length - 1) { e.preventDefault(); toggle.focus(); }
    }
  });
  matchMedia('(min-width:1101px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
}
function initCursor(){if(!matchMedia('(pointer:fine)').matches)return;const d=qs('.cursor-dot'),r=qs('.cursor-ring');if(!d||!r)return;addEventListener('mousemove',e=>{d.style.left=r.style.left=e.clientX+'px';d.style.top=r.style.top=e.clientY+'px'});qsa('a,button').forEach(el=>el.addEventListener('mouseenter',()=>{r.style.width='58px';r.style.height='58px'}));qsa('a,button').forEach(el=>el.addEventListener('mouseleave',()=>{r.style.width='36px';r.style.height='36px'}))}
function initScroll(){addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;qs('.scroll-progress span')&&(qs('.scroll-progress span').style.width=(scrollY/h*100)+'%')})}
function initForm(){const f=qs('#contact-form');if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();qs('#form-status').textContent='Formulario listo para conectar. Todavía no se envió ningún dato.'})}
renderProjects();renderServices();initFilters();initServices();initModal();initPreview();initIdeaLab();initPlayground();initHeader();initCursor();initScroll();initForm();observeReveals();qs('#year')&&(qs('#year').textContent=new Date().getFullYear());
