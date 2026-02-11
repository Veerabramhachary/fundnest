import { Field, Input } from "@chakra-ui/react";

type InputFieldProps = {
    label?: string;
    name: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    type?: string;
    placeHolder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
};
const InputField = ({
    label,
    name,
    isRequired = false,
    isInvalid = false,
    type = "text",
    placeHolder,
    value,
    onChange,
    errorMessage,
    ...rest
}: InputFieldProps) => {
    return (
        <Field.Root id={name} invalid={isInvalid} required={isRequired}>
            {label && <Field.Label htmlFor={name}>{label}</Field.Label>}
            <Input
                name={name}
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                {...rest}
            />

            {errorMessage && (
                <Field.ErrorText>{errorMessage}</Field.ErrorText>
            )}
        </Field.Root>
    );
};
export default InputField; 
