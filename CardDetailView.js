import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { findNearestTargetStore } from './giftCardData.js';
import { hasPhysicalStores } from './locationService.js';
import LocationPopup from './LocationPopup.js';

const CardDetailView = ({ card, onClose }) => {
  const isUnused = card.status === 'Unused';
  const [nearestStore, setNearestStore] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationPopupVisible, setLocationPopupVisible] = useState(false);
  
  useEffect(() => {
    // If this is a Target card, try to find the nearest store
    if (card.store === 'Target') {
      setLoadingLocation(true);
      findNearestTargetStore()
        .then(storeInfo => {
          setNearestStore(storeInfo);
          setLoadingLocation(false);
        })
        .catch(error => {
          console.error('Error finding store:', error);
          setNearestStore('Could not locate nearest store');
          setLoadingLocation(false);
        });
    }
  }, [card.store]);
  
  // Get card color based on store
  const getCardColor = () => {
    switch(card.store) {
      case 'Amazon':
        return '#FFF9C4'; // Yellow
      case 'Zalando':
        return '#FFCCBC'; // Orange
      case 'Target':
        return '#EF4444'; // Red
      default:
        return '#FFFFFF'; // White
    }
  };
  
  return (
    <View style={styles.detailContainer}>
      <TouchableOpacity style={styles.closeDetailButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      
      {/* Card Header */}
      <View style={[styles.detailCard, { backgroundColor: getCardColor() }]}>
        <View style={styles.statusBadgeLarge}>
          <Text style={[styles.statusTextLarge, { color: isUnused ? '#047857' : '#6b7280' }]}>
            {card.status}
          </Text>
        </View>
        <Text style={styles.detailStoreName}>{card.store}</Text>
        <Text style={styles.detailCardValue}>{card.currency}{card.value}</Text>
      </View>
      
      {/* Card Details */}
      <View style={styles.detailInfo}>
        <Text style={styles.detailSectionTitle}>Card Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Store</Text>
          <Text style={styles.detailValue}>{card.store}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Value</Text>
          <Text style={styles.detailValue}>{card.currency}{card.value}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expires</Text>
          <Text style={styles.detailValue}>{card.expirationDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <View style={[styles.statusBadgeSmall, { backgroundColor: isUnused ? '#ecfdf5' : '#f3f4f6' }]}>
            <Text style={[styles.statusTextSmall, { color: isUnused ? '#047857' : '#6b7280' }]}>
              {card.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={() => setLocationPopupVisible(true)}
          >
            <Text style={[styles.detailValue, styles.linkText]}>
              {hasPhysicalStores(card.store) ? 'View Store Locations' : 'Visit Online Store'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <LocationPopup 
          visible={locationPopupVisible} 
          onClose={() => setLocationPopupVisible(false)}
          store={card.store}
          locationUrl={card.locationTag}
          hasPhysicalStores={hasPhysicalStores(card.store)}
        />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tradable</Text>
          <Text style={styles.detailValue}>{card.tradable ? 'Yes' : 'No'}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.useCardButton}
        onPress={() => setLocationPopupVisible(true)} // Open location popup
      >
        <Text style={styles.useCardButtonText}>Use Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  closeDetailButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailCard: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailStoreName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  detailCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statusBadgeLarge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  statusTextLarge: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailInfo: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusBadgeSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusTextSmall: {
    fontSize: 14,
    fontWeight: '500',
  },
  useCardButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  useCardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  linkText: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default CardDetailView;
