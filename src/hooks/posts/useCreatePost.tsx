import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostServices } from "@/services/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { CreateRoomDto, Post } from "@/stores/type";

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (payload: CreateRoomDto) => {
            const res = await PostServices.create(payload);
            return res.data.metadata as Post;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
            toast.success("Đã tạo phòng thành công !");
            navigate("/user/posts");
        },
        onError: () => {
            toast.error("Tạo phòng không thành công !");
        },
    });
};
