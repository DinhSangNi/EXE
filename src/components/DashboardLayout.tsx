import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import Footer from "./Footer";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
    return (
        <>
            <div className="mx-auto flex h-full">
                <DashboardHeader className="px-4" />
                <LeftSideBar className="fixed bottom-0 left-0 top-16 w-[250px] px-4 shadow-lg" />
                <div className="h-full w-full pl-[250px] pt-14">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
