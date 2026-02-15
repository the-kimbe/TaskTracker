import { View, Text } from 'react-native'
import React from 'react'
import "./global.css"
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack'
import AuthProvider from './src/context/AuthContext'


export default function App() {
  return (
    <SafeAreaProvider className='flex-1 items-center justify-center'>
      <AuthProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>

      </AuthProvider>
    </SafeAreaProvider>
  )
}
