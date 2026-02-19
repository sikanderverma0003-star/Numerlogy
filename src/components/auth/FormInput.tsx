import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white font-semibold text-sm drop-shadow">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white/95 border-2 border-white/20 text-gray-900 placeholder:text-gray-500 font-medium rounded-lg h-12 focus:outline-none focus:border-primary/60 focus:bg-white transition-all ${
          error ? "border-destructive/60 focus-visible:ring-destructive/20" : "focus:shadow-lg focus:shadow-primary/20"
        }`}
      />
      {error && (
        <p className="text-red-300 text-sm font-semibold drop-shadow">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
