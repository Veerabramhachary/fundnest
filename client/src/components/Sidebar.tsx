import { HStack, VStack, Text, Box } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { Links } from "../assets/assets";


const Sidebar = () => {
    return (
        <VStack align={"stretch"} p={4} spaceY={3} bg={"blue.500"}
        display={{base:"none", md:"flex"}}
        w={"280px"}
        h="100vh" pos={"fixed"}>
            <Box m={5}>FUNDNEST</Box>
            {Links.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#ff0000" : "#A0AEC0",
                        background: isActive ? "rgba(255, 255, 255,0.2)" : "transparent",
                        backdropFilter: isActive ? "blur(10px)": "",
                        borderRadius: "8px",
                        padding: "10px",
                    })}
                >
                    <HStack>
                        <Text _hover={{color: "white"}} fontWeight={"semibold"}>{label}</Text>
                    </HStack>
                </NavLink>
            ))}
        </VStack>
    );
};
export default Sidebar;
