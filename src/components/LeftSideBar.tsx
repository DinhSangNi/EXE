import type { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    CalendarOutlined,
    BellOutlined,
    DashboardOutlined,
    TeamOutlined,
    FileTextOutlined,
    PlusCircleOutlined,
    LockOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    className?: string;
};

type MenuItemType = Required<MenuProps>["items"][number];

const LeftSideBar = ({ className }: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const rolePrefix = `/${user.role}/`;
    // ví dụ: /user/appointment/83be39...  -> "appointment/83be39..."
    const currentPath = pathname.replace(rolePrefix, "");

    // Xác định selectedKey: ưu tiên match đầy đủ trước (vd: "posts/create-accomodation")
    // Nếu không match được thì lấy phần đầu tiên
    const getSelectedKey = () => {
        // Kiểm tra các key đặc biệt cần match đầy đủ
        if (currentPath.startsWith("posts/create-accomodation")) {
            return "posts/create-accomodation";
        }
        if (currentPath.startsWith("posts/edit-accomodation")) {
            return "posts"; // Edit vẫn thuộc quản lý bài đăng
        }
        if (currentPath.startsWith("account/")) {
            return currentPath; // Giữ nguyên cho submenu account
        }
        // Mặc định lấy phần đầu tiên
        return currentPath.split("/")[0];
    };

    const selectedKey = getSelectedKey();

    // Lấy openKey từ path để mở SubMenu (nếu có)
    const getOpenKey = (key: string) => {
        const segments = key.split("/");
        if (segments.length > 1) {
            return [segments[0]]; // Ví dụ: ["account"] nếu key là "account/change-password"
        }
        return [];
    };

    let menuItems: MenuItemType[] = [];

    switch (user.role) {
        case "user":
            menuItems = [
                {
                    key: "account",
                    label: "Tài khoản của tôi",
                    icon: <UserOutlined />,
                    children: [
                        {
                            key: "account/profile",
                            label: "Hồ sơ",
                            icon: <ProfileOutlined />,
                        },
                        {
                            key: "account/change-password",
                            label: "Đổi mật khẩu",
                            icon: <LockOutlined />,
                        },
                    ],
                },
                {
                    key: "posts",
                    label: "Quản lý bài đăng",
                    icon: <FileTextOutlined />,
                },
                {
                    key: "posts/create-accomodation",
                    label: "Tạo chỗ ở mới",
                    icon: <PlusCircleOutlined />,
                },
                {
                    key: "appointment",
                    label: "Lịch hẹn",
                    icon: <CalendarOutlined />,
                },
                {
                    key: "notification",
                    label: "Thông báo",
                    icon: <BellOutlined />,
                },
            ];
            break;
        case "admin":
            menuItems = [
                {
                    key: "overview",
                    label: "Tổng quan",
                    icon: <DashboardOutlined />,
                },
                {
                    key: "users",
                    label: "Quản lý người dùng",
                    icon: <TeamOutlined />,
                },
                {
                    key: "posts",
                    label: "Quản lý bài đăng",
                    icon: <FileTextOutlined />,
                },
                {
                    key: "appointment",
                    label: "Lịch hẹn",
                    icon: <CalendarOutlined />,
                },
                {
                    key: "notification",
                    label: "Thông báo",
                    icon: <BellOutlined />,
                },
            ];
            break;
    }

    // 👉 Navigate khi click
    const onClick: MenuProps["onClick"] = (e) => {
        const to = `/${user.role}/${e.key}`;
        navigate(to);
    };

    return (
        <div className={`${className} bg-white shadow-lg`}>
            <div className="border-b border-gray-200 px-6 py-6">
                <h2 className="text-lg font-bold text-gray-800">
                    {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                </h2>
                <p className="text-sm text-gray-500">Bảng điều khiển</p>
            </div>
            <Menu
                className="h-full w-full !border-none px-3 py-4"
                mode="inline"
                selectedKeys={[selectedKey]}
                defaultOpenKeys={getOpenKey(currentPath)}
                onClick={onClick}
                items={menuItems}
                style={{
                    fontSize: "15px",
                    fontWeight: 500,
                }}
            />
        </div>
    );
};

export default LeftSideBar;
