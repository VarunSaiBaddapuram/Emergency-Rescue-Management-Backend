// controllers/userController.js

import User from '../models/reliefCenter';

export const getUserData = async (req: any, res: any) => {
  try {
    const userData = await User.find();
    
    res.json(userData);
  } catch (error) {
    
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
