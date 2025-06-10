import PostCarousel from "@/components/PostCarousel";
import { PiHeadphonesFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";

const Home = () => {
    return (
        <>
            <div className="w-full">
                <div className="mx-auto mt-14 w-[90%]">
                    <PostCarousel title="Chỗ ở đề xuất" />
                </div>
                <div className="mx-auto mt-14 w-[90%]">
                    <PostCarousel title="Bài đăng mới" />
                </div>
                <div className="mx-auto mt-14 w-[90%]">
                    <div className="flex w-full px-6 shadow-2xl">
                        <div className="w-1/2">
                            <img
                                src="https://phongtro123.com/images/contact-us-pana-orange.svg"
                                alt="admin support image"
                                className="w-2/3 justify-self-center object-cover"
                            />
                        </div>
                        <div className="flex w-1/2 flex-col justify-center text-center">
                            <div className="flex w-full justify-center">
                                <PiHeadphonesFill className="h-10 w-10" />
                            </div>
                            <h1 className="mt-2 text-[1.6rem] font-semibold">
                                Hỗ trợ chủ nhà đăng tin
                            </h1>
                            <p className="mt-4 text-gray-600">
                                Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số
                                điện thoại bên dưới:
                            </p>
                            <div className="mt-6 flex w-full justify-center gap-4 text-white">
                                <button className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2">
                                    <FaPhoneAlt className="text-[1rem]" /> ĐT:
                                    0909316890
                                </button>
                                <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2">
                                    <BiMessageRoundedDetail className="text-[1.2rem]" />
                                    Zalo: 0909316890
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
