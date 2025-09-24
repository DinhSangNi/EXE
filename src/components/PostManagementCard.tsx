import type { Post } from "@/stores/type";
import { formatCurrency, formatPostDate, resolveAddress } from "@/utils/format";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { BsCalendarDateFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Dropdown, Modal, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import useUpdatePost from "@/hooks/posts/useUpdatePost";
import useDeletePost from "@/hooks/posts/useDeletePost";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
    className?: string;
    data?: Post;
};

const PostManagementCard = ({ className, data }: Props) => {
    const { mutate: updatePost } = useUpdatePost();
    const { mutate: deletePost } = useDeletePost();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/user/posts/edit-accomodation/${data?.id}`);
    };

    const handleChangeStatus = (
        status: "pending" | "approved" | "rejected" | "expired"
    ) => {
        updatePost({
            id: data?.id as string,
            updatePostDto: { status },
        });
    };

    const handleDeletePost = () => {
        deletePost(data?.id as string, {
            onSuccess: () => {
                toast.success("Xóa bài viết thành công", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                });
                setOpenDeleteModal(false);
            },
            onError: () => {
                toast.error("Xóa bài viết thất bại", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                });
                setOpenDeleteModal(false);
            },
        });
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
                    className="flex items-center gap-3 text-green-500"
                    onClick={() => handleChangeStatus("approved")}
                >
                    <IoCheckmarkSharp className="text-[1rem]" />
                    <p className="text-[0.8rem]">Duyệt bài viết</p>
                </div>
            ),
            key: "1",
        },
        {
            label: (
                <div
                    className="flex items-center gap-3 text-red-500"
                    onClick={() => handleChangeStatus("rejected")}
                >
                    <FaTimes className="text-[1rem]" />
                    <p className="text-[0.8rem]">Từ chối bài viết</p>
                </div>
            ),
            key: "2",
        },
        {
            label: (
                <div
                    className="flex items-center gap-3 text-red-500"
                    onClick={() => setOpenDeleteModal(true)}
                >
                    <FaRegTrashAlt className="text-[1rem]" />
                    <p className="text-[0.8rem]">Xóa</p>
                </div>
            ),
            key: "3",
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
                        <div className="mb-2 flex w-full gap-4 overflow-x-auto">
                            {data &&
                                data.postAmenities &&
                                data.postAmenities
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

                            {data &&
                                data.postAmenities &&
                                data?.postAmenities.length === 3 && (
                                    <div className="rounded-3xl bg-gray-300 p-1 text-center text-[0.7rem]">
                                        {data.postAmenities[2].amenity.name}
                                    </div>
                                )}
                        </div>

                        {/* Status */}
                        <div className="w-full">
                            <p
                                className={`text-sm font-bold ${
                                    data?.status === "approved"
                                        ? "text-green-500"
                                        : data?.status === "pending"
                                          ? "text-yellow-500"
                                          : data?.status === "rejected"
                                            ? "text-red-500"
                                            : "text-gray-500"
                                }`}
                            >
                                {data?.status === "approved"
                                    ? "Đã duyệt"
                                    : data?.status === "pending"
                                      ? "Đang chờ duyệt"
                                      : data?.status === "rejected"
                                        ? "Bị từ chối"
                                        : "Chưa rõ"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {openDeleteModal && (
                <Modal
                    open={openDeleteModal}
                    onCancel={() => setOpenDeleteModal(false)}
                    title={<h1 className="text-[1.2rem]">Xóa bài viết</h1>}
                    footer={
                        <div className="flex w-full justify-end gap-4">
                            <button
                                className="rounded-md bg-yellow-500 px-4 py-2 font-bold text-white"
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="rounded-md bg-primary px-4 py-2 font-bold text-white"
                                onClick={handleDeletePost}
                            >
                                Xóa
                            </button>
                        </div>
                    }
                >
                    <div>
                        <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PostManagementCard;
