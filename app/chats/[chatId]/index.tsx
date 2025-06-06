import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
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
    FlatList,
    SafeAreaView,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const index = () => {
    const { userDetails } = useGlobalState();
    const { chatId } = useGlobalSearchParams();
    const insets = useSafeAreaInsets(); //gets the exact status bar space

    const otherUserId = (chatId as string)
        .split('_')
        .filter((item) => item !== userDetails?.id)
        .join('');
    const [message, setMessage] = useState<string>('');
    const [fetchedMessages, setFetchedMessages] =
        useState<TFetchedMessages[]>();

    const flatListRef = useRef(null);

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
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={insets.top + 60}
            >
                <View className="flex-1 p-4">
                    <FlatList
                        ref={flatListRef}
                        data={fetchedMessages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CustomMessage message={item} />
                        )}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        inverted
                        showsVerticalScrollIndicator={false}
                    />
                    <View className="flex flex-row justify-between items-center border rounded px-4 py-2">
                        <TextInput
                            multiline
                            className="w-[90%] max-h-20"
                            placeholder="Type a message"
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity onPress={handleSendMsg}>
                            <Feather name="send" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default index;
