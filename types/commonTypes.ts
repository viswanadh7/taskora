export type TNewTaskForm = {
    userId: string;
    title: string;
    description: string;
    remainderAt: string;
    isCompleted: boolean;
};

export type TNotes = {
    id: string;
    title?: string;
    noteData?: string;
    updatedOn?: Date;
    colorCode?: string;
    isLocked?: boolean;
};

export type TNewNotesForm = {
    userId: string;
    title: string;
    noteData: string;
    updatedOn: Date;
    colorCode: string;
    isLocked: boolean;
};

export type TUserDetails = {
    id: string;
    username?: string;
    name?: string;
    password?: string;
};
