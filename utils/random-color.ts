import { lightColorHexCodes } from '@/styles/colors';

export const getRandomHexCode = () => {
    const num = Math.random() * 100;
    const colorCode = lightColorHexCodes[Math.floor(num)];
    return colorCode;
};
