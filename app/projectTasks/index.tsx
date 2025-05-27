import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    // query,
    updateDoc,
    // where,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import dayjs from 'dayjs';
import { useGlobalState } from '@/hooks/useGlobalState';
import TaskLoading from '@/components/TaskLoading';
import AddButton from '@/components/AddButton';
import { router, useGlobalSearchParams } from 'expo-router';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const index = () => {
    const {
        projectTasks,
        setProjectTasks,
        updateNoOfTasks,
        updateCompletedPercentage,
    } = useGlobalState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { projectId } = useGlobalSearchParams();

    useEffect(() => {
        setIsLoading(true);

        const taskCollectionRef = collection(
            firebaseDB,
            'projects',
            projectId as string,
            'tasks'
        );
        // const whereCondition = where('userId', '==', userDetails?.id);
        // const taskQuery = query(taskCollectionRef, whereCondition);

        const unsubscribe = onSnapshot(
            taskCollectionRef,
            async (snapshot) => {
                const updatedTasks = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjectTasks(updatedTasks);
                await updateCompletedPercentage(
                    projectId as string,
                    updatedTasks
                );
                setIsLoading(false);
            },
            (error) => console.log(error)
        );

        return () => unsubscribe();
    }, []);

    const changeTaskStatus = async (id: string, isCompleted: boolean) => {
        const task = doc(
            firebaseDB,
            'projects',
            projectId as string,
            'tasks',
            id
        );
        try {
            await updateDoc(task, { isCompleted: !isCompleted });
        } catch (error) {
            console.log('Error updating task status:', error);
        }
    };
    const deleteTask = async (id: string) => {
        await deleteDoc(
            doc(firebaseDB, 'projects', projectId as string, 'tasks', id)
        );
        await updateNoOfTasks(projectId as string);
    };

    return (
        <View className="h-full">
            {isLoading ? (
                <View className="p-2">
                    <TaskLoading />
                    <TaskLoading />
                    <TaskLoading />
                </View>
            ) : (
                <ScrollView className="p-2">
                    {projectTasks?.length ? (
                        projectTasks?.map((task, index) => (
                            <TaskCard
                                key={index}
                                task={task}
                                onDelete={deleteTask}
                                onStatusChange={changeTaskStatus}
                                isEditable
                                onPress={() => {
                                    router.push({
                                        pathname: '/taskDetails/[taskId]',
                                        params: {
                                            taskId: task.id,
                                            title: task.title,
                                        },
                                    });
                                }}
                            />
                        ))
                    ) : (
                        <View>
                            <Text>No tasks. Add to a new task</Text>
                        </View>
                    )}
                </ScrollView>
            )}
            <AddButton
                onPress={() =>
                    router.push({
                        pathname: '/taskForm',
                        params: { name: 'projects', projectId: projectId },
                    })
                }
            />
        </View>
    );
};

export default index;
