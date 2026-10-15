(function () {
'use strict';
var C=window.RLR;if(!C)return;
var ct=C.contacto;
var all=function(s){return Array.from(document.querySelectorAll(s));};
var esc=function(t){var el=document.createElement('span');el.textContent=t;return el.innerHTML;};
var icon=function(name,cls){return '<img class="icon '+(cls||'')+'" src="assets/icons/'+name+'.svg" width="24" height="24" alt="">';};
var whats='https://wa.me/'+ct.telefoneIntl+'?text='+encodeURIComponent(ct.mensagemWhatsApp);
all('.js-whats').forEach(function(a){a.href=whats;});
all('.js-tel').forEach(function(a){a.href='tel:+'+ct.telefoneIntl;});
all('.js-tel-txt').forEach(function(el){el.textContent=ct.telefone;});
all('.js-email').forEach(function(a){a.href='mailto:'+ct.email;});
all('.js-email-txt').forEach(function(el){el.textContent=ct.email;});
all('.js-insta').forEach(function(a){a.href=ct.instagram;});
all('.js-mapa').forEach(function(a){a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(ct.local+', '+ct.morada.join(', '));});
all('.js-morada').forEach(function(el){el.innerHTML='<strong>'+esc(ct.local)+'</strong>'+ct.morada.map(esc).join('<br>');});
all('.js-morada-linha').forEach(function(el){el.textContent=ct.morada.join(' · ');});
document.getElementById('hero-title').innerHTML=(C.inicio.titulo.match(/[^.]+\.?/g)||[C.inicio.titulo]).map(function(line){return '<span>'+esc(line.trim())+'</span>';}).join('');
var serviceIcons={psicologia:'brain',fala:'chat-circle',ocupacional:'hand'};
var serviceColors={azul:'blue',coral:'coral',amarelo:'yellow'};
all('.js-especialidades').forEach(function(box){
box.innerHTML=C.especialidades.map(function(e){
var label=e.id==='psicologia'?'Psicologia /<br>Neuropsicologia':esc(e.nome);
var audience=e.publicos.join(' e ');
return '<details class="service service-'+serviceColors[e.cor]+'" id="esp-'+e.id+'"><summary><span class="service-icon">'+icon(serviceIcons[e.id])+'</span><span><h3>'+label+'</h3><span class="audience">'+esc(audience)+'</span></span><span class="service-hint">Conhecer esta área '+icon('caret-down')+'</span></summary><div class="service-body"><p>'+esc(e.texto)+'</p><a class="text-link" href="#equipa">Conhecer a equipa '+icon('arrow-right')+'</a></div></details>';
}).join('');
});
var valueIcons=['users','heart','hand-heart','plant'];
all('.js-valores').forEach(function(ul){ul.innerHTML=C.valores.map(function(v,i){return '<li class="value"><span class="value-icon">'+icon(valueIcons[i])+'</span><div><strong>'+esc(v.nome)+'</strong><p>'+esc(v.texto)+'</p></div></li>';}).join('');});
var groups=[
{label:'Psicologia / Neuropsicologia',icon:'brain',match:function(p){return p.area.indexOf('Psicologia')!==-1;}},
{label:'Terapia da Fala',icon:'chat-circle',match:function(p){return p.area==='Terapia da Fala';}},
{label:'Terapia Ocupacional',icon:'hand',match:function(p){return p.area==='Terapia Ocupacional';}}
];
all('.js-equipa').forEach(function(box){box.innerHTML=groups.map(function(g){return '<div class="team-group"><h3>'+icon(g.icon)+esc(g.label)+'</h3><ul>'+C.equipa.filter(g.match).map(function(p){return '<li class="person"><strong>'+esc(p.nome)+'</strong><span>'+esc(p.area)+'</span></li>';}).join('')+'</ul></div>';}).join('');});
all('.js-passos').forEach(function(ol){ol.innerHTML=C.comoComecar.map(function(p,i){var text=i===0?'Por WhatsApp ou chamada, para o '+ct.telefone+'.':p.texto;return '<li class="step"><span class="step-num" aria-hidden="true">'+(i+1)+'</span><div><h3>'+esc(p.titulo)+'</h3><p>'+esc(text)+'</p></div></li>';}).join('');});
var button=document.querySelector('.menu-btn'),nav=document.getElementById('menu');
var setMenu=function(open,restoreFocus){button.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-aberto',open);button.querySelector('.menu-symbol').src='assets/icons/'+(open?'x':'list')+'.svg';if(restoreFocus)button.focus();};
button.addEventListener('click',function(){setMenu(button.getAttribute('aria-expanded')!=='true');});
nav.addEventListener('click',function(event){if(event.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',function(event){if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true')setMenu(false,true);});
document.addEventListener('click',function(event){if(button.getAttribute('aria-expanded')==='true'&&!event.target.closest('.topo'))setMenu(false);});
window.matchMedia('(min-width: 761px)').addEventListener('change',function(event){if(event.matches)setMenu(false);});
if(new URLSearchParams(location.search).get('revisao')==='1')all('.review-note,.review-bar').forEach(function(el){el.hidden=false;});
})();
