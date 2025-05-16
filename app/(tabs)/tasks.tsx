import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { schedulePushNotification } from '@/components/Notify';
import dayjs from 'dayjs';
import { TTask } from '@/types/componentTypes';
import { useGlobalState } from '@/hooks/useGlobalState';
import TaskLoading from '@/components/TaskLoading';
import AddButton from '@/components/AddButton';
import { router } from 'expo-router';

const tasks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { taskList, setTaskList } = useGlobalState();

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(
            collection(firebaseDB, 'tasks'),
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
    // const getTasks = async () => {
    //     setIsLoading(true);
    //     try {
    //         const querySnapshot = await getDocs(
    //             collection(firebaseDB, 'tasks')
    //         );
    //         const tasks = querySnapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         console.log('tasks from db', tasks);
    //         setTaskList(tasks);
    //     } catch (e) {
    //         console.error('Error fetching tasks: ', e);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const changeTaskStatus = async (id: string, updatedTask: TTask) => {
        const task = doc(firebaseDB, 'tasks', id);
        await updateDoc(task, updatedTask);
        // getTasks();
    };
    const deleteTask = async (id: string) => {
        await deleteDoc(doc(firebaseDB, 'tasks', id));
        // getTasks();
    };
    // useEffect(() => {
    //     getTasks();
    // }, []);

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
                <View className="p-2">
                    <TaskLoading />
                    <TaskLoading />
                    <TaskLoading />
                </View>
            ) : (
                <ScrollView className="p-2">
                    {taskList?.length ? (
                        taskList?.map((task, index) => (
                            <TaskCard
                                key={index}
                                task={task}
                                onDelete={deleteTask}
                                onStatusChange={changeTaskStatus}
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
            <AddButton onPress={() => router.push('/taskForm')} />
        </View>
    );
};

export default tasks;
