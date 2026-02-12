import {
    Checkbox,
    Flex,
    HStack,
    Link,
    Text,
    VStack,
    Center,
    Separator,
} from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import CustomButton from "../components/CustomButton";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isEmailInvalid = email.trim().length === 0;
    const isPasswordInvalid = password.trim().length === 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted", { email, password });
    };

    return (
        <Center h={"90dvh"} overflowY="auto">
            <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={{ base: 2, md: 4 }}
            >
                <Flex direction={"column"} align={"center"}>
                    <Text
                        fontWeight={"bold"}
                        lineHeight={1}
                        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    >
                        Welcome to FundNest👋
                    </Text>
                    <Text
                        as="p"
                        color="gray.500"
                        fontSize={{ base: "sm", md: "md" }}
                    >
                        Enter your Email & Password to Sign in
                    </Text>
                </Flex>

                <form onSubmit={handleSubmit}>
                    <Flex
                        direction={"column"}
                        gap={{ base: 3, md: 5 }}
                        w={{ base: "90vw", sm: "350px" }}
                        border={3}
                        justify={"center"}
                        align={"center"}
                    >
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeHolder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={isEmailInvalid}
                            errorMessage={
                                isEmailInvalid ? "Email is required" : ""
                            }
                            isRequired
                            <Link href="/forgot-password">Forgot Password?</Link>                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeHolder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={isPasswordInvalid}
                            errorMessage={
                                isPasswordInvalid ? "Password is required" : ""
                            }
                            isRequired
                        />
                        <Flex justify={"space-between"} w={"full"}>
                            <Checkbox.Root>
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>Remember me</Checkbox.Label>
                            </Checkbox.Root>

                            <Link href="/forgot-password">Forgot Password?</Link>
                        </Flex>
                        <CustomButton
                            fullWidth={true}
                            type="submit"
                            padding="24px"
                        >
                            Login
                        </CustomButton>
                        <Text fontWeight={500}>
                            Don't have an Account?{" "}
                            <Link color={"blue.500"} href="/signup">
                                Sign Up
                            </Link>{" "}
                        </Text>
                    </Flex>
                </form>
                <HStack align={"center"} w={"full"}>
                    <Separator flex={1} borderColor="gray.300" />
                    <Text color="gray.200">or</Text>
                    <Separator flex={1} borderColor="gray.300" />
                </HStack>
                <VStack gap={5} w={"full"}>
                    <CustomButton
                        colorPalette="black"
                        hoverBg="green.500"
                        hoverColor="black"
                        fullWidth={true}
                    >
                        <FaApple />
                        Continue with Apple
                    </CustomButton>
                    <CustomButton
                        color="black"
                        bgColor="white"
                        hoverBg="green.500"
                        hoverColor="black"
                        fullWidth={true}
                    >
                        <FaGoogle />
                        Continue with Google
                    </CustomButton>
                </VStack>
            </Flex>
        </Center>
    );
};
export default Login;
