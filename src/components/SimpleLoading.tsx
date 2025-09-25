import { Spin } from "antd";

interface SimpleLoadingProps {
    message?: string;
    size?: "small" | "default" | "large";
}

const SimpleLoading = ({
    message = "Đang tải dữ liệu...",
    size = "large",
}: SimpleLoadingProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Spin size={size} />
            <p className="mt-4 text-gray-500">{message}</p>
        </div>
    );
};

export default SimpleLoading;
