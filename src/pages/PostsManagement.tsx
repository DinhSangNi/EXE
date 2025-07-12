import AddressSelector from "@/components/AddressSelector";
import CategorySelector from "@/components/CategorySelector";
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import { PostServices } from "@/services/post";
import type { PaginationType, PaginationResponse, Post } from "@/stores/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Divider, Modal, Pagination } from "antd";
import { FaHome } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import PriceSelector from "@/components/PriceSelector";
import SquareSelector from "@/components/SquareSelector";
import AmenityCheckBox from "@/components/AmenityCheckBox";

type Props = {
    role?: "user" | "admin";
};

type FilterData = {
    category: string;
    address: {
        province: string;
        district: string;
        ward: string;
    };
    priceRange: {
        min: number | null;
        max: number | null;
    };
    squareRange: {
        min: number | null;
        max: number | null;
    };
    amenities: string[];
};

const PostsManagement = ({ role = "user" }: Props) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<FilterData>({
        category: "",
        address: {
            province: "",
            district: "",
            ward: "",
        },
        priceRange: {
            min: null,
            max: null,
        },
        squareRange: {
            min: null,
            max: null,
        },
        amenities: [],
    });
    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: 10,
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
                      const res = await PostServices.getAll();
                      return res.data.metadata as PaginationResponse<Post[]>;
                  },
    });

    const postQueryMutation = useMutation({
        mutationFn: async () => {},
    });

    const handlePaginationChange = (page: number, pageSize: number) => {};

    console.log("filterData: ", filterData);

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
                        <button
                            className="flex items-center gap-1 p-1 transition-colors duration-100 hover:bg-gray-300"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <FaFilter />
                            <p>Bộ lọc</p>
                        </button>
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
                        current={pagination.page}
                        pageSize={pagination.limit}
                        className="mt-4"
                        align="end"
                        total={paginatedPosts?.totalItems ?? 0}
                    />
                </div>

                {/* Filter Modal */}
                {isFilterModalOpen && (
                    <Modal
                        open={isFilterModalOpen}
                        onCancel={() => setIsFilterModalOpen(false)}
                        title={<h1 className="text-[1.2rem]">Bộ lọc</h1>}
                        footer={
                            <button className="w-full rounded-md bg-primary p-2 text-white">
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
                                        value={filterData.address.province}
                                        onChange={(value) => {
                                            setFilterData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    province: value,
                                                },
                                            }));
                                        }}
                                    />
                                    <AddressSelector
                                        type="district"
                                        provinceCode={
                                            filterData.address.province.split(
                                                "|"
                                            )[0]
                                        }
                                        value={filterData.address.district}
                                        onChange={(value) => {
                                            setFilterData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    district: value,
                                                },
                                            }));
                                        }}
                                    />
                                    <AddressSelector
                                        type="ward"
                                        districtCode={
                                            filterData.address.district.split(
                                                "|"
                                            )[0]
                                        }
                                        value={filterData.address.ward}
                                        onChange={(value) => {
                                            setFilterData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    ward: value,
                                                },
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
                                                priceRange: value,
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
                                                squareRange: value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <AmenityCheckBox
                                    amentites={filterData.amenities}
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
            </div>
        </>
    );
};

export default PostsManagement;
