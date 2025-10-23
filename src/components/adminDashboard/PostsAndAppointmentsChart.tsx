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
import { Select, Row, Col, Spin } from "antd";
import dayjs from "dayjs";
import YearSelect from "./YearSelect";

const { Option } = Select;

type Props = {
    className?: string;
};

const PostsAndAppointmentsChart = ({ className }: Props) => {
    const [month, setMonth] = useState<number | undefined>(undefined);
    const [year, setYear] = useState<number>(dayjs().year());

    const { data, isLoading, refetch } = useOverviewPostsAndAppointments({
        month,
        year,
    });

    useEffect(() => {
        if (month && !year) {
            const currentYear = dayjs().year();
            setYear(currentYear);
            return;
        }

        refetch();
    }, [month, year, refetch]);

    return (
        <div className={`w-full ${className}`}>
            {/* Controls */}
            <Row gutter={16} className="mb-4">
                <Col>
                    <YearSelect year={year} setYear={setYear} />
                </Col>
                <Col>
                    <Select
                        placeholder="Chọn tháng (tuỳ chọn)"
                        style={{ width: 150 }}
                        value={month}
                        onChange={(value) => setMonth(value)}
                        allowClear
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <Option key={i + 1} value={i + 1}>
                                Tháng {i + 1}
                            </Option>
                        ))}
                    </Select>
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
                            data={data?.data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="period"
                                tickFormatter={(value) => {
                                    return data?.granularity === "month"
                                        ? `${dayjs(value).month()}`
                                        : `${dayjs(value).date()}`;
                                }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="posts"
                                stroke="#0088FE"
                                name="Bài đăng"
                            />
                            <Line
                                type="monotone"
                                dataKey="appointments"
                                stroke="#a83232"
                                name="Lịch hẹn"
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Bar Chart */}
                    <h3 className="mb-2 mt-8 text-base font-semibold text-gray-700">
                        Biểu đồ so sánh (Bài đăng vs Lịch hẹn)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data?.data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="period"
                                tickFormatter={(value) => {
                                    return data?.granularity === "month"
                                        ? `${dayjs(value).month()}`
                                        : `${dayjs(value).date()}`;
                                }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="posts"
                                fill="#0088FE"
                                name="Bài đăng"
                            />
                            <Bar
                                dataKey="appointments"
                                fill="#a83232"
                                name="Lịch hẹn"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default PostsAndAppointmentsChart;
