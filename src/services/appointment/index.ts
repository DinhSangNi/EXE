import api from "@/config/axios";
import type {
    AppointmentFilter,
    CreateAppointmentDto,
    updateAppointmentDto,
} from "@/stores/type";

export const AppointmentServices = {
    create: async (createAppointmentDto: CreateAppointmentDto) => {
        return await api.post(`/appointment`, createAppointmentDto);
    },
    getAll: async (appointmentFilter: AppointmentFilter) => {
        return await api.get(`/appointment`, { params: appointmentFilter });
    },
    update: async (id: string, updateAppointmentDto: updateAppointmentDto) => {
        return await api.patch(`/appointment/${id}`, updateAppointmentDto);
    },
    getByPostIdAndUserId: async (postId: string) => {
        return await api.get(`/appointment/by-post`, {
            params: {
                postId,
            },
        });
    },
};
