import HomeCard from '@/components/HomeCard';
import { useGlobalState } from '@/hooks/useGlobalState';
import { router } from 'expo-router';
import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

const index = () => {
    const { taskList, notesList, userDetails } = useGlobalState();
    return (
        <ScrollView className="p-2">
            <Text className="text-2xl">Hi {userDetails?.name}!</Text>
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
            </View>
            <Button
                title="Go to chats"
                onPress={() => router.push('/chats')}
            />
        </ScrollView>
    );
};

export default index;
