import type { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { FaHome, FaUser, FaCalendarAlt, FaBell } from "react-icons/fa";
import { BsHouseAddFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
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
    // lấy phần đầu tiên để match key menu
    const selectedKey = currentPath.split("/")[0]; // appointment

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
                    label: <p>Tài khoản của tôi</p>,
                    icon: <FaUser />,
                    children: [
                        {
                            key: "account/profile",
                            label: <p>Hồ sơ</p>,
                        },
                        {
                            key: "account/change-password",
                            label: <p>Đổi mật khẩu</p>,
                        },
                    ],
                },
                {
                    key: "posts",
                    label: "Quản lí bài đăng",
                    icon: <FaHome />,
                },
                {
                    key: "posts/create-accomodation",
                    label: "Tạo chỗ ở mới",
                    icon: <BsHouseAddFill />,
                },
                {
                    key: "appointment",
                    label: <p>Lịch hẹn</p>,
                    icon: <FaCalendarAlt />,
                },
                {
                    key: "notification",
                    label: <p>Thông báo</p>,
                    icon: <FaBell />,
                },
            ];
            break;
        case "admin":
            menuItems = [
                {
                    key: "overview",
                    label: "Tổng quan",
                    icon: <AiFillDashboard />,
                },
                // {
                //     key: "account",
                //     label: <p>Tài khoản của tôi</p>,
                //     icon: <FaUser />,
                //     children: [
                //         {
                //             key: "account/profile",
                //             label: <p>Hồ sơ</p>,
                //         },
                //         {
                //             key: "account/change-password",
                //             label: <p>Đổi mật khẩu</p>,
                //         },
                //     ],
                // },
                {
                    key: "users",
                    label: "Quản lí người dùng",
                    icon: <FaHome />,
                },
                {
                    key: "posts",
                    label: "Quản lí bài đăng",
                    icon: <FaHome />,
                },
                {
                    key: "appointment",
                    label: <p>Lịch hẹn</p>,
                    icon: <FaCalendarAlt />,
                },
                {
                    key: "notification",
                    label: <p>Thông báo</p>,
                    icon: <FaBell />,
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
        <div className={className}>
            <Menu
                className="h-full w-full !border-none"
                mode="inline"
                // highlight đúng item
                selectedKeys={[selectedKey]}
                defaultOpenKeys={getOpenKey(currentPath)}
                onClick={onClick}
                items={menuItems}
            />
        </div>
    );
};

export default LeftSideBar;
