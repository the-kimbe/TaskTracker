import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../home/Dashboard';
import Icon from '@react-native-vector-icons/lucide';
import Tasks from '../home/Tasks'
import Profile from '../home/Profile'

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4f46e5',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="house" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Task"
                component={Tasks}
                options={{
                    tabBarLabel: 'Task',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list-todo" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}