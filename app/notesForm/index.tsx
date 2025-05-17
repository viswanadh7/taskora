import { firebaseDB } from '@/config/firebase';
import { useGlobalState } from '@/hooks/useGlobalState';
import { TNewNotesForm } from '@/types/commonTypes';
import { getRandomHexCode } from '@/utils/random-color';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    View,
} from 'react-native';

const index = () => {
    const navigation = useNavigation();

    const { notesId } = useGlobalSearchParams();
    const { notesList } = useGlobalState();
    const currentNotes = notesList.find((item) => item.id === notesId);

    const [note, setNote] = useState<TNewNotesForm>({
        title: currentNotes?.title ?? '',
        noteData: currentNotes?.noteData ?? '',
        updatedOn: new Date(),
        colorCode: getRandomHexCode(),
        isLocked: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addNotes = async () => {
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
    const updateNotes = async () => {
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

    const handlePress = () => {
        if (notesId) updateNotes();
        else addNotes();
    };

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View className="h-full p-2">
            <View className="h-fit">
                <TextInput
                    style={{ fontSize: 35 }}
                    multiline
                    placeholder="Tilte"
                    maxLength={30}
                    className="font-bold text-primary"
                    value={note.title}
                    onChangeText={(e) => setNote({ ...note, title: e })}
                />
            </View>
            <KeyboardAvoidingView>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    className="h-full"
                >
                    <TextInput
                        style={{
                            textAlignVertical: 'top',
                        }}
                        multiline
                        scrollEnabled
                        className="text-xl p-2"
                        placeholder="Start writing from here..."
                        value={note.noteData}
                        onChangeText={(e) => setNote({ ...note, noteData: e })}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <View className="absolute bottom-6 right-6 z-50">
                <Button title="Save" onPress={handlePress} />
            </View>
        </View>
    );
};

export default index;
