import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const CameraView = ({ onClose, onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [captureMode, setCaptureMode] = useState('front'); // 'front' or 'back'
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        // Check if the method exists before calling it
        if (Camera.requestCameraPermissionsAsync) {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        } else if (Camera.requestPermissionsAsync) {
          // Fallback for older versions
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        } else {
          // If neither method is available, assume permission is granted
          setHasPermission(true);
        }
      } catch (error) {
        console.error('Camera permission error:', error);
        // Fallback to assume permission is granted if there's an error
        setHasPermission(true);
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      // Check if camera is available
      if (cameraRef.current && cameraRef.current.takePictureAsync) {
        const photo = await cameraRef.current.takePictureAsync();
        if (captureMode === 'front') {
          setFrontImage(photo.uri);
          setCaptureMode('back');
        } else {
          setBackImage(photo.uri);
          // Both images captured, call onCapture
          onCapture({ front: frontImage, back: photo.uri });
        }
      } else {
        // Mock camera behavior for testing
        const mockPhotoUri = 'https://via.placeholder.com/300x200?text=Mock+Gift+Card';
        if (captureMode === 'front') {
          setFrontImage(mockPhotoUri);
          setCaptureMode('back');
          Alert.alert('Mock Camera', 'Front image captured (mock)');
        } else {
          setBackImage(mockPhotoUri);
          // Both images captured, call onCapture
          onCapture({ front: frontImage, back: mockPhotoUri });
          Alert.alert('Mock Camera', 'Back image captured (mock)');
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take picture: ' + error.message);
    }
  };

  // Render loading state
  if (hasPermission === null) {
    return (
      <View style={[styles.cameraContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{color: 'white'}}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  // Render permission denied state
  if (hasPermission === false) {
    return (
      <View style={[styles.cameraContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{color: 'white'}}>No access to camera. Please enable camera permissions.</Text>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraHeader}>
        <Text style={styles.cameraTitle}>
          {captureMode === 'front' ? 'Take Front Picture' : 'Take Back Picture'}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      {frontImage && captureMode === 'back' ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Front Image Preview:</Text>
          <Image source={{ uri: frontImage }} style={styles.imagePreview} />
        </View>
      ) : null}
      
      {/* Render either camera or fallback */}
      <View style={styles.camera}>
        {Camera && typeof Camera.Constants !== 'undefined' ? (
          <Camera
            style={{flex: 1}}
            type={Camera.Constants?.Type?.back || 'back'}
            ref={cameraRef}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.cardOutline} />
            </View>
          </Camera>
        ) : (
          <View style={{flex: 1, backgroundColor: '#2c2c2c', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.cameraOverlay}>
              <View style={styles.cardOutline} />
            </View>
            <Text style={{color: 'white', position: 'absolute'}}>📷 Camera Preview</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <Text style={styles.captureInstructions}>
          {captureMode === 'front' 
            ? 'Position the FRONT of your gift card in the frame' 
            : 'Now position the BACK of your gift card'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  cameraTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOutline: {
    width: 280,
    height: 180,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  cameraControls: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'white',
  },
  captureInstructions: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  previewContainer: {
    position: 'absolute',
    top: 70,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    padding: 8,
    width: 120,
  },
  previewLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  imagePreview: {
    width: 104,
    height: 70,
    borderRadius: 4,
  },
});

export default CameraView;
