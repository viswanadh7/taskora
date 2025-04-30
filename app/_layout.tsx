import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
    return (
        <Stack initialRouteName='(tabs)'>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="taskForm" />
        </Stack>
    );
}
