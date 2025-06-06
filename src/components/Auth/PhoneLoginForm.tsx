import React, { useState } from "react";
import CountrySelect from "./CountrySelect";
import "../../index.css";
const PhoneLoginForm: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState({
        code: "+84",
        name: "Việt Nam",
        flag: "🇻🇳",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Phone login:", selectedCountry.code + phoneNumber);
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="flex border border-gray-400 rounded-lg overflow-hidden mb-3">
                <CountrySelect
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                />
                <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-3 text-base outline-none"
                />
            </div>

            <div className="text-xs text-black leading-relaxed mb-4">
                Chúng tôi sẽ gọi hoặc nhắn tin cho bạn để xác nhận số điện
                thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn.{" "}
                <span className="underline font-bold cursor-pointer">
                    Chính sách về quyền riêng tư
                </span>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold text-base py-3 rounded-lg transition-all hover:from-[#D01346] hover:via-[#CA1A5B] hover:to-[#C1045C]"
            >
                Tiếp tục
            </button>
        </form>
    );
};

export default PhoneLoginForm;
