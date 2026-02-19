import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { API_BASE } from "@/lib/api";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check if there's a success message from signup
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }

    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, [location.state]);

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
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        let message = "Login failed. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData?.error) message = errorData.error;
        } catch {
          message = response.status === 500
            ? "Server error. Please try again later."
            : "Login failed. Please try again.";
        }
        setErrors({ general: message });
        return;
      }

      const data = await response.json();

      // Store auth token and user email
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userEmail", data.data.user.email);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general:
          "Cannot reach the server. Start the backend with: npm run dev:server (and ensure MongoDB is running if required).",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {successMessage && (
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-green-200 text-sm font-semibold">
            {successMessage}
          </div>
        )}

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
          placeholder="••••••••"
          value={formData.password}
          onChange={(value) => {
            setFormData({ ...formData, password: value });
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          error={errors.password}
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setRememberMe(checked as boolean)
              }
              className="border-white/30"
            />
            <label
              htmlFor="remember"
              className="text-sm text-white/90 cursor-pointer font-medium"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-300 hover:text-blue-200 font-semibold transition-colors underline"
          >
            Forgot password?
          </Link>
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
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Signup link */}
        <p className="text-center text-white/80 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-300 hover:text-blue-200 font-bold transition-colors underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
