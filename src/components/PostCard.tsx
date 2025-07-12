import { IoIosPricetags } from "react-icons/io";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import type { Post } from "@/stores/type";
import { formatPostDate, resolveAddress } from "@/utils/format";
import { BsCalendarDateFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string;
    data: Post;
};

const PostCard = ({ className, data }: Props) => {
    const navigate = useNavigate();

    const handleOnclick = () => {
        if (!data.id) return;
        navigate(`/posts/${data.id}`);
    };
    return (
        <div
            className={`cursor-pointer overflow-hidden rounded-md ${className}`}
            onClick={handleOnclick}
        >
            <div className="flex h-1/2 gap-1 rounded-xl">
                <div className="h-full w-3/5">
                    <img
                        src={data.medias?.[0]?.url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="grid w-2/5 grid-rows-2 gap-1">
                    {data.medias?.[1] && (
                        <img
                            src={data.medias?.[1]?.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    )}
                    {data.medias?.[2] && (
                        <img
                            src={data.medias?.[2]?.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
            </div>

            <div className="flex h-1/2 flex-col justify-between px-4 pt-2">
                <div>
                    <h1 className="line-clamp-2 h-14 text-lg font-bold">
                        {data?.title}
                    </h1>
                    <p className="mt-2 line-clamp-2 text-[0.9rem]">
                        {data?.description}
                    </p>
                    <div className="mt-1 flex justify-between">
                        <div className="flex items-center gap-1 font-bold">
                            <IoIosPricetags />
                            {(data?.price).toLocaleString("vi-VN")} đồng/tháng
                        </div>
                        <div className="flex items-center gap-1">
                            <FaHome />
                            {data?.square}m²
                        </div>
                    </div>
                    <p className="flex items-center gap-1 text-[0.8rem]">
                        <FaMapMarkerAlt />
                        {resolveAddress(data.city, data.district, "", "")}
                    </p>
                </div>
                <div className="flex w-full items-center justify-between pb-2">
                    <div className="flex items-center gap-1 text-[0.9rem]">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                            <img
                                src={data?.owner?.medias?.[0]?.url ?? ""}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p>{data.owner?.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[0.8rem]">
                        <BsCalendarDateFill />
                        <p>{formatPostDate(data?.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
