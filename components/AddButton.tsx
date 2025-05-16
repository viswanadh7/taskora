import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const AddButton = ({ onPress }: { onPress: VoidFunction }) => {
    return (
        <View className="absolute bottom-6 right-6 z-50">
            <TouchableOpacity
                onPress={onPress}
                className="bg-primary p-4 rounded-full shadow-lg"
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default AddButton;
