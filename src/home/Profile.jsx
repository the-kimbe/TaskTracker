import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import Icon from '@react-native-vector-icons/lucide';
import Header from '../components/Header';

export default function Profile({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);

  const completedTasks = tasks?.filter(t => t.status === 'complete').length || 0;
  const pendingTasks = tasks?.filter(t => t.status === 'pending').length || 0;

  const MenuButton = ({ icon, title, subtitle, onPress, color = "indigo" }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-white p-5 rounded-[35px] mb-4 border border-slate-100 shadow-sm active:bg-slate-50"
    >
      <View className={`h-12 w-12 rounded-2xl items-center justify-center bg-indigo-50`}>
        <Icon name={icon} size={22} color="#4f46e5" />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-slate-900 font-bold text-base">{title}</Text>
        {subtitle && <Text className="text-slate-400 text-xs font-medium">{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} className="px-6">

        {/* Header Section - Modern Rounded Style */}
        <View className="items-center mt-12 mb-8">
          <View className="h-40 w-40 rounded-[20px] items-center justify-center shadow-2xl shadow-indigo-200 border border-slate-100">
            {/* Binigyan natin ng malaking background yung icon */}
            <View className="h-32 w-32 rounded-xl bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-400">
              <Icon name="user" size={64} color="white" strokeWidth={1.5} />
            </View>

          </View>

          <View className="items-center mt-6">
            <Text className="text-3xl font-black text-slate-900 tracking-tight">
              {user?.name || 'Juan Dela Cruz'}
            </Text>
            <Text className="text-md font-normal text-gray-500 ">
              {user?.email || 'Juan Dela Cruz'}
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View className="flex-row gap-4 mb-10">
          <View className="flex-1 bg-indigo-600 p-6 rounded-[20px] items-center shadow-xl shadow-indigo-300">
            <Text className="text-white font-black text-3xl">{completedTasks}</Text>
            <Text className="text-indigo-100 font-bold text-[10px] uppercase mt-1">Complete</Text>
          </View>
          <View className="flex-1 bg-white p-6 rounded-[20px] items-center border border-slate-100 shadow-sm">
            <Text className="text-slate-900 font-black text-3xl">{pendingTasks}</Text>
            <Text className="text-slate-400 font-bold text-[10px] uppercase mt-1">Pending</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View className="mb-10">
          <Text className="text-slate-900 font-black text-xs uppercase tracking-[3px] mb-6 ml-4">
            Account Settings
          </Text>

          <MenuButton
            icon="user"
            title="Personal Information"
            subtitle="Manage your name and school email"
            onPress={() => console.log('Edit Profile')}
          />

          <MenuButton
            icon="bell"
            title="Notifications"
            subtitle="Control your study reminders"
            onPress={() => console.log('Notifications')}
          />

          <MenuButton
            icon="lock"
            title="Privacy & Security"
            subtitle="Change password and security settings"
            onPress={() => console.log('Security')}
          />

        </View>

        <View className="items-center mb-10">
          <Text className="text-slate-300 font-bold text-[10px] uppercase tracking-[4px]">
            TaskTracker v1.0.4
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}