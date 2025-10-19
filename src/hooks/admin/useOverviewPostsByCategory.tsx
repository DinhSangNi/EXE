import { AdminServices } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

const useOverviewPostsByCategory = () => {
    return useQuery({
        queryKey: ["admin", "overview", "posts-by-category"],
        queryFn: async () => {
            const res = await AdminServices.overviewPostsByCategory();
            return res.data as {
                parentCategory: string;
                category: string;
                posts: number;
            }[];
        },
        staleTime: 60 * 1000,
    });
};

export default useOverviewPostsByCategory;
