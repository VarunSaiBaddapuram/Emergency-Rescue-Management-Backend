import CollectionCenter from "./collection.model";
import ReliefSupply from "../relief/reliefSupply.model";

export const createCollectionCenter = async (data: any) => await CollectionCenter.create(data);
export const findCollectionCenters = async (filter: any = {}) => await CollectionCenter.find(filter);
export const updateReliefSupplyById = async (id: string, updateData: any) => await ReliefSupply.findByIdAndUpdate(id, updateData);
