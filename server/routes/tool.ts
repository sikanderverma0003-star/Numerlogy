import { Router, Response, Request } from 'express';
import dbConnect from '../config/db';
import User from '../models/User';
import Report from '../models/Report';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Generate a new report
router.post('/generate', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const { inputData, type } = req.body;

    if (!inputData) {
      res.status(400).json({ success: false, error: 'Input data is required' });
      return;
    }

    // Get user and check query limit
    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    if (user.used_queries >= user.query_limit) {
      res.status(429).json({
        success: false,
        error: 'Query limit reached. Upgrade your plan for more queries.',
      });
      return;
    }

    // Generate result (mock calculation)
    const result = generateNumerologyResult(inputData);

    // Create and save report
    const report = new Report({
      userId: req.user.userId,
      inputData,
      result,
      type: type || 'numerology',
    });

    await report.save();

    // Update user's query count
    user.used_queries += 1;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Report generated successfully',
      data: report,
    });
  } catch (error) {
    console.error('Tool generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate report',
    });
  }
});

// Mock numerology calculation
function generateNumerologyResult(inputData: any) {
  // This is a placeholder - replace with actual calculation logic
  const dateOfBirth = inputData.dateOfBirth || '';
  const fullName = inputData.fullName || '';

  // Simple mock calculation
  const sumDigits = (str: string): number => {
    return str
      .replace(/\D/g, '')
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  const lifePathNumber = sumDigits(dateOfBirth) % 9 || 9;
  const destinyNumber = sumDigits(fullName) % 9 || 9;
  const personalityNumber = sumDigits(fullName.split(' ')[0]) % 9 || 9;

  return {
    lifePathNumber,
    personalityNumber,
    destinyNumber,
    luckyColors: ['purple', 'violet', 'indigo'],
    luckyNumbers: [lifePathNumber, destinyNumber, personalityNumber],
    compatibility: 'Excellent',
    fortuneTelling: 'Good opportunities ahead',
    summary: `Your Life Path is ${lifePathNumber}. This number indicates your personality traits and life choices.`,
  };
}

export default router;
