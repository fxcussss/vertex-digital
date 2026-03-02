"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
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
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="relative z-10 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Transparent pricing,{" "}
            <span className="text-emerald-glow">zero surprises</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto text-balance">
            Every project is unique. These are starting points — we'll tailor a proposal
            to your exact needs and budget.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 ${
                plan.highlight
                  ? "bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
                  : "glass"
              }`}
            >
              {/* Tag */}
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-black px-4 py-1.5 rounded-full">
                  {plan.tag}
                </div>
              )}

              {/* Plan name */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {plan.highlight && (
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-emerald-400" fill="currentColor" />
                    </div>
                  )}
                  <p className="text-sm font-bold text-white/60 uppercase tracking-widest">{plan.name}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  {plan.currency && <span className="text-lg font-bold text-white/60">{plan.currency}</span>}
                  <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-sm text-white/40">/ {plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-white/45 leading-relaxed">{plan.description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06]" />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#contact"
                className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 group ${
                  plan.highlight
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]"
                    : "glass border border-white/[0.08] text-white/70 hover:text-white hover:border-emerald-500/30"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-white/30 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          All prices in USD. Payment plans available. Not sure which fits?{" "}
          <Link href="#contact" className="text-emerald-400 hover:underline">
            Let's talk →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
