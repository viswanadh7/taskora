import { TNotes, TUserDetails } from '@/types/commonTypes';
import { TTask } from '@/types/componentTypes';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

type TContext = {
    taskList: TTask[];
    setTaskList: Dispatch<SetStateAction<TTask[]>>;
    notesList: TNotes[];
    setNotesList: Dispatch<SetStateAction<TNotes[]>>;
    userDetails: TUserDetails | undefined;
    setUserDetails: Dispatch<SetStateAction<TUserDetails | undefined>>;
    saveUserDetails: (userDetails: TUserDetails) => void;
    removeUserDetails: VoidFunction;
};
export const GlobalContext = createContext<TContext>({} as TContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [taskList, setTaskList] = useState<TTask[]>([]);
    const [notesList, setNotesList] = useState<TNotes[]>([]);
    const [userDetails, setUserDetails] = useState<TUserDetails>();

    useEffect(() => {
        restoreUser();
    }, []);

    const saveUserDetails = async (userDetails: TUserDetails) => {
        setUserDetails(userDetails);
        await SecureStore.setItemAsync(
            'userDetails',
            JSON.stringify(userDetails)
        );
    };

    const removeUserDetails = async () => {
        await SecureStore.deleteItemAsync('userDetails');
        router.replace('/login');
    };

    const restoreUser = async () => {
        try {
            const user = await SecureStore.getItemAsync('userDetails');
            if (user) {
                setUserDetails(JSON.parse(user));
            } else removeUserDetails();
        } catch (error) {
            console.log(error);
            removeUserDetails();
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                taskList,
                setTaskList,
                notesList,
                setNotesList,
                userDetails,
                setUserDetails,
                saveUserDetails,
                removeUserDetails,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
