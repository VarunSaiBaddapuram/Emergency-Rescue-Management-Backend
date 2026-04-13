import { Request, Response } from "express";
import { sendSOSEmail } from "../../utils/email.service";

export const sendSOS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, weather, sos_message, timestamp } = req.body;

    if (!latitude || !longitude || !sos_message) {
      res.status(400).json({ 
        success: false, 
        message: "Missing required fields: latitude, longitude, and sos_message are required." 
      });
      return;
    }

    await sendSOSEmail({
      latitude,
      longitude,
      weather,
      sos_message,
      timestamp
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("SOS Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send SOS alert via backend.", 
      error: error.message 
    });
  }
};
