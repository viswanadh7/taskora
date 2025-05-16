import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { useNavigation } from 'expo-router';

const index = () => {
    const dateTime = useRef<{ date: Date; time: Date }>({
        date: new Date(),
        time: new Date(),
    });
    const navigation = useNavigation();
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [task, setTask] = useState<{
        title: string;
        description: string;
        remainderAt: string;
        isCompleted: boolean;
    }>({
        title: '',
        description: '',
        remainderAt: `${dayjs(dateTime.current.date).format(
            'DD MMMM, YYYY'
        )} ${dayjs(dateTime.current.time).format('hh:mm A')}`,
        isCompleted: false,
    });

    const addTask = async () => {
        try {
            await addDoc(collection(firebaseDB, 'tasks'), {
                ...task,
                remainderAt: `${dayjs(dateTime.current.date).format(
                    'DD MMMM, YYYY'
                )} ${dayjs(dateTime.current.time).format('hh:mm A')}`,
            });
            navigation.goBack();
        } catch (e) {
            console.error('Error adding task: ', e);
        }
    };
    return (
        <View className="bg-primary h-full">
            <Text
                style={{ fontSize: 30 }}
                className="text-center text-9xl my-auto text-white font-semibold"
            >
                Add new task
            </Text>
            <View className="px-4 pt-10 h-[80%] rounded-t-3xl bg-white mt-auto">
                <Text className="mt-4 text-xl">Task title</Text>
                <TextInput
                    className="border border-black/30 rounded-lg py-3 pl-2 text-xl"
                    placeholder="Enter the task title"
                    onChangeText={(e) => setTask({ ...task, title: e })}
                />
                <Text className="mt-4 text-xl">Description</Text>
                <TextInput
                    multiline
                    className="border border-black/30 rounded-lg py-3 pl-2 text-xl max-h-60"
                    placeholder="Enter few words of description..."
                    onChangeText={(e) => setTask({ ...task, description: e })}
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
                    onPress={addTask}
                    className="h-10 w-28 border rounded-lg mt-5 ml-auto"
                >
                    <Text className="text-center my-auto text-lg">Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default index;
