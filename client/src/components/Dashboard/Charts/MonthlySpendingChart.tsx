import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { monthlySpending } from "../../../data/monthlySpending";
import { Chart, useChart } from "@chakra-ui/charts";

const MonthlySpendingChart = () => {
    const chart = useChart({ data: monthlySpending})

    return (
        <Chart.Root
            h={{ base: "200px", md: "300px" }}
            className="one"
            w={"full"}
            chart={chart}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    // width={500}
                    // height={300}
                    data={chart.data}
                    margin={{ right: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        fill="#2bff0066"
                        stroke="#3b82f6"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Chart.Root>
    );
};
export default MonthlySpendingChart;
