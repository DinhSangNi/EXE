/* eslint-disable */
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import type { Post } from "@/stores/type";
import { formatPostDate, resolveAddress } from "@/utils/format";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoIosPricetags } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string;
    data?: Post;
    loading?: boolean;
};

const PostCard = ({ className, data, loading }: Props) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="relative animate-pulse cursor-pointer">
                <div className="aspect-square w-full rounded-3xl bg-gray-200" />
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
            </div>
        );
    }

    return (
        <div
            className={`h-[400px] cursor-pointer overflow-hidden rounded-md bg-white shadow-md ${className} `}
            onClick={() => navigate(`/posts/${data?.id}`)}
        >
            <div className="flex h-1/2 gap-1">
                <div className="h-full w-3/5">
                    <img
                        src={data?.medias[0].url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="grid w-2/5 grid-rows-2 gap-1">
                    {data?.medias?.[1] && (
                        <img
                            src={data.medias?.[1]?.url}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    )}
                    {data?.medias?.[2] && (
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
                    <h1 className="py-2 font-bold">{data?.title}</h1>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-1 text-[0.9rem]">
                            <IoIosPricetags />
                            {data?.price
                                ? `${data?.price.toLocaleString("vn-VN")} VNG`
                                : `${new Number(2400000).toLocaleString("vn-VN")} VNG`}
                        </p>

                        <div className="flex items-center gap-1 text-[0.9rem]">
                            <FaHome />
                            {data?.square}m²
                        </div>
                    </div>
                    <p className="flex items-center gap-1 text-[0.9rem]">
                        <FaMapMarkerAlt />
                        {resolveAddress(
                            data?.city ?? "",
                            data?.district ?? "",
                            "",
                            ""
                        )}
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
                        <p>{data?.owner?.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[0.8rem]">
                        <BsCalendarDateFill />
                        <p>{formatPostDate(data?.createdAt ?? "")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
