import * as reliefService from "./relief.service";

export default {
  addReliefCenter: async (req: any, res: any) => {
    try {
      const response = await reliefService.addReliefCenterService(req.body);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getReliefCenter: async (req: any, res: any) => {
    try {
      const response = await reliefService.getReliefCenterService(req.params.id);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  },

  addadmission: async (req: any, res: any) => {
    try {
      const response = await reliefService.addadmissionService(req.params.id, req.body.Admission);
      res.status(response.status).json(response.payload);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getAllReliefCenter: async (req: any, res: any) => {
    try {
      const response = await reliefService.getAllReliefCenterService();
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  addReliefSupplyRequest: async (req: any, res: any) => {
    try {
      const response = await reliefService.addReliefSupplyRequestService(req.body);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      console.log(error.message);
    }
  },

  confirmDelivery: async (req: any, res: any) => {
    try {
      const response = await reliefService.confirmDeliveryService(req.params.id);
      res.status(response.status).json(response.payload);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getAllReliefSupplyReqeuest: async (req: any, res: any) => {
    try {
      const response = await reliefService.getAllReliefSupplyReqeuestService();
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getReliefSupplyReqeuestbyCreator: async (req: any, res: any) => {
    try {
      const response = await reliefService.getReliefSupplyReqeuestbyCreatorService(req.params.id);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getReliefSupplyReqeuestAccepted: async (req: any, res: any) => {
    try {
      const response = await reliefService.getReliefSupplyReqeuestAcceptedService(req.params.id);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
