import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ToolFormProps {
  onSubmit: (inputData: Record<string, any>, type: string) => void;
  loading?: boolean;
}

const ToolForm = ({ onSubmit, loading = false }: ToolFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    type: "numerology",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.dateOfBirth) {
      alert("Please fill in all fields");
      return;
    }
    onSubmit(
      {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
      },
      formData.type
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Generate Your Report</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName" className="text-gray-700 font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2"
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-2"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="type" className="text-gray-700 font-medium">
          Report Type
        </Label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          disabled={loading}
        >
          <option value="numerology">Numerology Analysis</option>
          <option value="astrology">Astrological Chart</option>
          <option value="tarot">Tarot Reading</option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
      >
        <Sparkles size={20} />
        {loading ? "Generating..." : "Generate Report"}
      </Button>
    </form>
  );
};

export default ToolForm;
