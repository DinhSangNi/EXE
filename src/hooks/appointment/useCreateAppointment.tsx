import { AppointmentServices } from "@/services/appointment";
import type { CreateAppointmentDto } from "@/stores/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (createAppointmentDto: CreateAppointmentDto) => {
            const res = await AppointmentServices.create(createAppointmentDto);
            return res.data.metadata;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
        onError: (error) => {
            console.error("Create appointment failed:", error);
        },
    });
};

export default useCreateAppointment;
