import { socket } from "@/config/socket";
import { NotificationServices } from "@/services/notification";
import type {
    Notification,
    NotificationFilter,
    PaginationResponse,
} from "@/stores/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNotifications = (
    filter: NotificationFilter,
    onNewNotification?: (notification: Notification) => void
) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const handleNewNotification = (payload: Notification) => {
            queryClient.setQueryData<PaginationResponse<Notification[]>>(
                ["notifications", filter],
                (old) => {
                    if (!old) {
                        return {
                            data: [payload],
                            totalAllItems: 1,
                            totalItems: 1,
                            totalPages: 1,
                            page: 1,
                            limit: 5,
                        } as PaginationResponse<Notification[]>;
                    }
                    return {
                        ...old,
                        data: [payload, ...old.data],
                        totalAllItems: (old.totalAllItems ?? 0) + 1,
                        totalItems: (old.totalItems ?? 0) + 1,
                    };
                }
            );

            if (filter && Object.keys(filter).length > 0) {
                queryClient.invalidateQueries({
                    queryKey: ["notifications", filter],
                });
            }

            // Gọi callback để báo cho component bên ngoài
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
            return res.data.metadata as PaginationResponse<Notification[]>;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default useNotifications;
