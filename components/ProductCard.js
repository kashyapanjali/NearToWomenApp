// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({ product, addToCart, isWeb, windowWidth, horizontal = false }) => {
  const cardStyles = [
    styles.card,
    horizontal ? styles.horizontalCard : styles.verticalCard,
    isWeb && styles.webCard
  ];

  // Determine image dimensions based on layout and screen
  const getImageDimensions = () => {
    if (horizontal) {
      return {
        width: 150,
        height: 150
      };
    }
    
    if (isWeb) {
      if (windowWidth > 1400) return { height: 180, width: '100%' };
      if (windowWidth > 1100) return { height: 170, width: '100%' };
      return { height: 160, width: '100%' };
    }
    
    return { height: 140, width: '100%' };
  };

  const imageDimensions = getImageDimensions();
  
  // Format price
  const formatPrice = (price) => {
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.priceCurrency}>$</Text>
        <Text style={styles.priceWhole}>{dollars}</Text>
        <Text style={styles.priceCents}>{cents.toString().padStart(2, '0')}</Text>
      </View>
    );
  };

  // Get badge for category
  const getCategoryBadge = () => {
    switch(product.category) {
      case 'menstrual':
        return { label: 'Menstrual', color: '#e84a80' };
      case 'safety':
        return { label: 'Safety', color: '#4a7de8' };
      case 'wellness':
        return { label: 'Wellness', color: '#4acce8' };
      case 'food':
        return { label: 'Health Food', color: '#7de84a' };
      default:
        return null;
    }
  };

  const categoryBadge = getCategoryBadge();

  return (
    <View style={cardStyles}>
      <View style={[
        styles.imageContainer,
        horizontal && styles.horizontalImageContainer
      ]}>
        <Image
          source={{ uri: product.image || 'https://via.placeholder.com/200' }}
          style={[styles.image, imageDimensions]}
          resizeMode="contain"
        />
        {categoryBadge && !horizontal && (
          <View style={[styles.categoryBadge, { backgroundColor: categoryBadge.color }]}>
            <Text style={styles.categoryBadgeText}>{categoryBadge.label}</Text>
          </View>
        )}
      </View>
      
      <View style={[
        styles.infoContainer,
        horizontal && styles.horizontalInfoContainer
      ]}>
        <Text 
          style={styles.name} 
          numberOfLines={horizontal ? 2 : 2}
        >
          {product.name}
        </Text>
        
        {formatPrice(product.price)}
        
        {!horizontal && (
          <Text 
            style={styles.description} 
            numberOfLines={2}
          >
            {product.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          {product.stock <= 10 && (
            <Text style={styles.lowStockText}>Only {product.stock} left</Text>
          )}

          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    overflow: 'hidden',
    margin: 5,
  },
  verticalCard: {
    flex: 1,
    maxWidth: '100%',
  },
  horizontalCard: {
    flexDirection: 'row',
    width: 320,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 3,
  },
  webCard: {
    transition: '0.2s',
    cursor: 'pointer',
    ...(Platform.OS === 'web' && {
      ':hover': {
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }
    }),
  },
  imageContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  horizontalImageContainer: {
    width: 150,
  },
  image: {
    resizeMode: 'contain',
  },
  categoryBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 10,
  },
  horizontalInfoContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  name: {
    fontSize: 14,
    color: '#c04d7c',
    marginBottom: 5,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  priceCurrency: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#e84a80',
    marginTop: 1,
  },
  priceWhole: {
    fontSize: 17,
    fontWeight: 'normal',
    color: '#e84a80',
  },
  priceCents: {
    fontSize: 11,
    fontWeight: 'normal', 
    color: '#e84a80',
    marginTop: 1,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    lineHeight: 18,
  },
  footer: {
    marginTop: 'auto',
  },
  lowStockText: {
    color: '#e84a80',
    fontSize: 12,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#e6799f',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d16990',
  },
  addButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ProductCard;