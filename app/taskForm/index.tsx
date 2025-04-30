import React, { useEffect, useState } from 'react';
import {
    Button,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { router } from 'expo-router';

const index = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [task, setTask] = useState<{
        title: string;
        description: string;
        date: Date;
        time: Date;
    }>({
        title: '',
        description: '',
        date: date,
        time: time,
    });

    const addTask = async () => {
        try {
            await addDoc(collection(firebaseDB, 'tasks'), task);
            router.push('/(tabs)/tasks')
        } catch (e) {
            console.error('Error adding task: ', e);
        }
    };
    return (
        <View className="p-2">
            <Text>Add new task</Text>
            <Text className="mt-4">Task title</Text>
            <TextInput
                className="border border-black/30 rounded-lg"
                placeholder="Enter the task title"
                onChangeText={(e) => setTask({ ...task, title: e })}
            />
            <Text className="mt-4">Description</Text>
            <TextInput
                className="border border-black/30 rounded-lg"
                placeholder="Enter few words of description..."
                onChangeText={(e) => setTask({ ...task, description: e })}
            />
            <View className="flex flex-row justify-between my-2">
                <View className="flex flex-row items-center gap-2">
                    <Text>Date:</Text>
                    <TouchableOpacity onPress={() => setShowDate(true)}>
                        <Text className="underline">
                            {dayjs(date).format('DD MMMM, YYYY')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <Text>Time:</Text>
                    <TouchableOpacity onPress={() => setShowTime(true)}>
                        <Text className="underline">
                            {dayjs(time).format('hh:mm A')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        setDate(date as Date);
                        setShowDate(false);
                    }}
                />
            )}
            {showTime && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    is24Hour={false}
                    onChange={(e, time) => {
                        setTime(time as Date);
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
    );
};

export default index;
