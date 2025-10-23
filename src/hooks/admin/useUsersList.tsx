import { AdminServices, type UserQuery } from "@/services/admin";
import type { User } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const useUsersList = (query: UserQuery) => {
    return useQuery({
        queryKey: ["admin", "users-list", query],
        queryFn: async () => {
            const res = await AdminServices.getUsersList(query);
            return res.data as {
                data: User[];
                totalItems: number;
            };
        },
        staleTime: 60 * 1000,
    });
};

export default useUsersList;
