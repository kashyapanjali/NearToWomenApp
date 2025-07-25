"use client"

import { useState, useEffect } from "react"
import { StatusBar, SafeAreaView, StyleSheet, View, Dimensions, Platform, ScrollView, Text } from "react-native"
import Header from "./components/Header"
import Banner from "./components/Banner"
import ProductList from "./components/ProductList"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import SignInSignup from "./components/SignInSignup"
import { products } from "./data/product"
import CategoryFilter from "./components/CategoryFilter"
import AdminDashboardPanel from "./components/admin/AdminDashboardPanel";

if (typeof window !== "undefined") {
  localStorage.clear();
}

export default function App() {
  const [showCart, setShowCart] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width)
  const [isWeb, setIsWeb] = useState(Platform.OS === "web")
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  });
  const isAdmin = user && user.role === "admin";

  // Create predefined women's categories
  const womenCategories = [
    { id: "all", name: "All Products" },
    { id: "menstrual", name: "Menstrual Care" },
    { id: "safety", name: "Safety" },
    { id: "wellness", name: "Wellness" },
    { id: "food", name: "Health Foods" },
  ]

  useEffect(() => {
    const handleDimensionChange = ({ window }) => {
      setWindowWidth(window.width)
    }

    Dimensions.addEventListener("change", handleDimensionChange)
    return () => {
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener("change", handleDimensionChange)
      }
    }
  }, [])

  useEffect(() => {
    if (Platform.OS === "web") {
      setIsWeb(true)
    }
  }, [])

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== productId))
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)))
    }
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Create recommendation sections
  const safetyProducts = products.filter((product) => product.category === "safety")
  const wellnessProducts = products.filter((product) => product.category === "wellness")

  return (
    <SafeAreaView style={styles.container}>
      {showSignIn ? (
        <SignInSignup 
          onClose={() => setShowSignIn(false)}
          onAuthenticated={() => {
            // Always get the latest user from localStorage
            const newUser = JSON.parse(localStorage.getItem("user"));
            setUser(newUser);
            setIsAuthenticated(true);
            setShowSignIn(false);
          }}
        />
      ) : isAdmin ? (
        // If admin, show the admin dashboard
        <AdminDashboardPanel/>
      ):(
        <>

        {/* ... your existing e-shop code ... */}
        <StatusBar backgroundColor="#a8336e" barStyle="light-content" />
          <Header
            cartItemCount={cartItemCount}
            toggleCart={() => setShowCart(true)}
            onSearch={setSearchTerm}
            isWeb={isWeb}
            windowWidth={windowWidth}
            onSignInClick={() => setShowSignIn(true)}
          />

          <View style={styles.appContent}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <Banner isWeb={isWeb} />

              <View style={styles.mainContent}>
                <CategoryFilter
                  categories={womenCategories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  isWeb={isWeb}
                />

                <ProductList
                  products={
                    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)
                  }
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
              </View>
            </ScrollView>

            <Footer isWeb={isWeb} />
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
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f0f5",
  },
  appContent: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    maxWidth: 1400,
    alignSelf: "center",
    width: "100%",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#ecd5df",
    marginVertical: 30,
  },
  recommendationsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#a8336e",
    letterSpacing: 0.5,
  },
})
