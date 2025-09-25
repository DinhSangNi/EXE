import { AppointmentServices } from "@/services/appointment";
import type { Appointment } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const useAppointmentById = (id: string) => {
    return useQuery({
        queryKey: ["appointments", id],
        queryFn: async () => {
            const res = await AppointmentServices.getById(id);
            return res.data.metadata as Appointment;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default useAppointmentById;
