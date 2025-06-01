import { useGlobalState } from '@/hooks/useGlobalState';
import { colorPalette } from '@/styles/colors';
import { getProfilePhoto } from '@/utils/profile-photo';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
    const insets = useSafeAreaInsets(); //gets the exact status bar space
    const { userDetails } = useGlobalState();

    return (
        <View
            style={{
                paddingTop: insets.top,
                height: 60 + insets.top, // insets.top gives the exact status bar height
                elevation: 20,
                shadowColor: 'black',
                backgroundColor: colorPalette.primary,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
                <Image
                    source={require('../assets/images/header-icon.png')}
                    style={{ height: 32, width: 32 }}
                />
                <Text
                    style={{
                        fontSize: 22,
                        color: 'white',
                    }}
                >
                    Taskora
                </Text>
            </View>
            <TouchableOpacity
                style={{ padding: 12 }}
                onPress={() => router.push('/(tabs)/profile')}
            >
                <Image
                    source={getProfilePhoto(
                        userDetails?.profilePhoto as string
                    )}
                    style={{ height: 28, width: 28 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
