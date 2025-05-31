import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { TNotesCard } from '@/types/componentTypes';

import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

const NotesCard = ({ notes, onPress, onLongPress, selected }: TNotesCard) => {
    const isSelected = selected.find((item) => item === notes.id);

    return (
        <TouchableOpacity
            style={{
                elevation: 10,
                backgroundColor: notes.colorCode,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected && 'black',
            }}
            onPress={() => onPress(notes.id, notes.isLocked!)}
            onLongPress={() => onLongPress(notes.id)}
            className="rounded-xl p-4 w-[49%]"
        >
            {isSelected && (
                <Feather
                    name="check"
                    size={20}
                    color="white"
                    style={{
                        backgroundColor: 'black',
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                    }}
                />
            )}
            <Text style={{ fontSize: 12 }} className="text-[#37474F]">
                {notes.updatedOn}
            </Text>
            <Text className="text-2xl mb-4">{notes.title}</Text>
            <Text className="h-40 text-[#37474F]">
                {notes.noteData!.length > 130
                    ? notes.noteData?.slice(0, 130) + '...'
                    : notes.noteData}
            </Text>
        </TouchableOpacity>
    );
};

export default NotesCard;
