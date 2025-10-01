import { AppointmentServices } from "@/services/appointment";
import type { Appointment } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";

const useAppointmentByPostId = (postId: string) => {
    return useQuery({
        queryKey: ["appointments", postId],
        queryFn: async () => {
            const res = await AppointmentServices.getByPostIdAndUserId(postId);
            return res.data.metadata as Appointment;
        },
        staleTime: 0,
    });
};

export default useAppointmentByPostId;
