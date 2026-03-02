"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services", chapter: "I" },
  { href: "#why-us", label: "Why Us", chapter: "III" },
  { href: "#contact", label: "Contact", chapter: "VII" },
];



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState("Prologue");
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubY = scrollY.on("change", (v) => setScrolled(v > 20));
    const unsubP = scrollYProgress.on("change", (v) => {
      setProgress(v * 100);
    });
    return () => { unsubY(); unsubP(); };
  }, [scrollY, scrollYProgress]);

  // Detect current chapter by section in viewport
  useEffect(() => {
    const updateChapter = () => {
      const ids = ["contact", "pricing", "testimonials", "why-us", "services"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            const labels: Record<string, string> = {
              "services": "The Arsenal",
              "why-us": "Why We Win",
              "testimonials": "The Legends",
              "pricing": "The Mission",
              "contact": "Begin",
            };
            setCurrentChapter(labels[id] || "Prologue");
            return;
          }
        }
      }
      setCurrentChapter("Prologue");
    };
    window.addEventListener("scroll", updateChapter, { passive: true });
    return () => window.removeEventListener("scroll", updateChapter);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto max-w-7xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-[0_0_40px_rgba(0,0,0,0.6)]" : ""}`}
          style={{
            background: scrolled ? "rgba(12,10,10,0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
            border: scrolled ? "1px solid rgba(255,255,255,0.09)" : "1px solid transparent",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" : "none",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-8 h-8 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-colors"
            >
              <Zap className="w-4 h-4 text-white" fill="currentColor" />
            </motion.div>
            <span className="font-extrabold tracking-tight text-white text-lg">
              Vertex<span className="text-white/50">.</span>
            </span>
          </Link>

          {/* Current chapter label — desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase">
                {currentChapter}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -2, scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link
                href="#contact"
                className="hidden md:inline-flex text-sm font-bold px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:-translate-y-px"
              >
                Get a Quote
              </Link>
            </motion.div>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="mx-auto max-w-7xl mt-1 h-[2px] rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-white/40 via-white to-white/40"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl glass border border-white/[0.08] p-6 flex flex-col gap-4"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-white/70 hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center text-sm font-bold px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black transition-all"
            >
              Get a Quote →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
