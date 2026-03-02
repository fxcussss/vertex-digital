"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Globe,
  Palette,
  TrendingUp,
  ShoppingCart,
  Smartphone,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Lightning-fast, pixel-perfect websites built with Next.js. Zero templates — every site is engineered to convert and delight.",
    tag: "Most Popular",
    tagColor: "emerald",
    metric: "95+ PageSpeed",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Logo, colour system, typography, and full brand guidelines. We build identities that are strategically distinctive and impossible to ignore.",
    tag: null,
    tagColor: null,
    metric: "From logo → system",
  },
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description:
      "Technical SEO, content architecture, and performance tuning. We get you ranking — and build the moat to keep you there.",
    tag: null,
    tagColor: null,
    metric: "Avg. 3× organic traffic",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Shopify and custom storefronts engineered for maximum conversion. Your products, your rules, zero friction.",
    tag: "High Demand",
    tagColor: "amber",
    metric: "+40% avg. conversion lift",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "React Native apps that feel truly native on iOS and Android. One codebase, premium experience, faster time-to-market.",
    tag: null,
    tagColor: null,
    metric: "iOS & Android",
  },
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description:
      "Analytics, funnel mapping, and growth consulting. We turn raw data into decisions that move revenue — not just vanity metrics.",
    tag: null,
    tagColor: null,
    metric: "ROI-first approach",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-balance text-white mb-5">
            Services built for{" "}
            <span className="text-emerald-glow">results</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/45 text-lg text-balance leading-relaxed">
            Strategy + execution, under one roof. Every service is designed to
            move the needle on your business — not just look good.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-3xl glass p-8 cursor-default overflow-hidden flex flex-col"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/[0.06] to-transparent pointer-events-none" />

                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    {service.tag && (
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          service.tagColor === "emerald"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {service.tag}
                      </span>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors duration-200" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold tracking-tight text-white mb-2.5">
                  {service.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Metric pill */}
                <div className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-white/40 font-medium">{service.metric}</span>
                </div>

                {/* Bottom line reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
