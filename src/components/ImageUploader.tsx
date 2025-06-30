import { MediaServices } from "@/services/media";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import type { Media } from "@/stores/type";

type Props = {
    imageIds: string[];
    setImageIds: (ids: string[]) => void;
    className?: string;
    defaultImages?: Media[];
};

type LocalImage = {
    previewUrl: string;
    media?: Media;
    loading: boolean;
};

const ImageUploader = ({
    imageIds,
    setImageIds,
    className,
    defaultImages,
}: Props) => {
    const [localImages, setLocalImages] = useState<LocalImage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputClick = () => {
        inputRef.current?.click();
    };

    const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        e.target.value = "";

        for (const file of files) {
            if (!file.type.includes("image")) {
                toast.error("File is not an image", { position: "top-center" });
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size is greater than 10MB", {
                    position: "top-center",
                });
                return;
            }
        }

        const newLocalImages: LocalImage[] = files.map((file) => ({
            previewUrl: URL.createObjectURL(file),
            loading: true,
        }));

        // B1: Thêm trước ảnh local (chưa upload)
        setLocalImages((prev) => [...prev, ...newLocalImages]);

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            const res = await MediaServices.uploadImages(formData);
            if (res.status === 200) {
                const uploaded: Media[] = res.data.metadata;

                // B2: Gộp lại theo đúng thứ tự file & preview
                setLocalImages((prev) => {
                    const oldImages = prev.slice(
                        0,
                        Math.max(0, prev.length - newLocalImages.length)
                    );
                    const updatedNewImages = newLocalImages.map(
                        (local, index) => ({
                            ...local,
                            media: uploaded[index],
                            loading: false,
                        })
                    );
                    return [...oldImages, ...updatedNewImages];
                });

                const newIds = uploaded.map((m) => m.id);
                setImageIds([...(imageIds ?? []), ...newIds]);
            }
        } catch (err) {
            toast.error("Upload thất bại", { position: "top-center" });
            console.error(err);
        }
    };

    const handleDeleteImage = async (previewUrl: string, id?: string) => {
        try {
            setLocalImages((prev) =>
                prev.map((item) =>
                    item.previewUrl === previewUrl
                        ? { ...item, loading: true }
                        : item
                )
            );

            if (id) {
                const res = await MediaServices.deleteFile(id);
                if (res.status !== 200) {
                    throw new Error("Delete failed");
                }
                setImageIds(imageIds.filter((i) => i !== id));
            }

            // Remove from UI
            setLocalImages((prev) =>
                prev.filter((item) => item.previewUrl !== previewUrl)
            );
        } catch (err) {
            toast.error("Xóa ảnh thất bại", { position: "top-center" });
            console.error(err);
        }
    };

    useEffect(() => {
        return () => {
            localImages.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        };
    }, []);

    const initializedRef = useRef(false);

    useEffect(() => {
        if (defaultImages && !initializedRef.current) {
            setLocalImages(
                defaultImages.map((img) => ({
                    previewUrl: img.url,
                    media: img,
                    loading: false,
                }))
            );
            initializedRef.current = true;
        }
    }, [defaultImages]);

    return (
        <div className={`w-full ${className}`}>
            <div className="flex w-full flex-wrap gap-3">
                {localImages &&
                    localImages.map((item) => (
                        <div
                            key={item.previewUrl}
                            className="relative aspect-square w-1/5"
                        >
                            {item.loading && (
                                <div className="absolute top-0 flex aspect-square w-full items-center justify-center bg-white bg-opacity-80">
                                    <Spin
                                        size="large"
                                        indicator={<LoadingOutlined spin />}
                                    />
                                </div>
                            )}
                            <img
                                src={item.previewUrl}
                                alt="preview_image"
                                className="h-full w-full object-contain"
                            />
                            {!item.loading && (
                                <div
                                    className="absolute right-0 top-0 z-10 w-fit -translate-y-1/3 translate-x-1/3 cursor-pointer rounded-full bg-red-500 p-1 transition-all duration-100 hover:bg-red-700"
                                    onClick={() =>
                                        handleDeleteImage(
                                            item.previewUrl,
                                            item.media?.id
                                        )
                                    }
                                >
                                    <IoClose className="text-[0.8rem] text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                <div
                    className="flex aspect-square w-1/5 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 transition-colors duration-100 hover:bg-gray-300"
                    onClick={handleInputClick}
                >
                    <input
                        ref={inputRef}
                        name="files"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleOnChange}
                    />
                    <FaPlus className="text-[1.2rem]" />
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
