import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';
import dayjs from 'dayjs';
import { TProjectsList } from '@/types/commonTypes';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

type TProjectCard = {
    project: TProjectsList;
    onPress: VoidFunction;
};
const ProjectCard = ({
    project: {
        title,
        description,
        priority,
        completedPercentage,
        startDate,
        endDate,
        noOfTasks,
    },
    onPress,
}: TProjectCard) => {
    return (
        <TouchableOpacity
            style={{ elevation: 10 }}
            onPress={onPress}
            className="rounded-lg p-2 bg-white my-2"
        >
            <View className="flex gap-4 py-4">
                <Text className="text-2xl text-primary font-bold">{title}</Text>
                <Text>
                    {description!.length > 100
                        ? description?.slice(0, 100) + '...'
                        : description}
                </Text>
                <ProgressBar
                    progress={completedPercentage!}
                    showProgressNumber={true}
                />
                <View className="w-[70%]">
                    <View className="flex flex-row justify-between">
                        <Text>{startDate}</Text>
                        <Text>{endDate}</Text>
                    </View>
                </View>
                <View className="flex flex-row justify-between items-center">
                    <Text>No.of Tasks : {noOfTasks}</Text>
                    <Text
                        className={`text-white rounded-3xl px-6 py-1.5 text-center ${
                            priority === 'high'
                                ? 'bg-[#e53935]'
                                : priority === 'medium'
                                ? 'bg-[#fb8c00]'
                                : 'bg-[#43a047]'
                        }`}
                    >
                        {priority?.toUpperCase()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProjectCard;
