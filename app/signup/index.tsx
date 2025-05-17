import { firebaseDB } from '@/config/firebase';
import { router } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const index = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        username: '',
        name: '',
        password: '',
    });

    const handleSignUp = async () => {
        try {
            await addDoc(collection(firebaseDB, 'users'), signUpDetails);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View className="bg-primary h-full">
            <Text
                style={{ fontSize: 30 }}
                className="text-center my-auto text-white font-semibold"
            >
                Create a new account
            </Text>
            <View className="px-4 pt-10 h-[80%] rounded-t-3xl bg-white mt-auto">
                <Text className="mt-4 text-xl">Username</Text>
                <TextInput
                    className="border border-black/30 rounded-lg py-3 pl-2 text-xl"
                    placeholder="Create an unique username"
                    onChangeText={(e) =>
                        setSignUpDetails({ ...signUpDetails, username: e })
                    }
                />
                <Text className="mt-4 text-xl">Name</Text>
                <TextInput
                    className="border border-black/30 rounded-lg py-3 pl-2 text-xl"
                    placeholder="Enter your name"
                    onChangeText={(e) =>
                        setSignUpDetails({ ...signUpDetails, name: e })
                    }
                />
                <Text className="mt-4 text-xl">Password</Text>
                <TextInput
                    secureTextEntry
                    className="border border-black/30 rounded-lg py-3 pl-2 text-xl"
                    placeholder="Create password"
                    onChangeText={(e) =>
                        setSignUpDetails({ ...signUpDetails, password: e })
                    }
                />
                <TouchableOpacity
                    onPress={handleSignUp}
                    className="h-10 w-28 border rounded-lg mt-5 ml-auto"
                >
                    <Text className="text-center my-auto text-lg">Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default index;
