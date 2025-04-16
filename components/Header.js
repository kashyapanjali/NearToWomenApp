// components/Header.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ cartItemCount, toggleCart, onSearch, isWeb, windowWidth }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const isMobile = !isWeb || windowWidth < 768;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={[styles.headerContent, isWeb && styles.webHeaderContent]}>
          {isMobile && (
            <TouchableOpacity style={styles.menuButton}>
              <Icon name="bars" size={20} color="white" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.logo, isWeb && styles.webLogo]}>
            <Text style={styles.logoText}>NearToWomen</Text>
          </TouchableOpacity>

          <View style={[styles.searchBar, isWeb && styles.webSearchBar]}>
            <TouchableOpacity style={styles.categoryDropdown}>
              <Text style={styles.categoryDropdownText}>All</Text>
              <Icon name="caret-down" size={12} color="#a8336e" style={styles.dropdownIcon} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Search women's products"
              placeholderTextColor="#777"
              value={searchText}
              onChangeText={handleSearch}
            />
            
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={18} color="#111" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.navItems}>
            {isWeb && (
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navItemTopText}>Returns</Text>
                <Text style={styles.navItemBottomText}>& Orders</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.cartButton} onPress={toggleCart}>
              <Icon name="shopping-cart" size={22} color="white" />
              {cartItemCount > 0 && (
                <View style={styles.cartCountBadge}>
                  <Text style={styles.cartCount}>{cartItemCount}</Text>
                </View>
              )}
              {isWeb && <Text style={styles.cartText}>Cart</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {!isMobile && (
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.subHeaderItem}>
            <Icon name="map-marker" size={16} color="white" style={styles.subHeaderIcon} />
            <Text style={styles.subHeaderText}>Deliver to your location</Text>
          </TouchableOpacity>
          
          <View style={styles.subHeaderNav}>
            <TouchableOpacity style={styles.subHeaderNavItem}>
              <Text style={styles.subHeaderNavText}>Today's Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subHeaderNavItem}>
              <Text style={styles.subHeaderNavText}>Wellness</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subHeaderNavItem}>
              <Text style={styles.subHeaderNavText}>Health Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subHeaderNavItem}>
              <Text style={styles.subHeaderNavText}>Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subHeaderNavItem}>
              <Text style={styles.subHeaderNavText}>Customer Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
  },
  header: {
    backgroundColor: '#a8336e',
    padding: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  webHeaderContent: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    alignSelf: 'center',
  },
  menuButton: {
    padding: 8,
    marginRight: 5,
  },
  logo: {
    marginRight: 10,
  },
  webLogo: {
    marginRight: 15,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    height: 40,
  },
  webSearchBar: {
    maxWidth: Platform.OS === 'web' ? '60%' : 'auto',
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8e5ee',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#ecd5df',
  },
  categoryDropdownText: {
    color: '#a8336e',
    fontSize: 12,
    marginRight: 4,
  },
  dropdownIcon: {
    marginTop: 2,
    color: '#a8336e',
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 8,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#e6799f',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  navItem: {
    marginRight: 15,
  },
  navItemTopText: {
    color: '#f8e5ee',
    fontSize: 12,
  },
  navItemBottomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  cartCountBadge: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: '#ff9dbb',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  subHeader: {
    backgroundColor: '#c04d7c',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeaderIcon: {
    marginRight: 5,
  },
  subHeaderText: {
    color: 'white',
    fontSize: 12,
  },
  subHeaderNav: {
    flexDirection: 'row',
  },
  subHeaderNavItem: {
    marginLeft: 20,
  },
  subHeaderNavText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Header;