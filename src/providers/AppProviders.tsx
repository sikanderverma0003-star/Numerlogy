import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/useAuth";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Wrapper component for all app providers
 * Combine with QueryClientProvider and TooltipProvider in App.tsx
 */
export const AppProviders = ({ children }: AppProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
