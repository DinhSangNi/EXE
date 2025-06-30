import AddressSelector from "@/components/AddressSelector";
import CategorySelector from "@/components/CategorySelector";
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import { PostServices } from "@/services/post";
import type { Post } from "@/stores/type";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import Search from "antd/es/input/Search";
import { FaHome } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

const Posts = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await PostServices.getAllByUserId();
            return res.data.metadata;
        },
    });

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
                                    <p className="text-[1.3rem] font-bold">2</p>
                                </div>
                                <FaHome className="text-[2rem] text-primary" />
                            </div>
                            {/* Active Posts */}
                            <div className="flex w-1/4 items-center justify-between bg-white p-4 shadow-lg">
                                <div>
                                    <h1>Đang hoạt động</h1>
                                    <p className="text-[1.3rem] font-bold">2</p>
                                </div>
                                <IoMdTrendingUp className="text-[2rem] text-green-400" />
                            </div>
                        </div>
                    </div>
                    <div className="sticky top-14 z-10 mb-4 flex items-end justify-start gap-8 bg-white px-4 py-4 shadow-lg">
                        <Search
                            className="w-[300px]"
                            placeholder="Tiêu đề bài đăng..."
                            enterButton
                        />
                        <CategorySelector />
                        <AddressSelector type="province" />
                        <AddressSelector type="district" />
                    </div>
                    {/* List */}
                    <div className="flex h-full flex-col gap-y-4">
                        {isLoading ? (
                            <div className="w-full text-center">
                                <Spinner className="mt-16 h-[100px] w-[100px]" />
                                <p>Đang tải dữ liệu...</p>
                            </div>
                        ) : isSuccess ? (
                            posts.map((post: Post) => {
                                return (
                                    <div key={post.id}>
                                        <PostManagementCard data={post} />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full">
                                <h1 className="text-[1.2rem]">
                                    Chưa có bài đăng nào
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Posts;
