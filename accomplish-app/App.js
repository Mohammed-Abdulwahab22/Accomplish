import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome6 ,Ionicons} from '@expo/vector-icons';

import PersonalTasksScreen from "./Screens/PersonalTasksScreen";
import TeamTasksScreen from "./Screens/TeamTasksScreen";
import PublicTimeLineScreen from "./Screens/PublicTimeLineScreen";
import ProfilePageScreen from "./Screens/ProfilePageScreen";
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', top: -25, }}>
      {children}
    </View>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          style: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
          }
        }}
      >
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color={color} /> )
        }}
      />
       <Tab.Screen
          name="TeamScreen"
          component={TeamTasksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="people-group" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="PublicTimeLine"
          component={PublicTimeLineScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabBarCustomButton>
              <FontAwesome6 name="internet-explorer" size={24} color={color} />
              </TabBarCustomButton>
            )
          }}
        />
       
        <Tab.Screen
          name="PersonalScreen"
          component={PersonalTasksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="person" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfilePageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  
});
