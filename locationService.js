// Location service for GiftSnapUI
import * as Location from 'expo-location';

// Get the current location of the user
export const getCurrentLocation = async () => {
  try {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      return {
        error: 'Permission to access location was denied',
        coords: null
      };
    }

    // Get the current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      error: null,
      coords: location.coords
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      error: 'Could not determine location. Please enable location services.',
      coords: null
    };
  }
};

// Function to find the nearest store based on user's location
export const findNearestStore = async (storeName) => {
  try {
    const { error, coords } = await getCurrentLocation();
    
    if (error) {
      return {
        error,
        nearestStore: null
      };
    }
    
    // Normally we would call a store locator API here with the coordinates
    // For demo purposes, we'll return a mock result
    return {
      error: null,
      nearestStore: {
        name: `${storeName} Store`,
        address: `123 Main St, Your City`,
        distance: '2.4 miles',
        coords: {
          latitude: coords.latitude + 0.01, // Just a small offset for demo
          longitude: coords.longitude - 0.01
        }
      }
    };
  } catch (error) {
    console.error('Error finding nearest store:', error);
    return {
      error: 'Could not find nearest store.',
      nearestStore: null
    };
  }
};

// Function to find multiple nearby stores based on user's location
export const findNearestStores = async (storeName) => {
  try {
    const { error, coords } = await getCurrentLocation();
    
    if (error) {
      return {
        error,
        stores: []
      };
    }
    
    // For demo purposes, we'll return mock results with multiple stores
    const mockStores = [
      {
        name: `${storeName} - Downtown`,
        address: '123 Main St, Downtown',
        distance: '1.2 miles',
        coords: {
          latitude: coords.latitude + 0.01,
          longitude: coords.longitude - 0.01
        }
      },
      {
        name: `${storeName} - Uptown`,
        address: '456 Park Ave, Uptown',
        distance: '2.8 miles',
        coords: {
          latitude: coords.latitude - 0.02,
          longitude: coords.longitude + 0.02
        }
      },
      {
        name: `${storeName} - Westside`,
        address: '789 Ocean Blvd, Westside',
        distance: '3.5 miles',
        coords: {
          latitude: coords.latitude + 0.03,
          longitude: coords.longitude - 0.03
        }
      }
    ];
    
    return {
      error: null,
      stores: mockStores
    };
  } catch (error) {
    console.error('Error finding stores:', error);
    return {
      error: 'Could not find nearby stores.',
      stores: []
    };
  }
};

// Determine if a store has physical locations
export const hasPhysicalStores = (storeName) => {
  // This would normally check against a database or API
  // For demo purposes, we'll use a simple check
  const storesWithPhysicalLocations = ['Target', 'Walmart', 'Best Buy'];
  return storesWithPhysicalLocations.includes(storeName);
};

// Format coordinates to a human-readable string
export const formatCoordinates = (coords) => {
  if (!coords) return 'Unknown location';
  
  const { latitude, longitude } = coords;
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const longDirection = longitude >= 0 ? 'E' : 'W';
  
  return `GPS(${Math.abs(latitude).toFixed(4)}° ${latDirection}, ${Math.abs(longitude).toFixed(4)}° ${longDirection})`;
};
