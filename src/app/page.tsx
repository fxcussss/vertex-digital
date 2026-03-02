import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "#030303" }}>
      {/* Fixed ambient glow */}
      <GlowBackground />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <Services />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  );
}
