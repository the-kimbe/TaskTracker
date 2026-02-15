import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import Toast from 'react-native-toast-message';

export default function AddTaskModal({ visible, onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('pending');

    const handleAdd = () => {
        if (!title.trim() || !category.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Please fill all fields',
            });
            return; 
        }

        const newTask = { 
            id: Date.now().toString(), 
            title, 
            category, 
            status 
        };

        onAddTask(newTask);

        // Show toast after adding task
        Toast.show({
            type: 'success',
            text1: 'Task created!',
            text2: `${title} has been added successfully.`,
        });

        // Reset fields
        setTitle('');
        setCategory('');
        setStatus('pending');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/60">
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View className="bg-white p-8 rounded-t-[40px] shadow-2xl">
                        <View className="w-12 h-1.5 bg-slate-200 rounded-full self-center mb-6" />

                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-2xl font-extrabold text-slate-900">New Task</Text>
                            <TouchableOpacity onPress={onClose} className="bg-slate-100 p-2 rounded-full">
                                <Icon name="x" size={20} color="#64748b" />
                            </TouchableOpacity>
                        </View>

                        {/* Title Input */}
                        <View className="mb-5">
                            <Text className="text-slate-700 font-bold mb-2 ml-1">What needs to be done?</Text>
                            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                                <Icon name="pen-line" size={18} color="#94a3b8" />
                                <TextInput
                                    className="flex-1 p-4 text-slate-900 font-medium"
                                    placeholder="e.g. Study for Finals"
                                    placeholderTextColor="#cbd5e1"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        {/* Category Input */}
                        <View className="mb-6">
                            <Text className="text-slate-700 font-bold mb-2 ml-1">Category</Text>
                            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">
                                <Icon name="tag" size={18} color="#94a3b8" />
                                <TextInput
                                    className="flex-1 p-4 text-slate-900 font-medium"
                                    placeholder="e.g. School, Personal, Gym"
                                    placeholderTextColor="#cbd5e1"
                                    value={category}
                                    onChangeText={setCategory}
                                />
                            </View>
                        </View>

                        {/* Status Selector */}
                        <Text className="text-slate-700 font-bold mb-3 ml-1">Initial Status</Text>
                        <View className="flex-row space-x-3 mb-8 gap-3">
                            <TouchableOpacity
                                onPress={() => setStatus('pending')}
                                className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl border-2 ${status === 'pending' ? 'bg-orange-50 border-orange-500' : 'bg-white border-slate-100'}`}
                            >
                                <Icon name="clock" size={18} color={status === 'pending' ? '#f97316' : '#94a3b8'} />
                                <Text className={`ml-2 font-bold ${status === 'pending' ? 'text-orange-600' : 'text-slate-400'}`}>Pending</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setStatus('complete')}
                                className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl border-2 ${status === 'complete' ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100'}`}
                            >
                                <Icon name="circle-check" size={18} color={status === 'complete' ? '#10b981' : '#94a3b8'} />
                                <Text className={`ml-2 font-bold ${status === 'complete' ? 'text-emerald-600' : 'text-slate-400'}`}>Complete</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Action Button */}
                        <TouchableOpacity 
                            onPress={handleAdd} 
                            className="bg-indigo-600 py-5 rounded-2xl shadow-lg shadow-indigo-300 items-center"
                            activeOpacity={0.9}
                        >
                            <Text className="text-white font-extrabold text-lg">Create Task</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
