import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { MediaGallery } from "@/components/media-gallery";
import { getPortfolioContent } from "@/lib/content";

export const metadata: Metadata = { title: "Club", description: "Club leadership, activities, announcements, and community work by Faizan Ahmed Syed." };
export const revalidate = 60;

export default async function ClubPage() {
  const { club } = await getPortfolioContent();
  if (!club.enabled) notFound();
  return <><PageIntro eyebrow="CLUB & COMMUNITY" title={club.name} description={club.summary} /><section className="section"><div className="shell case-layout"><aside className="case-aside"><span className="eyebrow">MY ROLE</span><h2>{club.role}</h2>{club.links.some((item) => item.url.trim()) ? <div className="link-panel">{club.links.filter((item) => item.url.trim()).map((item) => <a className="button secondary" href={item.url} target="_blank" rel="noreferrer" key={item.id}>{item.label}</a>)}</div> : null}</aside><div className="prose-large"><p>{club.description}</p><MediaGallery media={club.media} /></div></div></section></>;
}
