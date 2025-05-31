import { Timestamp } from 'firebase/firestore';

export type TNewTaskForm = {
    userId: string;
    title: string;
    description: string;
    remainderAt: string;
    isCompleted: boolean;
    category: string;
};

export type TNotes = {
    id: string;
    title?: string;
    noteData?: string;
    updatedOn?: string;
    colorCode?: string;
    isLocked?: boolean;
};

export type TNewNotesForm = {
    userId: string;
    title: string;
    noteData: string;
    updatedOn: Date | string;
    colorCode: string;
    isLocked: boolean;
};

export type TUserDetails = {
    id: string;
    username?: string;
    name?: string;
    password?: string;
};

export type TFetchedMessages = {
    id: string;
    chatId?: string;
    senderId?: string;
    message?: string;
    timestamp?: Timestamp;
};

export type TProjectsList = {
    id: string;
    projectName?: string;
    description?: string;
    priority?: string;
    noOfTasks?: number;
    completedPercentage?: number;
    startDate?: string;
    endDate?: string;
};

export type TTask = {
    id: string;
    title?: string;
    description?: string;
    remainderAt?: string;
    isCompleted?: boolean;
    category?: string;
};

export type TProjectTask = {
    id: string;
    title?: string;
    description?: string;
    remainderAt?: string;
    isCompleted?: boolean;
};
