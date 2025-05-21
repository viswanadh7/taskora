import ProfileText from '@/components/ProfileText';
import { useGlobalState } from '@/hooks/useGlobalState';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const profile = () => {
    const { userDetails, removeUserDetails } = useGlobalState();
    return (
        <View>
            <View className="py-4">
                <View className="flex flex-row justify-center">
                    <Image
                        source={require('../../assets/profile/profile-sample.png')}
                    />
                </View>
                <Text className="text-2xl text-center">
                    {userDetails?.username}
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: 50,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: '100%',
                }}
            >
                <View className="p-4">
                    <ProfileText
                        title="Username"
                        data={userDetails?.username}
                    />
                    <ProfileText title="Name" data={userDetails?.name} />
                </View>
                <TouchableOpacity
                    onPress={removeUserDetails}
                    style={{
                        height: 44,
                        width: '80%',
                        borderWidth: 1,
                        borderColor: 'red',
                        borderRadius: 8,
                        marginHorizontal: 'auto',
                        elevation: 5,
                        backgroundColor: 'white',
                    }}
                >
                    <Text className="text-red-500 text-xl text-center my-auto">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default profile;
