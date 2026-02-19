import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db';
import dashboardRoutes from './routes/dashboard';
import toolRoutes from './routes/tool';
import authRoutes from './routes/auth';

dotenv.config({ path: '.env.local' });

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Allow multiple frontend origins (comma-separated in .env.local) and allow no-origin requests (curl, server-to-server)
const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontend.split(',').map((s) => s.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests (method, url, origin, body)
app.use((req: Request, res: Response, next) => {
  try {
    const origin = req.headers.origin || 'unknown';
    console.log(`[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl} origin=${origin} body=${JSON.stringify(req.body)}`);
  } catch (e) {
    console.log('[REQ] failed to log request', e);
  }
  next();
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Setup routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tool', toolRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
const startServer = async () => {
  try {
    await dbConnect();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
