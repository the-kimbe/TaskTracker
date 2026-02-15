import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from '../navigation/BottomTabs'
import CustomDrawer from '../components/CustomDrawer'
import Settings from '../screens/settings/Settings'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="MainTabs" component={BottomTabs} />
              <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    );
}
