import { Spin } from "antd";
import type { SpinProps } from "antd";
import type { ReactNode } from "react";

interface SpinOverlayProps extends SpinProps {
    loading: boolean;
    children?: ReactNode;
    className?: string;
}

const SpinOverlay = ({
    loading,
    children,
    className,
    ...spinProps
}: SpinOverlayProps) => {
    if (!loading) {
        return <>{children}</>;
    }

    return (
        <div className={`relative ${className || ""}`}>
            {children && (
                <div className="pointer-events-none opacity-50">{children}</div>
            )}
            {/* Spin overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <Spin {...spinProps} />
            </div>
        </div>
    );
};

export default SpinOverlay;
