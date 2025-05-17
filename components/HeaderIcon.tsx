import React from 'react';
import { Image, Text, View } from 'react-native';

const HeaderIcon = () => {
    return (
        <View className="flex flex-row items-center gap-3">
            <Image
                source={require('../assets/images/new-icon.png')}
                style={{ height: 40, width: 40 }}
            />
            <Text className="text-2xl text-primary">Taskora</Text>
        </View>
    );
};

export default HeaderIcon;
