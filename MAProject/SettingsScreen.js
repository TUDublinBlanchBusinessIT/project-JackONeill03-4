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
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 35,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 18,
    paddingHorizontal: 14,

    backgroundColor: '#fff',
    borderRadius: 16,

    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  optionLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
});
