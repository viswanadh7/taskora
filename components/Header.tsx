import { colorPalette } from '@/styles/colors';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
    const insets = useSafeAreaInsets(); //gets the exact status bar space

    return (
        <View
            style={{
                paddingTop: insets.top,
                height: 60 + insets.top, // insets.top gives the exact status bar height
                elevation: 10,
                backgroundColor: 'white',
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
                <Image
                    source={require('../assets/images/new-icon.png')}
                    style={{ height: 40, width: 40 }}
                />
                <Text style={{ fontSize: 22, color: colorPalette.primary }}>
                    Taskora
                </Text>
            </View>
            <TouchableOpacity
                style={{ padding: 12 }}
                onPress={() => router.push('/(tabs)/profile')}
            >
                <Image
                    source={require('../assets/icons/user.png')}
                    style={{ height: 20, width: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
