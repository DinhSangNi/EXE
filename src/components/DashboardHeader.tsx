import { Dropdown, type MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores/store";
import { AuthServices } from "@/services/auth";
import { logout } from "@/stores/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { logo } from "@/assets/images";

type Props = {
    className?: string;
};

const DashboardHeader = ({ className }: Props) => {
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

    const items: MenuProps["items"] = [
        {
            label: (
                <div className="w-[200px]">
                    <p className="font-bold">Tin đã lưu</p>
                </div>
            ),
            key: "1",
        },
        {
            type: "divider",
        },
        {
            label: storedUser.id ? (
                <div className="font-bold" onClick={handleLogout}>
                    <p>Đăng xuất</p>
                </div>
            ) : (
                <div className="font-bold" onClick={() => navigate("/login")}>
                    <p>Đăng nhập hoặc Đăng ký</p>
                </div>
            ),
            key: "2",
        },
    ];

    return (
        <>
            <div
                className={`fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between bg-[#fbf6f0] shadow-lg ${className}`}
            >
                <div className="cursor-pointer" onClick={() => navigate("/")}>
                    <img src={logo} alt="Logo" className="w-12" />
                </div>
                <div>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 hover:bg-gray-300">
                            {storedUser.id ? (
                                <img
                                    src={storedUser.avatar ?? ""}
                                    alt="user_avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FaBars className="h-3 w-3" />
                            )}
                        </button>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;
