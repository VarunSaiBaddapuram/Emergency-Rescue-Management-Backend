import * as reliefRepository from "./relief.repository";
import { AppError } from "../../common/errors/AppError";
import { logger } from "../../common/logger/logger";

export const addReliefCenterService = async (data: any) => {
  const { CenterName, Address, InCharge, email, Capacity, latitude, longitude, Phone, Admission } = data;
  
  // Mandatory Data Dependency Check
  if (!email || !latitude || !longitude || !CenterName) {
    throw new AppError({ 
      message: "Missing mandatory center data: email, latitude, longitude, and CenterName are required.", 
      statusCode: 400 
    });
  }

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
  logger.info({ result }, "Relief Center added");
  return { message: "Relief Center added with success" };
};

export const getReliefCenterService = async (id: string) => {
  logger.info({ id }, "Getting relief center by InCharge ID");
  const userdata = await reliefRepository.findReliefCenters({ InCharge: id });
  if (!userdata) {
    throw new AppError({ message: 'Get Req Failed', statusCode: 401 });
  }
  logger.info({ userdata }, "Found relief center data");
  return userdata;
};

export const addadmissionService = async (id: string, Admission: any) => {
  logger.info({ id, Admission }, "Updating admission for relief center");
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
  const { CenterName, Phone, ItemName, Quantity, Requester } = data;
  const result = await reliefRepository.createReliefSupply({
    CenterName,
    Phone,
    ItemName,
    Quantity,
    Status: "pending",
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
  const user = await reliefRepository.findReliefSupplies({ 
    Status: { $in: ['accepted', 'dispatched', 'delivered'] }, 
    AcceptedBy: id 
  });
  return user;
};
