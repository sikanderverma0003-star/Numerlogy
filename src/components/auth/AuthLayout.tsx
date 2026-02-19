import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden py-12 px-4">
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/15 blur-[150px]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glass card - Enhanced visibility */}
        <div className="rounded-2xl p-8 sm:p-10 animate-fade-up backdrop-blur-xl border border-white/30 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(106, 13, 173, 0.3) 0%, rgba(106, 13, 173, 0.15) 100%)'
        }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mb-2 drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/90 text-sm sm:text-base drop-shadow">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form container */}
          {children}
        </div>

        {/* Footer text */}
        <p className="text-center text-white/80 text-xs sm:text-sm mt-6 drop-shadow">
          Your security is our priority • Encrypted & Secure
        </p>
      </div>
    </section>
  );
};

export default AuthLayout;
