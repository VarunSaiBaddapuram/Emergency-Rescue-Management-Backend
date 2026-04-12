import express from "express";
import EmailController from "./email.controller";

const router = express.Router();
router.post("/send-emails", EmailController.sendEmails);

export default router;
