import { Stack, useGlobalSearchParams } from 'expo-router';
import '../global.css';
import { Image, StatusBar, Text, View } from 'react-native';
import { colorPalette } from '@/styles/colors';
import { GlobalStateProvider } from '@/context';

export default function RootLayout() {
    // StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content', true);
    const { title } = useGlobalSearchParams();
    return (
        <GlobalStateProvider>
            <Stack
                initialRouteName="(tabs)"
                // screenOptions={{
                //     headerStyle: {
                //         backgroundColor: colorPalette.primary,
                //     },
                //     headerTintColor: 'white',
                // }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerTitle: () => (
                            <View className="flex flex-row items-center gap-3">
                                <Image
                                    source={require('../assets/images/new-icon.png')}
                                    style={{ height: 40, width: 40 }}
                                />
                                <Text className="text-2xl text-primary">
                                    Taskora
                                </Text>
                            </View>
                        ),
                    }}
                />
                <Stack.Screen
                    name="taskForm/index"
                    options={{
                        headerTitle: 'New Task',
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="taskDetails/[taskId]/index"
                    options={{
                        headerTitle: () => (
                            <View className="flex flex-row items-center gap-3">
                                <Text className="text-2xl text-primary">
                                    {title}
                                </Text>
                            </View>
                        ),
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="notesForm/index"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </GlobalStateProvider>
    );
}
