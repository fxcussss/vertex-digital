"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ChapterTitleProps {
    number: string;
    title: string;
    subtitle?: string;
}

export default function ChapterTitle({ number, title, subtitle }: ChapterTitleProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-30% 0px -30% 0px" });

    return (
        <div
            ref={ref}
            className="relative z-10 flex items-center justify-center py-8 px-4 overflow-hidden"
            aria-hidden="true"
        >
            {/* Letterbox top bar */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {/* Chapter number */}
                <motion.span
                    className="font-black text-[10px] tracking-[0.4em] text-emerald-500/40 uppercase"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    Chapter {number}
                </motion.span>

                {/* Divider line */}
                <motion.div
                    className="h-px bg-white/10"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />

                {/* Title */}
                <motion.span
                    className="font-black text-xs tracking-[0.3em] text-white/25 uppercase"
                    initial={{ x: 20, opacity: 0, filter: "blur(8px)" }}
                    animate={isInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    {title}
                </motion.span>

                {subtitle && (
                    <>
                        <motion.div
                            className="h-px bg-white/10"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 48 } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                        <motion.span
                            className="font-medium text-[10px] tracking-[0.2em] text-white/15 uppercase"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            {subtitle}
                        </motion.span>
                    </>
                )}
            </motion.div>

            {/* Letterbox bottom bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
        </div>
    );
}
