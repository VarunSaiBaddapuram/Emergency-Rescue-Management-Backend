import express from "express";
import reliefCenterController from "../controllers/reliefCenterController";
const { getReliefCenter,addReliefCenter,getReliefSupplyReqeuestAccepted, addadmission ,getAllReliefCenter, addReliefSupplyRequest, confirmDelivery, getAllReliefSupplyReqeuest, getReliefSupplyReqeuestbyCreator } = reliefCenterController;

const router = express.Router();

router.post("/addreliefcenter",addReliefCenter);
router.get("/getreliefcenterbyid/:id", getReliefCenter)
router.put("/addadmission/:id",addadmission)
router.get("/reliefcenters",getAllReliefCenter)
router.post("/addreliefsupplyrequest",addReliefSupplyRequest)
router.put("/confirmdelivery/:id",confirmDelivery)
router.get("/getreliefsupply",getAllReliefSupplyReqeuest)
router.get("/getSupplyReqbyCreator/:id",getReliefSupplyReqeuestbyCreator)
router.get("/getSupplyReqbyAccepted/:id",getReliefSupplyReqeuestAccepted)


export default router;


