import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lodash from 'lodash';
import Groups from '../constant/GroupsConstant';
import GroupsHelper from '../helper/GroupsHelper';
import {ContactModel} from '../model/ContactModel';
import UpdateContactHelper from '../helper/UpdateContactHelper';

const EditContactScreen = ({route, navigation}) => {
  const [data, setData] = useState(new ContactModel(null));
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (route.params && route.params.data) {
      const contact = route.params.data;
      setData(contact);
      Groups.forEach((item) => {
        if (item.value === contact.group) {
          setSelectedGroup(item.value);
        }
      });
    }
  }, [route]);

  const updateContact = useCallback(async () => {
    try {
      const response = await UpdateContactHelper.updateContact(data);
      if (response) {
        alert('Update Contact Successfully.');
      } else {
        alert('Update Contact Fail.');
      }
    } catch (error) {
      alert('Have trouble when update contact.');
      console.log('ERROR', error);
    }
  }, [data]);

  const changeGroup = useCallback(
    (item) => {
      console.log('xxxxxx', item, data);
      if (item) {
        if (data.group === item.value) {
          data.group = null;
          setSelectedGroup(null);
        } else {
          data.group = item.value;
          setSelectedGroup(item.value);
        }
       
        setData(data);
      }
    },
    [data],
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingHorizontal: 15,
      }}>
      <View style={{marginVertical: 5}} key={0}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>First Name</Text>
        <Text>{data.firstName}</Text>
      </View>
      <View style={{marginVertical: 5}} key={1}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Last Name</Text>
        <Text>{data.lastName}</Text>
      </View>
      <View style={{marginVertical: 5}} key={3}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Phone</Text>
        <Text>{data.phoneNumber}</Text>
      </View>
      <View style={{marginVertical: 5}} key={4}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Groups</Text>
        <FlatList
          style={{marginVertical: 5}}
          data={Groups}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.value}
              style={{
                marginVertical: 5,
                marginHorizontal: 5,
                flexDirection: 'row',
              }}
              onPress={() => changeGroup(item)}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor:
                    item.value === selectedGroup ? 'blue' : 'gray',
                }}
              />
              <Text style={{marginHorizontal: 5}}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          marginVertical: 40,
          height: 40,
          backgroundColor: 'blue',
          justifyContent: 'center',
          minWidth: 100,
          maxWidth: 150,
          alignSelf: 'center',
          borderRadius: 5,
        }}
        onPress={updateContact}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditContactScreen;
