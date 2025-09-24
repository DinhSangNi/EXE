import { AppointmentServices } from "@/services/appointment";
import type { updateAppointmentDto } from "@/stores/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            updateAppointmentDto,
        }: {
            id: string;
            updateAppointmentDto: updateAppointmentDto;
        }) => {
            const res = await AppointmentServices.update(
                id,
                updateAppointmentDto
            );
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

export default useUpdateAppointment;
