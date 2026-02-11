import {
    Flex,
    Stack,
    Text,
    Button,
    Card,
} from "@chakra-ui/react";
import { subscriptionSpending } from "../../../data/subscriptionSpending";

const SubscriptionSpendingChart = () => {
    const filtered = subscriptionSpending
        .filter((s) => s.days < 30)
        .sort((a, b) => a.days - b.days)
        .slice(0, 3);
    return (
        <Card.Root>
            <Card.Header>
                <Flex align={"center"} gap={3}>
                    <Card.Title fontSize={"sm"}>UpComing Subscriptions</Card.Title>
                    <span>(This Month)</span>
                </Flex>
            </Card.Header>
            <Card.Body gap={6}>
                <Stack gap={5}>
                    {filtered.map((item, index) => (
                        <Flex key={index} justify="space-between">
                            <Text>
                                {item.brand} <span>{item.amount}</span>
                            </Text>
                            <Text>Remaining days Left: <Text as="span" color={"red.500"} fontWeight={"bold"}>{item.days}</Text></Text>
                        </Flex>
                    ))}
                </Stack>
                <Button w={"100px"} variant={"surface"}>View All ▶</Button>
            </Card.Body>
        </Card.Root>
    );
};
export default SubscriptionSpendingChart;
