import ProjectCard from '@/components/ProjectCard';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { projectsArray } from '@/utils/response-sapmles';

const projects = () => {
    return (
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
    );
};

export default projects;
