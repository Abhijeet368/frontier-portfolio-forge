import { createFileRoute } from "@tanstack/react-router";
import { Crosshair } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { PageHeading } from "@/components/page-heading";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "Meet the outlaw — Abhiii" }, { name: "description", content: "Meet Abhiii, a curious data scientist exploring patterns and the stories behind numbers." }, { property: "og:title", content: "Meet the outlaw — Abhiii" }, { property: "og:description", content: "The mind behind the numbers. Get to know Abhiii." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: About,
});
function About() { return <><PageHeading number="02" label="The person behind the data" title="Meet the outlaw." description={portfolio.tagline} /><section className="section-content about-layout reveal-in"><div><div className="section-number">My story</div><h2>Curiosity over certainty.</h2><p>{portfolio.about}</p></div><div><div className="section-number">The territories I explore</div><div className="skills-list">{portfolio.skills.map((skill, i) => <div key={skill} className="skill-row"><span>0{i + 1} / {skill}</span><Crosshair size={18} /></div>)}</div></div></section></>; }