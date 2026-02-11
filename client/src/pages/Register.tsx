import {
    Button,
    Center,
    Flex,
    HStack,
    Link,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useState } from "react";
import ExternalButtons from "../components/ExtenalButtons";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isEmailInvalid = email.trim().length === 0;
    const isPasswordInvalid = password.trim().length === 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted", { name, email, password });
    };

    return (
        <Center h={"90dvh"} overflowY="auto">
            <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={4}
            >
                <Flex align={"center"} direction={"column"}>
                    <Text fontWeight={"bold"} lineHeight={1}>
                        Welcome to FundNest👋
                    </Text>
                    <Text as={"p"} color={"gray.500"}>
                        Enter your Name & Email & Password to Sign up
                    </Text>
                </Flex>
                <form onSubmit={handleSubmit}>
                    <Flex
                        direction={"column"}
                        gap={4}
                        w={"350px"}
                        border={3}
                        justify={"center"}
                        align={"center"}
                    >
                        <InputField
                            label="Name"
                            name="name"
                            placeHolder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isRequired
                        />
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
                        <Button
                            w={"full"}
                            variant={"solid"}
                            borderRadius={"lg"}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        <Text fontWeight={500}>
                            Don't have an Account?{" "}
                            <Link color={"blue.500"}>Sign In</Link>
                        </Text>
                    </Flex>
                </form>
                <HStack align={"center"} w={"full"}>
                    <Separator flex={1} borderColor="gray.300" />
                    <Text color="gray.200">or</Text>
                    <Separator flex={1} borderColor="gray.300" />
                </HStack>
                <VStack gap={5} w={"full"}>
                    <ExternalButtons text="Continue with Apple" bgColor="black" color="white" icon={<FaApple/>}/>
                    <ExternalButtons text="Continue with Google" bgColor="white" color="black" icon={<FaGoogle />} />
                </VStack>
            </Flex>
        </Center>
    );
};
export default Register;
