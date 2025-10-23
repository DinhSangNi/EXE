/* eslint-disable */
import type { Post } from "@/stores/type";
import { formatPostDate, resolveAddress } from "@/utils/format";
import {
    HomeOutlined,
    EnvironmentOutlined,
    DollarOutlined,
    CalendarOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Tag, Space } from "antd";
import PostImageCarousel from "./PostImageCarousel";
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string;
    data?: Post;
    loading?: boolean;
};

const PostCard = ({ className, data, loading }: Props) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Card
                hoverable
                className={`overflow-hidden ${className}`}
                cover={
                    <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
                }
            >
                <div className="space-y-3">
                    <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>
            </Card>
        );
    }

    return (
        <Card
            hoverable
            className={`group overflow-hidden transition-all duration-300 hover:shadow-2xl ${className}`}
            cover={
                <div className="relative overflow-hidden">
                    <PostImageCarousel
                        images={data?.medias || []}
                        height="h-56"
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute right-3 top-3">
                        <Tag
                            color="blue"
                            className="rounded-full px-3 py-1 text-sm font-semibold shadow-lg"
                        >
                            <HomeOutlined className="mr-1" />
                            {data?.square}m²
                        </Tag>
                    </div>
                </div>
            }
            onClick={() => navigate(`/posts/${data?.id}`)}
            bodyStyle={{ padding: "16px" }}
        >
            <div className="space-y-3">
                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-500">
                    {data?.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                        <DollarOutlined className="text-blue-500" />
                    </div>
                    <span className="text-xl font-bold text-blue-500">
                        {data?.price
                            ? `${data.price.toLocaleString("vi-VN")} VNĐ`
                            : "Liên hệ"}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-gray-600">
                    <EnvironmentOutlined className="mt-1 text-base" />
                    <span className="line-clamp-2 text-sm">
                        {resolveAddress(
                            data?.city ?? "",
                            data?.district ?? "",
                            data?.ward ?? "",
                            ""
                        )}
                    </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <Space size="small">
                        <Avatar
                            size="small"
                            src={data?.owner?.medias?.[0]?.url}
                            icon={<UserOutlined />}
                            className="border-2 border-blue-100"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {data?.owner?.name}
                        </span>
                    </Space>
                    <Space size={4} className="text-xs text-gray-500">
                        <CalendarOutlined />
                        <span>{formatPostDate(data?.createdAt ?? "")}</span>
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default PostCard;
