"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = new Lenis({
            // Ultra-fluid: maximum cinematic smooth scroll
            duration: 2.0,
            easing: (t: number) => 1 - Math.pow(1 - t, 5), // quintic ease-out: starts fast, buttery slow drift
            touchMultiplier: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
            infinite: false,
        });

        // Tight RAF loop for maximum smoothness — no throttling
        let raf: number;
        const onRaf = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(onRaf);
        };
        raf = requestAnimationFrame(onRaf);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
