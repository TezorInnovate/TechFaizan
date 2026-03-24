import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../components/profile/ProfileCard";

gsap.registerPlugin(ScrollTrigger);

export default function TerminalHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const age = (() => {
    const dob = new Date(2004, 4, 7);
    const now = new Date();
    let a = now.getFullYear() - dob.getFullYear();
    const beforeBirthday =
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
    if (beforeBirthday) a--;
    return a;
  })();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── ALL CONTENT VISIBLE ON LOAD (no scroll triggers for hero content) ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Boot line fades in first
      tl.fromTo(
        ".boot-line",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 }
      );

      // System logs
      tl.fromTo(
        ".system-log",
        { opacity: 0, x: -20, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );

      // Command line
      tl.fromTo(
        ".command-line",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      // Hero title words
      tl.fromTo(
        ".hero-word",
        { opacity: 0, y: 30, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.2)" },
        "-=0.2"
      );

      // About command line
      tl.fromTo(
        ".about-command",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Divider
      tl.fromTo(
        ".about-divider",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.3"
      );

      // About lines — all visible immediately on load
      tl.fromTo(
        ".about-line",
        { opacity: 0, x: -16, filter: "blur(3px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      // Profile card
      tl.fromTo(
        ".profile-card-wrap",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" },
        "-=0.6"
      );

      // After-prompt and status cards
      tl.fromTo(
        ".after-prompt",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
      tl.fromTo(
        ".status-card",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" },
        "-=0.3"
      );

      // ── AMBIENT LOOPS ─────────────────────────────────────────
      gsap.to(".cursor",   { opacity: 0, repeat: -1, yoyo: true, duration: 0.6, ease: "power1.inOut" });
      gsap.to(".cursor-2", { opacity: 0, repeat: -1, yoyo: true, duration: 0.6, ease: "power1.inOut" });
      gsap.to(".system-log", {
        opacity: 0.5, repeat: -1, yoyo: true, duration: 3,
        stagger: { each: 0.8, repeat: -1 }, ease: "sine.inOut",
      });
      gsap.to(".boot-line",    { opacity: 0.6, repeat: -1, yoyo: true, duration: 4,   ease: "sine.inOut" });
      gsap.to(".command-line", { opacity: 0.7, repeat: -1, yoyo: true, duration: 3.5, ease: "sine.inOut" });
      gsap.to(".hero-title",   { opacity: 0.92, repeat: -1, yoyo: true, duration: 5,  ease: "sine.inOut" });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const hi = (s) => <span className="text-blue-400" style={{ color: "var(--blue-accent)" }}>{s}</span>;

  return (
    <div ref={containerRef}>
      {/*
        HOME — content laid flat on the page, no subwindow wrapper.
        The star canvas in the background provides the visual depth.
        Nav sits above (position: fixed), so we use pt-20 to clear it.
      */}
      <section
        className="relative z-20 min-h-screen flex items-start justify-center px-6 pt-24 pb-24"
        style={{ perspective: "1200px" }}
      >
        <div className="w-full max-w-5xl mx-auto space-y-6">

          {/* ── BOOT SEQUENCE ─────────────────────────────────── */}
          <div className="boot-line font-mono text-sm" style={{ color: "var(--blue-accent)" }}>
            Tezor@system:~$ boot
          </div>

          <div className="text-white/60 text-xs space-y-1 font-mono">
            <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
              [ OK ] core modules loaded
            </p>
            <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
              [ OK ] actuator system initiated
            </p>
            <p className="system-log hover:text-white/90 hover:translate-x-1 transition-all duration-300">
              [ OK ] system up and running
            </p>
          </div>

          <div className="command-line font-mono text-sm pt-2">
            <span style={{ color: "var(--blue-accent)" }}>Tezor@system:~$</span>{" "}
            <span className="text-white">
              A portfolio for all my accomplishments. Under Development ...
            </span>
            <span className="cursor" style={{ color: "var(--blue-accent)" }}>▋</span>
          </div>

          {/* ── HERO TITLE ───────────────────────────────────── */}
          <h1
            className="hero-title text-3xl md:text-5xl font-black tracking-tight uppercase pt-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span
              className="hero-word inline-block transition-all duration-300 cursor-default"
              style={{ color: "var(--text-bright)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--blue-accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-bright)"}
            >
              Domain:
            </span>{" "}
            <span
              className="hero-word inline-block transition-all duration-300 cursor-default"
              style={{ color: "var(--blue-accent)" }}
            >
              AI and ROBOTICS
            </span>
            <br />
            <span
              className="hero-word inline-block transition-all duration-300 cursor-default"
              style={{ color: "var(--text-bright)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--blue-accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-bright)"}
            >
              Dreams
            </span>{" "}
            <span
              className="hero-word inline-block transition-all duration-300 cursor-default"
              style={{ color: "var(--text-bright)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--blue-accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-bright)"}
            >
              That
            </span>{" "}
            <span
              className="hero-word inline-block transition-all duration-300 cursor-default"
              style={{ color: "var(--blue-accent)" }}
            >
              build Worlds
            </span>
          </h1>

          {/* ── THIN SEPARATOR ───────────────────────────────── */}
          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(90deg, var(--blue-accent), transparent)" }}
          />

          {/* ── ABOUT COMMAND ────────────────────────────────── */}
          <div className="about-command font-mono text-sm">
            <span style={{ color: "var(--blue-accent)" }}>Tezor@system:~$</span>{" "}
            <span className="text-white">about --Faizan</span>
          </div>

          <div
            className="about-divider h-px w-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />

          {/* ── ABOUT CONTENT: bio + profile card side by side ─ */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* stdout lines */}
            <div className="flex-1 space-y-3 text-sm leading-relaxed font-mono">
              {[
                <span>I'm a {hi(`${age} year old`)} computer science student in {hi("Noida")}, interested in {hi("AI and Robotics")} and practical solutions.</span>,
                <span>{hi("Theory. Structure. Execution.")} Turning ideas into working systems.</span>,
                <span>I prefer {hi("comprehensive systems")} with in-depth research, {hi("principles")} and evolving technologies.</span>,
                <span>Transitioning {hi("beyond code scripts")} towards real-world implementation systems.</span>,
              ].map((line, i) => (
                <p key={i} className="about-line">
                  <span className="mr-2 select-none" style={{ color: "rgba(79,158,248,0.7)" }}>›</span>
                  <span className="text-white/80">{line}</span>
                </p>
              ))}
            </div>

            {/* Profile Card */}
            <div
              className="profile-card-wrap flex-1 flex items-center justify-center lg:justify-end w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ProfileCard
                name="Faizan Ahmed Syed"
                title="B.Tech CSE Student"
                handle="Tezor"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/faizan.png"
                grainUrl="/grain.webp"
                iconUrl="/iconpattern.png"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => navigate("/contact")}
                showBehindGlow
                behindGlowColor="rgba(79,158,248,0.35)"
              />
            </div>
          </div>

          {/* ── AFTER PROMPT ─────────────────────────────────── */}
          <div className="after-prompt font-mono text-sm pt-1">
            <span style={{ color: "var(--blue-accent)" }}>Tezor@system:~$</span>{" "}
            <span className="cursor-2" style={{ color: "var(--blue-accent)" }}>▋</span>
          </div>

          {/* ── STATUS CARDS ─────────────────────────────────── */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-4 border-t"
            style={{ borderColor: "rgba(79,158,248,0.15)" }}
          >
            {[
              { label: "LOCAL TIME",  value: time,                          color: "var(--blue-soft)",  dot: false },
              { label: "STATUS",      value: "AVAILABLE",                   color: "#4ade80",            dot: true  },
              { label: "FOCUS",       value: "AIML · Robotics · Research",  color: "rgba(255,255,255,0.7)", dot: false },
              { label: "MODE",        value: "Design and Implement",         color: "rgba(255,255,255,0.7)", dot: false },
            ].map(({ label, value, color, dot }) => (
              <div
                key={label}
                className="status-card group p-3 rounded-lg transition-all duration-300 font-mono"
                style={{ background: "rgba(79,158,248,0.04)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(79,158,248,0.09)";
                  e.currentTarget.style.border = "1px solid rgba(79,158,248,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(79,158,248,0.04)";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
              >
                <p className="text-white/40 mb-1">{label}</p>
                <p className="font-semibold flex items-center gap-2" style={{ color }}>
                  {value}
                  {dot && (
                    <span
                      className="inline-block w-2 h-2 rounded-full animate-pulse"
                      style={{ background: "#4ade80" }}
                    />
                  )}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
