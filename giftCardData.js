// Import location service
import { formatCoordinates, findNearestStore } from './locationService.js';

// Dummy data for gift cards
export const giftCards = [
  {
    id: '1',
    store: 'Amazon',
    value: 25,
    currency: '€',
    expirationDate: '2025-01-01',
    status: 'Unused',
    locationTag: 'https://www.amazon.de/',
    tradable: true,
  },
  {
    id: '2',
    store: 'Zalando',
    value: 15,
    currency: '€',
    expirationDate: '2024-12-12',
    status: 'Used',
    locationTag: 'https://www.zalando.de/',
    tradable: false,
  },
  {
    id: '3',
    store: 'Target',
    value: 10,
    currency: '€',
    expirationDate: '2025-05-20',
    status: 'Unused',
    locationTag: 'https://www.target.com/ or nearest store: GPS(40.7128° N, 74.0060° W)',
    tradable: true,
  }
];

// Helper function to calculate months until expiration
export const getMonthsUntilExpiration = (dateString) => {
  const expirationDate = new Date(dateString);
  const today = new Date();
  const monthsDiff = (expirationDate.getFullYear() - today.getFullYear()) * 12 + 
    (expirationDate.getMonth() - today.getMonth());
  return Math.max(0, monthsDiff);
};

// Find the nearest Target store based on user's location
export const findNearestTargetStore = async () => {
  try {
    const result = await findNearestStore('Target');
    if (result.error) {
      return 'Location services not available';
    }
    
    // Create a formatted string with the store information
    const { name, address, distance, coords } = result.nearestStore;
    const formattedCoords = formatCoordinates(coords);
    
    return `${name}: ${address} (${distance} away) ${formattedCoords}`;
  } catch (error) {
    console.error('Error finding Target store:', error);
    return 'Could not locate nearest Target store';
  }
};
