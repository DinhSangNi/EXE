 
import { AddressServices } from "@/services/address";
import { Select } from "antd";
import { useEffect, useState, useCallback } from "react";

type Props = {
    value?: string | null;
    onChange?: (value: string) => void;
    type: "province" | "district" | "ward";
    mode?: "default" | "filter";
    provinceCode?: string | null;
    districtCode?: string | null;
    className?: string;
};

type Option = { value: string; label: string };

const AddressSelector = ({
    value,
    type,
    mode = "default",
    provinceCode,
    districtCode,
    className,
    onChange,
}: Props) => {
    const [selected, setSelected] = useState<Option>();
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<Option[]>([]);

    /** fetch mặc định theo type */
    const fetchOptions = useCallback(async () => {
        try {
            let data: Option[] = [];

            if (type === "province") {
                const res = await AddressServices.getProvinces();
                if (res.status === 200) {
                    data = res.data.metadata.map(
                        (p: { code: string; name: string }) => ({
                            value: `${p.code}|${p.name}`,
                            label: p.name,
                        })
                    );
                    if (mode === "filter") {
                        data = [{ label: "Toàn quốc", value: "" }, ...data];
                    }
                }
            }

            if (type === "district" && provinceCode) {
                const res =
                    await AddressServices.getDistrictsByProvince(provinceCode);
                if (res.status === 200) {
                    data = res.data.metadata.districts.map(
                        (d: { code: string; name: string }) => ({
                            value: `${d.code}|${d.name}`,
                            label: d.name,
                        })
                    );
                }
            }

            if (type === "ward" && districtCode) {
                const res =
                    await AddressServices.getWardsByDistrict(districtCode);
                if (res.status === 200) {
                    data = res.data.metadata.wards.map(
                        (w: { code: string; name: string }) => ({
                            value: `${w.code}|${w.name}`,
                            label: w.name,
                        })
                    );

                    data = [
                        {
                            value: "12|Phường Trần Hưng Đạo",
                            label: "Phường Trần Hưng Đạo",
                        },
                        ...data,
                    ];
                }
            }

            setOptions(data);
        } catch (err) {
            console.error("fetchAddressData error:", err);
        }
    }, [type, provinceCode, districtCode, mode]);

    /** search theo query */
    const searchOptions = useCallback(async () => {
        try {
            let res;
            if (type === "province") {
                res = await AddressServices.searchProvince(query);
            } else if (type === "district") {
                res = provinceCode
                    ? await AddressServices.searchDistrict(query, provinceCode)
                    : await AddressServices.searchDistrict(query);
            }
            if (res?.status === 200) {
                const data: Option[] = res.data.metadata.map(
                    (a: { code: string; name: string }) => ({
                        value: `${a.code}|${a.name}`,
                        label: a.name,
                    })
                );
                setOptions(data);
            }
        } catch (err) {
            console.error("search error:", err);
        }
    }, [query, type, provinceCode]);

    /** fetch/search khi query/type đổi */
    useEffect(() => {
        if (query.length > 0) {
            const debounce = setTimeout(searchOptions, 300);
            return () => clearTimeout(debounce);
        }
        fetchOptions();
    }, [query, fetchOptions, searchOptions]);

    /** cập nhật selected khi value/options đổi */
    useEffect(() => {
        if (!value) {
            setSelected(undefined);
            return;
        }
        const match = options.find((item) => item.value === value);
        setSelected(match); // chỉ set khi match
    }, [value, options]);

    const handleChange = (val: Option) => {
        setSelected(val);
        onChange?.(val.value);
    };

    return (
        <div className={`min-w-[200px] ${className}`}>
            <h1 className="mb-1">
                {type === "province"
                    ? "Tỉnh/Thành phố"
                    : type === "district"
                      ? "Quận/Huyện"
                      : "Phường/Xã"}
            </h1>
            <Select
                labelInValue
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
                onSearch={setQuery}
                onSelect={() => setQuery("")}
                options={options}
                className="w-full"
            />
        </div>
    );
};

export default AddressSelector;
