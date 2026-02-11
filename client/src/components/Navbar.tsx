import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    Stack,
    Link,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const { open, onOpen, onClose } = useDisclosure();
    const showNavbar =
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register";
    return (
        showNavbar && (
            <Box w={"full"} bg="red.600" px={6} py={{md:3}}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box color="white" fontWeight="bold">
                        logo
                    </Box>
                    {/* Desktop menu */}
                    <HStack
                        alignItems={"center"}
                        display={{ base: "none", md: "flex" }}
                    >
                        <Link href="/" color="white">
                            Home
                        </Link>
                        <Link href="#about" color="white">
                            About
                        </Link>
                        <Link href="#contact" color="white">
                            Contact
                        </Link>
                    </HStack>
                    <HStack alignItems={"center"}>
                        <NavLink to="/login" style={{}}>
                            Login
                        </NavLink>
                        <NavLink to="/register" color="white">
                            Register
                        </NavLink>
                    </HStack>
                    {/* Mobile Hamburger */}
                    <IconButton
                        size={"md"}
                        aria-label="Open Menu"
                        display={{ md: "none" }}
                        onClick={open ? onClose : onOpen}
                        variant={"ghost"}
                        color={"white"}
                        _hover={{ bg: "whiteAlpha.200" }}
                    >
                        {open ? <IoCloseSharp /> : <FiMenu />}
                    </IconButton>
                </Flex>
                {/* Mobile menu */}
                {open && (
                    <Box pb={4} display={{ base: "flex", md: "none" }}>
                        <Stack as={"nav"} width={"full"} alignItems={"center"}>
                            <Link href="/" color="white" onClick={onClose}>
                                Home
                            </Link>
                            <Link href="#about" color="white" onClick={onClose}>
                                About
                            </Link>
                            <Link
                                href="#contact"
                                color="white"
                                onClick={onClose}
                            >
                                Contact
                            </Link>
                        </Stack>
                    </Box>
                )}
            </Box>
        )
    );
};
export default Navbar;
