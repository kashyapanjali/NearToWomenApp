// components/CategoryFilter.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory, isWeb }) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    if (!isWeb) {
      setShowFilter(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Women's Products</Text>
        {!isWeb && (
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setShowFilter(!showFilter)}
          >
            <Text style={styles.filterText}>
              {showFilter ? 'Hide Categories' : 'Show Categories'}
            </Text>
            <Icon 
              name={showFilter ? "chevron-up" : "chevron-down"} 
              size={14} 
              color="#a8336e" 
            />
          </TouchableOpacity>
        )}
      </View>

      {(isWeb || showFilter) && (
        <ScrollView 
          horizontal={!isWeb}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.categoriesContainer,
            isWeb && styles.webCategoriesContainer
          ]}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.category,
                activeCategory === category.id && styles.activeCategory,
                isWeb && styles.webCategory
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Icon 
                name={getCategoryIcon(category.id)} 
                size={16} 
                color={activeCategory === category.id ? 'white' : '#a8336e'} 
                style={styles.categoryIcon}
              />
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.activeCategoryText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Helper function to get appropriate icons for categories
const getCategoryIcon = (categoryId) => {
  switch(categoryId) {
    case 'menstrual':
      return 'tint';
    case 'safety':
      return 'shield';
    case 'wellness':
      return 'heart';
    case 'food':
      return 'apple';
    default:
      return 'th-large';
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a8336e',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    color: '#a8336e',
    marginRight: 5,
    fontWeight: '500',
    fontSize: 12,
  },
  categoriesContainer: {
    paddingBottom: 5,
  },
  webCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  category: {
    backgroundColor: '#fdf2f7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
  },
  webCategory: {
    minWidth: 120,
    justifyContent: 'center',
  },
  activeCategory: {
    backgroundColor: '#a8336e',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    color: '#a8336e',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
});

export default CategoryFilter;