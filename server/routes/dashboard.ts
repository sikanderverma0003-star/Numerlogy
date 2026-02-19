import { Router, Response, Request } from 'express';
import dbConnect from '../config/db';
import User from '../models/User';
import Report from '../models/Report';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get dashboard stats
router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const reportCount = await Report.countDocuments({ userId: req.user.userId });

    const stats = {
      totalReports: reportCount,
      planType: user.plan,
      usedQueries: user.used_queries,
      queryLimit: user.query_limit,
      remainingUsage: user.query_limit - user.used_queries,
      userName: user.name,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats',
    });
  }
});

// Get user history
router.get('/history', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const reports = await Report.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Report.countDocuments({ userId: req.user.userId });

    res.status(200).json({
      success: true,
      data: reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch history',
    });
  }
});

// Delete a report
router.delete('/history/:reportId', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const report = await Report.findById(req.params.reportId);
    if (!report) {
      res.status(404).json({ success: false, error: 'Report not found' });
      return;
    }

    if (report.userId.toString() !== req.user.userId) {
      res.status(403).json({ success: false, error: 'Forbidden' });
      return;
    }

    await Report.findByIdAndDelete(req.params.reportId);

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete report',
    });
  }
});

// Get user profile
router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
    });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    await dbConnect();

    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Valid name is required' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
    });
  }
});

export default router;
