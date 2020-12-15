import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './ContactScreen';
import FetchContactHelper from '../helper/FetchContactHelper';
import GroupsScreen from './GroupsScreen';
const Stack = createStackNavigator();

const MainStack = () => {
  useEffect(() => {
    FetchContactHelper.initData();
  }, []);
  return (
    <NavigationContainer headerMode="none">
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name={'ContactScreen'} component={ContactScreen} />
        <Stack.Screen name={'GroupsScreen'} component={GroupsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
