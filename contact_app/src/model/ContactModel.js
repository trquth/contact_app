import lodash from 'lodash';
import {DrawerLayoutAndroidBase} from 'react-native';
import Groups from '../constant/GroupsConstant';

export class ContactModel {
  get fullName() {
    let fullName = this.firstName + ' ' + this.lastName;
    return fullName.trim();
  }

  get shortFullName() {
    let value = '';
    if (this.firstName && this.firstName.length > 0) {
      value += this.firstName.charAt(0);
    }
    if (this.lastName && this.lastName.length > 0) {
      value += this.lastName.charAt(0);
    }
    return value.trim().toUpperCase();
  }

  get groupName() {
    if (this.group) {
      let data = Groups.find((item) => item.value === this.group);
      if (data) {
        return data.title;
      } else {
        return '';
      }
    }
  }

  constructor(contact) {
    this.id = lodash.get(contact, 'id', '');
    this.firstName = lodash.get(contact, 'first_name', '');
    this.lastName = lodash.get(contact, 'last_name', '');
    this.email = lodash.get(contact, 'email', '');
    this.phoneNumber = lodash.get(contact, 'phone', '');
    this.group = lodash.get(contact, 'group', null);
  }
}
