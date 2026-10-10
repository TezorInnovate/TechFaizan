import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { ContentCard } from "@/components/content-card";
import { formatDateRange, getPortfolioContent, published } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "About Faizan Ahmed Syed, his education, interests, skills, and engineering approach." };
export const revalidate = 60;

export default async function AboutPage() {
  const content = await getPortfolioContent();
  const education = published(content.education);
  const experience = published(content.experience);
  return <>
    <PageIntro eyebrow="ABOUT" title="Curiosity becomes useful through disciplined building." description="My path through computer science, applied AI, robotics, and system engineering." />
    <section className="section"><div className="shell about-grid">
      <Reveal className="portrait-frame"><img src={content.profile.avatarUrl || "/profile-placeholder.svg"} alt={`Portrait of ${content.profile.name}`} /><div className="portrait-caption"><span>{content.profile.name}</span><span>{content.profile.location}</span></div></Reveal>
      <Reveal className="prose-large" delay={.08}><span className="eyebrow">CURRENT DIRECTION</span><h2 style={{ fontSize: "clamp(2.7rem,5vw,5.4rem)", lineHeight: .98, margin: "18px 0 30px" }}>{content.about.heading}</h2>{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="principle-list">{content.about.principles.map((principle, index) => <div className="principle" key={principle}><span>{String(index + 1).padStart(2, "0")}</span>{principle}</div>)}</div></Reveal>
    </div></section>
    <section className="section section-tint"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">EDUCATION</span><h2>Building the theoretical base behind practical systems.</h2></div></Reveal><div className="timeline">{education.map((item) => <Reveal key={item.id} className="timeline-item"><div className="meta-row"><span>{item.organization}</span><span>{formatDateRange(item)}</span></div><h3>{item.title}</h3><p>{item.summary}</p></Reveal>)}</div></div></section>
    {experience.length ? <section className="section"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">EXPERIENCE</span><h2>Applied work and collaborations.</h2></div></Reveal><div className="content-grid">{experience.map((item) => <ContentCard item={item} key={item.id} />)}</div></div></section> : null}
    <section className="section"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">CAPABILITIES</span><h2>Tools grouped by how they contribute to a system.</h2></div></Reveal><div className="skills-grid">{content.skills.map((group) => <Reveal className="skill-group" key={group.id}><h3>{group.title}</h3><p>{group.description}</p><div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div></div></section>
  </>;
}
