import api from "@/config/axios";

export const MediaServices = {
    uploadImages: async (formData: FormData) => {
        return await api.post(`/media/images/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    uploadMediaFromFile: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        return await api.post("/media/upload/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    uploadMediaFromUrl: async (url: string) => {
        return await api.post("/media/upload/url", {
            url,
        });
    },
    deleteFile: async (id: string) => {
        return api.delete(`/media/${id}`);
    },
};
