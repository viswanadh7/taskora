import { firebaseDB } from '@/config/firebase';
import { useNavigation } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    View,
} from 'react-native';

type TNote = {
    title: string;
    noteData: string;
};
const index = () => {
    const navigation = useNavigation();

    const [note, setNote] = useState<TNote>({ title: '', noteData: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     const backAction = () => {
    //         addNotes();
    //         navigation.goBack();
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction
    //     );

    //     return () => backHandler.remove();
    // }, []);
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
    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View className="h-full">
            <View className="bg-white h-16">
                <TextInput
                    style={{ fontSize: 35 }}
                    placeholder="Tilte"
                    maxLength={25}
                    className="font-bold text-primary pl-10 w-2/3"
                    onChangeText={(e) => setNote({ ...note, title: e })}
                />
            </View>
            <KeyboardAvoidingView>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    className="p-2 h-full"
                >
                    <TextInput
                        style={{
                            textAlignVertical: 'top',
                        }}
                        multiline
                        scrollEnabled
                        className="text-xl p-2"
                        placeholder="Start writing from here..."
                        onChangeText={(e) => setNote({ ...note, noteData: e })}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <View className="absolute bottom-6 right-6 z-50">
                <Button title="Save" onPress={addNotes} />
            </View>
        </View>
    );
};

export default index;