import useOverviewPostsByCategory from "@/hooks/admin/useOverviewPostsByCategory";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type Props = {
    className?: string;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PostByCategoryPieChart = ({ className }: Props) => {
    const { data } = useOverviewPostsByCategory();
    return (
        <div className={`w-full ${className}`}>
            <h3 className="mb-2 font-bold">
                Biểu đồ phân bố bài đăng theo danh mục
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="totalPosts"
                        nameKey="category"
                        label
                    >
                        {data?.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PostByCategoryPieChart;
