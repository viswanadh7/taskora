import { firebaseDB } from '@/config/firebase';
import { useGlobalState } from '@/hooks/useGlobalState';
import { TNewNotesForm } from '@/types/commonTypes';
import { getRandomHexCode } from '@/utils/random-color';
import { notesSchema } from '@/validations/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const index = () => {
    const navigation = useNavigation();

    const { notesId } = useGlobalSearchParams();
    const { notesList, userDetails } = useGlobalState();
    const currentNotes = notesList.find((item) => item.id === notesId);

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(notesSchema),
        defaultValues: {
            title: currentNotes?.title ?? '',
            noteData: currentNotes?.noteData ?? '',
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addNotes = async (note: TNewNotesForm) => {
        setIsLoading(true);
        try {
            await addDoc(collection(firebaseDB, 'notes'), note);
            navigation.goBack();
            console.log('Notes added successfully');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const updateNotes = async (note: TNewNotesForm) => {
        setIsLoading(true);
        try {
            const updatedNotes = doc(firebaseDB, 'notes', notesId as string);
            await updateDoc(updatedNotes, note);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePress = (data: { title: string; noteData: string }) => {
        const updatedData = {
            ...data,
            userId: userDetails?.id as string,
            updatedOn: dayjs(new Date()).format('Do MMMM'),
            colorCode: getRandomHexCode(),
            isLocked: false,
        };
        if (notesId) updateNotes(updatedData);
        else addNotes(updatedData);
    };

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View className="h-full p-2">
            <View className="h-fit">
                <Controller
                    name="title"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            style={{ fontSize: 35 }}
                            multiline
                            placeholder="Title"
                            placeholderTextColor="gray"
                            maxLength={30}
                            className="font-bold text-primary"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
            </View>
            <KeyboardAvoidingView>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    className="h-full"
                >
                    <Controller
                        name="noteData"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextInput
                                style={{
                                    textAlignVertical: 'top',
                                }}
                                multiline
                                scrollEnabled
                                className="text-xl p-2"
                                placeholder="Start writing from here..."
                                placeholderTextColor="gray"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <View className="absolute bottom-10 right-6 z-50">
                <TouchableOpacity
                    onPress={handleSubmit(handlePress)}
                    className="h-10 w-28 bg-white shadow-xl border rounded-lg mt-5 ml-auto"
                >
                    <Text className="text-center my-auto text-lg">Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default index;
