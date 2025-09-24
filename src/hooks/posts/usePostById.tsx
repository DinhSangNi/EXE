import { PostServices } from "@/services/post";
import type { Post } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

export const usePostById = (id: string) => {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const res = await PostServices.getById(id);
            return res.data.metadata as Post;
        },
        staleTime: 3 * 60 * 1000,
    });
};
