// Złote konfetti na progach i przy wygranej miliona.
const canvas = document.getElementById('fx');
const ctx = canvas.getContext('2d');
const COLORS = ['#ffd36b', '#f7a11a', '#fff1b8', '#ffffff', '#5bb6ff', '#f07f00'];
let parts = [];
let raining = 0;
let raf = 0;
let dpr = 1;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
}
addEventListener('resize', resize);
resize();

function spawn(x, y, vx, vy) {
  parts.push({
    x, y, vx, vy,
    w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    c: COLORS[(Math.random() * COLORS.length) | 0],
    life: 1, diamond: Math.random() < 0.3,
  });
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (raining > performance.now()) {
    for (let i = 0; i < 4; i++) spawn(Math.random() * innerWidth, -20, (Math.random() - 0.5) * 2, 2 + Math.random() * 3);
  }
  parts = parts.filter((p) => p.y < innerHeight + 40 && p.life > 0);
  for (const p of parts) {
    p.vy += 0.08;
    p.vx *= 0.99;
    p.vy = Math.min(p.vy, 6);
    p.x += p.vx + Math.sin(p.y / 40) * 0.6;
    p.y += p.vy;
    p.r += p.vr;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.fillStyle = p.c;
    if (p.diamond) {
      ctx.beginPath();
      ctx.moveTo(0, -p.w / 1.4); ctx.lineTo(p.w / 2.4, 0); ctx.lineTo(0, p.w / 1.4); ctx.lineTo(-p.w / 2.4, 0);
      ctx.fill();
    } else {
      ctx.scale(1, Math.cos(p.r * 3));
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  }
  if (parts.length || raining > performance.now()) raf = requestAnimationFrame(loop);
  else { raf = 0; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

function run() { if (!raf) raf = requestAnimationFrame(loop); }
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const fx = {
  burst(n = 120) {
    if (reduced) return;
    const cx = innerWidth / 2;
    const cy = innerHeight * 0.4;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 4 + Math.random() * 9;
      spawn(cx, cy, Math.cos(a) * s, Math.sin(a) * s - 4);
    }
    run();
  },
  rain(ms = 8000) {
    if (reduced) return;
    raining = performance.now() + ms;
    this.burst(200);
    run();
  },
  clear() {
    parts = [];
    raining = 0;
  },
};
