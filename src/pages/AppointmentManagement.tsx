import { useState, useMemo, useEffect } from "react";
import useAppointments from "@/hooks/appointment/useAppointments";
import useUpdateAppointment from "@/hooks/appointment/useUpdateAppointment";
import type { updateAppointmentDto } from "@/stores/type";
import { formatToVietnamTime } from "@/utils/format";
import { Divider, Dropdown, Table, Select } from "antd";
import type { TableProps } from "antd/lib";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

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
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [statusFilter, setStatusFilter] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState<"createdAt" | "appointmentDateTime">(
        "createdAt"
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortKey, setSortKey] = useState<string>(`${sortBy}_${sortOrder}`);

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
    });

    console.log("data: ", data);

    const { mutate: updateAppointment } = useUpdateAppointment();

    const handleUpdateAppointment = (id: string, dto: updateAppointmentDto) => {
        updateAppointment({ id, updateAppointmentDto: dto });
    };

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text) => <p className="line-clamp-1">{text}</p>,
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
            render: (text, record) => (
                <Link to={`/posts/${record.postId}`}>{text}</Link>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => (
                <p
                    className={
                        text === "pending"
                            ? "text-red-500"
                            : text === "confirmed"
                              ? "text-green-500"
                              : text === "rejected"
                                ? "text-gray-500"
                                : "text-yellow-500"
                    }
                >
                    {text}
                </p>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <button
                                        disabled={record.status === "cancelled"}
                                        className="flex items-center gap-2 text-green-500"
                                        onClick={() =>
                                            handleUpdateAppointment(record.id, {
                                                status: "confirmed",
                                            })
                                        }
                                    >
                                        <IoMdCheckmark />
                                        <p>Đồng ý</p>
                                    </button>
                                ),
                                key: "0",
                            },
                            {
                                label: (
                                    <button
                                        disabled={
                                            record.status === "confirmed" ||
                                            record.status === "cancelled"
                                        }
                                        className="flex items-center gap-2 text-red-500"
                                        onClick={() =>
                                            handleUpdateAppointment(record.id, {
                                                status: "rejected",
                                            })
                                        }
                                    >
                                        <FaTimes />
                                        <p>Từ chối</p>
                                    </button>
                                ),
                                key: "1",
                            },
                            {
                                label: (
                                    <button
                                        disabled={record.status === "cancelled"}
                                        className="flex items-center gap-2 text-yellow-500"
                                        onClick={() =>
                                            handleUpdateAppointment(record.id, {
                                                status: "cancelled",
                                            })
                                        }
                                    >
                                        <FaTimes />
                                        <p>Hủy</p>
                                    </button>
                                ),
                                key: "2",
                            },
                        ],
                    }}
                    trigger={["click"]}
                >
                    <div className="flex w-full items-center justify-center">
                        <div className="cursor-pointer rounded-full bg-gray-100 p-1">
                            <FaEllipsisH />
                        </div>
                    </div>
                </Dropdown>
            ),
        },
    ];

    const resolvedData: DataType[] = useMemo(() => {
        return (
            data?.data.map((apm) => ({
                id: apm.id,
                appointmentDateTime: apm.appointmentDateTime,
                user: apm.user.name,
                host: apm.host.name,
                postId: apm.appointmentPosts[0].post.id,
                postTitle: apm.appointmentPosts[0].post.title,
                status: apm.status,
            })) || []
        );
    }, [data]);

    // Refetch khi filter hoặc sort thay đổi
    useEffect(() => {
        setPagination((prev) => ({ ...prev, current: 1 }));
        refetch();
    }, [statusFilter, sortBy, sortOrder, refetch]);

    // Refetch khi chọn lại cùng sort value
    useEffect(() => {
        if (sortKey) {
            refetch();
        }
    }, [sortKey, refetch]);

    return (
        <div className="w-full bg-gray-100">
            <div className="mx-auto min-h-screen w-4/5 pt-4">
                <h1 className="text-[1.4rem] font-bold">Lịch hẹn</h1>
                <Divider />

                {/* Filter + Sort */}
                <div className="mb-4 flex items-center gap-4">
                    <span>Status:</span>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Chọn trạng thái"
                        allowClear
                        value={statusFilter}
                        onChange={(value) => setStatusFilter(value)}
                    >
                        <Option value="pending">Pending</Option>
                        <Option value="confirmed">Confirmed</Option>
                        <Option value="rejected">Rejected</Option>
                        <Option value="cancelled">Cancelled</Option>
                    </Select>

                    <span>Sort:</span>
                    <Select
                        style={{ width: 250 }}
                        value={sortKey}
                        onChange={(value) => {
                            const [field, order] = (value as string).split("_");
                            setSortBy(
                                field as "createdAt" | "appointmentDateTime"
                            );
                            setSortOrder(order as "asc" | "desc");
                            setSortKey(value as string); // trigger refetch cả khi chọn lại
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

                <Table
                    className="w-full"
                    columns={columns}
                    dataSource={resolvedData}
                    rowKey="id"
                    loading={isLoading}
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
            </div>
        </div>
    );
};

export default AppointmentManagement;
