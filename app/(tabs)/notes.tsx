import AddButton from '@/components/AddButton';
import NotesCard from '@/components/NotesCard';
import { firebaseDB } from '@/config/firebase';
import { TNotes } from '@/types/commonTypes';
import { router } from 'expo-router';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

const notes = () => {
    const [notesList, setNotesList] = useState<TNotes[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    console.log('selected', selected);
    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(firebaseDB, 'notes'),
            (snapshot) => {
                const updatedNotes = snapshot.docs.map((item) => ({
                    id: item.id,
                    ...item.data(),
                }));
                setNotesList(updatedNotes);
                setSelected([]);
            }
        );
        return () => unSubscribe();
    }, []);
    const deleteMultipleNotes = async () => {
        const notesToDelete = selected.map((id) =>
            deleteDoc(doc(firebaseDB, 'notes', id))
        );
        await Promise.all(notesToDelete);
    };
    const longPressFunction = (id: string) => {
        Vibration.vibrate(50);
        console.log('longpressd', id);
        setSelected([...selected, id]);
    };
    const handleNotesCardPress = (id: string) => {
        if (selected.length) {
            const isNotesSelected = selected.find((item) => item === id);
            if (isNotesSelected) {
                setSelected(selected.filter((item) => item !== id));
            } else {
                setSelected([...selected, id]);
            }
        } else {
            router.push('/notesForm');
        }
    };
    return (
        <View className="h-full">
            {selected.length && (
                <View className="bg-white w-full p-2">
                    <View className="flex flex-row ml-auto gap-8">
                        <TouchableOpacity
                            onPress={() => setSelected([])}
                            style={{
                                borderWidth: 1.5,
                                borderColor: '#244f8f',
                                borderRadius: 8,
                                height: 40,
                                width: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteMultipleNotes}
                            style={{
                                borderWidth: 1.5,
                                borderColor: '#ff0000',
                                borderRadius: 8,
                                height: 40,
                                width: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text>Delete All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between gap-2 p-2">
                    {notesList.map((notes) => (
                        <NotesCard
                            key={notes.id}
                            notes={notes}
                            onPress={handleNotesCardPress}
                            onLongPress={longPressFunction}
                            selected={selected}
                        />
                    ))}
                </View>
            </ScrollView>
            {!selected.length && (
                <AddButton onPress={() => router.push('/notesForm')} />
            )}
        </View>
    );
};

export default notes;
