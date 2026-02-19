import { Router, Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../config/jwt";
import bcrypt from "bcryptjs";

const router = Router();

// Sign Up
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      plan: "free",
      used_queries: 0,
      query_limit: 10,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id!.toString(), user.email);

    res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        },
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id!.toString(), user.email);

    res.json({
      message: "Login successful",
      data: {
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Forgot Password (Send Reset Email - Mock)
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      return res.json({ message: "If the email exists, a reset link has been sent" });
    }

    // In a real app, you would:
    // 1. Generate a reset token
    // 2. Save it to the user document with an expiration
    // 3. Send an email with reset link
    // For now, we'll just log it
    console.log(`Password reset requested for: ${email}`);

    res.json({ message: "If the email exists, a reset link has been sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

export default router;
