import { AppointmentServices } from "@/services/appointment";
import type {
    Appointment,
    AppointmentFilter,
    PaginationResponse,
} from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const useAppointments = (filter: AppointmentFilter) => {
    return useQuery({
        queryKey: ["appointments", filter],
        queryFn: async () => {
            const res = await AppointmentServices.getAll(filter);
            return res.data.metadata as PaginationResponse<Appointment[]>;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default useAppointments;
