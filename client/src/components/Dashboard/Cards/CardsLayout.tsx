import { Grid } from "@chakra-ui/react";
import Card from "./dashboardCard";

const CardsLayout = () => {
    return (
        <Grid
            gap={6}
            p={4}
            templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
        >
            <Card
                title="Total Spend"
                description="Instant awareness"
                value="₹12,450"
                growth="8%"
                growthType="up"
            />
            <Card
                title="Active Subscriptions"
                value="₹1,299"
                subText="5 Active"
                description="Recurring expenses"
                growth="10%"
                growthType="up"
            />
            <Card
                title="Top Category"
                value="₹4,200"
                growth="4%"
                growthType="down"
                subText="Food"
                description="Spending focus"
            />
        </Grid>
    );
};
export default CardsLayout;
