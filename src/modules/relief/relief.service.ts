import * as reliefRepository from "./relief.repository";
import { AppError } from "../../common/errors/AppError";

export const addReliefCenterService = async (data: any) => {
  const { CenterName, Address, InCharge, email, Capacity, latitude, longitude, Phone, Admission } = data;
  const result = await reliefRepository.createReliefCenter({
    CenterName,
    InCharge,
    Phone,
    Capacity,
    Admission,
    email,
    latitude,
    longitude,
    Address
  });
  console.log(result);
  return { message: "Relief Center added with success" };
};

export const getReliefCenterService = async (id: string) => {
  console.log(id, "id vanno");
  const userdata = await reliefRepository.findReliefCenters({ InCharge: id });
  if (!userdata) {
    throw new AppError({ message: 'Get Req Failed', statusCode: 401 });
  }
  console.log(userdata);
  return userdata;
};

export const addadmissionService = async (id: string, Admission: any) => {
  console.log(Admission);
  const userdata = await reliefRepository.updateReliefCenterById(id, {
    $set: {
      Admission: Admission
    }
  });
  if (!userdata) {
    throw new AppError({ message: 'Relief Center not found', statusCode: 404 });
  }
  return userdata;
};

export const getAllReliefCenterService = async () => {
  const user = await reliefRepository.findReliefCenters();
  return user;
};

export const addReliefSupplyRequestService = async (data: any) => {
  const { CenterName, Phone, ItemName, Quantity, Status, AcceptedBy, Delivered, Requester } = data;
  const result = await reliefRepository.createReliefSupply({
    CenterName,
    Phone,
    ItemName,
    Quantity,
    Status,
    AcceptedBy,
    Delivered,
    Requester
  });
  return { message: "Relief Supply Request Sent" };
};

export const confirmDeliveryService = async (id: string) => {
  const userdata = await reliefRepository.updateReliefSupplyById(id, {
    $set: {
      Status: 'delivered'
    }
  });
  if (!userdata) {
    throw new AppError({ message: 'Relief Supply Request not found', statusCode: 404 });
  }
  return userdata;
};

export const getAllReliefSupplyReqeuestService = async () => {
  const user = await reliefRepository.findReliefSupplies({ Status: 'pending' });
  return user;
};

export const getReliefSupplyReqeuestbyCreatorService = async (id: string) => {
  const user = await reliefRepository.findReliefSupplies({ Requester: id });
  return user;
};

export const getReliefSupplyReqeuestAcceptedService = async (id: string) => {
  const user = await reliefRepository.findReliefSupplies({ Status: 'accepted', AcceptedBy: id });
  return user;
};
