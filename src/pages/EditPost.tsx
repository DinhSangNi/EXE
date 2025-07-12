/* eslint-disable */
import { Button, Divider, Input } from "antd";
import AddressSelector from "../components/AddressSelector";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ImageUploader from "../components/ImageUploader";
import { type Coordinates } from "../components/Map";
import VideoUploader from "../components/VideoUploader";
import AmenityCheckBox from "../components/AmenityCheckBox";
import { toast } from "react-toastify";
import { PostServices } from "@/services/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/stores/type";
import { useNavigate, useParams } from "react-router-dom";
import CategorySelector from "../components/CategorySelector";
import { resolveAddress } from "@/utils/format";
import ReactPlayer from "react-player";

export type Address = {
    province: string;
    district: string;
    ward: string;
    street: string;
};

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
        .nonempty({
            message: "Vui lòng nhập tên phòng",
        })
        .max(100, {
            message: "Tên phòng không vượt quá 100 kí tự",
        }),
    description: z
        .string()
        .min(50, {
            message: "Nội dung miêu tả tối thiếu 50 kí tự",
        })
        .max(5000, {
            message: "Nội dung miêu tả tối đa 50 kí tự",
        }),
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

export type CreateRoomForm = {
    province: string;
    district: string;
    ward: string;
    street?: string;
    categoryId: string;
    title: string;
    description: string;
    square: number;
    price: number;
    imageIds: string[];
    videoId?: string;
    videoUrl?: string;
    amenityIds?: string[];
};

const EditPost = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [address, setAddress] = useState<string>("");
    const [areaUnit, setAreaUnit] = useState<AreaUnit>("m2/phòng");
    const [priceUnit, setPriceUnit] = useState<PriceUnit>("đồng/phòng/tháng");
    const [location, setLocation] = useState<Coordinates>({
        lat: 13.782,
        lng: 109.2193,
    });
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors, dirtyFields },
        watch,
        reset,
        setValue,
        setError,
    } = useForm<CreateRoomForm>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            province: "",
            district: "",
            ward: "",
            street: "",
            categoryId: "",
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

    const { data: post, isSuccess } = useQuery({
        queryKey: ["posts", id],
        queryFn: async (): Promise<Post> => {
            const res = await PostServices.getById(id as string);
            return res.data.metadata;
        },
        // staleTime: 3 * 60 * 1000,
    });
    const updateMutation = useMutation({
        mutationFn: async (payload: Partial<CreateRoomForm>) => {
            return await PostServices.update(id as string, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
            toast.success("Đã tạo bài đăng thành công !");
            navigate("/host/posts");
        },
        onError: () => {
            toast.error("Tạo bài đăng không thành công !");
        },
    });

    const province = watch("province");
    const district = watch("district");
    const ward = watch("ward");
    const street = watch("street");
    const videoUrl = watch("videoUrl");

    const handleOnSubmit = async (formData: CreateRoomForm) => {
        const changedFields = Object.keys(dirtyFields).reduce((result, key) => {
            const k = key as keyof CreateRoomForm;
            result[k] = formData[k] as CreateRoomForm[typeof k];
            return result;
        }, {} as Partial<CreateRoomForm>);

        const { imageIds, videoId, videoUrl, province, ...restChanged } =
            changedFields;

        const isYouTubeUrl = (url: string) => {
            return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(
                url
            );
        };

        if (!videoUrl || !isYouTubeUrl(videoUrl)) {
            setError("videoUrl", {
                message: "Link video phải là video YouTube hợp lệ!",
            });
            return;
        }

        const resolvedChangedData = {
            ...restChanged,
            ...(province && { city: province }),
            ...(location && {
                latitude: location.lat,
                longitude: location.lng,
            }),
            ...(videoUrl && { url: videoUrl }),
            ...(imageIds || videoId
                ? {
                      mediaIds: [
                          ...(imageIds || []),
                          ...(videoId ? [videoId] : []),
                      ],
                  }
                : {}),
        };

        updateMutation.mutateAsync(resolvedChangedData);

        // console.log("changedFields: ", changedFields);
        // console.log("resolvedChangedData: ", resolvedChangedData);
        // console.log("data: ", resolvedChangedData);
    };

    useEffect(() => {
        setAddress(resolveAddress(province, district, ward, street ?? ""));
    }, [province, district, ward, street]);

    useEffect(() => {
        if (isSuccess && post) {
            console.log("post: ", post);
            console.log(
                "url: ",
                post.medias.filter((item) => item.type.includes("video"))?.[0]
                    ?.url ?? undefined
            );
            reset({
                province: post.city,
                district: post.district,
                ward: post.ward,
                street: post.street,
                categoryId: post.category.id,
                title: post.title,
                description: post.description,
                square: post.square,
                price: post.price,
                imageIds: post.medias.map((item) => {
                    if (item.type.includes("image")) {
                        return item.id;
                    }
                }),
                videoId:
                    post.medias.filter((item) =>
                        item.type.includes("video/")
                    )?.[0]?.id ?? undefined,
                videoUrl:
                    post.medias.filter((item) =>
                        item.type.includes("video")
                    )?.[0]?.url ?? undefined,
                amenityIds: post.postAmenities.map((item) => item.amenity.id),
            });
            setLocation({
                lat: post.latitude,
                lng: post.longitude,
            });
        }
    }, [isSuccess, post]);

    console.log("videoUrl: ", videoUrl);

    // if (isLoading)
    //     return (
    //         <div className="mx-auto flex min-h-screen w-3/4 items-center pb-8 pt-4">
    //             <Spinner className="h-[100px] w-[100px]" />
    //         </div>
    //     );

    return (
        <>
            <div className="mx-auto min-h-screen w-3/4 pb-8 pt-4">
                <h1 className="text-[1.4rem] font-bold">
                    Chỉnh sửa bài đăng: {id}
                </h1>
                <Divider />
                <div className="">
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        {/* Address */}
                        <div className="mb-8 w-full">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Địa chỉ
                            </h1>
                            <div className="mb-4 flex w-full flex-wrap justify-between gap-4">
                                <div>
                                    <Controller
                                        name="province"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <AddressSelector
                                                    value={
                                                        field.value
                                                            ? field.value
                                                            : null
                                                    }
                                                    onChange={(
                                                        value: string
                                                    ) => {
                                                        field.onChange(value);
                                                        setValue(
                                                            "district",
                                                            ""
                                                        );
                                                        setValue("ward", "");
                                                    }}
                                                    type="province"
                                                    className="w-1/4 text-[0.9rem]"
                                                />
                                            );
                                        }}
                                    />
                                    {errors.province && (
                                        <p className="text-[0.8rem] text-red-500">
                                            Vui lòng chọn tỉnh/thành phố
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name="district"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <AddressSelector
                                                    value={field.value}
                                                    provinceCode={
                                                        province?.split(
                                                            "|"
                                                        )?.[0]
                                                    }
                                                    onChange={(
                                                        value: string
                                                    ) => {
                                                        field.onChange(value);
                                                        // setValue("ward", "");
                                                    }}
                                                    type="district"
                                                    className="w-1/4 text-[0.9rem]"
                                                />
                                            );
                                        }}
                                    />
                                    {errors.district && (
                                        <p className="text-[0.8rem] text-red-500">
                                            Vui lòng chọn quận/huyện
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name="ward"
                                        control={control}
                                        render={({ field }) => (
                                            <AddressSelector
                                                value={field.value}
                                                districtCode={
                                                    district?.split("|")?.[0]
                                                }
                                                onChange={(value: string) =>
                                                    field.onChange(value)
                                                }
                                                type="ward"
                                                className="w-1/4 text-[0.9rem]"
                                            />
                                        )}
                                    />
                                    {errors.ward && (
                                        <p className="text-[0.8rem] text-red-500">
                                            Vui lòng chọn phường/xã
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 w-full">
                                <h1 className="mb-1 text-[0.9rem]">
                                    Tên đường, số nhà, ...
                                </h1>
                                <Controller
                                    name="street"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                {...field}
                                                type="text"
                                                value={field.value}
                                                placeholder="Nhập tên đường, số nhà...."
                                                onChange={field.onChange}
                                                className="w-full text-[0.9rem]"
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <h1 className="mb-1 text-[0.9rem]">
                                    Địa chỉ chính xác
                                </h1>
                                <Input
                                    value={address}
                                    type="text"
                                    disabled
                                    className="w-full text-[0.9rem]"
                                />
                            </div>
                            {/* Map */}
                            <div className="w-full">
                                <h1 className="mb-1 text-[0.9rem]">Bản đồ</h1>
                                <div className="h-[300px] w-full">
                                    {/* <Map
                                        lat={location.lat}
                                        lng={location.lng}
                                        address={address}
                                        onChange={setLocation}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        {/* Category */}
                        <div className="mb-8 w-full">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Chuyên mục
                            </h1>
                            {/* Property type */}
                            <div className="mb-4">
                                <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <CategorySelector
                                                {...field}
                                                value={field.value}
                                                className="w-1/3 text-[0.9rem]"
                                                onChange={field.onChange}
                                                setAreaUnit={setAreaUnit}
                                                setPriceUnit={setPriceUnit}
                                            />
                                        );
                                    }}
                                />
                                {errors.categoryId && (
                                    <p className="text-[0.8rem] text-red-500">
                                        Vui lòng chọn loại nhà cho thuê
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Description */}
                        <div className="mb-8 w-full">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Thông tin mô tả
                            </h1>
                            {/* Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="mb-1 text-[0.9rem]"
                                >
                                    Tên
                                </label>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input.TextArea
                                                placeholder="Tên bài đăng...."
                                                id="title"
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                {errors.title && (
                                    <p className="text-[0.8rem] text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            {/* Square */}
                            <div className="mb-4">
                                <label
                                    htmlFor="square"
                                    className="mb-1 text-[0.9rem]"
                                >
                                    Diện tích
                                </label>
                                <Controller
                                    name="square"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                {...field}
                                                placeholder="Diện tích..."
                                                id="square"
                                                onChange={(e) => {
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    );
                                                }}
                                                addonAfter={
                                                    areaUnit === "m2/phòng"
                                                        ? "m²/phòng"
                                                        : areaUnit === "m2"
                                                          ? "m²"
                                                          : "m²/căn hộ"
                                                }
                                            />
                                        );
                                    }}
                                />
                                {errors.square && (
                                    <p className="text-[0.8rem] text-red-500">
                                        {errors.square.message}
                                    </p>
                                )}
                            </div>
                            {/* Price */}
                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="mb-1 text-[0.9rem]"
                                >
                                    Giá
                                </label>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input
                                                value={field.value}
                                                placeholder="Giá..."
                                                id="price"
                                                onChange={(e) => {
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    );
                                                }}
                                                addonAfter={priceUnit}
                                            />
                                        );
                                    }}
                                />
                                {errors.price && (
                                    <p className="text-[0.8rem] text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="descriptions"
                                    className="text-[0.9rem]"
                                >
                                    Nội dung mô tả
                                </label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Input.TextArea
                                                id="descriptions"
                                                placeholder="Nội dung mô tả..."
                                                showCount
                                                maxLength={5000}
                                                {...field}
                                                className="min-h-[200px]"
                                            />
                                        );
                                    }}
                                />
                                {errors.description && (
                                    <p className="text-[0.8rem] text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Amenity */}
                        <div className="mb-8">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Tiện ích
                            </h1>
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
                            {errors.amenityIds && (
                                <p className="text-[0.8rem] text-red-500">
                                    Vui lòng chọn loại hình cho thuê
                                </p>
                            )}
                        </div>
                        {/* Image */}
                        <div className="mb-8 w-full">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Hình ảnh
                            </h1>
                            <Controller
                                control={control}
                                name="imageIds"
                                render={({ field }) => (
                                    <ImageUploader
                                        defaultImages={post?.medias.filter(
                                            (item) =>
                                                item.type.includes("image")
                                        )}
                                        imageIds={field.value}
                                        setImageIds={field.onChange}
                                    />
                                )}
                            />
                            {errors.imageIds && (
                                <p className="text-[0.8rem] text-red-500">
                                    Cần ít nhất 1 ảnh
                                </p>
                            )}
                        </div>
                        {/* Video */}
                        <div className="mb-8 w-full">
                            <h1 className="mb-4 text-[1.2rem] font-bold">
                                Video
                            </h1>
                            {/* Video Url */}
                            <div className="text-[0.9rem]">
                                <p className="mb-4">{`Video link (youtube/tiktok)`}</p>
                                <Controller
                                    name="videoUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                e.target.value.trim() === ""
                                                    ? field.onChange(undefined)
                                                    : field.onChange(
                                                          e.target.value
                                                      );
                                            }}
                                            placeholder="video link..."
                                        />
                                    )}
                                />
                                {errors.videoUrl && (
                                    <p className="text-[0.8rem] text-red-500">
                                        {errors.videoUrl?.message}
                                    </p>
                                )}
                                <p className="mt-4">
                                    <span className="font-bold">Lưu ý:</span>{" "}
                                    Bạn có thể chọn video từ Youtube để hiển thị
                                    trên bài viết của mình.
                                </p>
                                {videoUrl && videoUrl.includes("youtube") && (
                                    <div className="aspect-video w-full">
                                        <ReactPlayer
                                            src={videoUrl}
                                            controls
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                )}
                            </div>

                            <p className="my-6 text-[0.7rem]">Hoặc</p>
                            {/* Video File */}
                            <Controller
                                name="videoId"
                                control={control}
                                render={({ field }) => (
                                    <VideoUploader
                                        defaultVideo={
                                            post?.medias.filter((item) =>
                                                item.type.includes("video/")
                                            )[0]
                                        }
                                        videoId={field.value ?? ""}
                                        setVideoId={field.onChange}
                                    />
                                )}
                            />
                            {errors.videoId && (
                                <p className="text-[0.8rem] text-red-500">
                                    Vui lòng chọn loại hình cho thuê
                                </p>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <Button
                                variant="solid"
                                color="blue"
                                htmlType="submit"
                                loading={updateMutation.isPending}
                            >
                                Lưu thay đổi
                            </Button>
                            <Button
                                variant="solid"
                                color="orange"
                                onClick={() => navigate(-1)}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditPost;
