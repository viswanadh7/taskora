import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type TUser = {
    id?: string;
    name?: string;
    lastMessage?: string;
    lastUpdated?: Timestamp;
};
type TRecentUser = {
    user: TUser;
    onPress: VoidFunction;
};
const RecentUser = ({ user, onPress }: TRecentUser) => {
    const date = user.lastUpdated?.toDate();
    const timestamp = dayjs(date).format('hh:mm A');
    return (
        <TouchableOpacity
            style={{
                marginVertical: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                paddingVertical: 5,
                width: '100%',
            }}
            onPress={onPress}
        >
            <View className="flex-row gap-2 items-start">
                <Image
                    style={{ height: 50, width: 50, borderRadius: 25 }}
                    source={require('../assets/profile/dog.png')}
                />
                <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xl font-semibold">
                            {user.name}
                        </Text>
                        <Text className="text-xs text-gray-500">
                            {timestamp}
                        </Text>
                    </View>
                    <Text className="text-gray-700 mt-1">
                        {user.lastMessage!.length > 40
                            ? user.lastMessage?.slice(0, 40) + '...'
                            : user.lastMessage}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RecentUser;
