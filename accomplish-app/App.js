import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons,FontAwesome6  } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PersonalTasksScreen from "./Screens/PersonalTasksScreen";
import TeamTasksScreen from "./Screens/TeamTasksScreen";
import PublicTimeLineScreen from "./Screens/PublicTimeLineScreen";
import ProfilePageScreen from "./Screens/ProfilePageScreen";

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="PublicTimeLine" component={PublicTimeLineScreen} options={{ tabBarIcon: ({ color, size }) => <FontAwesome6 name="internet-explorer" size={24} color="black" /> }} />
      <Tab.Screen name="TeamScreen" component={TeamTasksScreen} options={{ tabBarIcon: ({ color, size }) => <FontAwesome6 name="people-group" size={24} color="black" /> }} />
      <Tab.Screen name="PersonalScreen" component={PersonalTasksScreen}  options={{ tabBarIcon: ({ color, size }) => <FontAwesome6 name="person" size={24} color="black" /> }}/>
      <Tab.Screen name="ProfilePage" component={ProfilePageScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /> }}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
