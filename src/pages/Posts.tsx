/* eslint-disable */
import Map from "@/components/Map";
import PostCard from "@/components/PostCard";
import PostsFilterModal from "@/components/posts/PostsFilterModal";
import SearchedPostCard from "@/components/SearchedPostCard";
import usePosts from "@/hooks/posts/usePosts";
import type { PostFilter } from "@/stores/type";
import { Pagination } from "antd";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // appliedFilterData luôn đọc trực tiếp từ URL
    const appliedFilterData: PostFilter = {
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : 9,
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
    };

    const { data, isLoading } = usePosts(appliedFilterData, "admin");

    // Apply filter từ modal → set URL
    const handleApplyFilter = (newFilterData: Partial<PostFilter>) => {
        const cleanedFilterData = { ...newFilterData };
        Object.keys(cleanedFilterData).forEach((key) => {
            if (!cleanedFilterData[key as keyof PostFilter]) {
                delete cleanedFilterData[key as keyof PostFilter];
            }
        });
        setSearchParams(cleanedFilterData as any);
        setIsFilterModalOpen(false);
    };

    // Pagination thay đổi → set URL param
    const handlePaginationChange = (page: number, pageSize: number) => {
        setSearchParams((prev) => ({
            ...Object.fromEntries(prev.entries()),
            page: page.toString(),
            limit: pageSize.toString(),
        }));
    };

    return (
        <div className="mx-auto w-full bg-white px-14">
            <div
                className={`grid w-full ${appliedFilterData.province && "grid-cols-7"}`}
            >
                {/* Khu vực post card */}
                <div className="col-span-4 py-8 pr-12">
                    <div className="flex items-center justify-between pb-6">
                        <div className="text-[0.9rem] font-bold">
                            {appliedFilterData.province ? (
                                <h1>
                                    {data?.totalItems ?? 0} bài đăng tại
                                    {appliedFilterData.district
                                        ? ` ${appliedFilterData.district.split("|")[1]}, `
                                        : ""}{" "}
                                    {appliedFilterData.province.split("|")[1]}
                                </h1>
                            ) : (
                                <h1>
                                    Tổng cộng {data?.totalAllItems ?? 0} bài
                                    đăng
                                </h1>
                            )}
                        </div>
                        {/* filter button */}
                        <button
                            className="flex items-center gap-1 p-1 text-[0.9rem] transition-colors duration-100 hover:bg-gray-300"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <FaFilter />
                            <p>Bộ lọc</p>
                        </button>
                        {/* filter modal */}
                        <PostsFilterModal
                            open={isFilterModalOpen}
                            onCancel={() => setIsFilterModalOpen(false)}
                            initialFilterData={appliedFilterData}
                            onApply={handleApplyFilter}
                        />
                    </div>

                    {/* Các post card */}
                    {!isLoading && data?.data && data?.data.length > 0 ? (
                        <>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {data?.data?.map((post) =>
                                    appliedFilterData.province ? (
                                        <SearchedPostCard
                                            key={post.id}
                                            post={post}
                                        />
                                    ) : (
                                        <PostCard key={post.id} data={post} />
                                    )
                                )}
                            </div>
                            <Pagination
                                align="center"
                                current={appliedFilterData.page}
                                pageSize={appliedFilterData.limit}
                                total={data.totalItems}
                                className="py-4"
                                onChange={handlePaginationChange}
                            />
                        </>
                    ) : (
                        "Không tìm thấy bài đăng nào"
                    )}
                </div>

                {/* Map */}
                {appliedFilterData.province && (
                    <div className="sticky right-0 top-[calc(var(--lean-header-height)+32px)] col-span-3 my-8 h-[calc(100vh-var(--lean-header-height)-64px)] overflow-hidden rounded-3xl">
                        <Map
                            coordinates={data?.data.map((post) => ({
                                lat: post.latitude,
                                lng: post.longitude,
                            }))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
