import CustomButton from "@/components/CustomButton";
import { Carousel, Divider } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
    IoWarningOutline,
    IoHeartOutline,
    IoShareSocialOutline,
} from "react-icons/io5";

const images = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/601053bc-52f7-40e7-ad93-7d728d80e3af.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/0e8f5dfe-0323-4d79-891b-49f66a009735.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/3b498001-f1f5-4eab-be76-d86a82af2857.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/80284248-f643-456a-9487-9e73c5994f55.jpeg?im_w=720",
];

const PostDetail = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const carouselRef = useRef<CarouselRef>(null);

    const goToSlide = (slideIndex: number) => {
        if (!carouselRef.current) return;
        carouselRef.current.goTo(slideIndex);
    };

    return (
        <>
            <div className="w-full">
                {/* Left side */}
                <div className="mx-auto mt-10 w-[90%] gap-8 md:flex">
                    {/* Carousel */}
                    <div className="md:w-3/5">
                        <Carousel
                            ref={carouselRef}
                            arrows
                            className="bg-gray-800"
                            afterChange={(current: number) =>
                                setImageIndex(current)
                            }
                        >
                            {images.map((img) => {
                                return (
                                    <div className="h-[350px] w-full">
                                        <img
                                            src={img}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                        <div className="mt-4 flex gap-2">
                            {images.map((img, index: number) => {
                                console.log(index === imageIndex);
                                return (
                                    <div
                                        className={`h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-lg ${index === imageIndex && "border-2 border-red-400"}`}
                                        onClick={() => goToSlide(index)}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-6 flex justify-between text-[0.9rem] md:hidden">
                            <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                <IoHeartOutline />
                                Lưu tin
                            </button>
                            <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                <IoShareSocialOutline />
                                Chia sẻ
                            </button>
                            <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                <IoWarningOutline />
                                Báo xấu
                            </button>
                        </div>

                        {/* Post Information */}
                        <div className="mt-6 w-full">
                            <h1 className="text-[1.2rem] font-bold">
                                KÍ TÚC XÁ FULL TIỆN NGHI CHỈ 1TR5 TẠI QUẬN PHÚ
                                NHUẬN - THÁNG 6 GIẢM THÊM 300K
                            </h1>
                            <div className="my-4 flex w-full justify-between">
                                <h2 className="text-[1.1rem] font-bold underline">
                                    <span>1.2 triệu/tháng</span>
                                    <span> · </span>
                                    <span>100 m²</span>
                                </h2>
                                <p className="text-[0.9rem]">
                                    Cập nhật: 2 giờ trước
                                </p>
                            </div>
                            <div className="flex gap-10 text-[0.8rem]">
                                <div className="flex flex-col gap-2">
                                    <p>Quận huyện:</p>
                                    <p>Tỉnh thành:</p>
                                    <p>Địa chỉ:</p>
                                    <p>Mã tin:</p>
                                    <p>Ngày đăng:</p>
                                    <p>Ngày hết hạn:</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Quận Phú Nhuận</p>
                                    <p>Hồ Chí Minh</p>
                                    <p>
                                        17/1A Đường Hồ Văn Huê, Quận Phú Nhuận,
                                        Hồ Chí Minh
                                    </p>
                                    <p>#676088</p>
                                    <p>Thứ 3, 22:21 03/06/2025</p>
                                    <p>Thứ 3, 22:21 10/06/2025</p>
                                </div>
                            </div>
                        </div>
                        <Divider />

                        {/* Description */}
                        <div className="w-full">
                            <h2 className="my-2 text-[1.1rem] font-bold">
                                Thông tin mô tả
                            </h2>
                            <div className="flex flex-col gap-2 text-[0.8rem]">
                                <p>
                                    LÀ CHỈ CÒN 1.200.000 BẠN CÓ 1 CHỖ Ở GỒM
                                    Không gian hiện đại,đầy đủ tiện nghi,giường
                                    tầng,tủ đồ cá nhân Wifi mạnh,miễn phí nhiều
                                    dịch vụ khác.....
                                </p>
                                <p>- Nội thất trang bị đầy đủ</p>
                                <p>- Giờ giấc tự do , ra vào cổng vân tay</p>
                                <p>
                                    - DV vệ sinh hàng ngày , không phát sinh chi
                                    phí Phù hợp cho sinh viên và người đi làm
                                </p>
                                <p>
                                    - Vị trí cạnh các khu trung tâm và trường
                                    Đại Học
                                </p>
                                <p>Địa chỉ:</p>
                                <p>CN1: 52 Nguyễn Giản Thanh, P15, Quận 10</p>
                                <p> CN2: 163 Thành Thái, P14, Quận 10</p>
                                <p>CN3: 17/1A Hồ Văn Huê, P9, Phú Nhuận</p>
                                <p>CN4: 60 Nguyễn Tri Phương, P6, Quận 5</p>
                            </div>
                        </div>
                        <Divider />

                        {/* Contact */}
                        <div className="w-full">
                            <h1 className="pb-2 text-[1.1rem] font-bold">
                                Thông tin liên hệ
                            </h1>
                            <div className="flex w-full items-center gap-4">
                                <div className="aspect-square w-2/5 overflow-hidden rounded-full sm:w-[120px] md:w-[150px]">
                                    <img
                                        src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/03/1_1743695856.jpg"
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="">
                                    <h1 className="my-2 font-bold">
                                        NGUYỄN VĂN HẬU
                                    </h1>
                                    <p className="text-[0.8rem]">
                                        <span>4 tin đăng</span>
                                        <span> · </span>
                                        <span>Tham gia từ: 05/03/2025</span>
                                    </p>
                                    <div className="mt-2 flex w-full items-center gap-2">
                                        <CustomButton
                                            title="0909316890"
                                            icon={<FaPhoneAlt />}
                                            className="bg-red-500 text-[0.8rem] text-white lg:text-[0.9rem]"
                                        />
                                        <CustomButton
                                            title="0909316890"
                                            icon={<BiMessageRoundedDetail />}
                                            className="bg-blue-500 text-[0.8rem] text-white lg:text-[0.9rem]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="md:w-2/5">
                        {/* Poster */}
                        <div className="hidden h-[350px] w-full flex-col items-center p-4 shadow-xl md:flex">
                            <div className="aspect-square w-[6rem] overflow-hidden rounded-full">
                                <img
                                    src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2025/04/03/1_1743695856.jpg"
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h1 className="my-2 font-bold">NGUYỄN VĂN HẬU</h1>
                            <p className="text-[0.8rem]">
                                <span>4 tin đăng</span>
                                <span> · </span>
                                <span>Tham gia từ: 05/03/2025</span>
                            </p>
                            <div className="mt-2 flex flex-col items-center gap-2 lg:w-1/2">
                                <CustomButton
                                    title="0909316890"
                                    icon={<FaPhoneAlt />}
                                    className="w-full bg-red-500 text-white md:text-[0.8rem] lg:text-[0.9rem]"
                                />
                                <CustomButton
                                    title="0909316890"
                                    icon={<BiMessageRoundedDetail />}
                                    className="w-full bg-blue-500 text-white md:text-[0.8rem] lg:text-[0.9rem]"
                                />
                            </div>
                            <div className="mt-4 flex justify-between text-[0.7rem] lg:w-3/5 lg:text-[0.8rem]">
                                <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                    <IoHeartOutline />
                                    Lưu tin
                                </button>
                                <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                    <IoShareSocialOutline />
                                    Chia sẻ
                                </button>
                                <button className="item flex items-center gap-1 px-2 py-1 hover:bg-gray-200">
                                    <IoWarningOutline />
                                    Báo xấu
                                </button>
                            </div>
                        </div>

                        {/* Featured Post */}
                        <div className="mt-10 bg-blue-300 px-4 py-4 shadow-lg md:sticky md:top-[110px] md:mt-4">
                            <h1 className="my-2 text-[1.1rem] font-bold">
                                Tin đăng nổi bật
                            </h1>

                            {images.map((img) => {
                                return (
                                    <div className="flex w-full gap-4 p-2">
                                        {/* Post's Image */}
                                        <div className="h-[90px] w-[90px] overflow-hidden rounded-lg">
                                            <img
                                                src={img}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Post's Information */}
                                        <div className="w-2/3">
                                            <h1 className="line-clamp-2 text-[0.9rem]">
                                                KÍ TÚC XÁ FULL TIỆN NGHI CHỈ
                                                1TR5 TẠI QUẬN PHÚ NHUẬN - THÁNG
                                                6 GIẢM THÊM 300K
                                            </h1>
                                            <div className="flex w-full justify-between text-[0.8rem]">
                                                <p>1.2 triệu/tháng</p>
                                                <p>2 giờ trước</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
