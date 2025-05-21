import React from 'react';
import { Text, View } from 'react-native';

const ProfileText = ({
    title,
    data,
}: {
    title: string;
    data: string | undefined;
}) => {
    return (
        <View
            style={{
                marginBottom: 28,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <Text className="text-xl">{title}</Text>
            <Text className="text-xl font-bold">{data}</Text>
        </View>
    );
};

export default ProfileText;
