import * as emailService from "./email.service";

export default {
  sendEmails: async (req: any, res: any) => {
    try {
      const response = await emailService.sendEmailsService(req.body);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ success: false, error: "Failed to send emails" });
    }
  },
};
