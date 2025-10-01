import { Popover, DatePicker, ConfigProvider } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import enUS from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";

dayjs.locale("vi");

const viVN = {
    ...enUS,
    DatePicker: {
        ...enUS.DatePicker,
        lang: {
            ...enUS.DatePicker?.lang,
            locale: "vi",
            rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
            today: "Hôm nay",
            now: "Bây giờ",
            ok: "OK",
            clear: "Xóa",
            month: "Tháng",
            year: "Năm",
        },
    },
};

const AppointmentButton = ({
    onSelect,
}: {
    onSelect: (date: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(null);

    const disabledDate = (current: Dayjs) =>
        current && current < dayjs().startOf("day");

    return (
        <Popover
            className="w-full"
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            content={
                <ConfigProvider locale={viVN as Locale}>
                    <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="DD/MM/YYYY HH:mm"
                        disabledDate={disabledDate}
                        onChange={(d) => {
                            setDate(d);
                            if (d) {
                                onSelect(d.toISOString());
                                setOpen(false);
                            }
                        }}
                    />
                </ConfigProvider>
            }
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                {date
                    ? `Đã chọn: ${date.format("DD/MM/YYYY HH:mm")}`
                    : "Đặt lịch xem nhà"}
            </button>
        </Popover>
    );
};

export default AppointmentButton;
