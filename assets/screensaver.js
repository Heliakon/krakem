// After 12 seconds without input, a Matrix-style rain covers the page and the page underneath stops drawing.
// Corner controls, as in the original screensaver file, set letter speed, fade-in, and color. Moving the pointer keeps the rain
// so the controls can be reached; a click elsewhere, a key, or the wheel brings the page back.
// It runs only with a mouse or trackpad, with motion on, and never while a form field has focus.
const IDLE_MS=12000,SIZE=16,FADE_IN=30,FADE_OUT=40,GLYPHS='アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Color slider stops: the site green, then blue, purple, orange, red, and white.
const STOPS=[[130,195,65],[0,120,255],[160,60,255],[255,140,0],[255,30,30],[255,255,255]];
const finePointer=matchMedia('(hover: hover) and (pointer: fine)'),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const root=document.documentElement;
let idleTimer=0,coverTimer=0,frame=0,last=0,progress=0,active=false,overlay=null,canvas=null,ctx=null,speed=null,smooth=null,tint=null,color='',drops=[],cells=[],pointer=null,returnFocus=null;

function canShow(){
 const field=document.activeElement?.closest?.('input, textarea, select, [contenteditable="true"]');
 return finePointer.matches&&!reducedMotion.matches&&window.clearformMotion!==false&&!document.hidden&&!field;
}
function build(){
 overlay=document.createElement('div');overlay.className='screensaver';overlay.hidden=true;
 canvas=document.createElement('canvas');
 speed=Object.assign(document.createElement('input'),{type:'range',className:'saver-speed',min:10,max:120,step:1,value:87});
 smooth=Object.assign(document.createElement('input'),{type:'checkbox',className:'saver-smooth'});
 tint=Object.assign(document.createElement('input'),{type:'range',className:'saver-color',min:0,max:5,step:'any',value:0});
 speed.setAttribute('aria-label','Letter speed');smooth.setAttribute('aria-label','Fade letters in');tint.setAttribute('aria-label','Letter color');
 overlay.append(canvas,speed,smooth,tint);document.body.append(overlay);
 ctx=canvas.getContext('2d',{alpha:false});
 tint.addEventListener('input',updateColor);updateColor();
 smooth.addEventListener('change',clear);
}
function updateColor(){
 const value=+tint.value,i=Math.min(Math.floor(value),STOPS.length-2),t=value-i;
 const [r,g,b]=STOPS[i].map((from,k)=>Math.round(from+(STOPS[i+1][k]-from)*t));
 color=`rgb(${r},${g},${b})`;overlay.style.setProperty('--c',color);
}
function clear(){
 cells=[];progress=0;
 ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
}
function resize(){
 // One canvas pixel per CSS pixel: sharp enough for falling glyphs, and a fraction of the cost of a high-DPI canvas.
 canvas.width=innerWidth;canvas.height=innerHeight;clear();
 ctx.font=`${SIZE}px ui-monospace, monospace`;
 drops=Array.from({length:Math.ceil(canvas.width/SIZE)},()=>Math.random()*-50);
}
const glyph=()=>GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
function fall(){for(let i=0;i<drops.length;i++)drops[i]=drops[i]*SIZE>canvas.height&&Math.random()>.975?0:drops[i]+1;}
function draw(now){
 frame=requestAnimationFrame(draw);
 // The speed slider sets the time between steps, from 120 ms down to 10 ms.
 const delay=130-speed.value;
 if(smooth.checked){
  // Fade-in mode redraws every visible letter. Brightness changes once per step, so it redraws once per step, at most about 30 times a second.
  if(now-last<Math.max(30,delay))return;
  const dt=Math.min(now-last,250)/delay;
  last=now;progress+=dt;
  while(progress>=1){progress--;for(let i=0;i<drops.length;i++)cells.push({x:i*SIZE,y:drops[i]*SIZE,ch:glyph(),age:0});fall();}
  ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle=color;
  // A letter brightens over FADE_IN steps, then dims over FADE_OUT steps.
  cells=cells.filter(cell=>(cell.age+=dt)<FADE_IN+FADE_OUT);
  for(const cell of cells){ctx.globalAlpha=cell.age<FADE_IN?cell.age/FADE_IN:1-(cell.age-FADE_IN)/FADE_OUT;ctx.fillText(cell.ch,cell.x,cell.y);}
  ctx.globalAlpha=1;
  return;
 }
 if(now-last<delay)return;
 last=now;
 // A translucent black wash leaves fading trails behind each column's newest glyph.
 ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle=color;
 for(let i=0;i<drops.length;i++)ctx.fillText(glyph(),i*SIZE,drops[i]*SIZE);
 fall();
}
function show(){
 if(active)return;
 if(!canShow()){arm();return;}
 if(!overlay)build();
 // Hiding the page drops keyboard focus, so remember it and put it back on wake.
 active=true;returnFocus=document.activeElement;resize();overlay.hidden=false;
 // Reading a layout value applies the unhidden state first, so the opacity change below fades instead of jumping.
 void overlay.offsetWidth;overlay.classList.add('on');
 // Once the rain fully covers the screen (after the .8 s fade), the page underneath stops painting.
 coverTimer=setTimeout(()=>root.classList.add('screensaver-on'),800);
 window.dispatchEvent(new CustomEvent('krakem-screensaver',{detail:true}));
 last=0;frame=requestAnimationFrame(draw);
}
function hide(){
 active=false;cancelAnimationFrame(frame);frame=0;clearTimeout(coverTimer);
 root.classList.remove('screensaver-on');overlay.classList.remove('on');overlay.hidden=true;
 if(returnFocus?.isConnected&&document.activeElement!==returnFocus)returnFocus.focus({preventScroll:true});
 returnFocus=null;
 window.dispatchEvent(new CustomEvent('krakem-screensaver',{detail:false}));
}
function arm(){clearTimeout(idleTimer);idleTimer=setTimeout(show,IDLE_MS);}
const swallowClick=event=>{event.preventDefault();event.stopPropagation();};
function wake(event){
 if(event.type==='pointermove'){
  // Browsers can report a pointer "move" when the overlay appears under a still cursor; only real movement counts.
  const moved=!pointer||Math.abs(event.clientX-pointer.x)+Math.abs(event.clientY-pointer.y)>2;
  pointer={x:event.clientX,y:event.clientY};
  if(!moved)return;
 }
 if(active){
  // Moving the pointer, Tab, and using a corner control keep the rain. Escape always brings the page back.
  if(event.type==='pointermove'||event.key==='Tab'||event.key!=='Escape'&&event.target?.closest?.('.screensaver input'))return;
  hide();
  // The press or key that wakes the page should not also act on it.
  if(event.type==='keydown'||event.type==='pointerdown'){
   event.preventDefault();event.stopPropagation();
   if(event.type==='pointerdown'){addEventListener('click',swallowClick,{capture:true,once:true});setTimeout(()=>removeEventListener('click',swallowClick,true),600);}
  }
 }
 arm();
}
for(const type of ['pointermove','pointerdown','keydown','wheel','touchstart','scroll','focusin'])addEventListener(type,wake,{capture:true,passive:type!=='keydown'&&type!=='pointerdown'});
addEventListener('resize',()=>{if(active)resize();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)hide();});
arm();
