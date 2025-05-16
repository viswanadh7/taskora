import React from 'react';
import { View } from 'react-native';

const TaskLoading = () => {
    return (
        <View className="p-2 border rounded-lg bg-white shadow my-2 overflow-hidden h-32">
            <View className="ml-20">
                <View className="textAnimation w-40" />
                <View className="my-2 max-w-[80%] max-h-10 mt-5">
                    <View className="textAnimation w-72" />
                    <View className="textAnimation w-72 mt-1 mb-6" />
                </View>
                <View>
                    <View className="textAnimation" />
                </View>
            </View>
        </View>
    );
};

export default TaskLoading;
