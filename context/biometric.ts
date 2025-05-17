import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
        return Alert.alert(
            'Biometric record not found',
            'Please set up fingerprint or face ID on your device.'
        );
    }

    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Notes is secured. Access with Fingerprint',
        fallbackLabel: 'Enter Password',
    });

    return result.success;
};
