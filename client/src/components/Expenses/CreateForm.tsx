import { CardRoot, NativeSelect } from "@chakra-ui/react";
import { Form } from "react-router-dom";

const options = [
    "housing",
    "bills",
    "food",
    "ride",
    "health",
    "care",
    "kids/pets",
    "fun/extras",
];

const CreateForm = () => {
    return (
        <CardRoot w={"70%"}>
            <Form>
            <NativeSelect.Root key={"name"} variant={"ghost"}>
                <NativeSelect.Field placeholder="Select Category">
                    {options.map((item, index)=> (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </NativeSelect.Field>
            </NativeSelect.Root>
        </Form>
        </CardRoot>
        
    );
};
export default CreateForm;
