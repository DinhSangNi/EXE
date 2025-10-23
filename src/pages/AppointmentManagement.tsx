import { useState, useMemo, useEffect, useCallback } from "react";
import useAppointments from "@/hooks/appointment/useAppointments";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";
import type { updateAppointmentDto } from "@/stores/type";
import { formatToVietnamTime } from "@/utils/format";
import { Table, Select, Input, Card, Tag, Space, Typography } from "antd";
import type { TableProps } from "antd/lib";
import {
    SearchOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Text } = Typography;

interface DataType {
    id: string;
    appointmentDateTime: string;
    user: string;
    host: string;
    postTitle: string;
    postId: string;
    status: "pending" | "confirmed" | "rejected" | "cancelled";
}

const AppointmentManagement = () => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [statusFilter, setStatusFilter] = useState<string>();
    const [sortBy, setSortBy] = useState<"createdAt" | "appointmentDateTime">(
        "createdAt"
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [keyword, setKeyword] = useState<string>("");
    const navigate = useNavigate();

    const { data, isLoading, refetch } = useAppointments({
        page: pagination.current,
        limit: pagination.pageSize,
        status: statusFilter as
            | "pending"
            | "confirmed"
            | "rejected"
            | "cancelled",
        sortBy,
        sortOrder,
        keyword: keyword.trim() ? keyword : undefined,
    });

    const { mutate: updateAppointment } = useUpdateAppointment();

    const handleUpdateAppointment = useCallback(
        (id: string, dto: updateAppointmentDto) => {
            updateAppointment({ id, updateAppointmentDto: dto });
        },
        [updateAppointment]
    );

    const resolvedData: DataType[] = useMemo(
        () =>
            data?.data.map((apm) => ({
                id: apm.id,
                appointmentDateTime: apm.appointmentDateTime,
                user: apm.user.name,
                host: apm.host.name,
                postId: apm.appointmentPosts[0].post.id,
                postTitle: apm.appointmentPosts[0].post.title,
                status: apm.status,
            })) || [],
        [data?.data]
    );

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => refetch(), 500);
        return () => clearTimeout(timer);
    }, [keyword, statusFilter, sortBy, sortOrder, refetch]);

    useEffect(() => {
        refetch();
    }, [pagination.current, pagination.pageSize, refetch]);

    const columns: TableProps<DataType>["columns"] = useMemo(
        () => [
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
                title: "Người đặt lịch",
                dataIndex: "user",
                key: "user",
                render: (name: string) => (
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{name}</span>
                    </div>
                ),
            },
            {
                title: "Người được đặt lịch",
                dataIndex: "host",
                key: "host",
                render: (name: string) => (
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{name}</span>
                    </div>
                ),
            },
            {
                title: "Ngày đặt lịch hẹn",
                dataIndex: "appointmentDateTime",
                key: "appointmentDateTime",
                render: (text: string) => (
                    <Space>
                        <CalendarOutlined className="text-gray-400" />
                        <span>{formatToVietnamTime(text)}</span>
                    </Space>
                ),
            },
            {
                title: "Tiêu đề bài đăng",
                dataIndex: "postTitle",
                key: "postTitle",
                ellipsis: true,
                render: (text: string) => (
                    <span className="text-gray-700">{text}</span>
                ),
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                width: 150,
                align: "center",
                render: (text: string) => {
                    const statusConfig: Record<
                        string,
                        {
                            label: string;
                            color: string;
                            icon: React.ReactNode;
                        }
                    > = {
                        pending: {
                            label: "Đang chờ",
                            color: "warning",
                            icon: <ClockCircleOutlined />,
                        },
                        confirmed: {
                            label: "Đã xác nhận",
                            color: "success",
                            icon: <CheckCircleOutlined />,
                        },
                        rejected: {
                            label: "Đã từ chối",
                            color: "error",
                            icon: <CloseCircleOutlined />,
                        },
                        cancelled: {
                            label: "Đã hủy",
                            color: "default",
                            icon: <StopOutlined />,
                        },
                    };
                    const config = statusConfig[text] || {
                        label: text,
                        color: "default",
                        icon: null,
                    };
                    return (
                        <Tag
                            icon={config.icon}
                            color={config.color}
                            className="m-0"
                        >
                            {config.label}
                        </Tag>
                    );
                },
            },
        ],
        [handleUpdateAppointment]
    );

    return (
        <div className="w-full bg-gray-50 pb-10">
            <div className="mx-auto min-h-screen w-full px-10 pt-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[1.8rem] font-bold text-gray-800">
                        Quản lý lịch hẹn
                    </h1>
                    <p className="text-gray-500">
                        Quản lý và theo dõi các lịch hẹn trong hệ thống
                    </p>
                </div>

                {/* Filters Card */}
                <Card className="mb-6 shadow-md">
                    <Space size="middle" wrap className="w-full">
                        <Input
                            placeholder="Tìm kiếm theo tiêu đề bài đăng..."
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
                            onChange={setStatusFilter}
                            allowClear
                            style={{ width: 200 }}
                            size="large"
                        >
                            <Option value="pending">
                                <Space>
                                    <ClockCircleOutlined />
                                    Đang chờ
                                </Space>
                            </Option>
                            <Option value="confirmed">
                                <Space>
                                    <CheckCircleOutlined />
                                    Đã xác nhận
                                </Space>
                            </Option>
                            <Option value="rejected">
                                <Space>
                                    <CloseCircleOutlined />
                                    Đã từ chối
                                </Space>
                            </Option>
                            <Option value="cancelled">
                                <Space>
                                    <StopOutlined />
                                    Đã hủy
                                </Space>
                            </Option>
                        </Select>

                        <Select
                            placeholder="Sắp xếp"
                            value={`${sortBy}_${sortOrder}`}
                            onChange={(value) => {
                                const [field, order] = (value as string).split(
                                    "_"
                                );
                                setSortBy(
                                    field as "createdAt" | "appointmentDateTime"
                                );
                                setSortOrder(order as "asc" | "desc");
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
                            <Option value="appointmentDateTime_desc">
                                Ngày hẹn mới → cũ
                            </Option>
                            <Option value="appointmentDateTime_asc">
                                Ngày hẹn cũ → mới
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
                        onRow={(record) => ({
                            onClick: () =>
                                navigate(`/user/appointment/${record.id}`),
                            className:
                                "cursor-pointer transition-colors duration-200 hover:bg-blue-50",
                        })}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: data?.totalItems || 0,
                            showSizeChanger: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} lịch hẹn`,
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

export default AppointmentManagement;
