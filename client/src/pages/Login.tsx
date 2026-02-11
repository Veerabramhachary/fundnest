import {
    Button,
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
import ExternalButtons from "../components/ExtenalButtons";

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
                gap={4}
            >
                <Flex direction={"column"} align={"center"}>
                    <Text fontWeight={"bold"} lineHeight={1}>
                        Welcome to FundNest👋
                    </Text>
                    <Text as={"p"} color={"gray.500"}>
                        Enter your Email & Password to Sign in
                    </Text>
                </Flex>

                <form onSubmit={handleSubmit}>
                    <Flex
                        direction={"column"}
                        gap={6}
                        w={"350px"}
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
                        />
                        <InputField
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

                            <Text>Forgot Password</Text>
                        </Flex>

                        <Button
                            w={"full"}
                            variant={"solid"}
                            borderRadius={"lg"}
                            type="submit"
                        >
                            Login
                        </Button>
                        <Text fontWeight={500}>
                            Don't have an Account?{" "}
                            <Link color={"blue.500"}>Sign Up</Link>
                        </Text>
                    </Flex>
                </form>
                <HStack align={"center"} w={"full"}>
                    <Separator flex={1} borderColor="gray.300" />
                    <Text color="gray.200">or</Text>
                    <Separator flex={1} borderColor="gray.300" />
                </HStack>
                <VStack gap={5} w={"full"}>
                    <ExternalButtons
                        text="Continue with Apple"
                        bgColor="black"
                        color="white"
                        icon={<FaApple />}
                    />
                    <ExternalButtons
                        text="Continue with Google"
                        bgColor="white"
                        color="black"
                        icon={<FaGoogle />}
                    />
                </VStack>
            </Flex>
        </Center>
    );
};
export default Login;
