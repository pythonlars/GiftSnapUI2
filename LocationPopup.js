import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Linking, 
  ActivityIndicator 
} from 'react-native';
import { findNearestStores } from './locationService.js';

const LocationPopup = ({ 
  visible, 
  onClose, 
  store, 
  locationUrl,
  hasPhysicalStores
}) => {
  const [storeLocations, setStoreLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    if (visible && hasPhysicalStores) {
      loadStoreLocations();
    }
  }, [visible, store]);

  const loadStoreLocations = async () => {
    if (hasPhysicalStores) {
      setLoading(true);
      try {
        const locations = await findNearestStores(store);
        setStoreLocations(locations.stores || []);
      } catch (error) {
        console.error('Failed to load store locations:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openUrl = (url) => {
    if (url) {
      Linking.openURL(url).catch(err => 
        console.error('Failed to open URL:', err)
      );
    }
  };

  const handleStoreItemClick = (store) => {
    setSelectedStore(store);
    setMapView(true);
  };

  const renderOnlineStore = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{store}</Text>
      <Text style={styles.storeInfo}>Online store:</Text>
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => openUrl(locationUrl)}
      >
        <Text style={styles.linkText}>{locationUrl}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPhysicalStores = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{store} Locations</Text>

      {!mapView ? (
        <View>
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => setMapView(true)}
          >
            <Text style={styles.mapButtonText}>View Map</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.storeList}>
              {storeLocations.length > 0 ? (
                storeLocations.map((loc, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.storeItem}
                    onPress={() => handleStoreItemClick(loc)}
                  >
                    <Text style={styles.storeName}>{loc.name}</Text>
                    <Text style={styles.storeAddress}>{loc.address}</Text>
                    <Text style={styles.storeDistance}>{loc.distance} away</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noStores}>No store locations found nearby</Text>
              )}
            </View>
          )}

          {locationUrl && (
            <View style={styles.onlineSection}>
              <Text style={styles.storeInfo}>Online store also available:</Text>
              <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => openUrl(locationUrl)}
              >
                <Text style={styles.linkText}>{locationUrl}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <TouchableOpacity 
            style={styles.listButton}
            onPress={() => setMapView(false)}
          >
            <Text style={styles.listButtonText}>View List</Text>
          </TouchableOpacity>

          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map View</Text>
            {selectedStore ? (
              <Text style={styles.mapInfo}>
                Showing location for: {selectedStore.name}
              </Text>
            ) : storeLocations.length > 0 && (
              <Text style={styles.mapInfo}>
                Showing {storeLocations.length} {store} locations
              </Text>
            )}
            <Text style={styles.mapNote}>
              (In a real app, this would display an interactive map)
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {hasPhysicalStores ? renderPhysicalStores() : renderOnlineStore()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: '#f3f4f6',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  modalContent: {
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  storeInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4b5563',
  },
  linkButton: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  mapButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  listButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  storeList: {
    maxHeight: 300,
  },
  storeItem: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  storeAddress: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  storeDistance: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  noStores: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  onlineSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  mapContainer: {
    alignItems: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  mapInfo: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  mapNote: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 12,
    fontStyle: 'italic',
  },
});

export default LocationPopup;
