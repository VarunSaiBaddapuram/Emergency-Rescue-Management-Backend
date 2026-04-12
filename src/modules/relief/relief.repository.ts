import ReliefCenter from "./reliefCenter.model";
import ReliefSupply from "./reliefSupply.model";

export const createReliefCenter = async (data: any) => await ReliefCenter.create(data);
export const findReliefCenters = async (filter: any = {}) => await ReliefCenter.find(filter);
export const updateReliefCenterById = async (id: string, updateData: any) => await ReliefCenter.findByIdAndUpdate(id, updateData);

export const createReliefSupply = async (data: any) => await ReliefSupply.create(data);
export const findReliefSupplies = async (filter: any = {}) => await ReliefSupply.find(filter);
export const updateReliefSupplyById = async (id: string, updateData: any) => await ReliefSupply.findByIdAndUpdate(id, updateData);
