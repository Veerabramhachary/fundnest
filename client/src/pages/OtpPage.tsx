import { Center, Flex, PinInput } from "@chakra-ui/react";

const OtpPage = () => {
    return (
        <Center h={"90dvh"} overflowY="auto">
            <Flex>
                <PinInput.Root otp>
                    <PinInput.HiddenInput />
                    <PinInput.Control>
                        <PinInput.Input index={0} />
                        <PinInput.Input index={1} />
                        <PinInput.Input index={2} />
                        <PinInput.Input index={3} />
                    </PinInput.Control>
                </PinInput.Root>
            </Flex>
        </Center>
    );
};
export default OtpPage;
