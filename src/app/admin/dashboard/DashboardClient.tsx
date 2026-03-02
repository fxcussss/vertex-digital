"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, LogOut, Mail, Phone, MessageSquare,
  RefreshCw, CheckCheck, Eye, Inbox, X, Calendar,
} from "lucide-react";
import { adminLogout, markStatus } from "@/app/actions/admin";
import type { Submission } from "@/lib/submissions";

const SERVICE_LABELS: Record<string, string> = {
  web: "Web Design & Dev",
  brand: "Brand Identity",
  seo: "SEO & Growth",
  ecommerce: "E-Commerce",
  mobile: "Mobile App",
  strategy: "Digital Strategy",
  other: "Other",
};

const STATUS_STYLES = {
  new: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  read: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  replied: "bg-white/[0.06] text-white/40 border-white/10",
};

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: any; color: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-black text-white tracking-tight">{value}</p>
        <p className="text-xs text-white/40 font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardClient({ submissions: initial }: { submissions: Submission[] }) {
  const [submissions, setSubmissions] = useState(initial);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [isPending, startTransition] = useTransition();

  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);
  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    read: submissions.filter((s) => s.status === "read").length,
    replied: submissions.filter((s) => s.status === "replied").length,
  };

  function handleStatus(id: string, status: Submission["status"]) {
    startTransition(async () => {
      await markStatus(id, status);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
      if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null);
    });
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen px-4 py-8" style={{ background: "#030303" }}>
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(16,185,129,0.12) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-black text-white tracking-tight">Vertex<span className="text-emerald-400">.</span> Admin</h1>
              <p className="text-xs text-white/30">Quote Request Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-white/40 hover:text-white transition-colors px-3 py-2 rounded-xl glass"
            >
              ← View Site
            </a>
            <form action={adminLogout}>
              <button
                type="submit"
                className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors px-3 py-2 rounded-xl glass"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Requests" value={counts.all} icon={Inbox} color="bg-white/[0.06] text-white/50" />
          <StatCard label="New" value={counts.new} icon={Mail} color="bg-emerald-500/15 text-emerald-400" />
          <StatCard label="Read" value={counts.read} icon={Eye} color="bg-blue-500/15 text-blue-400" />
          <StatCard label="Replied" value={counts.replied} icon={CheckCheck} color="bg-white/[0.06] text-white/40" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "new", "read", "replied"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${filter === f
                ? "bg-emerald-500 text-black"
                : "glass text-white/50 hover:text-white border border-white/[0.08]"
                }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass rounded-3xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/30">
              <Inbox className="w-10 h-10 mb-3" />
              <p className="font-semibold">No submissions yet</p>
              <p className="text-xs mt-1">Quote requests will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Name", "Email", "Service", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left text-[10px] font-bold text-white/25 uppercase tracking-widest px-6 py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((sub) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelected(sub)}
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">{sub.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white/50">{sub.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.05] text-white/50">
                            {SERVICE_LABELS[sub.service] ?? sub.service}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-white/35 whitespace-nowrap">{formatDate(sub.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLES[sub.status]}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStatus(sub.id, "read")}
                              disabled={sub.status === "read" || isPending}
                              title="Mark as Read"
                              className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-30"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleStatus(sub.id, "replied")}
                              disabled={sub.status === "replied" || isPending}
                              title="Mark as Replied"
                              className="p-1.5 rounded-lg text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-30"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleStatus(sub.id, "new")}
                              disabled={sub.status === "new" || isPending}
                              title="Reset to New"
                              className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass border-l border-white/[0.08] p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-black text-white tracking-tight">Quote Request</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border capitalize ${STATUS_STYLES[selected.status]}`}>
                    {selected.status}
                  </span>
                  <span className="text-xs text-white/30 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selected.createdAt)}
                  </span>
                </div>

                {/* Contact info */}
                <div className="glass rounded-2xl p-5 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Name</p>
                    <p className="text-sm font-semibold text-white">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-sm text-emerald-400 hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-sm text-emerald-400 hover:underline flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Service</p>
                    <p className="text-sm text-white/70">{SERVICE_LABELS[selected.service] ?? selected.service}</p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> Project Brief
                  </p>
                  <div className="glass rounded-2xl p-5">
                    <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Quote Request — Vertex Digital`}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all"
                    onClick={() => handleStatus(selected.id, "replied")}
                  >
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </a>
                  <div className="grid grid-cols-3 gap-2">
                    {(["new", "read", "replied"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatus(selected.id, s)}
                        disabled={selected.status === s || isPending}
                        className={`py-2 rounded-xl text-xs font-bold capitalize transition-all disabled:opacity-40 ${selected.status === s ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "glass text-white/50 hover:text-white"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
