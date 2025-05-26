"use client"

// components/ProductList.js
import { useMemo } from "react"
import { View, Text, FlatList, StyleSheet, Platform, ScrollView } from "react-native"
import ProductCard from "./ProductCard"
import Icon from "react-native-vector-icons/FontAwesome"

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
  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped = {}
    categories.forEach(category => {
      grouped[category.id] = filteredProducts.filter(product => product.category === category.id)
    })
    return grouped
  }, [filteredProducts, categories])

  // Calculate number of columns based on screen width and platform
  const getNumColumns = useMemo(() => {
    if (horizontal) return 1
    return isWeb ? 5 : 2
  }, [isWeb, horizontal])

  // Calculate item width for web grid layout
  const getItemWidth = () => {
    if (horizontal) return undefined

    if (isWeb) {
      const columns = getNumColumns
      const gapSize = 40 // Gap between cards
      const containerPadding = 40 // Container padding
      const totalGaps = columns - 1
      const maxContainerWidth = 1400
      const actualContainerWidth = Math.min(windowWidth - (containerPadding * 2), maxContainerWidth)
      const availableWidth = actualContainerWidth - (totalGaps * gapSize)
      const itemWidth = Math.floor(availableWidth / columns)
      return itemWidth - 10 // Subtract additional padding to ensure gap
    }

    return undefined
  }

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.productWrapper,
        horizontal ? styles.horizontalWrapper : styles.gridWrapper,
        isWeb && !horizontal && { width: getItemWidth() },
        !isWeb && !horizontal && { width: '48%' }
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

  const renderProductSection = (title, products) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionDivider} />
      </View>
      <FlatList
        data={products}
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
    </View>
  )

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case "menstrual":
        return "tint"
      case "safety":
        return "shield"
      case "wellness":
        return "heart"
      case "food":
        return "apple"
      default:
        return "th-large"
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* All Products Section */}
      {renderProductSection("All Products", filteredProducts)}

      {/* Category-wise Sections */}
      {categories.map(category => {
        const categoryProducts = productsByCategory[category.id]
        if (categoryProducts.length > 0) {
          return (
            <View key={category.id} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.categoryHeader}>
                  <Icon 
                    name={getCategoryIcon(category.id)} 
                    size={20} 
                    color="#a8336e" 
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.sectionTitle}>{category.name}</Text>
                </View>
                <View style={styles.sectionDivider} />
              </View>
              <FlatList
                data={categoryProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={horizontal ? 1 : getNumColumns}
                key={`${category.id}-${horizontal ? "horizontal" : `grid-${getNumColumns}`}`}
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
            </View>
          )
        }
        return null
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    marginBottom: 0,
    marginHorizontal: 'auto',
    maxWidth: 1400,
    width: '100%',
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
  sectionContainer: {
    padding: Platform.OS === "web" ? 20 : 10,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a8336e",
    letterSpacing: 0.5,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: "#f0f0f0",
    marginTop: 8,
  },
  productList: {
    padding: Platform.OS === "web" ? 24 : 12,
  },
  gridList: {
    paddingBottom: Platform.OS === "web" ? 24 : 12,
    flexGrow: 1,
  },
  horizontalList: {
    paddingRight: 24,
  },
  webGrid: {
    ...(Platform.OS === "web"
      ? {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          gap: 40,
          rowGap: 40,
          padding: 20,
        }
      : {}),
  },
  productWrapper: {
    margin: Platform.OS === "web" ? 8 : 4,
    flex: 1,
  },
  gridWrapper: {
    marginBottom: Platform.OS === "web" ? 40 : 16,
    ...(Platform.OS !== "web"
      ? {
          marginHorizontal: 4,
          width: '48%',
          flex: 0,
        }
      : {}),
  },
  horizontalWrapper: {
    marginRight: 40,
    width: 320,
    flex: 0,
  },
  columnWrapper: {
    justifyContent: "center",
    gap: Platform.OS === "web" ? 20 : 8,
    paddingHorizontal: Platform.OS === "web" ? 10 : 6,
    width: "100%",
    alignItems: "stretch",
  },
})

export default ProductList
