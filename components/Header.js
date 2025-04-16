// components/Header.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ cartItemCount, toggleCart, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>BloomWell</Text>
        <Text style={styles.logoSubtext}>For Women's Wellness & Safety</Text>
      </View>
      <View style={styles.searchBar}>
        <Icon name="search" size={16} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={toggleCart}>
        <Icon name="shopping-cart" size={18} color="#a8336e" />
        <Text style={styles.cartCount}>{cartItemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#a8336e',
    padding: 15,
  },
  logo: {
    marginBottom: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoSubtext: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  cartButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: '#a8336e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Header;