import {
    HStack,
    Text,
    Flex,
    CardRoot,
    CardDescription,
    CardTitle,
    
} from "@chakra-ui/react";

type CardProp = {
    title: string;
    description?: string;
    value: string;
    subText?: string;
    growth?: string;
    growthType?: string;
};
const Card = ({
    title,
    description,
    value,
    growth,
    growthType = "up",
    subText
}: CardProp) => {
    return (
        <CardRoot px="8" py="4" variant="elevated">
            <CardTitle fontSize={"medium"} fontWeight={"medium"}>{title}</CardTitle>
            <CardDescription fontSize={"sm"} fontWeight={"light"} color={"gray.500"}>{description}</CardDescription>
            <Flex gap={3}>
                <Text fontSize={"5xl"} fontWeight={"bold"} color={"#1E293B"}>{value}</Text>
                <HStack>
                    <Text
                        fontSize={"12px"} fontWeight={"medium"}
                        color={growthType === "up" ? "green.500" : "red.500"}
                    >
                        {growthType === "up" ? "↑" : "↓"} {growth}
                    </Text>
                    <Text fontSize="12px" color="gray.500" fontWeight={"medium"}>
                        from last month
                    </Text>
                </HStack>
            </Flex>
                {subText && <Text color="gray.500">{subText}</Text>}
        </CardRoot>
    );
};
export default Card;
