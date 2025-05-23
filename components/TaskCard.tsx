import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TTask } from '@/types/componentTypes';

type TTaskCard = {
    task: TTask;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, task: TTask) => void;
    onPress: VoidFunction;
};
const TaskCard = ({
    task: { id, title, description, remainderAt, isCompleted, category },
    onDelete,
    onStatusChange,
    onPress,
}: TTaskCard) => {
    const categoryImages = {
        barbell: require('../assets/categories/barbell.png'),
        basketball: require('../assets/categories/basketball.png'),
        book: require('../assets/categories/book.png'),
        gmail: require('../assets/categories/gmail.png'),
        home: require('../assets/categories/home.png'),
        purchase: require('../assets/categories/purchase.png'),
        work: require('../assets/categories/suitcase.png'),
        default: require('../assets/categories/home.png'),
    };
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ elevation: 10, backgroundColor: 'white' }}
            className="p-2 rounded-lg my-2 overflow-hidden"
        >
            <View className="flex flex-row items-center gap-8 px-4">
                <View>
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={categoryImages[category]}
                    />
                </View>
                <View>
                    <Text className="text-2xl">{title}</Text>
                    <Text className="my-3 max-h-10">
                        {description?.slice(0, 30) + '...'}
                    </Text>
                    <View className="flex flex-row items-center gap-3">
                        <MaterialIcons
                            name="access-alarm"
                            size={20}
                            color="black"
                        />
                        <Text>{remainderAt}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => onDelete(id)}
                    className="absolute right-4"
                >
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={require('../assets/icons/bin.png')}
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
        </TouchableOpacity>
    );
};

export default TaskCard;
