import PostByCategoryPieChart from "@/components/adminDashboard/PostByCategoryPieChart";
import PostsAndAppointmentsChart from "@/components/adminDashboard/PostsAndAppointmentsChart";
import useOverviewCount from "@/hooks/admin/useOverviewCount";
import { Divider } from "antd";

const titlesMap: Record<string, string> = {
    totalPosts: "Tổng số bài đăng",
    totalAppointments: "Tổng số cuộc hẹn",
    totalUsers: "Tổng số người dùng",
};

const AdminOverview = () => {
    const { data: overviewCount, isLoading } = useOverviewCount();

    return (
        <div className="w-full bg-gray-100">
            <div className="mx-auto min-h-screen w-full px-10 pt-4">
                <h1 className="text-[1.4rem] font-bold">Tổng quan</h1>
                <Divider />
                <div className="mb-8 grid w-full grid-cols-3 gap-4 bg-white">
                    {!isLoading && overviewCount ? (
                        Object.entries(overviewCount).map(([key, value]) => (
                            <div key={key} className="mb-4 p-4">
                                <h2 className="text-[1rem] text-gray-700">
                                    {titlesMap[key]}
                                </h2>
                                <p className="text-[1.3rem] font-bold">
                                    {value}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <PostsAndAppointmentsChart className="bg-white p-8" />
                    <PostByCategoryPieChart className="bg-white p-8" />
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
