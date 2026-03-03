import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import RocketScroll from "@/components/RocketScroll";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "#030303" }}>
      <GlowBackground />
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <RocketScroll />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
