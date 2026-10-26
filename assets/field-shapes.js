export const CYCLE_MS=5000;
export const MORPH_MS=1100;
export const PARTICLE_COUNT=1440;
const TAU=Math.PI*2;
const point=(x,y,z=0,tone=1)=>({x,y,z,tone});
const rotate=(p,ax,az)=>{const y=p.y*Math.cos(ax)-p.z*Math.sin(ax),z=p.y*Math.sin(ax)+p.z*Math.cos(ax);return point(p.x*Math.cos(az)-y*Math.sin(az),p.x*Math.sin(az)+y*Math.cos(az),z,p.tone);};

function surface(shape){
 const vertices=[],links=[],rings=120,strands=12;
 for(let j=0;j<strands;j++)for(let i=0;i<rings;i++){
  const u=i/rings*TAU,v=(j/(strands-1)-.5)*2;
  vertices.push(shape(u,v,j));
  links.push([j*rings+i,j*rings+(i+1)%rings]);
  if(j<strands-1&&i%5===0)links.push([j*rings+i,(j+1)*rings+i]);
 }
 return {vertices,links};
}
function nautilus(){
 const vertices=[],links=[],turns=Math.PI*4.5;
 const radius=t=>.065*Math.exp(Math.log(1.65/.065)*t/turns);
 const shellPoint=(t,r,z,tone=1)=>point(r*Math.cos(t-Math.PI*.25)-.14,r*Math.sin(t-Math.PI*.25)+.08,z,tone);
 // Half of the shell remains behind the cut face, exposing the chamber walls.
 for(let strand=0;strand<10;strand++)for(let i=0;i<84;i++){
  const t=i/83*turns,r=radius(t),a=strand/9*Math.PI;
  vertices.push(shellPoint(t,r*(.65+.35*Math.cos(a)),r*.35*Math.sin(a),strand===0||strand===9?1.15:.65));
  const n=strand*84+i;
  if(i)links.push([n-1,n]);
  if(strand&&i%4===0)links.push([n-84,n]);
 }
 for(let chamber=0;chamber<24;chamber++)for(let i=0;i<20;i++){
  const t=1.2+chamber/23*(turns-1.4),u=i/19,r=radius(t);
  vertices.push(shellPoint(t+.19*Math.sin(u*Math.PI),r*(.3+.7*u),-.075*r*Math.sin(u*Math.PI),1.1));
  if(i)links.push([840+chamber*20+i-1,840+chamber*20+i]);
 }
 // The thick aperture curls around the last, open chamber.
 for(let rim=0;rim<6;rim++)for(let i=0;i<20;i++){
  const a=i/19*Math.PI,t=turns-rim*.018,r=radius(t);
  vertices.push(shellPoint(t,r*(.65+.35*Math.cos(a)),r*.35*Math.sin(a),.95));
  const n=1320+rim*20+i;
  if(i)links.push([n-1,n]);
  if(rim&&i%4===0)links.push([n-20,n]);
 }
 return {vertices,links};
}

function crab(){
 const vertices=[],links=[];
 function tube(path,rings,sides,width,tone=1){
  for(let i=0;i<rings;i++){
   const t=i/(rings-1),segment=Math.min(path.length-2,Math.floor(t*(path.length-1))),u=t*(path.length-1)-segment;
   const a=path[segment],b=path[segment+1],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),r=width*(1-t*.86);
   for(let j=0;j<sides;j++){
    const angle=j/sides*TAU,n=vertices.length;
    vertices.push(point(a[0]+dx*u-dy/length*r*Math.cos(angle),a[1]+dy*u+dx/length*r*Math.cos(angle),a[2]+(b[2]-a[2])*u+r*Math.sin(angle),tone));
    if(i)links.push([n-sides,n]);
    if(j)links.push([n-1,n]);
   }
  }
 }
 // A domed carapace, with eight jointed walking legs and two open pincers.
 for(let row=0;row<12;row++)for(let i=0;i<40;i++){
  const a=i/40*TAU,b=(row+.5)/12*Math.PI,n=vertices.length;
  vertices.push(point(.77*Math.cos(a)*Math.sin(b),.5*Math.sin(a)*Math.sin(b),.3*Math.cos(b),.9));
  links.push([n,row*40+(i+1)%40]);
  if(row&&i%5===0)links.push([n-40,n]);
 }
 for(const side of[-1,1])for(let leg=0;leg<4;leg++){
  tube([[side*.59,-.23+leg*.17,0],[side*(1.12+(leg===1||leg===2?.12:0)),-.55+leg*.37,.04],[side*(1.68-leg*.13),-.42+leg*.49,.12],[side*(1.55-leg*.16),-.24+leg*.51,.15]],18,4,.075,.85);
 }
 for(const side of[-1,1]){
  tube([[side*.5,-.32,-.03],[side*.82,-.72,-.08],[side*1.19,-.96,-.16]],16,4,.14);
  const start=vertices.length;
  for(let row=0;row<4;row++)for(let i=0;i<10;i++){
   const a=i/10*TAU,b=(row+.5)/4*Math.PI,n=vertices.length;
   vertices.push(point(side*(1.25+.2*Math.cos(a)*Math.sin(b)),-1.11+.24*Math.sin(a)*Math.sin(b),-.16+.12*Math.cos(b),1.05));
   links.push([n,start+row*10+(i+1)%10]);
   if(row)links.push([n-10,n]);
  }
  tube([[side*1.12,-1.22,-.16],[side*.95,-1.43,-.14],[side*1.02,-1.53,-.12]],10,2,.08,1.15);
  tube([[side*1.4,-1.2,-.16],[side*1.39,-1.5,-.14],[side*1.14,-1.62,-.12]],10,2,.1,1.15);
 }
 for(const side of[-1,1]){
  tube([[side*.27,-.38,-.16],[side*.36,-.65,-.24]],12,3,.045,1.1);
  for(let i=0;i<12;i++){
   const a=i*Math.PI*(3-Math.sqrt(5)),z=1-2*(i+.5)/12,r=Math.sqrt(1-z*z);
   vertices.push(point(side*.36+.065*r*Math.cos(a),-.67+.065*r*Math.sin(a),-.24+.065*z,1.2));
  }
 }
 // Start the crab at an oblique angle, so the camera reveals its depth.
 return {links,vertices:vertices.map(p=>point((p.x*Math.cos(-.5)+p.z*Math.sin(-.5))*.72,p.y*.72+.2,(-p.x*Math.sin(-.5)+p.z*Math.cos(-.5))*.72,p.tone))};
}

function clarity(){return surface((u,v)=>{
 const radius=1.3+.48*v*Math.cos(u*1.5);
 return rotate(point(radius*Math.cos(u),radius*Math.sin(u),.72*v*Math.sin(u*1.5)),.78,.25);
});}
function infinity(){return surface((u,v,j)=>{
 const a=j/12*TAU,dx=-1.62*Math.sin(u),dy=1.45*Math.cos(2*u),length=Math.hypot(dx,dy);
 return point(1.62*Math.cos(u)-dy/length*.16*Math.cos(a),.725*Math.sin(2*u)+dx/length*.16*Math.cos(a),.22*Math.sin(u)+.16*Math.sin(a));
});}
function dna(){
 const vertices=[],links=[];
 for(let strand=0;strand<2;strand++)for(let i=0;i<480;i++){
  const row=Math.floor(i/3),u=row/159,angle=u*Math.PI*5+strand*Math.PI,edge=(i%3-1)*.028;
  vertices.push(point((.65+edge)*Math.cos(angle),-1.55+u*3.1,(.65+edge)*Math.sin(angle),strand?1:.8));
  if(i>=3)links.push([strand*480+i-3,strand*480+i]);
 }
 for(let rung=0;rung<24;rung++)for(let i=0;i<20;i++){
  const u=rung/23,angle=u*Math.PI*5,t=-1+2*i/19;
  vertices.push(point(.65*Math.cos(angle)*t,-1.55+u*3.1,.65*Math.sin(angle)*t,.65));
  if(i)links.push([960+rung*20+i-1,960+rung*20+i]);
 }
 return {vertices,links};
}
function balance(){
 const vertices=[],links=[],radius=1.47;
 for(let i=0;i<1100;i++){
  const r=radius*Math.sqrt((i+.5)/1100),angle=i*Math.PI*(3-Math.sqrt(5)),x=r*Math.cos(angle),y=r*Math.sin(angle);
  let bright=x>=0;
  if(Math.hypot(x,y+radius/2)<radius/2)bright=true;
  if(Math.hypot(x,y-radius/2)<radius/2)bright=false;
  if(Math.hypot(x,y+radius/2)<radius*.135)bright=false;
  if(Math.hypot(x,y-radius/2)<radius*.135)bright=true;
  vertices.push(point(x,y,0,bright?1.15:.10));
 }
 for(let i=0;i<200;i++){const a=i/200*TAU;vertices.push(point(radius*Math.cos(a),radius*Math.sin(a),0,.85));links.push([1100+i,1100+(i+1)%200]);}
 for(let half=0;half<2;half++)for(let i=0;i<50;i++){
  const t=i/49*Math.PI,sign=half?1:-1;
  vertices.push(point(sign*radius/2*Math.sin(t),sign*radius/2-radius/2*Math.cos(t),0,.7));
  if(i)links.push([1300+half*50+i-1,1300+half*50+i]);
 }
 for(let eye=0;eye<2;eye++)for(let i=0;i<20;i++){const a=i/20*TAU;vertices.push(point(radius*.135*Math.cos(a),(eye?1:-1)*radius/2+radius*.135*Math.sin(a),0,eye?1:.12));}
 return {vertices,links};
}
function flower(){return surface((u,v)=>{
 const radius=.98+.43*Math.cos(6*u)+v*.17;
 return point(radius*Math.cos(u),radius*Math.sin(u),.33*Math.sin(3*u)+v*.23*Math.sin(6*u));
});}
// Each shape has its own framing: zoom scales the camera, x and y shift the focus as a fraction of the stage.
// Values keep every shape cropped at the edges but readable.
const FRAMES=[{zoom:1,x:0,y:0},{zoom:.9,x:0,y:.02},{zoom:.6,x:-.02,y:.12},{zoom:.6,x:0,y:.03},{zoom:.56,x:.04,y:.06},{zoom:.62,x:0,y:.03},{zoom:.66,x:0,y:.03}];
export function createFigures(){return[nautilus(),crab(),...[clarity(),infinity(),dna(),balance(),flower()].map(figure=>({
 links:figure.links,
 vertices:figure.vertices.map(p=>point(p.x,p.y,p.z*1.35+.32*Math.sin(p.x*1.7+p.y*.8),p.tone))
}))].map((figure,i)=>({...figure,frame:FRAMES[i]}));}
