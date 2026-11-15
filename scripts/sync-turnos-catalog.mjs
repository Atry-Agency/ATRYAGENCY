// Agency deliberately does not mirror the commercial catalog. Keep the official destination checked.
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const context={window:{}};vm.runInNewContext(fs.readFileSync('assets/site-config.js','utf8'),context);
assert.equal(context.window.ATRY_CONFIG.atryTurnos.landingUrl,'https://atryturnos.com/descubrir.html');
assert.equal(context.window.ATRY_CONFIG.atryTurnos.plans,undefined);
for(const file of ['index.html','turnos.html']){const html=fs.readFileSync(file,'utf8');assert(html.includes('https://atryturnos.com/descubrir.html'));assert(!html.includes('data-plan-price'));}
console.log('Destino oficial verificado; sin catálogo comercial duplicado.');
