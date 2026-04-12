import * as emailService from "./email.service";
import { asyncHandler } from "../../common/utils/asyncHandler";

export default {
  sendEmails: asyncHandler(async (req: any, res: any) => {
    const response = await emailService.sendEmailsService(req.body);
    res.status(200).json(response);
  }),
};
