import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContentCard } from "@/components/content-card";
import { getPortfolioContent, published } from "@/lib/content";

export const metadata: Metadata = { title: "Research", description: "Research papers, technical studies, and ongoing investigations by Faizan Ahmed Syed." };
export const revalidate = 60;

export default async function ResearchPage() {
  const content = await getPortfolioContent();
  const papers = published(content.papers);
  const researchProjects = published(content.projects).filter((item) => item.category?.toLowerCase().includes("research"));
  return <><PageIntro eyebrow="RESEARCH" title="Questions, experiments, evidence, and technical writing." description="Published papers and ongoing research will live here with source links, media, collaborators, and supporting project work." /><section className="section"><div className="shell">
    {papers.length ? <div className="content-grid">{papers.map((paper) => <ContentCard key={paper.id} item={paper} href={`/research/${paper.slug}`} />)}</div> : <div className="empty-state"><h2>Research archive in progress</h2><p>No paper has been published here yet. The admin dashboard is ready for the first publication, DOI, PDF, poster, and related links.</p></div>}
    {researchProjects.length ? <div style={{ marginTop: 70 }}><div className="section-heading"><div><span className="eyebrow">RELATED STUDIES</span><h2>Research-oriented project work.</h2></div></div><div className="content-grid">{researchProjects.map((item) => <ContentCard key={item.id} item={item} href={`/projects/${item.slug}`} />)}</div></div> : null}
  </div></section></>;
}
