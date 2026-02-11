import { Chart, useChart } from "@chakra-ui/charts";
import { categoriesSpending } from "../../../data/categoriesSpending";

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const CategoriesSpendingChart = () => {
    const chart = useChart({ data: categoriesSpending });
    const data = categoriesSpending;

    return data.length === 0 ? (
        <p>no data</p>
    ) : (
        <Chart.Root
        className="chart"
            w={{ base: "300px" }}
            h={{ base: "300px" }}
            chart={chart}
            
        >
            <PieChart>
                <Pie
                    data={chart.data}
                    dataKey={chart.key("amount")}
                    nameKey="name"
                    innerRadius="60%"
                    outerRadius="90%"
                >
                    {chart.data.map((item) => (
                        <Cell key={item.name} fill={chart.color(item.color)} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </Chart.Root>
    );
};
export default CategoriesSpendingChart;
