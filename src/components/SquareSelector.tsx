import { Select } from "antd";

type Props = {
    mode?: "filter" | "default";
    className?: string;
    onChange?: (value: { min: number | null; max: number | null }) => void;
};

const rawOptions = [
    {
        label: "Tất cả",
        value: {
            min: null,
            max: null,
        },
    },
    {
        label: "Dưới 20m²",
        value: {
            min: null,
            max: 20,
        },
    },
    {
        label: "20 - 30 m²",
        value: {
            min: 20,
            max: 30,
        },
    },
    {
        label: "30 - 50 m²",
        value: {
            min: 30,
            max: 50,
        },
    },
    {
        label: "50 - 70m²",
        value: {
            min: 50,
            max: 70,
        },
    },
    {
        label: "Trên 70m²",
        value: {
            min: 70,
            max: null,
        },
    },
];

const SquareSelector = ({ mode = "default", className, onChange }: Props) => {
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
                placeholder="--Chọn khoảng diện tích--"
                onClear={() => {}}
                onSelect={handleSelect}
                className={`${className}`}
            />
        </>
    );
};

export default SquareSelector;
