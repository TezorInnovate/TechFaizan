"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PortfolioContent } from "@/lib/types";

const baseNav = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/research", "Research"],
  ["/achievements", "Achievements"],
  ["/updates", "Updates"],
  ["/contact", "Contact"],
] as const;

export function SiteHeader({ profile, clubEnabled }: { profile: PortfolioContent["profile"]; clubEnabled: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const nav = clubEnabled ? [...baseNav.slice(0, 6), ["/club", "Club"] as const, ...baseNav.slice(6)] : baseNav;
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label={`${profile.name} home`}>
          <span className="brand-mark">TF</span>
          <span className="brand-copy"><strong>{profile.shortName}</strong><small>AI & Robotics</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([href, label]) => <Link key={href} className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          {profile.resumeUrl ? <a className="button small secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a> : null}
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Mobile navigation">
        {nav.map(([href, label]) => <Link key={href} className={pathname === href ? "active" : ""} href={href}>{label}</Link>)}
        {profile.resumeUrl ? <a href={profile.resumeUrl} target="_blank" rel="noreferrer">Download resume</a> : null}
      </nav>
    </header>
  );
}
