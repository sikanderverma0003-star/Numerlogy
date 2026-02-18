import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 section-dark">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-primary/60 uppercase mb-4 block">About</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-hero-foreground mb-8">
            Meet <span className="text-gradient-gold">Sikander Verma</span>
          </h2>
          <div className="glass-card p-8 lg:p-12">
            <p className="text-hero-foreground/70 text-lg leading-relaxed">
              Hi, I'm <strong className="text-hero-foreground">Sikander Verma</strong>. I combine analytical thinking with
              numerology principles to deliver practical and empowering guidance — without
              fear-based predictions. My goal is to help you find clarity, confidence, and
              direction using the powerful language of numbers.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
