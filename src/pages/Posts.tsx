import AddressSelector from "@/components/AddressSelector";
import AmenityCheckBox from "@/components/AmenityCheckBox";
import CategorySelector from "@/components/CategorySelector";
import Map from "@/components/Map";
import PostCard from "@/components/PostCard";
import PriceSelector from "@/components/PriceSelector";
import SquareSelector from "@/components/SquareSelector";
import usePosts from "@/hooks/posts/usePosts";
import type { PostFilter } from "@/stores/type";
import { resolveAddress } from "@/utils/format";
import { Modal, Pagination } from "antd";
import { useState } from "react";
import { FaFilter, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const Posts = () => {
    const [searchParams] = useSearchParams();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<PostFilter>({
        page: 1,
        limit: 9,
        category: undefined,
        province: searchParams.get("province") as string,
        district: searchParams.get("district") as string,
        ward: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        minSquare: undefined,
        maxSquare: undefined,
        amenities: [],
    });
    const [appliedFilterData, setAppliedFilterData] = useState<
        Partial<PostFilter>
    >({
        province: searchParams.get("province") as string,
        district: searchParams.get("district") as string,
    });

    const { data, isLoading } = usePosts(appliedFilterData);

    const handleApplyFilter = () => {
        setAppliedFilterData({
            ...filterData,
            page: 1,
            limit: 9,
        });
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        setFilterData((prev) => ({
            ...prev,
            page,
            limit: pageSize,
        }));
    };

    return (
        <>
            <div className="mx-auto w-[90%]">
                <div
                    className={`grid w-full ${appliedFilterData.province ? "grid-cols-2" : ""}`}
                >
                    {/* searched posts */}
                    <div className="w-full pt-6">
                        {!isLoading && data?.data && data?.data.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between pb-6">
                                    <h1 className="text-[0.9rem] font-bold">
                                        {data?.totalItems} bài đăng
                                        {appliedFilterData.province &&
                                            ` tại ${appliedFilterData.district ? `${appliedFilterData.district.split("|")[1]}, ` : ""} ${appliedFilterData.province.split("|")[1]}`}
                                    </h1>
                                    <button
                                        className="flex items-center gap-1 p-1 text-[0.9rem] transition-colors duration-100 hover:bg-gray-300"
                                        onClick={() =>
                                            setIsFilterModalOpen(true)
                                        }
                                    >
                                        <FaFilter />
                                        <p>Bộ lọc</p>
                                    </button>
                                </div>
                                <div
                                    className={`grid min-h-[500px] grid-cols-3 gap-4`}
                                >
                                    {data?.data &&
                                        data?.data.map((post) => {
                                            return appliedFilterData.province ? (
                                                <div key={post.id}>
                                                    <img
                                                        src={post.medias[0].url}
                                                        alt="cover-image"
                                                        className="aspect-square w-full rounded-xl"
                                                    />
                                                    <div className="p-2">
                                                        <h1 className="line-clamp-2 py-1 text-[1rem] font-semibold">
                                                            {post?.title}
                                                        </h1>
                                                        <div className="flex items-center gap-4">
                                                            <p className="flex items-center gap-1 text-[0.9rem]">
                                                                <IoIosPricetags />
                                                                {post?.price
                                                                    ? `${post?.price.toLocaleString("vn-VN")} VNG`
                                                                    : `${new Number(2400000).toLocaleString("vn-VN")} VNG`}
                                                            </p>

                                                            <div className="flex items-center gap-1 text-[0.9rem]">
                                                                <FaHome />
                                                                {post?.square}m²
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[0.8rem]">
                                                            <FaMapMarkerAlt />
                                                            <p className="line-clamp-1">
                                                                {resolveAddress(
                                                                    post?.city ??
                                                                        "",
                                                                    post?.district ??
                                                                        "",
                                                                    "",
                                                                    ""
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <PostCard
                                                    key={post.id}
                                                    data={post}
                                                />
                                            );
                                        })}
                                </div>
                                <Pagination
                                    align="center"
                                    current={filterData.page}
                                    pageSize={filterData.limit}
                                    total={data.totalItems}
                                    className="py-4"
                                    onChange={handlePaginationChange}
                                />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* maps */}
                    {appliedFilterData.province && (
                        <div className="sticky right-0 top-[var(--header-height)] h-[calc(100vh-var(--header-height))] w-[calc(100vw/2)] p-8">
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

export default Posts;
