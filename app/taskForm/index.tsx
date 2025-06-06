import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { TNewTaskForm } from '@/types/commonTypes';
import { formateDateTime } from '@/utils/formate-datetime';
import { useGlobalState } from '@/hooks/useGlobalState';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomTextInput from '@/components/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '@/validations/schema';

const index = () => {
    const navigation = useNavigation();
    const { userDetails, updateNoOfTasks } = useGlobalState();
    const { name, projectId } = useGlobalSearchParams();
    const isTask = name === 'tasks'; // checks weather it is redirecting from tasks page or not

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(taskSchema) });

    const dateTime = useRef<{ date: Date; time: Date }>({
        date: new Date(),
        time: new Date(),
    });

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [categoryInputOpen, setCategoryInputOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState('home');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categories = [
        { label: 'Workout', value: 'barbell' },
        { label: 'Sports', value: 'basketball' },
        { label: 'Learning', value: 'book' },
        { label: 'Mail', value: 'gmail' },
        { label: 'Home', value: 'home' },
        { label: 'Shopping', value: 'purchase' },
        { label: 'Work', value: 'suitcase' },
        { label: 'Travel', value: 'airplane' },
    ];

    const handleAddTask = async (data: TNewTaskForm) => {
        try {
            await addDoc(collection(firebaseDB, 'tasks'), data);
        } catch (e) {
            console.error('Error adding task: ', e);
        }
    };

    const handleAddProjectTask = async (data: TNewTaskForm) => {
        const projectTaskRef = collection(
            firebaseDB,
            'projects',
            projectId as string,
            'tasks'
        );
        try {
            await addDoc(projectTaskRef, data);
        } catch (e) {
            console.error('Error adding task: ', e);
        }
    };

    const handleFormSubmit = async (data: {
        title: string;
        description?: string;
    }) => {
        const updatedData = {
            ...data,
            userId: userDetails?.id as string,
            isCompleted: false,
            category: categoryValue,
            remainderAt: formateDateTime(
                dateTime.current.date,
                dateTime.current.time
            ),
        };

        console.log('updatedData', updatedData);
        setIsLoading(true);
        if (isTask) {
            await handleAddTask(updatedData);
        } else {
            await handleAddProjectTask(updatedData);
            await updateNoOfTasks(projectId as string);
        }
        setIsLoading(false);
        navigation.goBack();
    };
    return (
        <View className="px-4 pt-10 rounded-t-3xl">
            <Controller
                name="title"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <CustomTextInput
                        label="Task title"
                        placeholder="Enter the task title"
                        value={value}
                        onChangeText={onChange}
                        errorMessage={errors.title?.message}
                    />
                )}
            />
            {isTask && (
                <View>
                    <Text className="mt-4 text-xl">Category</Text>
                    <DropDownPicker
                        open={categoryInputOpen}
                        value={categoryValue}
                        items={categories}
                        setOpen={setCategoryInputOpen}
                        setValue={setCategoryValue}
                        placeholder="Select the category of the task"
                        style={{
                            zIndex: 1000,
                            borderBottomWidth: 1,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderRadius: 'none',
                            backgroundColor: 'none',
                        }}
                    />
                </View>
            )}
            <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <CustomTextInput
                        label="Description"
                        placeholder="Enter few words of description..."
                        value={value}
                        onChangeText={onChange}
                        errorMessage={errors.description?.message}
                    />
                )}
            />
            <View className="flex flex-row justify-between my-5">
                <View className="flex flex-row items-center gap-2">
                    <Text className="text-xl">Date:</Text>
                    <TouchableOpacity onPress={() => setShowDate(true)}>
                        <Text className="underline text-xl">
                            {dayjs(dateTime.current.date).format(
                                'DD MMMM, YYYY'
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <Text className="text-xl">Time:</Text>
                    <TouchableOpacity onPress={() => setShowTime(true)}>
                        <Text className="underline text-xl">
                            {dayjs(dateTime.current.time).format('hh:mm A')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showDate && (
                <DateTimePicker
                    value={dateTime.current.date}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        dateTime.current.date = date as Date;
                        setShowDate(false);
                    }}
                />
            )}
            {showTime && (
                <DateTimePicker
                    value={dateTime.current.time}
                    mode="time"
                    display="default"
                    is24Hour={false}
                    onChange={(e, time) => {
                        dateTime.current.time = time as Date;
                        setShowTime(false);
                    }}
                />
            )}
            <TouchableOpacity
                onPress={handleSubmit(handleFormSubmit)}
                disabled={isLoading}
                className="h-10 w-28 border rounded-lg mt-5 ml-auto"
            >
                <Text className="text-center my-auto text-lg">Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;
