// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, View, Dimensions, Platform, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { products } from './data/product';
import CategoryFilter from './components/CategoryFilter';

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [isWeb, setIsWeb] = useState(Platform.OS === 'web');

  // Create predefined women's categories
  const womenCategories = [
    { id: 'all', name: 'All Products' },
    { id: 'menstrual', name: 'Menstrual Care' },
    { id: 'safety', name: 'Safety' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'food', name: 'Health Foods' }
  ];

  useEffect(() => {
    const handleDimensionChange = ({ window }) => {
      setWindowWidth(window.width);
    };

    Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', handleDimensionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsWeb(true);
    }
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

  // Create recommendation sections
  const safetyProducts = products.filter(product => product.category === 'safety');
  const wellnessProducts = products.filter(product => product.category === 'wellness');

  const filterProducts = () => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  };

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
      
      <View style={styles.appContent}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            {paddingBottom: isWeb ? 0 : 120} // Add padding at the bottom for mobile to account for the footer
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Banner isWeb={isWeb} />
          
          <View style={styles.mainContent}>
            <View style={styles.categoriesRow}>
              {womenCategories.map(cat => (
                <View 
                  key={cat.id} 
                  style={[
                    styles.categoryBox, 
                    activeCategory === cat.id && styles.activeCategoryBox
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      activeCategory === cat.id && styles.activeCategoryText
                    ]}
                    onPress={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.sectionDivider} />
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <ProductList 
              products={filterProducts()}
              categories={womenCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchTerm={searchTerm}
              addToCart={addToCart}
              isWeb={isWeb}
              windowWidth={windowWidth}
            />
            
            {isWeb && (
              <>
                <View style={styles.sectionDivider} />
                
                <View style={styles.recommendationsSection}>
                  <Text style={styles.sectionTitle}>Safety Essentials</Text>
                  <ProductList 
                    products={safetyProducts}
                    categories={womenCategories}
                    activeCategory="safety"
                    setActiveCategory={setActiveCategory}
                    searchTerm=""
                    addToCart={addToCart}
                    isWeb={isWeb}
                    windowWidth={windowWidth}
                    horizontal={true}
                  />
                </View>
                
                <View style={styles.sectionDivider} />
                
                <View style={styles.recommendationsSection}>
                  <Text style={styles.sectionTitle}>Wellness Products</Text>
                  <ProductList 
                    products={wellnessProducts}
                    categories={womenCategories}
                    activeCategory="wellness"
                    setActiveCategory={setActiveCategory}
                    searchTerm=""
                    addToCart={addToCart}
                    isWeb={isWeb}
                    windowWidth={windowWidth}
                    horizontal={true}
                  />
                </View>
              </>
            )}
            
            <View style={styles.footerSpacer} />
          </View>
        </ScrollView>
        
        <View style={styles.footerContainer}>
          <Footer isWeb={isWeb} />
        </View>
      </View>
      
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
    backgroundColor: '#fdf2f7',
  },
  appContent: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Platform.OS === 'web' ? 350 : 200, // Increased padding to prevent content from being hidden by footer
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'web' ? '2%' : 8,
    maxWidth: Platform.OS === 'web' ? 1400 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 3,
  },
  activeCategoryBox: {
    backgroundColor: '#e6799f',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  activeCategoryText: {
    fontWeight: 'bold',
    color: 'white',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#ecd5df',
    marginVertical: 20,
  },
  recommendationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#a8336e',
  },
  footerSpacer: {
    height: Platform.OS === 'web' ? 120 : 80, // Increased height for additional spacing
  },
  footerContainer: {
    width: '100%',
    zIndex: 10,
  },
});