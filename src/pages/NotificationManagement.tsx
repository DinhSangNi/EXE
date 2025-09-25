/* eslint-disable */
import { useState, useMemo, useEffect } from "react";
import useNotifications from "@/hooks/notification/useNotifications";
import { formatPostDate } from "@/utils/format";
import { Divider, Table, Select, ConfigProvider } from "antd";
import type { TableProps } from "antd/lib";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/stores/type";

const { Option } = Select;

interface DataType {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    appointment: Appointment;
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

    const navigate = useNavigate();

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text) => <p className="line-clamp-1">{text}</p>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message",
            render: (text) => <p className="line-clamp-2">{text}</p>,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => formatPostDate(text),
        },
    ];

    const resolvedData: DataType[] = useMemo(() => {
        // console.log("data: ", data);
        return (
            data?.data.map((n) => ({
                id: n.id,
                title: n.title,
                message: n.message,
                appointment: n?.notificationAppointments?.[0]?.appointment,
                createdAt: n.createdAt,
            })) || []
        );
    }, [data]);

    // Refetch khi sort thay đổi
    useEffect(() => {
        setPagination((prev) => ({ ...prev, current: 1 }));
        refetch();
    }, [sortKey, refetch]);

    return (
        <div className="w-full bg-gray-100">
            <div className="mx-auto min-h-screen w-4/5 pt-4">
                <h1 className="text-[1.4rem] font-bold">Thông báo</h1>
                <Divider />

                {/* Sort */}
                <div className="mb-4 flex items-center gap-4">
                    <span>Sort:</span>
                    <Select
                        style={{ width: 250 }}
                        value={sortKey}
                        onChange={(value) => {
                            const [_, order] = (value as string).split("_");
                            setSortOrder(order as "asc" | "desc");
                            setSortKey(value as string);
                        }}
                    >
                        <Option value="createdAt_desc">
                            Mới nhất → Cũ nhất
                        </Option>
                        <Option value="createdAt_asc">
                            Cũ nhất → Mới nhất
                        </Option>
                    </Select>
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: "",
                                headerBg: "",
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
                        rowHoverable
                        onRow={(record) => {
                            return {
                                onClick: () =>
                                    navigate(
                                        `/user/appointment/${record.appointment.id}`
                                    ),
                                className:
                                    "cursor-pointer transition-colors duration-200 hover:bg-primary/30",
                            };
                        }}
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

export default NotificationManagement;
