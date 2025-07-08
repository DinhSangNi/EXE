import { IoMdStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

type Props = {
    imageSrc?: string;
    title?: string;
    price?: number;
    loading?: boolean;
};

const PostCard = ({ imageSrc, title, price, loading }: Props) => {
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
        <>
            <div className="relative cursor-pointer">
                <FaRegHeart className="absolute right-4 top-4 h-6 w-6 bg-transparent hover:scale-105 hover:transition-transform hover:duration-200" />
                <div className="aspect-square w-full">
                    <img
                        src={imageSrc}
                        alt="Post's image"
                        className="h-full w-full rounded-3xl object-cover"
                    />
                </div>
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
                            <IoMdStar className="text-[0.8rem]" />
                            <p>4.98</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostCard;
