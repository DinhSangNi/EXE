import { AdminServices } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

const useOverviewCount = () => {
    return useQuery({
        queryKey: ["admin", "overview"],
        queryFn: async () => {
            const res = await AdminServices.overviewCount();
            return res.data as {
                totalPosts: number;
                totalAppointments: number;
                totalUsers: number;
            };
        },
        staleTime: 60 * 1000,
    });
};

export default useOverviewCount;
