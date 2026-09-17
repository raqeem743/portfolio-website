import { useEffect, useState } from 'react';
const links = [['Home','home'],['About','about'],['Skills','skills'],['Projects','projects'],['Contact','contact']];
export default function Navbar() {
  const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false); const [active,setActive]=useState('home');
  useEffect(()=>{ const onScroll=()=>{setScrolled(scrollY>30); for(const [,id] of [...links].reverse()){const el=document.getElementById(id); if(el && scrollY>=el.offsetTop-150){setActive(id);break;}}}; onScroll(); addEventListener('scroll',onScroll); return()=>removeEventListener('scroll',onScroll)},[]);
  return <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled?'bg-[#090911]/85 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20':'bg-transparent'}`}>
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#home" className="flex items-center gap-3 group"><span className="logo-mark">R</span><span className="font-bold text-white group-hover:text-indigo-300 transition-colors">Raqeem<span className="text-indigo-400">.</span></span></a>
      <div className="hidden md:flex items-center gap-7">{links.map(([label,id])=><a key={id} href={`#${id}`} className={`nav-link ${active===id?'active':''}`}>{label}</a>)}</div>
      <a href="/Raqeem-CV.pdf" target="_blank" rel="noreferrer" className="hidden md:inline-flex px-5 py-2.5 rounded-full border border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/10 hover:-translate-y-0.5 transition-all text-sm font-semibold">Resume ↗</a>
      <button aria-label="Toggle menu" onClick={()=>setOpen(!open)} className="md:hidden w-10 h-10 rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1.5"><span className={`w-5 h-0.5 bg-white transition ${open?'rotate-45 translate-y-2':''}`}/><span className={`w-5 h-0.5 bg-white transition ${open?'opacity-0':''}`}/><span className={`w-5 h-0.5 bg-white transition ${open?'-rotate-45 -translate-y-2':''}`}/></button>
    </div>
    <div className={`md:hidden overflow-hidden transition-all duration-300 ${open?'max-h-96 opacity-100':'max-h-0 opacity-0'}`}><div className="px-6 pb-5 pt-2 bg-[#0d0d16]/95 border-t border-white/5">{links.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className="block py-3 text-slate-300 hover:text-indigo-300">{label}</a>)}<a href="/Raqeem-CV.pdf" target="_blank" rel="noreferrer" className="block text-center mt-2 px-5 py-3 rounded-xl bg-indigo-500 text-white font-semibold">View CV</a></div></div>
  </nav>
}
