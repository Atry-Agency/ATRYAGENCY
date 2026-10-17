import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const script=fs.readFileSync('assets/turnos/turnos.js','utf8');
function harness(override={}) {
 const events=[],docListeners={};
 function node(dataset={},textContent=''){return {dataset,textContent,attrs:{},listeners:{},classList:{add(){},remove(){}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){this.listeners[k]=fn},closest(selector){return selector==='[data-plan]'?null:this}};}
 const buttons=['reservas','agenda','dashboard'].map(x=>node({demo:x,track:'turnos_demo_click'},x));
 const link=node({turnosLink:'registerUrl'});link.href='https://atry-agency.github.io/ATRY-Turnos/#/registro';
 const faq=node({turnosFaq:'faq-0'}),image=node(),caption=node(),enlarge=node();
 const ids={'demo-image':image,'demo-caption':caption,'demo-enlarge':enlarge};
 const document={readyState:'complete',body:{classList:{contains:x=>x==='turnos-page'}},querySelector:()=>null,querySelectorAll(selector){return selector==='[data-demo]'?buttons:selector==='[data-turnos-link]'?[link]:selector==='[data-turnos-faq]'?[faq]:[]},getElementById:id=>ids[id],addEventListener(k,fn){docListeners[k]=fn}};
 const window={ATRY_CONFIG:{analyticsEnabled:false,atryTurnos:{registerUrl:override.url||link.href,plans:[]}},dispatchEvent:e=>events.push(e.detail)};
 const context=vm.createContext({window,document,URL,Intl,location:{pathname:'/turnos.html'},CustomEvent:class{constructor(type,opts){this.detail=opts.detail}},requestAnimationFrame:fn=>fn(),console});
 vm.runInContext(fs.readFileSync('assets/conversion.js','utf8'),context);vm.runInContext(script,context);
 return {events,buttons,image,caption,enlarge,link,faq,click(button){button.listeners.click();docListeners.click({target:button})}};
}
test('demo changes the image, accessible state and full-size destination with one event',()=>{const h=harness();h.click(h.buttons[1]);assert.equal(h.image.src,'assets/turnos/agenda.webp');assert.equal(h.buttons[1].attrs['aria-pressed'],'true');assert.equal(h.buttons[0].attrs['aria-pressed'],'false');assert.equal(h.enlarge.href,h.image.src);assert.match(h.caption.textContent,/Entorno de demostración/);assert.equal(h.events.filter(e=>e.event==='turnos_demo_click').length,1);assert.equal(h.events.at(-1).screen,'agenda')});
test('landing view is emitted once and FAQ tracks opening only',()=>{const h=harness();assert.equal(h.events.filter(e=>e.event==='turnos_landing_view').length,1);h.faq.open=false;h.faq.listeners.toggle();h.faq.open=true;h.faq.listeners.toggle();assert.equal(h.events.filter(e=>e.event==='turnos_faq_open').length,1)});
test('central links preserve the verified application route',()=>{const h=harness();assert.equal(h.link.href,'https://atry-agency.github.io/ATRY-Turnos/#/registro')});
test('unsafe or unrelated configured URLs never replace the working fallback',()=>{for(const url of ['javascript:alert(1)','http://atry-agency.github.io/ATRY-Turnos/','https://example.com/login','https://atry-agency.github.io/other/']){const h=harness({url});assert.equal(h.link.href,'https://atry-agency.github.io/ATRY-Turnos/#/registro')}});
