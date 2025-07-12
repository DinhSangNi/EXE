import { PostServices } from "@/services/post";
import type { PaginationResponse, Post, PostFilter } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const usePosts = (filters: PostFilter) => {
    return useQuery({
        queryKey: ["posts", filters],
        queryFn: async () => {
            const res = await PostServices.getAll(filters);
            return res.data.metadata as PaginationResponse<Post[]>;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default usePosts;
