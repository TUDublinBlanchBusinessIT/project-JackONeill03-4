import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');

  const saveUsername = () => {
    if (username.trim().length === 0) return;
    setSavedUsername(username);
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {savedUsername ? (
        <Text style={styles.current}>Current Username: {savedUsername}</Text>
      ) : (
        <Text style={styles.current}>No username set</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={saveUsername}>
        <Text style={styles.buttonText}>Save Username</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  current: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#54a0ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
