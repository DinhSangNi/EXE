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
            <div className="mb-3 rounded-lg border border-gray-400">
                <CountrySelect
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                />
                <div className="h-[1px] w-full bg-gray-300"></div>
                <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-b-lg border-none px-3 py-3 text-base"
                />
            </div>

            <div className="mb-4 text-xs leading-relaxed text-black">
                Chúng tôi sẽ gọi hoặc nhắn tin cho bạn để xác nhận số điện
                thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn.{" "}
                <span className="cursor-pointer font-bold underline">
                    Chính sách về quyền riêng tư
                </span>
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] py-3 text-base font-semibold text-white transition-all hover:from-[#D01346] hover:via-[#CA1A5B] hover:to-[#C1045C]"
            >
                Tiếp tục
            </button>
        </form>
    );
};

export default PhoneLoginForm;
