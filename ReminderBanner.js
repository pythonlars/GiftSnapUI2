import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const ReminderBanner = ({ onViewCards }) => (
  <View style={styles.reminderBanner}>
    <View style={styles.reminderIcon}>
      <Text style={styles.reminderIconText}>⏰</Text>
    </View>
    <View style={styles.reminderContent}>
      <Text style={styles.reminderTitle}>Reminder</Text>
      <Text style={styles.reminderText}>You have gift cards that will expire soon. Don't forget to use them!</Text>
      <TouchableOpacity style={styles.viewCardsButton} onPress={onViewCards}>
        <Text style={styles.viewCardsText}>View Cards</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  reminderBanner: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  reminderIcon: {
    marginRight: 12,
  },
  reminderIconText: {
    fontSize: 24,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reminderText: {
    marginBottom: 8,
  },
  viewCardsButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  viewCardsText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ReminderBanner;
