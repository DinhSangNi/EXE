import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
            <div className="h-full w-full">
                <Header />
                <main className="w-full bg-gray-100 pb-10 pt-20">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default MainLayout;
