"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "2,500",
    currency: "USD",
    period: "one-time",
    description: "Perfect for small businesses and solo founders who need a professional online presence fast.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic SEO setup",
      "Contact form",
      "2 rounds of revisions",
      "30-day support",
    ],
    cta: "Get Started",
    highlight: false,
    tag: null,
    delay: 0.1,
  },
  {
    name: "Growth",
    price: "6,500",
    currency: "USD",
    period: "one-time",
    description: "For growing businesses that need a powerful, conversion-optimised digital presence.",
    features: [
      "Up to 15 pages",
      "Custom animations & interactions",
      "Advanced SEO & performance",
      "CMS integration",
      "Analytics dashboard setup",
      "5 rounds of revisions",
      "90-day priority support",
      "Brand identity included",
    ],
    cta: "Most Popular — Start Here",
    highlight: true,
    tag: "Best Value",
    delay: 0,
  },
  {
    name: "Enterprise",
    price: "Custom",
    currency: "",
    period: "tailored",
    description: "Full-scale digital transformation for established businesses with complex requirements.",
    features: [
      "Unlimited pages",
      "Custom web application",
      "E-commerce / payments",
      "API integrations",
      "Dedicated project manager",
      "Unlimited revisions",
      "12-month retainer support",
      "Monthly strategy calls",
    ],
    cta: "Let's Talk",
    highlight: false,
    tag: null,
    delay: 0.2,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.92, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.6 + i * 0.06 },
  }),
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // 3D Scroll Warp
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 1], [1, 0.8]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, 30]), { stiffness: 60, damping: 20 });
  const z = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, -400]), { stiffness: 60, damping: 20 });

  return (
    <motion.section
      id="pricing"
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">◆ Choose Your Mission ◆</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Transparent pricing,{" "}
            <span className="text-emerald-glow">zero surprises</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Every project is unique. These are starting points — we&apos;ll tailor a proposal
            to your exact needs and budget.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              custom={plan.delay}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 overflow-hidden ${plan.highlight
                ? "bg-white/[0.07] border border-white/35 shadow-[0_0_80px_rgba(255,255,255,0.15)]"
                : "glass border border-white/[0.05]"
                }`}
            >
              {/* Animated top glow for highlighted */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              )}

              {/* Tag */}
              {plan.tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  {plan.tag}
                </div>
              )}

              {/* Energy ring for highlight */}
              {plan.highlight && (
                <div className="absolute inset-0 rounded-3xl energy-pulse pointer-events-none" />
              )}

              {/* Plan name */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {plan.highlight && (
                    <div className="w-6 h-6 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" fill="currentColor" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-white/50 uppercase tracking-widest">{plan.name}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  {plan.currency && <span className="text-lg font-bold text-white/50">{plan.currency}</span>}
                  <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-sm text-white/30">/ {plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">{plan.description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Features — write themselves in */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f, i) => (
                  <motion.li
                    key={f}
                    custom={i}
                    variants={featureVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex items-start gap-2.5 text-sm text-white/55"
                  >
                    <Check className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                    {f}
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#contact"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 group ${plan.highlight
                  ? "bg-white hover:bg-zinc-200 text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                  : "glass border border-white/[0.08] text-white/60 hover:text-white hover:border-white/30"
                  }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-white/25 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          All prices in USD. Payment plans available. Not sure which fits?{" "}
          <Link href="#contact" className="text-white hover:underline font-bold">
            Let&apos;s talk →
          </Link>
        </motion.p>
      </div>
    </motion.section>
  );
}
