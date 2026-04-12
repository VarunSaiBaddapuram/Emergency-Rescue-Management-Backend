import * as userRepository from './user.repository';

export const getUserDataService = async () => {
  const userData = await userRepository.findAllReliefCenters();
  return userData;
};
