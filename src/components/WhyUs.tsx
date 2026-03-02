"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { CheckCircle2, Clock, HeartHandshake, Rocket, MessageSquare, Figma, Code2, Zap } from "lucide-react";

const pillars = [
  {
    icon: Rocket,
    title: "Performance-First",
    description: "Every site we ship scores 95+ on Google PageSpeed. Fast sites rank higher, convert better, and keep visitors longer.",
  },
  {
    icon: CheckCircle2,
    title: "Zero Compromise Quality",
    description: "Code reviews, QA testing, and accessibility checks are baked into every delivery. We refuse to cut corners.",
  },
  {
    icon: Clock,
    title: "On Time, Every Time",
    description: "We've never missed a deadline. Our sprint-based workflow gives you full visibility and predictable delivery.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description: "80% of our clients have been with us for 2+ years. We invest in your growth because your success is our reputation.",
  },
];

const process = [
  { icon: MessageSquare, step: "01", title: "Discovery Call", desc: "We learn your goals, audience, and competitive landscape in a focused 45-min session." },
  { icon: Figma, step: "02", title: "Design & Strategy", desc: "Wireframes, visual concepts, and a clear roadmap delivered within 5 business days." },
  { icon: Code2, step: "03", title: "Build & Iterate", desc: "Agile sprints with weekly demos. You see progress, give feedback, and stay in control." },
  { icon: Zap, step: "04", title: "Launch & Grow", desc: "We handle deployment, QA, and post-launch optimisation. Then we measure, learn, repeat." },
];

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  // Scroll-driven progress line
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: lineProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(lineProgress, [0.1, 0.9], ["0%", "100%"]);

  // 3D Scroll Warp
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 1], [1, 0.8]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, 30]), { stiffness: 60, damping: 20 });
  const z = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, -400]), { stiffness: 60, damping: 20 });

  return (
    <motion.section
      id="why-us"
      ref={ref}
      className="relative z-10 py-32 px-4 overflow-hidden"
      style={{
        opacity,
        scale,
        rotateX,
        z,
        transformPerspective: 1200,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="max-w-7xl mx-auto space-y-32">

        {/* ── Why Vertex ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={leftVariants}
          >
            <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">◆ Why We Win ◆</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 leading-tight">
              An agency that treats your{" "}
              <span className="text-emerald-glow">business like its own</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-10">
              We're a boutique team of designers, engineers, and strategists. Small enough to care deeply —
              experienced enough to deliver world-class work on a global scale.
            </p>
            <div className="inline-flex items-baseline gap-3 glass-strong rounded-2xl px-8 py-5 border border-white/20">
              <span className="text-5xl font-black text-white tracking-tighter">3×</span>
              <span className="text-white/50 text-sm leading-snug max-w-[200px]">
                average ROI increase for clients in their first year with us
              </span>
            </div>
          </motion.div>

          {/* Right: pillars — alternate from left/right */}
          <motion.div
            className="flex flex-col gap-4"
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const v: Variants = {
                hidden: { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              };
              return (
                <motion.div
                  key={pillar.title}
                  variants={v}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="group flex gap-4 glass rounded-2xl p-5 border border-white/[0.05] hover:border-white/20 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1 tracking-tight text-sm">{pillar.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── How We Work — Process Timeline ── */}
        <div ref={processRef}>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">◆ The Process ◆</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
              From brief to{" "}
              <span className="text-emerald-glow">live in weeks</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              A proven four-step process that keeps you informed and in control at every stage.
            </p>
          </motion.div>

          {/* Timeline connecting line */}
          <div ref={scrollRef} className="relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/[0.05]">
              <motion.div className="h-full bg-gradient-to-r from-white/60 to-white/10" style={{ width: lineWidth }} />
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={stagger}
              initial="hidden"
              animate={processInView ? "visible" : "hidden"}
            >
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeUp}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="relative glass rounded-3xl p-7 flex flex-col gap-4 group hover:border-white/25 border border-white/[0.04] transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-black text-white/10 tracking-widest">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5 tracking-tight">{step.title}</h3>
                      <p className="text-xs text-white/35 leading-relaxed">{step.desc}</p>
                    </div>
                    {/* Step number dot for timeline */}
                    <div className="hidden lg:flex absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30 border border-white/50 items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:animate-pulse" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
