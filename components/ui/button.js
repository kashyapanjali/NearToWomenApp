import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";

export const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium",
  onPress,
  style,
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "outline":
        return styles.outline;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryText;
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "medium":
        return styles.medium;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallText;
      case "medium":
        return styles.mediumText;
      case "large":
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        getVariantStyle(), 
        getSizeStyle(),
        style
      ]} 
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, getTextStyle(), getTextSizeStyle()]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
    ...Platform.select({
      web: {
        cursor: "pointer",
        transition: "all 0.2s ease",
        userSelect: "none",
      },
    }),
  },
  
  // Variants
  primary: {
    backgroundColor: "#a8336e",
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: "white",
    borderWidth: 0,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#a8336e",
  },
  
  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: "#a8336e",
  },
  outlineText: {
    color: "#a8336e",
  },
  
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
}); 