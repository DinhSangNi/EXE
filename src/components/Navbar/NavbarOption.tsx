/* eslint-disable */
import { capitalizeFirstLetter } from "@/utils/format";

const NavOption = ({
    icon: Icon,
    title,
    selected,
    onSelect,
}: {
    icon: any;
    title: "accomodation" | "service";
    selected: string;
    onSelect: (v: "accomodation" | "service") => void;
}) => {
    return (
        <button
            className="group relative flex cursor-pointer items-center gap-2 pb-2"
            onClick={() => onSelect(title)}
        >
            <Icon
                className={`h-8 w-8 ${
                    title === "accomodation"
                        ? "text-red-500"
                        : "text-orange-300"
                } transition-transform duration-300 group-hover:scale-110`}
            />
            <p
                className={`font-bold ${
                    selected === title ? "text-black" : "text-gray-500"
                }`}
            >
                {capitalizeFirstLetter(
                    title === "accomodation" ? "Nơi lưu trú" : "Dịch vụ"
                )}
            </p>
            <span
                className={`absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 ${
                    selected === title && "scale-x-100"
                }`}
            ></span>
        </button>
    );
};

export default NavOption;
