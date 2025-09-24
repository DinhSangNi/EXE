import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
    className?: string;
    title: string;
    icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({ className, title, icon, ...props }: Props) => {
    return (
        <button
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 ${className}`}
            {...props}
        >
            {icon} {title}
        </button>
    );
};

export default CustomButton;
