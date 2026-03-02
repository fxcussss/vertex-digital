"use client";

// Performance Optimized Film Grain
// Uses a static SVG noise pattern translated via CSS animation
// This is 100x more performant than drawing to a canvas every frame

export default function FilmGrain() {
    return (
        <>
            <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(2%, -4%); }
          40% { transform: translate(-2%, 4%); }
          50% { transform: translate(4%, -2%); }
          60% { transform: translate(-4%, -4%); }
          70% { transform: translate(2%, 2%); }
          80% { transform: translate(-2%, -2%); }
          90% { transform: translate(4%, 4%); }
        }
        .bg-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: grain 4s steps(10) infinite;
          background-size: 200px 200px;
        }
      `}</style>
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-[-100%] z-[5] bg-grain opacity-[0.04] mix-blend-screen will-transform"
            />
        </>
    );
}
