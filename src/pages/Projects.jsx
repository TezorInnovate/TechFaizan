// src/pages/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ArrowUpRight, Folder } from "lucide-react";

// GitHub SVG Icon
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// AirPlay SVG Icon
const AirPlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
    <polygon points="12 15 17 21 7 21 12 15"/>
  </svg>
);

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      return () => grid.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleLinkClick = (e, url) => {
    if (!url) return;
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen pt-4 px-6 md:px-12 pb-20 relative overflow-hidden">
      
      {/* Animated background gradient orb — updated to blue theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--blue-accent) 0%, transparent 70%)',
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out'
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(79,158,248,0.06) 0%, rgba(167,139,250,0.04) 100%)',
            animationDuration: '8s'
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-20 relative"
      >
        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-4 rounded-2xl blur-lg"
            style={{ background: 'radial-gradient(ellipse, rgba(79,158,248,0.08) 0%, rgba(167,139,250,0.05) 100%)' }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase relative"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #e8eaf6 0%, var(--blue-soft) 50%, var(--blue-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Implemented <span style={{ WebkitTextFillColor: 'var(--blue-accent)' }}>Projects</span>
          </h1>
        </div>
        
        <motion.div 
          className="h-[2px] w-full relative overflow-hidden rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, var(--blue-accent), transparent)' }}
          />
          <div
            className="absolute inset-0 opacity-50 animate-shimmer"
            style={{ background: 'linear-gradient(90deg, var(--blue-accent), var(--blue-soft), var(--violet-soft))' }}
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 font-mono text-sm tracking-wider flex items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <Folder size={16} style={{ color: 'var(--blue-accent)' }} />
          Below is the documentation for all my projects:
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div 
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 relative"
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.1 * index,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <Link to={`/project-summary/${project.id}`}>
              <div 
                className="group cursor-pointer relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                
                {/* Main card container */}
                <div className="relative">
                  
                  {/* Image Wrapper */}
                  <div
                    className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-2xl"
                    style={{
                      border: '1px solid var(--border-dim)',
                      background: 'linear-gradient(135deg, rgba(79,158,248,0.07) 0%, rgba(10,21,53,0.5) 100%)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    
                    {/* Animated grain texture */}
                    <div 
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px'
                      }}
                    />

                    {/* Project image — NO glitch animation on hover, just smooth scale */}
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                    />
                    
                    {/* Corner accent */}
                    <div
                      className="absolute top-4 right-4 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-all duration-500 w-12 h-12 group-hover:w-16 group-hover:h-16"
                      style={{ borderColor: 'var(--blue-accent)' }}
                    />

                    {/* Subtle blue scan line on hover (replaces CRT glitch — just a gentle sweep) */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={hoveredId === project.id ? {
                        backgroundPosition: ['0% 0%', '0% 100%']
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(79,158,248,0.04) 50%, transparent 100%)',
                        backgroundSize: '100% 200%'
                      }}
                    />

                    {/* GitHub + Prototype Buttons — stacked on right side */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                      
                      {project.githubLink && (
                        <motion.button
                          onClick={(e) => handleLinkClick(e, project.githubLink)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                          title="View GitHub Repo"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: 'rgba(79,158,248,0.08)',
                            border: '1px solid rgba(79,158,248,0.2)',
                            color: 'var(--text-muted)',
                            backdropFilter: 'blur(8px)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--blue-accent)';
                            e.currentTarget.style.borderColor = 'var(--blue-accent)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.borderColor = 'rgba(79,158,248,0.2)';
                          }}
                        >
                          <GitHubIcon />
                        </motion.button>
                      )}

                      {project.prototypeLink && (
                        <motion.button
                          onClick={(e) => handleLinkClick(e, project.prototypeLink)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.25, delay: 0.12 }}
                          title="View Prototype"
                          className="project-link-btn w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: 'rgba(79,158,248,0.08)',
                            border: '1px solid rgba(79,158,248,0.2)',
                            color: 'var(--text-muted)',
                            backdropFilter: 'blur(8px)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--blue-soft)';
                            e.currentTarget.style.borderColor = 'var(--blue-soft)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.borderColor = 'rgba(79,158,248,0.2)';
                          }}
                        >
                          <AirPlayIcon />
                        </motion.button>
                      )}

                    </div>

                  </div>

                  {/* Text Info */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 
                        className="text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:tracking-wide"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs font-mono uppercase tracking-widest px-2 py-1 rounded"
                          style={{
                            color: 'var(--blue-accent)',
                            border: '1px solid rgba(79,158,248,0.3)',
                            background: 'rgba(79,158,248,0.05)',
                          }}
                        >
                          {project.category}
                        </span>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                          {project.year}
                        </span>
                      </div>
                      
                      {/* Progress bar decoration */}
                      <div
                        className="h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--blue-accent), var(--blue-soft), transparent)' }}
                      />
                    </div>
                    
                    {/* Arrow button */}
                    <motion.div 
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className="absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, var(--blue-accent), var(--violet-soft))' }}
                      />
                      <div
                        className="relative p-3 rounded-full transition-all duration-300 shadow-lg"
                        style={{
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'rgba(255,255,255,0.6)',
                          background: 'rgba(79,158,248,0.05)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, var(--blue-accent), rgba(79,158,248,0.8))';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(79,158,248,0.05)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        }}
                      >
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Index number watermark */}
                  <div 
                    className="absolute -top-8 -left-4 text-[120px] font-black pointer-events-none select-none transition-opacity duration-500"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: 'rgba(79,158,248,0.12)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.2'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        /* On mobile: always show the link buttons */
        @media (max-width: 767px) {
          .project-link-btn {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
