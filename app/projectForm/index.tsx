import CustomTextInput from '@/components/CustomTextInput';
import { firebaseDB } from '@/config/firebase';
import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useGlobalState } from '@/hooks/useGlobalState';
import { formateProjectDate } from '@/utils/formate-projectdate';
import { useNavigation } from 'expo-router';

const index = () => {
    const priorityList = [
        {
            label: 'High',
            value: 'high',
        },
        {
            label: 'Medium',
            value: 'medium',
        },
        {
            label: 'Low',
            value: 'low',
        },
    ];
    const { userDetails } = useGlobalState();
    const navigation = useNavigation();

    const [priorityInputOpen, setPriorityInputOpen] = useState(false); // State to open and close the priority dropdown
    const [priority, setPriority] = useState('high'); // State to maintain priority. Default value for priority dropdown will be high
    const [project, setProject] = useState({
        userId: userDetails?.id,
        projectName: '',
        description: '',
        priority: priority,
        startDate: '',
        endDate: '',
        noOfTasks: 0,
        completedPercentage: 0,
    });
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const startAndEndDate = useRef({
        startDate: new Date(),
        endDate: new Date(),
    });

    const handleSubmit = async () => {
        const dateRef = startAndEndDate.current;
        try {
            await addDoc(collection(firebaseDB, 'projects'), {
                ...project,
                priority: priority,
                startDate: formateProjectDate(dateRef.startDate),
                endDate: formateProjectDate(dateRef.endDate),
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View className="p-2">
            <CustomTextInput
                label="Project name"
                placeholder="Enter your project name"
                onChangeText={(e) => setProject({ ...project, projectName: e })}
            />
            <CustomTextInput
                label="Description"
                placeholder="Give a brief about your project"
                onChangeText={(e) => setProject({ ...project, description: e })}
            />
            <View className="my-4">
                <Text className="text-xl">Priority</Text>
                <DropDownPicker
                    open={priorityInputOpen}
                    value={priority}
                    items={priorityList}
                    setOpen={setPriorityInputOpen}
                    setValue={setPriority}
                    placeholder="Select the category of the task"
                    style={{ zIndex: 1000 }}
                />
            </View>
            <View className="flex flex-row justify-between my-5">
                <View className="flex flex-row items-center gap-2">
                    <Text className="text-xl">Start Date:</Text>
                    <TouchableOpacity onPress={() => setShowStartDate(true)}>
                        <Text className="underline text-xl">
                            {dayjs(startAndEndDate.current.startDate).format(
                                'DD MMMM, YYYY'
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <Text className="text-xl">End Date:</Text>
                    <TouchableOpacity onPress={() => setShowEndDate(true)}>
                        <Text className="underline text-xl">
                            {dayjs(startAndEndDate.current.endDate).format(
                                'DD MMMM, YYYY'
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showStartDate && (
                <DateTimePicker
                    value={startAndEndDate.current.startDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        startAndEndDate.current.startDate = date as Date;
                        setShowStartDate(false);
                    }}
                />
            )}
            {showEndDate && (
                <DateTimePicker
                    value={startAndEndDate.current.endDate}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        startAndEndDate.current.endDate = date as Date;
                        setShowEndDate(false);
                    }}
                />
            )}
            <TouchableOpacity
                onPress={handleSubmit}
                className="border rounded p-3 w-40 ml-auto"
            >
                <Text className="text-center">Create project</Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;
