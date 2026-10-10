import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { getPortfolioContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Contact Faizan Ahmed Syed about AI, robotics, research, internships, or engineering collaboration." };

export default async function ContactPage() {
  const { profile } = await getPortfolioContent();
  return <section className="section"><div className="shell contact-grid">
    <aside className="contact-aside"><span className="eyebrow">CONTACT</span><h1>Have a system worth building?</h1><p>I am open to research, internships, engineering collaborations, and thoughtful conversations about AI and robotics.</p><div className="contact-links"><a href={`mailto:${profile.email}`}><span>{profile.email}</span><ArrowUpRight size={17} /></a>{profile.socials.map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer"><span>{item.label}</span><ArrowUpRight size={17} /></a>)}<div><span>{profile.location}</span><MapPin size={17} /></div></div></aside>
    <ContactForm email={profile.email} />
  </div></section>;
}
