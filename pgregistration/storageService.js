import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@property_data';

const saveData = async (data) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const currentData = existingData ? JSON.parse(existingData) : {};
    const newData = { ...currentData, ...data };
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save data:', e);
  }
};

const loadData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { floors: [], rooms: [] };
  } catch (e) {
    console.error('Failed to load data:', e);
    return { floors: [], rooms: [] };
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear data:', e);
  }
};

export default {
  saveData,
  loadData,
  clearData
};
