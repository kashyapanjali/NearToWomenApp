"use client"

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
          contentContainerStyle={[
            styles.categoriesContainer,
            isWeb ? styles.webCategoriesContainer : styles.mobileCategoriesContainer,
          ]}
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
    borderRadius: 16,
    padding: 20,
    
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a8336e",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  filterButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: "#a8336e",
    marginRight: 6,
    fontWeight: "600",
    fontSize: 13,
  },
  categoriesContainer: {
    gap: 10,
    alignItems: "center",
  },
  mobileCategoriesContainer: {
    flexDirection: "row",
  },
  webCategoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#a8336e",
  },
  webCategory: {
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  activeCategory: {
    backgroundColor: "#a8336e",
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
