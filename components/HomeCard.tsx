import { THomeCard } from '@/types/componentTypes';
import { getRandomHexCode } from '@/utils/random-color';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const HomeCard = ({ title, data, onPress }: THomeCard) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: getRandomHexCode(),
                height: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
            className="rounded-xl p-4 w-[49%] shadow-xl"
        >
            <View>
                <Text style={{ fontSize: 22 }} className="mb-4">
                    {title}
                </Text>
                <Text
                    style={{ fontSize: 40 }}
                    className="text-[#37474F] text-center"
                >
                    {data}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default HomeCard;
