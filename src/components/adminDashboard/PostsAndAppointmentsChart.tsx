import { useState, useEffect } from "react";
import useOverviewPostsAndAppointments from "@/hooks/admin/useOverviewPostsAndAppointments";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Select, DatePicker, Row, Col, Spin } from "antd";
import type { Dayjs } from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
    className?: string;
};

const PostsAndAppointmentsChart = ({ className }: Props) => {
    const [granularity, setGranularity] = useState<
        "daily" | "weekly" | "monthly"
    >("weekly");
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    // Nếu user chọn date range, sẽ dùng start/end đó; nếu không dùng granularity
    const startDate = dateRange ? dateRange[0].format("YYYY-MM-DD") : undefined;
    const endDate = dateRange ? dateRange[1].format("YYYY-MM-DD") : undefined;

    // Custom hook gọi API
    const { data, isLoading, refetch } = useOverviewPostsAndAppointments({
        granularity,
        startDate,
        endDate,
    });

    // Tự động refetch khi granularity hoặc dateRange thay đổi
    useEffect(() => {
        refetch();
    }, [granularity, startDate, endDate, refetch]);

    const handleRangeChange = (dates: null | [Dayjs | null, Dayjs | null]) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange([dates[0], dates[1]]);
        } else {
            setDateRange(null); // Xóa dateRange → dùng lại granularity
        }
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Controls */}
            <Row gutter={16} className="mb-4">
                <Col>
                    <Select
                        value={granularity}
                        onChange={(value) => setGranularity(value)}
                        style={{ width: 120 }}
                        disabled={!!dateRange} // Nếu user chọn dateRange → disable granularity
                    >
                        <Option value="daily">Ngày</Option>
                        <Option value="weekly">Tuần</Option>
                        <Option value="monthly">Tháng</Option>
                    </Select>
                </Col>
                <Col>
                    <RangePicker
                        value={dateRange}
                        onChange={handleRangeChange}
                        format="YYYY-MM-DD"
                        allowEmpty={[true, true]}
                    />
                </Col>
            </Row>

            {isLoading ? (
                <div className="mt-20 flex w-full justify-center">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {/* Line Chart */}
                    <h3 className="mb-2 mt-8 text-base font-semibold text-gray-700">
                        Biểu đồ xu hướng (Bài đăng & Lịch hẹn)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="posts"
                                stroke="#8884d8"
                                name="Posts"
                            />
                            <Line
                                type="monotone"
                                dataKey="appointments"
                                stroke="#82ca9d"
                                name="Appointments"
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Bar Chart */}
                    <h3 className="mb-2 mt-8 text-base font-semibold text-gray-700">
                        Biểu đồ so sánh (Bài đăng vs Lịch hẹn)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                            <Bar
                                dataKey="appointments"
                                fill="#82ca9d"
                                name="Appointments"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default PostsAndAppointmentsChart;
