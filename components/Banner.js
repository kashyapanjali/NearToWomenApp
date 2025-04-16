// components/Banner.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Banner = ({ isWeb }) => {
  const windowWidth = Dimensions.get('window').width;
  const bannerHeight = isWeb 
    ? (windowWidth > 1200 ? 300 : windowWidth > 768 ? 250 : 180)
    : 150;

  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1607006483731-fc2a35965d33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
        style={[styles.banner, { height: bannerHeight }]}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Women's Essentials
            </Text>
            <Text style={styles.subtitle}>
              Wellness & safety products at great prices
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Shop now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {isWeb && (
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      )}

      {isWeb && (
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="chevron-left" size={16} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="chevron-right" size={16} color="#555" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'relative',
    marginBottom: 25,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(168, 51, 110, 0.1)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    maxWidth: 500,
  },
  title: {
    color: '#a8336e',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e6799f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#d16990',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  indicators: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#a8336e',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  navButtons: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default Banner;
