import { ImageSourcePropType } from 'react-native';

const profilePhotoArray = [
    'alien',
    'cat',
    'dog',
    'fish',
    'ghost',
    'koala',
    'lion',
    'ninja',
    'sample',
];
const profileImages: Record<string, ImageSourcePropType> = {
    alien: require('../assets/profile/alien.png'),
    cat: require('../assets/profile/cat.png'),
    dog: require('../assets/profile/dog.png'),
    fish: require('../assets/profile/fish.png'),
    ghost: require('../assets/profile/ghost.png'),
    koala: require('../assets/profile/koala.png'),
    lion: require('../assets/profile/lion.png'),
    ninja: require('../assets/profile/ninja.png'),
    pirate: require('../assets/profile/pirate.png'),
    sample: require('../assets/profile/sample.png'),
};

export const getRandomProfilePhoto = (): string => {
    const random = Math.random() * profilePhotoArray.length;
    const randomIndex = Math.floor(random);
    return profilePhotoArray[randomIndex];
};

export const getProfilePhoto = (profilePhoto: string): ImageSourcePropType => {
    return profileImages[profilePhoto];
};
