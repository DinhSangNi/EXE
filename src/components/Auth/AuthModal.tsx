import { useEffect } from "react";
import PhoneLoginForm from "./PhoneLoginForm";
import SocialLogin from "./SocialLogin";
import Divider from "./Divider";
import { IoMdClose } from "react-icons/io";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
    const title =
        mode === "login" ? "Đăng nhập hoặc đăng ký" : "Đăng nhập hoặc đăng ký";

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    return (
        <div
            className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-[1000] flex items-center justify-center bg-black/60`}
            onClick={onClose}
        >
            <div
                className="m-5 h-[90%] max-h-[660px] w-[90%] max-w-[550px] overflow-hidden rounded-3xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] md:m-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex max-h-[20%] w-full items-center border-b border-[#DDDDDD] p-6 md:p-4">
                    <button className="hover:bg-gray-100" onClick={onClose}>
                        <IoMdClose className="h-6 w-6" />
                    </button>
                    <h2 className="w-full text-[16px] font-semibold text-[#222222]">
                        {title}
                    </h2>
                </div>

                <div className="max-h-[85%] overflow-y-auto p-6 md:p-4">
                    <h3 className="text-[22px] font-semibold text-[#222222] md:text-[20px]">
                        Chào mừng bạn đến với Airbnb
                    </h3>
                    <PhoneLoginForm />
                    <Divider />
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
