import PostCarousel from "@/components/PostCarousel";
import { PiHeadphonesFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { PostServices } from "@/services/post";

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        PostServices.getAll()
            .then((res) => {
                setPosts(res.data.metadata || []);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="w-full">
                <div className="mx-auto mt-14 w-[90%]">
                    <PostCarousel
                        title="Chỗ ở đề xuất"
                        data={loading ? Array(6).fill(null) : posts}
                        loading={loading}
                    />

                </div>
                <div className="mx-auto mt-14 w-[90%]">
                    <PostCarousel
                        title="Bài đăng mới"
                        data={loading ? Array(6).fill(null) : posts}
                        loading={loading}
                    />
                </div>
                <div className="mx-auto mt-14 w-[90%]">
                    <div className="w-full px-6 py-4 shadow-2xl md:flex">
                        <div className="md:w-1/2">
                            <img
                                src="https://phongtro123.com/images/contact-us-pana-orange.svg"
                                alt="admin support image"
                                className="w-2/3 justify-self-center object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center text-center md:w-1/2">
                            <div className="flex w-full justify-center">
                                <PiHeadphonesFill className="text-[2rem] md:h-10 md:w-10" />
                            </div>
                            <h1 className="mt-2 text-[1rem] font-semibold md:text-[1.6rem]">
                                Hỗ trợ chủ nhà đăng tin
                            </h1>
                            <p className="mt-4 text-[0.8rem] text-gray-600 md:text-[1rem]">
                                Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số
                                điện thoại bên dưới:
                            </p>
                            <div className="mt-6 flex w-full justify-center gap-4 text-white">
                                <button className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2">
                                    <FaPhoneAlt className="text-[0.8rem] md:text-[1.2rem]" />
                                    0909316890
                                </button>
                                <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2">
                                    <BiMessageRoundedDetail className="text-[0.8rem] md:text-[1.2rem]" />
                                    0909316890
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
