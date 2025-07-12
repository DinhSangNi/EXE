/* eslint-disable */
import { AddressServices } from "@/services/address";
import { Select } from "antd";
import { useEffect, useState } from "react";

type Props = {
    value?: string | null | undefined;
    onChange?: (value: string) => void;
    type: "province" | "district" | "ward";
    mode?: "default" | "filter";
    provinceCode?: string | null | undefined;
    districtCode?: string | null | undefined;
    className?: string;
};

const AddressSelector = ({
    value,
    type,
    mode = "default",
    provinceCode,
    districtCode,
    className,
    onChange,
}: Props) => {
    const [selected, setSelected] = useState<
        | {
              value: string;
              label: string;
          }
        | undefined
    >(
        value
            ? {
                  value: value,
                  label: value?.split("|")[1],
              }
            : undefined
    );
    const [query, setQuery] = useState<string>("");
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        []
    );

    useEffect(() => {
        const fetchAddressData = async () => {
            try {
                let resolvedData: { value: string; label: string }[] = [];

                switch (type) {
                    case "province": {
                        const resPro = await AddressServices.getProvinces();
                        if (resPro.status === 200) {
                            resolvedData = resPro.data.metadata.map(
                                (province: { code: string; name: string }) => ({
                                    value: `${province.code}|${province.name}`,
                                    label: province.name,
                                })
                            );
                            mode === "filter" &&
                                type === "province" &&
                                (resolvedData = [
                                    { label: "Toàn quốc", value: "" },
                                    ...resolvedData,
                                ]);
                        }
                        break;
                    }

                    case "district": {
                        if (!provinceCode) return;
                        const resDis =
                            await AddressServices.getDistrictsByProvince(
                                provinceCode
                            );
                        if (resDis.status === 200) {
                            resolvedData = resDis.data.metadata.districts.map(
                                (district: { code: string; name: string }) => ({
                                    value: `${district.code}|${district.name}`,
                                    label: district.name,
                                })
                            );
                        }
                        break;
                    }

                    case "ward": {
                        if (!districtCode) return;
                        const resWar =
                            await AddressServices.getWardsByDistrict(
                                districtCode
                            );
                        if (resWar.status === 200) {
                            resolvedData = resWar.data.metadata.wards.map(
                                (ward: { code: string; name: string }) => ({
                                    value: `${ward.code}|${ward.name}`,
                                    label: ward.name,
                                })
                            );
                        }
                        break;
                    }
                }

                setOptions(resolvedData);
            } catch (error) {
                console.error("fetchAddressData error:", error);
            }
        };

        const search = async () => {
            try {
                let res;
                switch (type) {
                    case "province":
                        res = await AddressServices.searchProvince(query);
                        break;
                    case "district":
                        res = provinceCode
                            ? await AddressServices.searchDistrict(
                                  query,
                                  provinceCode
                              )
                            : await AddressServices.searchDistrict(query);
                        break;
                }

                if (res?.status === 200) {
                    const resolvedData = res.data.metadata.map(
                        (address: { code: string; name: string }) => ({
                            value: `${address.code}|${address.name}`,
                            label: address.name,
                        })
                    );
                    setOptions(resolvedData);
                }
            } catch (error) {
                console.error("search error:", error);
            }
        };

        if (query.length > 0) {
            const debounce = setTimeout(search, 300);
            return () => clearTimeout(debounce);
        } else {
            fetchAddressData();
        }
    }, [type, query, provinceCode, districtCode]);

    useEffect(() => {
        if (!value) {
            setSelected(undefined);
            return;
        }

        const match = options.find((item) => item.value === value);
        if (match) {
            setSelected(match);
        } else {
            // Nếu options chưa có thì fallback tạm
            const label = value.split("|")[1] ?? value;
            setSelected({ value, label });
        }
    }, [value, options]);

    const handleSearch = (query: string) => {
        setQuery(query);
    };

    const handleChange = (value: { value: string; label: string }) => {
        setSelected(value);
        onChange && onChange(value.value ?? "");
    };

    return (
        <>
            <div className={`min-w-[200px] ${className}`}>
                <h1 className="mb-1">
                    {type === "province"
                        ? "Tỉnh/Thành phố"
                        : type === "district"
                          ? "Quận/Huyện"
                          : "Phường/Xã"}
                </h1>
                <Select
                    labelInValue={true}
                    value={selected}
                    defaultValue={
                        mode === "filter" && type === "province"
                            ? { label: "Tất cả", value: "" }
                            : undefined
                    }
                    showSearch
                    filterOption={false}
                    placeholder={
                        type === "province"
                            ? "--chọn tỉnh/thành phố--"
                            : type === "district"
                              ? "--chọn quận/huyện--"
                              : "--chọn phường/xã--"
                    }
                    onChange={handleChange}
                    onSearch={handleSearch}
                    onSelect={() => setQuery("")}
                    options={options}
                    className="w-full"
                />
            </div>
        </>
    );
};

export default AddressSelector;
