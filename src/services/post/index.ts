import api from "@/config/axios";
import type { CreateRoomDto } from "@/stores/type";

export const PostServices = {
    create: async (input: CreateRoomDto) => {
        return await api.post(`/post`, input);
    },
    getAll: async () => {
        return await api.get(`/post`);
    },
    getAllByUserId: async () => {
        return await api.get(`/post/user`);
    },
    getById: async (id: string) => {
        return await api.get(`/post/${id}`);
    },
    update: async (id: string, payload: Partial<CreateRoomDto>) => {
        return await api.patch(`/post/${id}`, payload);
    },
};
