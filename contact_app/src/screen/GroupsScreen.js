import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Groups from '../constant/GroupsConstant';
import GroupsHelper from '../helper/GroupsHelper';

const GroupsScreen = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);

  useEffect(() => {
    setupGroups();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      initData();
    }, 200);
  }, [selectedGroup]);

  const setupGroups = async () => {
    let savedLocalSelectedGroup = await GroupsHelper.getSelectedGroups();
    console.log('run run run savedLocalSelectedGroup', savedLocalSelectedGroup);
    if (savedLocalSelectedGroup && savedLocalSelectedGroup.length > 0) {
      let data = Groups.map((item) => {
        let index = savedLocalSelectedGroup.findIndex(
          (data) => data.value === item.value,
        );
        item.isSelected = index === -1;
        return item;
      });
      console.log('run run run after', data);
      setGroups([...data]);
    } else {
      initData();
    }
  };

  const initData = useCallback(async () => {
    let data = Groups.map((item) => {
      let index = selectedGroup.findIndex((data) => data.value === item.value);
      item.isSelected = index === -1;
      return item;
    });
    setGroups([...data]);
  }, [selectedGroup]);

  const selectGroup = useCallback((group) => {
    let index = selectedGroup.findIndex((item) => item.value === group.value);
    if (index > -1) {
      selectedGroup.splice(index, 1);
    } else {
      selectedGroup.push(group);
    }
    console.log('selectGroup---->', selectedGroup);
    setSelectedGroup([...selectedGroup]);
    try {
    } catch (error) {}
  }, []);

  const confirmSelectedGroup = useCallback(async () => {
    try {
      await GroupsHelper.saveSelectedGroups(selectedGroup);
    } catch (error) {}
    navigation.goBack();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 15}}>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity onPress={confirmSelectedGroup}>
            <Text style={{fontSize: 18, color: 'blue'}}>Done</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 25, marginVertical: 5}}>Groups</Text>
      </View>
      <FlatList
        style={{flex: 1}}
        data={groups}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.value}
            style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}
            onPress={() => selectGroup(item)}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: item.isSelected ? 'blue' : 'gray',
              }}
            />
            <Text style={{fontSize: 18, color: 'black', marginHorizontal: 5}}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.value.toString()}
        extraData={groups}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: 'gray'}} />
        )}
      />
    </View>
  );
};

export default GroupsScreen;
