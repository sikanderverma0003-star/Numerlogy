import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onOpenForm: () => void;
}

const Stars = () => (
  <>
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ))}
  </>
);

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <Stars />
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/15 blur-[150px]" />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-hero-foreground/80">Free Personalized Report</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-hero-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Unlock Your Hidden{" "}
            <span className="text-gradient">Life Code</span>{" "}
            with Numerology
          </h1>

          <p className="text-lg sm:text-xl text-hero-foreground/60 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Discover your Life Path Number, strengths, lucky colors, and upcoming
            opportunities — calculated instantly from your birth details.
          </p>

          <div className="animate-fade-up space-y-4" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" onClick={onOpenForm}>
              Get My Free Report
            </Button>
            <p className="text-hero-foreground/50 text-sm">
              or{" "}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                create an account
              </Link>
              {" "}to save your results
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-hero-foreground/40 text-sm animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <span>✦ 100% Free</span>
            <span>✦ Instant Results</span>
            <span>✦ Data Secured</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
