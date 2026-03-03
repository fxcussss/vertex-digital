"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven rocket assembly animation.
 * As the user scrolls through this section, the rocket is "built"
 * piece by piece — each part fades/slides in at a different scroll threshold.
 */
export default function RocketScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Each part appears at a different scroll threshold
  const exhaustOpacity = useTransform(smooth, [0.05, 0.18], [0, 1]);
  const exhaustY = useTransform(smooth, [0.05, 0.18], [30, 0]);

  const bodyOpacity = useTransform(smooth, [0.15, 0.30], [0, 1]);
  const bodyY = useTransform(smooth, [0.15, 0.30], [40, 0]);
  const bodyScale = useTransform(smooth, [0.15, 0.35], [0.8, 1]);

  const wingLOpacity = useTransform(smooth, [0.28, 0.42], [0, 1]);
  const wingLX = useTransform(smooth, [0.28, 0.42], [-40, 0]);

  const wingROpacity = useTransform(smooth, [0.28, 0.42], [0, 1]);
  const wingRX = useTransform(smooth, [0.28, 0.42], [40, 0]);

  const windowOpacity = useTransform(smooth, [0.40, 0.54], [0, 1]);
  const windowScale = useTransform(smooth, [0.40, 0.54], [0, 1]);

  const noseOpacity = useTransform(smooth, [0.52, 0.66], [0, 1]);
  const noseY = useTransform(smooth, [0.52, 0.66], [-40, 0]);

  const glowOpacity = useTransform(smooth, [0.62, 0.78], [0, 1]);
  const thrustOpacity = useTransform(smooth, [0.70, 0.88], [0, 1]);
  const thrustScaleY = useTransform(smooth, [0.70, 0.95], [0, 1]);

  const labelOpacity = useTransform(smooth, [0.82, 0.95], [0, 1]);
  const labelY = useTransform(smooth, [0.82, 0.95], [20, 0]);

  // Rocket floats up slightly once fully built
  const rocketY = useTransform(smooth, [0.85, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative z-10 py-10"
      style={{ minHeight: "220vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Section label */}
        <motion.div
          style={{ opacity: useTransform(smooth, [0.0, 0.1], [0, 1]) }}
          className="mb-12 text-center"
        >
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
            How We Launch You
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Your project,{" "}
            <span className="text-emerald-glow">built piece by piece</span>
          </h2>
          <p className="text-white/40 mt-3 text-sm">Scroll to assemble the rocket ↓</p>
        </motion.div>

        {/* Rocket SVG assembly */}
        <motion.div
          style={{ y: rocketY }}
          className="relative flex items-center justify-center"
        >
          <svg
            width="180"
            height="340"
            viewBox="0 0 180 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── Thrust flame ── */}
            <motion.g style={{ opacity: thrustOpacity, scaleY: thrustScaleY, originY: "0%" }}>
              {/* Outer flame */}
              <ellipse cx="90" cy="310" rx="22" ry="38" fill="url(#flameGrad)" opacity="0.7" />
              {/* Inner flame */}
              <ellipse cx="90" cy="305" rx="12" ry="22" fill="url(#flameInner)" />
              {/* Flame shimmer lines */}
              <motion.ellipse
                cx="90" cy="308" rx="8" ry="16"
                fill="white" opacity="0.3"
                animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], opacity: [0.3, 0.6, 0.2, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              />
            </motion.g>

            {/* ── Exhaust nozzles ── */}
            <motion.g style={{ opacity: exhaustOpacity, y: exhaustY }}>
              <rect x="68" y="262" width="16" height="22" rx="4" fill="#1f2937" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
              <rect x="96" y="262" width="16" height="22" rx="4" fill="#1f2937" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
              {/* Nozzle glow */}
              <motion.ellipse cx="76" cy="284" rx="8" ry="3" fill="rgba(16,185,129,0.5)"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <motion.ellipse cx="104" cy="284" rx="8" ry="3" fill="rgba(16,185,129,0.5)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
              />
            </motion.g>

            {/* ── Rocket body ── */}
            <motion.g style={{ opacity: bodyOpacity, y: bodyY, scale: bodyScale }}>
              {/* Main fuselage */}
              <rect x="58" y="140" width="64" height="130" rx="12" fill="url(#bodyGrad)" />
              {/* Body panel lines */}
              <line x1="75" y1="160" x2="75" y2="255" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="105" y1="160" x2="105" y2="255" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="62" y1="200" x2="118" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="62" y1="230" x2="118" y2="230" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              {/* Emerald accent stripe */}
              <rect x="58" y="188" width="64" height="4" fill="rgba(16,185,129,0.4)" rx="2" />
              {/* Body border */}
              <rect x="58" y="140" width="64" height="130" rx="12" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" fill="none" />
            </motion.g>

            {/* ── Left wing ── */}
            <motion.g style={{ opacity: wingLOpacity, x: wingLX }}>
              <path
                d="M58 220 L20 270 L58 260 Z"
                fill="url(#wingGrad)"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="1.5"
              />
              <line x1="58" y1="235" x2="32" y2="265" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
            </motion.g>

            {/* ── Right wing ── */}
            <motion.g style={{ opacity: wingROpacity, x: wingRX }}>
              <path
                d="M122 220 L160 270 L122 260 Z"
                fill="url(#wingGrad)"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="1.5"
              />
              <line x1="122" y1="235" x2="148" y2="265" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
            </motion.g>

            {/* ── Porthole window ── */}
            <motion.g style={{ opacity: windowOpacity, scale: windowScale, originX: "90px", originY: "175px" }}>
              <circle cx="90" cy="175" r="18" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.4)" strokeWidth="2" />
              <circle cx="90" cy="175" r="12" fill="rgba(16,185,129,0.12)" />
              {/* Window glare */}
              <ellipse cx="84" cy="170" rx="4" ry="3" fill="rgba(255,255,255,0.15)" transform="rotate(-20 84 170)" />
              {/* Animated inner glow */}
              <motion.circle cx="90" cy="175" r="8" fill="rgba(16,185,129,0.3)"
                animate={{ opacity: [0.3, 0.7, 0.3], r: [8, 10, 8] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.g>

            {/* ── Nose cone ── */}
            <motion.g style={{ opacity: noseOpacity, y: noseY }}>
              <path
                d="M90 30 C70 60 58 100 58 140 L122 140 C122 100 110 60 90 30 Z"
                fill="url(#noseGrad)"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="1.5"
              />
              {/* Nose highlight */}
              <path
                d="M90 35 C80 60 72 95 70 130"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tip glow */}
              <motion.circle cx="90" cy="32" r="4" fill="rgba(16,185,129,0.8)"
                animate={{ opacity: [0.5, 1, 0.5], r: [4, 6, 4] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
            </motion.g>

            {/* ── Emerald aura glow (shows when nearly complete) ── */}
            <motion.g style={{ opacity: glowOpacity }}>
              <ellipse cx="90" cy="190" rx="55" ry="120" fill="url(#auraGrad)" />
            </motion.g>

            {/* ── Gradient defs ── */}
            <defs>
              <linearGradient id="bodyGrad" x1="58" y1="140" x2="122" y2="270" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e3a2f" />
                <stop offset="50%" stopColor="#0f2b1f" />
                <stop offset="100%" stopColor="#0a1a12" />
              </linearGradient>
              <linearGradient id="noseGrad" x1="58" y1="30" x2="122" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e3a2f" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#0f2b1f" />
                <stop offset="100%" stopColor="#0a1208" />
              </linearGradient>
              <radialGradient id="flameGrad" cx="50%" cy="20%" r="80%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="flameInner" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.08)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </radialGradient>
            </defs>
          </svg>

          {/* Floating particles around rocket when fully built */}
          <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-emerald-400"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-8, 8, -8],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + i * 0.3,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Build progress label */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="mt-10 text-center"
        >
          <p className="text-emerald-400 text-sm font-bold">🚀 Ready for launch</p>
          <p className="text-white/30 text-xs mt-1">Your project is built. Time to go live.</p>
        </motion.div>

        {/* Scroll progress bar */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            style={{ scaleX: smooth, originX: 0 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
