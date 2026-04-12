import User from '../relief/reliefCenter.model';

export const getUserDataService = async () => {
  const userData = await User.find();
  return { status: 200, payload: userData };
};
