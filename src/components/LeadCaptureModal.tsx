import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone number required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  why: z.string().trim().max(1000).optional(),
  color: z.string(),
});

const purplePresets = ["#6A0DAD", "#8A2BE2", "#C77DFF", "#9B59B6", "#7B2D8E"];

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
}

const LeadCaptureModal = ({ open, onClose }: LeadCaptureModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    why: "",
    color: "#6A0DAD",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", why: "", color: "#6A0DAD" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-primary/20 bg-background">
        <DialogTitle className="font-display text-2xl font-bold text-foreground text-center">
          {submitted ? "Thank You!" : "Get Your Free Report"}
        </DialogTitle>

        {submitted ? (
          <div className="text-center py-8 animate-scale-in">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">
              Your numerology insights are being prepared.
            </p>
            <p className="text-muted-foreground">
              Please check your email shortly.
            </p>
            <Button variant="hero" size="lg" className="mt-6" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="name" className="text-foreground">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1 rounded-xl"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1 rounded-xl"
              />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 rounded-xl"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="why" className="text-foreground">Why do you want this report?</Label>
              <Textarea
                id="why"
                placeholder="I want clarity about my career direction, financial growth, relationships, and upcoming opportunities in my life."
                value={form.why}
                onChange={(e) => handleChange("why", e.target.value)}
                className="mt-1 rounded-xl min-h-[80px]"
              />
            </div>

            <div>
              <Label className="text-foreground">Select Your Favorite Color</Label>
              <div className="flex items-center gap-3 mt-2">
                {purplePresets.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      form.color === c ? "border-foreground scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => handleChange("color", c)}
                    aria-label={`Select color ${c}`}
                  />
                ))}
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="w-8 h-8 rounded-full cursor-pointer border-0"
                />
                <span className="text-xs text-muted-foreground font-mono">{form.color}</span>
              </div>
            </div>

            <Button variant="hero" size="lg" type="submit" className="w-full mt-4">
              Generate My Free Numerology Report
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
