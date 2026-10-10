import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";

export function ProjectCard({ project, index }: { project: ContentItem; index: number }) {
  const cover = project.coverImage || project.media.find((item) => item.type === "image")?.url;
  return (
    <article className="project-card">
      <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        {cover ? <img src={cover} alt="" /> : <span className="image-fallback">TF / {String(index + 1).padStart(2, "0")}</span>}
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
      </Link>
      <div className="project-card-body">
        <div className="meta-row"><span>{project.category}</span><span>{project.date}</span></div>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="tag-list">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link className="text-link" href={`/projects/${project.slug}`}>View case study <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
