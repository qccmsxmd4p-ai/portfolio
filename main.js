/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    document.getElementById('site-header').classList.add('show');
  }, 2000);
});

/* ===== Custom cursor ===== */
const curDot = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx+'px'; curDot.style.top = my+'px';
});
function animRing(){
  rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
  curRing.style.left = rx+'px'; curRing.style.top = ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.chip,.proj-card,.tl-card,.c-card').forEach(el=>{
  el.addEventListener('mouseenter', ()=>curRing.classList.add('big'));
  el.addEventListener('mouseleave', ()=>curRing.classList.remove('big'));
});

/* ===== Mobile nav toggle ===== */
document.getElementById('navToggle').addEventListener('click', ()=>{
  document.getElementById('navList').classList.toggle('open');
});
document.querySelectorAll('#navList a').forEach(a=>{
  a.addEventListener('click', ()=> document.getElementById('navList').classList.remove('open'));
});

/* ===== Scroll reveal ===== */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ===== Skill bars ===== */
const skillObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const level = entry.target.dataset.level;
      const fill = entry.target.querySelector('.bar-fill');
      fill.style.width = level+'%';
      setTimeout(()=> fill.classList.add('swept'), 1200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.4 });
document.querySelectorAll('.skill').forEach(el=>skillObserver.observe(el));

/* ===== Header show on scroll (also ensure show after loader) ===== */
window.addEventListener('scroll', ()=>{
  document.getElementById('site-header').classList.add('show');
});

/* ===== Particle network canvas ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W,H, particles=[];
const COLORS = ['#8b7bff','#ff3d9a','#22e0d6','#ffb648'];
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = document.body.scrollHeight;
}
resize();
window.addEventListener('resize', resize);

const PCOUNT = Math.min(90, Math.floor(window.innerWidth/14));
function initParticles(){
  particles = [];
  for(let i=0;i<PCOUNT;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*Math.min(H, window.innerHeight*1.5),
      vx: (Math.random()-0.5)*0.35,
      vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.8+1,
      c: COLORS[Math.floor(Math.random()*COLORS.length)]
    });
  }
}
initParticles();

function draw(){
  ctx.clearRect(0,0,W,H);
  const viewTop = window.scrollY;
  const viewBottom = viewTop + window.innerHeight;

  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
  }
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    if(p.y < viewTop-100 || p.y > viewBottom+100) continue;
    for(let j=i+1;j<particles.length;j++){
      const q = particles[j];
      const dx=p.x-q.x, dy=p.y-q.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.strokeStyle = p.c;
        ctx.globalAlpha = (1-dist/120)*0.18;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  for(const p of particles){
    if(p.y < viewTop-50 || p.y > viewBottom+50) continue;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.c;
    ctx.globalAlpha = 0.75;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();

/* re-measure canvas height once content is fully laid out */
window.addEventListener('load', ()=>{ resize(); initParticles(); });
setTimeout(()=>{ resize(); initParticles(); }, 2200);
