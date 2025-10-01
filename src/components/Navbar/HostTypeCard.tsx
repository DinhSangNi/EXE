/* eslint-disable */
import { capitalizeFirstLetter } from "@/utils/format";

const HostTypeCard = ({
    title,
    icon: Icon,
    selected,
    onSelect,
}: {
    title: "accomodation" | "service" | null;
    icon: any;
    selected: string | null;
    onSelect: (v: "accomodation" | "service" | null) => void;
}) => {
    return (
        <div
            className={`relative h-[300px] flex-1 cursor-pointer rounded-xl border-2 transition-colors duration-200 hover:bg-gray-200 ${
                selected === title ? "border-black" : "border-gray-200"
            }`}
            onClick={() => onSelect(title)}
        >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Icon className="h-16 w-16" />
            </div>
            <p className="mt-[220px] w-full text-center text-[1rem] font-bold">
                {capitalizeFirstLetter(
                    title! === "accomodation" ? "Nơi lưu trú" : "Dịch vụ"
                )}
            </p>
        </div>
    );
};

export default HostTypeCard;
