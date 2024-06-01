import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import * as SecureStore from 'expo-secure-store';

const AuthScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

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

      // await SecureStore.setItemAsync('userToken', data.token);

    // navigation.replace('Main');

    console.log(data);
    
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      />
      <Button title={isRegister ? 'Register' : 'Login'} onPress={handleAuth} />
      <Button
        title={isRegister ? 'Switch to Login' : 'Switch to Register'}
        onPress={() => setIsRegister(!isRegister)}
      />
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
  });

export default AuthScreen;
