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
import { CartProvider, useCart } from "./context/CartContext"

const AppContent = () => {
  const [showCart, setShowCart] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width)
  const [isWeb, setIsWeb] = useState(Platform.OS === "web")
  const { cartItems } = useCart()

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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Create recommendation sections
  const safetyProducts = products.filter((product) => product.category === "safety")
  const wellnessProducts = products.filter((product) => product.category === "wellness")

  return (
    <SafeAreaView style={styles.container}>
      {showSignIn ? (
        <SignInSignup 
          onClose={() => setShowSignIn(false)}
          onAuthenticated={() => {
            setIsAuthenticated(true)
            setShowSignIn(false)
          }}
        />
      ) : (
        <>
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
              closeCart={() => setShowCart(false)}
              isWeb={isWeb}
            />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
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
