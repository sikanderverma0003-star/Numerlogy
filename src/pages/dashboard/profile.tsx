import React, { useState, useEffect } from "react";
import { AlertCircle, Check } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import dashboardAPI, { UserProfile } from "@/lib/dashboardAPI";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardAPI.getProfile();
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      await dashboardAPI.updateProfile(formData.name);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-gray-600">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Form */}
        <Card className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                disabled={saving}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                disabled
                className="mt-2 bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || formData.name === profile?.name}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Card>

        {/* Plan Information */}
        <Card className="p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Plan Information</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Current Plan</span>
              <span className="font-semibold text-gray-900 capitalize">
                {profile?.plan || "Free"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Queries Used</span>
              <span className="font-semibold text-gray-900">
                {profile?.used_queries}/{profile?.query_limit}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((profile?.used_queries || 0) / (profile?.query_limit || 1)) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {profile ? profile.query_limit - profile.used_queries : 0} queries remaining
              </p>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Upgrade Plan
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
