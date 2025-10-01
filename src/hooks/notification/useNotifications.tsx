import { socket } from "@/config/socket";
import { NotificationServices } from "@/services/notification";
import type {
    Notification,
    NotificationFilter,
    PaginationResponse,
} from "@/stores/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface NotificationListResponse extends PaginationResponse<Notification[]> {
    totalUnreadItems: number;
    totalReadItems: number;
}

const useNotifications = (
    filter: NotificationFilter,
    onNewNotification?: (notification: Notification) => void
) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const handleNewNotification = (payload: Notification) => {
            queryClient.setQueryData<NotificationListResponse>(
                ["notifications", filter],
                (old) => {
                    if (!old) {
                        return {
                            data: [payload],
                            totalUnreadItems: 1,
                            totalReadItems: 0,
                            totalItems: 1,
                            page: 1,
                            limit: 5,
                            totalPages: 1,
                        };
                    }

                    return {
                        ...old,
                        data: [payload, ...old.data],
                        totalItems: (old.totalItems ?? 0) + 1,
                        totalUnreadItems: (old.totalUnreadItems ?? 0) + 1,

                        // có thể tính lại totalReadItems tương tự
                    };
                }
            );

            // Nếu filter đang có sẵn, invalid lại query để lấy dữ liệu chuẩn từ server
            if (filter && Object.keys(filter).length > 0) {
                queryClient.invalidateQueries({
                    queryKey: ["notifications", filter],
                });
            }

            if (onNewNotification) {
                onNewNotification(payload);
            }
        };

        socket.on("notification", handleNewNotification);

        return () => {
            socket.off("notification", handleNewNotification);
        };
    }, [filter, queryClient, onNewNotification]);

    return useQuery({
        queryKey: ["notifications", filter],
        queryFn: async () => {
            const res = await NotificationServices.getAll(filter);
            // Giả sử API của bạn trả về:
            // { data: Notification[], totalUnreadItems: number, totalReadItems: number, ... }
            return res.data.metadata as NotificationListResponse;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default useNotifications;
