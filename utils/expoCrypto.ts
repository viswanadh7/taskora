import * as Crypto from 'expo-crypto';

const salt = process.env.EXPO_PUBLIC_SALT;

const hashPassword = async (password: string): Promise<string> => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password + salt
    );
    return digest;
};

const comparePasswords = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const hash = await hashPassword(password);
    return hash === hashedPassword;
};
export default { hashPassword, comparePasswords };