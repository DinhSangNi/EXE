import type { Post } from "@/stores/type";
import { resolveAddress } from "@/utils/format";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PostImageCarousel from "./PostImageCarousel";

type Props = {
    post: Post;
};

const SearchedPostCard = ({ post }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="cursor-pointer"
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
            >
                <PostImageCarousel
                    images={post?.medias || []}
                    height="aspect-square"
                    className="w-full overflow-hidden rounded-xl"
                />
                <div className="p-2">
                    <h1 className="line-clamp-2 py-1 text-[1rem] font-semibold">
                        {post?.title}
                    </h1>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-1 text-[0.9rem]">
                            <IoIosPricetags />
                            {post?.price
                                ? `${post?.price.toLocaleString("vn-VN")} VNG`
                                : `${new Number(2400000).toLocaleString("vn-VN")} VNG`}
                        </p>

                        <div className="flex items-center gap-1 text-[0.9rem]">
                            <FaHome />
                            {post?.square}m²
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[0.8rem]">
                        <FaMapMarkerAlt />
                        <p className="line-clamp-1">
                            {resolveAddress(
                                post?.city ?? "",
                                post?.district ?? "",
                                "",
                                ""
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchedPostCard;
