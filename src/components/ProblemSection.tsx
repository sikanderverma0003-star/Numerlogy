import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface ProblemSectionProps {
  onOpenForm: () => void;
}

const problems = [
  "Career confusion despite constant effort",
  "Financial instability and unclear growth path",
  "Repeating relationship patterns you can't break",
  "Lack of clarity about your true purpose",
];

const ProblemSection = ({ onOpenForm }: ProblemSectionProps) => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Feeling <span className="text-gradient">Stuck or Confused</span> About Your Life Path?
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            You're not alone. Millions of people struggle with the same questions every day.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left mb-12">
            {problems.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{p}</span>
              </div>
            ))}
          </div>

          <Button variant="hero" size="lg" onClick={onOpenForm}>
            Get My Free Report
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProblemSection;
