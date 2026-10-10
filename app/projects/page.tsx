import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getPortfolioContent, published } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "AI, robotics, autonomous systems, cybersecurity, and computer-vision projects by Faizan Ahmed Syed." };
export const revalidate = 60;

export default async function ProjectsPage() {
  const content = await getPortfolioContent();
  const projects = published(content.projects);
  return <><PageIntro eyebrow="PROJECTS" title="Systems designed, assembled, tested, and explained." description="A growing collection of work across robotics, computer vision, autonomous systems, cybersecurity, and applied research." /><section className="section"><div className="shell"><div className="project-grid">{projects.map((project, index) => <Reveal key={project.id} delay={(index % 2) * .05}><ProjectCard project={project} index={index} /></Reveal>)}</div></div></section></>;
}
