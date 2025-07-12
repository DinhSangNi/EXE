import { AddressServices } from "@/services/address";
import { useQuery } from "@tanstack/react-query";

const useDistrictsByProvince = (provinceCode: string | null) => {
    return useQuery({
        queryKey: ["districts", provinceCode],
        queryFn: async () => {
            const res = await AddressServices.getDistrictsByProvince(
                provinceCode as string
            );
            return res.data.metadata.districts;
        },
        enabled: !!provinceCode,
        staleTime: 3 * 60 * 1000,
    });
};

export default useDistrictsByProvince;
