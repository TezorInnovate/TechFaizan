import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MediaGallery } from "@/components/media-gallery";
import { LinkIcon } from "@/lib/icons";
import { bySlug, getPortfolioContent } from "@/lib/content";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug((await getPortfolioContent()).projects, slug);
  if (!project) return { title: "Project not found" };
  const cover = project.coverImage || project.media.find((item) => item.type === "image")?.url;
  return { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, images: cover ? [cover] : ["/og-cover.svg"] } };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = bySlug((await getPortfolioContent()).projects, slug);
  if (!project) notFound();
  return <>
    <section className="project-hero"><div className="shell project-hero-grid">
      <div><Link className="text-link" href="/projects"><ArrowLeft size={16} /> All projects</Link><span className="eyebrow" style={{ display: "flex", marginTop: 34 }}>{project.category}</span><h1>{project.title}</h1><p className="lead">{project.summary}</p>{project.tags.length ? <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}{project.links.some((item) => item.url.trim()) ? <div className="link-panel">{project.links.filter((item) => item.url.trim()).map((item) => <a key={item.id} className="button secondary" href={item.url} target="_blank" rel="noreferrer"><LinkIcon kind={item.kind} />{item.label}<ArrowUpRight size={15} /></a>)}</div> : null}</div>
      <aside className="project-facts"><div className="project-fact"><span>Year</span><strong>{project.date}</strong></div><div className="project-fact"><span>Status</span><strong>{project.status}</strong></div><div className="project-fact"><span>Role</span><strong>{project.role || "Design & engineering"}</strong></div><div className="project-fact"><span>Discipline</span><strong>{project.category}</strong></div></aside>
    </div><div className="shell"><MediaGallery media={project.media} /></div></section>
    <section className="section"><div className="shell case-layout">
      <aside className="case-aside"><span className="eyebrow">CASE STUDY</span><h2>{project.subtitle || "Inside the build"}</h2><p>{project.description}</p>{project.metrics?.length ? <div className="metric-list">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div> : null}<ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul></aside>
      <div className="case-sections">{project.sections?.map((section, index) => <article className="case-section" key={section.id}><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.body}</p></article>)}</div>
    </div></section>
  </>;
}
