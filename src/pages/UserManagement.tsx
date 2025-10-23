import { useState } from "react";
import { Table, Input, Select, Space, Card, Typography, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useSearchParams, useNavigate } from "react-router-dom";
import useUsersList from "@/hooks/admin/useUsersList";
import type { User } from "@/stores/type";
import type { UserQuery } from "@/services/admin";
import { SearchOutlined, UserOutlined, CrownOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const UserManagement = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy query từ URL
    const [query, setQuery] = useState<UserQuery>({
        q: searchParams.get("q") || undefined,
        role: (searchParams.get("role") as "user" | "admin") || undefined,
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "10"),
    });

    // Update URL khi query thay đổi
    const updateUrl = (newQuery: UserQuery) => {
        const params = new URLSearchParams();
        if (newQuery.q) params.set("q", newQuery.q);
        if (newQuery.role) params.set("role", newQuery.role);
        if (newQuery.page) params.set("page", newQuery.page.toString());
        if (newQuery.limit) params.set("limit", newQuery.limit.toString());

        navigate({ search: params.toString() }, { replace: true });
    };

    // Fetch data
    const { data, isLoading } = useUsersList(query);

    // Table columns
    const columns: ColumnsType<User> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 300,
            ellipsis: true,
            render: (id: string) => (
                <Text copyable={{ text: id }} className="text-gray-600">
                    {id.slice(0, 8)}...
                </Text>
            ),
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (name: string) => (
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <UserOutlined className="text-blue-600" />
                    </div>
                    <Text strong>{name}</Text>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email: string) => (
                <Text className="text-gray-600">{email}</Text>
            ),
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            width: 120,
            align: "center",
            render: (role: string) => {
                const isAdmin = role === "admin";
                return (
                    <Tag
                        icon={isAdmin ? <CrownOutlined /> : <UserOutlined />}
                        color={isAdmin ? "gold" : "blue"}
                        className="font-medium"
                    >
                        {isAdmin ? "Admin" : "User"}
                    </Tag>
                );
            },
        },
    ];

    // Handle search
    const onSearch = (value: string) => {
        const newQuery = { ...query, q: value, page: 1 };
        setQuery(newQuery);
        updateUrl(newQuery);
    };

    // Handle role filter
    const onRoleChange = (value: "user" | "admin" | undefined) => {
        const newQuery = { ...query, role: value, page: 1 };
        setQuery(newQuery);
        updateUrl(newQuery);
    };

    // Handle pagination change
    const onTableChange = (pagination: TablePaginationConfig) => {
        const newQuery = {
            ...query,
            page: pagination.current || 1,
            limit: pagination.pageSize || 10,
        };
        setQuery(newQuery);
        updateUrl(newQuery);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="w-full bg-gray-50 pb-10">
            <div className="mx-auto min-h-screen w-full px-10 pt-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[1.8rem] font-bold text-gray-800">
                        Quản lý người dùng
                    </h1>
                    <p className="text-gray-500">
                        Quản lý và theo dõi người dùng trong hệ thống
                    </p>
                </div>

                {/* Filters Card */}
                <Card className="mb-6 shadow-md">
                    <Space size="middle" wrap>
                        <Search
                            placeholder="Tìm kiếm người dùng..."
                            allowClear
                            defaultValue={query.q}
                            onSearch={onSearch}
                            style={{ width: 300 }}
                            prefix={
                                <SearchOutlined className="text-gray-400" />
                            }
                            size="large"
                        />
                        <Select
                            placeholder="Lọc theo vai trò"
                            allowClear
                            style={{ width: 200 }}
                            value={query.role}
                            onChange={onRoleChange}
                            size="large"
                        >
                            <Option value="user">
                                <Space>
                                    <UserOutlined />
                                    User
                                </Space>
                            </Option>
                            <Option value="admin">
                                <Space>
                                    <CrownOutlined />
                                    Admin
                                </Space>
                            </Option>
                        </Select>
                        {data?.totalItems !== undefined && (
                            <Text className="text-gray-600">
                                Tổng số:{" "}
                                <Text strong className="text-blue-600">
                                    {data.totalItems}
                                </Text>{" "}
                                người dùng
                            </Text>
                        )}
                    </Space>
                </Card>

                {/* Table Card */}
                <Card className="shadow-md">
                    <Table<User>
                        rowKey="id"
                        columns={columns}
                        dataSource={data?.data || []}
                        loading={isLoading}
                        pagination={{
                            current: query.page,
                            pageSize: query.limit,
                            total: data?.totalItems,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50"],
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} người dùng`,
                            position: ["bottomCenter"],
                        }}
                        onChange={onTableChange}
                        locale={{
                            emptyText: "Không tìm thấy người dùng nào",
                        }}
                        className="overflow-x-auto"
                    />
                </Card>
            </div>
        </div>
    );
};

export default UserManagement;
