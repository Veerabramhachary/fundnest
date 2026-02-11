import {
    Button,
    Card,
    Grid,
    GridItem,
    Text,
} from "@chakra-ui/react";
import { expensesSpending } from "../../data/expensesSpending";
import ExpenseCard from "./ExpenseCard";


const ExpenseContent = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
            }}
            gap={6}
            p={4}
        >
            {expensesSpending.length !== 0 ? (
                expensesSpending.map((expense, index) => (
                    <GridItem key={index}>
                        <ExpenseCard key={expense.id} {...expense} />
                    </GridItem>
                ))
            ) : (
                <GridItem>
                    <Card.Root variant={"elevated"}>
                        <Text fontSize="4xl" mb={4} color="gray.400">
                            📝
                        </Text>
                        <Card.Title fontSize="xl" mb={2}>
                            No expenses yet
                        </Card.Title>
                        <Text color="gray.500" mb={6}>
                            Your spending list is empty. Add your first expense
                            to get started!
                        </Text>
                        <Button colorScheme="blue" size="lg">
                            Add Expense
                        </Button>
                    </Card.Root>
                </GridItem>
            )}
        </Grid>
    );
};
export default ExpenseContent;
