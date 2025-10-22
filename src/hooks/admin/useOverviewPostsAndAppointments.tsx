import { AdminServices, type Filter } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

const useOverviewPostsAndAppointments = (filter: Filter) => {
    return useQuery({
        queryKey: ["admin", "overview", filter],
        queryFn: async () => {
            const res =
                await AdminServices.overviewPostsAndAppointments(filter);
            return res.data as {
                data: {
                    period: string;
                    posts: number;
                    appointments: number;
                }[];
                granularity: "day" | "month";
            };
        },
        staleTime: 60 * 1000,
    });
};

export default useOverviewPostsAndAppointments;
