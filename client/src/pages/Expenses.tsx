import { Box, Text } from "@chakra-ui/react";
import ExpenseContent from "../components/Expenses/ExpenseContent";
const Expenses = () => {
    return (
        <Box as="main">
            <Text as="h1" fontSize="5xl">
                Expenses
            </Text>
            <Text as="p" fontSize="sm">
                Track and manage your spending
            </Text>
            <ExpenseContent/>
        </Box>
    );
};
export default Expenses;
