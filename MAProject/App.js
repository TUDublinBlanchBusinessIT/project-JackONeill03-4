import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// Only require Pedometer on native
let Pedometer;
if (Platform.OS !== 'web') {
  Pedometer = require('expo-sensors').Pedometer;
}

// Screens
import SettingsScreen from './SettingsScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ExerciseScreen from './ExerciseScreen';
import ProfileScreen from './ProfileScreen';


// Drawer navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Exercises" component={ExerciseScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

  useEffect(() => {
    if (Platform.OS === 'web') return;

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync()
      .then(result => setIsPedometerAvailable(String(result)))
      .catch(err => setIsPedometerAvailable('Unavailable'));

    return () => subscription && subscription.remove();
  }, []);

  const colors = theme === 'dark' ? darkColors : lightColors;
  const dailyGoal = 10000;
  const progress = Math.min(stepCount / dailyGoal, 1);

  // Bright action button colors
  const actionColors = ['#ff6b6b', '#54a0ff', '#1dd1a1'];

  return (
  <LinearGradient
    colors={['#1e1e2f', '#3a3a5c']} // Darker gradient for better contrast
    style={{ flex: 1 }}
  >
    <ScrollView contentContainerStyle={[styles.container]}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={colors.text} />
      </TouchableOpacity>

      {/* Motivational Banner */}
      <View style={[styles.banner, { backgroundColor: '#ff6b81' }]}>
        <Text style={styles.bannerText}>Keep going! Every step counts 🚶‍♂️</Text>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>Welcome Back!</Text>

      {/* Daily Steps Widget */}
      <View style={[styles.widget, { backgroundColor: colors.card }]}>
        <Text style={[styles.widgetTitle, { color: colors.text }]}>Today's Steps</Text>
        <Text style={[styles.stepCount, { color: colors.text }]}>{stepCount}</Text>
        <ProgressBar progress={progress} color="#ff9f43" style={styles.progressBar} />
        <Text style={{ color: colors.subtle, marginTop: 5 }}>
          Pedometer: {isPedometerAvailable}
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: actionColors[0] }]}
          onPress={() => navigation.navigate('Exercises')}
        >
          <Ionicons name="barbell" size={28} color="#fff" />
          <Text style={[styles.actionLabel, { color: '#fff' }]}>💪 Exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: actionColors[1] }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={28} color="#fff" />
          <Text style={[styles.actionLabel, { color: '#fff' }]}>⚙️ Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: actionColors[2] }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Ionicons name="person-add" size={28} color="#fff" />
          <Text style={[styles.actionLabel, { color: '#fff' }]}>📝 Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </LinearGradient>
);
}

// Color themes
const lightColors = {
  background: '#f8f9fa',
  card: '#fff',
  text: '#111',
  subtle: '#555',
};

const darkColors = {
  background: '#0d0d0d',
  card: '#1a1a1a',
  text: '#f1f1f1',
  subtle: '#aaa',
};

// Styles
const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  banner: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  widget: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});
