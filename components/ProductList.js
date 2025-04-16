// components/ProductList.js
import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ 
  products, 
  categories,
  activeCategory, 
  setActiveCategory, 
  searchTerm, 
  addToCart, 
  isWeb, 
  windowWidth,
  horizontal = false
}) => {
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
                         product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate number of columns based on screen width and platform
  const getNumColumns = useMemo(() => {
    if (horizontal) return 1;
    
    if (isWeb) {
      if (windowWidth > 1400) return 5;
      if (windowWidth > 1100) return 4;
      if (windowWidth > 800) return 3;
      if (windowWidth > 550) return 2;
      return 1;
    } else {
      return windowWidth > 600 ? 2 : 1;
    }
  }, [windowWidth, isWeb, horizontal]);

  const renderItem = ({ item }) => (
    <ProductCard 
      product={item} 
      addToCart={addToCart} 
      isWeb={isWeb}
      windowWidth={windowWidth}
      horizontal={horizontal}
    />
  );

  return (
    <View style={[
      styles.container,
      horizontal && styles.horizontalContainer
    ]}>
      {filteredProducts.length === 0 ? (
        <View style={styles.noProducts}>
          <Text style={styles.noProductsText}>No products found. Try a different search.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={horizontal ? 1 : getNumColumns}
          key={horizontal ? 'horizontal' : `grid-${getNumColumns}`}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.productList,
            horizontal && styles.horizontalList
          ]}
          columnWrapperStyle={!horizontal && getNumColumns > 1 ? styles.columnWrapper : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 3,
    overflow: 'hidden',
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  horizontalContainer: {
    paddingVertical: 5,
  },
  productList: {
    paddingBottom: 10,
  },
  horizontalList: {
    paddingRight: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noProducts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

export default ProductList;