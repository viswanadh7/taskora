import { GlobalContext } from '@/context';
import { useContext } from 'react';

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('Error in context');
    }
    return context;
};
