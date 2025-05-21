export const getOtherUserId = (
    data: string | string[],
    currentUserId: string
) => {
    let otherUserId: string;
    const isArray = Array.isArray(data);

    if (isArray) {
        otherUserId = data.filter((item) => item !== currentUserId).join('');
    } else {
        otherUserId = data
            .split('_')
            .filter((item) => item !== currentUserId)
            .join('');
    }
    return otherUserId;
};
