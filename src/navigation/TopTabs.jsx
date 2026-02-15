import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import Header from '../components/Header';

export default function TopTabs() {
  const { tasks, loading } = useContext(TaskContext);
  const [activeTab, setActiveTab] = useState('All');

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  // Filter tasks based on tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'All') return true;
    return task.status === activeTab.toLowerCase();
  });

  const renderTask = ({ item }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between shadow-sm border border-slate-100">
      <View className="flex-row items-center flex-1">
        <View className={`h-10 w-10 rounded-xl items-center justify-center ${item.status === 'complete' ? 'bg-emerald-100' : 'bg-orange-100'}`}>
          <Text className={`text-[12px] ${item.status === 'complete' ? 'text-emerald-600' : 'text-orange-600'}`}>
            {item.status === 'complete' ? '✔' : '⏳'}
          </Text>
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
  );

  return (
    <View className="flex-1 bg-slate-50">
      <Header />

      {/* Tabs */}
      <View className="flex-row justify-around bg-white mt-4 shadow-sm py-2">
        {['All', 'Pending', 'Complete'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-full ${activeTab === tab ? 'bg-indigo-600' : 'bg-white'}`}
          >
            <Text className={`font-bold ${activeTab === tab ? 'text-white' : 'text-slate-700'}`}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-slate-400 text-lg">No tasks found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
          renderItem={renderTask}
        />
      )}
    </View>
  );
}
