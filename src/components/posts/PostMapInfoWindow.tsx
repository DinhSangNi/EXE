/* eslint-disable */
import { Button } from "antd";
import PostImageCarousel from "../PostImageCarousel";
import type { Post } from "@/stores/type";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { resolveAddress } from "@/utils/format";

type Props = {
    post: Post;
    onClose?: () => void;
};

const PostMapInfoWindow = ({ post, onClose }: Props) => {
    const navigate = useNavigate();
    return (
        <div
            className="relative aspect-square w-64 overflow-hidden rounded-xl bg-white shadow-lg"
            onClick={() => navigate(`/posts/${post.id}`)}
        >
            <button
                className="absolute right-2 top-2 z-50 rounded-full bg-white p-1"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose && onClose();
                }}
            >
                <FaXmark className="h-5 w-5 text-black" />
            </button>
            {/* slider hình ảnh */}
            <PostImageCarousel
                images={post.medias?.map((m) => ({ url: m.url })) || []}
                height="h-40"
            />

            {/* content */}
            <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-semibold">
                    {post.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                    {resolveAddress(
                        post?.city || "",
                        post?.district || "",
                        post?.ward || "",
                        post?.street || ""
                    )}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-bold text-black">
                        {post.price.toLocaleString()} ₫/tháng
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostMapInfoWindow;
