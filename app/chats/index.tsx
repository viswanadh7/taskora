import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    // orderBy,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import { firebaseDB } from '@/config/firebase';
import { TUserDetails } from '@/types/commonTypes';
import { router } from 'expo-router';
import { useGlobalState } from '@/hooks/useGlobalState';
import { getOtherUserId } from '@/utils/other-userid';
import RecentUser from '@/components/RecentUser';

const index = () => {
    const { userDetails } = useGlobalState();
    const [userResults, setUserResults] = useState<TUserDetails[]>();
    const [text, setText] = useState<string>('');
    const [recentlyChatedUsers, setRecentlyChatedUsers] = useState<
        {
            id?: string;
            name?: string;
            lastMessage?: string;
            lastUpdated?: Timestamp;
        }[]
    >();

    useEffect(() => {
        let data;
        const queryRef = query(
            collection(firebaseDB, 'chats'),
            where('users', 'array-contains', userDetails?.id)
            // orderBy('lastUpdated', 'asc')
        );
        const getRecentlyChatedUsers = onSnapshot(queryRef, (snapshot) => {
            data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // console.log(data);
            getMultipleUserData(data);
        });

        return () => getRecentlyChatedUsers();
    }, []);

    const getMultipleUserData = async (
        data: {
            id: string;
            lastMessage?: string;
            lastUpdated?: Timestamp;
            users?: string[];
        }[]
    ) => {
        const snapshot = data.map((item) => {
            const userID = getOtherUserId(item.id, userDetails!.id);
            return getDoc(doc(firebaseDB, 'users', userID));
        });
        const results = await Promise.all(snapshot);
        const fetchedUsers: TUserDetails[] = results.map((item) => ({
            id: item.id,
            ...item.data(),
        }));

        const x = fetchedUsers.map((item) => {
            const message = data.find((d) => d.users?.includes(item.id));
            return {
                id: message?.id,
                name: item.name,
                lastMessage: message?.lastMessage,
                lastUpdated: message?.lastUpdated,
            };
        });

        setRecentlyChatedUsers(x);
    };

    const handleSearch = async () => {
        const userCollection = collection(firebaseDB, 'users');
        const condition = where('username', '==', text);
        const querySnapshot = query(userCollection, condition);
        const snapshot = await getDocs(querySnapshot);
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUserResults(users);
    };
    return (
        <ScrollView className="p-2">
            <View className="flex flex-row justify-between items-center border rounded">
                <TextInput
                    className="w-[90%]"
                    placeholder="Search"
                    onChangeText={(e) => setText(e)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <EvilIcons name="search" size={30} color="black" />
                </TouchableOpacity>
            </View>
            {userResults?.map((item) => (
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/chats/[chatId]',
                            params: {
                                chatId: [item.id, userDetails?.id]
                                    .sort()
                                    .join('_'),
                            },
                        })
                    }
                    className="border-b p-2"
                    key={item.id}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            ))}
            {recentlyChatedUsers?.map((recentUser, index) => (
                <RecentUser
                    key={index}
                    user={recentUser}
                    onPress={() =>
                        router.push({
                            pathname: '/chats/[chatId]',
                            params: { chatId: recentUser.id as string },
                        })
                    }
                />
            ))}
        </ScrollView>
    );
};

export default index;
