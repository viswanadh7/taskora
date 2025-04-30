import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

type TTaskCard = {
    taskId: string;
    taskTitle: string;
    description: string;
    remainderAt: string;
    isCompleted: boolean;
    onDelete: (taskId: string) => void;
};
const TaskCard = ({
    taskId,
    taskTitle,
    description,
    remainderAt,
    isCompleted,
    onDelete,
}: TTaskCard) => {
    return (
        <View className="p-2 border rounded-lg bg-white shadow my-2 overflow-hidden">
            <View className="flex flex-row items-center gap-8">
                <View>
                    {isCompleted ? (
                        <Feather name="check-circle" size={35} color="black" />
                    ) : (
                        <Feather name="circle" size={35} color="black" />
                    )}
                </View>
                <View>
                    <Text className="text-2xl">{taskTitle}</Text>
                    <Text className="my-2 max-w-[80%]">{description}</Text>
                    <View className="flex flex-row items-center gap-3">
                        <MaterialIcons
                            name="access-alarm"
                            size={20}
                            color="black"
                        />
                        <Text>Remainder at {remainderAt}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => onDelete(taskId)}
                    className="absolute right-1"
                >
                    <MaterialIcons
                        name="delete-outline"
                        size={35}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            {isCompleted && (
                <Image
                    className="absolute min-h-full min-w-full opacity-50"
                    source={require('../assets/images/strikes2.jpg')}
                />
            )}
        </View>
    );
};

export default TaskCard;
