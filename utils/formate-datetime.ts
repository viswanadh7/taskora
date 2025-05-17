import dayjs from 'dayjs';

export const formateDateTime = (date: Date, time: Date) => {
    const dateTimeString = `${dayjs(date).format('DD MMMM, YYYY')} ${dayjs(
        time
    ).format('hh:mm A')}`;
    return dateTimeString;
};
