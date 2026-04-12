import express from "express";
import CollectionCenterController from "./collection.controller";
const router = express.Router();



router.post("/addCollectioncenter", CollectionCenterController.addReliefCenter);
router.get("/getCollectionCenter", CollectionCenterController.getAllReliefCenter);
router.put("/acceptDelivery/:id", CollectionCenterController.AcceptDelivery);
router.put("/dispatch/:id", CollectionCenterController.DispatchItem);
router.get("/getCollectionCenterById/:id", CollectionCenterController.getCollectionCenter);


export default router;
