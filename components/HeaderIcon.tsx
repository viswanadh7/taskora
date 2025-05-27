import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const HeaderIcon = () => {
    return (
        <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-3">
                <Image
                    source={require('../assets/images/new-icon.png')}
                    style={{ height: 40, width: 40 }}
                />
                <Text className="text-2xl text-primary">Taskora</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Image
                    source={require('../assets/icons/user.png')}
                    style={{ height: 25, width: 25 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderIcon;
