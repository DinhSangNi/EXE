import type { Post } from "@/stores/type";
import { formatCurrency, formatPostDate, resolveAddress } from "@/utils/format";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { BsCalendarDateFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Dropdown, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string;
    data?: Post;
};

const PostManagementCard = ({ className, data }: Props) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/user/posts/edit-accomodation/${data?.id}`);
    };

    const items: MenuProps["items"] = [
        {
            label: (
                <div className="flex items-center gap-3" onClick={handleEdit}>
                    <FaRegEdit className="text-[1rem]" />
                    <p className="text-[0.8rem]">Chỉnh sửa</p>
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <div
                    className="flex items-center gap-3 text-red-500"
                    onClick={handleEdit}
                >
                    <FaRegTrashAlt className="text-[1rem]" />
                    <p className="text-[0.8rem]">Xóa</p>
                </div>
            ),
            key: "1",
        },
    ];

    return (
        <>
            <div
                className={`flex h-[200px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white ${className}`}
            >
                <div className="h-full w-1/4">
                    <img
                        src={
                            data?.medias.filter((item) =>
                                item.type.includes("image")
                            )[0]?.url ?? ""
                        }
                        alt="post-thumbnail"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex h-full w-3/4 flex-col justify-between p-4">
                    <div>
                        {/* Title */}
                        <div className="flex items-start justify-between gap-2">
                            <h1 className="mb-2 line-clamp-2 text-[1.1rem] font-bold">
                                {data?.title}
                            </h1>
                            <Dropdown menu={{ items }} trigger={["click"]}>
                                <button>
                                    <BsThreeDotsVertical className="text-[1.2rem]" />
                                </button>
                            </Dropdown>
                        </div>
                        {/* Address */}
                        <div className="mb-1 flex items-center gap-2 text-[0.9rem]">
                            <FaMapMarkerAlt />
                            <p>
                                {resolveAddress(
                                    data?.city as string,
                                    data?.district as string,
                                    data?.ward as string,
                                    data?.street as string
                                )}
                            </p>
                        </div>
                        <div className="mb-1 flex w-full items-center justify-between text-[0.9rem]">
                            {/* Square And Price */}
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <FaHome />
                                    <p>{data?.square}m²</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IoIosPricetags />
                                    <p>
                                        {formatCurrency(data?.price as number)}
                                    </p>
                                </div>
                            </div>
                            {/* Expired Date */}
                            <div className="flex items-center gap-2">
                                <BsCalendarDateFill />
                                <p>
                                    {data?.expiredAt
                                        ? formatPostDate(
                                              data?.expiredAt as string
                                          )
                                        : "29/7/2025"}
                                </p>
                            </div>
                        </div>
                        {/* Amenity */}
                        <div className="flex w-full gap-4 overflow-x-auto">
                            {data?.postAmenities
                                .slice(0, 2)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="rounded-3xl bg-gray-300 p-1 text-center text-[0.7rem]"
                                    >
                                        {item.amenity.name}
                                    </div>
                                ))}

                            {data?.postAmenities &&
                                data?.postAmenities.length > 3 && (
                                    <div className="rounded-3xl bg-gray-300 p-1 text-center text-[0.7rem]">
                                        +{data.postAmenities.length - 2} tiện
                                        ích
                                    </div>
                                )}

                            {data?.postAmenities.length === 3 && (
                                <div className="rounded-3xl bg-gray-300 p-1 text-center text-[0.7rem]">
                                    {data.postAmenities[2].amenity.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostManagementCard;
