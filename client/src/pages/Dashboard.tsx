import { Grid, GridItem, Text } from "@chakra-ui/react";

import MonthlySpendingChart from "../components/Dashboard/Charts/MonthlySpendingChart";
import CategoriesSpendingChart from "../components/Dashboard/Charts/CategoriesSpendingChart";
import CardsLayout from "../components/Dashboard/Cards/CardsLayout";
import SubscriptionSpendingChart from "../components/Dashboard/Charts/SubscriptionSpendingChart";

const Dashboard = () => {
    return (
        <Grid gap={2} m={4}>
            <Text as="h1" ml="30px" fontSize="5xl">
                Dashboard
            </Text>
            <CardsLayout />
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={1}
                placeItems={"center"}
            >
                <GridItem w={"full"} colSpan={2}>
                    <MonthlySpendingChart />
                </GridItem>
                <GridItem placeItems={"center"} colSpan={1}>
                    <CategoriesSpendingChart />
                </GridItem>
                <GridItem>
                    <SubscriptionSpendingChart />
                </GridItem>
            </Grid>
        </Grid>
    );
};
export default Dashboard;
