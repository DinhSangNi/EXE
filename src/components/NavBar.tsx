import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaConciergeBell } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { NavOptions } from "@/stores/enum";
import { Dropdown, Modal, type MenuProps } from "antd";
import { useAnimation, motion } from "framer-motion";

type Props = {
    isTop: boolean;
};

const hostOptions = [
    {
        title: NavOptions.ACCOMMODATION,
    },
    {
        title: NavOptions.SERVICE,
    },
];

const NavBar = ({ isTop }: Props) => {
    const items: MenuProps["items"] = [
        {
            label: (
                <div className="w-[200px]">
                    <p className="font-bold">Trở thành Host</p>
                    <p className="text-[0.8rem] text-gray-600">
                        Bắt đầu cho thuê và kiếm thêm thu nhập thật dễ dàng
                    </p>
                </div>
            ),
            key: "0",
        },

        {
            type: "divider",
        },
        {
            label: (
                <div className="font-bold">
                    <p>Đăng nhập hoặc Đăng ký</p>
                </div>
            ),
            key: "1",
        },
    ];

    const [selectedOption, setSelectedOption] = useState<NavOptions>(
        NavOptions.ACCOMMODATION
    );
    const [openHostModal, setOpenHostModal] = useState<boolean>(false);
    const [selectedHostOption, setSelectedHostOption] =
        useState<NavOptions | null>();
    const optionRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    // const navigate = useNavigate();

    useEffect(() => {
        if (!isTop) {
            controls.start({
                y: -64,
                transition: { duration: 0.3 },
            });
        } else {
            controls.start({
                y: 0,
                transition: { duration: 0.3 },
            });
        }
    }, [controls, isTop]);

    console.log("selectedHostOption: ", selectedHostOption);

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
                        animate={controls}
                        ref={optionRef}
                        className="flex h-fit w-3/5 justify-center gap-10 text-[0.9rem]"
                    >
                        <button
                            className="group relative flex cursor-pointer items-center gap-2 pb-2"
                            onClick={() =>
                                setSelectedOption(NavOptions.ACCOMMODATION)
                            }
                        >
                            <IoHome className="h-8 w-8 text-red-500 transition-transform duration-300 group-hover:scale-110" />
                            <p
                                className={` ${selectedOption === NavOptions.ACCOMMODATION ? "text-black" : "text-gray-500"}`}
                            >
                                {NavOptions.ACCOMMODATION}
                            </p>
                            <span
                                className={`absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 ${selectedOption === NavOptions.ACCOMMODATION && "scale-x-100"}`}
                            ></span>
                        </button>
                        <button
                            className="group relative flex cursor-pointer items-center gap-2 pb-2"
                            onClick={() =>
                                setSelectedOption(NavOptions.SERVICE)
                            }
                        >
                            <FaConciergeBell className="h-8 w-8 text-orange-300 transition-transform duration-300 group-hover:scale-110" />
                            <p
                                className={` ${selectedOption === NavOptions.SERVICE ? "text-black" : "text-gray-500"}`}
                            >
                                {NavOptions.SERVICE}
                            </p>
                            <span
                                className={`absolute bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 ${selectedOption === NavOptions.SERVICE && "scale-x-100"}`}
                            ></span>
                        </button>
                    </motion.div>

                    {/* RightSide */}
                    <div className="flex w-1/5 items-center justify-end gap-4">
                        <button
                            className="hidden h-9 items-center rounded-full p-3 hover:bg-gray-300 lg:flex"
                            onClick={() => setOpenHostModal(true)}
                        >
                            <p className="text-[0.9rem] font-bold">
                                Trở thành Host
                            </p>
                        </button>
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                                <FaBars className="h-3 w-3" />
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
                            {hostOptions.map((opt: { title: NavOptions }) => {
                                return (
                                    <div
                                        key={opt.title}
                                        className={`relative h-[300px] flex-1 cursor-pointer rounded-xl border-2 transition-colors duration-200 hover:bg-gray-200 ${selectedHostOption === opt.title ? "border-black" : "border-gray-200"}`}
                                        onClick={() => {
                                            setSelectedHostOption(opt.title);
                                        }}
                                    >
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {opt.title ===
                                            NavOptions.ACCOMMODATION ? (
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
