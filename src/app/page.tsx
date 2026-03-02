import CinematicBackground from "@/components/CinematicBackground";
import FilmGrain from "@/components/FilmGrain";
import ChapterTitle from "@/components/ChapterTitle";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "#0c0a0a" }}>
      {/* Cinematic atmosphere */}
      <CinematicBackground />
      <FilmGrain />

      {/* Navigation */}
      <Navbar />

      {/* Chapter I — Opening */}
      <Hero />

      {/* Chapter I separator */}
      <ChapterTitle number="I" title="The Arsenal" subtitle="What We Build" />

      {/* Chapter I — Services */}
      <Services />

      {/* Chapter II separator */}
      <ChapterTitle number="II" title="Why We Win" subtitle="Our Edge" />

      {/* Chapter II — Why Us */}
      <WhyUs />

      {/* Chapter III separator */}
      <ChapterTitle number="III" title="The Legends" subtitle="Client Stories" />

      {/* Chapter III — Testimonials */}
      <Testimonials />

      {/* Chapter IV separator */}
      <ChapterTitle number="IV" title="Choose Your Mission" subtitle="Pricing" />

      {/* Chapter IV — Pricing */}
      <Pricing />

      {/* Chapter V separator */}
      <ChapterTitle number="V" title="Intelligence Files" subtitle="FAQ" />

      {/* Chapter V — FAQ */}
      <FAQ />

      {/* Chapter VI separator */}
      <ChapterTitle number="VI" title="Begin the Mission" subtitle="Contact" />

      {/* Chapter VI — Contact */}
      <ContactForm />

      {/* Epilogue */}
      <Footer />
    </main>
  );
}
