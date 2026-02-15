import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import AddTaskModal from '../components/AddTaskModal';
import Toast from 'react-native-toast-message'; // optional toast library
import Icon from '@react-native-vector-icons/lucide';


export default function Dashboard({ navigation }) {
    const { tasks, addTask, loading } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = React.useState(false);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50">
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const completedTasks = tasks.filter(t => t.status === 'complete').length;

    const handleAddTask = (task) => {
        addTask(task);
        setModalVisible(false);
        Toast.show({
            type: 'success',
            text1: 'Task Created!',
            text2: `"${task.title}" has been added.`,
        });
    };

    return (
        <View className="flex-1 bg-slate-50">
            <Header navigation={navigation} />

            {/* Stats */}
            <View className="px-6 pt-4">
                <Text className="text-slate-500 text-sm font-medium">Welcome back,</Text>
                <Text className="text-2xl font-bold text-slate-900 mb-4">{user.name}</Text>

                <View className="flex-row justify-between mb-6">
                    <View className="bg-white p-4 rounded-2xl shadow-sm flex-1 mr-2 items-center">
                        <Text className="text-slate-400 text-sm">Total Tasks</Text>
                        <Text className="text-xl font-bold text-slate-900">{totalTasks}</Text>
                    </View>
                    <View className="bg-white p-4 rounded-2xl shadow-sm flex-1 mx-1 items-center">
                        <Text className="text-orange-500 text-sm">Pending</Text>
                        <Text className="text-xl font-bold text-orange-600">{pendingTasks}</Text>
                    </View>
                    <View className="bg-white p-4 rounded-2xl shadow-sm flex-1 ml-2 items-center">
                        <Text className="text-emerald-500 text-sm">Completed</Text>
                        <Text className="text-xl font-bold text-emerald-600">{completedTasks}</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-slate-800">Your Tasks</Text>

                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => navigation.navigate('Task')}
                    >
                        <Text className="text-indigo-600 font-medium mr-1">View all</Text>
                        <Icon name="arrow-right" size={18} color="#4f46e5" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Task List */}
            {tasks.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-slate-400 text-lg">No tasks found</Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                    renderItem={({ item }) => (
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
                    )}
                />
            )}

            <TouchableOpacity
                className="absolute bottom-10 right-8 bg-indigo-600 w-16 h-16 rounded-full items-center justify-center shadow-xl"
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white text-3xl font-light">+</Text>
            </TouchableOpacity>

            <AddTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddTask={handleAddTask}
            />
        </View>
    );
}
