import * as userService from './user.service';
import { asyncHandler } from '../../common/utils/asyncHandler';

export const getUserData = asyncHandler(async (req: any, res: any) => {
  const response = await userService.getUserDataService();
  res.status(200).json(response);
});
