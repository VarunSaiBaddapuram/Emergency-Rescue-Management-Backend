import express from "express";
const router = express.Router();
import UserController from "../controllers/users";

router.post("/signup", UserController.signup); // Update this route for signup

router.post("/signin", UserController.signin);
router.post('/auth', UserController.verifyToken);
router.get(`/getuser/:id`, UserController.getUser);

export default router;
