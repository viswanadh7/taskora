import React from 'react';
import { View, Text } from 'react-native';

type TProgressBar = {
    progress: number;
    barHeight?: number;
    progressColor?: string;
    bgColor?: string;
    showProgressNumber?: boolean;
};
const ProgressBar = ({
    progress,
    barHeight,
    progressColor,
    bgColor,
    showProgressNumber,
}: TProgressBar) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    height: barHeight ?? 10,
                    width: showProgressNumber ? '85%' : '100%',
                    backgroundColor: bgColor ?? '#e0e0e0',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={[
                        {
                            height: '100%',
                            backgroundColor: progressColor ?? '#3b82f6',
                        },
                        { width: `${progress}%` },
                    ]}
                />
            </View>
            {showProgressNumber && (
                <View>
                    <Text>{progress}%</Text>
                </View>
            )}
        </View>
    );
};

export default ProgressBar;
