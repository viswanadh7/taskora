import { firebaseDB } from '@/config/firebase';
import {
    TNotes,
    TProjectsList,
    TProjectTask,
    TUserDetails,
} from '@/types/commonTypes';
import { TTask } from '@/types/componentTypes';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

type TContext = {
    //states
    taskList: TTask[];
    setTaskList: Dispatch<SetStateAction<TTask[]>>;
    notesList: TNotes[];
    setNotesList: Dispatch<SetStateAction<TNotes[]>>;
    userDetails: TUserDetails | undefined;
    setUserDetails: Dispatch<SetStateAction<TUserDetails | undefined>>;
    projectsList: TProjectsList[];
    setProjectsList: Dispatch<SetStateAction<TProjectsList[]>>;
    projectTasks: { [key: string]: TProjectTask[] };
    setProjectTasks: Dispatch<
        SetStateAction<{ [key: string]: TProjectTask[] }>
    >;

    //SecureStore functions
    saveUserDetails: (userDetails: TUserDetails) => void;
    removeUserDetails: VoidFunction;

    //firebase functions
    updateNoOfTasks: (projectId: string) => Promise<void>;
    updateCompletedPercentage: (
        projectId: string,
        tasks: TTask[]
    ) => Promise<void>;
};

export const GlobalContext = createContext<TContext>({} as TContext);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [taskList, setTaskList] = useState<TTask[]>([]);
    const [notesList, setNotesList] = useState<TNotes[]>([]);
    const [userDetails, setUserDetails] = useState<TUserDetails>();
    const [projectsList, setProjectsList] = useState<TProjectsList[]>([]);
    const [projectTasks, setProjectTasks] = useState<{
        [key: string]: TProjectTask[];
    }>({});
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

    const updateCompletedPercentage = async (
        projectId: string,
        tasks: TTask[]
    ) => {
        const completedTasks = tasks.filter((task) => task.isCompleted);
        const totalTasks = tasks.length;
        const percent = Math.floor((completedTasks.length / totalTasks) * 100);

        try {
            await updateDoc(doc(firebaseDB, 'projects', projectId), {
                completedPercentage: percent,
            });
        } catch (error) {
            console.log(
                'Error while updating project completed percentage',
                error
            );
        }
    };

    const updateNoOfTasks = async (projectId: string) => {
        const projectTaskRef = collection(
            firebaseDB,
            'projects',
            projectId as string,
            'tasks'
        );
        try {
            const projectTaskList = await getDocs(projectTaskRef);
            const currentProject = projectsList.find(
                (project) => project.id === (projectId as string)
            );
            const updatedProject = {
                ...currentProject,
                noOfTasks: projectTaskList.docs.length,
            };
            await updateDoc(
                doc(firebaseDB, 'projects', projectId as string),
                updatedProject
            );
            const pTasks = projectTaskList.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            await updateCompletedPercentage(projectId, pTasks);
        } catch (error) {
            console.log('Error updating no of tasks: ', error);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                //states
                taskList,
                setTaskList,
                notesList,
                setNotesList,
                userDetails,
                setUserDetails,
                projectsList,
                setProjectsList,
                projectTasks,
                setProjectTasks,

                //SecureStore functions
                saveUserDetails,
                removeUserDetails,

                //firebase functions
                updateNoOfTasks,
                updateCompletedPercentage,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
