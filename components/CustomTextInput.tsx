import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type TCustomTextInput = {
    label: string;
    placeholder: string;
    errorMessage?: string;
} & TextInputProps;
// This is a simple custom text input component which combines a label, text input and an error message.
const CustomTextInput = ({
    label,
    placeholder,
    errorMessage,
    ...rest
}: TCustomTextInput) => {
    return (
        <View className="my-4">
            <Text className="text-xl">{label}</Text>
            <TextInput
                className="border-b border-black py-3 pl-2 text-xl text-black max-h-60"
                placeholder={placeholder}
                placeholderTextColor="gray"
                {...rest}
            />
            {errorMessage && (
                <Text className="text-red-600">{errorMessage}</Text>
            )}
        </View>
    );
};

export default CustomTextInput;
