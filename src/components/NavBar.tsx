// import { useNavigate } from "react-router-dom";
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

type Props = {
    isTop: boolean;
};

const hostOptions = [
    {
        title: "accomodation",
    },
    {
        title: "service",
    },
];

const NavBar = ({ isTop }: Props) => {
    const storedUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<
        "accomodation" | "service"
    >("accomodation");
    const [openHostModal, setOpenHostModal] = useState<boolean>(false);
    const [selectedHostOption, setSelectedHostOption] = useState<
        "accomodation" | "service" | null
    >();
    const optionRef = useRef<HTMLDivElement>(null);
    const searchAnt = useAnimation();
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

    let items: MenuProps["items"] = [];

    switch (storedUser.role) {
        case "user":
            items = [
                {
                    label: (
                        <div
                            className="w-[200px]"
                            onClick={() => setOpenHostModal(true)}
                        >
                            <p className="font-bold">Trở thành Host</p>
                            <p className="text-[0.8rem] text-gray-600">
                                Bắt đầu cho thuê và kiếm thêm thu nhập thật dễ
                                dàng
                            </p>
                        </div>
                    ),
                    key: "0",
                },
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
                        <div
                            className="font-bold"
                            onClick={() => navigate("/login")}
                        >
                            <p>Đăng nhập hoặc Đăng ký</p>
                        </div>
                    ),
                    key: "2",
                },
            ];
            break;
        case "admin":
            items = [
                {
                    label: (
                        <div
                            className="w-[200px]"
                            onClick={() => navigate("/admin/overview")}
                        >
                            <p className="font-bold">Bảng điều khiển</p>
                        </div>
                    ),
                    key: "0",
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
                        <div
                            className="font-bold"
                            onClick={() => navigate("/login")}
                        >
                            <p>Đăng nhập hoặc Đăng ký</p>
                        </div>
                    ),
                    key: "2",
                },
            ];
            break;
        default:
            items = [
                {
                    label: (
                        <div
                            className="w-[200px]"
                            onClick={() => navigate("/admin/overview")}
                        >
                            {/* <p className="font-bold">Bảng điều khiển</p> */}
                        </div>
                    ),
                    key: "0",
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
                        <div
                            className="font-bold"
                            onClick={() => navigate("/login")}
                        >
                            <p>Đăng nhập hoặc Đăng ký</p>
                        </div>
                    ),
                    key: "2",
                },
            ];
    }

    useEffect(() => {
        if (!isTop) {
            searchAnt.start({
                y: -64,
                transition: { duration: 0.3 },
            });
        } else {
            searchAnt.start({
                y: 0,
                transition: { duration: 0.3 },
            });
        }
    }, [searchAnt, isTop]);

    return (
        <>
            <div className="w-full">
                <div className="relative mx-auto flex w-[95%] pb-6">
                    {/* Logo */}
                    <div className="w-1/5">
                        {/* <img
                            src={logo}
                            alt="logo"
                            className="h-auto w-[60px] cursor-pointer object-cover"
                            onClick={() => navigate("/")}
                        /> */}
                    </div>

                    {/* CenterSide */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={searchAnt}
                        ref={optionRef}
                        className="flex h-fit w-3/5 justify-center gap-10 text-[0.8rem] md:text-[0.9rem]"
                    >
                        <button
                            className="group relative flex cursor-pointer items-center gap-2 pb-2"
                            onClick={() => setSelectedOption("accomodation")}
                        >
                            <IoHome className="h-8 w-8 text-red-500 transition-transform duration-300 group-hover:scale-110" />
                            <p
                                className={`font-bold ${selectedOption === "accomodation" ? "text-black" : "text-gray-500"}`}
                            >
                                {"accomodation"}
                            </p>
                            <span
                                className={`absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 ${selectedOption === "accomodation" && "scale-x-100"}`}
                            ></span>
                        </button>
                        <button
                            className="group relative flex cursor-pointer items-center gap-2 pb-2"
                            onClick={() => setSelectedOption("service")}
                        >
                            <FaConciergeBell className="h-8 w-8 text-orange-300 transition-transform duration-300 group-hover:scale-110" />
                            <p
                                className={`font-bold ${selectedOption === "service" ? "text-black" : "text-gray-500"}`}
                            >
                                {"service"}
                            </p>
                            <span
                                className={`absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 ${selectedOption === "service" && "scale-x-100"}`}
                            ></span>
                        </button>
                    </motion.div>

                    {/* RightSide */}
                    <div className="flex w-1/5 items-center justify-end gap-4">
                        {storedUser?.role === "user" && (
                            <button
                                className="hidden h-9 items-center rounded-full p-3 hover:bg-gray-300 lg:flex"
                                onClick={() => setOpenHostModal(true)}
                            >
                                <p className="text-[0.9rem] font-bold">
                                    Đăng tin
                                </p>
                            </button>
                        )}
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

                {/* Become a host modal */}
                <Modal
                    open={openHostModal}
                    onCancel={() => {
                        setOpenHostModal(false);
                        setSelectedHostOption(null);
                    }}
                    footer={
                        <div>
                            <button
                                className={`rounded-lg bg-gray-200 px-6 py-2 text-white ${selectedHostOption && "bg-gray-800"}`}
                                onClick={() => navigate("")}
                            >
                                Tiếp tục
                            </button>
                        </div>
                    }
                >
                    <div>
                        <h1 className="mt-8 w-full text-center text-[1.4rem] font-bold">
                            Bạn muốn cung cấp gì?
                        </h1>
                        <div className="mt-6 flex justify-between gap-4">
                            {hostOptions.map((opt: { title: string }) => {
                                return (
                                    <div
                                        key={opt.title}
                                        className={`relative h-[300px] flex-1 cursor-pointer rounded-xl border-2 transition-colors duration-200 hover:bg-gray-200 ${selectedHostOption === opt.title ? "border-black" : "border-gray-200"}`}
                                        onClick={() => {
                                            setSelectedHostOption(
                                                opt.title as
                                                    | "accomodation"
                                                    | "service"
                                            );
                                        }}
                                    >
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {opt.title === "accomodation" ? (
                                                <IoHome className="h-16 w-16" />
                                            ) : (
                                                <FaConciergeBell className="h-16 w-16" />
                                            )}
                                        </div>
                                        <p className="mt-[220px] w-full text-center text-[1rem] font-bold">
                                            {opt.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default NavBar;
