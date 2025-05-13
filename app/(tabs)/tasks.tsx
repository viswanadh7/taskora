import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { schedulePushNotification } from '@/components/Notify';
import dayjs from 'dayjs';
import { TTask } from '@/common-types/componentTypes';

const tasks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [taskList, setTaskList] = useState<TTask[]>();
    const getTasks = async () => {
        setIsLoading(true);
        try {
            const querySnapshot = await getDocs(
                collection(firebaseDB, 'tasks')
            );
            const tasks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('tasks from db', tasks);
            setTaskList(tasks);
        } catch (e) {
            console.error('Error fetching tasks: ', e);
        } finally {
            setIsLoading(false);
        }
    };
    const changeTaskStatus = async (id: string, updatedTask: TTask) => {
        const task = doc(firebaseDB, 'tasks', id);
        await updateDoc(task, updatedTask);
        getTasks();
    };
    const deleteTask = async (id: string) => {
        await deleteDoc(doc(firebaseDB, 'tasks', id));
        getTasks();
    };
    useEffect(() => {
        getTasks();
    }, []);

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
                <ActivityIndicator size="large" />
            ) : (
                <ScrollView className="p-2">
                    {taskList?.length ? (
                        taskList?.map((task, index) => (
                            <TaskCard
                                key={index}
                                task={task}
                                onDelete={deleteTask}
                                onStatusChange={changeTaskStatus}
                            />
                        ))
                    ) : (
                        <View>
                            <Text>No tasks. Add to a new task</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            <View className="absolute bottom-6 right-6 z-50">
                <TouchableOpacity
                    onPress={() => router.push('/taskForm')}
                    className="bg-primary p-4 rounded-full shadow-lg"
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default tasks;
