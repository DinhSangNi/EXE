import type { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { FaTachometerAlt, FaHome, FaUser } from "react-icons/fa";
import { BsHouseAddFill } from "react-icons/bs";
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
    const currentPath = pathname.replace(rolePrefix, "");

    // 👉 Lấy openKey từ path để mở SubMenu (nếu có)
    const getOpenKey = (key: string) => {
        const segments = key.split("/");
        if (segments.length > 1) {
            return [segments[0]]; // Ví dụ: ["account"] nếu key là "account/change-password"
        }
        return [];
    };

    let menuItems: MenuItemType[] = [];
    if (user.role === "host") {
        menuItems = [
            {
                key: "dashboard",
                label: <p>Tổng quan</p>,
                icon: <FaTachometerAlt />,
            },
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
                key: "posts/create",
                label: "Tạo bài đăng mới",
                icon: <BsHouseAddFill />,
            },
        ];
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
                selectedKeys={[currentPath]}
                defaultOpenKeys={getOpenKey(currentPath)}
                onClick={onClick}
                items={menuItems}
            />
        </div>
    );
};

export default LeftSideBar;
