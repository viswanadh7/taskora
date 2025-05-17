import { TNotes } from '@/types/commonTypes';
import { TTask } from '@/types/componentTypes';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';

type TContext = {
    taskList: TTask[];
    setTaskList: Dispatch<SetStateAction<TTask[]>>;
    notesList: TNotes[];
    setNotesList: Dispatch<SetStateAction<TNotes[]>>;
};
export const GlobalContext = createContext<TContext>({} as TContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [taskList, setTaskList] = useState<TTask[]>([]);
    const [notesList, setNotesList] = useState<TNotes[]>([]);

    return (
        <GlobalContext.Provider
            value={{ taskList, setTaskList, notesList, setNotesList }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
