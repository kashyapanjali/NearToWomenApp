// components/Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ isWeb }) => {
  const currentYear = new Date().getFullYear();
  const windowWidth = Dimensions.get('window').width;

  // Back to top button
  const backToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Use a more compact footer on mobile
  const isMobile = !isWeb || windowWidth < 768;

  if (isMobile) {
    return (
      <View style={styles.mobileFooter}>
        <View style={styles.mobileLinks}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.mobileLink}><Text style={styles.mobileLinkText}>Your Account</Text></TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}><Text style={styles.mobileLinkText}>Orders</Text></TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}><Text style={styles.mobileLinkText}>Help</Text></TouchableOpacity>
            <TouchableOpacity style={styles.mobileLink}><Text style={styles.mobileLinkText}>About</Text></TouchableOpacity>
          </ScrollView>
        </View>
        <Text style={styles.mobileCopyright}>© {currentYear} NearToWomen</Text>
      </View>
    );
  }

  return (
    <View style={styles.footerContainer}>
      {isWeb && (
        <TouchableOpacity style={styles.backToTop} onPress={backToTop}>
          <Text style={styles.backToTopText}>Back to top</Text>
        </TouchableOpacity>
      )}

      <View style={styles.mainFooter}>
        <View style={styles.footerContent}>
          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Get to Know Us</Text>
            <TouchableOpacity><Text style={styles.footerLink}>About NearToWomen</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Careers</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Press Releases</Text></TouchableOpacity>
          </View>
          
          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Connect With Us</Text>
            <TouchableOpacity><Text style={styles.footerLink}>Facebook</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Twitter</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Instagram</Text></TouchableOpacity>
          </View>
          
          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Make Money With Us</Text>
            <TouchableOpacity><Text style={styles.footerLink}>Sell products on NearToWomen</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Become an Affiliate</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Advertise Your Products</Text></TouchableOpacity>
          </View>
          
          <View style={styles.footerColumn}>
            <Text style={styles.columnTitle}>Let Us Help You</Text>
            <TouchableOpacity><Text style={styles.footerLink}>Your Account</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Your Orders</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Shipping & Returns</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Help</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.bottomFooter}>
        <View style={styles.bottomFooterContent}>
          <TouchableOpacity style={styles.logoContainer}>
            <Text style={styles.footerLogo}>NearToWomen</Text>
          </TouchableOpacity>
          
          <Text style={styles.copyright}>
            © {currentYear}, NearToWomen.com, Inc. or its affiliates
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    position: Platform.OS === 'web' ? 'relative' : 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backToTop: {
    backgroundColor: '#c04d7c',
    padding: 15,
    alignItems: 'center',
  },
  backToTopText: {
    color: 'white',
    fontSize: 13,
  },
  mainFooter: {
    backgroundColor: '#a8336e',
    padding: 30,
    paddingBottom: 40,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  footerColumn: {
    flex: 1,
    minWidth: 180,
    maxWidth: 200,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  columnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  footerLink: {
    color: '#f8e5ee',
    fontSize: 14,
    marginBottom: 10,
  },
  mobileFooter: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 25,
  },
  mobileLinks: {
    marginBottom: 10,
  },
  mobileLink: {
    marginRight: 20,
  },
  mobileLinkText: {
    color: 'white',
    fontSize: 14,
  },
  mobileCopyright: {
    color: '#f8e5ee',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomFooter: {
    backgroundColor: '#86285a',
    paddingVertical: 20,
    alignItems: 'center',
  },
  bottomFooterContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 10,
  },
  footerLogo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  copyright: {
    color: '#999',
    fontSize: 12,
  },
});

export default Footer;