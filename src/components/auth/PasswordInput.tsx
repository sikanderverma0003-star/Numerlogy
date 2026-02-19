import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PasswordInput = ({
  id,
  label,
  placeholder = "••••••••",
  value,
  onChange,
  error,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white font-semibold text-sm drop-shadow">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pr-10 bg-white/95 border-2 border-white/20 text-gray-900 placeholder:text-gray-500 font-medium rounded-lg h-12 focus:outline-none focus:border-primary/60 focus:bg-white transition-all ${
            error ? "border-destructive/60 focus-visible:ring-destructive/20" : "focus:shadow-lg focus:shadow-primary/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-destructive text-sm font-medium">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
