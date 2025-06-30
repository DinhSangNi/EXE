import api from "@/config/axios";

export const CategoryServices = {
    getAll: async () => {
        return await api.get(`/category`);
    },
};
