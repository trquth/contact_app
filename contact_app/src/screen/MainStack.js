import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './ContactScreen';
import FetchContactHelper from '../helper/FetchContactHelper';
import GroupsScreen from './GroupsScreen';
import EditContactScreen from './EditContactScreen';
const Stack = createStackNavigator();

const MainStack = () => {
  useEffect(() => {
    FetchContactHelper.initData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name={'ContactScreen'}
          component={ContactScreen}
          options={{headerMode: 'none'}}
        />
        <Stack.Screen name={'GroupsScreen'} component={GroupsScreen} />
        <Stack.Screen
          options={{title: 'Contact Detail'}}
          name={'EditContactScreen'}
          component={EditContactScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
