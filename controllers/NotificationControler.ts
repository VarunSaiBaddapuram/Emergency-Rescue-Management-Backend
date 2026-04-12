// add relif center 
import Notification from "../models/Notification";
export default {

addNotification: async (req, res) => {
    const { latitude, longitude} = req.body;
    try {
      const result = await Notification.create({ 
        latitude,
        longitude,
      });
      console.log(result);
      res.status(201).json({});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
}