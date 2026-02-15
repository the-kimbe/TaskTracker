import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import Icon from '@react-native-vector-icons/lucide';
import Toast from 'react-native-toast-message'; // import Toast

export default function EditTaskModal({ visible, onClose, task, onUpdate, onDelete }) {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  if (!task) return null;

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
    Toast.show({
      type: 'error',
      text1: 'Task Deleted',
      text2: 'Your task has been removed successfully.',
    });
  };

  const handleUpdate = () => {
    onUpdate(task.id, { status });
    onClose();
    Toast.show({
      type: 'success',
      text1: 'Task Updated',
      text2: 'Your task status has been updated successfully.',
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/60 justify-end" onPress={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Pressable className="bg-white rounded-t-[50px] p-8 pb-12 shadow-2xl" onPress={(e) => e.stopPropagation()}>
            {/* Grab Indicator */}
            <View className="w-12 h-1.5 bg-slate-200 rounded-full self-center mb-8" />

            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <View>
                <Text className="text-3xl font-black text-slate-900 tracking-tight">Edit Task</Text>
                <Text className="text-slate-400 font-medium italic">Update your progress</Text>
              </View>
              <TouchableOpacity onPress={onClose} className="bg-slate-100 p-3 rounded-full">
                <Icon name="x" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Task Info */}
            <View className="bg-slate-50 p-6 rounded-[35px] mb-8 border border-slate-100">
              <Text className="text-[10px] font-black text-indigo-500 uppercase tracking-[2px] mb-2">Current Title</Text>
              <Text className="text-lg font-bold text-slate-700 leading-6">{task.title}</Text>
            </View>

            {/* Status Selector */}
            <Text className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4 ml-2">Select Status</Text>
            <View className="flex-row gap-3 mb-10">
              <TouchableOpacity
                onPress={() => setStatus('pending')}
                className={`flex-1 flex-row items-center justify-center py-5 rounded-full border-2 ${status === 'pending' ? 'bg-orange-50 border-orange-500' : 'bg-white border-slate-100'}`}
              >
                <Icon name="clock" size={18} color={status === 'pending' ? '#f97316' : '#94a3b8'} />
                <Text className={`ml-2 font-black uppercase text-[10px] ${status === 'pending' ? 'text-orange-600' : 'text-slate-400'}`}>Pending</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setStatus('complete')}
                className={`flex-1 flex-row items-center justify-center py-5 rounded-full border-2 ${status === 'complete' ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100'}`}
              >
                <Icon name="circle-check" size={18} color={status === 'complete' ? '#10b981' : '#94a3b8'} />
                <Text className={`ml-2 font-black uppercase text-[10px] ${status === 'complete' ? 'text-emerald-600' : 'text-slate-400'}`}>Complete</Text>
              </TouchableOpacity>
            </View>

            {/* Actions */}
            <View className="flex-row gap-3">
              <TouchableOpacity onPress={handleDelete} className="flex-1 flex-row h-16 items-center justify-center rounded-full bg-red-50 active:bg-red-100">
                <Icon name="trash-2" size={18} color="#ef4444" />
                <Text className="text-red-500 font-black ml-2 uppercase text-[10px] tracking-widest">Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleUpdate} className="flex-1 h-16 items-center justify-center rounded-full bg-indigo-600 shadow-lg shadow-indigo-200 active:bg-indigo-700">
                <Text className="text-white font-black uppercase text-[10px] tracking-widest">Save Changes</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
