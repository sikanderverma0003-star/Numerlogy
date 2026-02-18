import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface FinalCTASectionProps {
  onOpenForm: () => void;
}

const FinalCTASection = ({ onOpenForm }: FinalCTASectionProps) => {
  return (
    <section className="py-20 lg:py-28 section-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-hero-foreground mb-6">
            Your Numbers Are Waiting to <span className="text-gradient-gold">Guide You</span>
          </h2>
          <p className="text-hero-foreground/50 text-lg mb-10">
            Don't let another day pass without understanding the code that shapes your life.
          </p>
          <Button variant="hero" size="xl" onClick={onOpenForm}>
            Claim My Free Report Now
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTASection;
