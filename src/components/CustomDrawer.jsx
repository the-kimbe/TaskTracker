import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from '@react-native-vector-icons/lucide';
import { AuthContext } from '../context/AuthContext';

export default function CustomDrawer(props) {
  const { user, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmLogout = async () => {
    setModalVisible(false);
    await logout();
  };

  const DrawerItem = ({ icon, label, tab, drawerScreen }) => (
    <TouchableOpacity
      onPress={() => {
        if (tab) {
          // Navigate to a tab inside BottomTabNavigator
          props.navigation.navigate('MainTabs', { screen: tab });
        } else if (drawerScreen) {
          // Navigate to a direct drawer screen
          props.navigation.navigate(drawerScreen);
        }
        props.navigation.closeDrawer();
      }}
      className="flex-row items-start px-6 py-4 mb-2 rounded-[2px] active:bg-slate-50"
    >
      <Icon name={icon} size={22} color="#64748b" />
      <Text className="text-base font-bold ml-4 text-slate-600">{label}</Text>
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-white mt-10">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Profile Header */}
        <View className="p-6 items-center">
          <View className="h-28 w-28 bg-white rounded-xl items-center justify-center mb-5 shadow-2xl shadow-indigo-200 border border-slate-100">
            <View className="h-36 w-36 p-4 bg-indigo-600 rounded-xl items-center justify-center">
              <Icon name="user" color="white" size={45} />
            </View>
          </View>

          <Text className="text-slate-900 text-2xl font-black tracking-tight text-center">
            {user?.name || 'Student Name'}
          </Text>
          <Text className="text-slate-400 text-xs font-bold mt-1 tracking-widest ml-3">
            {user?.email || 'student@university.edu'}
          </Text>
        </View>

        {/* Navigation Links */}
        <View className="pt-2 ">
          <Text className="text-slate-400 font-black text-[10px] uppercase tracking-[3px] ml-3 mb-4">
            Menu
          </Text>

          <DrawerItem icon="house" label="Home" tab="Dashboard" />
          <DrawerItem icon="list-todo" label="My Tasks" tab="Task" />
          <DrawerItem icon="user" label="Profile" tab="Profile" />
          <DrawerItem icon="settings" label="Settings" drawerScreen="Settings" />

        </View>
      </DrawerContentScrollView>

      <View className="p-6 border-slate-50">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center bg-red-50 p-5 rounded-full active:bg-red-100"
        >
          <View className="h-10 w-10 bg-red-100 rounded-full items-center justify-center">
            <Icon name="log-out" color="#ef4444" size={20} />
          </View>
          <Text className="text-red-500 font-black text-xs ml-4 uppercase tracking-widest">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/60 px-6"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white rounded-[40px] p-8 w-full shadow-2xl items-center">
            <View className="bg-red-50 h-20 w-20 rounded-full items-center justify-center mb-6">
              <Icon name="circle-alert" color="#ef4444" size={40} />
            </View>

            <Text className="text-2xl font-black text-slate-900 text-center mb-2">
              Logging Out?
            </Text>
            <Text className="text-slate-500 text-center mb-8 font-medium">
              Are you sure you want to log out of your account?
            </Text>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 py-4 rounded-full bg-slate-100"
              >
                <Text className="font-black text-slate-600 text-center uppercase text-[10px] tracking-widest">No, Stay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmLogout}
                className="flex-1 py-4 rounded-full bg-red-500 shadow-lg shadow-red-200"
              >
                <Text className="font-black text-white text-center uppercase text-[10px] tracking-widest">Yes, Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
