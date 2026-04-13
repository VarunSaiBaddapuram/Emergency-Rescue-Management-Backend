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
  latitude: number;
  longitude: number;
  weather: string;
  sos_message: string;
  timestamp: string;
}

export const sendSOSEmail = async (data: SOSMailData) => {
  const { latitude, longitude, weather, sos_message, timestamp } = data;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "🚨 EMERGENCY SOS ALERT 🚨",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #ff0000; border-radius: 10px;">
        <h2 style="color: #ff0000; text-align: center;">SOS Emergency Alert Received</h2>
        <p><strong>Time:</strong> ${timestamp}</p>
        <p><strong>Message:</strong> ${sos_message}</p>
        <hr />
        <h3>Location Details:</h3>
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
        <p><strong>Google Maps Link:</strong> <a href="${googleMapsLink}">${googleMapsLink}</a></p>
        <hr />
        <h3>Weather Context:</h3>
        <p>${weather}</p>
        <br />
        <p style="color: #555;">Sent from Alert-Emergency-Response-System</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("SOS Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending SOS email:", error);
    throw error;
  }
};
