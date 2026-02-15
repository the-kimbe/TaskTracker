import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch,  } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import Header from '../../components/Header';

export default function Settings({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const SettingItem = ({ icon, title, subtitle, type = "link", value, onValueChange }) => (
    <View className="flex-row items-center bg-white p-5 rounded-[30px] mb-3 border border-slate-100 shadow-sm">
      <View className="h-10 w-10 rounded-2xl items-center justify-center bg-indigo-50">
        <Icon name={icon} size={20} color="#4f46e5" />
      </View>
      
      <View className="flex-1 ml-4">
        <Text className="text-slate-900 font-bold text-base">{title}</Text>
        {subtitle && <Text className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">{subtitle}</Text>}
      </View>

      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#e2e8f0", true: "#818cf8" }}
          thumbColor={value ? "#4f46e5" : "#f4f4f5"}
        />
      ) : (
        <TouchableOpacity>
          <Icon name="chevron-right" size={18} color="#cbd5e1" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
        <Header navigation={navigation}/>
      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        
        {/* Header Section */}
        <View className="mt-4 mb-8">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Settings</Text>
          <Text className="text-slate-400 font-medium mt-1">Customize your planner experience</Text>
        </View>

        {/* Preferences Section */}
        <View className="mb-8">
          <Text className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] ml-4 mb-4">
            Preferences
          </Text>
          
          <SettingItem 
            icon="moon" 
            title="Dark Mode" 
            subtitle="Switch to dark theme" 
            type="switch"
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
          
          <SettingItem 
            icon="bell" 
            title="Push Notifications" 
            subtitle="Task reminders & updates" 
            type="switch"
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        {/* App Settings Section */}
        <View className="mb-8">
          <Text className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] ml-4 mb-4">
            App Settings
          </Text>
          
          <SettingItem 
            icon="languages" 
            title="Language" 
            subtitle="English (US)" 
          />
          
          <SettingItem 
            icon="database" 
            title="Backup Data" 
            subtitle="Cloud sync your tasks" 
          />
        </View>

        {/* Support Section */}
        <View className="mb-10">
          <Text className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] ml-4 mb-4">
            Support
          </Text>
          
          <SettingItem 
            icon="help-circle" 
            title="Help Center" 
          />
          
          <SettingItem 
            icon="info" 
            title="About TaskTracker" 
          />
        </View>

        {/* Danger Zone */}
        <TouchableOpacity 
          className="flex-row items-center justify-center bg-red-50 p-5 rounded-full border border-red-100 mb-10"
        >
          <Icon name="trash-2" size={18} color="#ef4444" />
          <Text className="text-red-500 font-black ml-2 uppercase text-[10px] tracking-widest">
            Clear All Task Data
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}