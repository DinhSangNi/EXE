/* eslint-disable */
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import type { Post } from "@/stores/type";
import { formatPostDate, resolveAddress } from "@/utils/format";
import { BsCalendarDateFill } from "react-icons/bs";

type Props = {
    className?: string;
    imageSrc?: string;
    title?: string;
    price?: number;
    loading?: boolean;
    data?: Post;
};

const PostCard = ({
    className,
    imageSrc,
    title,
    price,
    loading,
    data,
}: Props) => {
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
            className={`cursor-pointer overflow-hidden rounded-md ${className}`}
        >
            <div className="flex h-1/2 gap-1 rounded-xl">
                <div className="h-full w-3/5">
                    <img
                        src={imageSrc}
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
                    <h1 className="font-bold">
                        {title || "Phòng Trọ Tại Quy Nhơn"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <p className="text-[0.8rem]">
                            {price
                                ? `${price.toLocaleString("vn-VN")} VNG`
                                : `${new Number(2400000).toLocaleString("vn-VN")} VNG`}
                        </p>

                        <div className="flex items-center gap-1">
                            <FaHome />
                            {data?.square}m²
                        </div>
                    </div>
                    <p className="flex items-center gap-1 text-[0.8rem]">
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
