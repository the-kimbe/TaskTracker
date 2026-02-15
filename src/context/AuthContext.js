import React, { createContext, useState, useEffect } from 'react';
import { saveUser, getUser, removeUser } from '../storage/asyncStorage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Persistent Login
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  // ✅ REGISTER
  const register = async (form) => {
    const newUser = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    await saveUser(newUser); // ✅ use wrapper
    setUser(newUser);
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    const storedUser = await getUser();

    if (!storedUser) {
      throw new Error('No user found');
    }

    if (storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    await removeUser();
    setUser(null);
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
