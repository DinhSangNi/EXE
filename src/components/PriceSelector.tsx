/* eslint-disable */
import { Select } from "antd";

type Props = {
    value?: {
        min: number | null;
        max: number | null;
    };
    mode?: "filter" | "default";
    className?: string;
    onChange?: (priceRange: { min: number | null; max: number | null }) => void;
};

const rawOptions = [
    {
        label: "Tất cả",
        value: { min: null, max: null },
    },
    {
        label: "Dưới 1 triệu",
        value: { min: null, max: 1000000 },
    },
    {
        label: " 1 - 2 triệu",
        value: { min: 1000000, max: 2000000 },
    },
    {
        label: "2 - 3 triệu",
        value: { min: 2000000, max: 3000000 },
    },
    {
        label: "3 - 5 triệu",
        value: { min: 3000000, max: 5000000 },
    },
    {
        label: "5 - 7 triệu",
        value: { min: 5000000, max: 7000000 },
    },
    {
        label: "Trên 7 triệu",
        value: { min: 7000000, max: null },
    },
];

const PriceSelector = ({ mode = "default", className, onChange }: Props) => {
    const handleSelect = (value: string) => {
        if (!onChange) return;
        const min = value.split("-")[0];
        const max = value.split("-")[1];
        onChange({
            min: parseFloat(min) || null,
            max: parseFloat(max) || null,
        });
    };
    return (
        <>
            <Select
                defaultValue={
                    mode === "filter"
                        ? `${rawOptions[0].value.min}-${rawOptions[0].value.max}`
                        : undefined
                }
                options={rawOptions.map((opt) => ({
                    label: opt.label,
                    value: `${opt.value.min}-${opt.value.max}`,
                }))}
                placeholder="--Chọn khoảng giá--"
                onSelect={handleSelect}
                className={`${className}`}
            />
        </>
    );
};

export default PriceSelector;
