"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <section id="why-us" ref={ref} className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto space-y-32">

        {/* ── Why Vertex block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Why Vertex</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-balance text-white mb-6 leading-tight">
              An agency that treats your{" "}
              <span className="text-emerald-glow">business like its own</span>
            </h2>
            <p className="text-white/45 text-lg text-balance leading-relaxed mb-10">
              We're a boutique team of designers, engineers, and strategists. Small enough to care deeply —
              experienced enough to deliver world-class work on a global scale.
            </p>
            <div className="inline-flex items-baseline gap-3 glass rounded-2xl px-8 py-5">
              <span className="text-5xl font-black text-emerald-400 tracking-tighter">3×</span>
              <span className="text-white/55 text-sm leading-snug max-w-[200px]">
                average ROI increase for clients in their first year with us
              </span>
            </div>
          </motion.div>

          {/* Right: pillars */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="group flex gap-4 glass rounded-2xl p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1 tracking-tight text-sm">{pillar.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── How We Work process timeline ── */}
        <div ref={processRef}>
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">How We Work</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
              From brief to{" "}
              <span className="text-emerald-glow">live in weeks</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto text-balance">
              A proven four-step process that keeps you informed and in control at every stage.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative glass rounded-3xl p-7 flex flex-col gap-4 group"
                >
                  {/* Connector line */}
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-2 w-4 h-px bg-emerald-500/20 z-10" />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-black text-white/15 tracking-widest">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5 tracking-tight">{step.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
