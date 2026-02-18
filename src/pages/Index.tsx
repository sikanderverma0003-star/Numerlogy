import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import LeadCaptureModal from "@/components/LeadCaptureModal";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <div className="min-h-screen">
      <Navbar onOpenForm={openForm} />
      <main>
        <HeroSection onOpenForm={openForm} />
        <ProblemSection onOpenForm={openForm} />
        <BenefitsSection />
        <HowItWorksSection />
        <AboutSection />
        <FAQSection />
        <FinalCTASection onOpenForm={openForm} />
      </main>
      <Footer />
      <LeadCaptureModal open={formOpen} onClose={() => setFormOpen(false)} />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border md:hidden z-40">
        <button
          onClick={openForm}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold glow-button text-base"
        >
          Get My Free Report
        </button>
      </div>
    </div>
  );
};

export default Index;
