import { useGlobalState } from '@/hooks/useGlobalState';
import { TFetchedMessages } from '@/types/commonTypes';
import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';

type TCustomMessage = {
    message: TFetchedMessages;
};
const CustomMessage = ({ message }: TCustomMessage) => {
    const { userDetails } = useGlobalState();
    const isCurrentUser = message.senderId! === userDetails?.id;
    const date = message.timestamp?.toDate();
    const timestamp = dayjs(date).format('hh:mm A');

    return (
        <View className={`flex flex-row ${isCurrentUser ? 'justify-end' : ''}`}>
            <View
                style={{
                    minWidth: '30%',
                    maxWidth: '70%',
                }}
                className={`max-w-[50%] p-2 my-1 rounded-xl ${
                    isCurrentUser ? 'bg-primary' : 'bg-secondary'
                }`}
            >
                <Text className="text-lg">{message.message}</Text>
                <Text className="text-sm text-right">{timestamp}</Text>
            </View>
        </View>
    );
};

export default CustomMessage;
