import type { AreaUnit, PriceUnit } from "@/pages/CreatePost";
import { CategoryServices } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

type Props = {
    className?: string;
    value?: string;
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
    value,
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

    const options =
        categories?.metadata?.map((cat: any) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    const [selected, setSelected] = useState<string | undefined>(
        value ? value : undefined
    );

    const handleChange = (
        value: string,
        options: CategoryOption | CategoryOption[] | undefined
    ) => {
        const option = options as CategoryOption;
        setSelected(value);
        onChange && onChange(value);
        setAreaUnit &&
            setAreaUnit(
                option.label === "Nhà trọ"
                    ? "m2/phòng"
                    : option.label === "Mặt bằng/Văn phòng"
                      ? "m2"
                      : "m2/căn hộ"
            );
        setPriceUnit &&
            setPriceUnit(
                option.label === "Nhà trọ"
                    ? "đồng/phòng/tháng"
                    : option.label === "Mặt bằng/Văn phòng"
                      ? "đồng/tháng"
                      : "đồng/căn hộ/tháng"
            );
    };

    useEffect(() => {
        if (value) {
            const match = options.find(
                (item: { value: string; label: string }) => item.value === value
            );
            if (match) {
                setSelected(match);
            }
        } else {
            setSelected(undefined);
        }
    }, [value, isSuccess]);

    return (
        <div className={className}>
            <h1 className="mb-1">Loại chuyên mục</h1>

            {isLoading ? (
                <p>Đang tải...</p>
            ) : error ? (
                <p className="text-red-500">Lỗi khi tải danh mục</p>
            ) : (
                <Select
                    className="w-full"
                    value={selected}
                    options={options}
                    placeholder="--Chọn loại chuyên mục--"
                    onChange={handleChange}
                />
            )}
        </div>
    );
};

export default CategorySelector;
