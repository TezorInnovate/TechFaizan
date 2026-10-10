import { ArrowUpRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/types";

export function SiteFooter({ profile }: { profile: PortfolioContent["profile"] }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><span className="eyebrow">LET&apos;S BUILD SOMETHING USEFUL</span><h2>Ideas become credible when they become testable.</h2></div>
        <div className="footer-contact">
          <a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={16} /></a>
          {profile.socials.filter((social) => social.url.trim()).map((social) => <a key={social.id} href={social.url} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={16} /></a>)}
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed for clarity, built for iteration.</span></div>
    </footer>
  );
}
