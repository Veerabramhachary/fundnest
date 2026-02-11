import {
    Button,
    CardBody,
    CardHeader,
    CardRoot,
    CardTitle,
    Flex,
    Text,
} from "@chakra-ui/react";

interface props {
    title: string;
    category: string;
    amount: number;
    billing: string;
    date: string;
    status: string;
}

const SubscriptionContent = ({
    title,
    category,
    amount,
    billing,
    date,
    status,
}: props) => {
    return (
        <CardRoot>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <Text as={"span"}>{category}</Text>
            </CardHeader>
            <CardBody>
                <Text as={"h1"} fontWeight={"bold"} fontSize={"2xl"}>
                    {amount}
                </Text>
                <Text>
                    Billing Circle: <Text as={"span"}>{billing}</Text>
                </Text>
                <Text>
                    Next Bill: <Text as={"span"}>{date}</Text>
                </Text>
                <Text>{status}</Text>
                <Flex justify={"space-between"}>
                    <Button variant={"surface"} _hover={{bg:"green.500", color:"white"}}>Edit</Button>
                    <Button variant={"surface"}  _hover={{bg:"red.500", color:"white"}}>Delete</Button>
                </Flex>
            </CardBody>
        </CardRoot>
    );
};
export default SubscriptionContent;
