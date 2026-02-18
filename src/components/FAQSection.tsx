import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  { q: "Is this really free?", a: "Yes, 100% free. We believe everyone deserves access to their numerology insights. There are no hidden charges or subscription traps." },
  { q: "Is my data secure?", a: "Absolutely. Your personal information is encrypted and never shared with third parties. We take your privacy very seriously." },
  { q: "Do I need my exact birth time?", a: "No, your birth date is sufficient for calculating your core numerology numbers. Exact time is not required." },
  { q: "Is this prediction or guidance?", a: "This is guidance-based insight, not fear-based prediction. We focus on empowering you with self-knowledge and practical direction." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
