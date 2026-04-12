import ReliefCenter from "../relief/reliefCenter.model";

export const findAllReliefCenters = async () => {
  return await ReliefCenter.find();
};
