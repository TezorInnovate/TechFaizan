import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const skillsGridRef = useRef(null);
  const certificationsRef = useRef(null);
  const resumeButtonRef = useRef(null);

  // Secret combination state (preserved from original)
  const [secretSequence, setSecretSequence] = useState([]);
  const secretCode = ['header', 'skill-0', 'cert-0', 'cert-2', 'cert-1'];

  const handleSecretClick = (identifier) => {
    setSecretSequence(prev => {
      const newSequence = [...prev, identifier];
      const recentClicks = newSequence.slice(-secretCode.length);
      if (JSON.stringify(recentClicks) === JSON.stringify(secretCode)) {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('epoxyAccessToken', token);
        setTimeout(() => { window.location.href = `/${token}`; }, 300);
        return [];
      }
      return newSequence.slice(-10);
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Header enters
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -50, rotateX: -45, transformOrigin: "top center" },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power4.out" }
      );

      // Description slides in
      tl.fromTo(
        ".desc-reveal",
        { opacity: 0, x: -40, filter: "blur(8px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Divider expands
      tl.fromTo(
        ".divider-reveal",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "power2.inOut" },
        "-=0.4"
      );

      // Skills list items stagger in
      tl.fromTo(
        ".skill-item-row",
        { opacity: 0, x: -30, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.06, ease: "power2.out" },
        "-=0.5"
      );

      // Perspective cards
      gsap.utils.toArray(".perspective-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Certifications section
      if (certificationsRef.current) {
        gsap.fromTo(
          certificationsRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: certificationsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Certification cards
      gsap.utils.toArray(".cert-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateX: 15 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.8, delay: index * 0.1, ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Resume button
      if (resumeButtonRef.current) {
        gsap.fromTo(
          resumeButtonRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 0.7, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: resumeButtonRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Parallax on perspective cards
      gsap.utils.toArray(".perspective-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card, start: "top bottom", end: "bottom top", scrub: 1,
          },
          y: -30 * (i % 2 === 0 ? 1 : 0.7), ease: "none",
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    "AI Stack: AIML, DL, CNN, GenAI, LLM",
    "Programming: C/C++, Java, Python",
    "Microcontrollers: ESP32, Arduino, Raspberry Pi",
    "Autonomous Systems and Robotics Integration",
    "ROS2 Sensor Fusion and Gazebo Simulation",
    "AutoCAD, Autodesk Inventor, SolidWorks",
    "Git & GitHub",
    "Project Planning and Technical Documentation",
    "Assembly, Testing, Debugging",
  ];

  const certifications = [
    {
      title: "Software Testing",
      issuer: "NPTEL SWAYAM",
      date: "Jan-Feb 2024",
      color: "blue"
    },
    {
      title: "Python for Data Science",
      issuer: "NPTEL SWAYAM",
      date: "Jul-Aug 2024",
      color: "violet"
    },
    {
      title: "AutoCAD 2D, 3D",
      issuer: "Design Master",
      date: "June-Aug 2025",
      color: "blue"
    },
    {
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2025",
      color: "violet"
    },
    {
      title: "Advanced Robotics Applications",
      issuer: "NPTEL SWAYAM",
      date: "Jan-Mar 2026 (on-going)",
      color: "blue"
    },
    {
      title: "Neural Networks for Computer Vision and NLP",
      issuer: "NPTEL SWAYAM",
      date: "Jan-Mar 2026 (on-going)",
      color: "violet"
    },
  ];

  const colorMap = {
    blue: {
      border:    'hover:border-blue-400/50',
      shadow:    '0 20px 40px rgba(79,158,248,0.15)',
      gradient:  'linear-gradient(135deg, var(--blue-accent), var(--blue-soft))',
      glow:      'rgba(79,158,248,0.2)',
      accent:    'var(--blue-accent)',
      accentBar: 'linear-gradient(90deg, var(--blue-accent), var(--blue-soft))',
    },
    violet: {
      border:    'hover:border-violet-400/50',
      shadow:    '0 20px 40px rgba(167,139,250,0.15)',
      gradient:  'linear-gradient(135deg, var(--violet-soft), #818cf8)',
      glow:      'rgba(167,139,250,0.2)',
      accent:    'var(--violet-soft)',
      accentBar: 'linear-gradient(90deg, var(--violet-soft), #818cf8)',
    },
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/FAIZAN AHMED SYED RESUME.pdf';
    link.download = 'FAIZAN_AHMED_SYED_RESUME.pdf';
    link.click();
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 min-h-screen px-6 pt-1 pb-12 text-white"
      style={{ perspective: "1500px" }}
    >

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="max-w-5xl mx-auto mb-10 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => handleSecretClick('header')}
      >
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, var(--text-bright) 0%, var(--blue-soft) 60%, var(--blue-accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Skills
        </h1>

        <p className="desc-reveal mt-3 max-w-3xl" style={{ color: 'var(--text-muted)' }}>
          A list of tools, technologies, and systems that I have personally used
        </p>

        <div
          className="divider-reveal mt-6 h-px w-full"
          style={{ background: 'linear-gradient(90deg, var(--blue-accent), rgba(79,158,248,0.1), transparent)' }}
        />
      </div>

      {/* ── SKILLS LIST — flat on page, no terminal wrapper ──────── */}
      <div
        ref={skillsGridRef}
        className="max-w-4xl mx-auto w-full mb-16"
      >
        <div className="flex flex-col gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item-row flex items-center px-6 py-5 rounded-full transition-all duration-300 group"
              style={{
                border: '1px solid var(--border-dim)',
                background: 'rgba(79,158,248,0.04)',
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => handleSecretClick(`skill-${index}`)}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(79,158,248,0.09)';
                e.currentTarget.style.borderColor = 'rgba(79,158,248,0.35)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(79,158,248,0.1)';
                e.currentTarget.style.transform = 'scale(1.01) translateX(4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(79,158,248,0.04)';
                e.currentTarget.style.borderColor = 'var(--border-dim)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span
                className="text-sm font-mono mr-4 transition-colors duration-300"
                style={{ color: 'var(--blue-accent)' }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-lg font-medium tracking-wide transition-all duration-300"
                style={{ color: 'var(--text-bright)' }}
              >
                {skill}
              </span>
              {/* subtle right-side accent on hover */}
              <div
                className="ml-auto w-0 h-0.5 group-hover:w-8 transition-all duration-500 rounded-full"
                style={{ background: 'var(--blue-accent)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── SKILLS PERSPECTIVE CARDS ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1500px" }}>

          {/* Card 1 */}
          <div
            className="perspective-card group rounded-2xl p-6 transition-all duration-500"
            style={{
              border: '1px solid var(--border-dim)',
              background: 'rgba(4,8,26,0.5)',
              backdropFilter: 'blur(12px)',
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(79,158,248,0.4)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(79,158,248,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-dim)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest mb-3 transition-colors duration-300" style={{ color: 'var(--blue-accent)' }}>
              Artificial Intelligence and Machine Learning
            </h3>
            <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              My work in AI and machine learning focuses on building practical, deployable systems rather than purely theoretical models. I develop supervised and unsupervised models for anomaly detection, cybersecurity, computer vision, and emotion recognition, working with structured data, time-series signals (EEG), and image inputs using CNN and hybrid architectures, while emphasising feature engineering, model optimisation, performance evaluation (accuracy, F1-score, confusion matrix), and efficient deployment. I also explore hybrid deep learning and neuro-symbolic approaches to create interpretable, adaptive models suited for real-world use.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: 'linear-gradient(90deg, var(--blue-accent), var(--violet-soft))' }} />
          </div>

          {/* Card 2 */}
          <div
            className="perspective-card group rounded-2xl p-6 transition-all duration-500"
            style={{
              border: '1px solid var(--border-dim)',
              background: 'rgba(4,8,26,0.5)',
              backdropFilter: 'blur(12px)',
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(167,139,250,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-dim)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest mb-3 transition-colors duration-300" style={{ color: 'var(--violet-soft)' }}>
              Robotics Software and Hardware Design
            </h3>
            <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              My approach to robotics integrates embedded hardware systems with intelligent control software. I design systems using microcontrollers and single-board computers such as the Raspberry Pi, integrating sensors, actuators, cameras, and communication modules, while developing control logic, perception modules, and AI-driven decision layers for autonomous drones, surveillance platforms, and robotic systems. I emphasise sensor fusion, real-time data processing, hardware–software interfacing, and robust system architecture to ensure stable, fault-tolerant performance in dynamic environments.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: 'linear-gradient(90deg, var(--violet-soft), #818cf8)' }} />
          </div>

          {/* Card 3 */}
          <div
            className="perspective-card group rounded-2xl p-6 transition-all duration-500"
            style={{
              border: '1px solid var(--border-dim)',
              background: 'rgba(4,8,26,0.5)',
              backdropFilter: 'blur(12px)',
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(126,200,227,0.4)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(126,200,227,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-dim)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest mb-3 transition-colors duration-300" style={{ color: 'var(--blue-soft)' }}>
              Research and Innovation
            </h3>
            <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              Research focuses on building novel, application-driven systems that address real-world challenges in cybersecurity, autonomous systems, and intelligent perception, supported by structured experimentation, comparative model analysis, and system-level validation aligned with academic standards. Work includes interdisciplinary integration—such as combining GANs with ANFIS models, hybrid CNN–ViT architectures, and AI-based self-healing cybersecurity frameworks—while emphasising innovation through identifying limitations in existing systems, proposing hybrid or efficiency-oriented alternatives, and validating them through implementation and measurable performance improvements.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: 'linear-gradient(90deg, var(--blue-soft), var(--blue-accent))' }} />
          </div>

          {/* Card 4 */}
          <div
            className="perspective-card group rounded-2xl p-6 transition-all duration-500"
            style={{
              border: '1px solid var(--border-dim)',
              background: 'rgba(4,8,26,0.5)',
              backdropFilter: 'blur(12px)',
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)';
              e.currentTarget.style.transform = 'scale(1.02) translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(52,211,153,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-dim)';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest mb-3 transition-colors duration-300" style={{ color: '#34d399' }}>
              Autonomy and Integrated Systems
            </h3>
            <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              Autonomous systems are designed to integrate perception, reasoning, and action within a unified architecture, including multi-module pipelines where detection, decision-making, and response mechanisms operate cohesively. This work spans behaviour-based anomaly detection systems, autonomous cybersecurity defence frameworks, intelligent drones, and AI-assisted robotic platforms, with emphasis on modular design, agent-based architectures, real-time decision pipelines, and integrated feedback mechanisms to ensure adaptability, resilience, and operational independence.
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: 'linear-gradient(90deg, #34d399, #10b981)' }} />
          </div>

        </div>
      </div>

      {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
      <div ref={certificationsRef} className="max-w-5xl mx-auto mt-20">

        <div className="mb-10">
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, var(--text-bright) 0%, var(--blue-soft) 60%, var(--blue-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Certifications
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="max-w-2xl">
            Professional certifications and courses completed to validate and expand my technical expertise.
          </p>
          <div
            className="mt-6 h-px w-full"
            style={{ background: 'linear-gradient(90deg, var(--blue-accent), rgba(79,158,248,0.1), transparent)' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const c = colorMap[cert.color] || colorMap.blue;
            return (
              <div
                key={index}
                className="cert-card group relative rounded-2xl p-6 overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  border: '1px solid var(--border-dim)',
                  background: 'rgba(6,12,34,0.6)',
                  backdropFilter: 'blur(12px)',
                  transformStyle: "preserve-3d",
                }}
                onClick={() => handleSecretClick(`cert-${index}`)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.03) translateY(-6px)';
                  e.currentTarget.style.boxShadow = c.shadow;
                  e.currentTarget.style.borderColor = c.glow.replace('0.2)', '0.4)');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-dim)';
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: c.gradient }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p
                  className="text-sm font-mono uppercase tracking-wider mb-1 transition-colors duration-300"
                  style={{ color: c.accent }}
                >
                  {cert.issuer}
                </p>
                <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                  {cert.date}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-4 h-1 w-0 group-hover:w-full transition-all duration-700 rounded-full"
                  style={{ background: c.accentBar }}
                />

                {/* Glow effect */}
                <div
                  className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 rounded-2xl"
                  style={{ background: c.gradient }}
                />
              </div>
            );
          })}
        </div>

        {/* Note + Resume Button */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
            More certifications and continuous learning in progress...
          </p>

          <div ref={resumeButtonRef}>
            <button
              onClick={(e) => {
                handleResumeDownload();
                handleSecretClick('resume');
              }}
              className="group relative px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden backdrop-blur-xl"
              style={{
                background: 'linear-gradient(145deg, rgba(6,12,34,0.8), rgba(10,21,53,0.6))',
                border: '1px solid var(--border-dim)',
              }}
            >
              {/* Gradient border glow */}
              <div className="absolute inset-0 rounded-2xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute inset-0 rounded-2xl blur-sm"
                  style={{ background: 'linear-gradient(90deg, var(--blue-soft), var(--blue-accent), var(--violet-soft))' }}
                />
              </div>

              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Download Resume
                </span>
              </span>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: 'linear-gradient(145deg, rgba(79,158,248,0.12), rgba(167,139,250,0.1))' }}
              />

              {/* Shine sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl">
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(126,200,227,0.25), transparent)' }}
                />
              </div>

              {/* Outer glow */}
              <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
                style={{ background: 'linear-gradient(90deg, rgba(79,158,248,0.25), rgba(167,139,250,0.2))' }}
              />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
