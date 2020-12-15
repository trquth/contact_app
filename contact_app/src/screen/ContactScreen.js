import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, SectionList} from 'react-native';
import SearchBar from 'react-native-search-bar';
import FetchContactHelper from '../helper/FetchContactHelper';
import {useIsFocused} from '@react-navigation/native';

const ContactScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const contactsData = useRef([]);
  const [search, setSearch] = useState('');
  const search1 = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (search) {
        searchContact();
      } else {
        initData();
      }
    }
  }, [search, navigation, isFocused]);

  const initData = async () => {
    const contactInPhone = await FetchContactHelper.getContacts();
    if (contactInPhone) {
      contactsData.current = contactInPhone;
      setData(FetchContactHelper.groupAlphabetContact(contactInPhone));
    }
  };

  const searchContact = useCallback(() => {
    console.log('searchContact---->', search);
    const contactInPhone = contactsData.current;
    if (contactInPhone) {
      const filterData = FetchContactHelper.filterContacts(
        search,
        contactInPhone,
      );
      console.log('FetchContactHelper.filterContacts filterData', filterData);
      if (filterData) {
        const groupedData = FetchContactHelper.groupAlphabetContact(filterData);
        setData(groupedData);
      } else {
        setData(contactInPhone);
      }
    } else {
      setData(contactInPhone);
    }
  }, [search]);

  const goGroup = useCallback(() => {
    navigation.push('GroupsScreen');
  }, []);

  const goToEditContactScreen = useCallback((data) => {
    navigation.navigate('EditContactScreen', {data: data});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 15}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={goGroup}>
            <Text style={{fontSize: 18, color: 'blue'}}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: 'blue'}}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 25, marginVertical: 5}}>CONTACT</Text>
        <SearchBar
          ref={search1}
          textColor="black"
          placeholder="Search Contact Name"
          onChangeText={setSearch}
          onSearchButtonPress={() => search1.current.unFocus}
          //onCancelButtonPress={() => search1.current.unFocus}
        />
      </View>
      <SectionList
        style={{flex: 1}}
        sections={data}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              padding: 10,
              backgroundColor: 'gray',
              color: 'white',
              fontSize: 16,
            }}>
            {title}
          </Text>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 40,
              flexDirection: 'row',
              marginVertical: 5,
              marginHorizontal: 10,
              alignItems: 'center',
            }}
            key={item.id}
            onPress={() => goToEditContactScreen(item)}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 18}}>
                {item.shortFullName}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 20, marginHorizontal: 5}}>
                {item.fullName}
              </Text>
              {item.groupName && <Text>Group: {item.groupName}</Text>}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: 'gray'}} />
        )}
      />
    </View>
  );
};

export default ContactScreen;
