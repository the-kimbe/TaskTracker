import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../home/Dashboard';
import Icon from '@react-native-vector-icons/lucide';

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
                        <Icon name="layout-dashboard" color={color} size={size} />
                    ),
                }}
            />
               <Tab.Screen
                name="Dash"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dash',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="layout-dashboard" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
        name="Tasks"
        component={Profile} // Pansamantala, palitan mo nalang ng TasksStack pag ready na
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <ListTodo color={color} size={size} strokeWidth={2} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      /> */}


        </Tab.Navigator>
    );
}