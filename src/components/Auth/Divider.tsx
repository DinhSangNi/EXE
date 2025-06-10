import React from "react";
import "../../index.css";
const Divider: React.FC = () => {
    return (
        <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">hoặc</span>
            <div className="flex-1 h-px bg-gray-300"></div>
        </div>
    );
};

export default Divider;
