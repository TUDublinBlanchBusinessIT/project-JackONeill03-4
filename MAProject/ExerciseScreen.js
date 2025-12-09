import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExercisesScreen() {
  const systemTheme = useColorScheme();
  const colors = systemTheme === 'dark' ? darkColors : lightColors;

  const exercises = [
  {
    id: '1',
    name: 'Push-ups',
    duration: '3 sets of 12 reps',
    details: `1. Place your hands shoulder-width apart on the floor.\n
2. Keep your body straight from head to heels.\n
3. Lower yourself until your chest almost touches the floor.\n
4. Push back up to starting position.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '2',
    name: 'Bodyweight Squats',
    duration: '3 sets of 15 reps',
    details: `1. Stand with feet shoulder-width apart.\n
2. Push your hips back and bend your knees to lower down.\n
3. Keep your chest upright and knees behind your toes.\n
4. Return to standing.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '3',
    name: 'Plank',
    duration: '3 sets of 60 sec',
    details: `1. Lie face down, forearms on the floor.\n
2. Push up onto your toes, keeping your body straight.\n
3. Engage your core and glutes.\n
4. Hold for 60 seconds.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '4',
    name: 'Jumping Jacks',
    duration: '3 sets of 30 reps',
    details: `1. Stand upright, feet together, arms at sides.\n
2. Jump feet apart while raising arms overhead.\n
3. Jump back to starting position.\n
4. Rest 20 seconds between sets.`
  },
  {
    id: '5',
    name: 'Lunges',
    duration: '3 sets of 12 reps each leg',
    details: `1. Step forward with right leg, lowering hips until both knees are bent at 90°.\n
2. Push back to starting position.\n
3. Alternate legs.\n
4. Rest 30 seconds between sets.`
  },
  {
    id: '6',
    name: 'Glute Bridges',
    duration: '3 sets of 15 reps',
    details: `1. Lie on your back with knees bent, feet flat.\n
2. Push hips up until your body forms a straight line from shoulders to knees.\n
3. Squeeze glutes at the top.\n
4. Lower back down slowly.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '7',
    name: 'Mountain Climbers',
    duration: '3 sets of 30 sec',
    details: `1. Start in a plank position.\n
2. Drive one knee toward your chest, then quickly switch legs.\n
3. Continue alternating as fast as possible.\n
4. Rest 20 seconds between sets.`
  },
  {
    id: '8',
    name: 'Wall Sit',
    duration: '3 sets of 45 sec',
    details: `1. Stand with your back against a wall.\n
2. Slide down until knees are at 90°.\n
3. Keep back flat against the wall.\n
4. Hold the position.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '9',
    name: 'Tricep Dips (using a chair)',
    duration: '3 sets of 12 reps',
    details: `1. Sit on edge of a sturdy chair.\n
2. Place hands beside your hips, fingers forward.\n
3. Slide forward, lowering body until elbows are at 90°.\n
4. Push back up.\n
5. Rest 30 seconds between sets.`
  },
  {
    id: '10',
    name: 'High Knees',
    duration: '3 sets of 30 sec',
    details: `1. Stand upright, feet hip-width apart.\n
2. Run in place, lifting knees as high as possible.\n
3. Pump your arms as you move.\n
4. Rest 20 seconds between sets.`
  },
];

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: colors.card }]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitle}>
            <Ionicons name="barbell" size={28} color={colors.text} style={{ marginRight: 12 }} />
            <View>
              <Text style={[styles.exerciseName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.exerciseDuration, { color: colors.subtle }]}>{item.duration}</Text>
            </View>
          </View>
          <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.subtle} />
        </View>

        {isExpanded && (
          <View style={styles.cardDetails}>
            <Text style={[styles.exerciseDetails, { color: colors.text }]}>{item.details}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Quick Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.08)', // web-friendly shadow
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
  },
  exerciseDuration: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  cardDetails: {
    marginTop: 12,
  },
  exerciseDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
});
