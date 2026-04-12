import * as authService from "./auth.service";
import { asyncHandler } from "../../common/utils/asyncHandler";

export default {
  signup: asyncHandler(async (req: any, res: any) => {
    const response = await authService.signupService(req.body);
    return res.status(201).json(response);
  }),

  signin: asyncHandler(async (req: any, res: any) => {
    const response = await authService.signinService(req.body);
    return res.status(201).json(response);
  }),

  verifyToken: asyncHandler(async (req: any, res: any) => {
    const response = await authService.verifyTokenService(req.body.token);
    return res.status(200).json(response);
  }),

  getUser: asyncHandler(async (req: any, res: any) => {
    const response = await authService.getUserService(req.params.id);
    return res.status(200).json(response);
  }),
};
