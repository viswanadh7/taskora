export type TNewTaskForm = {
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
    title: string;
    noteData: string;
    updatedOn: Date;
    colorCode: string;
    isLocked: boolean;
};
