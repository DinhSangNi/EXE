/* eslint-disable */
import CustomButton from "@/components/CustomButton";
import { ConfigProvider, Divider, Popconfirm } from "antd";
import { useRef, useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
    IoWarningOutline,
    IoHeartOutline,
    IoShareSocialOutline,
} from "react-icons/io5";
import { Modal, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { usePostById } from "@/hooks/posts/usePostById";
import {
    formatPostDate,
    formatToVietnamTime,
    resolveAddress,
} from "@/utils/format";
import type { Media, PostAmenities } from "@/stores/type";
import Map from "@/components/Map";
import "dayjs/locale/vi";
import enUS from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";
import useCreateAppointment from "@/hooks/appointment/useCreateAppointment";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import useAppointmentByPostId from "@/hooks/appointment/useAppointmentByPostId";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";

dayjs.locale("vi");

const viVN = {
    ...enUS,
    DatePicker: {
        ...enUS.DatePicker,
        lang: {
            ...enUS.DatePicker?.lang,
            locale: "vi",
            rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
            today: "Hôm nay",
            now: "Bây giờ",
            ok: "OK",
            clear: "Xóa",
            month: "Tháng",
            year: "Năm",
        },
    },
};

const PostDetail = () => {
    const storedUser = useSelector((state: RootState) => state.user);

    const [showGallery, setShowGallery] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    // const carouselRef = useRef<CarouselRef>(null);
    const { id } = useParams();
    const { data: post, isLoading } = usePostById(id as string);
    const { data: appointment } = useAppointmentByPostId(id as string);
    const { mutate: createAppointment } = useCreateAppointment();
    const { mutate: updateAppointment } = useUpdateAppointment();
    const modalRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (selectedDate) {
            createAppointment({
                appointmentDateTime: selectedDate.toISOString(),
                hostId: post?.owner?.id as string,
                postId: post?.id as string,
            });
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancelAppointment = () => {
        if (!appointment) return;
        updateAppointment({
            id: appointment.id,
            updateAppointmentDto: {
                status: "cancelled",
            },
        });
    };

    // Function to disable past dates
    const disabledDate = (current: any) => {
        // Can not select days before today
        return current && current < dayjs().startOf("day");
    };

    const onChange: DatePickerProps["onChange"] = (date) => {
        setSelectedDate(date || null);
    };

    // Đóng modal khi nhấn phím Esc
    useEffect(() => {
        if (!showGallery) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowGallery(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showGallery]);

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

    // Get avatar
    const avatar =
        post?.owner?.medias?.find((media: Media) => media.purpose === "avatar")
            ?.url || undefined;

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
                    {isLoading ? (
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
                            {isLoading ? (
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
                                                        : "N/A"}
                                                </span>
                                                <span className="mx-2 text-gray-500">
                                                    •
                                                </span>
                                                <span className="text-lg font-semibold text-gray-700">
                                                    {post?.square
                                                        ? `${post.square} m²`
                                                        : "N/A"}
                                                </span>
                                            </div>
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                                                {formatPostDate(
                                                    post?.expiredAt || ""
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Property Details */}
                                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-3 rounded-lg border bg-white p-4 shadow-md">
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

                                        <div className="space-y-3 rounded-lg border bg-white p-4 shadow-md">
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
                        <div className="w-full rounded-lg border border-blue-100 bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-xl font-bold text-blue-700">
                                Thông tin mô tả
                            </h2>
                            {isLoading ? (
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
                                    {post?.postAmenities && (
                                        <div className="mt-6">
                                            <h3 className="mb-3 text-lg font-semibold text-blue-700">
                                                Tiện ích có sẵn
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                                {post.postAmenities.map(
                                                    (item: PostAmenities) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center rounded-lg border border-blue-100 bg-white p-2 shadow-sm transition-colors hover:border-blue-300"
                                                        >
                                                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
                                                                <span className="text-md">
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

                        {/* Map */}
                        <div className="mt-6 w-full rounded-lg border border-blue-100 bg-white p-6 shadow-md">
                            <h3 className="mb-3 text-lg font-semibold text-blue-700">
                                Vị trí và bản đồ
                            </h3>
                            <div className="mt-4 h-72 w-full">
                                <Map
                                    lat={post?.latitude}
                                    lng={post?.longitude}
                                    address={resolveAddress(
                                        post?.city || "",
                                        post?.district || "",
                                        post?.ward || "",
                                        post?.street || ""
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Right: Thông tin chủ bài đăng */}
                    <div className="w-2/5">
                        {isLoading ? (
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
                                {/* Avatar của chủ bài đăng */}
                                <div className="flex aspect-square w-[6rem] overflow-hidden rounded-full">
                                    {avatar ? (
                                        <img
                                            className="h-full w-full object-cover"
                                            src={avatar}
                                            alt="User's Avatar"
                                        />
                                    ) : (
                                        <p className="flex h-full w-full items-center justify-center bg-blue-100 text-3xl font-bold text-blue-600">
                                            {post?.owner?.name?.[0]}
                                        </p>
                                    )}
                                </div>
                                {/* Tên chủ bài đăng */}
                                <h1 className="my-2 font-bold">
                                    {post?.owner?.name}
                                </h1>
                                <p className="text-[0.8rem]">
                                    <span>4 tin đăng</span>
                                    <span> · </span>
                                    <span>
                                        Tham gia từ:{" "}
                                        {post?.createdAt
                                            ? formatPostDate(post?.createdAt)
                                            : "N/A"}
                                    </span>
                                </p>
                                {post?.owner?.id !== storedUser.id && (
                                    <div className="mt-2 flex w-full flex-col items-center gap-2">
                                        {!appointment ? (
                                            <CustomButton
                                                title="Đặt lịch xem nhà"
                                                icon={<FaCalendarAlt />}
                                                className="w-full bg-blue-600 text-white hover:bg-blue-700 md:text-[0.9rem] lg:text-[1rem]"
                                                onClick={showModal}
                                            />
                                        ) : appointment.status ===
                                          "confirmed" ? (
                                            <p>
                                                Đã hẹn lúc{" "}
                                                {formatToVietnamTime(
                                                    appointment.appointmentDateTime
                                                )}
                                            </p>
                                        ) : appointment.status === "pending" ? (
                                            <div>
                                                <p className="mb-4 font-bold text-yellow-500">
                                                    Lịch hẹn lúc{" "}
                                                    {formatToVietnamTime(
                                                        appointment.appointmentDateTime
                                                    )}{" "}
                                                    đang chờ duyệt
                                                </p>
                                                <Popconfirm
                                                    title="Hủy lịch hẹn"
                                                    description="Bạn chắc chắn hủy lịch hẹn?"
                                                    okText="Hủy"
                                                    cancelText="Không"
                                                    onConfirm={
                                                        handleCancelAppointment
                                                    }
                                                >
                                                    <CustomButton
                                                        title="Hủy lịch hẹn"
                                                        className="w-full bg-yellow-600 text-white hover:bg-yellow-800 md:text-[0.9rem] lg:text-[1rem]"
                                                    />
                                                </Popconfirm>
                                            </div>
                                        ) : (
                                            <CustomButton
                                                title="Đặt lịch xem nhà"
                                                icon={<FaCalendarAlt />}
                                                className="w-full bg-blue-600 text-white hover:bg-blue-700 md:text-[0.9rem] lg:text-[1rem]"
                                                onClick={showModal}
                                            />
                                        )}
                                    </div>
                                )}
                                <Modal
                                    title="Đăt lịch xem nhà"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                >
                                    <div className="flex flex-col items-center py-4">
                                        <ConfigProvider locale={viVN as Locale}>
                                            <DatePicker
                                                className="w-full border border-gray-500"
                                                onChange={onChange}
                                                placeholder="Chọn ngày xem nhà"
                                                format="DD/MM/YYYY HH:mm"
                                                disabledDate={disabledDate}
                                                showTime={{ format: "HH:mm" }}
                                                allowClear={true}
                                                minDate={dayjs()}
                                                inputReadOnly
                                            />
                                        </ConfigProvider>
                                        {selectedDate && (
                                            <p className="mt-4 text-gray-600">
                                                Bạn đã chọn ngày:{" "}
                                                <span className="font-semibold">
                                                    {selectedDate.format(
                                                        "DD/MM/YYYY HH:mm"
                                                    )}
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
