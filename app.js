import{makeGrid,tryClear}from"./game.js";
const board=document.getElementById("board");const status=document.getElementById("status");const scoreEl=document.getElementById("score");
let grid=makeGrid();let score=0;let selected=[];
function key(r,c){return r+","+c;}
function render(){board.innerHTML="";board.style.gridTemplateColumns=`repeat(${grid[0].length},1fr)`;grid.forEach((row,r)=>row.forEach((v,c)=>{const b=document.createElement("button");b.type="button";b.className="cell"+(selected.some(([rr,cc])=>rr===r&&cc===c)?" on":"");b.textContent=String(v);b.addEventListener("click",()=>toggle(r,c));board.appendChild(b);}));scoreEl.textContent=String(score);}
function toggle(r,c){const i=selected.findIndex(([rr,cc])=>rr===r&&cc===c);if(i>=0)selected.splice(i,1);else selected.push([r,c]);render();}
document.getElementById("btn-clear").onclick=()=>{const r=tryClear(grid,selected);if(!r.ok){status.textContent=r.reason==="sum"?"總和須為 10":r.reason==="conn"?"須相鄰連通":"至少兩格";return;}grid=r.grid;score+=r.score;selected=[];status.textContent=`消除 +${r.score}`;render();fetch("/api/kv/highscore",{method:"PUT",body:String(score)}).catch(()=>{});};
document.getElementById("btn-new").onclick=()=>{grid=makeGrid();score=0;selected=[];status.textContent="點選相鄰數字湊 10";render();};
render();
