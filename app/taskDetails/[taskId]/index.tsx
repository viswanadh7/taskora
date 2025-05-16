import { useGlobalState } from '@/hooks/useGlobalState';
import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const index = () => {
    const { taskId } = useGlobalSearchParams();
    const { taskList } = useGlobalState();
    const currentTask = taskList.find((task) => task.id === taskId);
    return (
        <View className="p-2">
            <Text className="text-lg">{currentTask?.description}</Text>
        </View>
    );
};

export default index;
