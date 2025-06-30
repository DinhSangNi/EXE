import api from "@/config/axios";

export const AddressServices = {
    getProvinces: async () => {
        return await api.get(`/address/provinces`);
    },
    getDistrictsByProvince: async (provinceCode: string) => {
        return await api.get(`/address/provinces/${provinceCode}/districts`);
    },
    searchProvince: async (query: string) => {
        return await api.get(`/address/provinces/search/?q=${query}`);
    },
    getDistricts: async () => {
        return await api.get(`/address/districts`);
    },
    searchDistrict: async (query: string, provinceCode?: string) => {
        return await api.get(
            provinceCode
                ? `/address/districts/search/?q=${query}&p=${provinceCode}`
                : `/address/districts/search/?q=${query}`
        );
    },
    getWards: async () => {
        return await api.get(`/address/wards`);
    },
    getWardsByDistrict: async (districtCode: string) => {
        return await api.get(`/address/districts/${districtCode}/wards`);
    },
};
