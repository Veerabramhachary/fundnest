import {
    HStack,
    VStack,
    Text,
    Box,
    Spacer,
    Button,
    Collapsible,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Links } from "../assets/assets";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <VStack
            align="stretch"
            bg="white"
            h="100vh"
            p={5}
            spaceY={6}
            boxShadow="lg"
            display={{ base: "none", md: "flex" }}
            w={open ? "250px": "100px"}
        >
            <Button onClick={() => setOpen(!open)} variant="ghost">
                <RiMenu3Line />
            </Button>
            {/* logo */}
            <Collapsible.Root open={open}>
                <Collapsible.Content>
                    <Text fontWeight="medium">FundNest</Text>
                </Collapsible.Content>
            </Collapsible.Root>

            {/* Menu section*/}
            <Box>
                <Text fontSize="sm" color="gray.400">
                    Menu
                </Text>
                <VStack align="stretch" spaceY={2} pt={4}>
                    {Links.map(({ to, label, icon: Icon }) => (
                        <NavLink key={to} to={to}>
                            {({ isActive }) => (
                                <HStack
                                    p={3}
                                    borderRadius="lg"
                                    bg={isActive ? "black" : "transparent"}
                                    color={isActive ? "white" : "gray.600"}
                                    _hover={{
                                        bg: isActive ? "black" : "gray.100",
                                    }}
                                    transition="0.2s"
                                >
                                    <Icon size={"25px"} />
                                    <Collapsible.Root open={open}>
                                        <Collapsible.Content>
                                            <Text fontWeight="medium">
                                                {label}
                                            </Text>
                                        </Collapsible.Content>
                                    </Collapsible.Root>
                                </HStack>
                            )}
                        </NavLink>
                    ))}
                </VStack>
            </Box>

            {/* Support Section */}
            <Box>
                <Text fontSize="sm" color="gray.400" mb={3}>
                    Support
                </Text>
                <VStack align="stretch" spaceY={2} pt={4}>
                    <HStack
                        p={3}
                        borderRadius="lg"
                        _hover={{ bg: "gray.100" }}
                        cursor="pointer"
                        transition="0.2s"
                    >
                        <FiHelpCircle size={"25px"} />
                        <Collapsible.Root open={open}>
                            <Collapsible.Content>
                                <Text fontWeight="medium">Help Center</Text>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    </HStack>
                    <HStack
                        p={3}
                        borderRadius="lg"
                        _hover={{ bg: "gray.100" }}
                        cursor="pointer"
                        transition="0.2s"
                    >
                        <FiSettings size={"25px"} />
                        <Collapsible.Root open={open}>
                            <Collapsible.Content>
                                <Text fontWeight="medium">Settings</Text>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    </HStack>
                </VStack>
            </Box>
            <Spacer />
            {/* Promotion card*/}
            <Spacer />
            <HStack
                mt={4}
                p={2}
                color="red.500"
                cursor="pointer"
                _hover={{ bg: "red.50" }}
                borderRadius="md"
            >
                <FiLogOut size={"25px"} />
                <Collapsible.Root open={open}>
                    <Collapsible.Content>
                        <Text fontWeight="medium">Logout</Text>
                    </Collapsible.Content>
                </Collapsible.Root>
            </HStack>
        </VStack>
    );
};
export default Sidebar;
