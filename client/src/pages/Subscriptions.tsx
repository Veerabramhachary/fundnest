import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import SubscriptionContent from "../components/Subscriptions/SubscriptionContent";
import { subscriptionContentData } from "../data/subscriptionContentData";

const Subscriptions = () => {
    return (
        <Box as={"main"}>
            <Text as="h1" fontSize="5xl">
                Subscriptions
            </Text>
            <Text as="p" fontSize="sm">
                Manage your recurring payments
            </Text>
            <Grid templateColumns={"repeat(3, 1fr)"} gap={6}>
                {subscriptionContentData.map((item, index)=> (
                    <GridItem key={index}>
                        <SubscriptionContent {...item}/>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};
export default Subscriptions;
