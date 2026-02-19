import { Express, Response, NextFunction } from 'express';
import { verifyToken, getTokenFromHeader, DecodedToken } from '../config/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export function authMiddleware(req: Express.Request, res: Response, next: NextFunction): void {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'No authentication token provided',
      });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }
}

export function optionalAuthMiddleware(req: Express.Request, res: Response, next: NextFunction): void {
  try {
    const token = getTokenFromHeader(req.headers.authorization);

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
  } catch (error) {
    // Silently fail for optional auth
  }

  next();
}
