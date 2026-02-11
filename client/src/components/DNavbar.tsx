import {  Avatar, Flex, HStack, Input, Text } from "@chakra-ui/react";
import {  BiBell, BiSearch } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";

const DNavbar = () => {
    return (
        <Flex direction={"row"} justify="space-between" align="center" bg={"#103766"} padding={3} borderBottom="2px solid">
            <HStack>
                <BiSearch size={"28px"} color="white"/>
                <Input placeholder="Search something here..." 
                variant={"subtle"}
                />
            </HStack>
            <HStack>
                <BiBell color="white" size={"25px"}/>
                <CiSettings color="white" size={"25px"}/>
                <Avatar.Root>
                    <Avatar.Fallback name="veera"/>
                    <Avatar.Image/>
                </Avatar.Root>
                <FaAngleDown fontSize="30px" color={"white"}/>
            </HStack>
        </Flex>
    );
};
export default DNavbar;
