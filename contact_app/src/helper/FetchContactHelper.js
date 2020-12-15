import lodash from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContactModel} from '../model/ContactModel';
import GroupsHelper from './GroupsHelper';

class FetchContactHelper {
  static async initData() {
    try {
      const value = await AsyncStorage.getItem('@contact');
      if (value === null) {
        let dummyData = require('../resource/MOCK_DATA.json');
        if (dummyData) {
          const contactData = JSON.stringify(dummyData);
          await AsyncStorage.setItem('@contact', contactData);
        }
      }
    } catch (e) {
      console.log('FetchContactHelper initData error', e);
    }
  }

  static async getContacts() {
    let data = [];
    try {
      const value = await AsyncStorage.getItem('@contact');
      const groups = await GroupsHelper.getSelectedGroups();
      if (value === null) {
        let dummyData = require('../resource/MOCK_DATA.json');
        if (dummyData && dummyData.length > 0) {
          data = dummyData;
        }
      } else {
        data = JSON.parse(value);
      }
      let parseData = data.map((item) => {
        return new ContactModel(item);
      });
      if (groups.length === 0) {
        return parseData;
      } else {
        let filteredData = [];
        groups.forEach((item) => {
          parseData.forEach((data) => {
            if (!lodash.isNil(data.group)) {
              if (item.value === data.group) {
                filteredData.push(data);
              }
            }
          });
        });
        console.log('xxxx', filteredData);
        return parseData;
      }
    } catch (e) {
      console.log('FetchContactHelper getContacts error', e);
    }
    return data;
  }

  static groupAlphabetContact(contacts) {
    try {
      if (!lodash.isArray(contacts)) {
        return [];
      }
      let data = contacts
        .sort((a, b) => a.shortFullName.localeCompare(b.shortFullName))
        .reduce((r, e) => {
          let group = e.shortFullName[0];
          if (!r[group]) r[group] = {title: group, data: [e]};
          else r[group].data.push(e);
          return r;
        }, {});
      return Object.values(data);
    } catch (e) {
      console.log('FetchContactHelper groupAlphabetContact error', e);
    }
    return [];
  }

  static filterContacts(searchText, contacts) {
    try {
      if (!lodash.isArray(contacts)) {
        return [];
      }
      if (lodash.isNil(searchText) || lodash.isEmpty(searchText)) {
        return contacts;
      }
      const text = searchText.trim().toUpperCase();
      let data = contacts.filter((item) => {
        return item.fullName.toUpperCase().includes(text);
      });
      return data;
    } catch (e) {
      console.log('FetchContactHelper groupAlphabetContact error', e);
    }
    return [];
  }
}

export default FetchContactHelper;
