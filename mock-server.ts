import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

// Mock user database
const mockUsers: Record<string, { email: string; password: string; name: string }> = {};
const mockReports: Record<string, any[]> = {};

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Mock server is running' });
});

// Mock signup
app.post('/api/auth/signup', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  if (mockUsers[email]) {
    return res.status(400).json({ success: false, error: 'Email already exists' });
  }

  const id = 'user-' + mockUserId++;
  mockUsers[email] = { id, email, password, name: name || email.split('@')[0] };
  mockReports[email] = [];

  const token = 'mock-token-' + Date.now();
  mockTokenToEmail[token] = email;
  res.status(201).json({
    message: 'User created successfully',
    data: {
      token,
      user: { _id: id, email, name: mockUsers[email].name, plan: 'free' },
    },
  });
});

// Mock login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const user = mockUsers[email];
  
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const token = 'mock-token-' + Date.now();
  mockTokenToEmail[token] = email;
  res.status(200).json({
    message: 'Login successful',
    data: {
      token,
      user: { _id: user.id, email: user.email, name: user.name, plan: 'free' },
    },
  });
});

// Mock forgot password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email required' });
  }

  res.status(200).json({ 
    success: true, 
    message: 'Password reset link sent to email'
  });
});

// Mock dashboard stats (use token to get current user name)
app.get('/api/dashboard/stats', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  const user = email ? mockUsers[email] : null;
  const reportCount = email && mockReports[email] ? mockReports[email].length : 0;
  res.status(200).json({
    success: true,
    data: {
      totalReports: reportCount,
      planType: 'free',
      usedQueries: reportCount,
      queryLimit: 10,
      remainingUsage: Math.max(0, 10 - reportCount),
      userName: user?.name || 'User',
    },
  });
});

// Mock get history (per-user reports)
app.get('/api/dashboard/history', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  const reports = email && mockReports[email] ? mockReports[email] : [];

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const total = reports.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageData = reports.slice(start, start + limit);

  res.status(200).json({
    success: true,
    data: pageData,
    pagination: {
      page,
      limit,
      total,
      pages,
    },
  });
});

// Mock delete report (remove from current user's list)
app.delete('/api/dashboard/history/:reportId', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  if (email && mockReports[email]) {
    mockReports[email] = mockReports[email].filter((r: any) => r._id !== req.params.reportId);
  }
  res.status(200).json({
    success: true,
    message: 'Report deleted successfully',
  });
});

// Mock get profile (from token)
app.get('/api/dashboard/profile', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  const user = email ? mockUsers[email] : null;
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const reportCount = mockReports[email]?.length ?? 0;
  res.status(200).json({
    success: true,
    data: {
      _id: user.id,
      email: user.email,
      name: user.name,
      plan: 'free',
      used_queries: reportCount,
      query_limit: 10,
    },
  });
});

// Mock update profile
app.put('/api/dashboard/profile', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  const user = email ? mockUsers[email] : null;
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const { name } = req.body;
  if (name && typeof name === 'string') user.name = name.trim();
  const reportCount = mockReports[email]?.length ?? 0;
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: user.id,
      email: user.email,
      name: user.name,
      plan: 'free',
      used_queries: reportCount,
      query_limit: 10,
    },
  });
});

// Mock tool calculation / generate report (stores per user)
app.post('/api/tool/generate', (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : '';
  const email = token ? mockTokenToEmail[token] : null;
  if (!email || !mockUsers[email]) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { inputData, type } = req.body;

  if (!inputData || !inputData.fullName || !inputData.dateOfBirth) {
    return res.status(400).json({ success: false, error: 'Full name and date of birth are required' });
  }

  const lifePathNumber = Math.floor(Math.random() * 9) + 1;
  const luckyColors = ['Purple', 'Gold', 'Blue', 'Green', 'Red', 'Yellow', 'Orange', 'Pink', 'Silver'];
  const luckyNumber = Math.floor(Math.random() * 9) + 1;

  const report = {
    _id: 'report-' + Date.now(),
    userId: mockUsers[email].id,
    type: type || 'numerology',
    inputData,
    result: {
      lifePathNumber,
      luckyColor: luckyColors[lifePathNumber - 1],
      luckyNumber,
      description: `Life Path Number ${lifePathNumber} represents unique qualities and potential.`,
      strengths: ['Intuitive', 'Analytical', 'Creative', 'Determined'],
      challenges: ['Overthinking', 'Social anxiety'],
      compatibleNumbers: [(lifePathNumber % 9) + 1, ((lifePathNumber + 1) % 9) + 1],
      personalYear: Math.floor(Math.random() * 9) + 1,
    },
    createdAt: new Date().toISOString(),
  };

  if (!mockReports[email]) mockReports[email] = [];
  mockReports[email].unshift(report);

  res.status(201).json({
    success: true,
    message: 'Report generated successfully',
    data: report,
  });
});

// Mock calculate endpoint (alternative)
app.post('/api/tool/calculate', (req, res) => {
  const { name, dob } = req.body;
  
  res.status(200).json({
    success: true,
    data: {
      name,
      dob,
      lifePathNumber: Math.floor(Math.random() * 9) + 1,
      luckyColor: 'Purple',
      strengths: ['Intuitive', 'Analytical', 'Creative']
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found: ' + req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log('✅ Connected routes:');
  console.log('   - POST /api/auth/signup');
  console.log('   - POST /api/auth/login');
  console.log('   - POST /api/auth/forgot-password');
  console.log('   - GET /api/dashboard/stats');
  console.log('   - GET /api/dashboard/history');
  console.log('   - DELETE /api/dashboard/history/:reportId');
  console.log('   - GET /api/dashboard/profile');
  console.log('   - PUT /api/dashboard/profile');
  console.log('   - POST /api/tool/generate');
  console.log('   - POST /api/tool/calculate');
});
