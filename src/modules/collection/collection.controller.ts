import * as collectionService from "./collection.service";
import { asyncHandler } from "../../common/utils/asyncHandler";

export default {
  addReliefCenter: asyncHandler(async (req: any, res: any) => {
    const response = await collectionService.addCollectionCenterService(req.body);
    res.status(201).json(response);
  }),

  getAllReliefCenter: asyncHandler(async (req: any, res: any) => {
    const response = await collectionService.getAllReliefCenterService();
    res.status(200).json(response);
  }),

  AcceptDelivery: asyncHandler(async (req: any, res: any) => {
    const response = await collectionService.AcceptDeliveryService(req.params.id, req.body);
    res.status(200).json(response);
  }),

  DispatchItem: asyncHandler(async (req: any, res: any) => {
    const response = await collectionService.DispatchItemService(req.params.id, req.body);
    res.status(200).json(response);
  }),

  getCollectionCenter: asyncHandler(async (req: any, res: any) => {
    const response = await collectionService.getCollectionCenterService(req.params.id);
    res.status(200).json(response);
  }),
};
