import { AdminServices, type Filter } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

const useOverviewPostsAndAppointments = (filter: Filter) => {
    return useQuery({
        queryKey: ["admin", "overview", filter],
        queryFn: async () => {
            const res =
                await AdminServices.overviewPostsAndAppointments(filter);
            return res.data as {
                period: string;
                posts: number;
                appointments: number;
            }[];
        },
        staleTime: 60 * 1000,
    });
};

export default useOverviewPostsAndAppointments;
