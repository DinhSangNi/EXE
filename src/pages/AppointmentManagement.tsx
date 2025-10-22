import { useState, useMemo, useEffect, useCallback } from "react";
import useAppointments from "@/hooks/appointment/useAppointments";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";
import type { updateAppointmentDto } from "@/stores/type";
import { formatToVietnamTime } from "@/utils/format";
import { Divider, Table, Select, Input, ConfigProvider } from "antd";
import type { TableProps } from "antd/lib";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

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
            },
            { title: "Người đặt lịch", dataIndex: "user", key: "user" },
            { title: "Người được đặt lịch", dataIndex: "host", key: "host" },
            {
                title: "Ngày đặt lịch hẹn",
                dataIndex: "appointmentDateTime",
                key: "appointmentDateTime",
                render: (text) => formatToVietnamTime(text),
            },
            {
                title: "Tiêu đề bài đăng",
                dataIndex: "postTitle",
                key: "postTitle",
                render: (text) => <p>{text}</p>,
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (text) => {
                    const statusMap: Record<
                        string,
                        { label: string; color: string }
                    > = {
                        pending: { label: "Đang chờ", color: "text-red-500" },
                        confirmed: {
                            label: "Đã xác nhận",
                            color: "text-green-500",
                        },
                        rejected: {
                            label: "Đã từ chối",
                            color: "text-gray-500",
                        },
                        cancelled: {
                            label: "Đã hủy",
                            color: "text-yellow-500",
                        },
                    };
                    const status = statusMap[text] || {
                        label: text,
                        color: "text-black",
                    };
                    return <p className={status.color}>{status.label}</p>;
                },
            },
        ],
        [handleUpdateAppointment]
    );

    return (
        <div className="w-full bg-white">
            <div className="mx-auto min-h-screen w-4/5 pt-4">
                <h1 className="text-[1.4rem] font-bold">Lịch hẹn</h1>
                <Divider />
                {/* Filter + Sort + Search */}
                <div className="mb-4 flex items-center gap-4">
                    <Input
                        placeholder="Tìm kiếm theo tiêu đề bài đăng..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        prefix={<FaSearch className="text-gray-400" />}
                        allowClear
                        style={{ width: 300 }}
                    />
                    <span>Trạng thái:</span>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Chọn trạng thái"
                        allowClear
                        value={statusFilter}
                        onChange={setStatusFilter}
                    >
                        <Option value="pending">Đang chờ duyệt</Option>
                        <Option value="confirmed">Đã xác nhận</Option>
                        <Option value="rejected">Đã từ chối</Option>
                        <Option value="cancelled">Đã hủy</Option>
                    </Select>
                    <span>Sắp xếp:</span>
                    <Select
                        style={{ width: 250 }}
                        value={`${sortBy}_${sortOrder}`}
                        onChange={(value) => {
                            const [field, order] = (value as string).split("_");
                            setSortBy(
                                field as "createdAt" | "appointmentDateTime"
                            );
                            setSortOrder(order as "asc" | "desc");
                        }}
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
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: "hover:bg-primary",
                            },
                        },
                    }}
                >
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
                                "cursor-pointer transition-colors duration-200 hover:bg-primary/20",
                        })}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: data?.totalItems || 0,
                            onChange: (page, pageSize) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    current: page,
                                    pageSize,
                                })),
                        }}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
};

export default AppointmentManagement;
