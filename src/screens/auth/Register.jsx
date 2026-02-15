import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert('Please fill all fields');
      return;
    }

    try {
      await register(form);
    } catch (e) {
      alert(e.message);
    }
  };


  return (
    <View className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-10">

          <Header />

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

          {/* Footer */}
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