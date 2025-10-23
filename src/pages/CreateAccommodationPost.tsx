/* eslint-disable */
import { Button, Input, Card, Row, Col, Divider } from "antd";
import AddressSelector from "@/components/AddressSelector";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import Map, { type Coordinates } from "@/components/Map";
import VideoUploader from "@/components/VideoUploader";
import AmenityCheckBox from "@/components/AmenityCheckBox";
import CategorySelector from "@/components/CategorySelector";
import ReactPlayer from "react-player";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import {
    EnvironmentOutlined,
    FileTextOutlined,
    DollarOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

export type AreaUnit = "m2/phòng" | "m2/căn hộ" | "m2";
export type PriceUnit = "đồng/phòng/tháng" | "đồng/căn hộ/tháng" | "đồng/tháng";

const createRoomFormSchema = z.object({
    province: z.string().min(1),
    district: z.string().min(1),
    ward: z.string().min(1),
    street: z.string().optional(),
    categoryId: z.string().min(1),
    title: z
        .string()
        .nonempty({ message: "Vui lòng nhập tên phòng" })
        .max(100, { message: "Tên phòng không vượt quá 100 kí tự" }),
    description: z
        .string()
        .min(50, { message: "Nội dung miêu tả tối thiếu 50 kí tự" })
        .max(5000, { message: "Nội dung miêu tả tối đa 5000 kí tự" }),
    price: z
        .number({
            required_error: "Giá phòng là bắt buộc",
            invalid_type_error: "Giá phòng phải là số",
        })
        .min(0, { message: "Giá phòng tối thiểu là 0.000đ" }),
    square: z
        .number({
            required_error: "Diện tích là bắt buộc",
            invalid_type_error: "Diện tích phải là số",
        })
        .positive({ message: "Diện tích phải lớn hơn 0" }),
    imageIds: z.array(z.string()).min(1, {
        message: "Phải có ít nhất một ảnh",
    }),
    videoId: z.string().optional(),
    videoUrl: z.string().url().optional(),
    amenityIds: z.array(z.string()).optional(),
});

export type CreateRoomForm = z.infer<typeof createRoomFormSchema>;

interface Props {
    defaultLocation?: Coordinates;
}

const AccommodationPostForm = ({ defaultLocation }: Props) => {
    const [address, setAddress] = useState<string>("");
    const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2/phòng");
    const [priceUnit, setPriceUnit] = useState<PriceUnit>("đồng/phòng/tháng");
    const [location, setLocation] = useState<Coordinates>(
        defaultLocation || { lat: 13.782, lng: 109.2193 }
    );

    const createMutation = useCreatePost();

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CreateRoomForm>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            province: "",
            district: "",
            ward: "",
            street: "",
            categoryId: undefined,
            title: "",
            description: "",
            square: undefined,
            price: undefined,
            imageIds: undefined,
            videoId: undefined,
            videoUrl: undefined,
            amenityIds: undefined,
        },
    });

    const province = watch("province");
    const district = watch("district");
    const ward = watch("ward");
    const street = watch("street");
    const videoUrl = watch("videoUrl");

    const handleOnSubmit = async (data: CreateRoomForm) => {
        const mediaIds = [
            ...(data.imageIds || []),
            ...(data.videoId ? [data.videoId] : []),
        ];

        const { imageIds, videoId, videoUrl, province, ...rest } = data;
        if (!videoUrl?.includes("youtube") && videoUrl) {
            setValue("videoUrl", undefined);
            return;
        }
        const resolvedData = {
            ...rest,
            city: province,
            latitude: location.lat,
            longitude: location.lng,
            mediaIds: mediaIds,
            url: videoUrl,
        };

        createMutation.mutateAsync(resolvedData);
    };

    useEffect(() => {
        setAddress(
            `${street ? `${street}, ` : ""}${ward ? `${ward.split("|")[1]}, ` : ""}${
                district ? `${district.split("|")[1]}, ` : ""
            }${province ? `${province.split("|")[1]}` : ""}`
        );
    }, [province, district, ward, street]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Tạo bài viết mới
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Điền đầy đủ thông tin để tạo bài đăng cho thuê
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    {/* Address Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <EnvironmentOutlined className="text-xl text-blue-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Địa chỉ
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <Row gutter={[16, 16]} className="mb-4">
                            <Col xs={24} md={8}>
                                <Controller
                                    name="province"
                                    control={control}
                                    render={({ field }) => (
                                        <AddressSelector
                                            value={field.value || null}
                                            onChange={field.onChange}
                                            type="province"
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.province && (
                                    <p className="mt-1 text-xs text-red-500">
                                        Vui lòng chọn tỉnh/thành phố
                                    </p>
                                )}
                            </Col>
                            <Col xs={24} md={8}>
                                <Controller
                                    name="district"
                                    control={control}
                                    render={({ field }) => (
                                        <AddressSelector
                                            value={field.value}
                                            provinceCode={
                                                province?.split("|")?.[0]
                                            }
                                            onChange={field.onChange}
                                            type="district"
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.district && (
                                    <p className="mt-1 text-xs text-red-500">
                                        Vui lòng chọn quận/huyện
                                    </p>
                                )}
                            </Col>
                            <Col xs={24} md={8}>
                                <Controller
                                    name="ward"
                                    control={control}
                                    render={({ field }) => (
                                        <AddressSelector
                                            value={field.value}
                                            districtCode={
                                                district?.split("|")?.[0]
                                            }
                                            onChange={field.onChange}
                                            type="ward"
                                            className="w-full"
                                        />
                                    )}
                                />
                                {errors.ward && (
                                    <p className="mt-1 text-xs text-red-500">
                                        Vui lòng chọn phường/xã
                                    </p>
                                )}
                            </Col>
                        </Row>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tên đường, số nhà...
                            </label>
                            <Controller
                                name="street"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        size="large"
                                        placeholder="Ví dụ: 123 Nguyễn Văn A"
                                    />
                                )}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Địa chỉ cụ thể
                            </label>
                            <Input
                                value={address}
                                disabled
                                size="large"
                                className="bg-gray-50"
                            />
                        </div>

                        <div className="h-[400px] w-full overflow-hidden rounded-lg">
                            <Map address={address} onChange={setLocation} />
                        </div>
                    </Card>

                    {/* Category Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <AppstoreOutlined className="text-xl text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Chuyên mục
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <CategorySelector
                                    {...field}
                                    setAreaUnit={setAreaUnit}
                                    setPriceUnit={setPriceUnit}
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.categoryId && (
                            <p className="mt-1 text-xs text-red-500">
                                Vui lòng chọn loại chuyên mục
                            </p>
                        )}
                    </Card>

                    {/* Description Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                                <FileTextOutlined className="text-xl text-purple-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Thông tin mô tả
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Tiêu đề <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input.TextArea
                                        {...field}
                                        id="title"
                                        size="large"
                                        placeholder="Ví dụ: Cho thuê phòng trọ đầy đủ tiện nghi..."
                                        rows={3}
                                    />
                                )}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <Row gutter={16} className="mb-4">
                            <Col xs={24} md={12}>
                                <label
                                    htmlFor="square"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Diện tích{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="square"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="square"
                                            size="large"
                                            type="number"
                                            placeholder="Nhập diện tích"
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            addonAfter={
                                                areaUnit === "m2/phòng"
                                                    ? "m²/phòng"
                                                    : areaUnit === "m2"
                                                      ? "m²"
                                                      : "m²/căn hộ"
                                            }
                                        />
                                    )}
                                />
                                {errors.square && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.square.message}
                                    </p>
                                )}
                            </Col>
                            <Col xs={24} md={12}>
                                <label
                                    htmlFor="price"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Giá <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="price"
                                            size="large"
                                            type="number"
                                            placeholder="Nhập giá"
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            addonAfter={priceUnit}
                                            prefix={<DollarOutlined />}
                                        />
                                    )}
                                />
                                {errors.price && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}
                            </Col>
                        </Row>

                        <div>
                            <label
                                htmlFor="descriptions"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Nội dung mô tả{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Input.TextArea
                                        {...field}
                                        id="descriptions"
                                        placeholder="Mô tả chi tiết về phòng trọ..."
                                        showCount
                                        maxLength={5000}
                                        rows={8}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </Card>

                    {/* Amenity Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                <CheckCircleOutlined className="text-xl text-orange-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Tiện ích
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <Controller
                            control={control}
                            name="amenityIds"
                            render={({ field }) => (
                                <AmenityCheckBox
                                    amentites={field.value ?? []}
                                    setAmenities={field.onChange}
                                />
                            )}
                        />
                    </Card>

                    {/* Images Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                                <PictureOutlined className="text-xl text-pink-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Hình ảnh
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <Controller
                            control={control}
                            name="imageIds"
                            render={({ field }) => (
                                <ImageUploader
                                    imageIds={field.value}
                                    setImageIds={field.onChange}
                                />
                            )}
                        />
                        {errors.imageIds && (
                            <p className="mt-2 text-xs text-red-500">
                                Cần ít nhất 1 ảnh
                            </p>
                        )}
                    </Card>

                    {/* Video Section */}
                    <Card className="mb-6 shadow-md">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                <VideoCameraOutlined className="text-xl text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Video
                            </h2>
                        </div>
                        <Divider className="my-4" />

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Video link (Youtube/TikTok)
                            </label>
                            <Controller
                                name="videoUrl"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        size="large"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        onChange={(e) => {
                                            e.target.value.trim() === ""
                                                ? field.onChange(undefined)
                                                : field.onChange(
                                                      e.target.value
                                                  );
                                        }}
                                    />
                                )}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                <span className="font-semibold">Lưu ý:</span>{" "}
                                Bạn có thể chọn video từ Youtube để hiển thị
                                trên bài viết của mình.
                            </p>

                            {videoUrl && videoUrl.includes("youtube") && (
                                <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
                                    <ReactPlayer
                                        src={videoUrl}
                                        controls
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Hoặc
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tải video từ thiết bị
                            </label>
                            <Controller
                                name="videoId"
                                control={control}
                                render={({ field }) => (
                                    <VideoUploader
                                        videoId={field.value ?? ""}
                                        setVideoId={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button
                            size="large"
                            onClick={() => window.history.back()}
                        >
                            Hủy
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={createMutation.isPending}
                            className="min-w-[150px]"
                        >
                            Tạo bài viết
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccommodationPostForm;
