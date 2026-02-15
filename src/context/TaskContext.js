import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔑 Dynamic storage key per user
  const storageKey = user ? `@tasks_${user.email}` : null;

  // ✅ Load tasks kapag nag login / change user
  useEffect(() => {

    const loadTasks = async () => {
      if (!storageKey) {
        setTasks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const storedTasks = await AsyncStorage.getItem(storageKey);

        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks([]);
        }

      } catch (e) {
        console.error('Failed to load tasks:', e);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

  }, [storageKey]); // 🔥 reload kapag nagpalit user



  // ✅ Save helper
  const saveTasks = async (newTasks) => {
    if (!storageKey) return;

    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newTasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  };


  // ✅ ADD TASK
  const addTask = (task) => {
    const updated = [task, ...tasks];
    setTasks(updated);
    saveTasks(updated);
  };


  // ✅ UPDATE TASK
  const updateTask = (id, updatedTask) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, ...updatedTask } : t
    );

    setTasks(updated);
    saveTasks(updated);
  };


  // ✅ DELETE TASK
  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);

    setTasks(updated);
    saveTasks(updated);
  };


  // ✅ CLEAR TASKS (per user lang!)
  const clearTasks = async () => {
    if (!storageKey) return;

    setTasks([]);
    await AsyncStorage.removeItem(storageKey);
  };


  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        clearTasks,
        loading
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
