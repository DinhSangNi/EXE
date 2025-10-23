/* eslint-disable */
import { useState, useMemo, useEffect } from "react";
import useNotifications from "@/hooks/notification/useNotifications";
import { formatPostDate } from "@/utils/format";
import { Table, Select, Card, Space, Tag, Typography, Badge } from "antd";
import type { TableProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/stores/type";
import useMarkNotificationRead from "@/hooks/notification/useMarkNotificationRead";
import {
    BellOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

interface DataType {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    appointment: Appointment;
    isRead: boolean;
    userNotificationId: string;
}

const NotificationManagement = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [sortKey, setSortKey] = useState<string>("createdAt_desc");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const { data, isLoading, refetch } = useNotifications({
        page: pagination.current,
        limit: pagination.pageSize,
        sortBy: "createdAt",
        sortOrder,
    });

    const { mutate: markRead } = useMarkNotificationRead();
    const navigate = useNavigate();

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 120,
            render: (id: string) => (
                <Text copyable={{ text: id }} className="text-xs">
                    {id.slice(0, 8)}...
                </Text>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            render: (text: string, record: DataType) => (
                <div className="flex items-center gap-2">
                    {!record.isRead && (
                        <Badge status="processing" className="animate-pulse" />
                    )}
                    <span className={record.isRead ? "" : "font-semibold"}>
                        {text}
                    </span>
                </div>
            ),
        },
        {
            title: "Lời nhắn",
            dataIndex: "message",
            key: "message",
            ellipsis: true,
            render: (text: string) => (
                <span className="text-gray-600">{text}</span>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 180,
            render: (text: string) => (
                <Space>
                    <ClockCircleOutlined className="text-gray-400" />
                    <span>{formatPostDate(text)}</span>
                </Space>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "isRead",
            key: "isRead",
            width: 130,
            align: "center",
            render: (isRead: boolean) => (
                <Tag
                    icon={isRead ? <CheckCircleOutlined /> : <BellOutlined />}
                    color={isRead ? "default" : "blue"}
                >
                    {isRead ? "Đã đọc" : "Chưa đọc"}
                </Tag>
            ),
        },
    ];

    const resolvedData: DataType[] = useMemo(() => {
        return (
            data?.data.map((n) => ({
                id: n.id,
                title: n.title,
                message: n.message,
                appointment: n?.notificationAppointments?.[0]?.appointment,
                createdAt: n.createdAt,
                isRead: n.userNotifications?.[0]?.isRead,
                userNotificationId: n.userNotifications?.[0]?.id,
            })) || []
        );
    }, [data]);

    useEffect(() => {
        setPagination((prev) => ({ ...prev, current: 1 }));
        refetch();
    }, [sortKey, refetch]);

    return (
        <div className="w-full bg-gray-50 pb-10">
            <div className="mx-auto min-h-screen w-full px-10 pt-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[1.8rem] font-bold text-gray-800">
                        Quản lý thông báo
                    </h1>
                    <p className="text-gray-500">
                        Theo dõi và quản lý các thông báo trong hệ thống
                    </p>
                </div>

                {/* Filters Card */}
                <Card className="mb-6 shadow-md">
                    <Space size="middle" wrap className="w-full">
                        <Select
                            placeholder="Sắp xếp"
                            value={sortKey}
                            onChange={(value) => {
                                const [_, order] = (value as string).split("_");
                                setSortOrder(order as "asc" | "desc");
                                setSortKey(value as string);
                            }}
                            style={{ width: 250 }}
                            size="large"
                        >
                            <Option value="createdAt_desc">
                                Mới nhất → Cũ nhất
                            </Option>
                            <Option value="createdAt_asc">
                                Cũ nhất → Mới nhất
                            </Option>
                        </Select>
                    </Space>
                </Card>

                {/* Table Card */}
                <Card className="shadow-md">
                    <Table
                        className="w-full"
                        columns={columns}
                        dataSource={resolvedData}
                        rowKey="id"
                        loading={isLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    if (
                                        !record.isRead &&
                                        record.userNotificationId
                                    ) {
                                        markRead(record.userNotificationId);
                                    }
                                    navigate(
                                        `/user/appointment/${record.appointment.id}`
                                    );
                                },
                                className: `${
                                    record.isRead ? "" : "bg-blue-50"
                                } cursor-pointer transition-colors duration-200 hover:bg-blue-100`,
                            };
                        }}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: data?.totalItems || 0,
                            showSizeChanger: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} thông báo`,
                            pageSizeOptions: ["5", "10", "20", "50"],
                            onChange: (page, pageSize) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    current: page,
                                    pageSize,
                                })),
                        }}
                    />
                </Card>
            </div>
        </div>
    );
};

export default NotificationManagement;
