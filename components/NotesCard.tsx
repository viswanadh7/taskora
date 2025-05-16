import { lightColorHexCodes } from '@/styles/colors';
import { TNotes } from '@/types/commonTypes';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

type TNotesCard = {
    notes: TNotes;
    onPress: (id: string) => void;
    onLongPress: (id: string) => void;
    selected: string[];
};
const NotesCard = ({ notes, onPress, onLongPress, selected }: TNotesCard) => {
    const num = Math.random() * 100;
    const colorCode = lightColorHexCodes[Math.floor(num)];

    const isSelected = selected.find((item) => item === notes.id);

    return (
        <TouchableOpacity
            style={{
                backgroundColor: colorCode,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? 'black' : '#9c9c9c',
            }}
            onPress={() => onPress(notes.id)}
            onLongPress={() => onLongPress(notes.id)}
            className="rounded-xl p-4 w-[49%] shadow-xl"
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
            <Text className="text-2xl mb-4">{notes.title}</Text>
            <Text className="h-40 text-[#37474F]">{notes.noteData}</Text>
        </TouchableOpacity>
    );
};

export default NotesCard;
