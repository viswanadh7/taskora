import { Tabs } from 'expo-router';
import React from 'react';
import {
    AntDesign,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
} from '@expo/vector-icons';

const TabLayout = () => {
    return (
        <Tabs initialRouteName="index">
            <Tabs.Screen
                name="notes"
                options={{
                    headerShown: false,
                    title: 'Notes',
                    tabBarIcon: ({ focused }) => (
                         <SimpleLineIcons name="notebook" size={24}
                            color={focused ? 'blue' : 'black'}
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
                            size={24}
                            color={focused ? 'blue' : 'black'}
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
                            size={24}
                            color={focused ? 'blue' : 'black'}
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
                            size={24}
                            color={focused ? 'blue' : 'black'}
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
                            size={24}
                            color={focused ? 'blue' : 'black'}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
