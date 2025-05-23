import { TNotes } from './commonTypes';

export type TTask = {
    id: string;
    title?: string;
    description?: string;
    remainderAt?: string;
    isCompleted?: boolean;
    category?: string;
};

export type TNotesCard = {
    notes: TNotes;
    onPress: (id: string, isLocked: boolean) => void;
    onLongPress: (id: string) => void;
    selected: string[];
};
export type THomeCard = {
    title: string;
    data: string | number;
    onPress: VoidFunction;
};
