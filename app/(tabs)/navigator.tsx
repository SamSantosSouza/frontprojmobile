import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './index'; // Ajuste o caminho conforme necessário

const Drawer = createDrawerNavigator();
 
export default function AppNavigator() {
  return (
   
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    
  );
}