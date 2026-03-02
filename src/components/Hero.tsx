"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const HEADLINE = "We Build Digital\nExperiences That Perform.";

const stats = [
  { value: "120+", label: "Projects" },
  { value: "98%", label: "Satisfaction" },
  { value: "5★", label: "Rating" },
  { value: "6 yrs", label: "Experience" },
];

const marqueeClients = [
  "Shopify", "Next.js", "Framer", "Vercel", "Stripe",
  "Figma", "Webflow", "Tailwind", "TypeScript", "React",
];

// Floating ember particle
function Ember({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="ember absolute w-1 h-1 rounded-full bg-emerald-400/60"
      style={style}
    />
  );
}

const embers = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 7.5}%`,
  bottom: "0%",
  "--drift": `${(i % 3 - 1) * 30}px`,
  "--duration": `${3 + (i % 4) * 1.5}s`,
  "--delay": `${(i * 0.6) % 5}s`,
} as React.CSSProperties));

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven cinematic 3D GOD-TIER transforms
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -250]), { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 25]), { stiffness: 60, damping: 20 });
  const translateZ = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), { stiffness: 60, damping: 20 });
  const subY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 50, damping: 20 });

  // Fluid stagger 3D typography variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };
  const wordVars = {
    hidden: { opacity: 0, y: 50, rotateX: -60, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden"
      style={{
        opacity,
        scale,
        y,
        rotateX,
        z: translateZ,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Floating embers */}
      {embers.map((s, i) => <Ember key={i} style={s} />)}

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-5 py-2 text-xs text-emerald-400 font-bold uppercase tracking-widest backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        Premium Digital Agency — Now Accepting Projects
      </motion.div>

      {/* Cinematic headline — fluid 3D blur stagger reveal */}
      <motion.div
        className="relative mb-8"
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      >
        <motion.h1
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2.8rem,8.5vw,6.5rem)] font-black tracking-tighter leading-[0.9] text-white whitespace-pre-line"
        >
          {HEADLINE.split("\n").map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(" ").map((word, wi) => {
                const isGlow = word.includes("Perform");
                return (
                  <motion.span
                    key={wi}
                    variants={wordVars}
                    className={`inline-block mr-[0.2em] ${isGlow ? "text-emerald-glow" : ""}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        {/* Cinematic horizontal line below headline */}
        <motion.div
          className="mt-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Subheading */}
      <motion.p
        style={{ y: subY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed mb-10"
      >
        We partner with ambitious founders and growing brands to create
        websites, identities, and digital systems that{" "}
        <span className="text-white/85 font-semibold">drive real revenue</span> —
        not just pretty pixels.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.9 }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-20"
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 energy-pulse"
        >
          Start Your Mission
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </Link>
        <Link
          href="#services"
          className="group flex items-center gap-2 px-8 py-4 rounded-2xl glass text-white/60 hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <Play className="w-3.5 h-3.5" />
          Explore Services
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 mb-16"
      >
        {stats.map((stat, i) => (
          <div key={stat.value} className="flex items-center gap-6">
            <div className="text-center">
              <motion.div
                className="text-2xl font-black tracking-tighter text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 + i * 0.15 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mt-0.5">{stat.label}</div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-8 bg-white/08" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="w-full max-w-3xl overflow-hidden"
      >
        <p className="text-[10px] text-white/20 uppercase tracking-widest text-center mb-4 font-bold">
          Technologies We Master
        </p>
        <div className="relative flex gap-10 overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeClients, ...marqueeClients].map((client, i) => (
              <span key={i} className="text-sm font-bold text-white/15 hover:text-emerald-400/60 transition-colors cursor-default">
                {client}
              </span>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-bold">Scroll to begin</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
