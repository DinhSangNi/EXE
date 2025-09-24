import { PostServices } from "@/services/post";
import type { Post, UpdatePostDto } from "@/stores/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            updatePostDto,
        }: {
            id: string;
            updatePostDto: UpdatePostDto;
        }) => {
            const res = await PostServices.update(id, updatePostDto);
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

export default useUpdatePost;
