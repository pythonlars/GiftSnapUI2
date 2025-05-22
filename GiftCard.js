import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Import helper function
import { getMonthsUntilExpiration } from './giftCardData.js';

const GiftCard = ({ card, onPress }) => {
  const isUnused = card.status === 'Unused';
  const monthsLeft = getMonthsUntilExpiration(card.expirationDate);
  
  // Get card color based on store
  const getCardColor = () => {
    switch(card.store) {
      case 'Amazon':
        return '#FFF9C4'; // Yellow
      case 'Zalando':
        return '#FFCCBC'; // Orange
      case 'Target':
        return '#EF4444'; // Red
      case 'Spotify':
        return '#C8E6C9'; // Green
      default:
        return '#FFFFFF'; // White
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.giftCard, 
        isUnused ? styles.unusedCard : styles.usedCard,
        { backgroundColor: getCardColor() }
      ]}
      onPress={() => onPress(card)}
    >
      <View style={styles.statusBadge}>
        <Text style={[styles.statusText, { color: isUnused ? '#047857' : '#6b7280' }]}>
          {card.status}
        </Text>
      </View>
      
      <Text style={styles.storeName}>{card.store}</Text>
      <Text style={styles.cardValue}>{card.currency}{card.value}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.expiryText}>Expires {monthsLeft} months ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  giftCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unusedCard: {
    backgroundColor: '#ffffff',
  },
  usedCard: {
    backgroundColor: '#f9fafb',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  expiryText: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default GiftCard;
