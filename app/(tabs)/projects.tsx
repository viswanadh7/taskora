import ProjectCard from '@/components/ProjectCard';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import dayjs from 'dayjs';

const projects = () => {
    const projectsArray = [
        {
            projectTitle: 'Project Alpha',
            progress: 20,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(5, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 10,
            priority: 'high',
        },
        {
            projectTitle: 'NodeJS API',
            progress: 65,
            startDate: dayjs().subtract(2, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(3, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 8,
            priority: 'medium',
        },
        {
            projectTitle: 'React Frontend',
            progress: 90,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(1, 'week').format('DD MMMM, YYYY'),
            noOfTasks: 12,
            priority: 'low',
        },
        {
            projectTitle: 'MongoDB Schema',
            progress: 50,
            startDate: dayjs().subtract(3, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(4, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 7,
            priority: 'medium',
        },
        {
            projectTitle: 'Admin Panel',
            progress: 30,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(6, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 9,
            priority: 'high',
        },
        {
            projectTitle: 'UI/UX Design',
            progress: 10,
            startDate: dayjs().add(1, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(10, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 15,
            priority: 'high',
        },
        {
            projectTitle: 'Express Backend',
            progress: 55,
            startDate: dayjs().subtract(1, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(2, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 11,
            priority: 'medium',
        },
        {
            projectTitle: 'Authentication',
            progress: 75,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(5, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 6,
            priority: 'low',
        },
        {
            projectTitle: 'Payment Gateway',
            progress: 25,
            startDate: dayjs().add(2, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(12, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 13,
            priority: 'high',
        },
        {
            projectTitle: 'E-Commerce',
            progress: 85,
            startDate: dayjs().subtract(2, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(5, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 18,
            priority: 'medium',
        },
        {
            projectTitle: 'Inventory System',
            progress: 40,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(3, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 14,
            priority: 'low',
        },
        {
            projectTitle: 'Chat Integration',
            progress: 60,
            startDate: dayjs().subtract(1, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(6, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 10,
            priority: 'medium',
        },
        {
            projectTitle: 'Bug Tracker',
            progress: 95,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(1, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 5,
            priority: 'low',
        },
        {
            projectTitle: 'Admin Dashboard',
            progress: 70,
            startDate: dayjs().subtract(3, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(4, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 9,
            priority: 'high',
        },
        {
            projectTitle: 'CMS Development',
            progress: 35,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(9, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 7,
            priority: 'medium',
        },
        {
            projectTitle: 'Analytics Setup',
            progress: 50,
            startDate: dayjs().subtract(2, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(8, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 6,
            priority: 'high',
        },
        {
            projectTitle: 'Social Login',
            progress: 15,
            startDate: dayjs().add(3, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(10, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 8,
            priority: 'medium',
        },
        {
            projectTitle: 'SEO Optimization',
            progress: 45,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(7, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 5,
            priority: 'low',
        },
        {
            projectTitle: 'Notification System',
            progress: 88,
            startDate: dayjs().subtract(1, 'day').format('DD MMMM, YYYY'),
            endDate: dayjs().add(4, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 11,
            priority: 'high',
        },
        {
            projectTitle: 'User Roles Setup',
            progress: 65,
            startDate: dayjs().format('DD MMMM, YYYY'),
            endDate: dayjs().add(6, 'day').format('DD MMMM, YYYY'),
            noOfTasks: 7,
            priority: 'medium',
        },
    ];

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
