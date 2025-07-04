import CustomButton from "@/components/CustomButton";
import { Carousel, Divider } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef, useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
    IoWarningOutline,
    IoHeartOutline,
    IoShareSocialOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import { PostServices } from "@/services/post";

const images = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/601053bc-52f7-40e7-ad93-7d728d80e3af.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/0e8f5dfe-0323-4d79-891b-49f66a009735.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/3b498001-f1f5-4eab-be76-d86a82af2857.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1397561542042482589/original/80284248-f643-456a-9487-9e73c5994f55.jpeg?im_w=720",
];

const PostDetail = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [post, setPost] = useState<any>(null);
    const carouselRef = useRef<CarouselRef>(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            PostServices.getById(id as string).then((res) => {
                setPost(res.data.metadata);
            });
        }
    }, [id]);

    const goToSlide = (slideIndex: number) => {
        if (!carouselRef.current) return;
        carouselRef.current.goTo(slideIndex);
    };

    // Helper: format price
    const formatPrice = (price: number) => {
        return price?.toLocaleString("vi-VN") + " VND";
    };

    // Helper: get owner avatar
    const getOwnerAvatar = () => {
        if (!post?.owner?.medias?.length) return undefined;
        // Ưu tiên ảnh có purpose là avatar, nếu không lấy ảnh đầu tiên
        const avatar = post.owner.medias.find(
            (m: any) => m.purpose === "avatar"
        );
        return avatar?.url || post.owner.medias[0]?.url;
    };

    // Sắp xếp medias: video trước, ảnh sau
    const sortedMedias = (post?.medias || []).reduce(
        (acc: { videos: any[]; images: any[] }, media: any) => {
            if (media.type?.startsWith("video")) {
                acc.videos.push(media);
            } else if (media.type?.startsWith("image")) {
                acc.images.push(media);
            }
            return acc;
        },
        { videos: [], images: [] }
    );
    const displayMedias = [...sortedMedias.videos, ...sortedMedias.images];

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
                            {displayMedias.map((media: any, idx: number) => (
                                <div
                                    className="h-[350px] w-full"
                                    key={media.id || idx}
                                >
                                    {media.type?.startsWith("video") ? (
                                        <video
                                            src={media.url}
                                            controls
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <img
                                            src={media.url}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    )}
                                </div>
                            ))}
                        </Carousel>
                        <div className="mt-4 flex gap-2">
                            {displayMedias.map((media: any, index: number) => (
                                <div
                                    key={media.id || index}
                                    className={`h-[60px] w-[60px] cursor-pointer overflow-hidden rounded-lg ${index === imageIndex && "border-2 border-red-400"}`}
                                    onClick={() => goToSlide(index)}
                                >
                                    {media.type?.startsWith("video") ? (
                                        <video
                                            src={media.url}
                                            className="h-full w-full object-cover"
                                            style={{ pointerEvents: "none" }}
                                        />
                                    ) : (
                                        <img
                                            src={media.url}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                            ))}
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
                                {post?.title || "Tiêu đề bài đăng"}
                            </h1>
                            <div className="my-4 flex w-full justify-between">
                                <h2 className="text-[1.1rem] font-bold underline">
                                    <span>
                                        {post
                                            ? formatPrice(post.price)
                                            : "1.2 triệu/tháng"}
                                    </span>
                                    <span> · </span>
                                    <span>
                                        {post?.square
                                            ? `${post.square} m²`
                                            : "100 m²"}
                                    </span>
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
                                    <p>
                                        {post?.district?.split("|")[1] ||
                                            "Quận ..."}
                                    </p>
                                    <p>
                                        {post?.city?.split("|")[1] ||
                                            "Tỉnh ..."}
                                    </p>
                                    <p>
                                        {post?.street},{" "}
                                        {post?.ward?.split("|")[1]},{" "}
                                        {post?.district?.split("|")[1]},{" "}
                                        {post?.city?.split("|")[1]}
                                    </p>
                                    <p>#{post?.id?.slice(0, 6) || "Mã tin"}</p>
                                    <p>
                                        {post?.createdAt
                                            ? new Date(
                                                  post.createdAt
                                              ).toLocaleString()
                                            : "Ngày đăng"}
                                    </p>
                                    <p>
                                        {post?.expiredAt
                                            ? new Date(
                                                  post.expiredAt
                                              ).toLocaleString()
                                            : "Ngày hết hạn"}
                                    </p>
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
                                <p>{post?.description}</p>
                                {/* Tiện ích */}
                                {post?.postAmenities?.length > 0 && (
                                    <div>
                                        <b>Tiện ích:</b>
                                        <ul className="list-disc pl-5">
                                            {post.postAmenities.map(
                                                (item: any) => (
                                                    <li key={item.id}>
                                                        {item.amenity?.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
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
                                        src={getOwnerAvatar()}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="">
                                    <h1 className="my-2 font-bold">
                                        {post?.owner?.name ||
                                            "Tên chủ bài đăng"}
                                    </h1>
                                    <p className="text-[0.8rem]">
                                        <span>4 tin đăng</span>
                                        <span> · </span>
                                        <span>Tham gia từ: 05/03/2025</span>
                                    </p>
                                    <div className="mt-2 flex w-full items-center gap-2">
                                        <CustomButton
                                            title={post?.owner?.phone || "SĐT"}
                                            icon={<FaPhoneAlt />}
                                            className="bg-red-500 text-[0.8rem] text-white lg:text-[0.9rem]"
                                        />
                                        <CustomButton
                                            title={post?.owner?.phone || "SĐT"}
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
                                    src={getOwnerAvatar()}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h1 className="my-2 font-bold">
                                {post?.owner?.name || "Tên chủ bài đăng"}
                            </h1>
                            <p className="text-[0.8rem]">
                                <span>4 tin đăng</span>
                                <span> · </span>
                                <span>Tham gia từ: 05/03/2025</span>
                            </p>
                            <div className="mt-2 flex flex-col items-center gap-2 lg:w-1/2">
                                <CustomButton
                                    title={post?.owner?.phone || "SĐT"}
                                    icon={<FaPhoneAlt />}
                                    className="w-full bg-red-500 text-white md:text-[0.8rem] lg:text-[0.9rem]"
                                />
                                <CustomButton
                                    title={post?.owner?.phone || "SĐT"}
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

                            {displayMedias.map((media: any, idx: number) => (
                                <div
                                    className="flex w-full gap-4 p-2"
                                    key={media.id || idx}
                                >
                                    {/* Post's Image */}
                                    <div className="h-[90px] w-[90px] overflow-hidden rounded-lg">
                                        {media.type?.startsWith("video") ? (
                                            <video
                                                src={media.url}
                                                className="h-full w-full object-cover"
                                                style={{
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={media.url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Post's Information */}
                                    <div className="w-2/3">
                                        <h1 className="line-clamp-2 text-[0.9rem]">
                                            {post?.title}
                                        </h1>
                                        <div className="flex w-full justify-between text-[0.8rem]">
                                            <p>
                                                {post
                                                    ? formatPrice(post.price)
                                                    : "1.2 triệu/tháng"}
                                            </p>
                                            <p>
                                                {post?.updatedAt
                                                    ? new Date(
                                                          post.updatedAt
                                                      ).toLocaleString()
                                                    : "2 giờ trước"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
