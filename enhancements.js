(()=>{
'use strict';
const board=document.getElementById('board');
if(!board)return;
let touch=null;
const active=()=>document.getElementById('game').classList.contains('active');
const cells=()=>Array.from(board.querySelectorAll('.tile'));
function tapAt(index){const c=cells()[index];if(c&&!c.classList.contains('empty')&&!c.disabled)c.click()}
board.addEventListener('pointerdown',e=>{
 if(!active())return;
 const tile=e.target.closest('.tile');
 if(!tile||tile.classList.contains('empty'))return;
 touch={x:e.clientX,y:e.clientY,index:cells().indexOf(tile),id:e.pointerId};
},{passive:true});
board.addEventListener('pointerup',e=>{
 if(!touch||touch.id!==e.pointerId)return;
 const t=touch;touch=null;
 const dx=e.clientX-t.x,dy=e.clientY-t.y;
 if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
 const n=Math.round(Math.sqrt(cells().length));
 const empty=cells().findIndex(c=>c.classList.contains('empty'));
 const from=t.index;
 let target=-1;
 if(Math.abs(dx)>Math.abs(dy)){
   if(Math.abs(Math.floor(from/n)-Math.floor(empty/n))===0&&Math.sign(dx)===Math.sign(empty-from))target=from;
 }else if(Math.abs(from% n-empty% n)===0&&Math.sign(dy)===Math.sign(empty-from)*Math.sign(n))target=from;
 if(target>=0&&(Math.abs(target-empty)===1||Math.abs(target-empty)===n)){e.preventDefault();e.stopPropagation();tapAt(target)}
},{passive:false});
document.addEventListener('keydown',e=>{
 if(!active()||e.altKey||e.ctrlKey||e.metaKey)return;
 const map={ArrowLeft:-1,ArrowRight:1,ArrowUp:-1,ArrowDown:1};
 if(!(e.key in map))return;
 const all=cells(),empty=all.findIndex(c=>c.classList.contains('empty')),n=Math.round(Math.sqrt(all.length));
 let target=-1;
 if(e.key==='ArrowLeft'&&empty%n>0)target=empty-1;
 if(e.key==='ArrowRight'&&empty%n<n-1)target=empty+1;
 if(e.key==='ArrowUp'&&empty>=n)target=empty-n;
 if(e.key==='ArrowDown'&&empty+n<all.length)target=empty+n;
 if(target>=0){e.preventDefault();tapAt(target)}
});
const style=document.createElement('style');
style.textContent='.tile{transition:transform .14s cubic-bezier(.2,.8,.2,1),filter .14s,box-shadow .14s}.tile:not(.empty):hover{filter:brightness(1.08)}.board{user-select:none;-webkit-user-select:none}.game-top .back{min-height:40px}';
document.head.appendChild(style);
})();