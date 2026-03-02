"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">
          {q}
        </span>
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
          {open
            ? <Minus className="w-3.5 h-3.5 text-emerald-400" />
            : <Plus className="w-3.5 h-3.5 text-white/50 group-hover:text-emerald-400 transition-colors" />
          }
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/45 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative z-10 py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-5">
            Questions we get{" "}
            <span className="text-emerald-glow">all the time</span>
          </h2>
          <p className="text-white/45 text-lg">
            Can't find your answer?{" "}
            <a href="#contact" className="text-emerald-400 hover:underline">
              Just ask us directly →
            </a>
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="glass rounded-3xl px-6 md:px-10 py-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
