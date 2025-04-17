import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button } from "./ui/button";
import Icon from "react-native-vector-icons/FontAwesome";

const bannerProducts = [
  {
    id: 1,
    title: "Menstrual Kits",
    description: "Premium menstrual care products designed for comfort and protection when you need it most.",
    image: "https://5.imimg.com/data5/ANDROID/Default/2024/7/433837471/RJ/MV/HT/38818420/product-jpeg-500x500.jpg",
    buttonText: "Shop Menstrual Care",
    color: "#e84a80",
  },
  {
    id: 2,
    title: "Women's Health Supplements",
    description: "Specially formulated vitamins and supplements to support your overall health and wellbeing.",
    image: "https://cdn.anscommerce.com/live/image/catalog/brandstore/nutrela/Womenpk.JPG",
    buttonText: "Explore Supplements",
    color: "#4acce8",
  },
  {
    id: 3,
    title: "Safety Products",
    description: "Stay safe and protected with our range of personal safety devices designed for women.",
    image: "https://rukminim3.flixcart.com/image/850/1000/k7nnrm80/sanitary-pad-pantyliner/q/e/p/sanitary-pads-30pcs-pack-of-1-regular-1-sanitary-pad-women-original-imafpugaekkn3arq.jpeg?q=90&crop=false",
    buttonText: "View Safety Range",
    color: "#4a7de8",
  },
];

const Banner = ({ isWeb }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentProduct = bannerProducts[currentSlide];
  
  // Default to web platform values if isWeb prop isn't provided
  const isBrowserPlatform = isWeb !== undefined ? isWeb : Platform.OS === "web";
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerProducts.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerProducts.length) % bannerProducts.length);
  };

  return (
    <View style={styles.banner}>
      <ImageBackground
        source={{
          uri: currentProduct.image,
        }}
        style={styles.background}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {/* Web gradient overlay */}
        {Platform.OS === "web" && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              background: "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
            }}
          />
        )}

        {/* Navigation Arrows */}
        <View style={styles.arrowsContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={prevSlide}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.arrowButton} onPress={nextSlide}>
            <Icon name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{currentProduct.title}</Text>
            <Text style={styles.description}>
              {currentProduct.description}
            </Text>
            <Button 
              variant="secondary" 
              size="large" 
              style={{ minWidth: 200 }}
              onPress={() => console.log(`Navigate to ${currentProduct.title}`)}
            >
              {currentProduct.buttonText}
            </Button>
            
            {/* Slide indicators */}
            <View style={styles.indicators}>
              {bannerProducts.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.indicator, 
                    currentSlide === index && styles.activeIndicator
                  ]} 
                />
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: Platform.OS === "web" ? "90vh" : 500,
    width: "100%",
  },
  background: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.92,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Platform.OS === "web" ? 60 : 25,
    paddingVertical: 30,
    backgroundColor: Platform.OS !== "web" ? "rgba(0,0,0,0.4)" : "transparent",
  },
  content: {
    maxWidth: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Platform.OS === "web" ? 42 : 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    letterSpacing: 0.1,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  description: {
    fontSize: Platform.OS === "web" ? 20 : 16,
    color: "#f3f3f3",
    marginBottom: 28,
    lineHeight: 28,
    fontWeight: "500",
    maxWidth: 600,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    textAlign: "center",
  },
  arrowsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      },
    }),
  },
  indicators: {
    flexDirection: "row",
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Banner;
