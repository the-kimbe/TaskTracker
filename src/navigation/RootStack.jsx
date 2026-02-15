import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import DrawerNavigator from './DrawerNavigator'; // your main app
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show splash/loading while checking AsyncStorage
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is logged in → show main app
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        // User not logged in → show auth screens
        <>
          {/* <Stack.Screen name="Login" component={Login} /> */}
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
