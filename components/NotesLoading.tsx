import React from 'react';
import { View } from 'react-native';

const NotesLoading = () => {
    return (
        <View className="flex flex-row flex-wrap justify-between gap-2 p-2">
            {Array.from({ length: 6 }).map((_item, index) => (
                <View
                    key={index}
                    style={{ height: 230, elevation: 10 }}
                    className="p-2 rounded-lg bg-white overflow-hidden w-[49%]"
                >
                    <View>
                        <View className="textLoading w-[20%] h-2 my-3" />
                        <View className="textLoading w-[50%]" />
                        <View className="my-2 max-h-10 mt-5">
                            <View className="textLoading w-[80%] h-2 my-3" />
                            <View className="textLoading w-[80%] h-2 my-3" />
                            <View className="textLoading w-[80%] h-2 my-3" />
                            <View className="textLoading w-[80%] h-2 my-3" />
                            <View className="textLoading w-[80%] h-2 my-3" />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default NotesLoading;
