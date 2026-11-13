import {text} from './i18n.js';
// After 12 seconds without input, a Matrix-style rain covers the page and the page underneath stops drawing.
// Moving the pointer keeps the rain so its button can be reached; a click elsewhere, a key, or the wheel brings the page back.
// It runs only with a mouse or trackpad, with motion on, and never while a form field has focus.
// The footer switch and the button on the rain turn it off; that choice is saved for later visits.
const IDLE_MS=12000,STEP_MS=43,SIZE=16,COLOR='#82c341',GLYPHS='アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const finePointer=matchMedia('(hover: hover) and (pointer: fine)'),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const root=document.documentElement,toggle=document.querySelector('.saver-toggle'),STORAGE_KEY='krakem-screensaver';
let enabled=true;
try{enabled=localStorage.getItem(STORAGE_KEY)!=='off';}catch{}
let idleTimer=0,coverTimer=0,frame=0,last=0,active=false,overlay=null,canvas=null,ctx=null,drops=[],pointer=null,returnFocus=null;

const label=()=>{if(toggle)toggle.textContent=enabled?text.screensaver.on:text.screensaver.off;};
function setEnabled(value){
 enabled=value;
 // Only "off" is stored; without storage the choice still holds until the page is left.
 try{if(value)localStorage.removeItem(STORAGE_KEY);else localStorage.setItem(STORAGE_KEY,'off');}catch{}
 label();
 if(!value&&active)hide();
}
function canShow(){
 const field=document.activeElement?.closest?.('input, textarea, select, [contenteditable="true"]');
 return enabled&&finePointer.matches&&!reducedMotion.matches&&window.clearformMotion!==false&&!document.hidden&&!field;
}
function build(){
 overlay=document.createElement('div');overlay.className='screensaver';overlay.hidden=true;
 canvas=document.createElement('canvas');
 const off=Object.assign(document.createElement('input'),{type:'button',className:'saver-off',value:text.screensaver.turnOff});
 off.addEventListener('click',()=>setEnabled(false));
 overlay.append(canvas,off);document.body.append(overlay);
 ctx=canvas.getContext('2d',{alpha:false});
}
function resize(){
 // One canvas pixel per CSS pixel: sharp enough for falling glyphs, and a fraction of the cost of a high-DPI canvas.
 canvas.width=innerWidth;canvas.height=innerHeight;ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.font=`${SIZE}px ui-monospace, monospace`;
 drops=Array.from({length:Math.ceil(canvas.width/SIZE)},()=>Math.random()*-50);
}
const glyph=()=>GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
function fall(){for(let i=0;i<drops.length;i++)drops[i]=drops[i]*SIZE>canvas.height&&Math.random()>.975?0:drops[i]+1;}
function draw(now){
 frame=requestAnimationFrame(draw);
 if(now-last<STEP_MS)return;
 last=now;
 // A translucent black wash leaves fading trails behind each column's newest glyph.
 ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle=COLOR;
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
  // Moving the pointer, Tab, and using the button keep the rain. Escape always brings the page back.
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
// The switch is in every footer. It stays hidden on touch screens, where the screensaver never starts.
if(toggle){toggle.hidden=!finePointer.matches;label();toggle.addEventListener('click',()=>setEnabled(!enabled));}
arm();
