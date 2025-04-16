// components/CategoryFilter.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'menstrual', name: 'Menstrual Care' },
    { id: 'food', name: 'Healthy Food' },
    { id: 'safety', name: 'Safety Products' },
    { id: 'wellness', name: 'Wellness' },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            activeCategory === category.id && styles.activeButton
          ]}
          onPress={() => setActiveCategory(category.id)}
        >
          <Text 
            style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeText
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#a8336e',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: 'white',
  },
});

export default CategoryFilter;