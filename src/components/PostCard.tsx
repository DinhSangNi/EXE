import { IoMdStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

type Props = {
    imageSrc?: string;
};

const PostCard = ({ imageSrc }: Props) => {
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
                    <h1 className="font-bold">Phòng Trọ Tại Quy Nhơn</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-[0.8rem]">
                            {`${new Number(2400000).toLocaleString("vn-VN")} VNG`}{" "}
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
