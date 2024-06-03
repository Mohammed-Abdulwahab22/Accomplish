import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';

const AuthScreen = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // const handleAuth = async () => {
  //   try {
  //     const endpoint = isRegister ? 'register' : 'login';
  //     const response = await fetch(`http://10.0.2.2:3000/api/${endpoint}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Something went wrong!');
  //     }

  //     await AsyncStorage.setItem('userToken', data.token);

  //     // navigation.replace('Main');

  //     console.log(data);

  //   } catch (error) {
  //     console.error('Error:', error);
  //     Alert.alert('Error', error.message);
  //   }
  // };

  const handleAuth = async () => {
    try {
      const endpoint = isRegister ? 'register' : 'login';
      const response = await fetch(`http://10.0.2.2:3000/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
  
      if (!data) {
        throw new Error('Token not found in response data');
      }
        const AuthToken = String(data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data));
        await AsyncStorage.setItem('userToken', AuthToken);
      setIsLoggedIn(true); 

  
      // navigation.replace('Main');
  
      console.log(data);
  
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.appIcon}>
        <Image source={require('../assets/icon1.png')} style={styles.appIconImage} />

      </View>
      <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /><View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={handleAuth}
        >
          <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsRegister(!isRegister)}>
          <Text style={{ color: '#fff' , fontWeight: 'bold', fontSize: 16 ,marginLeft: 10, top: 5}}>
            {isRegister ? 'You already have an account?' : 'You dont have an account?'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#262450',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#ffffff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    color: '#262450',
  },
  appIconImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 50,
  },

  appIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
