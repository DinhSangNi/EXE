/* eslint-disable */
import PostManagementCard from "@/components/PostManagementCard";
import Spinner from "@/components/Spinner";
import type { Post, PostFilter } from "@/stores/type";
import { Pagination, Input, Select, Card, Row, Col, Space, Empty } from "antd";
import { FaFilter } from "react-icons/fa";
import {
    SearchOutlined,
    HomeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";
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

    const [summaryData, setSummaryData] = useState({
        totalAllItems: 0,
        totalApprovedItems: 0,
        totalPendingItems: 0,
        totalRejectedItems: 0,
        totalExpiredItems: 0,
    });

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

    useEffect(() => {
        if (!data) return;

        // So sánh data hiện tại với summaryData
        const isDifferent =
            summaryData.totalAllItems !== data.totalAllItems ||
            summaryData.totalApprovedItems !== data.totalApprovedItems ||
            summaryData.totalPendingItems !== data.totalPendingItems ||
            summaryData.totalRejectedItems !== data.totalRejectedItems ||
            summaryData.totalExpiredItems !== data.totalExpiredItems;

        if (isDifferent) {
            setSummaryData({
                totalAllItems: data.totalAllItems ?? 0,
                totalApprovedItems: data.totalApprovedItems ?? 0,
                totalPendingItems: data.totalPendingItems ?? 0,
                totalRejectedItems: data.totalRejectedItems ?? 0,
                totalExpiredItems: data.totalExpiredItems ?? 0,
            });
        }
    }, [data]);

    const handlePaginationChange = (page: number, pageSize: number) => {
        setSearchParams((prev) => ({
            ...Object.fromEntries(prev),
            page: page.toString(),
            limit: pageSize.toString(),
        }));

        window.scrollTo({ top: 0, behavior: "smooth" });
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

    const statsConfig = [
        {
            key: "totalAllItems",
            title: "Tổng tin đăng",
            icon: <HomeOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
            color: "#1890ff",
            bgColor: "#e6f7ff",
            status: undefined,
        },
        {
            key: "totalApprovedItems",
            title: "Đang hoạt động",
            icon: (
                <CheckCircleOutlined
                    style={{ fontSize: 24, color: "#52c41a" }}
                />
            ),
            color: "#52c41a",
            bgColor: "#f6ffed",
            status: "approved" as const,
        },
        {
            key: "totalPendingItems",
            title: "Đang chờ duyệt",
            icon: (
                <ClockCircleOutlined
                    style={{ fontSize: 24, color: "#faad14" }}
                />
            ),
            color: "#faad14",
            bgColor: "#fffbe6",
            status: "pending" as const,
        },
        {
            key: "totalRejectedItems",
            title: "Đã từ chối",
            icon: (
                <CloseCircleOutlined
                    style={{ fontSize: 24, color: "#ff4d4f" }}
                />
            ),
            color: "#ff4d4f",
            bgColor: "#fff2f0",
            status: "rejected" as const,
        },
        {
            key: "totalExpiredItems",
            title: "Đã hết hạn",
            icon: <StopOutlined style={{ fontSize: 24, color: "#8c8c8c" }} />,
            color: "#8c8c8c",
            bgColor: "#f5f5f5",
            status: "expired" as const,
        },
    ];

    return (
        <div className="w-full bg-gray-50 pb-10">
            <div className="mx-auto min-h-screen w-full px-10 pt-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[1.8rem] font-bold text-gray-800">
                        Quản lí bài đăng
                    </h1>
                    <p className="text-gray-500">
                        Quản lý và theo dõi các bài đăng trong hệ thống
                    </p>
                </div>

                {/* Stats Cards - Only for Admin */}
                {storedUser.role === "admin" && (
                    <Row gutter={[16, 16]} className="mb-6">
                        {statsConfig.map((stat) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={24 / 5}
                                xxl={24 / 5}
                                key={stat.key}
                                style={{
                                    minWidth: "19.2%",
                                    flex: "0 0 auto",
                                }}
                            >
                                <Card
                                    hoverable
                                    onClick={() =>
                                        filterWithStatus(stat.status)
                                    }
                                    className="cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg"
                                    style={{
                                        borderTop: `4px solid ${stat.color}`,
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 text-sm text-gray-600">
                                                {stat.title}
                                            </div>
                                            <div
                                                className="text-2xl font-bold"
                                                style={{ color: stat.color }}
                                            >
                                                {summaryData[
                                                    stat.key as keyof typeof summaryData
                                                ] || 0}
                                            </div>
                                        </div>
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                backgroundColor: stat.bgColor,
                                            }}
                                        >
                                            {stat.icon}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Filters Card */}
                <Card className="mb-6 shadow-md">
                    <Space size="middle" wrap className="w-full">
                        <Input
                            placeholder="Tìm kiếm theo tên bài đăng..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            prefix={
                                <SearchOutlined className="text-gray-400" />
                            }
                            style={{ width: 300 }}
                            size="large"
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
                            style={{ width: 200 }}
                            size="large"
                        >
                            <Option value="pending">
                                <Space>
                                    <ClockCircleOutlined />
                                    Đang chờ duyệt
                                </Space>
                            </Option>
                            <Option value="approved">
                                <Space>
                                    <CheckCircleOutlined />
                                    Đang hoạt động
                                </Space>
                            </Option>
                            <Option value="rejected">
                                <Space>
                                    <CloseCircleOutlined />
                                    Đã từ chối
                                </Space>
                            </Option>
                            <Option value="expired">
                                <Space>
                                    <StopOutlined />
                                    Đã hết hạn
                                </Space>
                            </Option>
                        </Select>

                        <button
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <FaFilter />
                            <span>Bộ lọc nâng cao</span>
                        </button>
                    </Space>

                    <PostsFilterModal
                        open={isFilterModalOpen}
                        onCancel={() => setIsFilterModalOpen(false)}
                        initialFilterData={appliedFilterData}
                        onApply={applyFilter}
                    />
                </Card>

                {/* Posts List Card */}
                <Card className="shadow-md">
                    {isLoading ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center">
                            <Spinner className="h-[100px] w-[100px]" />
                            <p className="mt-4 text-gray-500">
                                Đang tải dữ liệu...
                            </p>
                        </div>
                    ) : isSuccess && data?.data.length > 0 ? (
                        <div className="flex flex-col gap-y-4">
                            {data?.data.map((post: Post) => (
                                <div key={post.id}>
                                    <PostManagementCard data={post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Empty
                            description="Chưa có bài đăng nào"
                            className="my-16"
                        />
                    )}

                    {/* Pagination */}
                    {isSuccess && data?.data.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                onChange={handlePaginationChange}
                                current={appliedFilterData.page}
                                pageSize={appliedFilterData.limit}
                                total={data?.totalItems ?? 0}
                                showSizeChanger
                                showTotal={(total, range) =>
                                    `${range[0]}-${range[1]} của ${total} bài đăng`
                                }
                                pageSizeOptions={["5", "10", "20", "50"]}
                            />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default PostsManagement;
