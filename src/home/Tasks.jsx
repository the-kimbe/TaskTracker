import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import Header from '../components/Header';
import Icon from '@react-native-vector-icons/lucide';
import EditTaskModal from '../components/EditTaskModal'


export default function Tasks({ navigation }) {
    const { tasks, loading, updateTask, deleteTask  } = useContext(TaskContext);
    const [activeTab, setActiveTab] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
     const [modalVisible, setModalVisible] = useState(false);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    const filteredTasks = tasks.filter(task => {
        if (activeTab === 'All') return true;
        return task.status === activeTab.toLowerCase();
    });

    const handleOpenEditModal = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
        setModalVisible(false);
    };

    const renderTask = ({ item }) => (
        <View className="bg-white p-3 rounded-[20px] mb-4 shadow-md border border-slate-100 flex-col">

            {/* Top Row: Status Icon and Edit Button */}
            <View className="flex-row justify-between items-center mb-2">
                {/* Left side: Icon based on status */}
                <View className={`h-12 w-12 rounded-2xl items-center justify-center ${item.status === 'complete' ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                    {item.status === 'complete' ? (
                        <Icon name="circle-check" size={24} color="#10b981" />
                    ) : (
                        <Icon name="hourglass" size={24} color="#f97316" />
                    )}
                </View>

                <TouchableOpacity className="h-10 w-10 bg-slate-50 rounded-full items-center justify-center border border-slate-100"
                  onPress={() => handleOpenEditModal(item)}>
                    <Icon name="pencil" size={16} color="#64748b" />
                </TouchableOpacity>
            </View>

            <View className="mb-2">
                <Text
                    numberOfLines={2}
                    className={`text-2xl font-bold mb-1 tracking-tight ${item.status === 'complete' ? 'text-slate-400' : 'text-slate-900'}`}
                >
                    {item.title}
                </Text>
                <Text className="text-slate-400 text-sm font-medium">
                    {item.category}
                </Text>
            </View>

            {/* Bottom Section: Status Button (Full Width) */}
            <TouchableOpacity
                activeOpacity={0.8}
                className={`w-full py-2 rounded-3xl items-center justify-center ${item.status === 'complete' ? 'bg-white' : 'bg-white'
                    }`}
            >
                <Text className={`font-bold text-base capitalize ${item.status === 'complete' ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                    {item.status}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-slate-50">
            <Header navigation={navigation} />

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
             <EditTaskModal
                visible={modalVisible}
                onClose={handleCloseModal}
                task={selectedTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
            />
        </View>
    );
}
