"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  drift: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.8 + 0.3,
    speed: Math.random() * 0.4 + 0.05,
    opacity: Math.random() * 0.55 + 0.05,
    drift: (Math.random() - 0.5) * 0.15,
  }));
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particles = useRef<Particle[]>(generateParticles(50));
  const tickRef = useRef(0);

  const { scrollYProgress } = useScroll();
  const scrollProgress = useRef(0);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetMouseX = useRef(0);
  const targetMouseY = useRef(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollProgress.current = v;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX.current = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      targetMouseY.current = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    };
    window.addEventListener("mousemove", handleMouseMove);

    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      tickRef.current += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = scrollProgress.current;

      // Smooth mouse interpolation
      mouseX.current += (targetMouseX.current - mouseX.current) * 0.05;
      mouseY.current += (targetMouseY.current - mouseY.current) * 0.05;

      const renderedParticles: { px: number; py: number; opacity: number }[] = [];

      particles.current.forEach((p) => {
        // Scroll parallax
        const parallaxY = progress * canvas.height * p.speed * 0.6;

        // Mouse parallax
        const mouseOffsetX = mouseX.current * p.speed * window.innerWidth * 0.08;
        const mouseOffsetY = mouseY.current * p.speed * window.innerHeight * 0.08;

        const rawPx = ((p.x + tickRef.current * p.drift * 10) % 100) * canvas.width / 100;
        const rawPy = ((p.y - tickRef.current * p.speed * 4 + parallaxY / canvas.height * 100) % 100 + 100) % 100 * canvas.height / 100;

        // ----- Interactive Mouse Repulsion Physics -----
        const dx = rawPx - mouseX.current * window.innerWidth;
        const dy = rawPy - mouseY.current * window.innerHeight;
        const distSq = dx * dx + dy * dy;
        const interactionRadius = 250; // pixels
        const interactionRadiusSq = interactionRadius * interactionRadius;

        // Repulsion force
        let repulseX = 0;
        let repulseY = 0;
        if (distSq < interactionRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (interactionRadius - dist) / interactionRadius;
          repulseX = (dx / dist) * force * 50;
          repulseY = (dy / dist) * force * 50;
        }

        // Apply mouse offset but wrap it seamlessly if it goes off screen
        const px = (rawPx + mouseOffsetX + repulseX + canvas.width) % canvas.width;
        const py = (rawPy + mouseOffsetY + repulseY + canvas.height) % canvas.height;

        // Simplified flicker
        const flicker = p.opacity > 0.8 && Math.random() > 0.95 ? 0.5 : 1;
        const currentOpacity = p.opacity * flicker;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        renderedParticles.push({ px, py, opacity: currentOpacity });
      });

      // Draw constellation lines (interactive story network effect)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < renderedParticles.length; i++) {
        for (let j = i + 1; j < renderedParticles.length; j++) {
          const dx = renderedParticles[i].px - renderedParticles[j].px;
          const dy = renderedParticles[i].py - renderedParticles[j].py;
          const distSq = dx * dx + dy * dy;

          if (distSq < 15000) {
            const alpha = (1 - distSq / 15000) * 0.15;
            ctx.beginPath();
            ctx.moveTo(renderedParticles[i].px, renderedParticles[i].py);
            ctx.lineTo(renderedParticles[j].px, renderedParticles[j].py);
            ctx.strokeStyle = `rgba(255, 31, 64, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const nebulaY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -120]),
    { stiffness: 40, damping: 20 }
  );
  const nebula2Y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 30, damping: 20 }
  );

  return (
    <>
      {/* Star + Interactive constellation canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 will-transform"
        style={{ opacity: 0.8 }}
      />

      {/* Nebula glow 1 — top right */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 will-transform"
        style={{
          top: "-20%",
          right: "-10%",
          width: "70vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          y: nebulaY,
          filter: "blur(40px)",
        }}
      />

      {/* Nebula glow 2 — bottom left */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 will-transform"
        style={{
          bottom: "-20%",
          left: "-15%",
          width: "60vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 65%)",
          y: nebula2Y,
          filter: "blur(60px)",
        }}
      />

      {/* Deep space gradient base */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(5,5,5,1) 0%, rgba(10,10,10,1) 60%)",
        }}
      />
    </>
  );
}
