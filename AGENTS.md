# Vertex Digital — Source of Truth

## Brand Identity
- **Agency Name:** Vertex Digital
- **Tagline:** We build digital experiences that perform.
- **Location:** Mauritius 🇲🇺

## Design System — VisionOS Aesthetic

### Colours
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#030303` | Page base |
| Emerald Glow | `#10b981` / `#34d399` | Primary accent, CTAs, highlights |
| Surface | `rgba(255,255,255,0.03)` | Glassmorphism cards |
| Border | `rgba(255,255,255,0.08)` | Card borders |
| Text Primary | `#f9fafb` | Headings |
| Text Muted | `rgba(255,255,255,0.5)` | Body / subtext |

### Glassmorphism Card Pattern
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 1.5rem;
```

### Radial Gradient Emerald Glow (fixed, top-right)
```css
background: radial-gradient(ellipse at 80% 0%, rgba(16,185,129,0.15) 0%, transparent 60%);
position: fixed; inset: 0; pointer-events: none; z-index: 0;
```

## Typography
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Style:** `text-balance`, `tracking-tighter` for headings
- **Scale:** Display `7xl–8xl` → Body `base–lg`

## Motion Principles (Framer Motion)
- Reveal: `opacity 0→1`, `y: 40→0`, `duration: 0.7`, `ease: easeOut`
- Stagger children: `delayChildren: 0.1`, `staggerChildren: 0.08`
- Kinetic Typography (H1): letters scale `1→1.05` on scroll progress
- Hover lift: `y: -4`, `duration: 0.2`

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod
- **Form:** Next.js Server Actions
- **Confetti:** canvas-confetti

## Pages & Sections
1. **Hero** — Kinetic H1, emerald glow, CTA buttons
2. **Services** — Glassmorphism cards (6 services)
3. **Why Us** — Stats + value props
4. **Contact** — Server Action form, Zod + Mauritius phone regex, tactile feedback, confetti

## Mauritius Phone Validation
```regex
/^\+230\s?\d{3}\s?\d{4}$/
```
Matches: `+230 5XX XXXX` format (mobile) and landlines.

## File Structure
```
src/
  app/
    layout.tsx          # Root layout, Plus Jakarta Sans font
    globals.css         # Tailwind v4, CSS custom properties
    page.tsx            # Home page (all sections)
    actions/
      contact.ts        # Server Action for contact form
  components/
    Hero.tsx
    Services.tsx
    WhyUs.tsx
    ContactForm.tsx
    Navbar.tsx
    Footer.tsx
    GlowBackground.tsx
```

## Coding Standards
- All client components use `"use client"` directive
- Server Actions use `"use server"` directive
- Prefer named exports
- Motion variants defined outside components for performance
- Use `will-change: transform` sparingly — only on animated elements
