import * as collectionRepository from "./collection.repository";
import { AppError } from "../../common/errors/AppError";

export const addReliefCenterService = async (data: any) => {
  const { CenterName, InCharge, Phone, Address } = data;
  const result = await collectionRepository.createCollectionCenter({
    CenterName,
    InCharge,
    Phone,
    Address
  });
  return { message: "Collection added with success" };
};

export const getAllReliefCenterService = async () => {
  const user = await collectionRepository.findCollectionCenters();
  return user;
};

export const AcceptDeliveryService = async (id: string, data: any) => {
  const { AcceptedBy } = data;
  console.log('accept' + AcceptedBy);
  const result = await collectionRepository.updateReliefSupplyById(id, {
    $set: {
      Status: 'accepted',
      AcceptedBy
    }
  });
  if (!result) {
    throw new AppError({ message: 'Relief Supply Request not found', statusCode: 404 });
  }
  return result;
};

export const DispatchItemService = async (id: string, data: any) => {
  const { DeliveryContact } = data;
  const result = await collectionRepository.updateReliefSupplyById(id, {
    $set: {
      Status: 'dispatched',
      DeliveryContact
    }
  });
  if (!result) {
    throw new AppError({ message: 'Relief Supply Request not found', statusCode: 404 });
  }
  return result;
};

export const getCollectionCenterService = async (id: string) => {
  console.log(id, "id vanno");
  const userdata = await collectionRepository.findCollectionCenters({ InCharge: id });
  if (!userdata) {
    throw new AppError({ message: 'Get Req Failed', statusCode: 401 });
  }
  console.log(userdata);
  return userdata;
};
