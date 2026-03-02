"use client";


import { Zap, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { icon: Twitter, href: "https://twitter.com/vertexdigital", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/vertexdigital", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/vertexdigital", label: "Instagram" },
  { icon: Github, href: "https://github.com/vertexdigital", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand col */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                <Zap className="w-4 h-4 text-emerald-400" fill="currentColor" />
              </div>
              <span className="font-extrabold tracking-tight text-white text-xl">
                Vertex<span className="text-emerald-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              A premium digital agency crafting world-class web experiences,
              brand identities, and growth systems for ambitious businesses.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav col */}
          <div className="md:col-span-3">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/45 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://vertex-digital-sooty.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 hover:text-emerald-400 transition-colors duration-200"
                >
                  vertex-digital-sooty.vercel.app ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact col */}
          <div className="md:col-span-4">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">
              Get In Touch
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/45">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Port Louis, Mauritius 🇲🇺
              </li>
              <li>
                <a
                  href="mailto:hello@vertexdigital.com"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-emerald-400 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  hello@vertexdigital.com

                </a>
              </li>
              <li>
                <a
                  href="tel:+23057001234"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-emerald-400 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  +230 5700 1234
                </a>
              </li>
            </ul>

            {/* CTA strip */}
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200"
            >
              Start a Project →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Vertex Digital Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/20">Crafted with ❤️ in Mauritius</span>
            <span className="text-white/10">·</span>
            <a
              href="https://vertex-digital-sooty.vercel.app"
              className="text-xs text-white/20 hover:text-emerald-400 transition-colors"
            >
              vertex-digital-sooty.vercel.app
            </a>
            <span className="text-white/10">·</span>
            <a
              href="/admin"
              className="text-xs text-white/20 hover:text-emerald-400 transition-colors"
            >
              Admin ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
