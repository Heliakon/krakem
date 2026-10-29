const media=window.matchMedia('(prefers-reduced-motion: reduce)');
let preference=null;
try{preference=localStorage.getItem('clearform-motion');}catch{}
let motion=preference===null?!media.matches:preference==='on';
const motionButton=document.querySelector('.motion-toggle');
function updateMotion(){
 document.documentElement.classList.toggle('motion-paused',!motion);
 motionButton?.setAttribute('aria-pressed',String(!motion));
 if(motionButton){motionButton.querySelector('.motion-label').textContent=motion?'Motion on':'Motion off';motionButton.querySelector('.motion-icon').textContent=motion?'Ⅱ':'▷';motionButton.title=motion?'Pause decorative animation':'Enable decorative animation';}
 window.clearformMotion=motion;
 window.dispatchEvent(new CustomEvent('clearform-motion',{detail:motion}));
}
updateMotion();
motionButton?.addEventListener('click',()=>{motion=!motion;preference=motion?'on':'off';try{localStorage.setItem('clearform-motion',preference);}catch{}updateMotion();});
media.addEventListener('change',()=>{if(preference===null){motion=!media.matches;updateMotion();}});
// Dock magnification: items grow as the pointer approaches, with a fine pointer and motion on. The loop runs only while sizes change.
const dock=document.querySelector('.dock');
if(dock&&matchMedia('(hover: hover) and (pointer: fine)').matches){
 const dockItems=[...dock.querySelectorAll('.dock-item')],levels=dockItems.map(()=>0);
 let pointerX=null,dockFrame=0;
 function magnify(){
  dockFrame=0;let settling=false;
  dockItems.forEach((item,i)=>{
   const box=item.getBoundingClientRect(),target=pointerX===null||!motion||media.matches?0:Math.max(0,1-Math.abs(pointerX-(box.left+box.width/2))/170);
   levels[i]+=(target-levels[i])*.28;
   if(Math.abs(target-levels[i])<.004)levels[i]=target;else settling=true;
   item.style.setProperty('--m',levels[i].toFixed(3));
  });
  if(settling)dockFrame=requestAnimationFrame(magnify);
 }
 const startMagnify=()=>{if(!dockFrame)dockFrame=requestAnimationFrame(magnify);};
 dock.addEventListener('pointermove',event=>{pointerX=event.clientX;startMagnify();});
 dock.addEventListener('pointerleave',()=>{pointerX=null;startMagnify();});
}
// The header mark plays once after load and again on hover or focus, only while decorative motion is on.
const brandLink=document.querySelector('.site-header .brand'),brandMark=brandLink?.querySelector('.brand-mark'),brandSpin=brandMark?.querySelector('.brand-spin');
function playBrand(){if(brandMark&&motion&&!media.matches&&!brandMark.classList.contains('play'))brandMark.classList.add('play');}
// animationend bubbles up from every particle; only the turn, which ends last, finishes the play.
brandSpin?.addEventListener('animationend',event=>{if(event.target===brandSpin)brandMark.classList.remove('play');});
brandLink?.addEventListener('pointerenter',playBrand);
brandLink?.addEventListener('focus',playBrand);
setTimeout(playBrand,400);
let toastTimer;
function toast(message){const el=document.getElementById('toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
window.addEventListener('krakem-toast',event=>toast(event.detail));
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 if(button.disabled)return;
 const target=document.getElementById(button.dataset.copy);const text=target?.textContent||'';
 try{await navigator.clipboard.writeText(text);toast('Text copied. Ready to paste.');}
 catch{
  const temp=document.createElement('textarea');temp.value=text;temp.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(temp);temp.focus();temp.select();let success=false;try{success=document.execCommand('copy');}catch{}temp.remove();button.focus();
  if(success)toast('Text copied.');else{const range=document.createRange();range.selectNodeContents(target);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('Text selected. Press Ctrl+C or ⌘C to copy.');}
 }
}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){if(motion)entry.target.classList.add('reveal-ready');observer.unobserve(entry.target);}}},{threshold:.12});document.querySelectorAll('.section-heading,.lab-teaser,.voice-banner').forEach(el=>observer.observe(el));}
