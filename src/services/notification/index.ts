import api from "@/config/axios";
import type { NotificationFilter } from "@/stores/type";

export const NotificationServices = {
    getAll: async (notificationFilter: NotificationFilter) => {
        return await api.get(`/notification`, { params: notificationFilter });
    },
};
