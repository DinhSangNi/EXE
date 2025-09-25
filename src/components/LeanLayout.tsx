import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LeanHeader from "./LeanHeader";

const LeanLayout = () => {
    return (
        <>
            <div className="h-full w-full">
                <LeanHeader />
                <main className="w-full bg-gray-100 pb-10 pt-[var(lean--header-height)]">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default LeanLayout;
