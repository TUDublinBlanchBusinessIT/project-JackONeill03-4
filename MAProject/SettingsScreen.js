import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebaseConfig';

export default function SettingsScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  // Listen for user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => Alert.alert('Logged out', 'You have successfully logged out'))
      .catch(error => Alert.alert('Error', error.message));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <LinearGradient
      colors={isDarkMode ? ['#0a0a0a', '#1b1b1e'] : ['#f3f5f8', '#e7eaef']}
      style={styles.container}
    >
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      {/* Appearance Section */}
      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Appearance</Text>
      <Animated.View entering={FadeInDown.delay(120).springify()}>
        <Pressable style={[styles.optionRow, { backgroundColor: colors.card }]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
              <Ionicons name="moon" size={20} color={colors.text} />
            </View>
            <Text style={[styles.optionLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#777', true: '#4a90e2' }}
            thumbColor={isDarkMode ? '#fff' : '#eee'}
          />
        </Pressable>
      </Animated.View>

      {/* Preferences Section */}
      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Preferences</Text>
      <Animated.View entering={FadeInDown.delay(200).springify()}>
        <Pressable style={[styles.optionRow, { backgroundColor: colors.card }]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
              <Ionicons name="notifications" size={20} color={colors.text} />
            </View>
            <Text style={[styles.optionLabel, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#777', true: '#4a90e2' }}
            thumbColor={notifications ? '#fff' : '#eee'}
          />
        </Pressable>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(280).springify()}>
        <Pressable style={[styles.optionRow, { backgroundColor: colors.card }]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
              <Ionicons name="phone-portrait" size={20} color={colors.text} />
            </View>
            <Text style={[styles.optionLabel, { color: colors.text }]}>Haptics</Text>
          </View>
          <Switch
            value={haptics}
            onValueChange={setHaptics}
            trackColor={{ false: '#777', true: '#4a90e2' }}
            thumbColor={haptics ? '#fff' : '#eee'}
          />
        </Pressable>
      </Animated.View>

      {/* Account Section */}
      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Account</Text>

      {user ? (
        // Logged-in view
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <Pressable
            style={({ pressed }) => [
              styles.navRow,
              { backgroundColor: colors.card },
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={handleLogout}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
                <Ionicons name="log-out" size={20} color={colors.text} />
              </View>
              <Text style={[styles.optionLabel, { color: colors.text }]}>Logout</Text>
            </View>
          </Pressable>
        </Animated.View>
      ) : (
        // Logged-out view
        <>
          {[
            { icon: 'log-in', label: 'Login', screen: 'Login' },
            { icon: 'person-add', label: 'Register', screen: 'Register' }
          ].map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(350 + index * 70).springify()}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.navRow,
                  { backgroundColor: colors.card },
                  pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.iconBg }]}>
                    <Ionicons name={item.icon} size={20} color={colors.text} />
                  </View>
                  <Text style={[styles.optionLabel, { color: colors.text }]}>{item.label}</Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </>
      )}
    </LinearGradient>
  );
}

/* ============================= */
/*           Color Themes        */
/* ============================= */
const lightColors = {
  background: '#f2f2f7',
  card: 'rgba(255,255,255,0.65)',
  text: '#111',
  subtle: '#555',
  iconBg: 'rgba(0,0,0,0.06)',
};

const darkColors = {
  background: '#0d0d0d',
  card: 'rgba(28,28,30,0.55)',
  text: '#f1f1f1',
  subtle: '#999',
  iconBg: 'rgba(255,255,255,0.08)',
};


/* ============================= */
/*            Styles             */
/* ============================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 35,
    marginBottom: 14,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
});
