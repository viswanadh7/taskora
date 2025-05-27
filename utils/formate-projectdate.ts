import dayjs from 'dayjs';

export const formateProjectDate = (date: Date) => {
    return dayjs(date).format('DD MMMM');
};
