import { AddressServices } from "@/services/address";
import { useQuery } from "@tanstack/react-query";

const useProvinces = () => {
    return useQuery({
        queryKey: ["provinces"],
        queryFn: async () => {
            const res = await AddressServices.getProvinces();
            return res.data.metadata;
        },
        staleTime: 3 * 60 * 1000,
    });
};

export default useProvinces;
