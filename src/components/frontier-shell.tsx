import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Crosshair, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

export function FrontierShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [deadEye, setDeadEye] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => { setMenuOpen(false); setDeadEye(false); }, [pathname]);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  function playClick() {
    if (!sound) return;
    const ctx = audio.current ?? new AudioContext();
    audio.current = ctx;
    void ctx.resume();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(110, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    oscillator.connect(gain); gain.connect(ctx.destination);
    oscillator.start(); oscillator.stop(ctx.currentTime + 0.15);
  }
  return <div className={`frontier-site ${deadEye ? "dead-eye-active" : ""}`} onClick={playClick}>
    <div ref={cursor} className="frontier-cursor" aria-hidden="true"><Crosshair /></div>
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Abhiii home">{portfolio.name}<span>®</span></Link>
      <nav aria-label="Main navigation" className={menuOpen ? "main-nav nav-open" : "main-nav"}>
        {([{ to: "/", label: "Home", n: "01" }, { to: "/about", label: "About", n: "02" }, { to: "/work", label: "The work", n: "03" }, { to: "/contact", label: "Contact", n: "04" }] as const).map(item =>
          <Link key={item.to} to={item.to} className={pathname === item.to ? "nav-link active" : "nav-link"}><span>{item.n}</span>{item.label}</Link>
        )}
      </nav>
      <div className="header-controls">
        <Button variant="nav" size="icon" onClick={() => setSound(!sound)} title={sound ? "Mute sound" : "Enable sound effects"} aria-label={sound ? "Mute sound" : "Enable sound effects"} aria-pressed={sound}>{sound ? <Volume2 /> : <VolumeX />}</Button>
        <span className="header-rule" />
        <Button variant="nav" size="icon" onClick={() => setDeadEye(!deadEye)} title="Toggle Dead Eye" aria-label="Toggle Dead Eye" aria-pressed={deadEye}><Crosshair /></Button>
        <Button variant="nav" size="icon" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><Link to="/" className="brand">{portfolio.name}<span>®</span></Link><span>A little grit. A lot of curiosity.</span><Link to="/contact">Ride with me <ArrowUpRight size={15} /></Link><small>Unofficial RDR2-inspired portfolio. Artwork © Rockstar Games.</small></footer>
    {deadEye && <div className="dead-eye-label"><Crosshair size={16} /> DEAD EYE</div>}
  </div>;
}