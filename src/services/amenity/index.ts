import api from "@/config/axios";

export const AmenityServices = {
    getAll: async () => {
        return await api.get(`/amenity`);
    },
};
