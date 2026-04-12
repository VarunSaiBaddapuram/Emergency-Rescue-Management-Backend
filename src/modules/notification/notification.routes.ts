// relif center route add notification router
import express from "express";
import NotificationController from "./notification.controller";

const router = express.Router();
router.post("/addnotification", NotificationController.addNotification);
router.get("/getnotification", NotificationController.getNotification);

export default router;