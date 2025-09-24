import { PostServices } from "@/services/post";
import type { Post } from "@/stores/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await PostServices.delete(id);
            return res.data.metadata as Post;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Create post failed:", error);
        },
    });
};

export default useDeletePost;
