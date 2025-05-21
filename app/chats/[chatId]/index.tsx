import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { useGlobalState } from '@/hooks/useGlobalState';
import { TFetchedMessages } from '@/types/commonTypes';
import CustomMessage from '@/components/CustomMessage';

const index = () => {
    const { userDetails } = useGlobalState();
    const { chatId } = useGlobalSearchParams();
    const otherUserId = (chatId as string)
        .split('_')
        .filter((item) => item !== userDetails?.id)
        .join('');
    const [message, setMessage] = useState<string>('');
    const [fetchedMessages, setFetchedMessages] =
        useState<TFetchedMessages[]>();

    useEffect(() => {
        const messagesQuery = query(
            collection(firebaseDB, 'chats', chatId as string, 'messages'),
            orderBy('timestamp', 'asc')
        );
        const fetchMessages = onSnapshot(messagesQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFetchedMessages(data);
        });
        return () => fetchMessages();
    }, []);

    const handleSendMsg = async () => {
        try {
            await setDoc(
                doc(firebaseDB, 'chats', chatId as string),
                {
                    // sender: userDetails?.id,
                    // reciver: otherUserId,
                    users: [userDetails?.id, otherUserId],
                    lastMessage: message,
                    lastUpdated: serverTimestamp(),
                },
                { merge: true }
            ); // merge = don't overwrite existing fields
            await addDoc(
                collection(firebaseDB, 'chats', chatId as string, 'messages'),
                {
                    chatId: chatId,
                    senderId: userDetails?.id,
                    message: message,
                    timestamp: serverTimestamp(),
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setMessage('');
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="p-2 h-full">
                    <Text>{chatId}</Text>
                    <ScrollView>
                        {fetchedMessages?.map((item) => (
                            <CustomMessage key={item.id} message={item} />
                        ))}
                    </ScrollView>

                    <View className="flex flex-row justify-between items-center border rounded mt-auto mb-4 px-4">
                        <TextInput
                            multiline
                            className="w-[90%]"
                            placeholder="Search"
                            value={message}
                            onChangeText={(e) => setMessage(e)}
                        />
                        <TouchableOpacity onPress={handleSendMsg}>
                            <Feather name="send" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default index;
