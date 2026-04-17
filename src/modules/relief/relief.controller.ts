import * as reliefService from "./relief.service";
import { asyncHandler } from "../../common/utils/asyncHandler";

export default {
  addReliefCenter: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.addReliefCenterService(req.body);
    req.app.get("io")?.emit("CENTER_DATA_UPDATED");
    res.status(201).json(response);
  }),

  getReliefCenter: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.getReliefCenterService(req.params.id);
    res.status(200).json(response);
  }),

  addadmission: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.addadmissionService(req.params.id, req.body.Admission);
    req.app.get("io")?.emit("CENTER_DATA_UPDATED");
    res.status(200).json(response);
  }),

  getAllReliefCenter: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.getAllReliefCenterService();
    res.status(200).json(response);
  }),

  addReliefSupplyRequest: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.addReliefSupplyRequestService(req.body);
    req.app.get("io")?.emit("CENTER_DATA_UPDATED");
    res.status(201).json(response);
  }),

  confirmDelivery: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.confirmDeliveryService(req.params.id);
    req.app.get("io")?.emit("CENTER_DATA_UPDATED");
    res.status(200).json(response);
  }),

  getAllReliefSupplyReqeuest: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.getAllReliefSupplyReqeuestService();
    res.status(200).json(response);
  }),

  getReliefSupplyReqeuestbyCreator: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.getReliefSupplyReqeuestbyCreatorService(req.params.id);
    res.status(200).json(response);
  }),

  getReliefSupplyReqeuestAccepted: asyncHandler(async (req: any, res: any) => {
    const response = await reliefService.getReliefSupplyReqeuestAcceptedService(req.params.id);
    res.status(200).json(response);
  }),
};
