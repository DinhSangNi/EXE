import { NotificationServices } from "@/services/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMarkNotificationRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userNotificationId: string) => {
            const res = await NotificationServices.markRead(userNotificationId);
            return res.data.metadata;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            console.error("Mark notification read failed:", error);
        },
    });
};

export default useMarkNotificationRead;
