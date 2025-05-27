import { Stack, useGlobalSearchParams } from 'expo-router';
import '../global.css';
import { StatusBar, Text, View } from 'react-native';
import { colorPalette } from '@/styles/colors';
import { GlobalStateProvider } from '@/context';
import HeaderIcon from '@/components/HeaderIcon';

export default function RootLayout() {
    StatusBar.setBarStyle('dark-content', true);
    const { title, chatId, projectName } = useGlobalSearchParams();
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
                    name="login/index"
                    options={{
                        headerTitle: () => <HeaderIcon />,
                    }}
                />
                <Stack.Screen
                    name="signup/index"
                    options={{
                        headerTitle: () => <HeaderIcon />,
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerTitle: () => <HeaderIcon />,
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
                        headerTitle: 'Notes',
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="chats/index"
                    options={{
                        headerTitle: 'Chats',
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="chats/[chatId]/index"
                    options={{
                        headerTitle: chatId as string,
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="projectForm/index"
                    options={{
                        headerTitle: 'Projects',
                        headerTintColor: colorPalette.primary,
                    }}
                />
                <Stack.Screen
                    name="projectTasks/index"
                    options={{
                        headerTitle: projectName as string,
                        headerTintColor: colorPalette.primary,
                    }}
                />
            </Stack>
        </GlobalStateProvider>
    );
}
