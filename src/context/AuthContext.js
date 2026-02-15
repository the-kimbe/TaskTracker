import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@currentUser');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.log('Load user error:', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (form) => {
    if (!form.name || !form.email || !form.password) {
      throw new Error('Please fill all fields');
    }

    if (form.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const existingUsers = await AsyncStorage.getItem('@users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    // ✅ prevent duplicate email
    const emailExists = users.find((u) => u.email === form.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    users.push(newUser);

    await AsyncStorage.setItem('@users', JSON.stringify(users));
    await AsyncStorage.setItem('@currentUser', JSON.stringify(newUser));

    setUser(newUser);
  };

  const login = async (email, password) => {
    const storedUsers = await AsyncStorage.getItem('@users');

    if (!storedUsers) {
      throw new Error('No users found. Please register first.');
    }

    const users = JSON.parse(storedUsers);

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    await AsyncStorage.setItem('@currentUser', JSON.stringify(foundUser));

    setUser(foundUser);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@currentUser');
      setUser(null);
    } catch (e) {
      console.log('Logout error:', e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
