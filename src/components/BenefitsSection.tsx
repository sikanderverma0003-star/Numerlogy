import { Hash, Zap, Palette, Calendar, Briefcase } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const benefits = [
  { icon: Hash, title: "Life Path Number Meaning", desc: "Understand the core number that defines your life journey and destiny." },
  { icon: Zap, title: "Hidden Strengths & Weaknesses", desc: "Uncover talents you didn't know you had and areas for growth." },
  { icon: Palette, title: "Lucky Numbers & Colors", desc: "Discover the numbers and colors that resonate with your energy." },
  { icon: Calendar, title: "Personal Year Forecast", desc: "Learn what this year holds for you and how to make the most of it." },
  { icon: Briefcase, title: "Career Alignment Insights", desc: "Find the career paths that align with your numerological profile." },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 lg:py-28 section-dark">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-hero-foreground mb-4">
            What You'll <span className="text-gradient-gold">Discover</span>
          </h2>
          <p className="text-hero-foreground/50 text-lg max-w-2xl mx-auto">
            Your personalized report reveals powerful insights about your life.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <AnimatedSection key={i}>
              <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <b.icon className="w-6 h-6 text-primary" style={{ color: 'hsl(280, 60%, 75%)' }} />
                </div>
                <h3 className="font-display text-lg font-semibold text-hero-foreground mb-2">{b.title}</h3>
                <p className="text-hero-foreground/50 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
