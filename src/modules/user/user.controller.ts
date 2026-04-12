import * as userService from './user.service';

export const getUserData = async (req: any, res: any) => {
  try {
    const response = await userService.getUserDataService();
    res.status(response.status).json(response.payload);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
