import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

export default function Register({ navigation }) {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return Toast.show({
        type: 'error',
        text1: 'Please fill all fields',
      });
    }

    try {
      await register(form);
      Toast.show({
        type: 'success',
        text1: 'Account created successfully!',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  };


  return (
    <View className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">

          <View className="mb-10 items-center">
            <View className="h-16 w-16 bg-indigo-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-3xl font-bold">TT</Text>
            </View>
            <Text className="text-3xl font-extrabold text-slate-900">TaskTracker</Text>
            <Text className="text-slate-500 mt-2 text-center">
              Stay organized. Track your progress from {"\n"}
              <Text className="text-orange-500 font-semibold">Pending</Text> to <Text className="text-emerald-500 font-semibold">Complete</Text>.
            </Text>
          </View>

          <View className="space-y-4">
            <View className='mb-4'>
              <Text className="text-slate-700 font-medium mb-2 ml-1">Full Name</Text>
              <TextInput
                className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-900 shadow-sm focus:border-indigo-500"
                placeholder="Juan Dela Cruz"
                placeholderTextColor="#94a3b8"
                value={form.name}
                onChangeText={(v) => setForm({ ...form, name: v })}
              />
            </View>

            <View className='mb-4'>
              <Text className="text-slate-700 font-medium mb-2 ml-1">Email</Text>
              <TextInput
                className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-900 shadow-sm focus:border-indigo-500"
                placeholder="student@gmail.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
              />
            </View>

            <View>
              <Text className="text-slate-700 font-medium mb-2 ml-1">Password</Text>
              <TextInput
                className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-900 shadow-sm focus:border-indigo-500"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={form.password}
                onChangeText={(v) => setForm({ ...form, password: v })}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-indigo-600 py-4 rounded-2xl mt-4 shadow-md active:bg-indigo-700"
            >
              <Text className="text-white text-center font-bold text-lg">Create Account</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-500">Already a student user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-indigo-600 font-bold">Login</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}