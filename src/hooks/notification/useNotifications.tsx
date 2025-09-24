import { socket } from "@/config/socket";
import { NotificationServices } from "@/services/notification";
import type {
    Notification,
    NotificationFilter,
    PaginationResponse,
} from "@/stores/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNotifications = (filter: NotificationFilter) => {
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
                        data: [payload, ...old.data],
                        totalAllItems: old.totalAllItems
                            ? old.totalAllItems + 1
                            : 1,
                        totalItems: old.totalItems ? old.totalItems + 1 : 1,
                    } as PaginationResponse<Notification[]>;
                }
            );

            if (filter && Object.keys(filter).length > 0) {
                queryClient.invalidateQueries({
                    queryKey: ["notifications", filter],
                });
            }
        };

        socket.on("joined", (payload) => {
            console.log("New joined:", payload);
        });

        socket.on("notification", handleNewNotification);

        return () => {
            socket.off("joined");
            socket.off("notification", handleNewNotification);
        };
    }, [filter, queryClient]);

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
