import { useState } from "react";
import { Table, Input, Select, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useSearchParams, useNavigate } from "react-router-dom";
import useUsersList from "@/hooks/admin/useUsersList";
import type { User } from "@/stores/type";
import type { UserQuery } from "@/services/admin";

const { Search } = Input;
const { Option } = Select;

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
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
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
        <div className="px-10 py-6">
            <h1 className="mb-10 text-xl font-bold">Quản lý người dùng</h1>
            <Space>
                <Search
                    placeholder="Search users..."
                    allowClear
                    defaultValue={query.q}
                    onSearch={onSearch}
                    style={{ width: 200 }}
                />
                <Select
                    placeholder="Filter by role"
                    allowClear
                    style={{ width: 150 }}
                    value={query.role}
                    onChange={onRoleChange}
                >
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                </Select>
            </Space>

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
                    pageSizeOptions: ["5", "10", "20"],
                }}
                onChange={onTableChange}
            />
        </div>
    );
};

export default UserManagement;
