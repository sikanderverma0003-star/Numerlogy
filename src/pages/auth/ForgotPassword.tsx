import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";

interface FormErrors {
  email?: string;
  general?: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleValidation = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically send a reset email via your backend
      console.log("Password reset email requested for:", email);

      setSubmitted(true);
    } catch (error) {
      setErrors({
        general: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you password reset instructions"
      >
        <div className="space-y-6 text-center">
          {/* Confirmation icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-white/90 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="text-blue-300 font-semibold break-all text-sm">{email}</p>
          </div>

          {/* Instructions */}
          <p className="text-white/80 text-sm leading-relaxed">
            Check your email and click the reset link. If you don't see it,
            check your spam folder.
          </p>

          {/* Back button */}
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
            onClick={() => {
              setSubmitted(false);
              setEmail("");
            }}
          >
            Send Another Link
          </Button>

          {/* Back to login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold transition-colors justify-center w-full mt-2 underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email to receive reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
        />

        {errors.general && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-200 text-sm font-semibold">
            {errors.general}
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/40 transition-all rounded-lg"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        {/* Back to login */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold transition-colors justify-center w-full text-sm underline"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
