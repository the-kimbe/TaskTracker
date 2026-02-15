import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/lucide';

const { width } = Dimensions.get('window');

export default function LandingPage({ navigation }) {
  return (
    <View className="flex-1 bg-white">
      {/* Decorative Background Circles */}
      <View className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full" />
      <View className="absolute top-40 -left-10 w-32 h-32 bg-orange-50 rounded-full" />

      <View className="flex-1 px-8 justify-between py-12">
        
        {/* Top Section: Branding */}
        <View className="items-center mt-10">
          <View className="bg-indigo-600 p-4 rounded-[30px] shadow-xl shadow-indigo-400 mb-6">
            <Icon name="layout-list" size={50} color="white" />
          </View>
          <Text className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Task<Text className="text-indigo-600">Tracker</Text>
          </Text>
          <View className="h-1 w-12 bg-orange-400 mt-2 rounded-full" />
        </View>

        {/* Middle Section: Illustration/Text */}
        <View>
          <Text className="text-3xl font-bold text-slate-800 leading-tight">
            Manage your studies{"\n"}
            <Text className="text-indigo-600 underline">without the stress.</Text>
          </Text>
          <Text className="text-slate-500 mt-4 text-lg leading-6">
            The ultimate student planner to track your tasks from 
            <Text className="text-orange-500 font-bold"> Pending</Text> to 
            <Text className="text-emerald-500 font-bold"> Complete</Text>.
          </Text>
          
          {/* Feature List */}
          <View className="mt-8 space-y-3">
            <View className="flex-row items-center">
              <View className="bg-emerald-100 p-1 rounded-full">
                <Icon name="check" size={16} color="#10b981" />
              </View>
              <Text className="ml-3 text-slate-600 font-medium">Smart Academic Planner</Text>
            </View>
            <View className="flex-row items-center">
              <View className="bg-emerald-100 p-1 rounded-full">
                <Icon name="check" size={16} color="#10b981" />
              </View>
              <Text className="ml-3 text-slate-600 font-medium">Status-based Tracking</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section: Buttons */}
        <View className="space-y-4 gap-3">
          <TouchableOpacity 
            onPress={() => navigation.navigate('Register')}
            className="bg-indigo-600 py-5 rounded-2xl flex-row justify-center items-center shadow-lg shadow-indigo-300"
            activeOpacity={0.8}
          >
            <Text className="text-white font-extrabold text-lg mr-2">Get Started</Text>
            <Icon name="arrow-right" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            className="bg-white border-2 border-slate-100 py-5 rounded-2xl items-center"
            activeOpacity={0.7}
          >
            <Text className="text-slate-700 font-bold text-lg">I already have an account</Text>
          </TouchableOpacity>

          <Text className="text-center text-slate-400 text-xs mt-4">
            By continuing, you agree to organize your life. 
          </Text>
        </View>

      </View>
    </View>
  );
}