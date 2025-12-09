import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation, user }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const colors = isDarkMode ? darkColors : lightColors;

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Appearance</Text>
      <View style={[styles.optionRow, { backgroundColor: colors.card }]}>
        <View style={styles.rowLeft}>
          <Ionicons name="moon" size={20} color={colors.text} />
          <Text style={[styles.optionLabel, { color: colors.text }]}>Dark Mode</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Preferences</Text>
      <View style={[styles.optionRow, { backgroundColor: colors.card }]}>
        <View style={styles.rowLeft}>
          <Ionicons name="notifications" size={20} color={colors.text} />
          <Text style={[styles.optionLabel, { color: colors.text }]}>Notifications</Text>
        </View>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
      <View style={[styles.optionRow, { backgroundColor: colors.card }]}>
        <View style={styles.rowLeft}>
          <Ionicons name="phone-portrait" size={20} color={colors.text} />
          <Text style={[styles.optionLabel, { color: colors.text }]}>Haptics</Text>
        </View>
        <Switch value={haptics} onValueChange={setHaptics} />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>Account</Text>
      <Pressable style={[styles.navRow, { backgroundColor: colors.card }]} onPress={handleProfilePress}>
        <View style={styles.rowLeft}>
          <Ionicons name="person" size={20} color={colors.text} />
          <Text style={[styles.optionLabel, { color: colors.text }]}>Profile</Text>
        </View>
      </Pressable>
      <Pressable style={[styles.navRow, { backgroundColor: colors.card }]} onPress={() => alert('Privacy clicked')}>
        <View style={styles.rowLeft}>
          <Ionicons name="shield-checkmark" size={20} color={colors.text} />
          <Text style={[styles.optionLabel, { color: colors.text }]}>Privacy</Text>
        </View>
      </Pressable>
    </View>
  );
}

const lightColors = { background: '#f2f2f7', card: '#fff', text: '#111', subtle: '#555' };
const darkColors = { background: '#0d0d0d', card: '#1a1a1a', text: '#f1f1f1', subtle: '#999' };

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20 },
  title: { fontSize: 34, fontWeight: '800', marginBottom: 15, textAlign: 'center' },
  sectionTitle: { fontSize: 13, fontWeight: '700', marginTop: 35, marginBottom: 14, opacity: 0.6 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, marginBottom: 16 },
  navRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  optionLabel: { fontSize: 18, fontWeight: '600', marginLeft: 10 },
});
