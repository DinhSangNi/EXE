import api from "@/config/axios";
import type { CreateRoomDto, PostFilter, UpdatePostDto } from "@/stores/type";

export const PostServices = {
    create: async (input: CreateRoomDto) => {
        return await api.post(`/post`, input);
    },
    getAll: async (filter: PostFilter) => {
        return await api.get(`/post`, {
            params: filter,
        });
    },
    getAllByUserId: async (filter?: PostFilter) => {
        return await api.get(`/post/user`, {
            params: filter,
        });
    },
    getById: async (id: string) => {
        return await api.get(`/post/${id}`);
    },
    update: async (id: string, payload: Partial<UpdatePostDto>) => {
        return await api.patch(`/post/${id}`, payload);
    },
    delete: async (id: string) => {
        return await api.delete(`/post/${id}`);
    },
};
