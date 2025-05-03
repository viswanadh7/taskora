import { Tabs } from 'expo-router';
import React from 'react';
import {
    AntDesign,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
} from '@expo/vector-icons';
import { colorPalette } from '@/styles/colors';

const TabLayout = () => {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                tabBarStyle: {
                    height: 55,
                },
                tabBarActiveTintColor: colorPalette.primary,
                tabBarLabelStyle: {
                    fontSize: 13,
                },
            }}
        >
            <Tabs.Screen
                name="notes"
                options={{
                    headerShown: false,
                    title: 'Notes',
                    tabBarIcon: ({ focused }) => (
                        <SimpleLineIcons
                            name="notebook"
                            size={focused ? 28 : 24}
                            color={focused ? colorPalette.primary : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    headerShown: false,
                    title: 'Tasks',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="tasks"
                            size={focused ? 28 : 24}
                            color={focused ? colorPalette.primary : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="home"
                            size={focused ? 28 : 24}
                            color={focused ? colorPalette.primary : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    headerShown: false,
                    title: 'Projects',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="bookshelf"
                            size={focused ? 28 : 24}
                            color={focused ? colorPalette.primary : 'black'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="account-outline"
                            size={focused ? 28 : 24}
                            color={focused ? colorPalette.primary : 'black'}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
