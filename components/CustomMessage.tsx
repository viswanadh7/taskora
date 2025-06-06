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
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    marginTop: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: isCurrentUser ? 0 : 10,
                    borderBottomLeftRadius: isCurrentUser ? 10 : 0,
                }}
                className={`${isCurrentUser ? 'bg-[#D9EAFD]' : 'bg-[#b8d4f0]'}`}
            >
                <Text className="text-lg">{message.message}</Text>
                <Text style={{ fontSize: 10 }} className="text-right">
                    {timestamp}
                </Text>
            </View>
        </View>
    );
};

export default CustomMessage;
