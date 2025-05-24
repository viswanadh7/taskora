import ProjectCard from '@/components/ProjectCard';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { projectsArray } from '@/utils/response-sapmles';
import AddButton from '@/components/AddButton';
import { router } from 'expo-router';

const projects = () => {
    return (
        <View className="h-full">
            <ScrollView className="p-2">
            {projectsArray.map((project, index) => (
                    <ProjectCard
                        key={index}
                        projectTitle={project.projectTitle}
                        progress={project.progress}
                        startDate={project.startDate}
                        endDate={project.endDate}
                        noOfTasks={project.noOfTasks}
                        priority={project.priority}
                    />
                ))}
            </ScrollView>
            <AddButton onPress={() => router.push('/(tabs)')} />
        </View>
    );
};

export default projects;
