import NavBar from "./Navbar/NavBar";
import Searchbar from "./SearchBar";
import { logo } from "@/assets/images";

const Header = () => {
    return (
        <>
            <div className="fixed z-30 w-full bg-[#fbf6f0] shadow-lg">
                <div className="flex items-center gap-4 p-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-10 w-auto cursor-pointer object-contain"
                            onClick={() => (window.location.href = "/")}
                        />
                    </div>

                    {/* SearchBar - chiếm phần còn lại */}
                    <div className="flex-1">
                        <Searchbar isTop={true} />
                    </div>

                    {/* NavBar items (user menu, notification, etc.) */}
                    <div className="flex-shrink-0">
                        <NavBar isTop={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
