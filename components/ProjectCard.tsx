import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';
import dayjs from 'dayjs';

type TProjectCard = {
    projectTitle: string;
    progress: number;
    startDate: string;
    endDate: string;
    noOfTasks: number;
    priority: string;
};
const ProjectCard = ({
    projectTitle,
    progress,
    startDate,
    endDate,
    noOfTasks,
    priority,
}: TProjectCard) => {
    return (
        <TouchableOpacity className="border border-black/20 rounded-lg p-2 bg-white shadow-2xl my-2">
            <View className="flex gap-4 py-4">
                <Text className="text-2xl">{projectTitle}</Text>
                <ProgressBar progress={progress} showProgressNumber={true} />
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
                        {priority.toUpperCase()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProjectCard;
