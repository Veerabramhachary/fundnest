import {
    Button,
    CardBody,
    CardHeader,
    CardRoot,
    CardTitle,
    Flex,
    Text,
} from "@chakra-ui/react";

type ExpenseCardProps = {
    category: string;
    amount: number;
    date: string;
    note?: string;
};
const ExpenseCard = ({ category, amount, date, note }: ExpenseCardProps) => {
    return (
        <CardRoot variant={"elevated"}>
            <CardHeader>
                <CardTitle fontSize={"medium"}>{category}</CardTitle>
            </CardHeader>
            <CardBody p={5}>
                <Flex direction={"column"} gap={3}>
                    <Text>
                        Amount:{" "}
                        <Text as={"span"} fontSize={"4xl"} fontWeight={"bold"}>
                            {amount}
                        </Text>
                    </Text>
                    <Text as={"span"}>Date: {date}</Text>
                    {note ? <Text as={"span"}>Note(short): {note}</Text> : ""}
                    <Flex justify={"space-between"}>
                        <Button
                            variant={"surface"}
                            _hover={{ bgColor: "green.500", color: "white" }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant={"surface"}
                            _hover={{ bgColor: "red.500", color: "white" }}
                        >
                            Delete
                        </Button>
                    </Flex>
                </Flex>
            </CardBody>
        </CardRoot>
    );
};
export default ExpenseCard;
