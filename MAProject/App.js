import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Only require Pedometer on native
let Pedometer;
if (Platform.OS !== 'web') {
  Pedometer = require('expo-sensors').Pedometer;
}

import SettingsScreen from './SettingsScreen'; // make sure this path is correct
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ExerciseScreen from './ExerciseScreen';

function HomeScreen({ navigation }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    let subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync()
      .then(result => setIsPedometerAvailable(String(result)))
      .catch(error => setIsPedometerAvailable('Could not get isAvailable: ' + error));

    return () => subscription && subscription.remove();
  }, []);

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
      <View style={[styles.widget, { backgroundColor: colors.card }]}>
        <Text style={[styles.widgetTitle, { color: colors.text }]}>Today's Steps</Text>
        <Text style={[styles.stepCount, { color: colors.text }]}>{stepCount}</Text>
        <Text style={{ color: colors.subtle }}>Pedometer Available: {isPedometerAvailable}</Text>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Exercise" component={ExerciseScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const lightColors = {
  background: '#f8f9fa',
  text: '#111',
  card: '#fff',
  subtle: '#555'
};

const darkColors = {
  background: '#0d0d0d',
  text: '#f1f1f1',
  card: '#1a1a1a',
  subtle: '#aaa'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  widget: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 5,
  },
});
