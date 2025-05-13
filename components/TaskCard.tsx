import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TTask } from '@/common-types/componentTypes';

type TTaskCard = {
    task: TTask;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, task: TTask) => void;
};
const TaskCard = ({
    task: { id, title, description, remainderAt, isCompleted },
    onDelete,
    onStatusChange,
}: TTaskCard) => {
    return (
        <View className="p-2 border rounded-lg bg-white shadow my-2 overflow-hidden">
            <View className="flex flex-row items-center gap-8">
                <TouchableOpacity
                    onPress={() =>
                        onStatusChange(id, {
                            id: id,
                            title: title,
                            description,
                            // remainderAt,
                            isCompleted: !isCompleted,
                        })
                    }
                >
                    {isCompleted ? (
                        <Feather name="check-circle" size={35} color="black" />
                    ) : (
                        <MaterialIcons
                            name="check-box-outline-blank"
                            size={35}
                            color="black"
                        />
                    )}
                </TouchableOpacity>
                <View>
                    <Text className="text-2xl">{title}</Text>
                    <Text className="my-2 max-w-[80%] max-h-10">{description}</Text>
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
                    onPress={() => onDelete(id)}
                    className="absolute right-1"
                >
                    <MaterialIcons
                        name="delete-outline"
                        size={35}
                        color="#c70000"
                    />
                </TouchableOpacity>
            </View>
            {isCompleted && (
                <View
                    className="absolute min-h-full min-w-full opacity-50"
                    pointerEvents="none"
                >
                    <Image source={require('../assets/images/strikes2.jpg')} />
                </View>
            )}
        </View>
    );
};

export default TaskCard;
