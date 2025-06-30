import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { MediaServices } from "@/services/media";
import type { Media } from "@/stores/type";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IoClose } from "react-icons/io5";

type Props = {
    videoId: string;
    setVideoId: (id: string | undefined) => void;
    className?: string;
    defaultVideo?: Media;
};

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const VideoUploader = ({
    videoId,
    setVideoId,
    className,
    defaultVideo,
}: Props) => {
    // const [videoFile, setVideoFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (!inputRef.current) return;
        inputRef.current?.click();
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            setLoading(true);
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) {
                toast.error("File được yêu cầu !");
                return;
            }
            if (file.size > MAX_VIDEO_SIZE) {
                toast.error("Dung lượng video không vượt quá 100MB !");
                return;
            }
            if (!file.type.includes("video")) {
                toast.error("File tải lên phải là video !");
                return;
            }
            setPreview(URL.createObjectURL(file));
            const res = await MediaServices.uploadMediaFromFile(file);
            if (res.status === 200) {
                const uploadedMedia: Media = res.data.metadata;
                toast.success("Tải video lên thành công !");
                setVideoId(uploadedMedia.id);
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error("không thể tải video !");
            setPreview("");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (videoId: string) => {
        try {
            setLoading(true);
            const res = await MediaServices.deleteFile(videoId);
            if (res.status === 200) {
                toast.success("Xóa video thành công !");
                setVideoId(undefined);
                setPreview("");
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error("Không thể xóa video !");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        };
    }, []);

    const initializedRef = useRef(false);

    useEffect(() => {
        if (defaultVideo && !initializedRef.current) {
            setPreview(defaultVideo.url);
            initializedRef.current = true;
        }
    }, [defaultVideo]);

    return (
        <div className={`w-full ${className}`}>
            <div
                className="mb-4 flex min-h-[200px] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-200 transition-colors duration-100 hover:bg-gray-300"
                onClick={handleClick}
            >
                <input
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleChange}
                />
                <div className="flex flex-col items-center">
                    <h1 className="text-center">Tải video từ thiết bị</h1>
                    <ul className="list-disc pl-4 text-[0.7rem]">
                        <li>Tải lên tối đa 1 video trong một bài đăng</li>
                        <li>Dung lượng video tối đa 100MB</li>
                    </ul>
                </div>
            </div>
            {videoId && (
                <div className="relative h-[300px] w-full">
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-60">
                            <Spin
                                size="large"
                                indicator={<LoadingOutlined spin />}
                            />
                        </div>
                    )}
                    {!loading && (
                        <div
                            className="absolute right-0 top-0 z-10 w-fit -translate-y-1/3 translate-x-1/3 cursor-pointer rounded-full bg-red-500 p-1 transition-all duration-100 hover:bg-red-700"
                            onClick={() => handleDelete(videoId)}
                        >
                            <IoClose className="text-[0.8rem] text-white" />
                        </div>
                    )}
                    <video
                        src={videoId}
                        controls
                        className="h-full w-full object-contain"
                    />
                </div>
            )}
            {preview && (
                <div className="relative h-[300px] w-full">
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-60">
                            <Spin
                                size="large"
                                indicator={<LoadingOutlined spin />}
                            />
                        </div>
                    )}
                    {!loading && (
                        <div
                            className="absolute right-0 top-0 z-10 w-fit -translate-y-1/3 translate-x-1/3 cursor-pointer rounded-full bg-red-500 p-1 transition-all duration-100 hover:bg-red-700"
                            onClick={() => handleDelete(videoId)}
                        >
                            <IoClose className="text-[0.8rem] text-white" />
                        </div>
                    )}
                    <video
                        src={preview}
                        controls
                        className="h-full w-full object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default VideoUploader;
