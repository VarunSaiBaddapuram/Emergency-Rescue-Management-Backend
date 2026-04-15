import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface SOSMailData {
  to: string;
  latitude: number;
  longitude: number;
  weather: string;
  sos_message: string;
  timestamp: string;
}

/**
 * Sends a detailed SOS email to a specific recipient.
 * Includes visual alerts, location data, weather, and a sound alert link.
 */
export const sendSOSEmail = async (data: SOSMailData) => {
  const { to, latitude, longitude, weather, sos_message, timestamp } = data;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  const mailOptions = {
    from: `"Alert System" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "EMERGENCY SOS ALERT - ACTION REQUIRED",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 4px solid #ff0000; border-radius: 15px; background-color: #fffafa;">
        <div style="background-color: #ff0000; color: white; padding: 10px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;"> IMMEDIATE EMERGENCY ALERT </h1>
        </div>

        <div style="padding: 15px; background-color: #ffe6e6; border-left: 5px solid #ff0000; margin-bottom: 20px;">
            <h3 style="color: #ff0000; margin-top: 0;">SOS Message:</h3>
            <p style="font-size: 18px; font-weight: bold;">"${sos_message}"</p>
        </div>

        <p><strong>Time of Incident:</strong> ${timestamp}</p>
        
        <hr style="border: 1px solid #ddd;" />
        
        <h3>Location Information:</h3>
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
        <p style="margin-top: 15px;">
            <a href="${googleMapsLink}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                OPEN IN GOOGLE MAPS
            </a>
        </p>

        <hr style="border: 1px solid #ddd;" />

        <h3>Weather Context:</h3>
        <div style="padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
            <p>${weather}</p>
        </div>

        <hr style="border: 1px solid #ddd;" />

        <div style="text-align: center; margin-top: 20px; padding: 15px; border: 2px dashed #ff0000; border-radius: 10px;">
            <h3 style="color: #ff0000;">🔊 Alert Notification</h3>
            <p>Click below to play the emergency alert sound:</p>
            <a href="https://www.soundjay.com/buttons/beep-01a.mp3" style="color: #007bff; text-decoration: underline; font-weight: bold;">
                Listen to Alert Sound
            </a>
            <!-- Fallback audio tag (no autoplay) -->
            <div style="margin-top: 10px;">
                <audio controls>
                    <source src="https://www.soundjay.com/buttons/beep-01a.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>

        <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This is an automated emergency notification from the Alert-Emergency-Response-System.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId, recipient: to };
  } catch (error: any) {
    console.error(`Failed to send SOS email to ${to}:`, error.message);
    throw error;
  }
};
