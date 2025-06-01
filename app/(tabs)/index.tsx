import HomeCard from '@/components/HomeCard';
import { useGlobalState } from '@/hooks/useGlobalState';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const index = () => {
    const { taskList, notesList, projectsList, userDetails } = useGlobalState();
    return (
        <ScrollView className="p-2">
            <Text className="text-2xl my-5">Hi {userDetails?.name}! 👋</Text>
            <View className="flex flex-row flex-wrap justify-between gap-2">
                <HomeCard
                    title="No.of tasks"
                    data={taskList.length}
                    onPress={() => router.push('/(tabs)/tasks')}
                />
                <HomeCard
                    title="No.of notes"
                    data={notesList.length}
                    onPress={() => router.push('/(tabs)/notes')}
                />
                <HomeCard
                    title="No.of projects"
                    data={projectsList.length}
                    onPress={() => router.push('/(tabs)/notes')}
                />
                <HomeCard
                    title="Go to chats"
                    data={0}
                    onPress={() => router.push('/chats')}
                />
            </View>
        </ScrollView>
    );
};

export default index;
