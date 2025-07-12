import { Select } from "antd";
import { useState } from "react";

type Props = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
};

const options = [
    {
        value: "Nguyên căn",
        label: "Nguyên căn",
    },
    {
        value: "Từng phòng",
        label: "Từng phòng",
    },
];

const RentalTypeSelector = ({ className, value, onChange }: Props) => {
    const [selected, setSelected] = useState<string | undefined>(
        value ? value : undefined
    );

    const handleChange = (value: string) => {
        setSelected(value);
        onChange?.(value);
    };
    return (
        <div className={`${className}`}>
            <h1 className="mb-1">Loại hình cho thuê</h1>
            <Select
                className="w-full"
                value={selected}
                options={options}
                placeholder="--chọn loại hình cho thuê--"
                onChange={handleChange}
            />
        </div>
    );
};

export default RentalTypeSelector;
