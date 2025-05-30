import CustomTextInput from '@/components/CustomTextInput';
import { firebaseDB } from '@/config/firebase';
import expoCrypto from '@/utils/expoCrypto';
import { isUsernameValid } from '@/utils/validate-username';
import { router } from 'expo-router';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const index = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        username: '',
        name: '',
        password: '',
    });
    const [errorMsg, setErrorMsg] = useState<string>('');

    const checkUsernameTaken = async (username: string): Promise<boolean> => {
        const userCollection = collection(firebaseDB, 'users');
        const condition = where('username', '==', username);
        const usernameQuery = query(userCollection, condition);

        const data = await getDocs(usernameQuery);
        if (data.docs.length) return true;
        else return false;
    };

    const handleSignUp = async () => {
        const isUsernameTaken = await checkUsernameTaken(
            signUpDetails.username
        );
        if (isUsernameValid(signUpDetails.username)) {
            setErrorMsg(
                'Username must start with a letter, be 3-20 characters long, and can include letters, numbers, and underscores (no trailing or double underscores).'
            );
            return;
        }
        if (isUsernameTaken) {
            setErrorMsg(
                'Username is already taken. Please choose a different one.'
            );
            return;
        }
        const hashedPassword = await expoCrypto.hashPassword(
            signUpDetails.password
        );
        const updatedSignUpDetails = {
            ...signUpDetails,
            password: hashedPassword,
        };

        try {
            await addDoc(collection(firebaseDB, 'users'), updatedSignUpDetails);
            router.replace('/login');
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
                <CustomTextInput
                    label="Username"
                    placeholder="Create an unique username"
                    onChangeText={(e) => {
                        setErrorMsg('');
                        setSignUpDetails({ ...signUpDetails, username: e });
                    }}
                />
                <CustomTextInput
                    label="Name"
                    placeholder="Enter your name"
                    onChangeText={(e) =>
                        setSignUpDetails({ ...signUpDetails, name: e })
                    }
                />
                <CustomTextInput
                    secureTextEntry
                    label="Password"
                    placeholder="Create password"
                    onChangeText={(e) =>
                        setSignUpDetails({ ...signUpDetails, password: e })
                    }
                />
                {errorMsg && (
                    <Text className="text-red-500 text-center my-5">
                        {errorMsg}
                    </Text>
                )}
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
