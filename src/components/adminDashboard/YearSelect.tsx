import { Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { Option } = Select;

const YearSelect = ({
    year,
    setYear,
}: {
    year?: number;
    setYear: (value: number) => void;
}) => {
    const currentYear = dayjs().year();
    const [visibleYears, setVisibleYears] = useState(5);

    const years = Array.from(
        { length: visibleYears },
        (_, i) => currentYear - i
    );

    const handleSeeMore = (e: React.MouseEvent) => {
        e.stopPropagation();
        setVisibleYears((prev) => prev + 10);
    };

    return (
        <Select
            placeholder="Chọn năm"
            style={{ width: 150 }}
            value={year}
            onChange={(value) => setYear(value)}
            popupRender={(menu) => (
                <>
                    {menu}
                    <div
                        style={{
                            padding: "8px",
                            textAlign: "center",
                            cursor: "pointer",
                            borderTop: "1px solid #f0f0f0",
                            color: "#1677ff",
                        }}
                        onClick={handleSeeMore}
                    >
                        Xem thêm năm trước
                    </div>
                </>
            )}
        >
            {years.map((y) => (
                <Option key={y} value={y}>
                    {y}
                </Option>
            ))}
        </Select>
    );
};

export default YearSelect;
