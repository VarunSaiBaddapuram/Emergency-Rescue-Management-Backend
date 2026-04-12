import User from "../user/user.model";

export const findOneUser = async (filter: any) => {
  return await User.findOne(filter);
};

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};
