import { Router } from "express";
import * as sosController from "./sos.controller";

const router = Router();

router.post("/send", sosController.sendSOS);

export default router;
