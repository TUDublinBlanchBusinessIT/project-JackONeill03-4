import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d0d0d' : '#f8f9fa' }]}>      
      <Text style={[styles.title, { color: isDarkMode ? '#f1f1f1' : '#111' }]}>Settings</Text>

      <View style={styles.optionRow}>
        <Text style={[styles.optionLabel, { color: isDarkMode ? '#f1f1f1' : '#111' }]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
});