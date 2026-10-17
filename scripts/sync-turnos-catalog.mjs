// Static HTML remains usable without JavaScript. Run after editing the central catalog.
import fs from 'node:fs';
import vm from 'node:vm';
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/site-config.js','utf8'),context);
const c=context.window.ATRY_CONFIG.atryTurnos;
const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const check='<i class="ph ph-check" aria-hidden="true"></i>';
const cards=c.plans.map(p=>`<article class="tp-plan${p.code==='negocio'?' tp-plan--team':''}" data-plan="${esc(p.code)}"><p class="tp-kicker">${esc(p.eyebrow)}</p><h3>${esc(p.name)}</h3><p class="tp-plan-description">${esc(p.description)}</p><p class="tp-price"><strong data-plan-price="${esc(p.code)}">$${new Intl.NumberFormat('es-UY').format(p.price)}</strong><span>UYU / mes</span></p><p class="tp-capacity">${p.staff===1?'1 profesional':'Hasta '+p.staff+' profesionales activos'}</p><ul>${p.features.map(x=>'<li>'+check+esc(x)+'</li>').join('')}</ul><p class="tp-mail">${esc(p.restriction)}</p><a class="tp-button ${p.code==='negocio'?'tp-button--white':'tp-button--outline'}" href="${esc(c.startUrl || c.loginUrl)}" data-track="turnos_plan_click" data-turnos-link="startUrl">Comenzar ahora<i class="ph ph-arrow-up-right" aria-hidden="true"></i></a></article>`).join('');
const file='turnos.html',html=fs.readFileSync(file,'utf8');
const next=html.replace(/(<div class="tp-plans">)[\s\S]*?(<\/div><div class="tp-commercial-note">)/,(_,open,close)=>open+cards+close);
if(next===html){console.log('Catálogo estático sincronizado.');}
else if(process.argv.includes('--check')){console.error('Ejecutar node scripts/sync-turnos-catalog.mjs');process.exitCode=1;}
else{fs.writeFileSync(file,next);console.log('Catálogo estático actualizado.');}
