// relif center route add notification router
import express from "express";
import NotificationController from "../controllers/NotificationControler";
const { addNotification } = NotificationController;

const router = express.Router();

router.post("/addNotification",addNotification);
export default router;