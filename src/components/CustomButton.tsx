import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
    className?: string;
    title: string;
    icon?: ReactNode;
    loading?: boolean; // thêm loading
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
    className = "",
    title,
    icon,
    loading = false,
    disabled,
    ...props
}: Props) => {
    const isDisabled = loading || disabled;

    return (
        <button
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${className} `}
            {...props}
        >
            {loading ? <LoadingOutlined spin /> : icon}
            {title}
        </button>
    );
};

export default CustomButton;
