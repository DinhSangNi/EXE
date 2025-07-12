/* eslint-disable */
import CustomButton from "@/components/CustomButton";
import { Divider } from "antd";
// import type { CarouselRef } from "antd/es/carousel";
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

const PostDetail = () => {
    const [post, setPost] = useState<any>(null);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    // const carouselRef = useRef<CarouselRef>(null);
    const { id } = useParams();
    const modalRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            PostServices.getById(id as string)
                .then((res) => {
                    setPost(res.data.metadata);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    // Đóng modal khi nhấn phím Esc
    useEffect(() => {
        if (!showGallery) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowGallery(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showGallery]);

    // const goToSlide = (slideIndex: number) => {
    //     if (!carouselRef.current) return;
    //     carouselRef.current.goTo(slideIndex);
    // };

    // Helper: format price
    const formatPrice = (price: number) => {
        return price?.toLocaleString("vi-VN") + " VND";
    };

    // Helper: get owner avatar
    // const getOwnerAvatar = () => {
    //     if (!post?.owner?.medias?.length) return undefined;
    //     // Ưu tiên ảnh có purpose là avatar, nếu không lấy ảnh đầu tiên
    //     const avatar = post.owner.medias.find(
    //         (m: any) => m.purpose === "avatar"
    //     );
    //     return avatar?.url || post.owner.medias[0]?.url;
    // };

    // Sắp xếp medias: video trước, ảnh sau
    // const sortedMedias = (post?.medias || []).reduce(
    //     (acc: { videos: any[]; images: any[] }, media: any) => {
    //         if (media.type?.startsWith("video")) {
    //             acc.videos.push(media);
    //         } else if (media.type?.startsWith("image")) {
    //             acc.images.push(media);
    //         }
    //         return acc;
    //     },
    //     { videos: [], images: [] }
    // );

    // Gallery images
    const galleryImages = post?.medias || [];
    const showOverlay = galleryImages.length > 3;
    const rightImages = galleryImages.slice(1, 3);
    const overlayCount = galleryImages.length - 3;

    return (
        <>
            {/* Modal xem gallery */}
            {showGallery && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowGallery(false);
                    }}
                >
                    <div
                        ref={modalRef}
                        className="relative flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={galleryImages[galleryIndex]?.url}
                            alt="Ảnh phóng to"
                            className="mx-auto rounded-xl object-contain"
                            style={{
                                maxHeight: "80vh",
                                width: "auto",
                                height: "auto",
                                maxWidth: "100vw",
                                display: "block",
                            }}
                        />
                        <div className="mt-4 flex gap-2">
                            {galleryImages.map((img: any, idx: number) => (
                                <img
                                    key={img.id || idx}
                                    src={img.url}
                                    alt="thumb"
                                    className={`h-16 w-16 cursor-pointer rounded border object-cover ${galleryIndex === idx ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => setGalleryIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full">
                <div className="mx-auto mt-10 w-full max-w-7xl px-4">
                    {loading ? (
                        <>
                            <div className="animate-pulse">
                                <div className="mb-4 h-8 w-1/2 rounded bg-gray-200" />
                                <div className="flex h-[400px] w-full justify-center gap-4">
                                    <div className="h-full flex-[3] overflow-hidden rounded-xl bg-gray-200" />
                                    <div className="flex h-full flex-[2] flex-col gap-4">
                                        <div className="w-full flex-1 overflow-hidden rounded-xl bg-gray-200" />
                                        <div className="w-full flex-1 overflow-hidden rounded-xl bg-gray-200" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="mb-4 text-2xl font-bold">
                                {post?.title || "Tiêu đề bài đăng"}
                            </h1>
                            <div className="flex h-[400px] w-full justify-center gap-4">
                                {/* Ảnh lớn bên trái */}
                                <div className="h-full flex-[3] overflow-hidden rounded-xl">
                                    {galleryImages[0] && (
                                        <img
                                            src={galleryImages[0].url}
                                            alt="Ảnh phòng trọ lớn"
                                            className="h-full w-full object-cover"
                                            onClick={() => {
                                                setShowGallery(true);
                                                setGalleryIndex(0);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        />
                                    )}
                                </div>
                                {/* 2 ảnh nhỏ bên phải */}
                                <div className="flex h-full flex-[2] flex-col gap-4">
                                    {rightImages.map(
                                        (img: any, idx: number) => (
                                            <div
                                                key={img.id || idx}
                                                className="relative w-full flex-1 overflow-hidden rounded-xl"
                                                style={{
                                                    height: "calc(50% - 0.5rem)",
                                                }}
                                                onClick={() => {
                                                    setShowGallery(true);
                                                    setGalleryIndex(idx + 1);
                                                }}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt="Ảnh phòng trọ nhỏ"
                                                    className="h-full w-full object-cover"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                />
                                                {showOverlay &&
                                                    idx ===
                                                        rightImages.length -
                                                            1 && (
                                                        <div
                                                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black bg-opacity-50 text-2xl font-bold text-white"
                                                            onClick={() => {
                                                                setShowGallery(
                                                                    true
                                                                );
                                                                setGalleryIndex(
                                                                    idx + 2
                                                                );
                                                            }}
                                                        >
                                                            +{overlayCount}
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* Main content */}
                <div className="mx-auto mt-10 flex w-full max-w-7xl gap-8 px-4">
                    {/* Left: Thông tin bài đăng */}
                    <div className="w-3/5">
                        {/* Thông tin giá, diện tích, địa chỉ, mô tả... */}
                        <div className="mt-6 w-full">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-6 w-1/3 rounded bg-gray-200" />
                                    <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                                    <div className="h-4 w-1/4 rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                                </div>
                            ) : (
                                <>
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
                                                {post?.district?.split(
                                                    "|"
                                                )[1] || "Quận ..."}
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
                                            <p>
                                                #
                                                {post?.id?.slice(0, 6) ||
                                                    "Mã tin"}
                                            </p>
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
                                </>
                            )}
                        </div>
                        <Divider />
                        {/* Description */}
                        <div className="w-full">
                            <h2 className="my-2 text-[1.1rem] font-bold">
                                Thông tin mô tả
                            </h2>
                            {loading ? (
                                <div className="animate-pulse space-y-3">
                                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                                </div>
                            ) : (
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
                            )}
                        </div>
                    </div>
                    {/* Right: Thông tin chủ trọ */}
                    <div className="w-2/5">
                        {loading ? (
                            <div className="flex animate-pulse flex-col items-center space-y-4 rounded-xl bg-white p-4 shadow-xl">
                                <div className="aspect-square w-[6rem] rounded-full bg-gray-200" />
                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                                <div className="h-3 w-1/3 rounded bg-gray-200" />
                                <div className="h-8 w-full rounded bg-gray-200" />
                                <div className="h-8 w-full rounded bg-gray-200" />
                                <div className="h-4 w-1/2 rounded bg-gray-200" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-xl">
                                <div className="flex aspect-square w-[6rem] items-center justify-center overflow-hidden rounded-full bg-blue-200 text-3xl font-bold text-white">
                                    {post?.owner?.name?.[0] || "S"}
                                </div>
                                <h1 className="my-2 font-bold">
                                    {post?.owner?.name || "Tên chủ bài đăng"}
                                </h1>
                                <p className="text-[0.8rem]">
                                    <span>4 tin đăng</span>
                                    <span> · </span>
                                    <span>Tham gia từ: 05/03/2025</span>
                                </p>
                                <div className="mt-2 flex w-full flex-col items-center gap-2">
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
                                <div className="mt-4 flex w-full justify-between text-[0.7rem] lg:text-[0.8rem]">
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
