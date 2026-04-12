import CollectionCenter from "./collection.model";
import ReliefSupply from "../relief/reliefSupply.model";

export const addReliefCenterService = async (data: any) => {
  const { CenterName, InCharge, Phone, Address } = data;
  try {
    const result = await CollectionCenter.create({
      CenterName,
      InCharge,
      Phone,
      Address
    });
    return { status: 201, payload: { message: "Collection added with success" } };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllReliefCenterService = async () => {
  try {
    const user = await CollectionCenter.find();
    return { status: 200, payload: user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const AcceptDeliveryService = async (id: string, data: any) => {
  const { AcceptedBy } = data;
  console.log('accept' + AcceptedBy);
  try {
    const result = await ReliefSupply.findByIdAndUpdate(id, {
      $set: {
        Status: 'accepted',
        AcceptedBy
      }
    });
    return { status: 200, payload: result };
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

export const DispatchItemService = async (id: string, data: any) => {
  const { DeliveryContact } = data;
  try {
    const result = await ReliefSupply.findByIdAndUpdate(id, {
      $set: {
        Status: 'dispatched',
        DeliveryContact
      }
    });
    return { status: 200, payload: result };
  } catch (err: any) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

export const getCollectionCenterService = async (id: string) => {
  console.log(id, "id vanno");
  try {
    const userdata = await CollectionCenter.find({ InCharge: id });
    console.log(userdata);
    return { status: 200, payload: userdata };
  } catch (error: any) {
    return { status: 401, payload: { message: 'Get Req Failed' } };
  }
};
