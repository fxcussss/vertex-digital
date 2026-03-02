"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const WORDS_LINE1 = ["We", "Build", "Digital"];
const WORDS_LINE2 = ["Experiences", "That", "Perform."];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.25, staggerChildren: 0.09 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: -25, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5★", label: "Google Rating" },
  { value: "6 yrs", label: "In Business" },
];

const marqueeClients = [
  "Shopify", "Next.js", "Framer", "Vercel", "Stripe",
  "Figma", "Webflow", "Tailwind", "TypeScript", "React",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.07]),
    { stiffness: 80, damping: 25 }
  );

  return (
    <motion.section
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center"
      style={{ y, opacity }}
    >
      {/* Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400 font-semibold uppercase tracking-widest backdrop-blur-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Premium Digital Agency · vertex-digital.vercel.app
      </motion.div>

      {/* Kinetic headline */}
      <motion.h1
        className="text-[clamp(3rem,9vw,7rem)] font-black tracking-tighter text-balance leading-[0.88] mb-8 perspective-[800px]"
        style={{ scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="block">
          {WORDS_LINE1.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-[0.2em] last:mr-0 text-white"
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block">
          {WORDS_LINE2.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.2em] last:mr-0 ${
                i === 2 ? "text-emerald-glow" : "text-white"
              }`}
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.75 }}
        className="max-w-2xl text-lg md:text-xl text-white/50 text-balance leading-relaxed mb-10"
      >
        We partner with ambitious founders and growing brands to create
        websites, identities, and digital systems that{" "}
        <span className="text-white/80 font-medium">drive real revenue</span> —
        not just pretty pixels.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-20"
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all duration-200 hover:shadow-[0_0_32px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Start Your Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
        <Link
          href="#services"
          className="flex items-center gap-2 px-7 py-3.5 rounded-2xl glass text-white/60 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          Explore Services
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.05 }}
        className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 mb-16"
      >
        {stats.map((stat, i) => (
          <div key={stat.value} className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-black tracking-tighter text-white">{stat.value}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest font-semibold mt-0.5">{stat.label}</div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-8 bg-white/10" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Marquee trust bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
        className="w-full max-w-3xl overflow-hidden"
      >
        <p className="text-[10px] text-white/25 uppercase tracking-widest text-center mb-4 font-semibold">
          Technologies We Master
        </p>
        <div className="relative flex gap-10 overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeClients, ...marqueeClients].map((client, i) => (
              <span
                key={i}
                className="text-sm font-semibold text-white/20 hover:text-white/40 transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </motion.div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="w-px h-14 bg-gradient-to-b from-transparent via-emerald-500/60 to-transparent mx-auto"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
