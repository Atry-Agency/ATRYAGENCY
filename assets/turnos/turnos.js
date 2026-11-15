/* Agency links only. Commercial information lives on the official product site. */
(() => {
 'use strict';
 const config=window.ATRY_CONFIG?.atryTurnos;
 const safeAppUrl=value=>{try{const url=new URL(value);return url.protocol==='https:'&&url.origin==='https://atryturnos.com'&&!url.username&&!url.password?url.href:null}catch{return null}};
 document.querySelectorAll('[data-turnos-link]').forEach(link=>{const url=safeAppUrl(config?.[link.dataset.turnosLink]);if(url)link.href=url});
})();
