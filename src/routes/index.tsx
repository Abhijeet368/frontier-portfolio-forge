import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Search, ChartNoAxesCombined, Sparkles, Crosshair, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";
import artwork from "@/assets/gang-original.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Abhiii — Data Scientist | A new frontier" },
    { name: "description", content: "Abhiii's data science portfolio. Finding the story in the data, one frontier at a time." },
    { property: "og:title", content: "Abhiii — Data Scientist" },
    { property: "og:description", content: "A curious mind. A love for numbers. A new frontier in data science." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const nextSection = useRef<HTMLElement>(null);
  const [shots, setShots] = useState(0);
  const [activeInterest, setActiveInterest] = useState<number | null>(null);
  const icons = [Search, ChartNoAxesCombined, Sparkles];
  return <>
    <section className="home-hero">
      <img className="hero-art" src={artwork.url} alt="Original Red Dead Redemption 2 artwork of Arthur Morgan and the Van der Linde gang" fetchPriority="high" />
      <div className="hero-art-veil" />
      <span className="hero-stamp">Est. 2026 · A new frontier</span>
      <div className="hero-content reveal-in">
        <div className="eyebrow">Not all outlaws carry a gun.</div>
        <h1 className="hero-title">{portfolio.name}<span>{portfolio.role}</span></h1>
        <p className="hero-subtitle">{portfolio.tagline}</p>
        <p className="hero-description">{portfolio.introduction}</p>
        <div className="hero-actions">
          <Button variant="frontier" asChild><Link to="/work">Explore my work <ArrowUpRight /></Link></Button>
          <Button variant="frontierOutline" asChild><Link to="/about">Meet the outlaw <ArrowUpRight /></Link></Button>
        </div>
      </div>
      <div className="target-game">
        <Button variant="nav" size="icon" className="target-button" title="Take a shot" aria-label="Take a shot" onClick={() => setShots(shots + 1)}><Crosshair /></Button>
        {shots > 0 && <><span className="shot-counter" aria-live="polite">{String(shots).padStart(2, "0")} / ON TARGET</span><Button variant="nav" size="icon" title="Reset targets" aria-label="Reset targets" onClick={() => setShots(0)}><RotateCcw /></Button></>}
      </div>
      {shots > 0 && <div key={shots} className="shot-flash" aria-hidden="true" />}
      <span className="hero-coordinate">DATA. DISCOVERY. A LITTLE REDEMPTION.</span>
    </section>
    <div className="status-band">
      <span className="status"><span className="status-dot" />{portfolio.availability}</span>
      <span className="status-middle">Curiosity is my compass</span>
      <Button variant="nav" className="scroll-link" onClick={() => nextSection.current?.scrollIntoView({ behavior: "smooth" })}>Keep riding <ArrowDown size={14} /></Button>
    </div>
    <section className="section-content" ref={nextSection}>
      <div className="section-heading"><div><div className="section-number">01 / The way I think</div><h2>Every dataset has a story.</h2></div><p>I follow the trail from a good question to an even better discovery.</p></div>
      <div className="interest-grid">{portfolio.interests.map((item, i) => {
        const Icon = icons[i] ?? Search;
        return <article className={activeInterest === i ? "interest-item interest-active" : "interest-item"} key={item.title}>
          <div className="interest-top"><Icon /><span>0{i + 1}</span></div>
          <Button variant="nav" className="interest-title" onClick={() => setActiveInterest(activeInterest === i ? null : i)} aria-expanded={activeInterest === i}>{item.title}<ArrowUpRight /></Button>
          <p>{item.description}</p>
          {activeInterest === i && <div className="interest-discovery reveal-in"><Crosshair size={13} /><span>{portfolio.skills[i] ?? "Follow the evidence"}</span></div>}
        </article>;
      })}</div>
    </section>
    <section className="trail-banner"><div><h2>The trail is just beginning.</h2><p>No tall tales. Just a data scientist with a lot to explore.</p></div><Button variant="frontierOutline" asChild><Link to="/contact">Let's talk <ArrowUpRight /></Link></Button></section>
  </>;
}
