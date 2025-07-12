/* eslint-disable */
import type { AreaUnit, PriceUnit } from "@/pages/CreatePost";
import { CategoryServices } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
    className?: string;
    title?: ReactNode;
    value?: string;
    mode?: "filter" | "default";
    onChange?: (value: string) => void;
    setAreaUnit?: (value: AreaUnit) => void;
    setPriceUnit?: (value: PriceUnit) => void;
};

type CategoryOption = DefaultOptionType & {
    value: string;
    label: string;
};

const CategorySelector = ({
    className,
    title,
    value,
    mode = "default",
    onChange,
    setAreaUnit,
    setPriceUnit,
}: Props) => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await CategoryServices.getAll();
            return res.data;
        },
    });

    let options =
        categories?.metadata?.map((cat: { name: string; id: string }) => ({
            label: cat.name,
            value: cat.id,
        })) ?? [];

    if (mode === "filter") {
        options = [{ label: "Tất cả", value: "" }, ...options];
    }

    const [selected, setSelected] = useState<string | undefined>(
        value ? value : undefined
    );

    const handleChange = (
        value: string,
        options: CategoryOption | CategoryOption[] | undefined
    ) => {
        const option = options as CategoryOption;
        setSelected(value);

        if (onChange) {
            onChange(value);
        }

        if (setAreaUnit) {
            if (option.label === "Nhà trọ") {
                setAreaUnit("m2/phòng");
            } else if (option.label === "Mặt bằng/Văn phòng") {
                setAreaUnit("m2");
            } else {
                setAreaUnit("m2/căn hộ");
            }
        }

        if (setPriceUnit) {
            if (option.label === "Nhà trọ") {
                setPriceUnit("đồng/phòng/tháng");
            } else if (option.label === "Mặt bằng/Văn phòng") {
                setPriceUnit("đồng/tháng");
            } else {
                setPriceUnit("đồng/căn hộ/tháng");
            }
        }
    };

    useEffect(() => {
        if (value) {
            const match = options.find(
                (item: { value: string; label: string }) => item.value === value
            );
            if (match) {
                setSelected(match.value);
            }
        } else {
            setSelected(undefined);
        }
    }, [value, isSuccess]);

    return (
        <div className={className}>
            {title ? title : <h1 className="mb-1">Loại chuyên mục</h1>}

            {isLoading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p className="text-red-500">Lỗi khi tải danh mục</p>
            ) : (
                <Select
                    className="w-full"
                    value={selected}
                    defaultValue={""}
                    options={options}
                    placeholder="--Chọn loại chuyên mục--"
                    onChange={handleChange}
                />
            )}
        </div>
    );
};

export default CategorySelector;
