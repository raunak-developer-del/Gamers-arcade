/* Gamers' Arcade — Phase 1 lightweight canvas game engine */
(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreNode = document.getElementById("currentScore");
  const bestNode = document.getElementById("bestScore");
  const messageNode = document.getElementById("gameMessage");
  const keys = new Set();
  let game = null, running = false, raf = 0, score = 0, best = 0, frame = 0, objects = [], player = {};
  const rand = (a,b) => Math.random() * (b-a) + a;
  const saveBest = () => {
    if (!game) return;
    const key = "ga_best_" + game.id;
    best = Math.max(best, Number(localStorage.getItem(key) || 0));
    localStorage.setItem(key, String(best));
    bestNode.textContent = best;
  };
  function baseScreen(title, subtitle) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grad.addColorStop(0,"#071a31"); grad.addColorStop(1,"#100a27");
    ctx.fillStyle=grad;ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#14395c";ctx.globalAlpha=.6;
    for(let x=0;x<canvas.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
    for(let y=0;y<canvas.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
    ctx.globalAlpha=1;ctx.textAlign="center";
    ctx.fillStyle="#e9f8ff";ctx.font="bold 27px Inter, sans-serif";ctx.fillText(title,canvas.width/2,70);
    ctx.fillStyle="#8da9ce";ctx.font="15px Inter, sans-serif";ctx.fillText(subtitle,canvas.width/2,100);
  }
  function finish(text) {
    running=false;cancelAnimationFrame(raf);saveBest();
    messageNode.textContent=text + " Final score: " + score + ".";
    if(window.ArcadeApp) window.ArcadeApp.recordRun(game,score);
  }
  function setScore(n){score=n;scoreNode.textContent=score}
  function drawTarget(x,y,r=19){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle="#ff3dcc";ctx.shadowColor="#ff3dcc";ctx.shadowBlur=18;ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x,y,r*.48,0,Math.PI*2);ctx.fillStyle="#081327";ctx.fill()}
  function start(g) {
    stop();game=g;score=0;frame=0;objects=[];setScore(0);best=Number(localStorage.getItem("ga_best_"+g.id)||0);bestNode.textContent=best;
    running=true;messageNode.textContent="Game running — use the controls shown.";
    if(g.kind==="reaction") startReaction();
    else if(g.kind==="memory") startMemory();
    else if(g.kind==="dodge") startDodge();
    else if(g.kind==="snake") startSnake();
    else if(g.kind==="racer") startRacer();
    else if(g.kind==="word") startWord();
    else if(g.kind==="pong"||g.kind==="breakout") startPaddle(g.kind);
    else if(g.kind==="math") startMath();
    else if(g.kind==="orbit") startOrbit();
    else startTarget();
  }
  function loop(draw){if(!running)return;frame++;draw();raf=requestAnimationFrame(()=>loop(draw))}
  function startTarget(){
    let target={x:rand(70,570),y:rand(130,350),r:24};
    const draw=()=>{baseScreen(game.title,"Tap/click the glowing target · 20 seconds");drawTarget(target.x,target.y,target.r);ctx.fillStyle="#d9eaff";ctx.font="14px Inter";ctx.fillText("TAP TARGET",target.x,target.y+45);if(frame%65===0)target={x:rand(50,590),y:rand(135,355),r:rand(16,26)};if(frame%60===0&&frame>0&&frame/60>=20)finish("Time is up!")};
    const hit=e=>{if(!running)return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;if(Math.hypot(x-target.x,y-target.y)<target.r+10){setScore(score+10);target={x:rand(50,590),y:rand(135,355),r:rand(16,26)}}};
    canvas.addEventListener("pointerdown",hit);loop(draw);gameCleanup=()=>canvas.removeEventListener("pointerdown",hit);
  }
  let gameCleanup=()=>{};
  function startReaction(){
    let lit=false,readyAt=0,wait=rand(1000,2600),startAt=performance.now(),done=false;
    const draw=()=>{baseScreen(game.title,"Wait for PINK to turn CYAN, then tap quickly");let elapsed=performance.now()-startAt;if(!lit&&elapsed>wait){lit=true;readyAt=performance.now()}ctx.fillStyle=lit?"#00eaff":"#ff36c9";ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=35;ctx.beginPath();ctx.arc(320,235,75,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#06101f";ctx.font="bold 18px Inter";ctx.fillText(lit?"TAP NOW":"WAIT…",320,242);if(elapsed>12000&&!done){done=true;finish("Round ended.")}};
    const hit=()=>{if(!running)return;if(!lit){messageNode.textContent="Too early! Restart and wait for cyan.";finish("False start.")}else{let ms=Math.round(performance.now()-readyAt);setScore(Math.max(1,1000-ms));finish("Reaction time: "+ms+" ms.")}};
    canvas.addEventListener("pointerdown",hit);loop(draw);gameCleanup=()=>canvas.removeEventListener("pointerdown",hit);
  }
  function startMemory(){
    const seq=Array.from({length:5},()=>Math.floor(Math.random()*4));let shown=0,input=[],phase="show";
    const draw=()=>{baseScreen(game.title,phase==="show"?"Memorize the sequence":"Repeat the sequence by tapping 1–4");for(let i=0;i<4;i++){let x=110+(i%2)*220,y=150+Math.floor(i/2)*110;ctx.fillStyle=(phase==="show"&&seq[shown]===i)||input[input.length-1]===i?"#ff36c9":"#123451";ctx.fillRect(x,y,170,75);ctx.strokeStyle="#00eaff";ctx.strokeRect(x,y,170,75);ctx.fillStyle="white";ctx.font="bold 24px Inter";ctx.fillText(String(i+1),x+85,y+46)}if(phase==="show"&&frame%45===0){shown++;if(shown>=seq.length){phase="input";shown=0}}};
    const hit=e=>{if(!running||phase!=="input")return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width,y=(e.clientY-r.top)*canvas.height/r.height;let col=x<320?0:1,row=y<260?0:1,i=row*2+col;input.push(i);if(i!==seq[input.length-1]){finish("Sequence incorrect.")}else if(input.length===seq.length){setScore(100);finish("Perfect memory!")}};
    canvas.addEventListener("pointerdown",hit);loop(draw);gameCleanup=()=>canvas.removeEventListener("pointerdown",hit);
  }
  function startDodge(){
    player={x:320,y:340};let last=0;
    const draw=()=>{baseScreen(game.title,"Move with ← → or A / D · survive 25 seconds");if(frame%35===0)objects.push({x:rand(25,615),y:-20,r:rand(9,17),v:rand(2,5)});objects.forEach(o=>o.y+=o.v);objects=objects.filter(o=>o.y<430);ctx.fillStyle="#00eaff";ctx.shadowColor="#00eaff";ctx.shadowBlur=18;ctx.beginPath();ctx.moveTo(player.x,player.y-18);ctx.lineTo(player.x-17,player.y+17);ctx.lineTo(player.x+17,player.y+17);ctx.closePath();ctx.fill();ctx.shadowBlur=0;objects.forEach(o=>{drawTarget(o.x,o.y,o.r);if(Math.hypot(o.x-player.x,o.y-player.y)<o.r+14)finish("You were hit!")});player.x=Math.max(20,Math.min(620,player.x+(keys.has("ArrowLeft")||keys.has("a")?-5:0)+(keys.has("ArrowRight")||keys.has("d")?5:0)));if(frame%60===0)setScore(score+1);if(frame>1500)finish("You survived!")};
    loop(draw);
  }
  function startSnake(){
    let cells=[[10,10]],dir=[1,0],food=[5,5],tick=0;
    const draw=()=>{baseScreen(game.title,"Use arrow keys or WASD · collect the pink energy cell");if(frame%8===0){let h=[cells[0][0]+dir[0],cells[0][1]+dir[1]];if(h[0]<0||h[0]>=20||h[1]<0||h[1]>=12||cells.some(c=>c[0]===h[0]&&c[1]===h[1])){finish("Circuit overload!");return}cells.unshift(h);if(h[0]===food[0]&&h[1]===food[1]){setScore(score+10);food=[Math.floor(rand(0,20)),Math.floor(rand(0,12))]}else cells.pop()}ctx.fillStyle="#ff36c9";ctx.fillRect(food[0]*30+20,food[1]*30+125,22,22);cells.forEach((c,i)=>{ctx.fillStyle=i?"#1689a5":"#00eaff";ctx.fillRect(c[0]*30+20,c[1]*30+125,24,24)})};
    const key=e=>{const map={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};let nd=map[e.key];if(nd&&!(nd[0]===-dir[0]&&nd[1]===-dir[1]))dir=nd};window.addEventListener("keydown",key);loop(draw);gameCleanup=()=>window.removeEventListener("keydown",key);
  }
  function startRacer(){
    player={lane:1};let obstacles=[];const draw=()=>{baseScreen(game.title,"Switch lanes with ← → or A / D");for(let x of [220,420]){ctx.strokeStyle="#52698e";ctx.setLineDash([15,14]);ctx.beginPath();ctx.moveTo(x,125);ctx.lineTo(x,400);ctx.stroke();ctx.setLineDash([])}if(frame%38===0)obstacles.push({lane:Math.floor(rand(0,3)),y:110});obstacles.forEach(o=>o.y+=4);obstacles=obstacles.filter(o=>o.y<420);obstacles.forEach(o=>{ctx.fillStyle="#ff36c9";ctx.fillRect(115+o.lane*200,o.y,55,45);if(o.lane===player.lane&&o.y>320&&o.y<370)finish("Collision!")});ctx.fillStyle="#00eaff";ctx.fillRect(125+player.lane*200,330,35,48);if(frame%60===0)setScore(score+1);if(frame>1500)finish("Race complete!")};const key=e=>{if(e.key==="ArrowLeft"||e.key==="a")player.lane=Math.max(0,player.lane-1);if(e.key==="ArrowRight"||e.key==="d")player.lane=Math.min(2,player.lane+1)};window.addEventListener("keydown",key);loop(draw);gameCleanup=()=>window.removeEventListener("keydown",key);
  }
  function startWord(){const words=["ARCADE","PIXEL","GAMING","NEON","PLAYER"];let word=words[Math.floor(Math.random()*words.length)],scrambled=word.split("").sort(()=>Math.random()-.5).join("");baseScreen(game.title,"Unscramble this word: "+scrambled);ctx.fillStyle="#00eaff";ctx.font="bold 34px Inter";ctx.fillText(scrambled,320,220);let answer=prompt("Unscramble: "+scrambled);if(answer&&answer.trim().toUpperCase()===word){setScore(100);finish("Correct!")}else finish("The word was "+word+".")}
  function startMath(){let a=Math.floor(rand(2,20)),b=Math.floor(rand(2,20)),answer=a+b;baseScreen(game.title,"Solve the equation");ctx.fillStyle="#00eaff";ctx.font="bold 38px Inter";ctx.fillText(a+" + "+b+" = ?",320,230);let v=prompt(a+" + "+b+" = ?");if(Number(v)===answer){setScore(100);finish("Correct answer!")}else finish("The answer was "+answer+".")}
  function startOrbit(){let angle=0;const draw=()=>{baseScreen(game.title,"Tap / click when the orb reaches the cyan target");let cx=320,cy=245,r=110;ctx.strokeStyle="#435a8a";ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();ctx.fillStyle="#00eaff";ctx.beginPath();ctx.arc(cx+r,cy,12,0,Math.PI*2);ctx.fill();let x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;drawTarget(x,y,13);angle+=.035};const hit=()=>{let delta=Math.min(Math.abs(angle%(Math.PI*2)),Math.abs(angle%(Math.PI*2)-Math.PI*2));if(delta<.18){setScore(score+25);finish("Perfect orbit catch!")}else messageNode.textContent="Not quite — try again or restart."};canvas.addEventListener("pointerdown",hit);loop(draw);gameCleanup=()=>canvas.removeEventListener("pointerdown",hit)}
  function startPaddle(kind){let bx=320,by=210,vx=3,vy=3,pad=280;const draw=()=>{baseScreen(game.title,"Move your paddle with mouse / touch or ← →");ctx.fillStyle="#00eaff";ctx.fillRect(pad-55,360,110,12);ctx.beginPath();ctx.arc(bx,by,9,0,Math.PI*2);ctx.fillStyle="#ff36c9";ctx.fill();bx+=vx;by+=vy;if(bx<10||bx>630)vx*=-1;if(by<115)vy*=-1;if(by>350&&bx>pad-65&&bx<pad+65){vy*=-1;setScore(score+5)}if(by>400)finish("Ball missed!");pad=Math.max(55,Math.min(585,pad+(keys.has("ArrowLeft")?-5:0)+(keys.has("ArrowRight")?5:0)));if(kind==="breakout"){for(let i=0;i<5;i++){ctx.fillStyle=["#00eaff","#a855f7","#ff36c9"][i%3];ctx.fillRect(55+i*108,130,85,18)}}};const move=e=>{const r=canvas.getBoundingClientRect();pad=(e.clientX-r.left)*canvas.width/r.width};canvas.addEventListener("pointermove",move);loop(draw);gameCleanup=()=>canvas.removeEventListener("pointermove",move)}
  function stop(){running=false;cancelAnimationFrame(raf);gameCleanup();gameCleanup=()=>{};ctx.clearRect(0,0,canvas.width,canvas.height)}
  window.ArcadeEngine={start,stop};
  window.addEventListener("keydown",e=>{keys.add(e.key);if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)&&document.getElementById("gameDialog").open)e.preventDefault()});
  window.addEventListener("keyup",e=>keys.delete(e.key));
})();