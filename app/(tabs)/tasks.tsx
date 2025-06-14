import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, Vibration, View } from 'react-native';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    // updateDoc,
    where,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { schedulePushNotification } from '@/components/Notify';
import dayjs from 'dayjs';
// import { TTask } from '@/types/componentTypes';
import { useGlobalState } from '@/hooks/useGlobalState';
import TaskLoading from '@/components/TaskLoading';
import AddButton from '@/components/AddButton';
import { router } from 'expo-router';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const tasks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { taskList, setTaskList, userDetails } = useGlobalState();

    useEffect(() => {
        setIsLoading(true);

        const taskCollectionRef = collection(firebaseDB, 'tasks');
        const whereCondition = where('userId', '==', userDetails?.id);
        const taskQuery = query(taskCollectionRef, whereCondition);

        const unsubscribe = onSnapshot(
            taskQuery,
            (snapshot) => {
                const updatedTasks = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTaskList(updatedTasks);
                setIsLoading(false);
            },
            (error) => console.log(error)
        );

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const deleteTask = async (id: string) => {
        Vibration.vibrate(50);
        await deleteDoc(doc(firebaseDB, 'tasks', id));
    };

    useEffect(() => {
        taskList?.forEach(async (task) => {
            if (task.remainderAt) {
                const remainderDate = dayjs(
                    task.remainderAt,
                    'DD MMMM, YYYY hh:mm A'
                );

                const now = new Date();
                const remainderTime = remainderDate.toDate();

                if (remainderTime > now) {
                    await schedulePushNotification(
                        task.title!,
                        task.description!,
                        remainderTime
                    );
                }
            }
        });
    }, [taskList]);

    return (
        <View className="h-full">
            {/* <View className="flex flex-row justify-around gap-5 py-4 bg-white border-b shadow-xl">
                <TouchableOpacity className="h-10 w-28 border rounded-lg">
                    <Text className="text-center my-auto">All</Text>
                </TouchableOpacity>
                <TouchableOpacity className="h-10 w-28 border rounded-lg">
                    <Text className="text-center my-auto">In Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity className="h-10 w-28 border rounded-lg">
                    <Text className="text-center my-auto">Completed</Text>
                </TouchableOpacity>
            </View> */}
            {isLoading ? (
                <TaskLoading />
            ) : (
                <ScrollView
                    className="p-2"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: taskList?.length
                            ? 'flex-start'
                            : 'center',
                    }}
                >
                    {taskList?.length ? (
                        taskList?.map((task, index) => (
                            <TaskCard
                                key={index}
                                task={task}
                                onDelete={deleteTask}
                                isEditable={false}
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
                        <View className="flex-1 flex-row justify-center items-center">
                            <View>
                                <Image
                                    style={{ height: 100    , width: 100     }}
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
                        params: { name: 'tasks' },
                    })
                }
            />
        </View>
    );
};

export default tasks;
