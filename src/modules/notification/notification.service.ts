import Notification from "./notification.model";

export const addNotificationService = async (text: string) => {
  try {
    const newNotification = new Notification({ text });
    const savedNotification = await newNotification.save();
    return { status: 201, payload: savedNotification };
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getNotificationService = async () => {
  try {
    const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 1000);
    const recentRecords = await Notification.find({
      createdAt: { $gte: fiveMinutesAgo },
    });
    return { status: 200, payload: recentRecords };
  } catch (error: any) {
    console.error("Error fetching recent records:", error);
    throw new Error(error.message);
  }
};
