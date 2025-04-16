// components/Cart.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = ({ cart, closeCart, addToCart, removeFromCart, isWeb }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const windowWidth = Dimensions.get('window').width;
  const cartWidth = isWeb ? 
    (windowWidth > 768 ? 400 : windowWidth * 0.8) : 
    windowWidth;

  return (
    <View style={[
      styles.overlay,
      isWeb && styles.webOverlay
    ]}>
      <View style={[
        styles.cartContainer,
        isWeb && styles.webCartContainer,
        { width: isWeb ? cartWidth : '100%' }
      ]}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <TouchableOpacity onPress={closeCart}>
            <Icon name="times" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Icon name="shopping-cart" size={50} color="#ccc" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity style={styles.continueButton} onPress={closeCart}>
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView style={styles.itemsContainer}>
              {cart.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <Image 
                    source={{ uri: item.image || 'https://via.placeholder.com/100' }} 
                    style={styles.itemImage} 
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Icon name="minus" size={12} color="#a8336e" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => addToCart(item)}
                    >
                      <Icon name="plus" size={12} color="#a8336e" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.cartFooter}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  webOverlay: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  cartContainer: {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'web' ? 0 : 15,
    overflow: 'hidden',
    maxHeight: '100%',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      },
    }),
  },
  webCartContainer: {
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  continueButton: {
    backgroundColor: '#a8336e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemsContainer: {
    maxHeight: '70%',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemPrice: {
    color: '#a8336e',
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12.5,
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  cartFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a8336e',
  },
  checkoutButton: {
    backgroundColor: '#a8336e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cart;
