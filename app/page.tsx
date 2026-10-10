import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { getPortfolioContent, published } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

export default async function HomePage() {
  const content = await getPortfolioContent();
  const projects = published(content.projects);
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const latest = published(content.updates)[0];
  return <>
    <section className="hero">
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <span className="eyebrow">{content.profile.eyebrow}</span>
          <h1 className="display">{content.profile.heroTitle}</h1>
          <p>{content.profile.introduction}</p>
          <div className="hero-actions">
            <Link className="button" href="/projects">Explore my work <ArrowRight size={18} /></Link>
            {content.profile.resumeUrl ? <a className="button secondary" href={content.profile.resumeUrl} target="_blank" rel="noreferrer">Download resume <Download size={18} /></a> : <Link className="button secondary" href="/contact">Start a conversation <Mail size={18} /></Link>}
          </div>
          <span className="availability">{content.profile.availability}</span>
        </Reveal>
        <Reveal className="hero-aside" delay={.12}>
          <div className="hero-stat"><strong>{String(projects.length).padStart(2, "0")}</strong><span>Documented projects</span></div>
          <div className="hero-stat"><strong>{String(published(content.certificates).length).padStart(2, "0")}</strong><span>Learning credentials</span></div>
          <div className="hero-stat"><strong>01</strong><span>Engineering direction</span></div>
        </Reveal>
      </div>
    </section>
    {latest ? <section className="latest-strip"><div className="shell latest-inner"><span className="eyebrow">LATEST</span><p>{latest.title} — {latest.summary}</p><Link href="/updates">Read update <ArrowRight size={15} /></Link></div></section> : null}
    <section className="section">
      <div className="shell">
        <Reveal className="section-heading"><div><span className="eyebrow">SELECTED WORK</span><h2>Projects where software meets the physical world.</h2></div><p>Each case study documents the system, its constraints, the engineering decisions, and what the prototype taught me.</p></Reveal>
        <div className="project-grid">{featured.map((project, index) => <Reveal key={project.id} delay={index * .06}><ProjectCard project={project} index={index} /></Reveal>)}</div>
        <div style={{ marginTop: 34 }}><Link className="button secondary" href="/projects">View every project <ArrowRight size={17} /></Link></div>
      </div>
    </section>
    <section className="section section-tint">
      <div className="shell">
        <Reveal className="section-heading"><div><span className="eyebrow">ENGINEERING DOMAINS</span><h2>A connected practice, not a list of tools.</h2></div><p>I use these domains together to move from an idea to a working and explainable system.</p></Reveal>
        <div className="domain-grid">
          {content.skills.map((group, index) => <Reveal key={group.id} delay={index * .05} className="domain-card"><span className="number">0{index + 1}</span><div><h3>{group.title}</h3><p>{group.description}</p></div></Reveal>)}
        </div>
      </div>
    </section>
    <section className="section">
      <div className="shell about-grid">
        <Reveal><span className="eyebrow">HOW I WORK</span><h2 style={{ fontSize: "clamp(2.6rem,5vw,5rem)", lineHeight: .98, marginTop: 18 }}>{content.about.heading}</h2></Reveal>
        <Reveal className="prose-large" delay={.08}>{content.about.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="principle-list">{content.about.principles.slice(0, 4).map((principle, index) => <div className="principle" key={principle}><span>0{index + 1}</span>{principle}</div>)}</div><div style={{ marginTop: 28 }}><Link className="text-link" href="/about">More about my journey <ArrowRight size={16} /></Link></div></Reveal>
      </div>
    </section>
  </>;
}
