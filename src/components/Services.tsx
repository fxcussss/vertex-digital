"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, Variants, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  Globe, Palette, TrendingUp, ShoppingCart, Smartphone, BarChart3, ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Lightning-fast, pixel-perfect websites built with Next.js. Zero templates — every site is engineered to convert and delight.",
    tag: "Most Popular",
    tagColor: "emerald",
    metric: "95+ PageSpeed",
    from: "left",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Logo, colour system, typography, and full brand guidelines. We build identities that are strategically distinctive and impossible to ignore.",
    tag: null,
    tagColor: null,
    metric: "From logo → system",
    from: "bottom",
  },
  {
    icon: TrendingUp,
    title: "SEO & Growth",
    description: "Technical SEO, content architecture, and performance tuning. We get you ranking — and build the moat to keep you there.",
    tag: null,
    tagColor: null,
    metric: "Avg. 3× organic traffic",
    from: "right",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Shopify and custom storefronts engineered for maximum conversion. Your products, your rules, zero friction.",
    tag: "High Demand",
    tagColor: "amber",
    metric: "+40% avg. conversion lift",
    from: "left",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "React Native apps that feel truly native on iOS and Android. One codebase, premium experience, faster time-to-market.",
    tag: null,
    tagColor: null,
    metric: "iOS & Android",
    from: "bottom",
  },
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description: "Analytics, funnel mapping, and growth consulting. We turn raw data into decisions that move revenue — not just vanity metrics.",
    tag: null,
    tagColor: null,
    metric: "ROI-first approach",
    from: "right",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function getCardVariants(from: string): Variants {
  const offsets: Record<string, { x: number; y: number }> = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    bottom: { x: 0, y: 60 },
  };
  const off = offsets[from] || { x: 0, y: 40 };
  return {
    hidden: { opacity: 0, x: off.x, y: off.y, filter: "blur(8px)" },
    visible: {
      opacity: 1, x: 0, y: 0, filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

// 3D tilt card hook
function useTilt() {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const [scanned, setScanned] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      variants={getCardVariants(service.from)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onViewportEnter={() => setScanned(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      className={`group relative rounded-3xl glass p-8 cursor-default overflow-hidden flex flex-col ${scanned ? "scanline-reveal" : ""}`}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.08] to-zinc-500/[0.04] pointer-events-none" />

      {/* Inner glow on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_40px_rgba(255,255,255,0.06)] pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(20px)" }}>
        <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white/40 transition-all duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          {service.tag && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${service.tagColor === "emerald"
              ? "bg-white/15 text-white border border-white/20"
              : "bg-zinc-500/15 text-zinc-300 border border-zinc-500/20"
              }`}>
              {service.tag}
            </span>
          )}
          <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-base font-bold tracking-tight text-white mb-2.5" style={{ transform: "translateZ(10px)" }}>
        {service.title}
      </h3>
      <p className="text-sm text-white/45 leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Metric pill */}
      <div className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[11px] text-white/40 font-medium">{service.metric}</span>
      </div>

      {/* Bottom line reveal */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/30 transition-all duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // 3D Scroll Warp
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.8]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0.6, 1], [0, 30]), { stiffness: 60, damping: 20 });
  const z = useSpring(useTransform(scrollYProgress, [0.6, 1], [0, -400]), { stiffness: 60, damping: 20 });

  return (
    <motion.section
      id="services"
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">
            ◆ The Arsenal ◆
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-5">
            Services built for{" "}
            <span className="text-emerald-glow">results</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/40 text-lg leading-relaxed">
            Strategy + execution, under one roof. Every service is designed to
            move the needle on your business — not just look good.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
