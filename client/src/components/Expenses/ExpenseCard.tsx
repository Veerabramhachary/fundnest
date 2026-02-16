import {
    CardBody,
    CardHeader,
    CardRoot,
    CardTitle,
    Flex,
    Icon,
    Text,
} from "@chakra-ui/react";
import CustomButton from "../CustomButton";
import { MdDelete, MdModeEdit } from "react-icons/md";

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
                        <CustomButton variant="surface" hoverBg="green.500" hoverColor="white">Edit
                            <Icon><MdModeEdit /></Icon>
                        </CustomButton>
                        <CustomButton variant="surface" hoverBg="red.500" hoverColor="white">Delete
                            <Icon><MdDelete /></Icon>
                        </CustomButton>
                    </Flex>
                </Flex>
            </CardBody>
        </CardRoot>
    );
};
export default ExpenseCard;
