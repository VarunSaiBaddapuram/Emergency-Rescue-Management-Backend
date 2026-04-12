import * as notificationRepository from "./notification.repository";

export const addNotificationService = async (text: string) => {
  const savedNotification = await notificationRepository.createNotification({ text });
  return savedNotification;
};

export const getNotificationService = async () => {
  const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 1000);
  const recentRecords = await notificationRepository.findNotifications({
    createdAt: { $gte: fiveMinutesAgo },
  });
  return recentRecords;
};
