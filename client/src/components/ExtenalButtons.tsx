import { Button } from "@chakra-ui/react";

interface props {
    text: string;
    bgColor: string;
    color: string;
    icon?: any;
}

const ExternalButtons = ({text, bgColor,color, icon}: props) => {
    return (
        <Button
            w={"full"}
            variant={"solid"}
            borderRadius={"lg"}
            type="button"
            bg={bgColor}
            borderColor={"gray.300"}
            color={color}
        >
            {icon}{text}
        </Button>
    );
};
export default ExternalButtons;
