import * as notificationService from "./notification.service";
import { asyncHandler } from "../../common/utils/asyncHandler";

export default {
  addNotification: asyncHandler(async (req: any, res: any) => {
    const response = await notificationService.addNotificationService(req.body.text);
    res.status(201).json(response);
  }),

  getNotification: asyncHandler(async (req: any, res: any) => {
    const response = await notificationService.getNotificationService();
    res.status(200).json(response);
  }),
};