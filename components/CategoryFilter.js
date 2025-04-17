"use client"

// components/CategoryFilter.js
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const CategoryFilter = ({ categories, activeCategory, setActiveCategory, isWeb }) => {
  const [showFilter, setShowFilter] = useState(false)

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId)
    if (!isWeb) {
      setShowFilter(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Women's Products</Text>
        {!isWeb && (
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilter(!showFilter)}>
            <Text style={styles.filterText}>{showFilter ? "Hide Categories" : "Show Categories"}</Text>
            <Icon name={showFilter ? "chevron-up" : "chevron-down"} size={14} color="#a8336e" />
          </TouchableOpacity>
        )}
      </View>

      {(isWeb || showFilter) && (
        <ScrollView
          horizontal={!isWeb}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.categoriesContainer, isWeb && styles.webCategoriesContainer]}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.category,
                activeCategory === category.id && styles.activeCategory,
                isWeb && styles.webCategory,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Icon
                name={getCategoryIcon(category.id)}
                size={16}
                color={activeCategory === category.id ? "white" : "#a8336e"}
                style={styles.categoryIcon}
              />
              <Text style={[styles.categoryText, activeCategory === category.id && styles.activeCategoryText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

// Helper function to get appropriate icons for categories
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a8336e",
    letterSpacing: 0.5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdf2f7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    color: "#a8336e",
    marginRight: 6,
    fontWeight: "600",
    fontSize: 13,
  },
  categoriesContainer: {
    paddingBottom: 5,
  },
  webCategoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  category: {
    backgroundColor: "#fdf2f7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  webCategory: {
    minWidth: 130,
    justifyContent: "center",
    transition: "all 0.2s ease",
    ...(Platform.OS === "web"
      ? {
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          },
        }
      : {}),
  },
  activeCategory: {
    backgroundColor: "#a8336e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryText: {
    color: "#a8336e",
    fontWeight: "600",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "white",
  },
})

export default CategoryFilter
