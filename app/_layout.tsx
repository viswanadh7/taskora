import { Stack } from 'expo-router';
import '../global.css';
import { StatusBar } from 'react-native';
import { colorPalette } from '@/styles/colors';

export default function RootLayout() {
    StatusBar.setBackgroundColor(colorPalette.primary);
    return (
        <Stack
            initialRouteName="(tabs)"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colorPalette.primary,
                },
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerTitle: 'Taskora' }} />
            <Stack.Screen name="taskForm" />
        </Stack>
    );
}
