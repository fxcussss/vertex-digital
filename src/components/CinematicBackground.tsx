"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Antigravity from "./Antigravity";

export default function CinematicBackground() {
  const { scrollYProgress } = useScroll();
  const nebulaY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -120]),
    { stiffness: 40, damping: 20 }
  );
  const nebula2Y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 30, damping: 20 }
  );

  return (
    <>
      {/* 3D God-Tier Antigravity Field */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80 mix-blend-screen">
        <Antigravity
          count={800}
          color="#ffffff"
          particleSize={1.8}
          ringRadius={12}
          magnetRadius={15}
          rotationSpeed={0.05}
        />
      </div>

      {/* Nebula glow 1 — top right */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 will-transform"
        style={{
          top: "-20%",
          right: "-10%",
          width: "70vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          y: nebulaY,
          filter: "blur(40px)",
        }}
      />

      {/* Nebula glow 2 — bottom left */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 will-transform"
        style={{
          bottom: "-20%",
          left: "-15%",
          width: "60vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 65%)",
          y: nebula2Y,
          filter: "blur(60px)",
        }}
      />

      {/* Deep space gradient base */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(5,5,5,1) 0%, rgba(10,10,10,1) 60%)",
        }}
      />
    </>
  );
}
