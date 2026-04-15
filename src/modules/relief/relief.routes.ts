import express from "express";
import reliefCenterController from "./relief.controller";
import { verifyToken, authorizeRoles } from "../../common/middleware/auth.middleware";
const { getReliefCenter,addReliefCenter,getReliefSupplyReqeuestAccepted, addadmission ,getAllReliefCenter, addReliefSupplyRequest, confirmDelivery, getAllReliefSupplyReqeuest, getReliefSupplyReqeuestbyCreator } = reliefCenterController;

const router = express.Router();

router.post("/addreliefcenter", verifyToken, authorizeRoles('reliefCenter', 'admin'), addReliefCenter);
router.get("/getreliefcenterbyid/:id", getReliefCenter)
router.put("/addadmission/:id", verifyToken, authorizeRoles('reliefCenter', 'admin'), addadmission)
router.get("/reliefcenters",getAllReliefCenter)
router.post("/addreliefsupplyrequest", verifyToken, authorizeRoles('reliefCenter', 'admin'), addReliefSupplyRequest)
router.put("/confirmdelivery/:id", verifyToken, authorizeRoles('reliefCenter', 'admin'), confirmDelivery)
router.get("/getreliefsupply",getAllReliefSupplyReqeuest)
router.get("/getSupplyReqbyCreator/:id", verifyToken, authorizeRoles('reliefCenter', 'admin'), getReliefSupplyReqeuestbyCreator)
router.get("/getSupplyReqbyAccepted/:id", verifyToken, authorizeRoles('reliefCenter', 'collectionCenter', 'admin'), getReliefSupplyReqeuestAccepted)


export default router;


