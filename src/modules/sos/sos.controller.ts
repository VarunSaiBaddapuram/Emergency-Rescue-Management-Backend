import { Request, Response } from "express";
import { processSOSAlert } from "./sos.service";
import jwt from "jsonwebtoken";
import { logger } from "../../common/logger/logger";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

/**
 * Handles SOS alert requests.
 * Implements rate limiting based on User ID or IP address.
 */
export const sendSOS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, weather, sos_message, timestamp } = req.body;

    if (latitude === undefined || longitude === undefined || !sos_message) {
      res.status(400).json({ 
        success: false, 
        message: "Missing required fields: latitude, longitude, and sos_message are required." 
      });
      return;
    }

    // Identify the requester for rate limiting
    let requesterKey = req.ip; // Fallback to IP
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded && decoded._id) {
          requesterKey = decoded._id; // Use userId if authenticated
        }
      } catch (err) {
        // Token invalid or expired, proceed with IP-based rate limiting
        logger.warn("Invalid token provided for SOS, falling back to IP-based rate limiting");
      }
    }

    // Delegate to service
    const result = await processSOSAlert({
      latitude,
      longitude,
      weather,
      sos_message,
      timestamp,
      requesterKey
    });

    // Return detailed delivery summary
    res.status(200).json({ 
      success: result.success, 
      sent: result.sent,
      failed: result.failed,
      fallbackUsed: result.fallbackUsed
    });
  } catch (error: any) {
    logger.error({ err: error }, "SOS Controller Error");
    
    const statusCode = error.message.includes("Rate limit exceeded") ? 429 : 500;
    
    res.status(statusCode).json({ 
      success: false, 
      message: error.message || "Failed to process SOS alert."
    });
  }
};
