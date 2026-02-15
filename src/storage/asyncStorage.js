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
  }
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
