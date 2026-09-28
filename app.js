const $=s=>document.querySelector(s),ls=(k,v)=>{try{return v===undefined?JSON.parse(localStorage.getItem(k)):localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.view').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#'+b.dataset.v).classList.add('on');scrollTo(0,0)});
let list=QUIZ,i=0,score=0;
function render(){const box=$('#qbox'),Q=list[i];
if(!Q){const best=Math.max(score,ls('b'+list.length)||0);ls('b'+list.length,best);box.innerHTML=`<div class="card"><p><b>Resultado: ${score}/${list.length}</b></p><p class="prog">Mejor marca: ${best}/${list.length}</p><button class="btn" id="r">Reintentar</button></div>`;$('#r').onclick=()=>{i=0;score=0;render()};return}
box.innerHTML=`<p class="prog">Pregunta ${i+1} de ${list.length}</p><p><b>${Q.q}</b></p>`+Q.o.map((t,k)=>`<button class="opt" data-k="${k}">${t}</button>`).join('')+'<div class="fb" id="fb"></div>';
box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.k;box.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.k===Q.a)x.classList.add('ok')});if(k!==Q.a)b.classList.add('bad');else score++;$('#fb').innerHTML=Q.e+'<br><br><button class="btn" id="n">'+(i+1<list.length?'Siguiente':'Ver resultado')+'</button>';$('#n').onclick=()=>{i++;render()}})}
render();
const done=ls('ejer')||{};
$('#chk').innerHTML=EJER.map((t,k)=>`<label class="chk"><input type="checkbox" data-k="${k}" ${done[k]?'checked':''}><span>${t}</span></label>`).join('');
$('#chk').onchange=e=>{done[e.target.dataset.k]=e.target.checked;ls('ejer',done)};
const names=['Todas','Ronda 1 · Fundamentos','Ronda 2 · Aplicadas','Ronda 3 · Casos reales','Ronda 4 · Avanzado','Ronda 5 · Ejercicios de clase'];
$('#rsel').innerHTML=names.map((n,k)=>`<option value="${k}">${n} (${k?QUIZ.filter(x=>x.r===k).length:QUIZ.length})</option>`).join('');
$('#rsel').onchange=e=>{const k=+e.target.value;list=k?QUIZ.filter(x=>x.r===k):QUIZ;i=0;score=0;render()};
