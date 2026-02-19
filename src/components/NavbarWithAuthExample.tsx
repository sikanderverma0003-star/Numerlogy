import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Example: How to add auth links to your Navbar
 * 
 * This component shows:
 * 1. How to add Login/Signup links
 * 2. How to conditionally show auth buttons
 * 3. How to style them consistently
 */

interface NavbarWithAuthExampleProps {
  onOpenForm?: () => void;
}

export const NavbarWithAuthExample = ({ onOpenForm }: NavbarWithAuthExampleProps) => {
  const location = useLocation();
  
  // Check if user is on an auth page
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="font-display font-bold text-xl">
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            Numerology
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav Links */}
          <Link 
            to="#" 
            className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
          >
            About
          </Link>
          <Link 
            to="#" 
            className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
          >
            Features
          </Link>
          <Link 
            to="#" 
            className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
          >
            FAQ
          </Link>

          {/* Auth Buttons - Only show if not on auth page */}
          {!isAuthPage && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
              <Button 
                size="sm"
                className="glow-button"
                asChild
              >
                <Link to="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          {!isAuthPage && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
              <Button 
                size="sm"
                className="glow-button text-xs"
                asChild
              >
                <Link to="/signup">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithAuthExample;
