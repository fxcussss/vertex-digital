"use client";

import { useRef, useEffect, useActionState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, Radio } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import confetti from "canvas-confetti";

const services = [
  { value: "web", label: "Web Design & Development" },
  { value: "brand", label: "Brand Identity" },
  { value: "seo", label: "SEO & Growth" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "mobile", label: "Mobile Application" },
  { value: "strategy", label: "Digital Strategy" },
  { value: "other", label: "Something Else" },
];

function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#10b981", "#34d399", "#6ee7b7", "#f9fafb", "#a7f3d0"],
  };
  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

const inputClass =
  "w-full rounded-xl glass px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-white/50 focus:ring-1 focus:ring-white/25 transition-all duration-300 border border-white/[0.07] hover:border-white/[0.12]";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const fired = useRef(false);

  useEffect(() => {
    if (state?.success && !fired.current) {
      fired.current = true;
      fireConfetti();
    }
    if (!state?.success) fired.current = false;
  }, [state]);

  const ref = useRef<HTMLElement>(null);

  // 3D Scroll Warp
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.65, 1], [1, 0.8]);
  const rotateX = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, 30]), { stiffness: 60, damping: 20 });
  const z = useSpring(useTransform(scrollYProgress, [0.65, 1], [0, -400]), { stiffness: 60, damping: 20 });

  return (
    <motion.section
      id="contact"
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
      {/* Transmission lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-white/[0.04]"
            style={{ top: `${15 + i * 17}%` }}
            animate={{ opacity: [0.03, 0.08, 0.03], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Radio className="w-4 h-4 text-white/60 animate-pulse" />
            <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em]">
              ◆ Incoming Transmission ◆
            </p>
            <Radio className="w-4 h-4 text-white/60 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-4">
            Let&apos;s build something{" "}
            <span className="text-emerald-glow">great</span>
          </h2>
          <p className="text-white/45 text-lg">
            Tell us about your project. We reply within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-10 border border-white/[0.07] relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <AnimatePresence mode="wait">
            {state?.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center py-10 gap-5"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: 2, duration: 0.5 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Mission Accepted! 🎉
                </h3>
                <p className="text-white/50 max-w-sm">{state.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-white hover:text-white/80 underline underline-offset-4 transition-colors font-bold"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={formAction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input name="name" type="text" required placeholder="Jean-Pierre Dupont" className={inputClass} />
                    {!state?.success && state?.errors?.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{state.errors.name[0]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input name="email" type="email" required placeholder="hello@yourcompany.mu" className={inputClass} />
                    {!state?.success && state?.errors?.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{state.errors.email[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
                      Phone (optional)
                    </label>
                    <input name="phone" type="tel" placeholder="+230 5XX XXXX" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
                      Service Needed *
                    </label>
                    <select name="service" required className={`${inputClass} cursor-pointer`} defaultValue="">
                      <option value="" disabled className="bg-[#0a0a0a]">Select a service…</option>
                      {services.map((s) => (
                        <option key={s.value} value={s.value} className="bg-[#0a0a0a]">{s.label}</option>
                      ))}
                    </select>
                    {!state?.success && state?.errors?.service && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{state.errors.service[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-white/35 uppercase tracking-widest mb-2">
                    Project Brief *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, budget, and timeline…"
                    className={`${inputClass} resize-none`}
                  />
                  {!state?.success && state?.errors?.message && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={!isPending ? { scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.45)" } : {}}
                  whileTap={!isPending ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm transition-all duration-200"
                >
                  <AnimatePresence mode="wait">
                    {isPending ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Launch Mission
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-center text-xs text-white/25">
                  🔒 Your details are private and never shared with third parties.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
