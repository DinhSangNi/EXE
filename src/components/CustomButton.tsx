import type { ReactNode } from "react";

type Props = { className?: string; title: string; icon: ReactNode };

const CustomButton = ({ className, title, icon }: Props) => {
    return (
        <>
            <button
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 ${className}`}
            >
                {icon} {title}
            </button>
        </>
    );
};

export default CustomButton;
