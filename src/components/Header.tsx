import { useAnimation, motion } from "framer-motion";
import NavBar from "./NavBar";
import Searchbar from "./SearchBar";
import { useEffect, useState } from "react";
import { getCSSVarPx } from "@/utils/css";

const headerHeight = getCSSVarPx("header-height");

const Header = () => {
    const [isTop, setIsTop] = useState<boolean>(true);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsTop(false);
                controls.start({
                    height: 90,
                    transition: { duration: 0.2 },
                });
            } else {
                setIsTop(true);
                controls.start({
                    height: 162,
                    transition: { duration: 0.2 },
                });
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    return (
        <>
            <motion.div
                initial={{
                    height: headerHeight,
                }}
                animate={controls}
                className="fixed z-30 w-full bg-[#fbf6f0] p-4 shadow-lg"
            >
                <NavBar isTop={isTop} />
                <Searchbar isTop={isTop} />
            </motion.div>
        </>
    );
};

export default Header;
