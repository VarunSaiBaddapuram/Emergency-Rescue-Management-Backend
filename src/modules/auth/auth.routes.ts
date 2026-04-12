import express from "express";
const router = express.Router();
import UserController from "./auth.controller";
import { validateAgencyKey } from "../../common/middleware/auth.middleware";

router.post("/signup", validateAgencyKey, UserController.signup); // Update this route for signup

router.post("/signin", UserController.signin);
router.post('/auth', UserController.verifyToken);
router.get(`/getuser/:id`, UserController.getUser);

export default router;
