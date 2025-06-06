import CustomTextInput from '@/components/CustomTextInput';
import { firebaseDB } from '@/config/firebase';
import { TSignUpUser } from '@/types/commonTypes';
import expoCrypto from '@/utils/expoCrypto';
import { getRandomProfilePhoto } from '@/utils/profile-photo';
import { signUpSchema } from '@/validations/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

const index = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(signUpSchema) });

    const checkUsernameTaken = async (username: string): Promise<boolean> => {
        const userCollection = collection(firebaseDB, 'users');
        const condition = where('username', '==', username);
        const usernameQuery = query(userCollection, condition);

        const data = await getDocs(usernameQuery);
        if (data.docs.length) return true;
        else return false;
    };

    const handleSignUp = async (signUpDetails: TSignUpUser) => {
        const isUsernameTaken = await checkUsernameTaken(
            signUpDetails.username
        );
        if (isUsernameTaken) {
            setError('username', {
                message:
                    'Username is already taken. Please choose a different one.',
            });
            return;
        }
        const hashedPassword = await expoCrypto.hashPassword(
            signUpDetails.password
        );
        const updatedSignUpDetails = {
            name: signUpDetails.name,
            username: signUpDetails.username,
            password: hashedPassword,
            profilePhoto: getRandomProfilePhoto(),
        };
        console.log('updatedSignUpDetails', updatedSignUpDetails);

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
                <Controller
                    name="username"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            label="Username"
                            placeholder="Create an unique username"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.username?.message}
                        />
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            label="Name"
                            placeholder="Enter your name"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            secureTextEntry
                            label="Password"
                            placeholder="Create password"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            label="Confirm Password"
                            placeholder="Please confirm your password"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.confirmPassword?.message}
                        />
                    )}
                />
                <TouchableOpacity
                    onPress={handleSubmit(handleSignUp)}
                    className="h-10 w-28 border rounded-lg mt-5 ml-auto"
                >
                    <Text className="text-center my-auto text-lg">Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default index;
