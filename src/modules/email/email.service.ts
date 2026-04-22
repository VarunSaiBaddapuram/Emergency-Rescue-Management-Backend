import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { logger } from "../../common/logger/logger";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmailsService = async (data: any) => {
  const { emailData, latitude, longitude } = data;
  const emailPromises = emailData.map(async (email: any) => {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email.email,
      subject: "Alert",
      html: `Emergency at ${latitude} ${longitude}`,
    };
    return transporter.sendMail(mailOptions);
  });

  const emailResponses = await Promise.all(emailPromises);
  logger.info({ emailResponses }, "Emails sent successfully");
  return { success: true, message: "Emails sent successfully" };
};
