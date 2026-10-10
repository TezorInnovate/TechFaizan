import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ContentItem } from "@/lib/types";

export function ContentCard({ item, href }: { item: ContentItem; href?: string }) {
  const media = item.media[0];
  return <article className="content-card">
    {media || item.coverImage ? <div className="content-card-media">{href ? <Link href={href} aria-label={`View ${item.title}`}>{media?.type === "video" ? <video src={media.url} muted playsInline preload="metadata" /> : <img src={media?.url || item.coverImage} alt={media?.alt || ""} />}</Link> : media?.type === "video" ? <video src={media.url} muted playsInline preload="metadata" /> : <img src={media?.url || item.coverImage} alt={media?.alt || ""} />}</div> : null}
    <div className="meta-row"><span>{item.category || item.organization}</span><span>{item.date || [item.startDate, item.endDate].filter(Boolean).join(" — ")}</span></div>
    <h3>{href ? <Link href={href}>{item.title}</Link> : item.title}</h3>
    {item.subtitle ? <p className="subtitle">{item.subtitle}</p> : null}
    <p>{item.summary}</p>
    {item.status ? <span className="status-pill">{item.status}</span> : null}
    {href || item.links.some((link) => link.url.trim()) ? <div className="inline-links">{href ? <Link href={href}>View details<ArrowUpRight size={14} /></Link> : null}{item.links.filter((link) => link.url.trim()).slice(0, href ? 2 : undefined).map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}</div> : null}
  </article>;
}
