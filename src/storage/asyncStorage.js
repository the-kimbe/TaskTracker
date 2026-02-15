import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'tasktrack_user';

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('Error saving user', e);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.log('Error getting user', e);
    return null;
  }
};

// Instead of deleting, we keep the registered user
// Logout just clears the in-memory user state
export const clearUserState = async () => {
  // For now, do nothing here
};
