import { ClipboardList, Calculator, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { icon: ClipboardList, step: "01", title: "Enter Your Details", desc: "Fill in your name, birth date, and a few quick details." },
  { icon: Calculator, step: "02", title: "Instant Calculation", desc: "Our system computes your key numerological numbers in seconds." },
  { icon: Mail, step: "03", title: "Receive Your Insight", desc: "Get a beautifully formatted personalized report delivered to you." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">Three simple steps to your personalized numerology report.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <AnimatedSection key={i}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">Step {s.step}</span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
