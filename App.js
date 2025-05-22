import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import Constants from 'expo-constants';

// Gift card data
import { giftCards } from './giftCardData.js';

// Import components
import GiftCard from './GiftCard.js';
import CardDetailView from './CardDetailView.js';
import CameraView from './CameraView.js';
import ReminderBanner from './ReminderBanner.js';
import TopNav from './TopNav.js';
import FilterTabs from './FilterTabs.js';

// Main App
const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCard, setSelectedCard] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedImages, setCapturedImages] = useState(null);
  
  // Filter cards based on active tab
  const filteredCards = giftCards.filter(card => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unused') return card.status === 'Unused';
    if (activeTab === 'used') return card.status === 'Used';
    return true;
  });
  
  // Handle card selection
  const handleCardPress = (card) => {
    setSelectedCard(card);
  };
  
  // Handle closing detail view
  const handleCloseDetail = () => {
    setSelectedCard(null);
  };
  
  // Handle opening camera
  const handleOpenCamera = () => {
    setCameraVisible(true);
  };
  
  // Handle closing camera
  const handleCloseCamera = () => {
    setCameraVisible(false);
  };
  
  // Handle image capture
  const handleImageCapture = (images) => {
    setCapturedImages(images);
    setCameraVisible(false);
    // Here you would normally process the images and create a new card
    Alert.alert(
      'Success!', 
      'Card images captured successfully!\n\nIn a real app, we would now process these images and create a new gift card.'
    );
  };
  
  // If camera is visible, show camera view
  if (cameraVisible) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CameraView 
          onClose={handleCloseCamera} 
          onCapture={handleImageCapture} 
        />
      </SafeAreaView>
    );
  }
  
  // If a card is selected, show detail view
  if (selectedCard) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <CardDetailView card={selectedCard} onClose={handleCloseDetail} />
      </SafeAreaView>
    );
  }
  
  // Otherwise show the card listing
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>
        <TopNav onPressAddCard={handleOpenCamera} />
        
        <ReminderBanner onViewCards={() => setActiveTab('unused')} />
        
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>My Gift Cards</Text>
          
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <View style={styles.cardsGrid}>
            {filteredCards.map(card => (
              <GiftCard 
                key={card.id} 
                card={card} 
                onPress={handleCardPress} 
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});

export default App;
