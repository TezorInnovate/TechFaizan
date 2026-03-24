// src/components/StarCanvas.jsx
// Mount this ONCE in your App.jsx or root layout component.
// It creates the fixed starry dark-blue background across all pages.

import { useEffect, useRef } from "react";

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrameId;
    let stars = [];
    let shootingStars = [];
    let w, h;

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      // Use document height so stars cover the whole scrollable page
      h = canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    }

    function initStars() {
      stars = [];
      const count = Math.floor((w * h) / 5000);
      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        stars.push({
          x: randomBetween(0, w),
          y: randomBetween(0, h),
          r: randomBetween(0.25, 1.3),
          alpha: randomBetween(0.15, 0.85),
          twinkleSpeed: randomBetween(0.003, 0.01),
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          // Mostly white-blue stars with occasional violet tints
          color: roll > 0.9
            ? "#a78bfa"          // violet
            : roll > 0.75
              ? "#7ec8e3"        // sky blue
              : "#e8eaf6",       // white-blue
        });
      }
    }

    function addShootingStar() {
      if (shootingStars.length >= 2) return;
      const startX = randomBetween(w * 0.05, w * 0.95);
      const startY = randomBetween(0, h * 0.25);
      const angle  = randomBetween(18, 42) * (Math.PI / 180);
      shootingStars.push({
        x: startX, y: startY,
        vx: Math.cos(angle) * 7,
        vy: Math.sin(angle) * 7,
        len: randomBetween(80, 150),
        alpha: 0.95,
        decay: randomBetween(0.014, 0.022),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 0.88 || s.alpha <= 0.12) s.twinkleDir *= -1;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const tailX = ss.x - ss.vx * (ss.len / 8);
        const tailY = ss.y - ss.vy * (ss.len / 8);

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(79,158,248,0)`);
        grad.addColorStop(0.6, `rgba(126,200,227,${ss.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.alpha -= ss.decay;
        if (ss.alpha <= 0) shootingStars.splice(i, 1);
      }

      animFrameId = requestAnimationFrame(draw);
    }

    function handleResize() {
      resize();
      initStars();
    }

    resize();
    initStars();
    draw();

    window.addEventListener("resize", handleResize);

    // Occasional shooting stars
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.45) addShootingStar();
    }, 4000);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      clearInterval(shootInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
