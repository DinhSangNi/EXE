import React, { useState } from "react";
import AuthModal from "../../components/Auth/AuthModal";
import "../../index.css";
const LoginPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-[#FF5A5F] text-white border-none rounded-lg px-6 py-3 text-base font-semibold cursor-pointer transition-all duration-200 min-w-[120px] hover:bg-[#E04E53] hover:-translate-y-[1px] hover:shadow-lg"
            >
                Đăng nhập
            </button>

            <AuthModal isOpen={isModalOpen} onClose={closeModal} mode="login" />
        </div>
    );
};

export default LoginPage;
