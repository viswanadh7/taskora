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
};
export const GlobalContext = createContext<TContext>({} as TContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [taskList, setTaskList] = useState<TTask[]>([]);
    return (
        <GlobalContext.Provider value={{ taskList, setTaskList }}>
            {children}
        </GlobalContext.Provider>
    );
};
