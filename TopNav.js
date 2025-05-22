import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const TopNav = ({ onPressAddCard }) => (
  <View style={styles.topNav}>
    <Text style={styles.logo}>🎁 GiftSnap</Text>
    <TouchableOpacity style={styles.addCardButton} onPress={onPressAddCard}>
      <Text style={styles.addCardText}>+ Add Card</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addCardButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addCardText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TopNav;
