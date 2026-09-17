import { useEffect, useRef, useState } from 'react';

const roles = ['Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Python Developer'];
const github = 'https://github.com/raqeem743';
const linkedin = 'https://www.linkedin.com/in/raqeem-mughal-54a4a43b6/';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < current.length) timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(i => i + 1); }, 65);
    else if (!deleting) timeout = setTimeout(() => setDeleting(true), 1600);
    else if (charIndex > 0) timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(i => i - 1); }, 35);
    else { setDeleting(false); setRoleIndex(i => (i + 1) % roles.length); }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const particles = Array.from({ length: 70 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + .4, dx: (Math.random() - .5) * .35, dy: (Math.random() - .5) * .35, a: Math.random() * .45 + .08 }));
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.globalAlpha = p.a; ctx.fillStyle = i % 3 === 0 ? '#22d3ee' : '#818cf8'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        p.x += p.dx; p.y += p.dy; if (p.x < 0 || p.x > canvas.width) p.dx *= -1; if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      ctx.globalAlpha = 1;
      particles.forEach((a, i) => particles.slice(i + 1).forEach(b => { const d = Math.hypot(a.x-b.x, a.y-b.y); if (d < 115) { ctx.strokeStyle = `rgba(129,140,248,${.055*(1-d/115)})`; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } }));
      frame = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="orb w-[520px] h-[520px] bg-indigo-600/20 -top-48 -left-40 pulse-glow" />
      <div className="orb w-[420px] h-[420px] bg-cyan-500/10 -bottom-40 right-0 pulse-glow" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <div className="fade-in-up opacity-0-init inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/5 border border-emerald-400/20 text-emerald-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" /> Open to opportunities
          </div>
          <p className="fade-in-up delay-100 opacity-0-init text-indigo-300 font-semibold tracking-[.2em] uppercase text-xs mb-4">Computer Science Student • Developer</p>
          <h1 className="fade-in-up delay-200 opacity-0-init text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[.9]">
            <span className="text-white">Hi i am <span>Raqeem</span></span><span className="text-indigo-400">.</span>
          </h1>
          <div className="fade-in-up delay-300 opacity-0-init mt-6 text-2xl lg:text-3xl font-semibold text-slate-200 h-10 flex justify-center lg:justify-start items-center">
            <span className="text-cyan-400 mr-2">&lt;</span><span>{displayed}</span><span className="cursor-blink text-indigo-400 ml-1">|</span><span className="text-cyan-400 ml-2">/&gt;</span>
          </div>
          <p className="fade-in-up delay-400 opacity-0-init text-slate-400 text-lg max-w-2xl mt-7 leading-relaxed mx-auto lg:mx-0">I build modern, responsive web applications with a focus on clean interfaces, reliable APIs, practical automation and scalable backend systems.</p>
          <div className="fade-in-up delay-500 opacity-0-init flex flex-wrap gap-4 mt-9 justify-center lg:justify-start">
            <a href="#projects" className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shine-effect hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all">Explore Projects <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span></a>
            <a href="/Raqeem-CV.pdf" target="_blank" rel="noreferrer" className="px-7 py-3.5 rounded-full border border-white/15 bg-white/5 text-slate-200 font-semibold hover:bg-white/10 hover:border-indigo-400/50 hover:-translate-y-1 transition-all">View CV</a>
          </div>
          <div className="fade-in-up delay-600 opacity-0-init flex items-center gap-3 mt-8 justify-center lg:justify-start">
            <a href={github} target="_blank" rel="noreferrer" className="social-pill">GitHub ↗</a>
            <a href={linkedin} target="_blank" rel="noreferrer" className="social-pill">LinkedIn ↗</a>
            <a href="mailto:raqeemmughal892@gmail.com" className="social-pill">Email ↗</a>
          </div>
        </div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-slate-500 hover:text-indigo-300 transition-colors text-xs tracking-widest uppercase">Scroll to explore ↓</a>
    </section>
  );
}
