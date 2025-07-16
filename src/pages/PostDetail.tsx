/* eslint-disable */
import CustomButton from "@/components/CustomButton";
import { Divider } from "antd";
import { useRef, useState, useEffect } from "react";
import { FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import {
    IoWarningOutline,
    IoHeartOutline,
    IoShareSocialOutline,
} from "react-icons/io5";
import { Modal, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // Handle the selected date here
        console.log("Selected date:", selectedDate);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Function to disable past dates
    const disabledDate = (current: any) => {
        // Can not select days before today
        return current && current < dayjs().startOf("day");
    };

    const onChange: DatePickerProps["onChange"] = (_, dateString) => {
        if (Array.isArray(dateString)) {
            setSelectedDate(dateString[0] || null);
        } else {
            setSelectedDate(dateString || null);
        }
    };

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
                            <h1 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
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
                                    {/* Price and Area Section */}
                                    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {post
                                                        ? formatPrice(
                                                              post.price
                                                          )
                                                        : "1.2 triệu/tháng"}
                                                </span>
                                                <span className="mx-2 text-gray-500">
                                                    •
                                                </span>
                                                <span className="text-lg font-semibold text-gray-700">
                                                    {post?.square
                                                        ? `${post.square} m²`
                                                        : "100 m²"}
                                                </span>
                                            </div>
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                                                Cập nhật: 2 giờ trước
                                            </span>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-3 rounded-lg border p-4">
                                            <h3 className="text-md mb-2 font-semibold text-blue-700">
                                                Thông tin cơ bản
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Mã tin:
                                                    </span>
                                                    <span className="font-medium">
                                                        #
                                                        {post?.id?.slice(
                                                            0,
                                                            6
                                                        ) || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Ngày đăng:
                                                    </span>
                                                    <span className="font-medium">
                                                        {post?.createdAt
                                                            ? new Date(
                                                                  post.createdAt
                                                              ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Hết hạn:
                                                    </span>
                                                    <span className="font-medium">
                                                        {post?.expiredAt
                                                            ? new Date(
                                                                  post.expiredAt
                                                              ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 rounded-lg border p-4">
                                            <h3 className="text-md mb-2 font-semibold text-blue-700">
                                                Địa chỉ
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Địa chỉ:
                                                    </span>
                                                    <span className="text-right font-medium">
                                                        {post?.street ||
                                                            "Đang cập nhật"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Phường/Xã:
                                                    </span>
                                                    <span className="font-medium">
                                                        {post?.ward?.split(
                                                            "|"
                                                        )[1] || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Quận/Huyện:
                                                    </span>
                                                    <span className="font-medium">
                                                        {post?.district?.split(
                                                            "|"
                                                        )[1] || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Tỉnh/Thành:
                                                    </span>
                                                    <span className="font-medium">
                                                        {post?.city?.split(
                                                            "|"
                                                        )[1] || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <Divider />
                        {/* Description */}
                        <div className="w-full rounded-lg border border-blue-100 p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-blue-700">
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
                                <div className="space-y-6">
                                    <div className="prose max-w-none text-gray-700">
                                        {post?.description
                                            ?.split("\n")
                                            .map(
                                                (
                                                    paragraph: string,
                                                    index: number
                                                ) => (
                                                    <p
                                                        key={index}
                                                        className="mb-4 leading-relaxed"
                                                    >
                                                        {paragraph || <br />}
                                                    </p>
                                                )
                                            )}
                                    </div>

                                    {/* Tiện ích */}
                                    {post?.postAmenities?.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="mb-3 text-lg font-semibold text-blue-700">
                                                Tiện ích có sẵn
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                                {post.postAmenities.map(
                                                    (item: any) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center rounded-lg border border-blue-100 bg-white p-3 shadow-sm transition-colors hover:border-blue-300"
                                                        >
                                                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
                                                                <span className="text-lg">
                                                                    ✓
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {
                                                                    item.amenity
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
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
                                <div className="flex aspect-square w-[6rem] items-center justify-center overflow-hidden rounded-full border-2 border-blue-200 bg-blue-100 text-3xl font-bold text-blue-600">
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
                                        title="Đặt lịch xem nhà"
                                        icon={<FaCalendarAlt />}
                                        className="w-full bg-blue-600 text-white hover:bg-blue-700 md:text-[0.9rem] lg:text-[1rem]"
                                        onClick={showModal}
                                    />
                                    <CustomButton
                                        title={post?.owner?.phone || "Liên hệ"}
                                        icon={<FaPhoneAlt />}
                                        className="w-full border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 md:text-[0.9rem] lg:text-[1rem]"
                                    />
                                </div>
                                <Modal
                                    title="Chọn ngày xem nhà"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                >
                                    <div className="flex flex-col items-center py-4">
                                        <DatePicker
                                            onChange={onChange}
                                            className="w-full text-center"
                                            placeholder="Chọn ngày xem nhà"
                                            format="DD/MM/YYYY"
                                            disabledDate={disabledDate}
                                            showToday
                                            allowClear={false}
                                            minDate={dayjs()}
                                            inputReadOnly
                                        />
                                        {selectedDate && (
                                            <p className="mt-4 text-gray-600">
                                                Bạn đã chọn ngày:{" "}
                                                <span className="font-semibold">
                                                    {selectedDate}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </Modal>
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
