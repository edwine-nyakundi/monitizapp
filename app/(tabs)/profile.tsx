import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert("Login Successful!");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Registration Successful!");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#EFEFEF', dark: '#333333' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>

      <ThemedText>Login or register below:</ThemedText>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#007bff" />
          <Button title="Register" onPress={handleRegister} color="#007bff" />
        </View>
      </ThemedView>

      <Collapsible title="Forgot Password">
        <ThemedText>
          Forgot your password? Reset it here.
        </ThemedText>
        <ExternalLink href="https://example.com/forgot-password">
          <ThemedText type="link">Reset Password</ThemedText>
        </ExternalLink>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 16, // Reduced padding
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 5,
  },
});
