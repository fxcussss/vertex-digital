"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Zap, Lock, Loader2, AlertCircle } from "lucide-react";
import { adminLogin } from "@/app/actions/admin";

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(adminLogin, null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-md"
    >
      {/* Card */}
      <div className="glass rounded-3xl p-10 border border-white/[0.08]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-emerald-400" fill="currentColor" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">
            Vertex<span className="text-emerald-400">.</span> Admin
          </h1>
          <p className="text-sm text-white/40 mt-1">Quote Request Dashboard</p>
        </div>

        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••••"
                className="w-full rounded-xl glass pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all border border-white/[0.08]"
              />
            </div>
            {state?.error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {state.error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={!isPending ? { scale: 1.02 } : {}}
            whileTap={!isPending ? { scale: 0.98 } : {}}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-bold text-sm transition-all hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In to Dashboard →"
            )}
          </motion.button>
        </form>

        <p className="text-center text-xs text-white/20 mt-6">
          🔒 Admin access only · Not indexed by search engines
        </p>
      </div>
    </motion.div>
  );
}
