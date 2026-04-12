import Notification from "./notification.model";

export const createNotification = async (data: any) => await new Notification(data).save();
export const findNotifications = async (filter: any = {}) => await Notification.find(filter);
