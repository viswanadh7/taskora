import AddButton from '@/components/AddButton';
import NotesCard from '@/components/NotesCard';
import NotesLoading from '@/components/NotesLoading';
import { firebaseDB } from '@/config/firebase';
import { handleBiometricAuth } from '@/context/biometric';
import { useGlobalState } from '@/hooks/useGlobalState';
import { buttons } from '@/styles/custom-styles';
import { router } from 'expo-router';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

const notes = () => {
    const { notesList, setNotesList, userDetails } = useGlobalState();
    const [selected, setSelected] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        setIsLoading(true);

        const notesCollectionRef = collection(firebaseDB, 'notes');
        const whereCondition = where('userId', '==', userDetails?.id);
        const notesQuery = query(notesCollectionRef, whereCondition);

        const unSubscribe = onSnapshot(notesQuery, (snapshot) => {
            const updatedNotes = snapshot.docs.map((item) => ({
                id: item.id,
                ...item.data(),
            }));
            setNotesList(updatedNotes);
            setSelected([]);
            setIsLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const handleOnLongPress = (id: string) => {
        Vibration.vibrate(50);
        setSelected([...selected, id]);
    };

    const handleLockNotes = async () => {
        const updateNotes = selected.map((id) =>
            updateDoc(doc(firebaseDB, 'notes', id), { isLocked: true })
        );
        await Promise.all(updateNotes);
    };

    const deleteMultipleNotes = async () => {
        const notesToDelete = selected.map((id) =>
            deleteDoc(doc(firebaseDB, 'notes', id))
        );
        await Promise.all(notesToDelete);
    };

    const handleNotesCardPress = async (id: string, isLocked: boolean) => {
        if (selected.length) {
            const isNotesSelected = selected.find((item) => item === id);
            if (isNotesSelected) {
                setSelected(selected.filter((item) => item !== id));
            } else {
                setSelected([...selected, id]);
            }
        } else {
            if (isLocked) {
                const isBiometricAuth = await handleBiometricAuth();
                if (isBiometricAuth) {
                    router.push({
                        pathname: '/notesForm',
                        params: { notesId: id },
                    });
                }
            } else {
                router.push({
                    pathname: '/notesForm',
                    params: { notesId: id },
                });
            }
        }
    };
    if (isLoading) {
        return <NotesLoading />;
    }

    return (
        <View className="h-full">
            {selected.length && (
                <View className="bg-white w-full p-2">
                    <View className="flex flex-row ml-auto gap-8">
                        <TouchableOpacity
                            onPress={() => setSelected([])}
                            style={buttons.clear}
                        >
                            <Text>Clear</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={handleLockNotes}
                            style={buttons.lock}
                        >
                            <Text>Lock</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={deleteMultipleNotes}
                            style={buttons.delete}
                        >
                            <Text>
                                {selected.length === 1
                                    ? 'Delete'
                                    : 'Delete All'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: notesList?.length ? 'flex-start' : 'center',
                }}
            >
                {notesList.length ? (
                    <View className="flex flex-row flex-wrap justify-between gap-2 p-2">
                        {notesList.map((notes) => (
                            <NotesCard
                                key={notes.id}
                                notes={notes}
                                onPress={handleNotesCardPress}
                                onLongPress={handleOnLongPress}
                                selected={selected}
                            />
                        ))}
                    </View>
                ) : (
                    <View className="flex-1 flex-row justify-center items-center">
                        <View>
                            <Image
                                style={{ height: 150, width: 150 }}
                                source={require('../../assets/icons/stacked-paper.png')}
                            />
                            <Text className="text-center">No notes</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
            {!selected.length && (
                <AddButton onPress={() => router.push('/notesForm')} />
            )}
        </View>
    );
};

export default notes;
