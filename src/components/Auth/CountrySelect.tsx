import React, { useState } from "react";
import "../../index.css";
interface Country {
    code: string;
    name: string;
    flag: string;
}

interface CountrySelectProps {
    selectedCountry: Country;
    onCountryChange: (country: Country) => void;
}

const countries: Country[] = [
    { code: "+84", name: "Việt Nam", flag: "🇻🇳" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
];

const CountrySelect: React.FC<CountrySelectProps> = ({
    selectedCountry,
    onCountryChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCountrySelect = (country: Country) => {
        onCountryChange(country);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="flex w-full min-w-[120px] items-center gap-2 px-3 py-3 text-base"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-gray-900">{selectedCountry.code}</span>
                <span className="ml-auto text-xs text-gray-500">▼</span>
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 max-h-52 overflow-hidden rounded-b-lg border border-gray-300">
                    <div className="max-h-52 overflow-y-auto bg-white shadow-md">
                        {countries.map((country) => (
                            <button
                                key={country.code}
                                type="button"
                                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100"
                                onClick={() => handleCountrySelect(country)}
                            >
                                <span className="text-lg">{country.flag}</span>
                                <span className="flex-1 text-gray-900">
                                    {country.name}
                                </span>
                                <span className="text-gray-700">
                                    {country.code}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountrySelect;
