"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Bloom & Co.",
    avatar: "SM",
    rating: 5,
    text: "Vertex Digital completely transformed our online presence. Our conversion rate jumped 140% in the first month after launch. The attention to detail is unreal — every pixel is intentional.",
  },
  {
    name: "James Okonkwo",
    role: "Founder, TradeFlow Africa",
    avatar: "JO",
    rating: 5,
    text: "We went from zero to a world-class web app in 6 weeks. The team communicated daily, never missed a deadline, and the final product exceeded every expectation. Worth every penny.",
  },
  {
    name: "Priya Nair",
    role: "Marketing Director, Luma Skincare",
    avatar: "PN",
    rating: 5,
    text: "Our Shopify store went from 1.8% to 4.2% conversion after the redesign. The team understood our brand DNA instantly and translated it into a stunning, fast-loading experience.",
  },
  {
    name: "Marc Duval",
    role: "Co-founder, Nexus Studio",
    avatar: "MD",
    rating: 5,
    text: "Best agency we've ever worked with — and we've worked with many. They treat your business like their own. Our Google ranking jumped from page 4 to page 1 in 3 months.",
  },
  {
    name: "Aisha Ramjee",
    role: "Director, Island Realty MU",
    avatar: "AR",
    rating: 5,
    text: "As a Mauritius-based business, it was important to work with a team that understands our market. Vertex Digital delivered a premium site that rivals anything we've seen internationally.",
  },
  {
    name: "Tom Eriksen",
    role: "CTO, Polar Tech",
    avatar: "TE",
    rating: 5,
    text: "The code quality is exceptional. Clean, well-documented, and lightning fast. Our PageSpeed went from 54 to 97. The team knows Next.js inside out.",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(-(e.clientY - cy) / (rect.height / 2) * 6);
    rotateY.set((e.clientX - cx) / (rect.width / 2) * 6);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const cardVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.85,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      className="group glass rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden border border-white/[0.05] hover:border-white/20 transition-colors duration-500"
    >
      {/* Spotlight effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-[at_50%_0%] from-white/[0.08] to-transparent pointer-events-none" />

      <Quote className="absolute top-5 right-5 w-8 h-8 text-white/10 group-hover:text-white/25 transition-colors duration-300" />

      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-white/60 fill-white/60" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-white/55 leading-relaxed flex-1 group-hover:text-white/70 transition-colors duration-300">
        &quot;{t.text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
        <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 group-hover:bg-white/30 transition-colors">
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight">{t.name}</p>
          <p className="text-xs text-white/30">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
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
      id="testimonials"
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
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">◆ The Legends ◆</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Trusted by <span className="text-emerald-glow">ambitious teams</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what our clients say after working with us.
          </p>
          <div className="flex items-center justify-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-white/60 fill-white/60" />
            ))}
            <span className="ml-2 text-sm text-white/35 font-medium">5.0 · 120+ reviews</span>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
