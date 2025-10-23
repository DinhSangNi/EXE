import PostByCategoryPieChart from "@/components/adminDashboard/PostByCategoryPieChart";
import PostsAndAppointmentsChart from "@/components/adminDashboard/PostsAndAppointmentsChart";
import useOverviewCount from "@/hooks/admin/useOverviewCount";
import { Card, Col, Row, Statistic, Skeleton } from "antd";
import {
    FileTextOutlined,
    CalendarOutlined,
    UserOutlined,
} from "@ant-design/icons";

const AdminOverview = () => {
    const { data: overviewCount, isLoading } = useOverviewCount();

    const statsConfig = [
        {
            key: "totalPosts",
            title: "Tổng số bài đăng",
            icon: (
                <FileTextOutlined style={{ fontSize: 24, color: "#1890ff" }} />
            ),
            color: "#1890ff",
            bgColor: "#e6f7ff",
        },
        {
            key: "totalAppointments",
            title: "Tổng số cuộc hẹn",
            icon: (
                <CalendarOutlined style={{ fontSize: 24, color: "#52c41a" }} />
            ),
            color: "#52c41a",
            bgColor: "#f6ffed",
        },
        {
            key: "totalUsers",
            title: "Tổng số người dùng",
            icon: <UserOutlined style={{ fontSize: 24, color: "#fa8c16" }} />,
            color: "#fa8c16",
            bgColor: "#fff7e6",
        },
    ];

    return (
        <div className="w-full bg-gray-50 pb-10">
            <div className="mx-auto min-h-screen w-full px-10 pt-6">
                <div className="mb-6">
                    <h1 className="text-[1.8rem] font-bold text-gray-800">
                        Tổng quan
                    </h1>
                    <p className="text-gray-500">
                        Thống kê tổng quan về hệ thống
                    </p>
                </div>

                {/* Stats Cards */}
                <Row gutter={[16, 16]} className="mb-6">
                    {isLoading
                        ? statsConfig.map((stat) => (
                              <Col xs={24} sm={12} lg={8} key={stat.key}>
                                  <Card>
                                      <Skeleton
                                          active
                                          paragraph={{ rows: 2 }}
                                      />
                                  </Card>
                              </Col>
                          ))
                        : statsConfig.map((stat) => (
                              <Col xs={24} sm={12} lg={8} key={stat.key}>
                                  <Card
                                      hoverable
                                      className="shadow-md transition-shadow duration-300 hover:shadow-lg"
                                      style={{
                                          borderTop: `4px solid ${stat.color}`,
                                      }}
                                  >
                                      <div className="flex items-center justify-between">
                                          <div className="flex-1">
                                              <Statistic
                                                  title={
                                                      <span className="text-gray-600">
                                                          {stat.title}
                                                      </span>
                                                  }
                                                  value={
                                                      overviewCount?.[
                                                          stat.key as keyof typeof overviewCount
                                                      ] || 0
                                                  }
                                                  valueStyle={{
                                                      color: stat.color,
                                                      fontSize: "2rem",
                                                      fontWeight: "bold",
                                                  }}
                                              />
                                          </div>
                                          <div
                                              className="flex h-16 w-16 items-center justify-center rounded-full"
                                              style={{
                                                  backgroundColor: stat.bgColor,
                                              }}
                                          >
                                              {stat.icon}
                                          </div>
                                      </div>
                                  </Card>
                              </Col>
                          ))}
                </Row>

                {/* Charts Section */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={14}>
                        <Card
                            title={
                                <span className="text-lg font-semibold">
                                    Biểu đồ xu hướng (Bài đăng & Lịch hẹn)
                                </span>
                            }
                            className="shadow-md"
                        >
                            <PostsAndAppointmentsChart />
                        </Card>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Card
                            title={
                                <span className="text-lg font-semibold">
                                    Biểu đồ phân bố bài đăng theo danh mục
                                </span>
                            }
                            className="shadow-md"
                        >
                            <PostByCategoryPieChart />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AdminOverview;
