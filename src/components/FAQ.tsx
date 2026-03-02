"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus, Minus, FileText } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A standard website takes 3–6 weeks from kick-off to launch. More complex projects (e-commerce, web apps) typically take 8–14 weeks. We'll give you a precise timeline in your proposal after our discovery call.",
  },
  {
    q: "Do you work with clients outside Mauritius?",
    a: "Absolutely — most of our clients are international. We work across all time zones and communicate via Slack, Notion, and weekly video calls. Distance has never been a barrier to great work.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just your brand assets (logo, colours if you have them), content (text and images), and a clear brief on your goals. If you don't have these, we offer brand identity and copywriting as add-ons.",
  },
  {
    q: "Will my site be mobile-friendly?",
    a: "Every site we build is mobile-first by design. We test on real devices across iOS and Android, and we don't launch until it looks and performs perfectly on every screen size.",
  },
  {
    q: "Can I update the website myself after launch?",
    a: "Yes. We build with a CMS (like Sanity or Contentful) so you can edit text, images, and content without touching code. We'll train you and your team on how to use it.",
  },
  {
    q: "What happens if I'm not happy with the design?",
    a: "Every plan includes revision rounds. We present concepts early in the process specifically to align on direction before full development begins — so surprises are extremely rare. If you're ever not satisfied, we'll make it right.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. All plans include a post-launch support period. After that, we offer monthly retainer packages that cover updates, performance monitoring, SEO reporting, and priority support.",
  },
  {
    q: "How does payment work?",
    a: "We typically split into 50% upfront to start and 50% on launch. For larger projects we use milestone-based payments. We accept bank transfer, card, and PayPal.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/[0.05] last:border-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <div className="flex items-center gap-3">
          {/* File icon — classified aesthetic */}
          <FileText className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 ${open ? "text-white" : "text-white/20 group-hover:text-white/40"}`} />
          <span className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-200 ${open ? "text-white" : "text-white/70 group-hover:text-white"}`}>
            {q}
          </span>
        </div>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open
          ? "bg-white/15 border-white/40"
          : "bg-white/[0.03] border-white/[0.07] group-hover:border-white/25 group-hover:bg-white/10"
          }`}>
          {open
            ? <Minus className="w-3.5 h-3.5 text-white" />
            : <Plus className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-6 pb-5">
              {/* "Unredacted" — accent line left */}
              <div className="border-l-2 border-white/30 pl-4">
                <p className="text-sm text-white/45 leading-relaxed">{a}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4">◆ Intelligence Files ◆</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Questions we get{" "}
            <span className="text-emerald-glow">all the time</span>
          </h2>
          <p className="text-white/40 text-lg">
            Can&apos;t find your answer?{" "}
            <a href="#contact" className="text-white hover:underline font-bold">
              Just ask us directly →
            </a>
          </p>
        </motion.div>

        {/* FAQ List — "classified document" */}
        <motion.div
          className="glass rounded-3xl px-6 md:px-10 py-2 border border-white/[0.06] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Document top stamp */}
          <div className="flex items-center justify-between py-4 mb-2 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <span className="text-[10px] font-black tracking-[0.3em] text-white/15 uppercase">
                File: VD-FAQ-001
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Declassified</span>
          </div>

          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
