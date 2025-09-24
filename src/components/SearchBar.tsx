import MagnifyinGlassIcon from "@/assets/icons/MagnifyinGlassIcon";
import useDistrictsByProvince from "@/hooks/address/useDistrictsByProvince";
import useProvinces from "@/hooks/address/useProvinces";
import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
    isTop: boolean;
};

const Searchbar = ({ isTop }: Props) => {
    //states
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState<boolean>(false);
    const [address, setAddress] = useState<{
        province: {
            name: string;
            code: string;
        };
        district: {
            name: string;
            code: string;
        };
    }>({
        province: {
            name: searchParams.get("province")?.split("|")[1] || "",
            code: searchParams.get("province")?.split("|")[0] || "",
        },
        district: {
            name: searchParams.get("district")?.split("|")[1] || "",
            code: searchParams.get("district")?.split("|")[0] || "",
        },
    });

    // navigation
    const navigate = useNavigate();

    // ref
    const containerRef = useRef<HTMLDivElement>(null);

    // hooks
    const { data: provinces } = useProvinces();
    const { data: districts } = useDistrictsByProvince(address.province.code);

    // animations
    const controls = useAnimation();

    // event handlers
    const handleClick = () => {
        setOpen(true);
    };

    const handleSelectProvince = (province: { name: string; code: number }) => {
        setAddress((prev) => ({
            ...prev,
            province: {
                name: province.name,
                code: province.code.toString(),
            },
        }));
    };

    const handleSelectDistrict = (district: { name: string; code: number }) => {
        const params = new URLSearchParams({
            page: "1",
            limit: "9",
            province: `${address.province.code}|${address.province.name}`,
            district: `${district.code}|${district.name}`,
        });
        setAddress((prev) => ({
            ...prev,
            district: {
                name: district.name,
                code: district.code.toString(),
            },
        }));
        navigate(`/posts/?${params.toString()}`);
    };

    useEffect(() => {
        if (!isTop) {
            controls.start({
                width: "40%",
                y: -64,
                transition: { duration: 0.3 },
            });
        } else {
            controls.start({
                width: "60%",
                y: 0,
                transition: { duration: 0.3 },
            });
        }
    }, [controls, isTop]);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 1 }}
                animate={controls}
                className="relative mx-auto w-[90%] lg:w-[60%]"
            >
                <div className="flex rounded-full border border-gray-200 bg-white px-2 py-2 shadow-lg">
                    <div
                        className="ml-2 flex flex-1 items-center gap-1"
                        onClick={handleClick}
                    >
                        <HiOutlineLocationMarker className="text-[1.3rem]" />
                        <p>
                            {address.province.name
                                ? `${address?.district?.name}, ${address?.province?.name}`
                                : "Tìm kiếm theo khu vực"}
                        </p>
                    </div>
                    <div className="cursor-pointer rounded-full bg-red-500 p-2 transition-all duration-200 hover:scale-[115%]">
                        <MagnifyinGlassIcon className="h-6 w-6 text-white" />
                    </div>
                </div>
                {open && (
                    <div className="absolute mx-auto mt-2 w-full overflow-hidden rounded-3xl bg-white pr-2 shadow-lg">
                        <div className="flex items-center gap-2 px-4 py-2 font-bold shadow-sm">
                            {address.province.name && (
                                <FaArrowLeft
                                    onClick={() =>
                                        setAddress({
                                            province: {
                                                name: "",
                                                code: "",
                                            },
                                            district: {
                                                name: "",
                                                code: "",
                                            },
                                        })
                                    }
                                />
                            )}
                            <h1>
                                {!address.province.name
                                    ? "Tỉnh/thành phố"
                                    : `${address.province.name}`}
                            </h1>
                        </div>
                        {!address.province.name ? (
                            <div className="max-h-[300px] overflow-y-auto">
                                {provinces &&
                                    provinces.map(
                                        (pro: {
                                            name: string;
                                            code: number;
                                        }) => (
                                            <div
                                                className="w-full cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSelectProvince(pro)
                                                }
                                            >
                                                <p>{pro.name}</p>
                                            </div>
                                        )
                                    )}
                            </div>
                        ) : (
                            <div className="max-h-[300px] overflow-y-auto">
                                {districts &&
                                    districts.map(
                                        (dis: {
                                            name: string;
                                            code: number;
                                        }) => (
                                            <div
                                                className="w-full cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    handleSelectDistrict(dis)
                                                }
                                            >
                                                <p>{dis.name}</p>
                                            </div>
                                        )
                                    )}
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default Searchbar;
