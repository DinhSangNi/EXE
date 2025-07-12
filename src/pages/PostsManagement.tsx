/* eslint-disable */
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import { PostServices } from "@/services/post";
import type { PaginationResponse, Post, PostFilter } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";
import { Divider, Pagination } from "antd";
import { FaHome } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { useState } from "react";
type Props = {
    role?: "user" | "admin";
};

const PostsManagement = ({ role = "user" }: Props) => {
    const [filterData, setFilterData] = useState<PostFilter>({
        page: 1,
        limit: 9,
    });
    const {
        data: paginatedPosts,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["posts", "user"],
        queryFn:
            role === "user"
                ? async () => {
                      const res = await PostServices.getAllByUserId();
                      return res.data.metadata as PaginationResponse<Post[]>;
                  }
                : async () => {
                      const res = await PostServices.getAll(filterData);
                      return res.data.metadata as PaginationResponse<Post[]>;
                  },
    });

    const handlePaginationChange = (page: number, pageSize: number) => {
        setFilterData({
            page,
            limit: pageSize,
        });
    };

    return (
        <>
            <div className="w-full bg-gray-100">
                <div className="mx-auto min-h-screen w-4/5 pt-4">
                    <h1 className="text-[1.4rem] font-bold">
                        Quản lí bài đăng
                    </h1>
                    <Divider />
                    <div className="mb-4 w-full">
                        <div className="flex justify-start gap-8">
                            {/* Total Posts */}
                            <div className="flex w-1/4 items-center justify-between bg-white p-4 shadow-lg">
                                <div>
                                    <h1>Tổng tin đăng</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {paginatedPosts?.totalAllItems ?? 0}
                                    </p>
                                </div>
                                <FaHome className="text-[2rem] text-primary" />
                            </div>
                            {/* Active Posts */}
                            <div className="flex w-1/4 items-center justify-between bg-white p-4 shadow-lg">
                                <div>
                                    <h1>Đang hoạt động</h1>
                                    <p className="text-[1.3rem] font-bold">
                                        {paginatedPosts?.data?.filter(
                                            (post) => post.status === "approved"
                                        ).length ?? 0}
                                    </p>
                                </div>
                                <IoMdTrendingUp className="text-[2rem] text-green-400" />
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-14 z-10 mb-4 flex items-end justify-start gap-8 bg-white px-2 py-2 shadow-lg">
                        {/* <button
                            className="flex items-center gap-1 p-1 transition-colors duration-100 hover:bg-gray-300"
                        >
                            <FaFilter />
                            <p>Bộ lọc</p>
                        </button> */}
                        {/* <CategorySelector />
                        <AddressSelector type="province" />
                        <AddressSelector type="district" /> */}
                    </div>
                    {/* List */}
                    <div className="flex h-full flex-col gap-y-4">
                        {isLoading ? (
                            <div className="w-full text-center">
                                <Spinner className="mt-16 h-[100px] w-[100px]" />
                                <p>Đang tải dữ liệu...</p>
                            </div>
                        ) : isSuccess && paginatedPosts?.data.length > 0 ? (
                            paginatedPosts?.data.map((post: Post) => {
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
                        total={paginatedPosts?.totalItems ?? 0}
                    />
                </div>
            </div>
        </>
    );
};

export default PostsManagement;
