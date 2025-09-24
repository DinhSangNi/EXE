/* eslint-disable */
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import type { Post, PostFilter } from "@/stores/type";
import { Divider, Modal, Pagination } from "antd";
import { FaFilter, FaHome, FaTimes } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { MdPending, MdOutlineTimerOff } from "react-icons/md";
import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import AddressSelector from "@/components/AddressSelector";
import { useSearchParams } from "react-router-dom";
import usePosts from "@/hooks/posts/usePosts";
import AmenityCheckBox from "@/components/AmenityCheckBox";
import SquareSelector from "@/components/SquareSelector";
import PriceSelector from "@/components/PriceSelector";
type Props = {
    role?: "user" | "admin";
};

const PostsManagement = ({ role = "user" }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<PostFilter>({
        page: 1,
        limit: 2,
        category: undefined,
        province: (searchParams.get("province") as string) || undefined,
        district: (searchParams.get("district") as string) || undefined,
        ward: (searchParams.get("ward") as string) || undefined,
        minPrice: Number(searchParams.get("minPrice") as string) || undefined,
        maxPrice: Number(searchParams.get("maxPrice") as string) || undefined,
        minSquare: Number(searchParams.get("minSquare") as string) || undefined,
        maxSquare: Number(searchParams.get("maxSquare") as string) || undefined,
        amenities: searchParams.getAll("amenities") || [],
        status: undefined,
    });
    const appliedFilterData: Partial<PostFilter> = {
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : 2,
        category: searchParams.get("category") || undefined,
        province: searchParams.get("province") || undefined,
        district: searchParams.get("district") || undefined,
        ward: searchParams.get("ward") || undefined,
        minPrice: searchParams.get("minPrice")
            ? Number(searchParams.get("minPrice"))
            : undefined,
        maxPrice: searchParams.get("maxPrice")
            ? Number(searchParams.get("maxPrice"))
            : undefined,
        minSquare: searchParams.get("minSquare")
            ? Number(searchParams.get("minSquare"))
            : undefined,
        maxSquare: searchParams.get("maxSquare")
            ? Number(searchParams.get("maxSquare"))
            : undefined,
        amenities: searchParams.getAll("amenities") || [],
        status:
            (searchParams.get("status") as
                | "pending"
                | "approved"
                | "rejected"
                | "expired") || undefined,
    };

    const { data, isLoading, isSuccess } = usePosts(appliedFilterData, role);

    const handleApplyFilter = () => {
        const cleanedFilterData = { ...filterData };
        // Remove empty fields
        Object.keys(cleanedFilterData).forEach((key) => {
            if (!cleanedFilterData[key as keyof PostFilter]) {
                delete cleanedFilterData[key as keyof PostFilter];
            }
        });
        setSearchParams({
            ...cleanedFilterData,
        } as any);
        setIsFilterModalOpen(false);
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        setFilterData((prev) => ({
            ...prev,
            page,
            limit: pageSize,
        }));
        setSearchParams((prev) => ({ ...prev, page: page.toString() }) as any);
    };

    const filterWithStatus = (
        status: "pending" | "approved" | "rejected" | "expired" | undefined
    ) => {
        setFilterData((prev) => ({
            ...prev,
            status,
        }));
        setSearchParams((prev) => {
            const newParams: Record<string, any> = { ...prev };

            if (status === undefined) {
                delete newParams.status;
            } else {
                newParams.status = status;
            }

            return newParams;
        });
    };

    console.log(filterData);

    return (
        <>
            <div className="w-full bg-gray-100">
                <div className="mx-auto min-h-screen w-4/5 pt-4">
                    <h1 className="text-[1.4rem] font-bold">
                        Quản lí bài đăng
                    </h1>
                    <Divider />
                    <div className="mb-4 w-full">
                        <div className="grid grid-cols-5 gap-5">
                            {/* Total Posts */}
                            <div
                                className="flex items-center justify-between bg-white p-4 shadow-lg"
                                onClick={() => filterWithStatus(undefined)}
                            >
                                <div>
                                    <h1>Tổng tin đăng</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {data?.totalAllItems ?? 0}
                                    </p>
                                </div>
                                <FaHome className="text-[2rem] text-primary" />
                            </div>
                            {/* Approved Posts */}
                            <div
                                className="flex items-center justify-between bg-white p-4 shadow-lg"
                                onClick={() => filterWithStatus("approved")}
                            >
                                <div>
                                    <h1>Đang hoạt động</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {data?.totalApprovedItems ?? 0}
                                    </p>
                                </div>
                                <IoMdTrendingUp className="text-[2rem] text-green-400" />
                            </div>
                            {/* Pending Posts */}
                            <div
                                className="flex items-center justify-between bg-white p-4 shadow-lg"
                                onClick={() => filterWithStatus("pending")}
                            >
                                <div>
                                    <h1>Đang chờ duyệt</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {data?.totalPendingItems ?? 0}
                                    </p>
                                </div>
                                <MdPending className="text-[2rem] text-yellow-400" />
                            </div>
                            {/* Rejected Posts */}
                            <div
                                className="flex items-center justify-between bg-white p-4 shadow-lg"
                                onClick={() => filterWithStatus("rejected")}
                            >
                                <div>
                                    <h1>Đã từ chối</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {data?.totalRejectedItems ?? 0}
                                    </p>
                                </div>
                                <FaTimes className="text-[2rem] text-red-500" />
                            </div>
                            {/* Expired Posts */}
                            <div
                                className="flex items-center justify-between bg-white p-4 shadow-lg"
                                onClick={() => filterWithStatus("expired")}
                            >
                                <div>
                                    <h1>Đã hết hạn</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {data?.totalExpiredItems ?? 0}
                                    </p>
                                </div>
                                <MdOutlineTimerOff className="text-[2rem] text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="mb-2 flex w-full items-end justify-end gap-8">
                        <button
                            className="flex items-center gap-1 p-1 transition-colors duration-100 hover:bg-gray-300"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <FaFilter />
                            <p>Bộ lọc</p>
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex h-full flex-col gap-y-4">
                        {isLoading ? (
                            <div className="w-full text-center">
                                <Spinner className="mt-16 h-[100px] w-[100px]" />
                                <p>Đang tải dữ liệu...</p>
                            </div>
                        ) : isSuccess && data?.data.length > 0 ? (
                            data?.data.map((post: Post) => {
                                return (
                                    <div key={post.id}>
                                        <PostManagementCard data={post} />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full text-center">
                                <h1 className="text-[1.2rem]">
                                    Chưa có bài đăng nào
                                </h1>
                            </div>
                        )}
                    </div>
                    <Pagination
                        onChange={handlePaginationChange}
                        current={filterData.page}
                        pageSize={filterData.limit}
                        className="mt-4"
                        align="end"
                        total={data?.totalItems ?? 0}
                    />
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <Modal
                    open={isFilterModalOpen}
                    onCancel={() => setIsFilterModalOpen(false)}
                    title={<h1 className="text-[1.2rem]">Bộ lọc</h1>}
                    footer={
                        <button
                            className="w-full rounded-md bg-primary p-2 text-white"
                            onClick={handleApplyFilter}
                        >
                            Áp dụng bộ lọc
                        </button>
                    }
                    width={700}
                >
                    <div>
                        <CategorySelector
                            title={
                                <p className="mb-2 font-bold">
                                    Danh mục cho thuê
                                </p>
                            }
                            value={filterData.category}
                            mode="filter"
                            onChange={(value) => {
                                setFilterData((prev) => ({
                                    ...prev,
                                    category: value,
                                }));
                            }}
                        />
                        <div>
                            <p className="mb-2 font-bold">Địa chỉ</p>
                            <div className="flex justify-between gap-2">
                                <AddressSelector
                                    type="province"
                                    mode="filter"
                                    value={filterData?.province}
                                    onChange={(value) => {
                                        setFilterData((prev) => ({
                                            ...prev,
                                            province: value,
                                        }));
                                    }}
                                />
                                <AddressSelector
                                    type="district"
                                    provinceCode={
                                        filterData?.province?.split("|")[0]
                                    }
                                    value={filterData?.district}
                                    onChange={(value) => {
                                        setFilterData((prev) => ({
                                            ...prev,
                                            district: value,
                                        }));
                                    }}
                                />
                                <AddressSelector
                                    type="ward"
                                    districtCode={
                                        filterData?.district?.split("|")[0]
                                    }
                                    value={filterData?.ward}
                                    onChange={(value) => {
                                        setFilterData((prev) => ({
                                            ...prev,
                                            ward: value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="flex-1">
                                <p className="mb-2 font-bold">Khoảng giá</p>
                                <PriceSelector
                                    mode="filter"
                                    className="w-full"
                                    onChange={(value) => {
                                        setFilterData((prev) => ({
                                            ...prev,
                                            minPrice: value.min ?? undefined,
                                            maxPrice: value.max ?? undefined,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="mb-2 font-bold">
                                    Khoảng diện tích
                                </p>
                                <SquareSelector
                                    className="w-full"
                                    mode="filter"
                                    onChange={(value) => {
                                        setFilterData((prev) => ({
                                            ...prev,
                                            minSquare: value.min ?? undefined,
                                            maxPrice: value.max ?? undefined,
                                        }));
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <AmenityCheckBox
                                amentites={filterData?.amenities ?? []}
                                setAmenities={(amenities: string[]) => {
                                    setFilterData((prev) => ({
                                        ...prev,
                                        amenities: amenities,
                                    }));
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PostsManagement;
