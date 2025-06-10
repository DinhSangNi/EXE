import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
            <div className="h-full w-full">
                <Header />
                <main className="w-full pt-[162px]">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
