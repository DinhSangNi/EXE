import React from "react";
import PhoneLoginForm from "./PhoneLoginForm";
import SocialLogin from "./SocialLogin";
import Divider from "./Divider";
import { CloseOutlined } from "@ant-design/icons";
import "../../index.css";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
    if (!isOpen) return null;

    const title =
        mode === "login" ? "Đăng nhập hoặc đăng ký" : "Đăng nhập hoặc đăng ký";

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[29px] w-[90%] max-w-[515px] max-h-[90vh] overflow-y-auto relative shadow-[0_8px_28px_rgba(0,0,0,0.28)] m-5 md:m-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 pt-6 pb-0 border-b border-[#DDDDDD] relative text-center">
                    <button
                        className="absolute left-6 top-[18px] bg-transparent border-none text-[24px] w-[22px] h-[22px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                        onClick={onClose}
                    >
                        <CloseOutlined />
                    </button>
                    <h2 className="text-[16px] font-semibold text-[#222222] pb-6 m-0">
                        {title}
                    </h2>
                </div>

                <div className="p-6 md:p-4">
                    <div className="mb-6">
                        <h3 className="text-[22px] md:text-[20px] font-semibold text-[#222222] mb-6">
                            Chào mừng bạn đến với Airbnb
                        </h3>
                    </div>

                    <PhoneLoginForm />

                    <Divider />

                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
