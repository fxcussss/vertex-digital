"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Social Proof</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Trusted by <span className="text-emerald-glow">ambitious teams</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto text-balance">
            Don't take our word for it. Here's what our clients say after working with us.
          </p>
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            ))}
            <span className="ml-2 text-sm text-white/40 font-medium">5.0 · 120+ reviews</span>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group glass rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-white/60 leading-relaxed flex-1">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">{t.name}</p>
                  <p className="text-xs text-white/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
