import { logo } from "@/assets/images";
import type { AppDispatch, RootState } from "@/stores/store";
import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import type { MenuProps } from "antd/lib";
import { FaBars } from "react-icons/fa";
import Searchbar from "./SearchBar";
import { AuthServices } from "@/services/auth";
import { logout } from "@/stores/userSlice";
import { toast } from "react-toastify";

const LeanHeader = () => {
    const storedUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthServices.logout();
            dispatch(logout());
            toast.success("Đăng xuất thành công !", {
                position: "top-center",
            });
            navigate("/login");
        } catch (error) {
            console.log("error: ", error);
        }
    };

    // Hàm get menu item theo stored user
    const getMenuItems = (): MenuProps["items"] => {
        const authItem = {
            label: storedUser.id ? (
                <div className="font-bold" onClick={handleLogout}>
                    Đăng xuất
                </div>
            ) : (
                <div className="font-bold" onClick={() => navigate("/login")}>
                    Đăng nhập hoặc Đăng ký
                </div>
            ),
            key: "auth",
        };

        if (storedUser.role === "user") {
            return [
                {
                    label: <div className="font-bold">Đăng tin</div>,
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
                    key: "0",
                },
                {
                    label: <div className="font-bold">Tin đã lưu</div>,
                    key: "saved",
                },
                // {
                //     label: (
                //         <div
                //             className="font-bold"
                //             onClick={() => navigate("/user/posts")}
                //         >
                //             Quản lý tin đã đăng
                //         </div>
                //     ),
                //     key: "manage",
                // },
                { type: "divider" },
                authItem,
            ];
        }

        if (storedUser.role === "admin") {
            return [
                {
                    label: (
                        <div
                            className="font-bold"
                            onClick={() => navigate("/admin/overview")}
                        >
                            Bảng điều khiển
                        </div>
                    ),
                    key: "dashboard",
                },
                { type: "divider" },
                authItem,
            ];
        }

        return [authItem];
    };

    return (
        <div className="fixed top-0 z-30 flex h-[var(--lean-header-height)] w-full items-center border-b-[1px] border-gray-300 bg-white px-14 py-4">
            <div className="mx-auto flex w-full items-center">
                {/* Logo */}
                <div className="w-1/5">
                    <img
                        src={logo ?? ""}
                        alt="logo"
                        className="w-10 cursor-pointer object-cover"
                        onClick={() => navigate("/")}
                    />
                </div>

                {/* Center */}
                <div className="flex w-3/5 justify-center text-sm md:text-base">
                    <Searchbar isTop={true} />
                </div>

                {/* Right */}
                <div className="flex w-1/5 items-center justify-end gap-4">
                    {storedUser.role === "user" && (
                        <button className="hidden h-9 items-center rounded-full p-3 hover:bg-gray-300 lg:flex">
                            <p className="text-base font-bold">Đăng tin</p>
                        </button>
                    )}

                    <NotificationBell />

                    <Dropdown
                        menu={{ items: getMenuItems() }}
                        trigger={["click"]}
                    >
                        <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 hover:bg-gray-300">
                            {storedUser.id ? (
                                <img
                                    src={storedUser.avatar ?? ""}
                                    alt="avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FaBars className="h-3 w-3" />
                            )}
                        </button>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default LeanHeader;
