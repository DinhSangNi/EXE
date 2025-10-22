/* eslint-disable */
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import type { Post, PostFilter } from "@/stores/type";
import { Divider, Pagination, Input, Select } from "antd";
import { FaFilter, FaHome, FaTimes, FaSearch } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { MdPending, MdOutlineTimerOff } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePosts from "@/hooks/posts/usePosts";
import PostsFilterModal from "@/components/posts/PostsFilterModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";

type Props = {
    role?: "user" | "admin";
};

const { Option } = Select;

const PostsManagement = ({ role = "user" }: Props) => {
    const storedUser = useSelector((state: RootState) => state.user);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // State riêng cho search input để debounce
    const [keyword, setKeyword] = useState(
        searchParams.get("keyword")
            ? decodeURIComponent(searchParams.get("keyword")!)
            : ""
    );

    // State riêng cho status select
    const [statusFilter, setStatusFilter] = useState<
        "pending" | "approved" | "rejected" | "expired" | undefined
    >(searchParams.get("status") as any);

    // Debounce update searchParams khi gõ
    useEffect(() => {
        const handler = setTimeout(() => {
            const newParams: Record<string, string> = {
                ...Object.fromEntries(searchParams),
            };
            // keyword
            if (keyword.trim() === "") {
                delete newParams.keyword;
            } else {
                newParams.keyword = encodeURIComponent(keyword);
            }
            // status
            if (!statusFilter) {
                delete newParams.status;
            } else {
                newParams.status = statusFilter;
            }

            setSearchParams(newParams);
        }, 500);

        return () => clearTimeout(handler);
    }, [keyword, statusFilter]);

    // appliedFilterData luôn sync từ URL
    const appliedFilterData: Partial<PostFilter> = {
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : 5,
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
        status: searchParams.get("status")
            ? (searchParams.get("status") as
                  | "pending"
                  | "approved"
                  | "rejected"
                  | "expired")
            : undefined,
        keyword: searchParams.get("keyword")
            ? decodeURIComponent(searchParams.get("keyword")!)
            : undefined,
    };

    const { data, isLoading, isSuccess } = usePosts(appliedFilterData, role);

    const handlePaginationChange = (page: number, pageSize: number) => {
        setSearchParams((prev) => ({
            ...Object.fromEntries(prev),
            page: page.toString(),
            limit: pageSize.toString(),
        }));
    };

    const applyFilter = (newFilter: Partial<PostFilter>) => {
        const cleanedFilterData = { ...newFilter };
        Object.keys(cleanedFilterData).forEach((key) => {
            const value = cleanedFilterData[key as keyof PostFilter];
            if (
                value === undefined ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            ) {
                delete cleanedFilterData[key as keyof PostFilter];
            }
        });
        setSearchParams(cleanedFilterData as any);
        setIsFilterModalOpen(false);
    };

    const filterWithStatus = (
        status: "pending" | "approved" | "rejected" | "expired" | undefined
    ) => {
        setStatusFilter(status);
    };

    return (
        <div className="w-full bg-gray-100">
            <div className="mx-auto min-h-screen w-4/5 pt-4">
                <h1 className="text-[1.4rem] font-bold">Quản lí bài đăng</h1>
                <Divider />

                {/* Summary cards */}
                {storedUser.role === "admin" && (
                    <div className="mb-4 w-full">
                        <div className="grid grid-cols-5 gap-5">
                            <div
                                className="flex cursor-pointer items-center justify-between bg-white p-4 shadow-lg"
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
                            <div
                                className="flex cursor-pointer items-center justify-between bg-white p-4 shadow-lg"
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
                            <div
                                className="flex cursor-pointer items-center justify-between bg-white p-4 shadow-lg"
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
                            <div
                                className="flex cursor-pointer items-center justify-between bg-white p-4 shadow-lg"
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
                            <div
                                className="flex cursor-pointer items-center justify-between bg-white p-4 shadow-lg"
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
                )}

                {/* Search + Status + Filter */}
                <div className="mb-6 flex w-full items-end gap-4">
                    <Input
                        placeholder="Tìm kiếm theo tên bài đăng..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        prefix={<FaSearch className="text-gray-400" />}
                        className="w-1/3"
                        allowClear
                    />

                    <Select
                        placeholder="Trạng thái"
                        value={statusFilter}
                        onChange={(value) =>
                            setStatusFilter(
                                value as
                                    | "pending"
                                    | "approved"
                                    | "rejected"
                                    | "expired"
                            )
                        }
                        allowClear
                        className="w-1/4"
                    >
                        <Option value="pending">Đang chờ duyệt</Option>
                        <Option value="approved">Đang hoạt động</Option>
                        <Option value="rejected">Đã từ chối</Option>
                        <Option value="expired">Đã hết hạn</Option>
                    </Select>

                    <button
                        className="flex items-center gap-1 p-1 transition-colors duration-100 hover:bg-gray-300"
                        onClick={() => setIsFilterModalOpen(true)}
                    >
                        <FaFilter />
                        <p>Bộ lọc</p>
                    </button>

                    <PostsFilterModal
                        open={isFilterModalOpen}
                        onCancel={() => setIsFilterModalOpen(false)}
                        initialFilterData={appliedFilterData}
                        onApply={applyFilter}
                    />
                </div>

                {/* List */}
                <div className="flex h-full flex-col gap-y-4">
                    {isLoading ? (
                        <div className="w-full text-center">
                            <Spinner className="mt-16 h-[100px] w-[100px]" />
                            <p>Đang tải dữ liệu...</p>
                        </div>
                    ) : isSuccess && data?.data.length > 0 ? (
                        data?.data.map((post: Post) => (
                            <div key={post.id}>
                                <PostManagementCard data={post} />
                            </div>
                        ))
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
                    current={appliedFilterData.page}
                    pageSize={appliedFilterData.limit}
                    className="mt-4"
                    align="end"
                    total={data?.totalItems ?? 0}
                />
            </div>
        </div>
    );
};

export default PostsManagement;
