import "../../index.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneSchema = z.object({
    phone: z.string().length(10, {
        message: "Phone must have 10 digits",
    }),
});

export type FormData = z.infer<typeof phoneSchema>;

const PhoneLoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(phoneSchema),
    });
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [selectedCountry, setSelectedCountry] = useState({
    //     code: "+84",
    //     name: "Việt Nam",
    //     flag: "🇻🇳",
    // });

    const onSubmit = () => {};

    return (
        <div className="mb-4">
            <div className="mb-3">
                <h1>Xác thực số điện thoại</h1>
                {/* <CountrySelect
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                /> */}
                {/* <div className="h-[1px] w-full bg-gray-300"></div> */}
                {/* <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-b-lg border-none px-3 py-3 text-base"
                /> */}
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="mb-5 flex flex-col">
                        {/* <label>Họ và tên:</label> */}
                        <input
                            className="rounded-lg border-2 border-gray-400 p-2 shadow-md"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-[0.9rem] text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </form>
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
        </div>
    );
};

export default PhoneLoginForm;
