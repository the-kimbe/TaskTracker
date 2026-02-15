import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import Icon from '@react-native-vector-icons/lucide';

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return Toast.show({ type: 'error', text1: 'Please fill all fields' });
    }
    try {
      await login(form.email, form.password);
      Toast.show({ type: 'success', text1: 'Logged in successfully!' });
    } catch (e) {
      Toast.show({ type: 'error', text1: e.message });
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">

          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Landing')}
            className="mb-4 flex-row items-center"
          >
            <Icon name="arrow-left" size={24} color="#4f46e5" />
            <Text className="text-indigo-600 font-bold ml-2">Back</Text>
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-10 items-center">
            <View className="h-16 w-16 bg-indigo-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Icon name="log-in" size={32} color="white" />
            </View>
            <Text className="text-3xl font-extrabold text-slate-900">Welcome Back</Text>
            <Text className="text-slate-500 mt-2 text-center text-base">
              Ready to crush your <Text className="text-indigo-600 font-semibold">Pending</Text> tasks?
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Email Input */}
            <View className="mb-3">
              <Text className="text-slate-700 font-medium mb-2 ml-1">Email</Text>
              <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 shadow-sm">
                <Icon name="mail" size={20} color="#94a3b8" />
                <TextInput
                  className="flex-1 p-4 text-slate-900"
                  placeholder="student@gmail.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-slate-700 font-medium mb-2 ml-1">Password</Text>
              <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 shadow-sm">
                <Icon name="lock" size={20} color="#94a3b8" />
                <TextInput
                  className="flex-1 p-4 text-slate-900"
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  value={form.password}
                  onChangeText={(v) => setForm({ ...form, password: v })}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-indigo-600 py-4 rounded-2xl mt-4 shadow-md active:bg-indigo-700"
            >
              <Text className="text-white text-center font-bold text-lg">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-10">
            <Text className="text-slate-500 text-base">New to TaskTracker? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-indigo-600 font-bold text-base">Register</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
