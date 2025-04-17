"use client"

// components/Header.js
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const Header = ({ cartItemCount, toggleCart, onSearch, isWeb, windowWidth }) => {
  const [searchText, setSearchText] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (text) => {
    setSearchText(text)
    onSearch(text)
  }

  const isMobile = !isWeb || windowWidth < 768

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

          <View style={[styles.searchBar, isWeb && styles.webSearchBar, isFocused && styles.searchBarFocused]}>
            <TouchableOpacity style={styles.categoryDropdown}>
              <Text style={styles.categoryDropdownText}>All</Text>
              <Icon name="caret-down" size={12} color="#a8336e" style={styles.dropdownIcon} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Search women's products"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={18} color="white" />
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
              <View style={styles.cartIconContainer}>
                <Icon name="shopping-cart" size={22} color="white" />
                {cartItemCount > 0 && (
                  <View style={styles.cartCountBadge}>
                    <Text style={styles.cartCount}>{cartItemCount}</Text>
                  </View>
                )}
              </View>
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
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    backgroundColor: "#a8336e",
    padding: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  webHeaderContent: {
    maxWidth: 1400,
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "center",
  },
  menuButton: {
    padding: 10,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  logo: {
    marginRight: 15,
  },
  webLogo: {
    marginRight: 20,
  },
  logoText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    height: 44,
    borderWidth: 2,
    borderColor: "transparent",
  },
  searchBarFocused: {
    borderColor: "#e6799f",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  webSearchBar: {
    maxWidth: Platform.OS === "web" ? "60%" : "auto",
  },
  categoryDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8e5ee",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#ecd5df",
  },
  categoryDropdownText: {
    color: "#a8336e",
    fontSize: 13,
    marginRight: 5,
    fontWeight: "500",
  },
  dropdownIcon: {
    marginTop: 2,
    color: "#a8336e",
  },
  searchInput: {
    flex: 1,
    height: 44,
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#e6799f",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  navItems: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  navItem: {
    marginRight: 20,
    padding: 5,
  },
  navItemTopText: {
    color: "#f8e5ee",
    fontSize: 12,
  },
  navItemBottomText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCountBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#ff9dbb",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#a8336e",
  },
  cartCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  subHeader: {
    backgroundColor: "#c04d7c",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeaderItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  subHeaderIcon: {
    marginRight: 6,
  },
  subHeaderText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
  subHeaderNav: {
    flexDirection: "row",
  },
  subHeaderNavItem: {
    marginLeft: 20,
    paddingVertical: 6,
  },
  subHeaderNavText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.9,
  },
})

export default Header
