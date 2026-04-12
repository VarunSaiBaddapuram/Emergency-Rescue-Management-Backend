import * as notificationService from "./notification.service";

export default {
  addNotification: async (req: any, res: any) => {
    try {
      const response = await notificationService.addNotificationService(req.body.text);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getNotification: async (req: any, res: any) => {
    try {
      const response = await notificationService.getNotificationService();
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};