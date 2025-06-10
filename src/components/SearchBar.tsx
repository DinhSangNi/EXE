import MagnifyinGlassIcon from "@/assets/icons/MagnifyinGlassIcon";
import { useAnimation, motion } from "framer-motion";
import { useEffect, useState, type ChangeEvent } from "react";

type Props = {
    isTop: boolean;
};

const Searchbar = ({ isTop }: Props) => {
    const [searchText, setSearchText] = useState<string>("");
    const controls = useAnimation();

    const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
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

    return (
        <>
            <motion.div
                initial={{ opacity: 1 }}
                animate={controls}
                className="mx-auto flex w-[90%] rounded-full border border-gray-200 bg-white px-2 py-2 shadow-lg lg:w-[60%]"
            >
                <div className="flex flex-1 items-center">
                    <input
                        value={searchText}
                        placeholder="Search Adddress..."
                        type="text"
                        onChange={handleSearchTextChange}
                        className="h-full w-full px-2 focus-within:outline-none"
                    />
                </div>
                <div className="cursor-pointer rounded-full bg-red-500 p-2 transition-all duration-200 hover:scale-[115%]">
                    <MagnifyinGlassIcon className="h-6 w-6 text-white" />
                </div>
            </motion.div>
        </>
    );
};

export default Searchbar;
