import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type TCustomTextInput = {
    label: string;
    placeholder: string;
} & TextInputProps;
// This is a simple custom text input component which combines a label and a text input
const CustomTextInput = ({ label, placeholder, ...rest }: TCustomTextInput) => {
    return (
        <View className="my-4">
            <Text className="text-xl">{label}</Text>
            <TextInput
                multiline
                className="border-b border-black py-3 pl-2 text-xl text-black max-h-60"
                placeholder={placeholder}
                {...rest}
            />
        </View>
    );
};

export default CustomTextInput;
