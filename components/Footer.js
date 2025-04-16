// components/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About BloomWell</Text>
        <Text style={styles.sectionText}>
          Supporting women's health, safety, and wellbeing with quality products.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="facebook" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="instagram" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="twitter" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Newsletter</Text>
        <View style={styles.newsletter}>
          <TextInput
            style={styles.newsletterInput}
            placeholder="Your email"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.newsletterButton}>
            <Text style={styles.newsletterButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>© 2025 BloomWell. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#333',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    color: '#bbb',
    fontSize: 14,
    lineHeight: 20,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  newsletter: {
    flexDirection: 'row',
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    color: '#333',
  },
  newsletterButton: {
    backgroundColor: '#a8336e',
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsletterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#888',
    fontSize: 12,
  },
});

export default Footer;