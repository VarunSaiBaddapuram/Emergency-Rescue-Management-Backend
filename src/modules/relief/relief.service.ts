import ReliefCenter from "./reliefCenter.model";
import ReliefSupply from "./reliefSupply.model";

export const addReliefCenterService = async (data: any) => {
  const { CenterName, Address, InCharge, email, Capacity, latitude, longitude, Phone, Admission } = data;
  try {
    const result = await ReliefCenter.create({
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
    return { status: 201, payload: { message: "Relief Center added with success" } };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReliefCenterService = async (id: string) => {
  console.log(id, "id vanno");
  try {
    const userdata = await ReliefCenter.find({ InCharge: id });
    console.log(userdata);
    return { status: 200, payload: userdata };
  } catch (error) {
    throw new Error('Get Req Failed');
  }
};

export const addadmissionService = async (id: string, Admission: any) => {
  console.log(Admission);
  try {
    const userdata = await ReliefCenter.findByIdAndUpdate(id, {
      $set: {
        Admission: Admission
      }
    });
    return { status: 200, payload: userdata };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getAllReliefCenterService = async () => {
  try {
    const user = await ReliefCenter.find();
    return { status: 200, payload: user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addReliefSupplyRequestService = async (data: any) => {
  const { CenterName, Phone, ItemName, Quantity, Status, AcceptedBy, Delivered, Requester } = data;
  try {
    const result = await ReliefSupply.create({
      CenterName,
      Phone,
      ItemName,
      Quantity,
      Status,
      AcceptedBy,
      Delivered,
      Requester
    });
    return { status: 201, payload: { message: "Relief Supply Request Sent" } };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmDeliveryService = async (id: string) => {
  try {
    const userdata = await ReliefSupply.findByIdAndUpdate(id, {
      $set: {
        Status: 'delivered'
      }
    });
    return { status: 200, payload: userdata };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getAllReliefSupplyReqeuestService = async () => {
  try {
    const user = await ReliefSupply.find({ Status: 'pending' });
    return { status: 200, payload: user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReliefSupplyReqeuestbyCreatorService = async (id: string) => {
  try {
    const user = await ReliefSupply.find({ Requester: id });
    return { status: 200, payload: user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getReliefSupplyReqeuestAcceptedService = async (id: string) => {
  try {
    const user = await ReliefSupply.find({ Status: 'accepted', AcceptedBy: id });
    return { status: 200, payload: user };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
