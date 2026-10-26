import {CYCLE_MS,MORPH_MS,PARTICLE_COUNT,createFigures} from './field-shapes.js';

const canvas=document.getElementById('signal-field');
const ctx=canvas.getContext('2d',{alpha:true});
if(ctx){
 const stage=canvas.parentElement,figures=createFigures(),buttons=[...document.querySelectorAll('[data-figure]')];
 const progress=document.getElementById('figure-progress'),timing=document.getElementById('figure-timing');
 const chaosButton=document.getElementById('chaos-toggle');
 let chaos=false,chaosMix=0;
 let w=0,h=0,dpr=1,frame=0,last=0,clock=0,cycleTime=0,current=0,transitionStart=-MORPH_MS,inView=true;
 let enabled=window.clearformMotion??!matchMedia('(prefers-reduced-motion: reduce)').matches;
 let from=figures[0].vertices,fromFrame=figures[0].frame;
 const pointer={x:0,y:0,tx:0,ty:0};
 let seed=4937;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 const sizes=Array.from({length:PARTICLE_COUNT},()=>.45+random()*.72);
 const dust=Array.from({length:65},()=>({x:random(),y:random(),z:random()*3,a:.025+random()*.10,r:random()*.8+.25}));
 const swarm=Array.from({length:PARTICLE_COUNT},()=>({x:(random()-.5)*3.6,y:(random()-.5)*3.6,z:(random()-.5)*3.6,vx:(random()-.5)*2,vy:(random()-.5)*2,vz:(random()-.5)*2,phase:random()*Math.PI*2,speed:.7+random()*1.4}));
 const axes=[['x','vx'],['y','vy'],['z','vz']];
 // Cache the soft light once; avoid a blur or shadow calculation per particle.
 const glow=document.createElement('canvas');glow.width=glow.height=64;
 const light=glow.getContext('2d'),gradient=light.createRadialGradient(32,32,0,32,32,32);
 gradient.addColorStop(0,'rgba(215,240,177,.65)');gradient.addColorStop(.18,'rgba(130,195,65,.25)');gradient.addColorStop(.5,'rgba(102,162,40,.055)');gradient.addColorStop(1,'rgba(102,162,40,0)');
 light.fillStyle=gradient;light.fillRect(0,0,64,64);
 function blend(){return Math.max(0,Math.min(1,(clock-transitionStart)/MORPH_MS));}
 function vertices(){
  const t=blend(),ease=t*t*(3-2*t),target=figures[current].vertices;
  if(t===1)return target;
  return target.map((p,i)=>({x:from[i].x+(p.x-from[i].x)*ease,y:from[i].y+(p.y-from[i].y)*ease,z:from[i].z+(p.z-from[i].z)*ease,tone:from[i].tone+(p.tone-from[i].tone)*ease}));
 }
 // The camera framing eases between shapes together with the particles.
 function framing(){
  const t=blend(),ease=t*t*(3-2*t),a=fromFrame,b=figures[current].frame;
  return{zoom:a.zoom+(b.zoom-a.zoom)*ease,x:a.x+(b.x-a.x)*ease,y:a.y+(b.y-a.y)*ease};
 }
 function labels(){
  timing.textContent=chaos?(enabled?'CHAOS IN MOTION':'CHAOS PAUSED'):(enabled?'SLOWLY EVOLVING':'MOTION PAUSED');
  chaosButton.setAttribute('aria-pressed',String(chaos));
  chaosButton.title=chaos?'Restore structured motion':'Scatter the particles';
  stage.setAttribute('data-chaos',chaos?'on':'off');
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(!chaos&&Number(b.dataset.figure)===current)));
 }
 function changeFigure(index){
  from=vertices();fromFrame=framing();current=index;cycleTime=0;transitionStart=enabled?clock:clock-MORPH_MS;
  labels();draw();
 }
 function setChaos(value){
  chaos=value;cycleTime=0;
  if(!enabled)chaosMix=chaos?1:0;
  labels();draw();schedule();
 }
 function updateSwarm(delta){
  // Cap physics steps after a slow frame; pausing never advances the simulation.
  const dt=Math.min(delta,64)/1000,t=clock/1000;
  chaosMix+=((chaos?1:0)-chaosMix)*(1-Math.exp(-dt*5));
  if(Math.abs((chaos?1:0)-chaosMix)<.001)chaosMix=chaos?1:0;
  if(chaosMix===0)return;
  for(const p of swarm){
   const f=t*p.speed+p.phase;
   p.vx+=(Math.sin(p.y*2.8+f)*2.7-p.x*.85-p.vx*.6)*dt;
   p.vy+=(Math.cos(p.z*2.5-f*1.3)*2.7-p.y*.85-p.vy*.6)*dt;
   p.vz+=(Math.sin(p.x*2.6+f*.8)*2.7-p.z*.85-p.vz*.6)*dt;
   p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
   for(const [axis,velocity] of axes){
    if(Math.abs(p[axis])>2.4){p[axis]=Math.sign(p[axis])*2.4;p[velocity]*=-.8;}
   }
  }
 }
 function resize(){const b=stage.getBoundingClientRect();w=b.width;h=b.height;dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);draw();}
 function camera(){
  const t=clock/1000,ay=.62+t*.065+pointer.x*.65,ax=-.48+Math.sin(t*.13)*.28+pointer.y*.38,az=-.28+Math.sin(t*.11)*.19,f=framing(),zoom=f.zoom*(1-.28*chaosMix);
  return{cy:Math.cos(ay),sy:Math.sin(ay),cx:Math.cos(ax),sx:Math.sin(ax),cz:Math.cos(az),sz:Math.sin(az),scale:Math.min(w*.6,h*.68)*zoom*(1+Math.sin(t*.19)*.06),x:w*(.5+f.x+Math.sin(t*.11)*.065),y:h*(.43+f.y+Math.cos(t*.14)*.03)};
 }
 function project(p,view){
  const x=p.x*view.cy+p.z*view.sy,z=-p.x*view.sy+p.z*view.cy;
  const y=p.y*view.cx-z*view.sx,depth=p.y*view.sx+z*view.cx;
  const perspective=4.1/Math.max(1,4.1+depth);
  return{x:view.x+(x*view.cz-y*view.sz)*view.scale*perspective,y:view.y+(x*view.sz+y*view.cz)*view.scale*perspective,z:depth,p:perspective,tone:p.tone};
 }
 function draw(){
  if(!w||!h)return;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  const view=camera(),halo=ctx.createRadialGradient(w*.46,h*.4,0,w*.46,h*.4,Math.max(w,h)*.62);halo.addColorStop(0,'rgba(116,178,52,.035)');halo.addColorStop(1,'rgba(64,112,28,0)');ctx.fillStyle=halo;ctx.fillRect(0,0,w,h);
  for(const d of dust){ctx.fillStyle=`rgba(166,205,113,${d.a})`;ctx.beginPath();ctx.arc(d.x*w+pointer.x*22*(d.z+1),d.y*h+pointer.y*16*(d.z+1),d.r,0,7);ctx.fill();}
  const projected=vertices().map((p,i)=>{
   const s=swarm[i];
   return project({x:p.x+(s.x-p.x)*chaosMix,y:p.y+(s.y-p.y)*chaosMix,z:p.z+(s.z-p.z)*chaosMix,tone:p.tone},view);
  }),lineOpacity=Math.max(0,(blend()-.6)*2.5)*Math.pow(1-chaosMix,3);
  if(lineOpacity>0){
   for(let layer=0;layer<3;layer++){
    ctx.lineWidth=.55+layer*.2;ctx.strokeStyle=`rgba(130,195,65,${lineOpacity*[.04,.1,.17][layer]})`;ctx.beginPath();
    for(const [a,b] of figures[current].links){const start=projected[a],end=projected[b],depth=(start.z+end.z)/2;if((depth>.6?0:depth<-.5?2:1)!==layer)continue;if((start.x<0&&end.x<0)||(start.x>w&&end.x>w)||(start.y<0&&end.y<0)||(start.y>h&&end.y>h))continue;ctx.moveTo(start.x,start.y);ctx.lineTo(end.x,end.y);}ctx.stroke();
   }
  }
  const sorted=projected.map((p,i)=>({...p,size:sizes[i],i})).sort((a,b)=>b.z-a.z);
  for(const p of sorted){
   if(p.x<-32||p.x>w+32||p.y<-32||p.y>h+32)continue;
   const front=Math.max(0,Math.min(1,(1.8-p.z)/3.6)),defocus=Math.max(0,Math.abs(p.z+.1)-.55),radius=Math.min(6.5,p.size*p.p*(1.25+front*1.5));
   const alpha=Math.max(.05,Math.min(.95,(.24+front*.85)*p.tone));
   if(front>.5&&p.i%3===0){const spread=radius*(5+defocus*3);ctx.globalAlpha=alpha*.6;ctx.drawImage(glow,p.x-spread,p.y-spread,spread*2,spread*2);ctx.globalAlpha=1;}
   const color=p.i%9===0?'215,240,177':`${Math.round(76+front*79)},${Math.round(124+front*90)},${Math.round(26+front*56)}`;
   ctx.fillStyle=`rgba(${color},${alpha/(1+defocus*.6)})`;
   ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.35,radius),0,7);ctx.fill();
  }
  progress.style.transform=`scaleX(${cycleTime/CYCLE_MS})`;
 }
 function loop(now){
  frame=0;if(!enabled||!inView||document.hidden)return;
  if(now-last>=32){
   const delta=now-last;last=now;clock+=delta;
   updateSwarm(delta);
   if(!chaos)cycleTime+=delta;
   pointer.x+=(pointer.tx-pointer.x)*.09;pointer.y+=(pointer.ty-pointer.y)*.09;
   if(!chaos&&cycleTime>=CYCLE_MS){const steps=Math.floor(cycleTime/CYCLE_MS),carry=cycleTime%CYCLE_MS;changeFigure((current+steps)%figures.length);cycleTime=carry;}
   draw();
  }
  frame=requestAnimationFrame(loop);
 }
 function schedule(){if(enabled&&inView&&!document.hidden&&!frame){last=performance.now();frame=requestAnimationFrame(loop);}}
 stage.addEventListener('pointermove',e=>{if(!enabled)return;const r=stage.getBoundingClientRect();pointer.tx=(e.clientX-r.left)/r.width-.5;pointer.ty=(e.clientY-r.top)/r.height-.5;});
 stage.addEventListener('pointerleave',()=>{pointer.tx=pointer.ty=0;});
 chaosButton.addEventListener('click',()=>setChaos(!chaos));
 buttons.forEach(button=>button.addEventListener('click',()=>{chaos=false;if(!enabled)chaosMix=0;changeFigure(Number(button.dataset.figure));schedule();}));
 window.addEventListener('clearform-motion',e=>{enabled=e.detail;if(!enabled){cancelAnimationFrame(frame);frame=0;draw();}labels();schedule();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
 new ResizeObserver(resize).observe(stage);
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)schedule();else{cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(stage);
 labels();resize();schedule();
}
