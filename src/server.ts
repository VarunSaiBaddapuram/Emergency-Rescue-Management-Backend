import notification1 from "../models/Notification";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import userRoute from "../routes/userRoute";
import db from "../config/db";
import dns from "node:dns";


dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// Require application Route modules
import userRoutes from "../routes/users";
import reliefRoutes from "../routes/reliefCenterRoute";
import collectionRoutes from "../routes/ColllectionCenetrRoute";
import notification from "../routes/NotificationRoute";

app.use("/api", userRoute);
app.use("/relief", reliefRoutes);
app.use("/collection", collectionRoutes);
app.use("/user", userRoutes);
app.use("/notification", notification);

import path from "path";
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../client/build");
app.use(express.static(buildpath));

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "corescue6@gmail.com",
    pass: "ubot woed gcrh oskm",
  },
});

app.post("/api/send-emails", async (req: any, res: any) => {
  try {
    const { emailData, latitude, longitude } = req.body;

    // Assuming emailData is an array of email objects
    const emailPromises = emailData.map(async (email: any) => {
      const mailOptions = {
        from: "corescue6@gmail.com",
        to: email.email, // Use the email field from your data
        subject: "Alert",
        html: `Emergency at ${latitude} ${longitude}`,
      };

      // Use nodemailer to send emails
      return transporter.sendMail(mailOptions);
    });

    const emailResponses = await Promise.all(emailPromises);
    console.log("Emails sent successfully:", emailResponses);

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ success: false, error: "Failed to send emails" });
  }
});

app.get("/notification/getnotification", async (req: any, res: any) => {
  try {
    const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 1000);
    const recentRecords = await notification1.find({
      createdAt: { $gte: fiveMinutesAgo },
    });

    res.status(200).json(recentRecords);
  } catch (error) {
    console.error("Error fetching recent records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
