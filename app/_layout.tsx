import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
    return (
        <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerTitle: 'Taskora' }} />
            <Stack.Screen name="taskForm" />
        </Stack>
    );
}
