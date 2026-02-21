import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { API_BASE } from "@/lib/api";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.general = "You must agree to the Terms & Privacy Policy";
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
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.email.split("@")[0],
        }),
      });

      if (!response.ok) {
        let message = "Signup failed. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData?.error) message = errorData.error;
        } catch {
          message = response.status === 500
            ? "Server error. Please try again later."
            : "Signup failed. Please try again.";
        }
        setErrors({ general: message });
        return;
      }

      const data = await response.json();

      // Store auth token and user email
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userEmail", data.data.user.email);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general:
          "Cannot reach the server. In a terminal run: npm run start (starts app + backend, no MongoDB needed).",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to unlock your personalized report"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(value) => {
            setFormData({ ...formData, email: value });
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={(value) => {
            setFormData({ ...formData, password: value });
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          error={errors.password}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(value) => {
            setFormData({ ...formData, confirmPassword: value });
            if (errors.confirmPassword)
              setErrors({ ...errors, confirmPassword: "" });
          }}
          error={errors.confirmPassword}
        />

        {/* Terms checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => {
              setAgreeToTerms(checked as boolean);
              if (errors.general) setErrors({ ...errors, general: "" });
            }}
            className="mt-1 border-white/30"
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/90 leading-relaxed cursor-pointer"
          >
            I agree to the{" "}
            <a
              href="#"
              className="text-blue-300 hover:text-blue-200 underline transition-colors font-semibold"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-300 hover:text-blue-200 underline transition-colors font-semibold"
            >
              Privacy Policy
            </a>
          </label>
        </div>

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
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Login link */}
        <p className="text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-200 font-bold transition-colors underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
