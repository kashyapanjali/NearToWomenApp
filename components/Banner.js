// components/Banner.js
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const Banner = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://via.placeholder.com/1200x300' }}
      style={styles.banner}
      imageStyle={styles.bannerImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.bannerTitle}>Empowering Women's Health & Safety</Text>
        <Text style={styles.bannerSubtitle}>Quality products for your wellness journey</Text>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    opacity: 0.7,
  },
  overlay: {
    backgroundColor: 'rgba(168, 51, 110, 0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#a8336e',
    fontWeight: 'bold',
  },
});

export default Banner;
