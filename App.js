// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View, Dimensions, Platform } from 'react-native';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { products } from './data/product';

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [isWeb, setIsWeb] = useState(Platform.OS === 'web');

  useEffect(() => {
    const handleDimensionChange = ({ window }) => {
      setWindowWidth(window.width);
    };

    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      // Remove listener on cleanup
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', handleDimensionChange);
      }
    };
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#a8336e" barStyle="light-content" />
      <Header 
        cartItemCount={cartItemCount} 
        toggleCart={() => setShowCart(true)} 
        onSearch={setSearchTerm}
        isWeb={isWeb}
        windowWidth={windowWidth}
      />
      <Banner />
      <View style={styles.mainContent}>
        <ProductList 
          products={products}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchTerm={searchTerm}
          addToCart={addToCart}
          isWeb={isWeb}
          windowWidth={windowWidth}
        />
      </View>
      <Footer isWeb={isWeb} />
      {showCart && (
        <Cart 
          cart={cart} 
          closeCart={() => setShowCart(false)} 
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isWeb={isWeb}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f5f6',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 0,
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
});