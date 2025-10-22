import api from "@/config/axios";

export type Filter =
    | {
          month?: number;
          year?: number;
      }
    | undefined;

export const AdminServices = {
    overviewCount: async () => {
        return await api.get(`/admin/overview/counts`);
    },

    overviewPostsAndAppointments: async (filter: Filter) => {
        return await api.get(`/admin/overview/posts-and-appointments`, {
            params: filter,
        });
    },
    overviewPostsByCategory: async () => {
        return await api.get(`/admin/overview/posts-by-category`);
    },
};
