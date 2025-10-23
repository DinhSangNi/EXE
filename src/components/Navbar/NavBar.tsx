// NavBar.tsx
import { IoHome } from "react-icons/io5";
import { FaConciergeBell } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Modal, type MenuProps } from "antd";
import { useAnimation, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores/store";
import { AuthServices } from "@/services/auth";
import { logout } from "@/stores/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logo } from "@/assets/images";
import NotificationBell from "../NotificationBell";
import HostTypeCard from "./HostTypeCard";
import NavOption from "./NavbarOption";
import { getMenuItems } from "./MenuItems";

const POST_TYPES = [
    { title: "accomodation", icon: IoHome },
    { title: "service", icon: FaConciergeBell },
];

type Props = { isTop: boolean };

const NavBar = ({ isTop }: Props) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState<
        "accomodation" | "service"
    >("accomodation");
    const [openHostModal, setOpenHostModal] = useState(false);
    const [selectedHostOption, setSelectedHostOption] = useState<
        "accomodation" | "service" | null
    >(null);

    const searchAnim = useAnimation();
    const optionRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await AuthServices.logout();
            dispatch(logout());
            toast.success("Đăng xuất thành công!", {
                position: "top-center",
                delay: 1500,
            });
            navigate("/login");
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const items: MenuProps["items"] = getMenuItems(
        user,
        navigate,
        handleLogout,
        () => setOpenHostModal(true)
    );

    useEffect(() => {
        searchAnim.start({
            y: isTop ? 0 : -64,
            transition: { duration: 0.3 },
        });
    }, [isTop, searchAnim]);

    useEffect(() => {
        if (user.role === "admin") {
            navigate("/admin/overview");
        }
    }, [user]);

    return (
        <div className="w-full">
            <div className="relative mx-auto flex w-[95%] pb-6">
                {/* Logo */}
                <div className="w-1/5">
                    <img
                        src={logo ?? ""}
                        alt="logo"
                        className="h-auto w-10 cursor-pointer object-cover"
                        onClick={() => navigate("/")}
                    />
                </div>

                {/* CenterSide */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={searchAnim}
                    ref={optionRef}
                    className="flex h-fit w-3/5 justify-center gap-10 text-[0.8rem] md:text-[0.9rem]"
                >
                    {POST_TYPES.map((opt) => (
                        <NavOption
                            key={opt.title}
                            icon={opt.icon}
                            title={opt.title as "accomodation" | "service"}
                            selected={selectedOption}
                            onSelect={setSelectedOption}
                        />
                    ))}
                </motion.div>

                {/* RightSide */}
                <div className="flex w-1/5 items-center justify-end gap-4">
                    {user?.role === "user" && (
                        <button
                            className="hidden h-9 items-center rounded-full p-3 hover:bg-gray-300 lg:flex"
                            onClick={() => setOpenHostModal(true)}
                        >
                            <p className="text-[0.9rem] font-bold">Đăng tin</p>
                        </button>
                    )}
                    <NotificationBell />
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 hover:bg-gray-300">
                            {user.id ? (
                                user.avatar ? (
                                    <img
                                        src={user.avatar ?? ""}
                                        alt="user_avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                        {user.name
                                            ? user.name.charAt(0).toUpperCase()
                                            : "U"}
                                    </div>
                                )
                            ) : (
                                <FaBars className="h-3 w-3" />
                            )}
                        </button>
                    </Dropdown>
                </div>
            </div>

            {/* Modal chọn loại đăng tin */}
            <Modal
                open={openHostModal}
                onCancel={() => {
                    setOpenHostModal(false);
                    setSelectedHostOption(null);
                }}
                footer={
                    <div>
                        <button
                            className={`rounded-lg bg-gray-200 px-6 py-2 text-white ${
                                selectedHostOption && "bg-gray-800"
                            }`}
                            onClick={() =>
                                navigate(
                                    selectedHostOption === "accomodation"
                                        ? "/user/posts/create-accomodation"
                                        : ""
                                )
                            }
                        >
                            Tiếp tục
                        </button>
                    </div>
                }
            >
                <h1 className="mt-8 w-full text-center text-[1.4rem] font-bold">
                    Bạn muốn cung cấp gì?
                </h1>
                <div className="mt-6 flex justify-between gap-4">
                    {POST_TYPES.map((opt) => (
                        <HostTypeCard
                            key={opt.title}
                            title={
                                opt.title as "accomodation" | "service" | null
                            }
                            icon={opt.icon}
                            selected={selectedHostOption}
                            onSelect={setSelectedHostOption}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default NavBar;
