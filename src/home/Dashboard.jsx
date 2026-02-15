import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusIcon, CheckCircleIcon, ClockIcon } from 'react-native-heroicons/solid'; // Optional: Install heroicons
import { AuthContext } from '../context/AuthContext';

const MOCK_TASKS = [
    { id: '1', title: 'Math Homework', category: 'School', status: 'pending' },
    { id: '2', title: 'Buy Coffee Beans', category: 'Personal', status: 'complete' },
    { id: '3', title: 'Project Presentation', category: 'School', status: 'pending' },
    { id: '4', title: 'Gym Session', category: 'Health', status: 'complete' },
];

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState('All');

    // Filter Logic
    const filteredTasks = MOCK_TASKS.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter.toLowerCase();
    });

    const FilterButton = ({ title }) => (
        <TouchableOpacity
            onPress={() => setFilter(title)}
            className={`px-6 py-2 rounded-full mr-2 ${filter === title ? 'bg-indigo-600' : 'bg-white border border-slate-200'}`}
        >
            <Text className={`font-semibold ${filter === title ? 'text-white' : 'text-slate-600'}`}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-slate-50">
            <View className="px-6 pt-4">
                {/* Welcome Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-slate-500 text-sm font-medium">Welcome back,</Text>
                        <Text className="text-2xl font-bold text-slate-900">{user.password} 👋</Text>
                    </View>
                    <View className="h-12 w-12 bg-indigo-100 rounded-full items-center justify-center">
                        <Text className="text-indigo-600 font-bold">JD</Text>
                    </View>
                </View>

                {/* Status Filter Bar */}
                <View className="flex-row mb-6">
                    <FilterButton title="All" />
                    <FilterButton title="Pending" />
                    <FilterButton title="Complete" />
                </View>

                <Text className="text-lg font-bold text-slate-800 mb-4">Your Tasks</Text>
            </View>

            {/* Task List */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between shadow-sm border border-slate-100">
                        <View className="flex-row items-center flex-1">
                            <View className={`h-10 w-10 rounded-xl items-center justify-center ${item.status === 'complete' ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                                {item.status === 'complete' ? (
                                    <Text className="text-emerald-600 text-xs">✔</Text>
                                ) : (
                                    <Text className="text-orange-600 text-xs">⏳</Text>
                                )}
                            </View>
                            <View className="ml-4">
                                <Text className={`text-base font-semibold ${item.status === 'complete' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                    {item.title}
                                </Text>
                                <Text className="text-slate-400 text-xs uppercase tracking-wider">{item.category}</Text>
                            </View>
                        </View>

                        <View className={`px-3 py-1 rounded-lg ${item.status === 'complete' ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                            <Text className={`text-[10px] font-bold uppercase ${item.status === 'complete' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                )}
            />

            {/* Floating Action Button (FAB) */}
            <TouchableOpacity
                className="absolute bottom-10 right-8 bg-indigo-600 w-16 h-16 rounded-full items-center justify-center shadow-xl"
                activeOpacity={0.8}
            >
                <Text className="text-white text-3xl font-light">+</Text>
            </TouchableOpacity>
        </View>
    );
}