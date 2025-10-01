import type { RootState } from "@/stores/store";
import type { MenuProps } from "antd";

export const getMenuItems = (
    user: RootState["user"],
    navigate: (url: string) => void,
    handleLogout: () => void,
    openModal: () => void
): MenuProps["items"] => {
    const isLoggedIn = Boolean(user.id);

    const authItem = {
        label: isLoggedIn ? (
            <div className="font-bold" onClick={handleLogout}>
                <p>Đăng xuất</p>
            </div>
        ) : (
            <div className="font-bold" onClick={() => navigate("/login")}>
                <p>Đăng nhập hoặc Đăng ký</p>
            </div>
        ),
        key: "auth",
    };

    if (user.role === "user") {
        return [
            {
                label: (
                    <div className="w-[200px]" onClick={openModal}>
                        <p className="font-bold">Đăng tin</p>
                    </div>
                ),
                key: "post",
            },
            {
                label: (
                    <div
                        className="w-[200px]"
                        onClick={() => navigate("/user/posts")}
                    >
                        <p className="font-bold">Bảng điều khiển</p>
                    </div>
                ),
                key: "dashboard",
            },
            {
                label: (
                    <div className="w-[200px]">
                        <p className="font-bold">Tin đã lưu</p>
                    </div>
                ),
                key: "saved",
            },
            { type: "divider" as const },
            authItem,
        ];
    }

    if (user.role === "admin") {
        return [
            {
                label: (
                    <div
                        className="w-[200px]"
                        onClick={() => navigate("/admin/overview")}
                    >
                        <p className="font-bold">Bảng điều khiển</p>
                    </div>
                ),
                key: "dashboard",
            },
            { type: "divider" as const },
            authItem,
        ];
    }

    return [authItem];
};
