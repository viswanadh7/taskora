import CustomTextInput from '@/components/CustomTextInput';
import { firebaseDB } from '@/config/firebase';
import { useGlobalState } from '@/hooks/useGlobalState';
import { TUserDetails } from '@/types/commonTypes';
import expoCrypto from '@/utils/expoCrypto';
import { Link, router } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validations/schema';

const index = () => {
    const { saveUserDetails } = useGlobalState();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleLogin = async (loginDetails: {
        username: string;
        password: string;
    }) => {
        const loginQuery = query(
            collection(firebaseDB, 'users'),
            where('username', '==', loginDetails.username)
        );
        try {
            const userData = await getDocs(loginQuery);
            const user: TUserDetails = {
                id: userData.docs[0].id,
                ...userData.docs[0].data(),
            };
            const isPasswordsMatched = await expoCrypto.comparePasswords(
                loginDetails.password,
                user.password!
            );
            if (isPasswordsMatched) {
                console.log('Login successful');
                saveUserDetails(user);
                router.replace('/(tabs)');
            } else {
                setError('password', { message: 'Incorrect password' });
            }
        } catch (error) {
            setError('username', {
                message: 'User not found. Please signup to create an account.',
            });
            console.log('error', error);
        }
    };
    return (
        <View className="bg-primary h-full">
            <Text
                style={{ fontSize: 30 }}
                className="text-center my-auto text-white font-semibold"
            >
                Welcome back!!!
            </Text>
            <View className="px-4 pt-10 h-[80%] rounded-t-3xl bg-white mt-auto">
                <Controller
                    name="username"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            label="Username"
                            placeholder="Enter your unique username"
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.username?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CustomTextInput
                            label="Password"
                            placeholder="Enter your password"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />
                <TouchableOpacity
                    onPress={handleSubmit(handleLogin)}
                    className="h-10 w-28 border rounded-lg mt-5 ml-auto"
                >
                    <Text className="text-center my-auto text-lg">Login</Text>
                </TouchableOpacity>

                <Link
                    href="/signup"
                    className="text-blue-500 text-sm text-center mt-auto mb-20"
                >
                    Didnt have an account? Click here to SignUp
                </Link>
            </View>
        </View>
    );
};

export default index;
