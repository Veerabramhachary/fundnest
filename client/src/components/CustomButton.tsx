import { Button } from "@chakra-ui/react";

interface props {
    variant?:"solid"| "outline" | "subtle" | "surface" | "ghost" | "plain";
    size?: "xs" | "sm" | "md" | "lg";
    bgColor?: string;
    color?: string;
    hoverBg?: string;
    hoverColor?: string;
    children?: any;
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    colorPalette?: string;
    padding?: string;
}

const CustomButton = ({
    variant = "solid",
    size = "md",
    bgColor,
    color,
    hoverBg,
    hoverColor = "white",
    children,
    fullWidth = false,
    type="button",
    colorPalette,
    padding = "5"
}: props) => {
    return (
        <Button
            p={padding}
            w={fullWidth? "full": 'auto'}
            type={type}
            variant={variant}
            size={size}
            borderRadius="lg"
            borderColor="gray.300"
            bg={bgColor}
            color={color}
            colorPalette={colorPalette}
            _hover={{
                bgColor: hoverBg || bgColor,
                color: hoverColor,
            }}
        >
            {children}
        </Button>
    );
};
export default CustomButton;
