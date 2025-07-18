"use client"

// components/Header.js
import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Dimensions, Alert } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const Header = ({ cartItemCount, toggleCart, onSearch, isWeb, windowWidth: propWindowWidth, onSignInClick }) => {
  const [searchText, setSearchText] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Use propWindowWidth if provided, otherwise get the screen width
  const windowWidth = propWindowWidth || (typeof window !== 'undefined' ? Dimensions.get("window").width : 0)
  
  // Check for user authentication on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (userData && token) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }
  }, [])

  // Listen for storage changes (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      if (userData && token) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  
  // Reset menu on window resize
  useEffect(() => {
    if (isWeb && typeof window !== 'undefined') {
      const handleResize = () => {
        if (window.innerWidth >= 768 && menuOpen) {
          setMenuOpen(false)
        }
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen, isWeb])

  const handleSearch = (text) => {
    setSearchText(text)
    onSearch(text)
  }

  const handleLogout = () => {
    console.log('Logout button clicked') // Debug log
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: performLogout
        }
      ]
    )
  }

  const performLogout = () => {
    console.log('Performing logout...') // Debug log
    try {
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      
      console.log('LocalStorage cleared') // Debug log
      
      // Update state
      setUser(null)
      setShowUserMenu(false)
      
      // Trigger storage event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'))
      }
      
      // Show success message
      Alert.alert("Success", "Logged out successfully!")
      
      // Force a page refresh to ensure all components update
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } catch (error) {
      console.error('Logout error:', error)
      Alert.alert("Error", "Failed to logout. Please try again.")
    }
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  // Dynamic breakpoint-based styling
  const getResponsiveStyles = () => {
    if (windowWidth < 480) {
      return {
        logoFontSize: 18,
        headerPadding: 10,
        iconSize: 18,
      }
    } else if (windowWidth < 768) {
      return {
        logoFontSize: 20,
        headerPadding: 12,
        iconSize: 20,
      }
    } else if (windowWidth < 992) {
      return {
        logoFontSize: 22,
        headerPadding: 15,
        iconSize: 20,
      }
    } else {
      return {
        logoFontSize: 22,
        headerPadding: 15,
        iconSize: 22,
      }
    }
  }

  const responsiveStyles = getResponsiveStyles()
  const isMobile = !isWeb || windowWidth < 768
  const isTablet = isWeb && windowWidth >= 768 && windowWidth < 992

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <View style={styles.headerContainer}>
      <View style={[styles.header, { padding: responsiveStyles.headerPadding }]}>
        <View style={[styles.headerContent, isWeb && styles.webHeaderContent]}>
          {/* Left Section: Menu and Logo */}
          <View style={styles.headerLeftSection}>
            {isMobile && (
              <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                <Icon name={menuOpen ? "times" : "bars"} size={responsiveStyles.iconSize} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.logo, isWeb && styles.webLogo]}>
              <Text style={[styles.logoText, { fontSize: responsiveStyles.logoFontSize }]}>NearToWomen</Text>
            </TouchableOpacity>
          </View>

          {/* Center Section: Search */}
          <View style={[styles.searchBarContainer, isWeb && styles.webSearchBarContainer]}>
            <View style={[styles.searchBar, isWeb && styles.webSearchBar, isFocused && styles.searchBarFocused]}>
              {(!isMobile || windowWidth > 400) && (
                <TouchableOpacity style={styles.categoryDropdown}>
                  <Text style={styles.categoryDropdownText}>All</Text>
                  <Icon name="caret-down" size={12} color="#a8336e" style={styles.dropdownIcon} />
                </TouchableOpacity>
              )}

              <TextInput
                style={styles.searchInput}
                placeholder={windowWidth < 400 ? "Search" : "Search women's products"}
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
          </View>

          {/* Right Section: Nav Items and Cart */}
          <View style={styles.headerRightSection}>
            {/* User Profile Section - Show when logged in */}
            {user ? (
              <View style={styles.userProfileContainer}>
                <TouchableOpacity 
                  style={[
                    styles.navItem,
                    isWeb && styles.webNavItem,
                    isWeb && {
                      ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                      }
                    }
                  ]}
                  onPress={toggleUserMenu}
                >
                  <View style={styles.userContainer}>
                    <Text style={styles.navItemTopText}>Hello, {user.name}</Text>
                    <View style={styles.userRow}>
                      <Text style={styles.navItemBottomText}>My Account</Text>
                      <Icon name="chevron-down" size={12} color="white" style={styles.userIcon} />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <View style={styles.userDropdown}>
                    <TouchableOpacity style={styles.dropdownItem}>
                      <Icon name="user" size={14} color="#a8336e" style={styles.dropdownIcon} />
                      <Text style={styles.dropdownText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem}>
                      <Icon name="file-text-o" size={14} color="#a8336e" style={styles.dropdownIcon} />
                      <Text style={styles.dropdownText}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem}>
                      <Icon name="heart" size={14} color="#a8336e" style={styles.dropdownIcon} />
                      <Text style={styles.dropdownText}>Wishlist</Text>
                    </TouchableOpacity>
                    <View style={styles.dropdownDivider} />
                    <TouchableOpacity 
                      style={styles.dropdownItem} 
                      onPress={() => {
                        console.log('Dropdown logout clicked')
                        performLogout()
                      }}
                    >
                      <Icon name="sign-out" size={14} color="#e84a80" style={styles.dropdownIcon} />
                      <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              /* Sign In Section - Only show when not logged in */
              !isMobile && (
                <TouchableOpacity 
                  style={[
                    styles.navItem,
                    isWeb && styles.webNavItem,
                    isWeb && {
                      ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                      }
                    }
                  ]}
                  onPress={onSignInClick}
                >
                  <View style={styles.signInContainer}>
                    <Text style={styles.navItemTopSignInText}>Hello! Women</Text>
                    <View style={styles.signInRow}>
                      <Text style={styles.navItemBottomSignInText}>Sign In</Text>
                      <Icon name="user" size={14} color="white" style={styles.signInIcon} />
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}

            {isWeb && windowWidth >= 768 && (
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navItemTopText}>Returns</Text>
                <Text style={styles.navItemBottomText}>& Orders</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.cartButton} onPress={toggleCart}>
              <View style={styles.cartIconContainer}>
                <Icon name="shopping-cart" size={responsiveStyles.iconSize} color="white" />
                {cartItemCount > 0 && (
                  <View style={styles.cartCountBadge}>
                    <Text style={styles.cartCount}>{cartItemCount}</Text>
                  </View>
                )}
              </View>
              {isWeb && windowWidth >= 480 && <Text style={styles.cartText}>Cart</Text>}
            </TouchableOpacity>

            {/* Test Logout Button - Remove this after testing */}
            {user && (
              <TouchableOpacity 
                style={[styles.cartButton, { marginLeft: 10 }]} 
                onPress={() => {
                  console.log('Test logout clicked')
                  performLogout()
                }}
              >
                <Icon name="sign-out" size={responsiveStyles.iconSize} color="white" />
                {isWeb && windowWidth >= 480 && <Text style={styles.cartText}>Logout</Text>}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {user ? (
            <>
              <TouchableOpacity style={styles.mobileMenuItem}>
                <Icon name="user" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>My Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileMenuItem}>
                <Icon name="file-text-o" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mobileMenuItem}>
                <Icon name="heart" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
                <Text style={styles.mobileMenuText}>Wishlist</Text>
              </TouchableOpacity>
              <View style={styles.mobileDivider} />
              <TouchableOpacity style={styles.mobileMenuItem} onPress={performLogout}>
                <Icon name="sign-out" size={16} color="#e84a80" style={styles.mobileMenuIcon} />
                <Text style={[styles.mobileMenuText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.mobileMenuItem} onPress={onSignInClick}>
              <Icon name="user" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
              <Text style={styles.mobileMenuText}>Sign In</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.mobileMenuItem}>
            <Icon name="gift" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
            <Text style={styles.mobileMenuText}>Today's Deals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mobileMenuItem}>
            <Icon name="leaf" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
            <Text style={styles.mobileMenuText}>Wellness</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mobileMenuItem}>
            <Icon name="medkit" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
            <Text style={styles.mobileMenuText}>Health Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mobileMenuItem}>
            <Icon name="shield" size={16} color="#a8336e" style={styles.mobileMenuIcon} />
            <Text style={styles.mobileMenuText}>Safety</Text>
          </TouchableOpacity>
        </View>
      )}

      {(!isMobile || (isTablet && windowWidth >= 768)) && (
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.subHeaderItem}>
            <Icon name="map-marker" size={16} color="white" style={styles.subHeaderIcon} />
            <Text style={styles.subHeaderText}>Deliver to your location</Text>
          </TouchableOpacity>

          <View style={styles.subHeaderNav}>
            {windowWidth >= 850 && (
              <TouchableOpacity style={styles.subHeaderNavItem}>
                <Text style={styles.subHeaderNavText}>Today's Deals</Text>
              </TouchableOpacity>
            )}
            {windowWidth >= 1050 && (
              <TouchableOpacity style={styles.subHeaderNavItem}>
                <Text style={styles.subHeaderNavText}>Customer Service</Text>
              </TouchableOpacity>
            )}
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
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  webHeaderContent: {
    maxWidth: 1400,
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginRight: 15,
  },
  webLogo: {
    marginRight: 20,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.1,
  },
  searchBarContainer: {
    flex: 1,
    maxWidth: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    marginRight: 15,
  },
  webSearchBarContainer: {
    maxWidth: "60%",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    height: 44,
    borderWidth: 2,
    borderColor: "transparent",
    minWidth: 120,
    width: "100%",
    maxWidth: 600,
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
    width: "100%",
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
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  navItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    marginRight: 15,
    padding: 5,
  },
  webNavItem: {
    padding: 8,
    transition: 'all 0.3s ease',
  },
  signInContainer: {
    alignItems: 'flex-start',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemTopSignInText: {
    color: '#f8e5ee',
    fontSize: 12,
    marginBottom: 2,
  },
  navItemBottomSignInText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
  signInIcon: {
    marginTop: 2,
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
    paddingHorizontal: 8,
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
    marginLeft: 20,
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
    marginRight: 20,
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
  // Mobile menu styling
  mobileMenu: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mobileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  mobileMenuIcon: {
    marginRight: 15,
    width: 20,
    textAlign: "center",
  },
  mobileMenuText: {
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },
  mobileDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
  },
  userProfileContainer: {
    position: 'relative',
  },
  userContainer: {
    alignItems: 'flex-start',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginTop: 2,
    marginLeft: 4,
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  logoutText: {
    color: '#e84a80',
    fontWeight: '500',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
})

export default Header
