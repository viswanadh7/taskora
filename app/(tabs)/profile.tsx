import { useGlobalState } from '@/hooks/useGlobalState';
import React from 'react';
import { Button, Text, View } from 'react-native';

const profile = () => {
    const { userDetails, removeUserDetails } = useGlobalState();
    return (
        <View className="p-2">
            <Text className="text-2xl">{userDetails?.name}</Text>
            <Button title="Logout" onPress={removeUserDetails} />
        </View>
    );
};

export default profile;
