import ProjectCard from '@/components/ProjectCard';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import AddButton from '@/components/AddButton';
import { router } from 'expo-router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { useGlobalState } from '@/hooks/useGlobalState';

const projects = () => {
    const { userDetails, projectsList, setProjectsList } = useGlobalState();

    useEffect(() => {
        const projectRef = collection(firebaseDB, 'projects');
        const whereCondition = where('userId', '==', userDetails?.id);
        const projectsQuery = query(projectRef, whereCondition);

        const fetchProjects = onSnapshot(projectsQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjectsList(data);
        });
        return () => fetchProjects();
    }, []);
    return (
        <View className="h-full">
            <ScrollView className="p-2">
                {projectsList.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        onPress={() =>
                            router.push({
                                pathname: '/projectTasks',
                                params: {
                                    projectId: project.id,
                                    projectName: project.projectName,
                                },
                            })
                        }
                    />
                ))}
            </ScrollView>
            <AddButton onPress={() => router.push('/projectForm')} />
        </View>
    );
};

export default projects;
