import express from "express";
import CollectionCenterController from "./collection.controller";
import { verifyToken, authorizeRoles } from "../../common/middleware/auth.middleware";
const router = express.Router();

router.post("/addCollectioncenter", verifyToken, authorizeRoles('collectionCenter', 'admin'), CollectionCenterController.addReliefCenter);
router.get("/getCollectionCenter", CollectionCenterController.getAllReliefCenter);
router.put("/acceptDelivery/:id", verifyToken, authorizeRoles('collectionCenter', 'admin'), CollectionCenterController.AcceptDelivery);
router.put("/dispatch/:id", verifyToken, authorizeRoles('collectionCenter', 'admin'), CollectionCenterController.DispatchItem);
router.get("/getCollectionCenterById/:id", CollectionCenterController.getCollectionCenter);


export default router;
