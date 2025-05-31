import React from 'react';
import { View } from 'react-native';

const TaskLoading = ({ noOfTasks }: { noOfTasks?: number }) => {
    return (
        <View className="p-2">
            {Array.from({ length: noOfTasks ?? 4 }).map((_, index) => (
                <View
                    key={index}
                    style={{ elevation: 10 }}
                    className="p-2 rounded-lg bg-white shadow my-2 overflow-hidden h-32"
                >
                    <View className="ml-20">
                        <View className="textLoading w-40" />
                        <View className="my-2 max-w-[80%] max-h-10 mt-5">
                            <View className="textLoading w-72" />
                            <View className="textLoading w-72 mt-1 mb-6" />
                        </View>
                        <View>
                            <View className="textLoading" />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default TaskLoading;
