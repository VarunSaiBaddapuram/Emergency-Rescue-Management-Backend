import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../utils/asyncHandler";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const AGENCY_KEY = process.env.AGENCY_KEY || "india1";

interface DecodedToken {
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

// Extend Request type to include user
export interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

/**
 * verifyToken Middleware
 * Extracts Bearer token from Authorization header and verifies it.
 */
export const verifyToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError({
        message: "Authentication failed: No token provided",
        statusCode: 401,
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      req.user = {
        _id: decoded._id,
        role: decoded.role,
      };
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new AppError({
          message: "Authentication failed: Token expired",
          statusCode: 401,
        });
      }
      throw new AppError({
        message: "Authentication failed: Invalid token",
        statusCode: 401,
      });
    }
  }
);

/**
 * authorizeRoles Middleware
 * Restricts access to specific roles.
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError({
        message: "Forbidden: You do not have permission to perform this action",
        statusCode: 403,
      });
    }
    next();
  };
};

/**
 * validateAgencyKey Middleware
 * Validates the x-agency-key header for protected onboarding (signup).
 */
export const validateAgencyKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const agencyKey = req.headers["x-agency-key"];

    if (!agencyKey || agencyKey !== AGENCY_KEY) {
      throw new AppError({
        message: "Unauthorized: Invalid or missing Agency Key",
        statusCode: 401,
      });
    }

    next();
  }
);
