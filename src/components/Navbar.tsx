import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenForm: () => void;
}

const Navbar = ({ onOpenForm }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-hero/80 border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-xl font-bold text-hero-foreground tracking-tight"
        >
          <img
            src="/indian-pandit-standing-in-welcome-pose-2775571-2319304.webp"
            alt="AI Baba"
            className="h-9 w-9 rounded-full shadow-md"
          />
          <span className="text-gradient">AI Baba</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-hero-foreground/70 hover:text-hero-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="default" onClick={onOpenForm}>
            Get My Free Report
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-hero-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl bg-hero/95 border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-hero-foreground/70 hover:text-hero-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button variant="hero" size="lg" onClick={() => { setMobileOpen(false); onOpenForm(); }}>
              Get My Free Report
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
