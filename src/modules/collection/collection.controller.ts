import * as collectionService from "./collection.service";

export default {
  addReliefCenter: async (req: any, res: any) => {
    try {
      const response = await collectionService.addReliefCenterService(req.body);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllReliefCenter: async (req: any, res: any) => {
    try {
      const response = await collectionService.getAllReliefCenterService();
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  AcceptDelivery: async (req: any, res: any) => {
    try {
      const response = await collectionService.AcceptDeliveryService(req.params.id, req.body);
      res.status(response.status).json(response.payload);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  DispatchItem: async (req: any, res: any) => {
    try {
      const response = await collectionService.DispatchItemService(req.params.id, req.body);
      res.status(response.status).json(response.payload);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getCollectionCenter: async (req: any, res: any) => {
    try {
      const response = await collectionService.getCollectionCenterService(req.params.id);
      res.status(response.status).json(response.payload);
    } catch (error: any) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  },
};
