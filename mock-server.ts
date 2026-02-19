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

  mockUsers[email] = { email, password, name: name || 'User' };
  mockReports[email] = [];
  
  res.status(201).json({ 
    success: true, 
    message: 'Signup successful',
    data: {
      user: { email, name: name || 'User' },
      token: 'mock-token-' + Date.now()
    }
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

  res.status(200).json({ 
    success: true, 
    message: 'Login successful',
    data: {
      user: { email, name: user.name },
      token: 'mock-token-' + Date.now()
    }
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

// Mock dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalReports: 5,
      planType: 'free',
      usedQueries: 3,
      queryLimit: 10,
      remainingUsage: 7,
      userName: 'John Doe'
    }
  });
});

// Mock get history
app.get('/api/dashboard/history', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const mockHistoryData = [
    {
      _id: '1',
      userId: 'user1',
      type: 'numerology',
      inputData: { fullName: 'John Doe', dateOfBirth: '1990-01-15' },
      result: { 
        lifePathNumber: 7, 
        description: 'Life Path Number 7 represents seekers of knowledge' 
      },
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      _id: '2',
      userId: 'user1',
      type: 'numerology',
      inputData: { fullName: 'Jane Doe', dateOfBirth: '1995-05-20' },
      result: { 
        lifePathNumber: 5, 
        description: 'Life Path Number 5 represents freedom and adventure' 
      },
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  res.status(200).json({
    success: true,
    data: mockHistoryData,
    pagination: {
      total: 2,
      pages: 1,
      current: page
    }
  });
});

// Mock delete report
app.delete('/api/dashboard/history/:reportId', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Report deleted successfully'
  });
});

// Mock get profile
app.get('/api/dashboard/profile', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id: 'user1',
      email: 'user@example.com',
      name: 'John Doe',
      plan: 'free',
      used_queries: 3,
      query_limit: 10
    }
  });
});

// Mock update profile
app.put('/api/dashboard/profile', (req, res) => {
  const { name } = req.body;
  
  res.status(200).json({
    success: true,
    data: {
      _id: 'user1',
      email: 'user@example.com',
      name: name || 'John Doe',
      plan: 'free',
      used_queries: 3,
      query_limit: 10
    }
  });
});

// Mock tool calculation / generate report
app.post('/api/tool/generate', (req, res) => {
  const { inputData, type } = req.body;
  
  if (!inputData || !inputData.fullName || !inputData.dateOfBirth) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Generate random life path number (1-9)
  const lifePathNumber = Math.floor(Math.random() * 9) + 1;
  const luckyColors = ['Purple', 'Gold', 'Blue', 'Green', 'Red', 'Yellow', 'Orange', 'Pink', 'Silver'];
  const luckyNumber = Math.floor(Math.random() * 9) + 1;
  
  const report = {
    _id: 'report-' + Date.now(),
    userId: 'user1',
    type: type || 'numerology',
    inputData: inputData,
    result: {
      lifePathNumber: lifePathNumber,
      luckyColor: luckyColors[lifePathNumber - 1],
      luckyNumber: luckyNumber,
      description: `Life Path Number ${lifePathNumber} represents unique qualities and potential.`,
      strengths: ['Intuitive', 'Analytical', 'Creative', 'Determined'],
      challenges: ['Overthinking', 'Social anxiety'],
      compatibleNumbers: [(lifePathNumber % 9) + 1, ((lifePathNumber + 1) % 9) + 1],
      personalYear: Math.floor(Math.random() * 9) + 1
    },
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Report generated successfully',
    data: report
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
