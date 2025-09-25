import { PostServices } from "@/services/post";
import type { PaginationResponse, Post, PostFilter } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const usePosts = (filters: PostFilter, role: "user" | "admin") => {
    console.log("role:", role);
    return useQuery({
        queryKey: ["posts", filters],
        queryFn: async () => {
            const res =
                role === "admin"
                    ? await PostServices.getAll(filters)
                    : await PostServices.getAllByUserId(filters);
            return res.data.metadata as PaginationResponse<Post[]> & {
                totalExpiredItems: number;
                totalApprovedItems: number;
                totalPendingItems: number;
                totalRejectedItems: number;
            };
        },
        staleTime: 60 * 1000,
    });
};

export default usePosts;
