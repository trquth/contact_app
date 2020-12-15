import AsyncStorage from '@react-native-async-storage/async-storage';

class GroupsHelper {
  static async saveSelectedGroups(groups) {
    try {
      if (groups) {
        const data = JSON.stringify(groups);
        await AsyncStorage.setItem('@groups', data);
      }
    } catch (e) {
      console.log('GroupsHelper saveSelectedGroups error', e);
    }
  }

  static async getSelectedGroups() {
    try {
      const value = await AsyncStorage.getItem('@groups');
      if (value) {
        return JSON.parse(value);
      } else {
        return [];
      }
    } catch (e) {
      console.log('GroupsHelper getGroups error', e);
    }
    return [];
  }
}

export default GroupsHelper;
