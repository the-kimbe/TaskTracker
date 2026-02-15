import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from '../navigation/BottomTabs'
// import TasksStack from './TasksStack';
// import Profile from '../screens/profile/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Home" component={BottomTabs} />
            {/* <Drawer.Screen name="Stats" component={Stats} />
            <Drawer.Screen name="Logout" component={LogoutScreen} /> */}
        </Drawer.Navigator>
    );
}
