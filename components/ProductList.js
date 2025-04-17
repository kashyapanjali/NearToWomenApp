"use client"

// components/ProductList.js
import { useMemo } from "react"
import { View, Text, FlatList, StyleSheet, Platform } from "react-native"
import ProductCard from "./ProductCard"

const ProductList = ({
  products,
  categories,
  activeCategory,
  setActiveCategory,
  searchTerm,
  addToCart,
  isWeb,
  windowWidth,
  horizontal = false,
}) => {
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate number of columns based on screen width and platform
  const getNumColumns = useMemo(() => {
    if (horizontal) return 1

    if (isWeb) {
      if (windowWidth > 1600) return 5
      if (windowWidth > 1300) return 4
      if (windowWidth > 900) return 3
      if (windowWidth > 550) return 2
      return 1
    } else {
      return windowWidth > 600 ? 2 : 1
    }
  }, [windowWidth, isWeb, horizontal])

  // Calculate item width for web grid layout
  const getItemWidth = () => {
    if (horizontal) return undefined

    if (isWeb) {
      const columns = getNumColumns
      const gapSize = 16 // Total gap size
      const containerPadding = 20 // Container padding
      const totalGaps = columns - 1

      // Use fixed widths for larger screens
      if (windowWidth > 1300) {
        if (columns === 5) return 250
        if (columns === 4) return 270
        if (columns === 3) return 320
      }

      // For smaller screens, calculate based on available width
      const availableWidth = windowWidth - totalGaps * gapSize - containerPadding * 2
      return Math.floor(availableWidth / columns)
    }

    return undefined
  }

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.productWrapper,
        horizontal ? styles.horizontalWrapper : styles.gridWrapper,
        isWeb && !horizontal && { width: getItemWidth() },
      ]}
    >
      <ProductCard
        product={item}
        addToCart={addToCart}
        isWeb={isWeb}
        windowWidth={windowWidth}
        horizontal={horizontal}
      />
    </View>
  )

  return (
    <View style={[styles.container, horizontal ? styles.horizontalContainer : styles.gridContainer]}>
      {filteredProducts.length === 0 ? (
        <View style={styles.noProducts}>
          <View style={styles.noProductsIcon}>
            <Text style={styles.noProductsEmoji}>🔍</Text>
          </View>
          <Text style={styles.noProductsText}>No products found</Text>
          <Text style={styles.noProductsSubtext}>Try a different search or category</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={horizontal ? 1 : getNumColumns}
          key={horizontal ? "horizontal" : `grid-${getNumColumns}`}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.productList,
            horizontal ? styles.horizontalList : styles.gridList,
            isWeb && !horizontal && styles.webGrid,
          ]}
          columnWrapperStyle={!horizontal && getNumColumns > 1 && !isWeb ? styles.columnWrapper : null}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 30,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }),
  },
  gridContainer: {
    padding: 20,
  },
  horizontalContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  productList: {
    paddingBottom: 10,
  },
  gridList: {
    paddingBottom: 20,
  },
  horizontalList: {
    paddingRight: 15,
  },
  webGrid: {
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 20,
        }
      : {}),
  },
  productWrapper: {
    margin: 0,
  },
  gridWrapper: {
    marginBottom: 20,
    ...(Platform.OS !== "web"
      ? {
          marginHorizontal: 10,
        }
      : {}),
  },
  horizontalWrapper: {
    marginRight: 20,
    width: 320,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 250,
  },
  noProductsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f9f0f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noProductsEmoji: {
    fontSize: 32,
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  noProductsSubtext: {
    textAlign: "center",
    fontSize: 15,
    color: "#777",
    lineHeight: 22,
  },
})

export default ProductList
