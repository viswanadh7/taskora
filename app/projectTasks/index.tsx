import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, Vibration, View } from 'react-native';
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
                setProjectTasks({
                    [projectId as string]: updatedTasks,
                });
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
        Vibration.vibrate(50);

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
                <TaskLoading />
            ) : (
                <ScrollView
                    className="p-2"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: projectTasks[projectId as string]
                            ?.length
                            ? 'flex-start'
                            : 'center',
                    }}
                >
                    {projectTasks[projectId as string]?.length ? (
                        projectTasks[projectId as string]?.map(
                            (task, index) => (
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
                            )
                        )
                    ) : (
                        <View className="flex-1 flex-row justify-center items-center">
                            <View>
                                <Image
                                    style={{ height: 100, width: 100 }}
                                    source={require('../../assets/icons/checklist.png')}
                                />
                                <Text className="text-center">No tasks</Text>
                            </View>
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
